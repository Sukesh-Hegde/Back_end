// database.js
import mongoose from "mongoose";

async function connectUsingMongoose() {
  try {
    await mongoose.connect("mongodb://localhost:27017/myapp", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error.message);
  }
}

export { connectUsingMongoose };
