import {io, Socket} from 'socket.io-client';

interface ServerToClientEvents {
    chatMessage: (user: string, message: string) => void;
}

interface ClientToServerEvents {
    chatMessage: (message: string) => void;
}

// Create a socket instance
let socket: Socket<ServerToClientEvents, ClientToServerEvents>;

export const initializeSocket = (username: string) => {
    socket = io('http://localhost:3001', {
        auth: {
            username
        }
    });

    socket.on('connect', () => {
        console.log('Connected to server');
    });

    socket.on('connect_error', (e) => {
        console.error('Connect error', e);
    });

    socket.on('disconnect', () => {
        console.log('Disconnected from server');
    });

    return socket;
};

export const getSocket = () => {
    if (!socket) {
        throw new Error('Socket not initialized. Call initializeSocket first.');
    }
    return socket;
};
