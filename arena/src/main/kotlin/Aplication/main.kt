package twitter2021

import org.unq.ui.bootstrap.getTwitterSystem
import org.uqbar.arena.Application
import org.uqbar.arena.windows.Window
import Model.LoginModel
import Window.LoginView

class Aplicacion: Application() {
    override fun createMainWindow(): Window<*> {
        val system = getTwitterSystem()
        val model = LoginModel(system)
        return LoginView(this, model)

    }

}

fun main(){
    Aplicacion().start()
}