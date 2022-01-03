package Model

import org.unq.ui.model.TwitterSystem
import org.unq.ui.model.User
import org.uqbar.commons.model.annotations.Observable
import org.uqbar.commons.model.exceptions.UserException
import org.unq.ui.model.UsedEmail

@Observable
class RegisterModel(val system: TwitterSystem) {
    var email = ""
    var name = ""
    var password = ""
    var passwordVal = ""
    var image = ""

    fun registrar(nombre: String, mail: String, pass: String, imagen: String): User{
        if (validación()) {
            try {
                return system.register(nombre, mail, pass, imagen)
            }catch (e: UsedEmail){
                    throw UserException("¡Ese Email ya esta en uso!")
                }
            }else{
                throw UserException("Los campos nombre y mail no puede estar vacíos o los campos de contraseñas no coinciden")
            }
    }

    fun validación(): Boolean{
        return !name.isEmpty() && !password.isEmpty() && !email.isEmpty() && password == passwordVal
    }
}