package org.api.controllers

import io.javalin.http.BadRequestResponse
import io.javalin.http.Context
import io.javalin.http.UnauthorizedResponse
import org.api.*
import org.api.token.TokenController
import org.unq.ui.model.NotFound
import org.unq.ui.model.TwitterSystem
import org.unq.ui.model.UsedEmail
import org.unq.ui.model.User

class UserController(private val system: TwitterSystem) {

    private val tokenController = TokenController()

    fun register(ctx: Context){
        val body = ctx.bodyValidator<UserSimpleResponse>()
                .check({ it.name.isNotEmpty() }, "Name cannot be empty")
                .check({ it.email.isNotEmpty() }, "Email cannot be empty")
                .check({
                    "^[a-zA-Z0-9.!#$%&'+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)$"
                            .toRegex()
                            .matches(it.email)
                }, "Invalid email address")
                .check({ it.password.isNotEmpty() }, "Password cannot be empty")
                .check({ it.image.isNotEmpty() }, "Image cannot be empty")
                .get()
        try {
            system.register(body.name,
                            body.email,
                            body.password,
                            body.image)
            ctx.status(201).json(OkResponse())
        }catch (e: UsedEmail){
            ctx.status(404).json(ErrorResponse("The e-mail is not available"))
        }
    }

    fun login(ctx: Context){
        val body = ctx.bodyValidator<LoginResponse>()
                .check({ it.email.isNotEmpty() }, "Email cannot be empty")
                .check({
                    "^[a-zA-Z0-9.!#$%&'+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)$"
                            .toRegex()
                            .matches(it.email)
                }, "Invalid email address")
                .check({ it.password.isNotEmpty() }, "Password cannot by empty")
                .get()
        try {
            val user = system.login(body.email, body.password)
            ctx.header("Authorization", tokenController.generate(user))
            ctx.status(200).json(OkResponse())
        }catch (e: NotFound){
            ctx.status(404).json(LoginErrorResponse("error", "User not found"))
        }
    }

    fun get(ctx: Context){
        val userId = getUserId(ctx)
        val user = system.getUser(userId)
        val userResponse = UserResponse(user.id,
                                        user.name,
                                        user.image,
                                        Transform.followersToSimpleUsers(user.followers),
                                        Transform.listTweetToTweetResponse(system.timeline(user.id)))
        ctx.status(200).json(userResponse)
    }

    fun getById(ctx: Context){
        val id = ctx.pathParam(":userId")
        val user: User
        try{
            user = system.getUser(id)
            val userByIdResponse = UserByIdResponse(user.name,
                                                    user.image,
                                                    Transform.followersToSimpleUsers(user.followers),
                                                    Transform.listTweetToTweetResponse(user.tweets))
            ctx.status(200).json(userByIdResponse)
        } catch (e: NotFound){
            ctx.status(404).json(ErrorResponse("Not found user with id $id"))
        }
    }

    fun putByFollow(ctx: Context){
        val toFollowId = ctx.pathParam(":userId")
        val followerId = getUserId(ctx)
        try{
            system.updateFollower(toFollowId, followerId)
            ctx.status(200).json(OkResponse())
        }catch (e: NotFound){
            ctx.status(404).json(ErrorResponse("Not found user with id $toFollowId"))
        }
    }

    fun postEditProfile(ctx: Context) {
        val userId = getUserId(ctx)
        val user: User
        try {
        user = system.getUser(userId)
        val body = ctx.body<UserEdit>()
            system.editProfile(userId,
                                    body.name.ifEmpty {
                                        user.name
                                    },
                                    body.password.ifEmpty(){
                                        user.password
                                    },
                                    body.image.ifEmpty {
                                        user.image
                                    })
            ctx.status(200).json(OkResponse())
        } catch (e: NotFound) {
            ctx.status(404).json(ErrorResponse("Profile cannot be edited"))
        }
    }


    private fun getUserId(ctx: Context) : String {
        val id : String? = ctx.attribute("id")
        if (id == null) {
            UnauthorizedResponse()
        }
        return id!!
    }

}