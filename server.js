const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

var corsOption = {
  origin: "http://localhost:8081"
}

app.use(cors(corsOption));

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlenconded
app.use(bodyParser.urlencoded({ extended: true }));

// Database
const db = require("./app/models");
const Role = db.role;

//db.sequelize.sync();

db.sequelize.sync({force: true}).then(() => {
  console.log('Drop and Resync DB');
  initial();
});

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to thegleidstones application" });
});

// routes
require('./app/routes/auth.routes')(app);
require('./app/routes/user.routes')(app);

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

function initial() {
  Role.create({
    id: 1,
    name: "user"
  });

  Role.create({
    id: 2,
    name: "moderator"
  });

  Role.create({
    id:3,
    name: "admin"
  });
}