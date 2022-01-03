package Window

import org.uqbar.arena.kotlin.extensions.*
import org.uqbar.arena.widgets.*
import org.uqbar.arena.windows.Dialog
import org.uqbar.arena.windows.WindowOwner
import Model.EditProfileModel
import org.uqbar.arena.windows.MessageBox


class EditProfileView(owner: WindowOwner, model: EditProfileModel): Dialog<EditProfileModel>(owner, model) {

    override fun addActions(mainPanel: Panel) {
        Button(mainPanel) with {
            caption = "Aceptar"
            onClick {
                modelObject.editName(modelObject.name, modelObject.image)
                thisWindow.showMessageBox(MessageBox.Type.Information, "Su perfil ha sido actualizado con éxito")
                accept()
            }
        }
        Button(mainPanel) with {
            caption = "Cancelar"
            onClick{
                cancel()
            }
        }
        Button(mainPanel) with {
            caption = "Cambiar contraseña"
            onClick {
                val view = EditPasswordView(thisWindow, modelObject)
                modelObject.resetPasswordFields()
                view.open()
            }
        }
    }

    override fun createFormPanel(mainPanel: Panel?) {
        title = "Edit profile"
        Label(mainPanel) withText "Nombre"
        TextBox(mainPanel) with {
            width = 180
            bindTo("name")

        }
        Label(mainPanel) withText "Imagen"
        TextBox(mainPanel) with {
            width = 180
            bindTo("image")
        }
    }
}