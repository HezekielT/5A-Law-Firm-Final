const express = require('express')

const cors = require('cors')
const port = process.env.PORT || 5000;

require('dotenv').config()

const app = express()
var server = require('http').createServer(app);

app.use(cors);
app.use(express.json());

// app.get('/', (req, res) => {
//   res.send('Hello World!')
// })

var io = require('socket.io')(server, {
  cors: {
    origin: ['http://localhost:3000'],
    methods: ['GET', 'POST']
  }
})

io.on("connection", (socket) => {
  const id = socket.handshake.query.id

  socket.join(id)

  socket.on('create-schedule', (id, year, month, day, title, time, detail, schedule, privilege) => {
    socket.broadcast.emit('get-create-schedule', id, year, month, day, title, time, detail, schedule, privilege);
    // hopefully i can do the saving part here.
    // jkj
  });

  socket.on('delete-schedule', (id) => {
    socket.broadcast.emit('get-delete-schedule', id);
  })
})

if(process.env.NODE_ENV ===  'production') {
  app.use(express.static('frontend/build'))

  app.get('*', (req, res) => {
      res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'));
  } )
}

server.listen(port);