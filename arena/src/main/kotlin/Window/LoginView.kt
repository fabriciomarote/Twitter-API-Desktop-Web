package Window

import Model.*
import org.uqbar.arena.kotlin.extensions.*
import org.uqbar.arena.widgets.*
import org.uqbar.arena.windows.SimpleWindow
import org.uqbar.arena.windows.WindowOwner

class LoginView: SimpleWindow<LoginModel> {
    constructor(owner: WindowOwner, model: LoginModel) : super(owner, model)

    override fun addActions(p0: Panel?) { }

    override fun createFormPanel(mainPanel: Panel?) {
        title = "Twitter - Login"
        iconImage = "arena/twitter.png"
        Label(mainPanel) withText "Email"
        TextBox(mainPanel) with {
            width = 180
            bindTo("email")
        }
        Label(mainPanel) withText  "Password"
        PasswordField(mainPanel) with {
            width = 180
            bindTo("password")
        }
        Button(mainPanel) with {
            caption = "Login"
            onClick{
                var user =  modelObject.login(modelObject.email, modelObject.password)
                thisWindow.close()
                UserView(thisWindow ,UserModel(user, modelObject.system)).open()
            }
        }
        Link(mainPanel) with {
            text = "Registrate Aquí"
            onClick{
                var modelR = RegisterModel(modelObject.system)
                RegisterView(thisWindow, modelR).open()
            }
        }
    }
}