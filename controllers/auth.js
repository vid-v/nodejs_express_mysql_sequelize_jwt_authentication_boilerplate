const { getUserByEmail } = require('../services')
const jwt = require('jsonwebtoken');
const CONSTANTS = require('../config/constants');

const login = async function (req, res, next) {
    try {

        const { email, password } = req.body;
        if (email && password) {
            // we get the user with the email and save the resolved promise
            let user = await getUserByEmail({ email });

            if (!user) {
                return res.status(401).json({ msg: 'No such user found', user });
            }
            if (user.password === password) {
                // from now on we'll identify the user by the id and the id is
                // the only personalized value that goes into our token
                let payload = { id: user.id };
                let token = jwt.sign(payload, CONSTANTS.jwtOptions.secretOrKey);
                return res.json({ msg: 'ok', token: token });
            } else {
                return  res.status(401).json({ msg: 'Password is incorrect' });
            }
        } else {
            return res.status(401).json({ msg: 'Invalid User.' });
        }
    } catch (e) {
        console.log('----------err-r-----', e)
        return res.status(401).json({ msg: 'Server Error.' });
    }
}


module.exports = {
    login
}