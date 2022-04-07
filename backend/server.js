const express = require('express');
const dotenv = require('dotenv').config();
const path = require('path');
const cors = require('cors');
const colors = require('colors');
const { errorHandler } = require('./middleware/errorMiddleware');
const usersRoutes = require('./routes/userRoutes.js');
const medicalRoutes = require('./routes/medicalRoutes.js');
const examinationRoutes = require('./routes/examinationRoutes.js');
const connectDB = require('./config/db');
const port = process.env.PORT || 5000;
const users = {}
const room = 'Connect';
connectDB()

const app = express()
const httpServer = require("http").createServer(app);
const options = {
  cors: {
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST"],
    transports: ["socket", "polling"]
  }
};

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ origin: '*' }));

app.use('/medicals', medicalRoutes);
app.use('/users', usersRoutes);
app.use('/examination-results', examinationRoutes);
app.use(errorHandler);

const io = require("socket.io")(httpServer, options);
// Serve frontend
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../frontend/build')))

  app.get('*', (req, res) =>
    res.sendFile(
      path.resolve(__dirname, '../', 'frontend', 'build', 'index.html')
    )
  )
} else {
  app.get('/', (req, res) => res.send('Please set to production'))
}

io.on('connect', socket => {
  socket.on('join', function () {
    socket.join(room);
  });

  socket.on('send-chat-message', (message, room) => {
    if (room === '') {
      socket.broadcast.emit('chat-message', message);
    } else {
      socket.to(room).emit('receive-message', message)
    }

  })
  socket.on('join-room', (room, cb) => {
    socket.join(room)
    cb(`Joined ${room}`)
  })  

});


httpServer.listen(port, () => console.log(`Server started on port ${port}`));

