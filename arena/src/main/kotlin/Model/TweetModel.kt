package Model

import org.uqbar.commons.model.annotations.Observable
import java.time.LocalDateTime


@Observable
class TweetModel(val id: String, var text: String, val images: MutableList<String>, val date: LocalDateTime) {
}

@Observable
class DraftTweetModel(var text: String, var images: MutableList<String>){
    var image1 = images.getOrElse(0) { "" }
    var image2 = images.getOrElse(1) { "" }
    var image3 = images.getOrElse(2) { "" }
    var image4 = images.getOrElse(3) { "" }
}