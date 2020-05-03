const { io } = require('../server');
const { Usuarios } = require('../classes/usuario');
const { crearMensaje } = require('../utilidades/utilidades'); 


const usuarios = new Usuarios();

io.on('connection', (client) => {

    client.on('entrarChat', (data, callback) => {

        if ( !data.nombre || !data.sala ){
            return callback({
                error: true,
                mensaje: 'El nombre y sala son necesarios'
            });
        }

        //instruccion para conectar un usuario a una sala
        client.join(data.sala);
        
        usuarios.agregarPersona( client.id, data.nombre, data.sala );

        client.broadcast.to(data.sala).emit('listaPersona', usuarios.getPeronasPorSala(data.sala) );

        callback( usuarios.getPeronasPorSala(data.sala) );
    });    

    client.on('crearMensaje', (data) => { //para q un usuario mande mensaje a todos
        let persona = usuarios.getPersona( client.id );
        let mensaje = crearMensaje( persona.nombre, data.mensaje );
        client.broadcast.to(persona.sala).emit('crearMensaje', mensaje);
    });

    client.on('disconnect', () => {
        let personaBorrada = usuarios.borrarPersona( client.id );

        // client.broadcast.emit('crearMensaje', {usuario: 'Administrador', mensaje: `${personaBorrada.nombre} abandono el chat`},);
        client.broadcast.to(personaBorrada.sala).emit('crearMensaje', crearMensaje('Administrador', `${personaBorrada.nombre} salio`) );
        client.broadcast.to(personaBorrada.sala).emit('listaPersona', usuarios.getPeronasPorSala( personaBorrada.sala ) );
    });

    //Mensajes privados
    client.on('mensajePrivado', data => {
        let persona = usuarios.getPersona( client.id );
        //para es el id de la persona a quien quiero enviar
        client.broadcast.to(data.para).emit('mensajePrivado', crearMensaje(persona.nombre, data.mensaje));
    });

});