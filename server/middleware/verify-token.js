const jwt = require("jsonwebtoken");

const invalidErr = { message: "Invalid or missing token" };

const verifyToken = (req, res, next) => {
  try {
    const auth = req.headers.authorization || req.headers.Authorization;
    if (!auth) {
      return res.status(401).json(invalidErr);
    }
    const token = auth.split(" ")[1];
    const verified = jwt.verify(token, process.env.JWT_SUPERSECRETSIGNER);
    if (!verified) {
      return res.status(401).json(invalidErr);
    }
    const { iss, aud, username } = verified;
    if (iss !== "cinecircle-server" || aud !== "cinecircle") {
      return res.status(401).json(invalidErr);
    }

    res.locals.username = username;
    next();
  } catch (error) {
    return res.status(401).json(invalidErr);
  }
};

module.exports = verifyToken;
