const app = require('express')();
const httpServer = require('http').createServer(app);
const io = require('socket.io')(httpServer, {
cors: {
origin: '*',
methods: ['GET', 'POST']
}
});


let playerX = null;
let playerO = null;

io.on('connection', (socket) => {
    console.log('Bir oyuncu bağlandı:', socket.id);
    if (playerX === null) {
        playerX = socket.id;
        socket.emit('playerType', 'X');
      } else if (playerO === null) {
        playerO = socket.id;
        socket.emit('playerType', 'O');
      } else {
        socket.emit('roomFull');
        socket.disconnect(true);
      }
    socket.on("position", (index) => {
        console.log("server received", index);
        io.emit("positionResponse", index);
    });
   
});

httpServer.listen(3000, () => {
    console.log("Server listening on port 3000");
});
