
// Es todo lo que viene en el script de socket en el html
// socket.io/socket.io.js
// io.on('connection') = button.addEventListener('evento')
const socket = io();

// Obtener html elements
const lblOnline = document.querySelector('#lblOnline');
const lblOfline = document.querySelector('#lblOfline');
const txtMensaje = document.querySelector('#txtMensaje');
const btnEnviar = document.querySelector('#btnEnviar');

btnEnviar.addEventListener('click', ()=> {
    const msg = txtMensaje.value;
    const payload = {
        msg,
        id: 123,
        fecha: new Date().getTime()
    };

    // Enviar al servidor
    socket.emit('enviar-mensaje', payload, (fromServer) => {
        console.log('Desde el servidor: ', fromServer);
    });
});


/**
 * SOCKETS
 */
socket.on('enviar-mensaje', (payload)=> {
    console.log('Informacion para todos los clientes', payload);
});

socket.on('connect', ()=>{
    console.log('Conected');

    // Status toggle
    lblOfline.style.display = 'none';
    lblOnline.style.display = 'inline';
});
socket.on('disconnect', ()=>{
    console.log('Disconected');
    
    // Status toggle
    lblOnline.style.display = 'none';
    lblOfline.style.display = 'inline'; 
});