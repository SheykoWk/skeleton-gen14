const chai = require("chai");
const { it, describe } = require("mocha");
const chaiHttp = require("chai-http");

const app = require("../../app");

chai.use(chaiHttp);

describe("Suite de test de integracion de Usuarios", () => {

    it("Should return 200 when I sent a correct ID in params", (done) => {
        chai
          .request(app)
          .get("/api/v1/users/74cd6011-7e76-4d6d-b25b-1d6e4182ec2f")
          .set(
            "Authorization",
            "JWT eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Ijc0Y2Q2MDExLTdlNzYtNGQ2ZC1iMjViLTFkNmU0MTgyZWMyZiIsImVtYWlsIjoic2FoaWQua2lja0BhY2FkZW1sby5jb20iLCJyb2wiOiJhZG1pbiIsImlhdCI6MTY2MTIxNzQ2NX0.puzOLLM-Jxh4P2wgPqyP9vWXWZ9qGknFF8nlQTSIYnU"
          )
          .end((err, res) => {
            chai.assert.equal(res.status, 200);
            chai.assert.property(res.body, 'id')
            chai.assert.property(res.body, 'email')
            chai.assert.property(res.body, 'rol')
            chai.assert.equal(res.body.rol, 'admin')
            chai.assert.equal(res.body.email, 'sahid.kick@academlo.com')
            done()
        });
      });

  it("Should return 204 when I delete my own user with my credentials", (done) => {
    chai
      .request(app)
      .delete("/api/v1/users/me")
      .set(
        "Authorization",
        "JWT eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Ijc0Y2Q2MDExLTdlNzYtNGQ2ZC1iMjViLTFkNmU0MTgyZWMyZiIsImVtYWlsIjoic2FoaWQua2lja0BhY2FkZW1sby5jb20iLCJyb2wiOiJhZG1pbiIsImlhdCI6MTY2MTIxNzQ2NX0.puzOLLM-Jxh4P2wgPqyP9vWXWZ9qGknFF8nlQTSIYnU"
      )
      .end((err, res) => {
        chai.assert.equal(res.status, 204);
        done();
      });
  });
});
