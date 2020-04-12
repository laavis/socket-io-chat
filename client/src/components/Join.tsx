import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Join: React.FC = () => {
  const [name, setName] = useState('');
  const [room, setRoom] = useState('');

  return (
    <div>
      <div>
        <h1>Join</h1>
        <div>
          <input type="text" placeholder={name} onChange={(e) => setName(e.target.value)} />
        </div>
        <div>
          <input type="text" placeholder={room} onChange={(e) => setRoom(e.target.value)} />
        </div>
        <Link
          to={`/chat?name=${name}&room=${room}`}
          onClick={(e) => (!name || !room ? e.preventDefault() : null)}
        >
          <button type="submit">Sign In</button>
        </Link>
      </div>
    </div>
  );
};

export default Join;
