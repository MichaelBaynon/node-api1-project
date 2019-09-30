// implement your API here

const express = require("express");

const usersModel = require("./data/db");

const server = express();

server.use(express.json());

server.get("/api/users", (req, res) => {
  if (!usersModel) {
    res
      .status(500)
      .json({ error: "The users information could not be retrieved." });
  }

  usersModel
    .find()
    .then(users => {
      res.send(users);
    })
    .catch(error => {
      console.log(error);
    });
});

server.get("/api/users/:id", (req, res) => {
  const id = req.params.id;

  if (!usersModel) {
    res
      .status(404)
      .json({ message: "The user with the specified ID does not exist." });
  } else {
    usersModel
      .findById(id)
      .then(users => {
        res.send(users);
      })
      .catch(error => {
        res
          .status(500)
          .json({ message: "The user information could not be retrieved." });
      });
  }
});

server.delete("/api/users/:id", (req, res) => {
  const id = req.params.id;

  if (!usersModel) {
    res
      .status(404)
      .json({ message: "The user with the specified ID does not exist." });
  }

  usersModel
    .remove(id)
    .then(user => {
      res.json(user);
    })
    .catch(error => {
      res.status(500).json({ message: "The user could not be removed" });
    });
});

server.post("/api/users", (req, res) => {
  const userData = req.body;

  if (!userData.name || !userData.bio) {
    res
      .status(400)
      .json({ message: "Please provide name and bio for the user" });
  } else {
    usersModel
      .insert(userData)
      .then(user => {
        res.json(user);
      })
      .catch(error => {
        res
          .status(500)
          .json({ error: "The users information could not be retrieved." });
      });
  }
});

server.put("/api/users/:id", (req, res) => {
  const id = req.params.id;
  const changes = req.body;
  const userData = req.body;

//   if (!usersModel.id) {
//     res
//       .status(404)
//       .json({ message: "The user with the specified ID does not exist." });
//   }
  if (!userData.name || !userData.bio) {
    res
      .status(400)
      .json({ message: "Please provide name and bio for the user" });
  } else {
    usersModel
      .update(id, changes)
      .then(hub => {
        res.json(hub);
      })
      .catch(error => {
        res.json({ message: "The user information could not be modified" });
      });
  }
});

const port = 8888;

server.listen(port, () => console.log("api is listening on port 8888"));
