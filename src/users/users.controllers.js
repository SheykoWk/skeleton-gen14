const uuid = require('uuid')
const { comparePassword, hashPassword} = require('../utils/crypt')


const userDB = []


const getAllUsers = () => {
    return userDB
    //? select * from users;
}

const getUserById = (id) => {
    const data = userDB.filter(item => item.id === id)
    return data[0]
    //? select * from users where id = ${id};
}

const createUser = (data) => {
    const newUser = {
        id: uuid.v4(), //obligatorio y unico
        first_name: data.first_name, //obligatorio
        last_name: data.last_name, //obligatorio
        email: data.email, //obligatorio y unico
        password: hashPassword(data.password), //obligatorio
        phone: data.phone ? data.phone : '' , //unico
        birthday_date: data.birthday_date, //obligatorio
        rol: 'normal', //obligatorio y por defecto "normal"
        profile_image: data.profile_image ? data.profile_image : '',
        country: data.country,  //obligatorio
        is_active: true, //obligatorio y por defecto true
        verified: false //obligatorio y por defecto false
    }
    console.log(newUser);
}
createUser({password: 'root'})



const suma = (a , b) => a + b

suma(3 , 6)

