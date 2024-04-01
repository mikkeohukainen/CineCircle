require("dotenv").config();
const router = require("express").Router();
const usersModel = require("../models/users_model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const userModel = require("../models/users_model");

// ADD NEW USER
router.post("/", async (req, res) => {
  try {
    const hashPw = await bcrypt.hash(req.body.password, 10);

    // Confirm password before creating user
    if (req.body.password === req.body.confirmPw) {
      try {
        // If username exists, throw an error
        await usersModel.addNewUser(req.body.username, hashPw);
        res.status(200).end();
      } catch (err) {
        console.error(err.message);
        return res.status(500).end();
      }
    } else {
      throw new Error("Confirmation password does not match!");
    }
  } catch (err) {
    // console.error(err.message);
    res.status(500).end();
  }
});

// TODO: GET USER
router.get("/:username", async (req, res) => {
  try {
    const result = await usersModel.getUser(req.params.username);
    // if not null
    if (result) {
      console.log(result);
      res.status(200).end();
    } else {
      throw new Error("User does not exist!");
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).end();
  }
});

// LOGIN
router.post("/session", async (req, res) => {
  try {
    // return is { user_id, password_hash }
    const dbUserIdAndHashedPassword = await usersModel.getHashedPassword(req.body.username);

    // if not null
    if (dbUserIdAndHashedPassword) {
      const isAuthorized = await bcrypt.compare(
        req.body.password,
        dbUserIdAndHashedPassword.password_hash,
      );

      if (isAuthorized) {
        const token = jwt.sign({ username: req.body.username }, process.env.JWT_SUPERSECRETSIGNER);
        res.status(200).json({
          username: req.body.username,
          userId: dbUserIdAndHashedPassword.user_id,
          jwtToken: token,
        });
      } else {
        res.status(401).end();
      }
    } else {
      throw new Error("User not found!");
    }
  } catch (err) {
    return res.status(404).end();
  }
});

// DELETE USER
router.delete("/", async (req, res) => {
  try {
    const dbHashedPassword = await usersModel.getHashedPassword(req.body.username);

    // if not null (same as login)
    if (dbHashedPassword) {
      // Compare hashed password to given password and confirm password
      const isAuthorized = await bcrypt.compare(req.body.password, dbHashedPassword);
      if (isAuthorized && req.body.password === req.body.confirmPw) {
        await usersModel.deleteUser(req.body.username);
        res.status(200).end();
      } else {
        console.log("Incorrect password!");
        return res.status(401).end();
      }
    } else {
      throw new Error("User not found!");
    }
  } catch (err) {
    console.error(err.message);
    res.status(404).end();
  }
});

// ADD FAVORITES
router.post("/:username/favorites", async (req, res) => {
  try {
    await usersModel.addFavorites(req.body.username, req.body.mediaId);
    res.status(200).end();
  } catch (err) {
    console.error(err.message);
    res.status(500).end();
  }
});

// // GET FAVORITES
router.get("/:username/favorites", async (req, res) => {
  try {
    const result = await userModel.getFavorites(req.params.username);
    console.log(result);
    res.status(200).end();
  } catch (err) {
    console.error(err.message);
    res.status(500).end();
  }
});

// // GET REVIEWS
router.get("/:username/reviews", async (req, res) => {
  try {
    const result = await userModel.getReviews(req.params.username);
    console.log(result);
    res.status(200).end();
  } catch (err) {
    console.error(err.message);
    res.status(500).end();
  }
});

module.exports = router;
