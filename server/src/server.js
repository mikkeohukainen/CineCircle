const express = require("express");
const users = require("../routes/users");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ROUTES
app.use("/users", users);

app.get("/", (req, res) => {
  res.status(200).send("hello there");
});

app.listen(8000, () => {
  console.log("Server running on port 8000");
});
