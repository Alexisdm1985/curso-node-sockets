# Aquí cubriremos varios temas como: 

* Introducción a los sockets
* Instalación de Socket.io
    * instalar con ```npm```
    * instanciarlo en el server (server + io())
    
    * Crear sockets similar a rutas => ```io.on('connection', ()=>{//...})```
        * el "on" de io.on(), es como un addEvenListener pero para sockets.
        
        * En el cliente(html) importamos el url de socket.io/socket.io.js
        el cual contiene todo lo necesario para manejar sockets.

        * En el mismo html agregar el script que activa el socket
        (Recibes los datos del script de socket.io con una ```variable = io()```)

        * Luego se le informa automaticamente al server que existe una coneccion,
        por lo que el server busca el ```io.on('connection'...)``` que hicimos antes
        
* Detectar conexiones y desconexiones de usuarios
* Emitir mensajes cliente servidor / servidor cliente
    * En vez de ```on()``` se usa ```emit()```
    * El evento que va despues de on() o emit() es mejor usar en minusc sin espacios
    ni camelCase, etc.
    * Como segundo argumento recibe lo que se quiera enviar: Object, string, etc...

* Escuchar los mensajes servidor cliente / cliente servidor

    ### Cliente / servidor
    * Nuestro servidor tiene el ```io.on('connection')```, por lo que esta escuchando
    cualquier tipo de evento.
    * Es en ese lugar donde creamos el "endpoint" digamos con ```socket.on('nombre evento cliente', (payload)=>{})```

    ### Servidor / cliente
    * Como nuestro server es una clase, manejamos io como un atributo de la clase, por lo que
    cuando queremos hacer que nuestro servidor de sockets envie informacion, ocupamos 
    ```this.io.emit('nombre-evento', payload)```
    * Ahora habilitamos la escucha desde el cliente

* Callbacks en los sockets
    ### Comunicacion cliente / servidor
    * ```emit()``` tiene 3 parametros |nameEvent|payload|callback()?|
    * callback(), recibe como argumento la respuesta del servidor.
    * Por el lado del servidor, el callback viene parametro despues del payload, y este
    se usa como cualquier funcion, enviando en los parametros el resultado de la logica de negocio. (ejem: del cliente envia un objeto, en el socket del servidor recibo el objeto como payload, hago el proceso que necesito, y respondo con el callback(respuesta) lo que deba responder. Es entonces cuando el cliente recibe la data en su callback y podemos realizar lo que queramos.)

    * Ejemplo:
    ~~~JavaScript
    
    //Desde el cliente
    socket.emit('enviar-mensaje', payload, (fromServer) => {
        console.log('Desde el servidor: ', fromServer);
    });

    //-----

    //Desde el servidor
    socket.on('enviar-mensaje', (payload, callback) => {

        const {id} = payload;

        //Respuesta
        const serverMsg = {
            id,
            processID: 999,
            date: new Date().getTime()
        }

        callback(serverMsg);
    });
    ~~~
* Broadcast
    * En el server, las funciones anonimas las podemos guardar como socketControllers tal como
    las rutas.
    * En este caso, los socketControllers no tienen acceso al this.io, y el socket que reciben pertenece al mismo socket-client que envio el evento.
    Esto quiere decir que para enviar algo a todos los sockets conectados, ocupamos "broadcast".

    * ejemplo:
    ~~~JavaScript
    //Desde sockets/controller.js

    const socketController = (socket) => {
    
        //Evento Enviar-mensaje
        socket.on('enviar-mensaje', (payload, callback) => {
            
            const {id} = payload;
            const serverMsg = {
                id,
                processID: 999,
                date: new Date().getTime()
            };
            
            callback(serverMsg); // Solo para el socket que activo este evento
            socket.broadcast.emit('enviar-mensaje', 'Se ha enviado un nuevo archivo!'); // => Emite a todos los sockets Client
        });
        
        // mas eventos ...
    };
    module.exports = {socketController};
    ~~~


* Pruebas en Heroku