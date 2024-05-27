const { Server, Socket } = require("socket.io");

const io = new Server(1996);

io.on("connection", (Socket) => {
    console.log('Socket Connected', socket.id);
})