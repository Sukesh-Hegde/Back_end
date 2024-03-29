
import { MongoClient } from "mongodb";

const url = "mongodb://localhost:27017/ecomdb";
let client;
export const connectToMongoDB = () =>{
    MongoClient.connect(url) //this returns a promise
        .then(clientInstances =>{
            client = clientInstances;
            console.log("Mongodb is connected");
        })
        .catch(err=>{
            console.log(err);
        })
}

export const getDB = ()=>{
    return client.db();
}