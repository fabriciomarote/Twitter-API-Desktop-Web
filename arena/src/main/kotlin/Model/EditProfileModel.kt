package Model

import org.unq.ui.model.TwitterSystem
import org.unq.ui.model.User
import org.uqbar.commons.model.annotations.Observable
import org.uqbar.commons.model.exceptions.UserException

@Observable
class EditProfileModel(val user: User, val system: TwitterSystem) {
    var name = user.name
    var oldPass = ""
    var password = ""
    var passwordVal = ""
    var image = user.image

    fun editName(newName: String, newImage: String){
        if(validarCampoNombre()){
            system.editProfile(user.id, newName, user.password, newImage)
        }else{
            throw UserException("El texto no puede estar vacío")
        }
    }

    fun editPass(newPass: String){
        if(validarCampoPassword()){
            system.editProfile(user.id, user.name, newPass, user.image)
        }else{
            throw UserException("Sus contraseñas no coinciden")
        }
    }

    fun validarCampoNombre():Boolean{
        return !name.isEmpty()
    }
    fun resetPasswordFields(){
        this.password = ""
        this.passwordVal = ""
        this.oldPass = ""
    }

    fun validarCampoPassword(): Boolean{
        return !password.isEmpty() && password == passwordVal && user.password == oldPass
    }
}