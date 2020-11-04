const chai = require("chai");
const chaiHttp = require("chai-http");
const app = require("../../server");
const should = chai.should();
chai.use(chaiHttp);
const { expect } = chai;

describe("Testing the transfer endpoints", () => {
  it("/GET transfers - it should Get all transfers ", (done) => {
    chai
      .request(app)
      .get("/transfers")
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a("array");
        done();
      });
  });

it("/POST transfers - It should not create a transfer with amount 0", (done) => {
  const transfer = {
    fromBankAccountId: 1,
    toBankAccountId: 2,
    amount: 0,
  };
  chai
    .request(app)
    .post("/transfers")
    .set("Accept", "application/json")
    .send(transfer)
    .end((err, res) => {
      expect(res.status).to.equal(500);
      done();
    });
});

it("/POST accounts - It should not create a transfer between the same fromAccountId and toAccountId", (done) => {
  const transfer = {
    fromAccountId: 1,
    toAccountId: 1,
    amount: 2,
  };
  chai
    .request(app)
    .post("/transfers")
    .set("Accept", "application/json")
    .send(transfer)
    .end((err, res) => {
      expect(res.status).to.equal(422);
      done();
    });
});
});

