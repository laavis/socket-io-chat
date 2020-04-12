import React, { useState, useEffect } from 'react';
import { RouteProps } from 'react-router-dom';
import queryString from 'query-string';
import io from 'socket.io-client';
import styled from 'styled-components';

import Messages from './Messages';

let socket: SocketIOClient.Socket;

const Chat: React.FC<RouteProps> = ({ location }) => {
  const [name, setName] = useState<string>('anon');
  const [room, setRoom] = useState<string>('general');
  const [messages, setMessages] = useState<any>([]);
  const [message, setMessage] = useState('');
  const ENDPOINT = 'localhost:5000';

  useEffect(() => {
    const { name, room }: any = queryString.parse(window.location.search);
    socket = io(ENDPOINT);

    setName(name);
    setRoom(room);

    socket.emit('join', { name, room }, () => {});

    return () => {
      socket.emit('disconnect');
      socket.off('disconnect');
    };
  }, [ENDPOINT, window.location.search]);

  // message handling
  useEffect(() => {
    socket.on('message', (msg: any) => {
      setMessages([...messages, msg]);
    });
  }, [messages]);

  // function for sending msgs
  const sendMessage = (e: any) => {
    e.preventDefault();
    if (message) {
      socket.emit('sendMessage', message, () => setMessage(''));
    }
  };

  return (
    <div>
      <h3>chat</h3>
      <div>
        <h4>messages</h4>
        <Messages messages={messages} />
      </div>
      <form>
        <input
          value={message}
          placeholder="Type a message..."
          onChange={(e) => setMessage(e.target.value)}
          onKeyPress={(e) => (e.key === 'Enter' ? sendMessage(e) : null)}
        />
        <button onClick={(e) => sendMessage(e)}>Send</button>
      </form>
    </div>
  );
};

export default Chat;
