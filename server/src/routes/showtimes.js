const express = require("express");
const showtimes = require("../../models/showtimes_model");

const router = express.Router();

router.post("/", async (req, res, next) => {
  const { mediaId, theater, showtime } = req.body;
  if (!mediaId || !theater || !showtime) {
    res.status(400);
    return;
  }

  try {
    await showtimes.add({ mediaId, theater, showtime });
    res.status(201).send();
  } catch (err) {
    console.error(err);
    res.status(500);
  }
});

module.exports = router;
