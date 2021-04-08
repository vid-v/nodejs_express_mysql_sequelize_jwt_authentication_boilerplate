const passportJWT = require('passport-jwt');
let ExtractJwt = passportJWT.ExtractJwt;

const CONSTANTS = {
    jwtOptions: {
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        secretOrKey: 'wowwow'
    }
}

module.exports = CONSTANTS