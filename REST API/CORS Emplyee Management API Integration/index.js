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

// app.use((req, res, next) => {
//   res.header("Access-Control-Allow-Origin", "http://localhost:5500");
//   res.header("Access-Control-Allow-Headers", "*");
//   res.header("Access-Control-Allow-Methods", "*");
//   // return ok for preflight request.
//   if (req.method == "OPTIONS") {
//     return res.sendStatus(200);
//   }
//   next();
// });


app.use((req, res, next) => {
  const allowedOrigins = ["http://localhost:5500", "http://127.0.0.1:5500"];

  const origin = req.headers.origin;

  if (allowedOrigins.includes(origin)) {
    res.setHeader("Access-Control-Allow-Origin", origin);
  }

  res.setHeader("Access-Control-Allow-Headers", "*");
  res.setHeader("Access-Control-Allow-Methods", "*");

  // Return OK for preflight request
  if (req.method === "OPTIONS") {
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
