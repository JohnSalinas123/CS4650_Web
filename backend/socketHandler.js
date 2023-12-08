import { Server } from 'socket.io';
import Message from './models/messageModel.js';

export const SocketServer = (httpServer) => {
    const io = new Server(httpServer, {})

    io.on("connection", (socket) => {
        console.log(`Socket server running on port ${socketPort}`)

        socket.on("login", (username) => {
            console.log(`${username} has logged in!`)
        });

        socket.on("signup", (username) =>  {
            console.log(`${username} has signed up!`);
        });

        socket.on("message", async (message, callback) => {

            const { username, text } = message;

            if (!username || !text) {
                callback({
                    status: "error",
                    info: "Message details missing!"
                })
                return;
            }
            
            try {

                let newMessage = await Message.create({
                    username: username,
                    text: text
                });
                console.log(newMessage);
            
                if (createdMessage) {
                    // broadcast new message to all connected
                    socket.broadcast.emit("receiving", newMessage)

                    callback({
                        status: "ok",
                        message: newMessage,
                    });

                } else {
                    callback({
                        status: "error",
                        info: "Failed to create message!"
                    });
                }
            
            
            } catch (error) {
                console.error("Error creating message:", error);
                callback({
                    status: "error",
                    info: "Internal server error"
                });
            }

        });

        socket.on('disconnect', () => {

            console.log('A user disconnected');    

        });


    })


} 