const express = require('express');
const socketio = require('socket.io');
const http = require('http');
const cors = require('cors');
const {añadirUsuario, removerUsuario, getUsuario, getUsuariosRooms} = require('./usuarios');

const PORT = process.env.PORT || 2600

const router = require('./router');

const app = express();

app.use(cors({
    origin: 'http://localhost:3000'
}));
// app.use((req, res, next)=> {
//     res.header('Access-Control-Allow-Origin', '*');
//     res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
// });
// if (req.method === 'OPTIONS'){
//     res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET ');
//     return res.status(200).json({});
// }

const server = http.createServer(app);
const io = socketio(server);

io.on('connection', (socket) => {
    socket.on('join', ({name, room}, callback) => {
        const {error, usuario} = añadirUsuario({id: socket.id, name, room});

            socket.emit('message', {usuario: 'admin', text: `${usuario.name}, welcome to the room ${usuario.room}`});

            // console.log(name);
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


io.set('origins', '*:*'); 

app.use(router);

server.listen(PORT, () => console.log(`server has started on Port ${PORT}`));

