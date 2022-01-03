package Window

import Model.*
import Model.LoginModel
import org.uqbar.arena.widgets.Label
import org.uqbar.arena.widgets.Panel
import org.uqbar.arena.kotlin.extensions.*
import org.uqbar.arena.layout.HorizontalLayout
import org.uqbar.arena.widgets.*
import org.uqbar.arena.windows.SimpleWindow
import org.uqbar.arena.windows.WindowOwner
import org.uqbar.commons.model.exceptions.UserException
import org.uqbar.lacar.ui.model.Action


class UserView(owner: WindowOwner, model: UserModel): SimpleWindow<UserModel>(owner, model) {

    override fun addActions(mainPanel: Panel) {
        Button(mainPanel) with {
            text = "Agregar Tweet"
            onClick {
                var draft = DraftTweetModel("", mutableListOf())
                val view = AddAndEditTweetView(this@UserView, draft)
                view.onAccept {
                    modelObject.addTweet(draft)
                }
                view.open()
            }
        }
        Button(mainPanel) with {
            text = "Modificar Tweet"
            bindEnabledTo("check")
            onClick {
                try{
                    val draft = DraftTweetModel(modelObject.selected!!.text, modelObject.selected!!.images)
                    val view = AddAndEditTweetView(this@UserView, draft)
                    view.onAccept {
                        modelObject.modifyTweet(modelObject.selected!!.id, draft)
                    }
                    view.open()
                }catch (e: NullPointerException){
                    throw UserException("Selecciona un tweet primero")
                }
            }
        }

        Button(mainPanel) with {
            text = "Borrar Tweet"
            bindEnabledTo("check")
            onClick {
                val view = DeleteTweetView(this@UserView, modelObject.selected!!)
                view.onAccept {
                    modelObject.deleteTweet(modelObject.selected!!.id)
                }
                view.open()
            }
        }

        val buttonPanel = Panel (mainPanel)

        Button(buttonPanel) with {
            caption = "Logout"
            align = "right"
            onClick {
                thisWindow.close()
                Window.LoginView(thisWindow, LoginModel(modelObject.system)).open()
            }
        }

    }

    override fun createFormPanel(mainPanel: Panel) {

        val idPanel = Panel(mainPanel)
        idPanel.layout = HorizontalLayout()

        val emailPanel = Panel(mainPanel)
        emailPanel.layout = HorizontalLayout()

        val namePanel = Panel(mainPanel)
        namePanel.layout = HorizontalLayout()

        val imagePanel = Panel(mainPanel)
        imagePanel.layout = HorizontalLayout()

        title = "Twitter - " + modelObject.user.name
        iconImage = "arena/twitter.png"

        Label(idPanel) withText "ID: " + modelObject.user.id with { align = "left" }
        Label(emailPanel) withText "Email: " + modelObject.user.email with { align = "left" }
        Label(namePanel) withText "Nombre: "  with { align = "left" }
        Label(namePanel) with {bindTo("name")
            alignLeft() }
        Label(imagePanel) withText "Imagen: " with { align = "left" }
        Label(imagePanel) with {bindTo("image")
            alignLeft()}
        Button(mainPanel) with {
            caption = "Editar perfil"
            onClick {
                val user = EditProfileModel(modelObject.user, modelObject.system)
                val view = EditProfileView(this@UserView, user)
                view.onAccept {
                    modelObject.update(user)
                }
                view.open()
            }
        }
        Label(mainPanel) withText "_____________________________________________________________________________________"

        val botonPanel = Panel(mainPanel)
        botonPanel.layout = HorizontalLayout()

        TextBox(botonPanel) with {
            width = 180
            bindTo("text")
        }

        Button(botonPanel) with {
            caption = "Buscar"
            onClick(Action { modelObject.search() })
        }

        Button(botonPanel) with {
            caption = "Resetear busqueda"
            onClick(Action {
                modelObject.resetSearch()
            })
        }

        table<UserModel>(mainPanel) {
            bindSelectionTo("selected")
            bindItemsTo("tweets")
            visibleRows = 15
            column {
                title = "#"
                fixedSize = 50
                bindContentsTo("id")
            }
            column {
                title = "Texto"
                weight = 50
                bindContentsTo("text")
            }
            column {
                title = "Fecha"
                bindContentsTo("date")
            }
        }

    }
}

