// Please don't change the pre-written code
// Import the necessary modules here
import mongoose from "mongoose";
const url="mongodb://localhost:27017"
export const connectUsingMongoose = async () => {
  // write your code here
  try{
    await mongoose.connect(url, {
        useNewUrlParser: true, //these are 2 new options to connect with the mongodb
        useUnifiedTopology: true
    });
    console.log("MongoDB connected using mongoose");
}catch(err){
    console.log("Error while connecting to db");
    console.log(err);
}
};
