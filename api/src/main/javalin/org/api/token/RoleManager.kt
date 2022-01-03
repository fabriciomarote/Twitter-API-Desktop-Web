package org.api.token

import io.javalin.core.security.AccessManager
import io.javalin.core.security.Role
import io.javalin.http.Context
import io.javalin.http.Handler
import io.javalin.http.UnauthorizedResponse
import org.unq.ui.model.NotFound
import org.unq.ui.model.TwitterSystem

internal enum class TwitterRoles : Role {
    ANYONE, USER
}

class TwitterRoleManager(private val system: TwitterSystem) : AccessManager {
    private val tokenController = TokenController()

    override fun manage(handler: Handler, ctx: Context, roles: MutableSet<Role>) {
        val token = ctx.header("Authorization")
        when {
            roles.contains(TwitterRoles.ANYONE) -> handler.handle(ctx)
            token == null -> throw UnauthorizedResponse()
            roles.contains(TwitterRoles.USER) -> {
                try {
                    val id =  tokenController.validate(token)
                    system.getUser(id)
                    ctx.attribute("id", id)
                    handler.handle(ctx)
                } catch (e: NotFound) {
                    throw UnauthorizedResponse()
                } catch (e: InvalidToken) {
                    throw UnauthorizedResponse()
                }
            }
        }
    }
}