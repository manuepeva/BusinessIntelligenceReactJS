const usuarios = [];

const añadirUsuario = ({id, name, room}) => {
        name = name.trim().toLowerCase();
        room = room.trim().toLowerCase();

        const usuarioExistente = usuarios.find((usuario) => usuario.room === room && usuario.name === name);

        if(usuarioExistente){
            return {error: 'Nombre de usuario en uso'};
        }

        const usuario = {id, name, room};

        usuarios.push(usuario);

        return {usuario}
}

const removerUsuario = (id) => {
        const index = usuarios.findIndex((usuario) => usuario.id === id);
        if(index !== -1){
            return usuarios.splice(index, 1)[0];
        }

}
const getUsuario = (id) => {
        usuarios.find((usuarios) => usuario.id === id);
}

const getUsuariosRooms = (room) => usuarios.filter((usuario) => usuario.room === room);

module.exports = {añadirUsuario, removerUsuario, getUsuario, getUsuariosRooms};