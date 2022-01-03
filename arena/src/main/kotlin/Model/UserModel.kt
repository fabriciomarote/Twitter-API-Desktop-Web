package Model

import org.unq.ui.model.DraftTweet
import org.unq.ui.model.TwitterSystem
import org.unq.ui.model.User
import org.uqbar.commons.model.annotations.Observable

@Observable
class UserModel(var user: User,val system: TwitterSystem) {
    var id = user.id
    var email = user.email
    var name = user.name
    var image = user.image
    var password = user.password
    var tweets = listOf<TweetModel>()

    init { updateTweets() }

    private fun updateTweets() {
        tweets = user.tweets.map { TweetModel(it.id, it.text, it.images, it.date) }
    }

    var selected: TweetModel? = null
        set(value) {
            if (value != null) {
                check = true
                field = value
            }else{
                check = false
            }
        }
    var check = false
    var text = selected?.text
    var date = selected?.date

    fun addTweet(draft: DraftTweetModel) {
        var imageList: MutableList<String> = mutableListOf(draft.image1, draft.image2, draft.image3, draft.image4)
        system.addTweet( this.id, DraftTweet(draft.text, imageList))
        updateTweets()
    }

    fun modifyTweet(id : String, draft: DraftTweetModel){
        var imageList: MutableList<String> = mutableListOf(draft.image1, draft.image2, draft.image3, draft.image4)
        system.editTweet(id, DraftTweet(draft.text, imageList))
        updateTweets()
    }

    fun deleteTweet(id : String){
        system.deleteTweet(id)
        updateTweets()
    }

    private fun searchTweet(text: String){
        this.tweets = tweets.filter { it.text.contains(text) }
    }
    fun search(){
        this.text?.let { it -> this.searchTweet(it) }
    }

    fun resetSearch() {
        this.tweets  = system.searchByUserId(id).map { TweetModel(it.id, it.text, it.images, it.date) }
        this.text = ""
    }

    fun update(user : EditProfileModel ) {
        this.name = user.name
        this.password = user.password
        this.image = user.image
    }

}
