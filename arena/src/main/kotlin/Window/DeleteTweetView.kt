package Window

import Model.TweetModel
import org.uqbar.arena.kotlin.extensions.*
import org.uqbar.arena.widgets.*
import org.uqbar.arena.windows.Dialog
import org.uqbar.arena.windows.WindowOwner
import org.uqbar.lacar.ui.impl.jface.builder.traits.`JFaceClickable$class`.onClick
import java.awt.SystemColor.text

class DeleteTweetView(owner: WindowOwner, model: TweetModel): Dialog<TweetModel>(owner,model) {
    override fun createFormPanel(mainPanel: Panel) {
        Label(mainPanel) with {
            text = "¿Esta seguro que desea eliminar : ${modelObject.id}"
        }

        Button(mainPanel) with {
            caption = "Aceptar"
            onClick {
                accept()
            }
        }
        Button(mainPanel) with {
            caption = "Cancelar"
            onClick {
                cancel()
            }
        }
    }
}