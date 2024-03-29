const router = require("express").Router();
const groups = require("../models/groups_model");
const groupContents = require("../models/group_contents_model");
const media = require("../models/media_model");

// Hae kaikki ryhmät tietoineen, toimii
router.get("/", async (req, res) => {
  try {
    const result = await groups.getAll();
    res.json(result);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// TODO: ei toimi jos ryhmällä on sisältöä, korjaa
router.delete("/:groupId", async (req, res) => {
  try {
    const result = await groups.deleteGroup(req.params.groupId);
    if (result.length === 0) {
      return res.status(404).json({ error: "Group not found" });
    }
    res.status(200).json(result);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Lisää ryhmä, toimii
router.post("/", async (req, res) => {
  try {
    const result = await groups.add(req.body);
    res.status(201).json(result);
  } catch (err) {
    console.log(err);
    res.status(400).json({ error: "Bad request" });
  }
});

// router.put("/", async (req, res) => {
//   try {
//     const result = await groups.update(req.body);
//     res.status(200).json(result);
//   } catch (err) {
//     console.log(err);
//     res.status(400).json({ error: "Bad request" });
//   }
// });

// router.delete("/:groupId", async (req, res) => {
//   try {
//     const result = await groups.delete(req.params.groupId);
//     res.status(200).json(result);
//   } catch (err) {
//     console.log(err);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// });

// Lisää media tai showtimea ryhmään, toimii
router.post("/:groupId/contents", async (req, res) => {
    try {
        const groupId = req.params.groupId;
        const { mediaId, showtimeId, addedBy } = req.body;
      
        if (!mediaId && !showtimeId) {
          return res.status(400).json({ error: "Either mediaId or showtimeId must be provided" });
        }
      
        if (mediaId) {
          const mediaExists = await media.getByTmdbId(mediaId);
          if (!mediaExists) {
            return res.status(404).json({ error: "Media not found" });
          }
        }
      
        if (showtimeId) {
          const showtimeExists = await groupContents.getShowtimeById(showtimeId);
          if (!showtimeExists) {
            return res.status(404).json({ error: "Showtime not found" });
          }
        }
      
        const result = await groupContents.addGroupContent({
          groupId,
          mediaId: mediaId || null,
          showtimeId: showtimeId || null,
          addedBy
        });
    
        res.status(201).json(result);
      } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Internal Server Error" });
      }
    });

  // Hae ryhmän kaikki sisälötä, toimii
  router.get("/:groupId/contents", async (req, res) => {
    try {
      const result = await groupContents.getGroupContents(req.params.groupId);
      res.json(result);
    } catch (err) {
      console.log(err);
      res.status(500).json({ error: "Internal Server Error" });
    }
  });

  // Poista sisältä content_id:n perusteella, toimii
  router.delete("/contents/:contentId", async (req, res) => {
    try {
      const result = await groupContents.deleteGroupContent(req.params.contentId);
      res.status(200).json(result);
    } catch (err) {
      console.log(err);
      res.status(500).json({ error: "Internal Server Error" });
    }
  });


module.exports = router;