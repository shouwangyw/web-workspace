const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http)
const path = require('path')

app.get('/chat', (req, res) => {
  res.sendFile(path.resolve('./chat2.html'))
})
const list = ['ccc', 'ddd']

io.on('connection', (socket) => {
  console.log('a user connected')
  io.emit('chat-msg', list)
  // 自定义事件
  socket.on('send-chat-msg', (msg) => {
    if(!msg){
      return;
    }
    console.log(msg)
    list.push(msg)
    io.emit('chat-msg', list)
  })
  socket.on('clear-chat-msg', () => {
    list.length = 0
    io.emit('chat-msg', list)
  })
  socket.on('disconnect', function(){
    console.log('user disconnected');
  });
})
http.listen(3000, function(){
  console.log('listening on *:3000');
});