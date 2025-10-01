// hooks/useWebSocket.tsx
import { useEffect, useRef, useState } from 'react';
import { Client } from '@stomp/stompjs';
import SockJS from 'sockjs-client';
import { useDispatch } from 'react-redux';
import {replaceNotifications } from '@/stores/slices/notificationSlice';
import type { NotificationObject } from '@custom-types/notification-service';
import useApi from './useApi';
import { BACKEND_BASE_URL } from '@/config';

const useWebSocket = (userId: string) => {
  const clientRef = useRef<Client | null>(null);
  const dispatch = useDispatch();
  const [connectionLost, setConnectionLost] = useState(true);
  const { getNotifications } = useApi();

  useEffect(() => {
    if (clientRef.current) return;

    const socketFactory = () => new SockJS(BACKEND_BASE_URL+'/websocket');

    const client = new Client({
      webSocketFactory: socketFactory,
      reconnectDelay: 5000,
      onConnect: async () => {
        setConnectionLost(false);



        client.subscribe(`/topic/notifications/${userId}`, (message) => {
          if (message.body) {
            try {
              const notification: NotificationObject[] = JSON.parse(message.body);
              dispatch(replaceNotifications(notification));
            } catch{
              
            }
          }
        });

        try {
          const fresh = await getNotifications(userId);
          dispatch(replaceNotifications(fresh)); 
        }catch{

        }
        
        
      },

      onDisconnect: () => {
        setConnectionLost(true);
      },

      onWebSocketClose: () => {
        setConnectionLost(true);
      },

      onWebSocketError: () => {
        setConnectionLost(true);
      },

      onStompError: () => {
        setConnectionLost(true);
      },
    });

    client.activate();
    clientRef.current = client;

    return () => {
      client.deactivate();
      clientRef.current = null;
    };
  }, [userId, dispatch]);

  return { connectionLost };
};

export default useWebSocket;
