import React, { useState, useRef, useEffect } from 'react';
import toast from 'react-hot-toast';
import { FiCopy, FiLogOut, FiUsers } from 'react-icons/fi';
import Client from '../components/Client';
import Editor from '../components/Editor';
import { initSocket } from '../socket';
import { useLocation, useNavigate, Navigate, useParams } from 'react-router-dom';
import ACTIONS from '../Actions';

const EditorPage = () => {
  const [clients, setClients] = useState([]);
  const socketRef = useRef(null);
  const location = useLocation();
  const navigate = useNavigate();
  const { roomId } = useParams();

  useEffect(() => {
    const init = async () => {
      socketRef.current = await initSocket();
      socketRef.current.on('connect_error', handleErrors);
      socketRef.current.on('connect_failed', handleErrors);

      function handleErrors(e) {
        console.error('Socket error:', e);
        toast.error('Socket connection failed. Try again later.');
        navigate('/');
      }

      socketRef.current.emit(ACTIONS.JOIN, {
        roomId,
        username: location.state?.username,
      });
      socketRef.current.on(ACTIONS.JOINED, ({ clients, username, socketId }) => {
        
        if (socketRef.current.id !== socketId) {
          toast.success(`${username} joined the room.`);
        }
        let a = clients.length
        for(let i = 0; i < a/2; i++) {
          clients.splice(i,1)
        }
        setClients(clients);
      });

      socketRef.current.on(ACTIONS.DISCONNECTED, ({ socketId, username }) => {
        toast.success(`${username} left the room.`);
        setClients((prev) => prev.filter((client) => client.socketId !== socketId));
      });
    };

    init();

    return () => {
      if (socketRef.current) {
        socketRef.current.disconnect();
        socketRef.current.off(ACTIONS.JOINED);
        socketRef.current.off(ACTIONS.DISCONNECTED);
      }
    };
  }, []);

  if (!location.state) return <Navigate to="/" />;

  const copyRoomId = async () => {
    try {
      await navigator.clipboard.writeText(roomId);
      toast.success('Room ID copied to clipboard!');
    } catch (err) {
      toast.error('Failed to copy Room ID');
    }
  };

  const leaveRoom = () => {
    navigate('/');
  };

  return (
    <div className="editorPageWrapper">
      <div className="sidebar glass">
        <div className="sidebarHeader">
          <img className="logoImage" src="/logo192.png" alt="CodeSync Logo" />
          <h3><FiUsers /> Connected Users</h3>
        </div>

        <div className="clientsList">
          {clients.map((client) => (
            <Client key={client.socketId} username={client.username} />
          ))}
        </div>

        <div className="sidebarFooter">
          <button className="btn copyBtn" onClick={copyRoomId}>
            <FiCopy className="btnIcon" /> Copy Room ID
          </button>
          <button className="btn leaveBtn" onClick={leaveRoom}>
            <FiLogOut className="btnIcon" /> Leave Room
          </button>
        </div>
      </div>

      <div className="editorContainer">
        <Editor socketRef={socketRef} roomId={roomId} />
      </div>
    </div>
  );
};

export default EditorPage;
