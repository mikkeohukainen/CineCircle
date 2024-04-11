require("dotenv").config();
process.env.NODE_ENV = "test";
const chai = require("chai");
const chaiHttp = require("chai-http");
const server = require("../src/server");
const db = require("../database/db_connection");
const DBMigrate = require("db-migrate");

const dbmigrate = DBMigrate.getInstance(true, {
  config: "database.json",
});

chai.use(chaiHttp);

const expect = chai.expect;

describe("Users", function () {
  before("set up database", async function () {
    await db.createDatabase();
    await dbmigrate.up();
  });

  afterEach("empty database tables", async function () {
    await db.emptyDatabase();
  });

  describe("/POST user", function () {
    it("should register a user with valid credentials", async function () {
      const res = await chai.request(server).post("/users").send({
        username: "test123",
        password: "password",
        confirmPw: "password",
      });
      expect(res).to.have.status(201);
    });

    it("should reject if the username is already taken", async function () {
      const user = {
        username: "test123",
        password: "password",
        confirmPw: "password",
      };

      // Create user
      await chai.request(server).post("/users").send(user);

      // Attempt to create user with same username
      const res = await chai.request(server).post("/users").send(user);

      expect(res).to.have.status(409);
      expect(res.body.message).to.equal("Username already exists");
    });

    it("should reject if the password and confirmation password do not match", async function () {
      const res = await chai.request(server).post("/users").send({
        username: "test123",
        password: "password",
        confirmPw: "password123",
      });
      expect(res).to.have.status(400);
      expect(res.body.message).to.equal("Confirmation password does not match");
    });

    it("should reject if fields not provided", async function () {
      const res = await chai.request(server).post("/users").send({});
      expect(res).to.have.status(400);
      expect(res.body.message).to.equal("Missing fields");
    });

    it("should reject if password is too short", async function () {
      const res = await chai.request(server).post("/users").send({
        username: "test123",
        password: "pass",
        confirmPw: "pass",
      });
      expect(res).to.have.status(400);
      expect(res.body.message).to.equal("Password must be between 8 and 72 characters");
    });

    it("should reject if password is too long", async function () {
      const res = await chai
        .request(server)
        .post("/users")
        .send({
          username: "test123",
          password: "password".repeat(10),
          confirmPw: "password".repeat(10),
        });
      expect(res).to.have.status(400);
      expect(res.body.message).to.equal("Password must be between 8 and 72 characters");
    });
  });

  describe("/POST session", function () {
    it("should log in a user with valid credentials", async function () {
      // Create user
      await chai.request(server).post("/users").send({
        username: "test",
        password: "test1234",
        confirmPw: "test1234",
      });

      // Log in
      const loginRes = await chai.request(server).post("/users/session").send({
        username: "test",
        password: "test1234",
      });

      expect(loginRes).to.have.status(200);
      expect(loginRes.body.username).to.equal("test");
      expect(loginRes.body.userId).to.be.a("string");
      expect(loginRes.body.jwtToken).to.be.a("string");
    });

    it("should reject if user does not exist", async function () {
      const res = await chai.request(server).post("/users/session").send({
        username: "nonexistentuser",
        password: "password",
      });

      expect(res).to.have.status(401);
      expect(res.body.message).to.equal("Incorrect username or password");
    });

    it("should reject if password is incorrect", async function () {
      // Create user
      await chai.request(server).post("/users").send({
        username: "test123",
        password: "password",
        confirmPw: "password",
      });

      // Log in with incorrect password
      const res = await chai.request(server).post("/users/session").send({
        username: "test123",
        password: "password123",
      });

      expect(res).to.have.status(401);
      expect(res.body.message).to.equal("Incorrect username or password");
    });

    it("should reject if fields not provided", async function () {
      const res = await chai.request(server).post("/users/session").send({});
      expect(res).to.have.status(400);
      expect(res.body.message).to.equal("Missing fields");
    });
  });

  describe("/GET user", function () {
    it("should get a user by username", async function () {
      // Create user
      await chai.request(server).post("/users").send({
        username: "test123",
        password: "password",
        confirmPw: "password",
      });

      // Get user
      const res = await chai.request(server).get("/users/test123");
      expect(res).to.have.status(200);
      expect(res.body).to.have.property("username");
      expect(res.body).to.have.property("user_id");
      expect(res.body).to.have.property("reviews_ids");
      expect(res.body).to.have.property("favorite_ids");
      expect(res.body).to.have.property("group_ids");
    });

    it("should return 404 if user does not exist", async function () {
      const res = await chai.request(server).get("/users/nonexistentuser");
      expect(res).to.have.status(404);
    });
  });

  describe("/DELETE user", function () {
    it("should delete the logged in user", async function () {
      // Create user
      await chai.request(server).post("/users").send({
        username: "test123",
        password: "password",
        confirmPw: "password",
      });

      // Log in
      const loginRes = await chai.request(server).post("/users/session").send({
        username: "test123",
        password: "password",
      });

      // Delete user
      const deleteRes = await chai
        .request(server)
        .delete("/users")
        .set("Authorization", `Bearer ${loginRes.body.jwtToken}`)
        .send({
          password: "password",
        });

      expect(deleteRes).to.have.status(200);
    });

    it("should reject if no authorization header is provided", async function () {
      const res = await chai.request(server).delete("/users");
      expect(res).to.have.status(401);
      expect(res.body.message).to.equal("Authorization header required");
    });

    it("should reject if token is invalid", async function () {
      // Create user
      await chai.request(server).post("/users").send({
        username: "test123",
        password: "password",
        confirmPw: "password",
      });

      // Attempt to delete user with invalid token
      const res = await chai
        .request(server)
        .delete("/users")
        .send({
          password: "password",
        })
        .set("Authorization", "Bearer invalidtoken");
      expect(res).to.have.status(401);
      expect(res.body.message).to.equal("Invalid token");
    });

    it("should reject if password is incorrect", async function () {
      // Create user
      await chai.request(server).post("/users").send({
        username: "test123",
        password: "password",
        confirmPw: "password",
      });

      // Log in
      const loginRes = await chai.request(server).post("/users/session").send({
        username: "test123",
        password: "password",
      });

      // Delete user using incorrect password
      const deleteRes = await chai
        .request(server)
        .delete("/users")
        .set("Authorization", `Bearer ${loginRes.body.jwtToken}`)
        .send({
          password: "wrongpassword",
        });

      expect(deleteRes).to.have.status(401);
      expect(deleteRes.body.message).to.equal("Incorrect password");
    });

    it("should reject if password is not provided", async function () {
      // Create user
      await chai.request(server).post("/users").send({
        username: "test123",
        password: "password",
        confirmPw: "password",
      });

      // Log in
      const loginRes = await chai.request(server).post("/users/session").send({
        username: "test123",
        password: "password",
      });

      // Delete user without providing password
      const deleteRes = await chai
        .request(server)
        .delete("/users")
        .set("Authorization", `Bearer ${loginRes.body.jwtToken}`);

      expect(deleteRes).to.have.status(400);
      expect(deleteRes.body.message).to.equal("Missing password");
    });
  });
});
