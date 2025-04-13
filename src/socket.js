import {io} from 'socket.io-client';

let socket = null;

export const initSocket = async()=>{
    if(!socket){
        const options = {
            'force new connection' : true,
            reconnectionAttempts: 'Infinity',
            timeout: 10000,
            transports: ['websocket'],
        };
        return io(process.env.REACT_APP_BACKEND_URL, options);
    }
    return socket;
};