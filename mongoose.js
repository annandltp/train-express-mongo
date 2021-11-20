// getting-started.js
const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/test", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// const userSchema = new mongoose.Schema({
//   name: String,
//   age: Number,
//   status: {
//     type: String,
//     enum: ["active", "non active"],
//     default: "non active",
//   },
// });

// const User = mongoose.model("User", userSchema);

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", async () => {
  console.log("Server database connect")
  // const users = await User.find();
  // console.log(users);
  //   const users = await User.findOne({ _id: "6193dda4234e27a7d4182e55" });
  //   const users = await User.find();

  //   const newUser = await User.create({
  //       name: 'elfin anan',
  //       age: 25,
  //       status: 'active'
  //   })

  // const newUser = new User()
  // newUser.name = 'TIO';
  // newUser.age = 23;
  // newUser. status = 'non active'
  // const insert = await newUser.save()
  

  // const updateUser = await User.updateOne({ _id: '6193dda4234e27a7d4182e55'}, {name: 'Rully'})
  // console.log(updateUser)
});
