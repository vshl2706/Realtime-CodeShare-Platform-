import React, { useState, useRef, useEffect} from 'react';
import toast from 'react-hot-toast';
import Client from '../components/Client';
import Editor from '../components/Editor';
import { initSocket } from '../socket';
import { 
  useLocation, 
  useNavigate, 
  Navigate, 
  useParams 
} from 'react-router-dom';
import ACTIONS from '../Actions';
// console.log("Editor Page mounted");
const EditorPage = () => {

  const [clients, setClients] = useState([
    // { socketId: 1, userName: 'Vishal Singh' },
    // { socketId: 2, userName: 'Kartik Kumar' },
    // { socketId: 3, userName: 'Nikhil Kumar' },
    // { socketId: 4, userName: 'Shashank Rathore' },
  ]);
  
  const socketRef = useRef(null);
  const location = useLocation();
  const reactNavigator = useNavigate();
  const {roomId} = useParams();

  useEffect(() => {
    const init = async () =>{
      socketRef.current = await initSocket();
      socketRef.current.on('connect_error', (err)=>handleErrors(err));
      socketRef.current.on('connect_failed', (err)=>handleErrors(err));

      function handleErrors(e) {
        console.log('socket error', e);
        toast.error('Socket connection failed, try again later');
        reactNavigator('/');
      }

      // After creating socket we have to create an event to join event
      socketRef.current.emit(ACTIONS.JOIN, {
        roomId,
        username: location.state?.username, 
      });

      // Listening for joined event
      socketRef.current.on(
        ACTIONS.JOINED,
        ({clients, username, socketId}) => {
          if(username !== location.state?.username){
            toast.success(`${username} joined the room.`);
            console.log(`${username} joined`);
          }

          const uniqueClients = clients.filter(
            (client, index, self) =>
              index === self.findIndex((c) => c.username === client.username)
          );
          console.log('uniqueClients', uniqueClients);
          setClients(clients);
        }
      );

      // Listening for disconnected event
      socketRef.current.on(
        ACTIONS.DISCONNECTED,
        ({socketId, username}) => {
          toast.success(`${username} left the room.`);
          setClients((prev) => {
            return prev.filter(
              (client) => client.socketId !== socketId
            );
          });
        }
      );

    };
    init();
    // We have to clear the listeners otherwise memory leak problem will occur
    return () => {
      if (socketRef.current) {
        socketRef.current.disconnect();
        socketRef.current.off(ACTIONS.JOINED);
        socketRef.current.off(ACTIONS.DISCONNECTED);  
      }
    };

  }, []);

  if(!location.state){
    return <Navigate to="/" />;
  }
  


  return (
    <div className="mainWrap">
      <div className="aside">
        <div className="asideInner">
          <div className="logo">
            <img
              className="logoImage"
              src="/logo192.png"
              alt="logo"
            />
          </div>
          <h3>Connected</h3>
          <div className="clientsList">
            {clients.map((client) => (
              <Client
                key={client.socketId}
                username={client.username}
              />
            ))}
          </div>
        </div>
        <button className="btn copyBtn">Copy ROOM ID</button>
        <button className="btn leaveBtn">Leave</button>
      </div>
      <div className="cm-editor [cm-focused] [generated classes]">
        <div className="cm-scroller">
          <div className="cm-gutters">
            <div className="cm-gutter [...]">
              {/* <!-- One gutter element for each line --> */}
              <div className="cm-gutterElement">...</div>
            </div>
          </div>
          <div className="cm-content" >
            {/* <!-- The actual document content --> */}
            <div className="cm-line"><Editor/></div>
            <div className="cm-line">...</div>
          </div>
          <div className="cm-selectionLayer">
            {/* <!-- Positioned rectangles to draw the selection --> */}
            <div className="cm-selectionBackground"></div>
          </div>
          <div className="cm-cursorLayer">
            {/* <!-- Positioned elements to draw cursors --> */}
            <div className="cm-cursor"></div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default EditorPage;