const server = require('http').createServer()
const io = require('socket.io')(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
});
io.on('connection', (socket)=> {
    console.log("deneme");
    socket.on("position", index => {
        console.log("server received", index)
        socket.emit("positonResponse", index)
    })
})

server.listen(3000)