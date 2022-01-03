package org.api

import io.javalin.Javalin
import io.javalin.apibuilder.ApiBuilder.*
import org.unq.ui.bootstrap.getTwitterSystem
import io.javalin.core.util.RouteOverviewPlugin
import org.api.controllers.TweetController
import org.api.controllers.TwitterController
import org.api.controllers.UserController
import org.api.token.TwitterRoleManager
import org.api.token.TwitterRoles


class TwitterApi {

    fun start() {
        val system = getTwitterSystem()
        val twitterController = TwitterController(system)
        val userController = UserController(system)
        val tweetController = TweetController(system)

        val app = Javalin.create {
             it.defaultContentType = "application/json"
             it.registerPlugin(RouteOverviewPlugin("/routes"))
             it.accessManager(TwitterRoleManager(system))
             it.enableCorsForAllOrigins()
        }

        app.before {
             it.header("Access-Control-Expose-Headers", "*")
        }

        app.start(7000)

        app.routes {
            path("register") {
                post(userController::register, setOf(TwitterRoles.ANYONE))
            }
            path("login") {
                post(userController::login, setOf(TwitterRoles.ANYONE))
            }
            path("user") {
                get(userController::get, setOf(TwitterRoles.USER))
                post(userController::postEditProfile, setOf(TwitterRoles.USER))
                path(":userId") {
                    get(userController::getById, setOf(TwitterRoles.USER))
                    path("follow") {
                        put(userController::putByFollow, setOf(TwitterRoles.USER))
                    }
                }
            }
            path("tweet") {
                post(tweetController::addTweet, setOf(TwitterRoles.USER))
                path(":tweetId") {
                    get(tweetController::getById, setOf(TwitterRoles.USER))
                    delete(tweetController::deleteTweet, setOf(TwitterRoles.USER))
                    path("like") {
                        put(tweetController::putLike, setOf(TwitterRoles.USER))
                    }
                    path("comment") {
                        post(tweetController::postComment, setOf(TwitterRoles.USER))
                    }

                }
            }
            path("search") {
                get(twitterController::getSearch, setOf(TwitterRoles.ANYONE))
            }
        }
    }

}

fun main() {
    TwitterApi().start()
}
