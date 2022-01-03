package Window

import Model.EditProfileModel
import org.uqbar.arena.kotlin.extensions.*
import org.uqbar.arena.widgets.*
import org.uqbar.arena.windows.Dialog
import org.uqbar.arena.windows.MessageBox
import org.uqbar.arena.windows.WindowOwner

class EditPasswordView(owner: WindowOwner, model: EditProfileModel): Dialog<EditProfileModel>(owner, model) {
    override fun addActions(mainPanel: Panel) {
        Button(mainPanel) with {
            caption = "Aceptar"
            onClick {
                modelObject.editPass(modelObject.password)
                thisWindow.showMessageBox(MessageBox.Type.Information, "Haz actualizado tu contraseña")
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
    override fun createFormPanel(mainPanel: Panel?) {
        title = "Editar Password"
        Label(mainPanel) withText "Contraseña actual"
        PasswordField(mainPanel) with {
            width = 180
            bindTo("oldPass")
        }
        Label(mainPanel) withText "Contraseña nueva"
        PasswordField(mainPanel) with {
            width = 180
            bindTo("password")
        }
        Label(mainPanel) withText "Repita su contraseña"
        PasswordField(mainPanel) with {
            width = 180
            bindTo("passwordVal")
        }

    }
}