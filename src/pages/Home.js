import React, { useEffect, useRef, useState } from 'react';
import { v4 as uuidV4 } from 'uuid';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const [roomId, setRoomId] = useState('');
  const [username, setUsername] = useState('');
  const navigate = useNavigate();
  const roomInputRef = useRef(null);

  useEffect(() => {
    roomInputRef.current.focus(); // Auto focus on ROOM ID input
  }, []);

  const createNewRoom = (e) => {
    e.preventDefault();
    const id = uuidV4();
    setRoomId(id);
    toast.success('New Room Created 🚀');
  };

  const joinRoom = () => {
    if (!roomId || !username) {
      toast.error('Room ID and Username are required');
      return;
    }

    navigate(`/editor/${roomId}`, {
      state: {
        username,
      },
    });
  };

  const handleInputEnter = (e) => {
    if (e.code === 'Enter') {
      joinRoom();
    }
  };

  return (
    <div className="homePageWrapper">
      <div className="formWrapper">
        <img className="homePageLogo" src="/logo192.png" alt="code-sync-logo" />
        <h4 className="mainLabel">Paste your Room ID here</h4>
        <div className="inputGroup">
          <input
            type="text"
            ref={roomInputRef}
            className="inputBox"
            placeholder="ROOM ID"
            onChange={(e) => setRoomId(e.target.value)}
            value={roomId}
            onKeyUp={handleInputEnter}
          />
          <input
            type="text"
            className="inputBox"
            placeholder="USERNAME"
            onChange={(e) => setUsername(e.target.value)}
            value={username}
            onKeyUp={handleInputEnter}
          />
          <button
            className={`btn joinBtn ${roomId && username ? '' : 'disabledBtn'}`}
            onClick={joinRoom}
            disabled={!roomId || !username}
          >
            JOIN ROOM
          </button>
          <span className="createInfo">
            If you don't have an invite then create &nbsp;
            <a onClick={createNewRoom} href="#" className="createNewBtn">
              NEW ROOM
            </a>
          </span>
        </div>
      </div>
      <footer>
        <h4>
          Built with ❤️ by &nbsp;
          <a href="https://github.com/vshl2706" target="_blank" rel="noreferrer">
            Vishal's Industry
          </a>
        </h4>
      </footer>
    </div>
  );
};

export default Home;
