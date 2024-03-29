const router = require("express").Router();
const groups = require("../models/groups_model");
const groupContents = require("../models/group_contents_model");
const media = require("../models/media_model");
const groupMembers = require("../models/group_members_model");

// Get all groups with their information
router.get("/", async (req, res) => {
  try {
    const result = await groups.getAll();
    res.json(result);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Add a group
router.post("/", async (req, res) => {
  try {
    const result = await groups.add(req.body);
    res.status(201).json(result);
  } catch (err) {
    console.log(err);
    res.status(400).json({ error: "Bad request" });
  }
});

// Delete a group. First deletes the group members from the group_members table
// and the group contents from the group_contents table.
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

// Get all media and showtimes for a group.
router.get("/:groupId/contents", async (req, res) => {
  const groupId = req.params.groupId;
  try {
    const result = await groupContents.getGroupContents(groupId);
    res.json(result);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Add media or showtime to a group. Either mediaId or showtimeId is required.
router.post("/:groupId/contents", async (req, res) => {
  const groupId = req.params.groupId;
  const { mediaId, showtimeId, addedBy } = req.body;
  try {
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

// Delete content by content_id
router.delete("/contents/:contentId", async (req, res) => {
  const contentId = req.params.contentId;
  try {
    const result = await groupContents.deleteGroupContentById(contentId);
    res.status(200).json(result);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Get group members
router.get("/:groupId/members", async (req, res) => {
  const groupId = req.params.groupId;
  try {
    const result = await groupMembers.getAllByGroupId(groupId);
    res.status(200).json(result);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Add a member to the group (join request, accepted=false unless specified otherwise)
router.post("/:groupId/members", async (req, res) => {
  const { userId, accepted } = req.body;
  const groupId = req.params.groupId;
  try {
    const result = await groupMembers.add({
      groupId,
      userId,
      accepted, // Can be undefined, in which case it is set to false
    });
    res.status(201).json(result);
  } catch (err) {
    console.log(err);
    res.status(400).json({ error: "Bad request" });
  }
});

// Delete a member from group
router.delete("/:groupId/members/:userId", async (req, res) => {
  const { groupId, userId } = req.params;
  try {
    const result = await groupMembers.deleteGroupMember(groupId, userId);
    res.status(200).json(result);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Accept a member into the group. Sets the accepted value to true.
router.put("/:groupId/members", async (req, res) => {
  const groupId = req.params.groupId;
  const { userId } = req.body;
  try {
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
