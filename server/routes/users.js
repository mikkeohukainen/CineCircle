const router = require("express").Router();
const userModel = require("../models/users_model");

// dummy router for testing - DELETE
router.get("/", async (req, res) => {
  const result = await userModel.getUserNames();
  res.status(200).json(result);
});

module.exports = router;
