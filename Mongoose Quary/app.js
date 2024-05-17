// app.js
import express from "express";
import { connectUsingMongoose } from "./config/database.js";
import User from "./models/user.js";

const app = express();

// Connect to MongoDB
connectUsingMongoose();

// app.post("/user", async (req, res) => {
//   try {
//     const { username, email, age } = req.body;
//     const newUser = new User({ username, email, age });
//     const savedUser = await newUser.save();
//     res.json(savedUser);
//   } catch (error) {
//     res.status(500).json({ message: "Error adding user" });
//   }
// });

// // Find One User
// app.get("/user/:id", async (req, res) => {
//   try {
//     const user = await User.findOne({ _id: req.params.id });
//     res.json(user);
//   } catch (error) {
//     res.status(500).json({ message: "Error finding user" });
//   }
// });

// // Find Many Users
// app.get("/users", async (req, res) => {
//   try {
//     const users = await User.find();
//     res.json(users);
//   } catch (error) {
//     res.status(500).json({ message: "Error finding users" });
//   }
// });

// // Find and Update User
// app.put("/user/:id", async (req, res) => {
//   try {
//     const updatedUser = await User.findOneAndUpdate(
//       { _id: req.params.id },
//       { $set: req.body },
//       { new: true }
//     );
//     res.json(updatedUser);
//   } catch (error) {
//     res.status(500).json({ message: "Error updating user" });
//   }
// });

const newUser = new User({
  username: "John Doe",
  email: "john@example.com",
  age: 30,
});

newUser
  .save()
  .then((savedUser) => {
    console.log("User saved:", savedUser);
  })
  .catch((error) => {
    console.error("Error saving user:", error);
  });

User.find({ age: { $gt: 25 } })
  .then((users) => {
    console.log("Users found:", users);
  })
  .catch((error) => {
    console.error("Error finding users:", error);
  });

// User.updateOne({ name: "John Doe" }, { age: 35 })
//   .then((result) => {
//     console.log("Updateed result:", result);
//   })
//   .catch((error) => {
//     console.error("Error updating users:", error);
//   });

//   User.deleteOne({ name: "John Doe" })
//     .then((result) => {
//       console.log("Deleted result result:", result);
//     })
//     .catch((error) => {
//       console.error("Error deleting users:", error);
//     });

// User.find()
//   .sort({ age: -1 })
//   .then((users) => {
//     console.log("User sorted by age(descending):", users);
//   })
//   .catch((error) => {
//     console.error("Error finding users:", error);
//   });

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
