const express = require("express");
const cors = require("cors");
const app = express();

const users = require("./routes/users");
const reviews = require("./routes/reviews");
const favorites = require("./routes/favorites");
const groups = require("./routes/groups");
const search = require("./routes/tmdb");

app.use(express.json());
app.use(cors());

// ROUTES
app.use("/users", users);
app.use("/reviews", reviews);
app.use("/favorites", favorites);
app.use("/groups", groups);
app.use("/search", search);

app.get("/", (req, res) => {
  res.status(200).send("hello there");
});

app.listen(8000, () => {
  console.log("Server running on port 8000");
});

// Catch any unhandled errors
app.use((err, req, res, next) => {
  console.error(err);
  res.status(err.status || 500).end();
});
