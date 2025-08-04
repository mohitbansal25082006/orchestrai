'use client';
import { useEffect } from 'react';
import { io } from 'socket.io-client';

const socket = io('http://localhost:4000');

export function useSocket(roomId: string) {
  useEffect(() => {
    socket.emit('join-room', roomId);
    return () => {
      socket.emit('leave-room', roomId);
    };
  }, [roomId]);

  return socket;
}