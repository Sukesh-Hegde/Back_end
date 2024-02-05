// 1. Import MongoDB Client
import { MongoClient } from "mongodb";

// 2. Function to connect to the database
const url = "mongodb://localhost:27017/confession";
let client;
export const connectToMongoDB = () => {
    MongoClient.connect(url) //this returns a promise
        .then(clientInstances =>{
            client = clientInstances;
            console.log("Mongodb is connected");
        })
        .catch(err=>{
            console.log(err);
        })
};

// 3. Function to access the database
export const getDB = () => {
    return client.db();
};
