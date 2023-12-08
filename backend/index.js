import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import userRoutes from './routes/userRoutes.js';
import ingredientRoutes from './routes/ingredientRoutes.js';
import recipeRoutes from './routes/recipeRoutes.js';
import {dbConnect} from './dbConnect.js';
import { createServer } from 'http';
import { Server } from 'socket.io';

const expressPort = 8080;
const socketPort = 3000;
const app = express()
const httpServer = createServer(app)

const io = new Server(httpServer, {})

io.on("connection", (socket) => {
    console.log(`Socket server running on port ${socketPort}`)


})

// connect to mongodb atlas
dbConnect();

app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: true}))

app.get('/', (req, res) => {
    res.send({"Working" : "Yes"})
})

app.use('/api/user', userRoutes)
//app.use('/api/ingredients', ingredientRoutes)
//app.use('/api/recipes', recipeRoutes)

app.listen(expressPort, () => {
    console.log(`Express server is running at port ${expressPort}`)
})


httpServer.listen(socketPort, () => {
    console.log(`Socket server running on port ${socketPort}`)
})


