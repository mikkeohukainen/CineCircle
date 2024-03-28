const router = require("express").Router();
const groups = require("../models/groups_model");

router.get("/", async (req, res) => {
  try {
    const result = await groups.getAll();
    res.json(result);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/:groupId", async (req, res) => {
  try {
    const result = await groups.getByGroupId(req.params.groupId);
    if (result.length === 0) {
      res.status(404).json({ error: "Group not found" });
    }
    res.json(result);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.post("/", async (req, res) => {
  try {
    const result = await groups.add(req.body);
    res.status(201).json(result);
  } catch (err) {
    console.log(err);
    res.status(400).json({ error: "Bad request" });
  }
});

router.put("/", async (req, res) => {
  try {
    const result = await groups.update(req.body);
    res.status(200).json(result);
  } catch (err) {
    console.log(err);
    res.status(400).json({ error: "Bad request" });
  }
});

router.delete("/:groupId", async (req, res) => {
  try {
    const result = await groups.delete(req.params.groupId);
    res.status(200).json(result);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;