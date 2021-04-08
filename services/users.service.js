const User = require('../models').User;

const getUserByEmail = async (email) => {
    try {
        // console.log('----Model.User----', User())
        const user = await User.findOne()
        // console.log('user---', user[0])
        return user;
    } catch (e) {
        console.log('error-:', e)
        return null
    }
}

const getUser = async (param) => {
    try {
        const user = await User.findOne({where: param})
        return user;

    } catch (e) {
        return null
    }
}
module.exports = {
    getUserByEmail,
    getUser
}