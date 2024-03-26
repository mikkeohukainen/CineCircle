require("dotenv").config();
const router = require("express").Router();
const bcrypt = require("bcryptjs");
const dbAuth = require("../database/db_auth");
const jwt = require("jsonwebtoken");

router.post("/register", async (req, res) => {
  try {
    const hashPw = await bcrypt.hash(req.body.password, 10);

    //
    // TODO: Add checks for already existing user!

    // Confirm password before creating user
    if (req.body.password === req.body.confirmPw) {
      await dbAuth.register(req.body.username, hashPw);
      res.status(200).end();
    } else {
      throw new Error("Confirmation password does not match!");
    }
  } catch (err) {
    // console.error(err.message);
    res.status(500).json({ error: err.message });
  }
});

router.post("/session", async (req, res) => {
  try {
    const dbHashedPassword = await dbAuth.getHashedPassword(req.body.username);

    // if not null
    if (dbHashedPassword) {
      const isAuthorized = await bcrypt.compare(req.body.password, dbHashedPassword);

      if (isAuthorized) {
        const token = jwt.sign({ username: req.body.username }, process.env.JWT_SUPERSECRETSIGNER);

        res.status(200).json({ jwtToken: token });
      } else {
        res.status(401).json({ error: "Incorrect password!" });
      }
    } else {
      throw new Error("User not found!");
    }
  } catch (err) {
    return res.status(404).json({ error: err.message });
  }
});

module.exports = router;
