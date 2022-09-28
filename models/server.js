const express = require('express');
const cors = require('cors');
const { socketController } = require('../sockets/controller');

class Server {

    constructor() {
        this.app = express(); //Esta vez no levantaremos el servidor de express
        this.port = process.env.PORT;
        // Socket.io
        this.server = require('http').createServer(this.app);
        this.io = require('socket.io')(this.server);

        this.path = {};

        this.middlewares();

        // Sockets
        this.sockets();

    };

    // MIDDLEWARES
    middlewares() {

        // CORS
        this.app.use(cors());

        // Lectura body
        this.app.use(express.json());

        // Lectura public static files (html)
        this.app.use(express.static('public'));
    };


    // ROUTES
    routes() {
        // this.app.use(this.path..., require('routes/generalPath'));
    };

    // SOCKETS
    sockets() {

        //implicitamente se le pasa el (socket)
        this.io.on('connection', socketController); 
        // ---------------------------------------- NOTA:
        // Cada vez que alguien se conecte, se activara socketController
        // y en el se encuentran los sockets con escucha para cualquier
        // evento custom que hayamos creado.
    };
    // -------------------------------------------- NOTA:
    // (socket) viene a ser el Cliente en si. Este es 
    // enviado desde un Js por el lado del cliente (public/js/socket-client.js)
    // que a su vez ese script recoje la informacion del cliente
    // desde el html en el cual esta el script de socket.io/socket.io.js
    // Este ultimo script es propio de socket.io, y es en "io" donde
    // se encuentra toooda la info y cosas necesarias para trabajar
    // con conexiones, etc.
    // ------------------------------------------------------------------------

    listen() {
        this.server.listen(this.port, () => {
            console.log(`Servidor corriendo en el puerto ${this.port}`);
        });
    };
};


module.exports = Server;