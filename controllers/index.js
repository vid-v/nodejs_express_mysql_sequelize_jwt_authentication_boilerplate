const {
    createUser,
    getAllUsers,
    getUserById,
    updateUser,
    deleteUser
} = require('./users');

const {
    login
} = require('./auth')

module.exports = {
    // users controller methods.
    createUser,
    getAllUsers,
    getUserById,
    updateUser,
    deleteUser,

    // auth controller methods.
    login,
}