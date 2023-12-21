// import for librery
import * as dotenv from 'dotenv'
dotenv.config()
import express from 'express';
import morgan from 'morgan'
import mongoose from 'mongoose';
import cors from 'cors';
import http from 'http';
import { Server } from 'socket.io'
import moment from 'moment';

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"],
    }
});

io.on('connection', (socket) => {
    console.log(`Cliente conectado: ${socket.id}`);

    socket.on('join_room', (roomName) => {
        socket.join(roomName);
        console.log(`Cliente ${socket.id} se ha unido a la sala: ${roomName}`);
    });

    socket.on('send_message', (data) => {
        const { roomName, message, time, id } = data;
        const timeParse = moment(time).format('hh:mm A');
        io.to(roomName).emit('receive_message', {message, time: timeParse, id});
    });

    socket.on('disconnect', () => {
        console.log(`Cliente desconectado: ${socket.id}`);
    });
});


// midelwere morgan
app.use(cors())
app.use(morgan('dev'))
app.use(express.urlencoded({ extended: false }))
app.use(express.json())

import ChatRouter from './Routes/Chats.routes.js'

app.use('/chats', ChatRouter)


// conexcion mongo
const DB_URI = process.env.MONGODB_URI
mongoose.connect(DB_URI, { useNewUrlParser: true, useUnifiedTopology: true })

export { app, server }