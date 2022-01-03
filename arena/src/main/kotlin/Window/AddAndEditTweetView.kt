package Window


import Model.DraftTweetModel
import Model.TweetModel
import org.uqbar.arena.kotlin.extensions.*
import org.uqbar.arena.widgets.*
import org.uqbar.arena.windows.Dialog
import org.uqbar.arena.windows.WindowOwner
import org.uqbar.arena.xtend.ArenaXtendExtensions
import org.uqbar.commons.model.exceptions.UserException



class AddAndEditTweetView(owner: WindowOwner, model: DraftTweetModel) : Dialog<DraftTweetModel>(owner, model) {

    override fun createFormPanel(mainPanel: Panel) {
        title = "Tweet"

        Label(mainPanel) withText "Texto"
        TextBox(mainPanel) with {
            width = 180
            bindTo("text")
        }

        Label(mainPanel) withText "1° Imagen"
        TextBox(mainPanel) with {
            width = 180
            bindTo("image1")
        }

        Label(mainPanel) withText "2° Imagen"
        TextBox(mainPanel) with {
            width = 180
            bindTo("image2")
        }

        Label(mainPanel) withText "3° Imagen"
        TextBox(mainPanel) with {
            width = 180
            bindTo("image3")
        }

        Label(mainPanel) withText "4° Imagen"
        TextBox(mainPanel) with {
            width = 180
            bindTo("image4")
        }

        Button(mainPanel) with{
            caption = "Aceptar"
            onClick {
                if( modelObject.text.isEmpty() ){
                    throw UserException ("El texto no puede estar vacío")
                } else {
                    accept()
                }
            }
        }

        Button(mainPanel) with{
            caption = "Cancelar"
            onClick {
                cancel()
            }
        }
    }
}