import { useEffect, useRef, useState } from 'react';
import { Client } from '@stomp/stompjs';
import SockJS from 'sockjs-client';
import { useDispatch } from 'react-redux';
import { replaceNotifications } from '@/stores/slices/notificationSlice';
import type { NotificationObject } from '@custom-types/notification-service';
import useApi from './useApi';
import { BACKEND_BASE_URL } from '@/config';

const useWebSocket = () => {
  const clientRef = useRef<Client | null>(null);
  const dispatch = useDispatch();
  const [connectionLost, setConnectionLost] = useState(true);
  const { getNotifications } = useApi();
  const userId = '1'; // TODO get userId from JWT via context

  useEffect(() => {
    if (clientRef.current) return;

    const socketFactory = () => new SockJS(BACKEND_BASE_URL + '/websocket');

    const client = new Client({
      webSocketFactory: socketFactory,
      reconnectDelay: 5000,
      onConnect: async () => {
        setConnectionLost(false);

        client.subscribe(`/topic/notifications/${userId}`, (message) => {
          if (message.body) {
            try {
              const rawNotification: any[] = JSON.parse(message.body);

              const normalizedNotification: NotificationObject[] =
                rawNotification.map((n) => ({
                  ...n,
                  receivedAt: new Date(n.receivedAt),
                  type: n.notificationType,
                }));

              dispatch(replaceNotifications(normalizedNotification));
            } catch (err) {
              console.error('Error parsing notifications:', err);
            }
          }
        });

        try {
          const fresh = await getNotifications();
          dispatch(replaceNotifications(fresh));
        } catch (e) {
          console.error('Error loading notifications:', e);
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
