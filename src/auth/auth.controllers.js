const {getUserByEmail} = require('../users/users.controllers')
const { comparePassword } = require('../utils/crypt')

const loginUser = (email, password) => {
    const user = getUserByEmail(email)
    //? user.password Contraseña hasheada
    //* password Contraseña en texto plano
    const verify_password = comparePassword(password, user.password)

    return verify_password
}

console.log(loginUser('sahid.kick@academlo.com', 'root123'))
