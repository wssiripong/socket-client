import './App.css';
import { useState, useEffect } from 'react';
import io from 'socket.io-client';

const socket = io.connect('http://localhost:8000');

function App() {
  const [room, setRoom] = useState('');
  const [message, setMessage] = useState('');
  const [messageReceived, setMessageReceived] = useState('');

  const joinRoom = () => {
    if (room !== '') {
      socket.emit('join_room', room);
    }
  };

  const sendMessage = () => {
    socket.emit('send_message', { message, room });
  };

  // useEffect(() => {
  //   socket.on('received_message', (data) => {
  //     setMessageReceived(data.message);
  //   });
  // }, [socket]);

  socket.on('received_message', (data) => {
    setMessageReceived(data.message);
  });

  return (
    <div className='App'>
      <input
        placeholder='room number'
        onChange={(e) => setRoom(e.target.value)}
        value={room}
      />
      <button onClick={joinRoom}>Join</button>
      <input
        placeholder='message...'
        onChange={(e) => setMessage(e.target.value)}
        value={message}
      />
      <button onClick={sendMessage}>Send</button>
      <h1>Message Received: </h1>
      <div>{messageReceived}</div>
    </div>
  );
}

export default App;
