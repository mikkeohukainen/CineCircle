const express = require("express");
const users = require("../routes/users");
const auth = require("../routes/auth");

const app = express();

app.use(express.json());

// ROUTES
app.use("/users", users);
app.use("/auth", auth);

app.get("/", (req, res) => {
  res.status(200).send("hello there");
});

app.listen(8000, () => {
  console.log("Server running on port 8000");
});
