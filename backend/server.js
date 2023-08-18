const app = require("express")();
const httpServer = require("http").createServer(app);
const io = require("socket.io")(httpServer, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

players = [];

io.on("connection", (socket) => {
  console.log("Bir oyuncu bağlandı:", socket.id);

  let player = { id: socket.id, selection: "" };
  players.push(player);
  console.log(players);

  socket.on("selection", (player) => {
    console.log(player);
    players.find((e) => e.id == player.id).selection == player.selection;
    io.emit(
      "currentPlayer",
      players.find((e) => e.id == player.id)
    );
  });

  socket.on("position", (position) => {
    console.log("server received", position.index, position.selection);
    io.emit("positionResponse", position);
  });
});

httpServer.listen(3000, () => {
  console.log("Server listening on port 3000");
});
