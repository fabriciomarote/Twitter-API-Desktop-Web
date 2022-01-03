package Window

import org.uqbar.arena.widgets.*
import org.uqbar.arena.windows.MessageBox
import org.uqbar.arena.windows.SimpleWindow
import org.uqbar.arena.windows.WindowOwner
import org.uqbar.commons.model.exceptions.UserException
import Model.RegisterModel
import org.uqbar.arena.kotlin.extensions.*
import org.uqbar.lacar.ui.impl.jface.builder.traits.`JFaceClickable$class`.onClick
import java.util.*

class RegisterView(owner: WindowOwner, model: RegisterModel): SimpleWindow<RegisterModel>(owner, model) {

    override fun addActions(mainPanel: Panel) {
        Button(mainPanel) with {
            caption = "Aceptar"
            onClick {
                modelObject.registrar(modelObject.name, modelObject.email, modelObject.password, modelObject.image)
                thisWindow.showMessageBox(MessageBox.Type.Information, "Se ha registrado con éxito")
                close()
            }
        }

        Button(mainPanel) with {
            caption = "Cancelar"
            onClick({ close() })
        }
    }


    override fun createFormPanel(mainPanel: Panel?) {
        title = "Twitter - Registro"
        iconImage = "arena/twitter.png"
        Label(mainPanel) withText "Recuerda que los campos de nombre y mail no puede estar vacíos."
        Label(mainPanel) withText "----------------------------------------------------------------"
        Label(mainPanel) withText "Nombre y Apellido" with { align = "left" }
        TextBox(mainPanel) with {
            width = 180
            bindTo("name")
        }
        Label(mainPanel) withText "Email" with { align = "left" }
        TextBox(mainPanel) with {
            width = 180
            bindTo("email")
        }
        Label(mainPanel) withText  "Contraseña" with { align = "left" }
        PasswordField(mainPanel) with {
            width = 180
            bindTo("password")
        }
        Label(mainPanel) withText  "Repite tu contraseña" with { align = "left" }
        PasswordField(mainPanel) with {
            width = 180
            bindTo("passwordVal")
        }
        Label(mainPanel) withText  "Coloca tu primera imagen" with { align = "left" }
        TextBox(mainPanel) with {
            width = 180
            bindTo("image")
        }


    }
}