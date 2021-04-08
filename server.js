const express = require('express');
const routes = require('./routes');
const bodyParser = require('body-parser')
const PORT = process.env.PORT || 3000;
const app = express();
app.use(bodyParser.json())
// logging.
const logger = require('morgan');
app.use(logger('dev'))

// import passport and passport-jwt modules
const passport = require('passport');
const passportJWT = require('passport-jwt');
const CONSTANTS = require('./config/constants');
const services = require('./services')

// ExtractJwt to help extract the token
let ExtractJwt = passportJWT.ExtractJwt;
// JwtStrategy which is the strategy for the authentication
let JwtStrategy = passportJWT.Strategy;

// lets create our strategy for web token
let strategy = new JwtStrategy(CONSTANTS.jwtOptions, async function (jwt_payload, next) {
    console.log('payload received', jwt_payload);
    let user = await services.getUser({ id: jwt_payload.id });
    if (user) {
        next(null, user);
    } else {
        next(null, false);
    }
});
// use the strategy
passport.use(strategy);

app.use(passport.initialize());
app.get('/protected', passport.authenticate('jwt', { session: false }), function(req, res) {
    res.json({ msg: 'Congrats! You are seeing this because you are authorized'});
});

app.use('/api/users', routes.userRoutes);
app.use('/auth', routes.authRoutes)

app.listen(PORT, () => console.log(`Listening on port: ${PORT}`))