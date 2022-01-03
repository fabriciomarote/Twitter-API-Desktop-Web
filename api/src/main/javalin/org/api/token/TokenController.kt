package org.api.token

import com.auth0.jwt.*
import com.auth0.jwt.algorithms.Algorithm
import javalinjwt.JWTGenerator
import javalinjwt.JWTProvider
import org.unq.ui.model.User

class InvalidToken(): Exception("Invalid token")

class TokenController {
    private val algorithm: Algorithm = Algorithm.HMAC256("klapaucius")
    private val generator: JWTGenerator<User> = JWTGenerator<User>{
        user: User, alg: Algorithm? ->
        val token: JWTCreator.Builder = JWT.create()
            .withClaim("id", user.id)
        token.sign(alg)
    }

    private val verifier: JWTVerifier = JWT.require(algorithm).build()
    private val provider = JWTProvider(algorithm, generator, verifier)

    fun generate(user: User) : String = provider.generateToken(user)

    fun validate(token: String) : String {
        val jwt = provider.validateToken(token)

        if (jwt.isPresent && jwt.get().claims.containsKey("id")){
            return jwt.get().getClaim("id").asString()
        }
        else {
            throw InvalidToken()
        }
    }

}