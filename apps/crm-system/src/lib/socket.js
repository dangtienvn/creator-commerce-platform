import { io } from 'socket.io-client';

// Get the base API URL and remove '/api' if present
const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
const socketUrl = apiUrl.replace(/\/api$/, '');

const socket = io(socketUrl, {
  autoConnect: true,
  withCredentials: true,
});

export default socket;
