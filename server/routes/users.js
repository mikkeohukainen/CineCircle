const { getUserNames } = require("../models/users_model");

const router = require("express").Router();

// dummy router for testing - DELETE
router.get("/", async (req, res) => {
  const result = await getUserNames();
  res.json(result);
});

module.exports = router;
