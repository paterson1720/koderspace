import io from 'socket.io-client';
const socket = io(process.env.SERVER_END_POINT);

export default socket;
