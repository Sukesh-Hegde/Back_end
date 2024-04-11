import express from "express";
import empRoutes from "./routes/employee.route.js";
// import cors from 'cors'; 
const app = express();
// Please don't change the pre-written code
// Import the necessary modules here
// Write your code here

// var corsOptions = {
//   origin: "http://localhost:5500",
// };
// app.use(cors(corsOptions));

// app.use(cors());

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "http://localhost:5500");
  res.header("Access-Control-Allow-Headers", "*");
  res.header("Access-Control-Allow-Methods", "*");
  // return ok for preflight request.
  if (req.method == "OPTIONS") {
    return res.sendStatus(200);
  }
  next();
});

// app.use((req, res, next) => {
//     res.header("Access-Control-Allow-Origin", "http://localhost:5500"); // Update this with your actual client origin
//     res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
//     res.header('Access-Control-Allow-Headers', 'Content-Type');
//     next();
//   });

app.use("/api/v1/emp", empRoutes);

export default app;
