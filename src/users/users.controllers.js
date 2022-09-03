const uuid = require("uuid");
const { hashPassword } = require("../utils/crypt");

const Users = require('../models/user.model');

const userDB = [{
  "id": "74cd6011-7e76-4d6d-b25b-1d6e4182ec2f",
  "first_name": "Sahid",
  "last_name": "Kick",
  "email": "sahid.kick@academlo.com",
  "password": "$2b$10$TNGcRFonQH98rVqFaBVfpOEEv2Xcu5ej14tWqKim3z3L6Tr.ZIaqC",
  "phone": "1234567890",
  "birthday_date": "22/10/2000",
  "rol": "admin",
  "profile_image": "",
  "country": "mexico",
  "is_active": true,
  "verified": false
}];

const getAllUsers = async () => {

  const data = await Users.findAll({
    attributes: {
      exclude: ['password']
    }
  })
  return data;
  //? select * from users;
};

const getUserById = async(id) => {
  
  const data = await Users.findOne({
    where: {
      id
    },
    attributes: {
      exclude: ['password']
    }
  })
  return data
  //? select * from users where id = ${id};
};

const createUser = async(data) => {
  const newUser =  await Users.create({
    id: uuid.v4(), 
    firstName: data.first_name, 
    lastName: data.last_name, 
    email: data.email, 
    password: hashPassword(data.password), 
    phone: data.phone, 
    birthdayDate: data.birthday_date,
    role: "normal", 
    profileImage: data.profile_image,
    country: data.country,
    status: 'active',
    verified: false,
  })
  // const newUserWithSpreadOperator =  await Users.create({
  //   ...data,
  //   id: uuid.v4(), 
  //   password: hashPassword(data.password), 
  //   role: "normal", 
  //   is_active: true,
  //   verified: false,
  // })
  return newUser

};

const editUser = (id, data, userRol) => {
  const index = userDB.findIndex((user) => user.id === id);
  if (index !== -1) {
    userDB[index] = {
      id: id,
      first_name: data.first_name,
      last_name: data.last_name,
      email: data.email,
      password: userDB[index].password,
      phone: data.phone, //unico
      birthday_date: data.birthday_date,
      rol: userRol === 'admin' ? data.rol : 'normal',
      profile_image: data.profile_image,
      country: data.country,
      is_active: data.is_active,
      verified: false,
    };
    return userDB[index];
  } else {
    return createUser(data);
  }
};


const deleteUser = async (id) => {
  const data = await Users.destroy({
    where: {
      id: id
    }
  })
  return data
}

const getUserByEmail = (email) => {
  const data = userDB.filter((item) => item.email === email);
  return data.length ? data[0] : false
  //? select * from users where email = ${email};
}

const editProfileImg = (userID, imgUrl) => {
  const index = userDB.findIndex(user => user.id === userID)
  if(index !== -1){
    userDB[index].profile_image = imgUrl
    return userDB[index]
  }
  return false
}

module.exports = {
  createUser,
  getAllUsers,
  getUserById,
  editUser,
  deleteUser,
  getUserByEmail,
  editProfileImg
}