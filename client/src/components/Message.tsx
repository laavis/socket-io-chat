import React from 'react';
import styled from 'styled-components';
import { IMessage } from '../interfaces';

const MsgBox = styled.div`
  padding: 0.5rem;
  margin-bottom: 0.5rem
  background: palevioletred;
`;

const Name = styled.span`
  font-weight: bold;
`;

const Msg = styled.p`
  margin: 0;
`;

const Message: React.FC<IMessage> = ({ user, text }) => {
  let isSentByCurrentUser = false;
  const trimmedName = user.trim().toLowerCase();

  if (user === trimmedName) isSentByCurrentUser = true;

  return isSentByCurrentUser ? (
    <MsgBox>
      <Name>{trimmedName}</Name>
      <div>
        <Msg>{text}</Msg>
      </div>
    </MsgBox>
  ) : (
    <MsgBox>
      <div>
        <Msg>{text}</Msg>
      </div>
      <Name>{user}</Name>
    </MsgBox>
  );
};

export default Message;
