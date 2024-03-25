const express = require("express");
// const dbPool = require("../database/db_connection");
const app = express();

const users = require("../routes/users");
const reviews = require('../routes/reviews')
const favorites = require('../routes/favorites')

app.use(express.json())

app.use("/users", users);
app.use('/reviews', reviews)
app.use('/favorites', favorites)

app.get("/", (req, res) => {
  res.status(200).send("hello there");
});

app.listen(8000, () => {
  console.log("Server running on port 8000");
});
