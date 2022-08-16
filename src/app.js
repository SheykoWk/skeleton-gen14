//* Dependencias
const express = require('express')

//*Archivos de rutas
const userRouter = require('./users/users.router').router

//* Configuraciones iniciales
const app = express()

//? Esta configuracion es para habilitar el req.body
app.use(express.json())

app.get('/', (req, res) => {
    res.status(200).json({message: 'All ok!'})
})

app.use('/api/v1/users', userRouter)

app.listen(8000, () => {
    console.log('Server started at port 8000')
})
