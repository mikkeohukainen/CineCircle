const router = require("express").Router();
const bcrypt = require("bcryptjs");
const dbAuth = require("../database/db_auth");

router.post("/register", async (req, res) => {
  try {
    const data = req.body;
    const hashPw = await bcrypt.hash(data.password, 10);

    //
    // TODO: Add checks for already existing user!

    // Confirm password before creating user
    if (data.password === data.confirmPw) {
      await dbAuth.register(data.username, hashPw);
      res.status(200).end();
    } else {
      throw new Error("ERR:: Check that passwords are equals!");
    }
  } catch (err) {
    console.log(err.message);
    res.end();
  }
});

module.exports = router;
