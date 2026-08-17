import { io } from 'socket.io-client';

const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';
// Remove '/api' to get the base URL of the backend where socket is hosted
const socketUrl = apiUrl.replace(/\/api$/, '');

// Create the socket instance (lazy initialization to avoid server-side execution errors in Next.js)
let socket;

export const getSocket = () => {
  if (typeof window === 'undefined') {
    return null; // Don't run on server
  }

  if (!socket) {
    socket = io(socketUrl, {
      autoConnect: true,
      withCredentials: true,
    });
  }
  
  return socket;
};
