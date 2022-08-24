const { assert } = require("chai")
const { it, describe } = require("mocha")

const usersControllers = require('../users.controllers')

describe('Test Unitario de mis usuarios', () => {
    it('Should return new user when I sent correct data', (done) => {
        const body = {
            first_name: "Usuario de test",
            last_name: "tester",
            email: "test@academlo.com",
            password: "1234",
            phone: "65321354",
            birthday_date: "22/10/2000",
            country: "mexico"
        }

        const data = usersControllers.createUser(body)

        assert.equal(data.first_name, body.first_name)
        assert.equal(data.rol,'normal')
        assert.notEqual(data.password, body.password)
        assert.equal(data.profile_image, '')
        done()
    })
    it('Should return new user when I sent correct data with optional inputs', (done) => {
        const body = {
            first_name: "Usuario de test",
            last_name: "tester",
            email: "test@academlo.com",
            password: "1234",
            phone: "65321354",
            birthday_date: "22/10/2000",
            country: "mexico",
            profile_image: 'asd'
        }

        const data = usersControllers.createUser(body)

        assert.equal(data.first_name, body.first_name)
        assert.equal(data.rol,'normal')
        assert.notEqual(data.password, body.password)
        assert.equal(data.profile_image, 'asd')
        assert.typeOf(data.id, 'string')
        assert.property(data, 'is_active')
        done()
    })
})


