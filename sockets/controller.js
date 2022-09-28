
const socketController = (socket) => {
            
    // Desde index.html, socket-client.js
    socket.on('enviar-mensaje', (payload, callback) => {
        
        const {id} = payload;
        
        const serverMsg = {
            id,
            processID: 999,
            date: new Date().getTime()
        }
        
        callback(serverMsg);
        socket.broadcast.emit('enviar-mensaje', 'Se ha enviado un nuevo archivo!'); // => Emite a todos los sockets Client
    });
};


module.exports = {socketController};