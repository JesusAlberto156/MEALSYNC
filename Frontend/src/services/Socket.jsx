import { io } from 'socket.io-client';

const SESSION_KEY = 'ID de la Sesión del Cliente';
let clientSessionId = sessionStorage.getItem(SESSION_KEY);
if (!clientSessionId) {
    clientSessionId = crypto.randomUUID();
    sessionStorage.setItem(SESSION_KEY, clientSessionId);
}

export const socket = io('http://localhost:3500/', {
    auth: { clientSessionId }
});