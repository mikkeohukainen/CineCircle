const router = require("express").Router();
const groups = require("../models/groups_model");
const groupContents = require("../models/group_contents_model");
const media = require("../models/media_model");

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

router.post("/:groupId/media", async (req, res) => {
    try {
        const groupId = req.params.groupId;
        console.log(groupId);
        const { mediaId, addedBy } = req.body;
        console.log(mediaId);
      
      const mediaExists = await media.getByTmdbId(mediaId);
      if (!mediaExists) {
        return res.status(404).json({ error: "Media not found" });
      }
      
      const result = await groupContents.addGroupContent({
        groupId,
        mediaId,
        addedBy
      });
      
      res.status(201).json(result);
    } catch (err) {
      console.log(err);
      res.status(500).json({ error: "Internal Server Error" });
    }
  });

  router.get("/:groupId/media", async (req, res) => {
    try {
      const result = await groupContents.getGroupContents(req.params.groupId);
      res.json(result);
    } catch (err) {
      console.log(err);
      res.status(500).json({ error: "Internal Server Error" });
    }
  });

  router.delete("/media/:groupContentId", async (req, res) => {
    try {
      const result = await groupContents.deleteGroupContent(req.params.groupContentId);
      res.status(200).json(result);
    } catch (err) {
      console.log(err);
      res.status(500).json({ error: "Internal Server Error" });
    }
  });


module.exports = router;