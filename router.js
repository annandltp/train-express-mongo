const { ObjectId } = require("mongodb");
const express = require("express");
const router = express.Router();
const connection = require("./connection");
require("./mongoose");
const User = require("./User");

router.get("/", function (req, res) {
  res.send("Hello World");
});

router.get("/users", async (req, res) => {
  try {
    const users = await User.find();
    res.send({ data: users });
  } catch (err) {
    res.send({ message: err.message || "internal server error" });
  }
});

router.get("/users/:id", async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.params.id });
    if(user){
      res.send({
        data:user
      })
    }else{
      res.send({ message: "User tidak ditemukan" });
    }
    res.send({ data: users });
  } catch (err) {
    res.send({ message: err.message || "internal server error" });
  }
});

router.post("/users", async (req, res) => {
  try {
    const { name, age, status } = req.body;
    const users = await User.create({
      name,
      age,
      status,
    });
    res.send({ data: users });
  } catch (err) {
    res.send({ message: err.message || "internal server error" });
  }
});

router.put("/users/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { name, age, status } = req.body;
    const users = await User.updateOne(
      { _id: id },
      {
        name,
        age,
        status,
      },
      { runValidators: true }
    );

    if (users) {
      res.send({
        data: users,
      });
    } else {
      res.send({
        message: "user tidak ditemukan",
      });
    }

    res.send({ data: users });
  } catch (err) {
    res.send({ message: err.message || "internal server error" });
  }
});

router.delete("/users/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const users = await User.deleteOne(
      { _id: id }
    );

    if (users) {
      res.send({
        data: users,
      });
    } else {
      res.send({
        message: "user tidak ditemukan",
      });
    }

    res.send({ data: users });
  } catch (err) {
    res.send({ message: err.message || "internal server error" });
  }
});

// router.get("/users", async (req, res) => {
//   try {
//     if (connection.isConnected()) {
//       const db = connection.db("db_latihan");
//       const users = await db.collection("users").find().toArray();
//       res.send({ data: users });
//     } else {
//       res.send({ message: "koneksi gagal" });
//     }
//   } catch (err) {
//     res.send({ message: err.message || "internal server error" });
//   }
// });

// router.post("/users", async (req, res) => {
//   try {
//     if (connection.isConnected()) {
//       const { name, age, status } = req.body;
//       const db = connection.db("db_latihan");
//       const users = await db.collection("users").insertOne({
//         name,
//         age,
//         status,
//       });
//       if (users.insertedCount === 1) {
//         res.send({ message: "Berhasil ditambahkan" });
//       } else {
//         res.send({ message: "Gagal menambahkan user" });
//       }
//       // res.send({ data: users });
//     } else {
//       res.send({ message: "koneksi gagal" });
//     }
//   } catch (err) {
//     res.send({ message: err.message || "internal server error" });
//   }
// });

// router.put("/users/:id", async (req, res) => {
//   try {
//     if (connection.isConnected()) {
//       const { id } = req.params;
//       const { name, age, status } = req.body;
//       const db = connection.db("db_latihan");
//       const users = await db.collection("users").updateOne(
//         { _id: ObjectId(id) },
//         {
//           $set: {
//             name,
//             age,
//             status,
//           },
//         }
//       );
//       console.log("users>>>>");
//       console.log(users);
//       if (users.modifiedCount === 1) {
//         res.send({ message: "Berhasil diubah" });
//       } else {
//         res.send({ message: "Gagal mengubah user" });
//       }
//       // res.send({ data: users });
//     } else {
//       res.send({ message: "koneksi gagal" });
//     }
//   } catch (err) {
//     res.send({ message: err.message || "internal server error" });
//   }
// });

// router.delete("/users/:id", async (req, res) => {
//   try {
//     if (connection.isConnected()) {
//       const { id } = req.params;
//       const db = connection.db("db_latihan");
//       const users = await db
//         .collection("users")
//         .deleteOne({ _id: ObjectId(id) });
//       console.log("users>>>>");
//       console.log(users);
//       if (users.deletedCount === 1) {
//         res.send({ message: "Berhasil dihapus" });
//       } else {
//         res.send({ message: "Gagal menghapus user" });
//       }
//       // res.send({ data: users });
//     } else {
//       res.send({ message: "koneksi gagal" });
//     }
//   } catch (err) {
//     res.send({ message: err.message || "internal server error" });
//   }
// });
module.exports = router;
