const verbMiddleware = (req, res, next) => {
    console.log('Request Type:', req.method)
    if(req.method === 'POST'){
        res.status(200).json({message: 'Hiciste una peticion tipo POST'})
    } else {
        next()
    }
}

module.exports = {verbMiddleware}
