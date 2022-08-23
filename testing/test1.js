const sum = (a, b) => a - b

const testeando = () => {
    const  test1 = sum(4, 6)
    if(test1 !== -8){
        return 'Felicidades, pasaste el test'
    } else {
        return `Ups, tu resultado es: ${test1} y tenia que ser: 10`
    }
}

console.log(testeando())

const data = axios.post('localhost:8000/api/v1/auth/login', {
    email: "sahid.kick@academlo.com",
    password: "root"
})

data.status === 200
data.token === 'asodnsakdlfnsd'
data.message === 'Loggin succesfully'

const data2 = axios.post('localhost:8000/api/v1/auth/login', {
    email: "sahid.kick@academlo.com",
    password: "1234"
})

data.status === 400
data.message === 'Invalid Credentials'



