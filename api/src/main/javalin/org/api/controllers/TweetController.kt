package org.api.controllers

import io.javalin.http.Context
import io.javalin.http.UnauthorizedResponse
import org.api.*
import org.unq.ui.model.*

class TweetController(private val system: TwitterSystem) {

    fun getById(ctx: Context) {
        val id = ctx.pathParam(":tweetId")
        try {
            val tweet = system.getTweet(id)
            val tweetResponse = TweetCommentResponse(id,
                                                     tweet.text,
                                                     tweet.images,
                                                     Transform.replyToSimpleTweet(tweet.reply),
                                                     Transform.likesToSimpleUsers(tweet.likes),
                                                     Transform.dateToFormattedDate(tweet.date),
                                                     Transform.userToSimpleUser(tweet.author),
                                                     Transform.commentsToSimpleComments(tweet.comments)
            )
            ctx.status(200).json(tweetResponse)
        } catch (e: NotFound) {
            ctx.status(404).json(ErrorResponse("Not found tweet with id $id"))
        }
    }

    fun putLike(ctx: Context){
        val id = ctx.pathParam(":tweetId")
        val userId = getUserId(ctx)
        try {
            system.updateLike(id, userId)
            ctx.status(200).json(OkResponse())
        } catch (e: NotFound) {
            ctx.status(404).json(ErrorResponse("Not found tweet with id $id"))
        }
    }

    fun postComment(ctx: Context){
        val id = ctx.pathParam(":tweetId")
        val userId = getUserId(ctx)
        val draft = ctx.bodyValidator<DraftTweet>()
                .check({this.validateImages(it.images)}, "Max of 4 images are allowed")
                .check({ it.text.isNotEmpty() || it.images.isNotEmpty()}, "Text and Images cannot be empty")
                .get()
        try {
            system.addComment(id, userId, draft)
            ctx.status(200).json(OkResponse())
       }  catch (e: NotFound) {
           ctx.status(404).json(ErrorResponse("Not found tweet with id $id"))
       }
    }

    fun addTweet(ctx: Context) {
        val userId = getUserId(ctx)
        val draft = ctx.bodyValidator<DraftTweet>()
                .check({this.validateImages(it.images)}, "Max of 4 images are allowed")
                .check({ it.text.isNotEmpty() || it.images.isNotEmpty()}, "Text or Images cannot be empty")
                .get()
        try {
            system.addTweet(userId, draft)
            ctx.status(200).json(OkResponse())
        } catch (e: NotFound) {
            ctx.status(404).json(ErrorResponse("Not found $userId not exist"))
        }
    }

    fun deleteTweet(ctx: Context) {
        val id = ctx.pathParam(":tweetId")
        val userId = getUserId(ctx)
        try {
            val tweet = system.getTweet(id)
            if (tweet.author.id == userId) {
                system.deleteTweet(id)
                ctx.status(200).json(OkResponse())
            }
        } catch (e: NotFound) {
            ctx.status(404).json(ErrorResponse("The tweet does not belong to user $userId"))
        }
    }

    private fun getUserId(ctx: Context) : String {
        val id : String? = ctx.attribute("id")
        if (id == null) {
            UnauthorizedResponse()
        }
        return id!!
    }

    private fun validateImages(images: MutableList<String>): Boolean {
        return images.size <= 4
    }
}
