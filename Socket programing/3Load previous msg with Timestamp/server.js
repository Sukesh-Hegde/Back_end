// don't change the prewritten code
// change the code for 'join' event

import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import cors from 'cors';
import { messageModel } from './message.schema.js';

export const app = express();
app.use(cors());

export const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: '*',
        methods: ["GET", "POST"]
    }
});

io.on("connection", (socket) => {
    console.log("Connection made.");

    socket.on("join", async (data) => {
        data.emit("message", { text: `Welcome, ${data.username}!` });
        // Broadcast a message to all other users in the same room
        data.broadcast.to(data.room).emit("message", {
            text: `${data.username} has joined the room.`
        });        
        data.join(data.room);
         // send old messages to the clients.
        messageModel.find().limit(50)
            .then(previousMessages => {
                socket.emit('previousMessages', previousMessages);// sending messages back to client
            }).catch(err => {
                console.log(err);
            })

    });

    socket.on("sendMessage", async (data) => {

        const message = new messageModel({
            username: data.username,
            text: data.message,
            room: data.room
        })

        await message.save();

        // Broadcast the received message to all users in the same room
        io.to(data.room).emit("message", {
            username: data.username,
            text: data.message
        });
    });

    socket.on("disconnect", () => {
        console.log("Connection disconnected.");
    });
});


