const router = require("express").Router();
const groups = require("../models/groups_model");
const groupContents = require("../models/group_contents_model");
const media = require("../models/media_model");
const groupMembers = require("../models/group_members_model");

// Hae kaikki ryhmät tietoineen
router.get("/", async (req, res) => {
  try {
    const result = await groups.getAll();
    res.json(result);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Lisää ryhmä
router.post("/", async (req, res) => {
  try {
    const result = await groups.add(req.body);
    res.status(201).json(result);
  } catch (err) {
    console.log(err);
    res.status(400).json({ error: "Bad request" });
  }
});

// Poista ryhmä. Poistaa ensin ryhmän jäsenet ja sisällön
router.delete("/:groupId", async (req, res) => {
  const groupId = req.params.groupId;
  try {
    await groupMembers.deleteAllGroupMembers(groupId);
    await groupContents.deleteAllGroupContent(groupId);
    const result = await groups.deleteGroup(groupId);

    if (result.length === 0) {
      return res.status(404).json({ error: "Group not found" });
    }
    res.status(200).json(result);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Hae ryhmän kaikki media ja showtimet.
router.get("/:groupId/contents", async (req, res) => {
  try {
    const result = await groupContents.getGroupContents(req.params.groupId);
    res.json(result);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Lisää media tai showtime ryhmään. Joko mediaId tai showtimeId on pakollinen.
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
      addedBy,
    });

    res.status(201).json(result);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Poista sisältöä content_id:n perusteella, toimii
router.delete("/contents/:contentId", async (req, res) => {
  try {
    const result = await groupContents.deleteGroupContentById(req.params.contentId);
    res.status(200).json(result);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Hae ryhmän jäsenet
router.get("/:groupId/members", async (req, res) => {
  try {
    const result = await groupMembers.getAllByGroupId(req.params.groupId);
    res.status(200).json(result);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Lisää jäsen ryhmään (liittymispyyntö, accepted=false ellei toisin määritetty)
router.post("/:groupId/members", async (req, res) => {
  try {
    const { userId, accepted } = req.body;
    const groupId = req.params.groupId;

    const result = await groupMembers.add({
      groupId,
      userId,
      accepted, // Voi olla undefined, jolloin se asetetaan falseksi
    });

    res.status(201).json(result);
  } catch (err) {
    console.log(err);
    res.status(400).json({ error: "Bad request" });
  }
});

// Poista jäsen ryhmästä
router.delete("/:groupId/members/:userId", async (req, res) => {
  try {
    const result = await groupMembers.deleteGroupMember(req.params.groupId, req.params.userId);
    res.status(200).json(result);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Hyväksy jäsen ryhmään
router.put("/:groupId/members", async (req, res) => {
  try {
    const groupId = req.params.groupId;
    const { userId } = req.body;
    const result = await groupMembers.acceptGroupMember(groupId, userId);
    if (result.length === 0) {
      return res.status(404).json({ error: "Group member not found" });
    }
    res.status(200).json(result);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
