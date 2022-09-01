const userControllers = require("./users.controllers");

const getAll = (req, res) => {
  userControllers
    .getAllUsers()
    .then((response) => {
      res.status(200).json({ items: response.length, users: response });
    })
    .catch((err) => {
      res.status(400).json(err);
    });
};

const getById = (req, res) => {
  const id = req.params.id;
  userControllers
    .getUserById(id)
    .then((response) => {
      res.status(200).json(response);
    })
    .catch((err) => {
      res.status(404).json({ message: `El usuario con el id ${id} no existe` });
    });
};
/*
{
    id: 2,
    first_name: 'Sahid',
    last_name: 'Kick',
    email: 'sahid.kick@academlo.com,
    password: 'root',
    phone: '1234567890'
    birthday_date: '22/10/2000',
    rol: "normal", 
    profile_image: "",
    country: 'mexico'
    is_active: true,
    verified: false, 
  }*/
/*
{
    id: 2,
    firstName: 'Sahid',
    lastName: 'Kick',
    email: 'sahid.kick@academlo.com,
    password: 'root',
    phone: '1234567890'
    birthdayDate: '22/10/2000',
    rol: "normal", 
    profileImage: "",
    country: 'mexico'
    is_active: true,
    verified: false, 
  }*/

const register = (req, res) => {
  const data = req.body;
  if (!data) {
    return res.status(400).json({ message: "Missing Data" });
  } else if (
    !data.first_name ||
    !data.last_name ||
    !data.email ||
    !data.password ||
    !data.birthday_date ||
    !data.country
  ) {
    return res.status(400).json({
      message: "All fields must be completed",
      fields: {
        first_name: "string",
        last_name: "string",
        email: "examle@examle.com",
        password: "string",
        birthday_date: "DD/MM/YYYY",
        country: "string",
      },
    });
  } else {
    userControllers.createUser(data)
      .then((response) => {
        res.status(201).json({
          message: `User created succesfully with id: ${response.id}`,
          user: response,
        });
      })
      .catch(err => {
        res.status(400).json({message: err.errors[0].message})
      }) 
  }
};

const remove = (req, res) => {
  const id = req.params.id;
  userControllers.deleteUser(id)
    .then((response) => {
      if(response){
        res.status(204).json()
      }else{
        res.status(400).json({
          message: 'Invalid ID'
        })
      }
    })
};

const edit = (req, res) => {
  const id = req.params.id;
  const data = req.body;
  if (!Object.keys(data).length) {
    return res.status(400).json({ message: "Missing Data" });
  } else if (
    !data.first_name ||
    !data.last_name ||
    !data.email ||
    !data.phone ||
    !data.rol ||
    !data.profile_image ||
    !data.birthday_date ||
    !data.country ||
    !data.is_active
  ) {
    return res.status(400).json({
      message: "All fields must be completed",
      fields: {
        first_name: "string",
        last_name: "string",
        email: "examle@examle.com",
        phone: "+521231231230",
        rol: "normal",
        profile_image: "example.com/img/example.png",
        birthday_date: "DD/MM/YYYY",
        country: "string",
        is_active: true,
      },
    });
  } else {
    const response = userControllers.editUser(id, data, req.user.rol);
    return res.status(200).json({
      message: "User edited succesfully",
      user: response,
    });
  }
};

const editMyUser = (req, res) => {
  const id = req.user.id;
  const data = req.body;
  if (!Object.keys(data).length) {
    return res.status(400).json({ message: "Missing Data" });
  } else if (
    !data.first_name ||
    !data.last_name ||
    !data.email ||
    !data.phone ||
    !data.profile_image ||
    !data.birthday_date ||
    !data.country ||
    !data.is_active
  ) {
    return res.status(400).json({
      message: "All fields must be completed",
      fields: {
        first_name: "string",
        last_name: "string",
        email: "examle@examle.com",
        phone: "+521231231230",
        profile_image: "example.com/img/example.png",
        birthday_date: "DD/MM/YYYY",
        country: "string",
        is_active: true,
      },
    });
  } else {
    const response = userControllers.editUser(id, data);
    return res.status(200).json({
      message: "User edited succesfully",
      user: response,
    });
  }
};

const getMyUser = (req, res) => {
  const id = req.user.id;
  const data = userControllers.getUserById(id);
  res.status(200).json(data);
};

const removeMyUser = (req, res) => {
  const id = req.user.id;
  const data = userControllers.deleteUser(id);
  if (data) {
    res.status(204).json();
  } else {
    res.status(400).json({ message: "invalid id" });
  }
};

const postProfileImg = (req, res) => {
  const userId = req.user.id;
  //mi-sitio.com/api/v1/users/me/profile-img
  //localhost:8000/api/v1/users/me/profile-img

  const imgPath =
    req.hostname + ":8000" + "/api/v1/uploads/" + req.file.filename;

  const data = userControllers.editProfileImg(userId, imgPath);
  res.status(200).json(data);
};

module.exports = {
  getAll,
  getById,
  register,
  remove,
  edit,
  editMyUser,
  getMyUser,
  removeMyUser,
  postProfileImg,
};
