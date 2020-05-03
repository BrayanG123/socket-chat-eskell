var socket = io();

var params = new URLSearchParams( window.location.search );

if ( !params.has('nombre') || !params.has('sala') ){
    window.location = 'index.html';
    throw new Error('El nombre y sala son necesarios'); 
}

var usuario = {
    nombre: params.get('nombre'),
    sala: params.get('sala')
}

socket.on('connect', function() {
    console.log('Conectado al servidor');

    socket.emit('entrarChat', usuario, function(respS) {
        console.log('Usuario conectados: ', respS);
    } );
});

// escuchar
socket.on('disconnect', function() {

    console.log('Perdimos conexión con el servidor');

});


// Enviar información
// socket.emit('crearMensaje', { //envia desde un cliente a todos los demas usuarios
//     usuario: 'Fernando',
//     mensaje: 'Hola Mundo'
// }, function(resp) {
//     console.log('respuesta server: ', resp);
// });

// Escuchar información
socket.on('crearMensaje', function(mensaje) {

    console.log('Servidor:', mensaje);

});

//cuando un usuario sale o entra en el chat
socket.on('listaPersona', function(personas){
    console.log(personas);
});

// mensajes privados
socket.on('mensajePrivado', function(mensaje){
    console.log('mensaje privado:', mensaje);
})




