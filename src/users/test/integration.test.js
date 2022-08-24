const chai= require("chai")
const { it, describe } = require("mocha")
const chaiHttp = require('chai-http')

const app = require('../../app')

chai.use(chaiHttp)

describe('Suite de test de integracion de Usuarios', () => {
    it('Should return 204 when I delete my own user with my credentials', (done) => {
        chai.request(app)
            .delete('/api/v1/users/me')
            .set('Authorization', 'JWT eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Ijc0Y2Q2MDExLTdlNzYtNGQ2ZC1iMjViLTFkNmU0MTgyZWMyZiIsImVtYWlsIjoic2FoaWQua2lja0BhY2FkZW1sby5jb20iLCJyb2wiOiJhZG1pbiIsImlhdCI6MTY2MTIxNzQ2NX0.puzOLLM-Jxh4P2wgPqyP9vWXWZ9qGknFF8nlQTSIYnU')
            .end((err, res) => {
                chai.assert.equal(res.status, 204)
                done()
            })
        })
})
