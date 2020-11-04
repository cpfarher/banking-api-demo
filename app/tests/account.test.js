const chai = require("chai");
const chaiHttp = require("chai-http");
const app = require("../../server");
const should = chai.should();
chai.use(chaiHttp);
const { expect } = chai;

describe("Testing the account endpoints", () => {
  it("/GET accounts - it should Get all accounts ", (done) => {
    chai
      .request(app)
      .get("/accounts")
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a("array");
        done();
      });
  });

it("/POST accounts - It should not create an account without customerId", (done) => {
  const account = {
    customerId: "",
    balance: 0,
  };
  chai
    .request(app)
    .post("/accounts")
    .set("Accept", "application/json")
    .send(account)
    .end((err, res) => {
      expect(res.status).to.equal(400);
      done();
    });
});

it("/POST accounts - It should not create an account with negative balance", (done) => {
  const account = {
    customerId: "1 ",
    balance: -6,
  };
  chai
    .request(app)
    .post("/accounts")
    .set("Accept", "application/json")
    .send(account)
    .end((err, res) => {
      expect(res.status).to.equal(500);
      done();
    });
});
});

