const express = require("express");
const http = require("http");
const socketio = require("socket.io");
const cors = require("cors");
const path = require("path");
const formatMessage = require("./messages");

const connectDB = require("./config/db");

connectDB();

const app = express();
const server = http.createServer(app);
const io = socketio(server);

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use("/auth", require("./routes/auth"));

app.use(cors());

const { addUser, removeUser, getUser, getUsersInRoom } = require("./users");

io.on("connection", (socket) => {
  socket.on("join", ({ userFront, room }) => {
    const userInfo = addUser({ id: socket.id, userFront, room });
    socket.join(userInfo.room);
    const user = userInfo.userFront;

    socket.emit(
      "message",
      formatMessage(
        "admin",
        `${user.username} Welcome to the room ${userInfo.room}`
      )
    );

    socket.broadcast
      .to(userInfo.room)
      .emit(
        "message",
        formatMessage("admin", `${user.username} Has Joined the Chat`)
      );
    io.to(userInfo.room).emit("roomData", {
      room: userInfo.room,
      users: getUsersInRoom(userInfo.room),
    });
  });

  socket.on("sendMessage", (message, callback) => {
    const user = getUser(socket.id);
    io.to(user.room).emit("message", formatMessage(user.userFront, message));
    callback();
  });
  socket.on("disconnect", () => {
    const user = removeUser(socket.id);
    if (user) {
      io.to(user.room).emit(
        "message",
        formatMessage("admin", `${user.userFront.username} Has Left the Chat`)
      );
      io.to(user.room).emit("roomData", {
        room: user.room,
        users: getUsersInRoom(user.room),
      });
    }
  });
});

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => console.log(`Server Started en Port ${PORT}`));
