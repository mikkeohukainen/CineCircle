require("dotenv").config();
const router = require("express").Router();
const usersModel = require("../models/users_model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const userModel = require("../models/users_model");
const mediaModel = require("../models/media_model");
const verifyToken = require("../middleware/verify-token");

router.post("/", async (req, res) => {
  try {
    const { username, password, confirmPw } = req.body;

    if (!username || !password || !confirmPw) {
      return res.status(400).json({ message: "Missing fields" });
    }

    // 8 is recommended by OWASP, 72 is the max bcrypt can handle
    // https://cheatsheetseries.owasp.org/cheatsheets/Password_Storage_Cheat_Sheet.html
    if (typeof password !== "string" || password.length < 8 || password.length > 72) {
      return res.status(400).json({ message: "Password must be between 8 and 72 characters" });
    }

    if (password !== confirmPw) {
      return res.status(400).json({ message: "Confirmation password does not match" });
    }

    const hashPw = await bcrypt.hash(password, 10);

    try {
      await usersModel.addNewUser(username, hashPw);
      res.status(201).end();
    } catch (err) {
      if (err.message.includes("duplicate")) {
        return res.status(409).json({ message: "Username already exists" });
      }
      return res.status(500).end();
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).end();
  }
});

router.get("/:username", async (req, res) => {
  try {
    const { username } = req.params;
    const user = await usersModel.getUser(username);
    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).end();
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).end();
  }
});

router.post("/session", async (req, res) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      return res.status(400).json({ message: "Missing fields" });
    }

    const row = await usersModel.getHashedPassword(username);
    if (!row) {
      return res.status(401).json({ message: "Incorrect username or password" });
    }

    const isAuthorized = await bcrypt.compare(password, row.password_hash);
    if (!isAuthorized) {
      return res.status(401).json({ message: "Incorrect username or password" });
    }

    const token = jwt.sign({ username }, process.env.JWT_SUPERSECRETSIGNER, {
      issuer: "cinecircle-server",
      audience: "cinecircle",
      expiresIn: "1d",
    });

    res.status(200).json({
      username,
      userId: row.user_id,
      jwtToken: token,
    });
  } catch (err) {
    console.log(err.message);
    return res.status(500).end();
  }
});

router.delete("/", verifyToken, async (req, res) => {
  try {
    const { password } = req.body;
    const { username } = res.locals;

    if (!password) {
      return res.status(400).json({ message: "Missing password" });
    }

    const row = await usersModel.getHashedPassword(username);
    if (!row) {
      return res.status(401).json({ message: "Incorrect password" });
    }

    const isAuthorized = await bcrypt.compare(password, row.password_hash);
    if (!isAuthorized) {
      return res.status(401).json({ message: "Incorrect password" });
    }

    await usersModel.deleteUser(username);
    res.status(200).end();
  } catch (err) {
    console.log(err.message);
    res.status(500).end();
  }
});

router.post("/:username/favorites", verifyToken, async (req, res) => {
  //console.log(req.body)
  try {
    const result = await mediaModel.getByTmdbId(req.body.tmdbId);
    const rows = result.rowCount;
    //console.log("From users.js By TMDBid result:")
    //console.log(rows)
    if (rows === 0) {
      const mediaObject = {
        title: req.body.title,
        type: req.body.type,
        description: req.body.description,
        tmdbId: req.body.tmdbId,
        posterUrl: req.body.posterUrl,
      };
      await mediaModel.add(mediaObject);
    }

    await usersModel.addFavorites(req.body.username, req.body.tmdbId);

    res.status(200).end();
  } catch (err) {
    console.error(err.message);
    res.status(500).end();
  }
});

router.delete("/:username/favorites", verifyToken, async (req, res) => {
  try {
    const { tmdbId } = req.body;
    const { username } = res.locals;
    await usersModel.deleteFavorites(username, tmdbId);
    res.status(200).end();
  } catch (err) {
    console.log(err);
    res.status(500).end();
  }
});

router.get("/:username/favorites", async (req, res) => {
  try {
    const { username } = req.params;
    const result = await userModel.getFavorites(username);
    res.status(200).json(result);
  } catch (err) {
    console.error(err.message);
    res.status(500).end();
  }
});

router.get("/:username/reviews", async (req, res) => {
  try {
    const { username } = req.params;
    const result = await userModel.getReviews(username);
    res.status(200).json(result);
  } catch (err) {
    console.error(err.message);
    res.status(500).end();
  }
});

module.exports = router;
