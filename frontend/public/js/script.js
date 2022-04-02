import { io } from "https://cdn.socket.io/4.4.1/socket.io.esm.min.js";
const socket = io('http://localhost:5000');
const messageContainer = document.getElementById('message-container');
const messageForm = document.getElementById('send-container');
const messageInput = document.getElementById('message-input');
const name = sessionStorage.getItem('username');
const chatName = sessionStorage.getItem('chatName');
const room = 'Connect';

socket.on('connect', function () {
  console.log("Connected to server");
  socket.emit('join', room);
  console.log(socket.connected);
});

socket.on('join-room', (room) => {
  socket.emit('join-room', room);
})

socket.on('chat-message', data => {
  appendMessage(`${data}`)
})

socket.on('receive-message', message => {
  appendMessage(`${chatName}: ${message}`)
})

if (messageForm) {
  messageForm.addEventListener('submit', e => {
    e.preventDefault()
    const message = messageInput.value;
    const room = 'Connect';

    if (message === '') {
      return;
    } else {
      socket.emit('send-message', message, room);
      appendMessage(`${name}: ${message}`);
      messageInput.value = '';
    }
  })
}

function appendMessage(message) {
  const messageElement = document.createElement('div');
  messageElement.innerText = message;
  messageContainer.append(messageElement);
}

