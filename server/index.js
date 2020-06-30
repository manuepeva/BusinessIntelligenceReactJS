const express = require('express');
const socketio = require('socket.io');
const http = require('http');

const {añadirUsuario, removerUsuario, getUsuario, getUsuariosRooms} = require('./usuarios');

const PORT = process.env.PORT || 2600

const router = require('./router');

const app = express();
const server = http.createServer(app);
const io = socketio(server);

io.on('connection', (socket) => {
    socket.on('join', ({name, room}, callback) => {
        const {error, usuario} = añadirUsuario({id: socket.id, name, room});

            socket.emit('message', {usuario: 'admin', text: `${usuario.name}, welcome to the room ${usuario.room}`});

            socket.broadcast.to(usuario.room).emit('message', {usuario: 'admin', text: `${usuario.name}, has joined!`})

        
                if(error) return callback(error);

                socket.join(usuario.room);

                callback();
    });

    socket.on('sendMessage', (message, callback) => {
                const usuario = getUsuario(socket.id);

                io.to(usuario.room).emit('message', {usuario: usuario.name, text: message});

                callback();
    })

    socket.on('disconnect', () => {
        console.log('User had left.');
    })
});

app.use(router);

server.listen(PORT, () => console.log(`server has started on Port ${PORT}`));