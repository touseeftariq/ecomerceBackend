const expressJwt = require('express-jwt')

function authJwt() {
    const secret = process.env.secret
    return expressJwt({
        secret,
        algorithms: ['HS256'],
        isRevoked: isRevoked
    }).unless({
        path: [
            { url: /\/api\/v1\/products(.*)/, method: ['GET', 'OPTIONS'] },
            { url: /\/api\/v1\/categories(.*)/, method: ['GET', 'OPTIONS'] },
            "/api/v1/users/login"
        ]
    })
}

function isRevoked(req, payload, done) {
    if (!payload.isAdmin) {
        done(null, true)
    }

    done()
}

module.exports = authJwt;