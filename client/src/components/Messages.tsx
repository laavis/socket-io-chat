import React from 'react';
import ScrollToBottom from 'react-scroll-to-bottom';
import { IMessage } from '../interfaces';
import Message from './Message';

interface IMessages {
  messages: IMessage[];
}

const Messages: React.FC<IMessages> = ({ messages }) => {
  return (
    <ScrollToBottom>
      {messages.map((message, index) => {
        console.log(message);

        return (
          <div key={index}>
            <Message user={message.user} text={message.text} />
          </div>
        );
      })}
    </ScrollToBottom>
  );
};

export default Messages;
