const { assert } = require("chai")
const { it, describe } = require("mocha")

const sum = (a , b) => {
    const newA = Number(a)
    const newB = Number(b)
    if(newA !== a || newB !== b){
        return 'error'
    } else {
        return a + b
    }
}

describe('Test Unitario de mis usuarios', () => {
    it('Deberia retornar 8', (done) => {
        const miFuncionEjecutada = sum(6, 2)
        assert.equal(miFuncionEjecutada, 8, 'Ups no es 8')
        done()
    })
    it('Deberia retornar 25', (done) => {
        const miFuncionEjecutada = sum(15,10)
        assert.equal(miFuncionEjecutada, 25, 'Ups no es 25')
        done()
    })
    it('Deberia retornar -8', (done) => {
        const miFuncionEjecutada = sum(-6, -2)
        assert.equal(miFuncionEjecutada, -8, 'Ups no es -8')
        done()
    })
    it('Deberia retornar error cuando se manda un string', (done) => {
        const miFuncionEjecutada = sum(6, 'hola')
        assert.equal(miFuncionEjecutada, 'error', 'Ups no es error')
        done()
    })
})


