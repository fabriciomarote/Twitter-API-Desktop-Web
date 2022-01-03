package org.api

import org.unq.ui.model.DraftTweet
import org.unq.ui.model.Tweet
import org.unq.ui.model.User
import java.time.LocalDateTime
import java.time.format.DateTimeFormatter

data class OkResponse(val result: String = "ok")

data class ErrorResponse(val result: String)

data class LoginErrorResponse(val result: String,
                              val message: String)

data class SearchResponse(val content : List<Any>)

data class LoginResponse(val email: String,
                         val password: String)

data class UserSimpleResponse(val name: String,
                              val email: String,
                              val password: String,
                              val image: String)

data class UserEdit(val name: String,
                    val password: String,
                    val image: String)

data class UserResponse(val id: String,
                        val name: String,
                        val image: String,
                        val followers: List<SimpleUser>,
                        val timeline: List<TweetResponse>)

data class UserByIdResponse(val name: String,
                            val image: String,
                            val followers: List<SimpleUser>,
                            val tweets: List<TweetResponse>)

data class UserWithFollowersResponse(val id: String,
                                     val name: String,
                                     val image: String,
                                     val followers: List<SimpleUser>)

data class TweetResponse(val id: String,
                         val text: String,
                         val images: MutableList<String>,
                         val reply: SimpleTweet?,
                         val likes: List<SimpleUser>,
                         val date: String,
                         val author: SimpleUser,
                         val comment: List<SimpleComment>)

data class TweetCommentResponse(val id: String,
                                val text: String,
                                val images: MutableList<String>,
                                val reply: SimpleTweet?,
                                val likes: List<SimpleUser>,
                                val date: String,
                                val author: SimpleUser,
                                val comment: List<SimpleComment>)

data class SimpleUser(val id: String,
                      val name: String,
                      val image: String)

data class SimpleTweet(val id: String,
                       val text: String,
                       val images: MutableList<String>,
                       val author: SimpleUser)

data class SimpleTweetWithLikes(val id: String,
                                val text: String,
                                val images: MutableList<String>,
                                val likes: List<SimpleUser>,
                                val date: String,
                                val author: SimpleUser)

data class SimpleComment(val id: String,
                         val text: String,
                         val images: MutableList<String>,
                         val author: SimpleUser,
                         val reply: SimpleTweet?,
                         val likes: List<SimpleUser>,
                         val comment: List<SimpleComment>)

class Transform(){
    companion object transformer{

        fun userToSimpleUser(user: User): SimpleUser{
            return SimpleUser(user.id, user.name, user.image)
        }

        fun tweetToSimpleTweet(tweet: Tweet): SimpleTweet {
            return SimpleTweet(tweet.id, tweet.text, tweet.images, userToSimpleUser(tweet.author))
        }

        fun likesToSimpleUsers(likes: MutableList<User>): List<SimpleUser>{
            val likesTransformed = likes.map{u -> SimpleUser(u.id, u.name, u.image)}
            return likesTransformed
        }

        fun commentsToSimpleComments(comments: MutableList<Tweet>): List<SimpleComment> {
            val commentsTransformed = comments.map { c -> SimpleComment(c.id, c.text, c.images, userToSimpleUser(c.author), replyToSimpleTweet(c.reply), likesToSimpleUsers(c.likes), commentsToSimpleComments(c.comments))}
            return commentsTransformed
        }

        fun dateToFormattedDate(date: LocalDateTime): String {
            val formatter = DateTimeFormatter.ofPattern("dd/MM/yyyy - HH:mm")
            val formatDateTime = LocalDateTime.parse(date.toString())
            return formatDateTime.format(formatter).toString()
        }

        fun replyToSimpleTweet(reply: Tweet?): SimpleTweet?{
            val response =
                if (reply != null){
                tweetToSimpleTweet(reply)
                }else{
                    null
                }
            return response
        }

        fun followersToSimpleUsers(followers: List<User>): List<SimpleUser>{
            val followersTransformed = followers.map {
                SimpleUser(it.id, it.name, it.image)
            }
            return followersTransformed
        }

        fun listTweetToTweetResponse(list: List<Tweet>): List<TweetResponse>{
            return list.map{
                TweetResponse(it.id, it.text, it.images, replyToSimpleTweet(it.reply), likesToSimpleUsers(it.likes),
                dateToFormattedDate(it.date), userToSimpleUser(it.author), commentsToSimpleComments(it.comments))}
        }
    }
}