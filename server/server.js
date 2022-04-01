require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const cookieParser = require("cookie-parser");
const { DbConnect } = require("./database");
const Routes = require("./routes/route");
const server = require("http").createServer(app);
const ACTIONS = require("./socketActions");
const io = require("socket.io")(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

const corsOption = {
  credentials: true,
  origin: ["http://localhost:3000"],
};

const PORT = process.env.PORT || 5000;
DbConnect();

app.use(cors(corsOption));
app.use(cookieParser());
app.use(express.json());
app.use("/api", Routes);

const socketUserMapping = {};

io.on("connection", (socket) => {
  console.log("New Connection....", socket.id);
  socket.on(ACTIONS.JOIN, ({ roomId, user }) => {
    socketUserMapping[socket.id] = user;
    const clients = Array.from(io.sockets.adapter.rooms.get(roomId) || []);
    clients.forEach((clientId) => {
      io.to(clientId).emit(ACTIONS.ADD_PEER, {
        peerId: socket.id,
        createOffer: false,
        user: user,
      });
      socket.emit(ACTIONS.ADD_PEER, {
        peerId: clientId,
        createOffer: true,
        user: socketUserMapping[clientId],
      });
    });
    socket.join(roomId);
  });

});

server.listen(PORT, () => {
  console.log(`App is running on port ${PORT}`);
});
