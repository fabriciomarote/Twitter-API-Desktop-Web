package Model

import org.unq.ui.model.TwitterSystem
import org.unq.ui.model.User
import org.uqbar.commons.model.annotations.Observable
import org.uqbar.commons.model.exceptions.UserException
import org.unq.ui.model.NotFound

@Observable
class LoginModel(val system: TwitterSystem) {
    var email = ""
    var password = ""

    fun login(email: String, password: String): User {
        try {
            return system.login(email, password)
        }catch (e: NotFound){
            throw UserException("Usuario o contraseña invalido, pruebe de nuevo. ¡Si no esta registrado haga click más abajo!")
        }
    }

}