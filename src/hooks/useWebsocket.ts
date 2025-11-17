import { useEffect, useRef, useState } from 'react';
import { Client } from '@stomp/stompjs';
import SockJS from 'sockjs-client';
import { useDispatch } from 'react-redux';
import { replaceNotifications } from '@/stores/slices/notificationSlice';
import type { NotificationObject } from '@custom-types/notification-service';
import useApi from './useApi';
import { BACKEND_BASE_URL } from '@/config';
import useUser from './useUser';

const useWebSocket = () => {
  const clientRef = useRef<Client | null>(null);
  const dispatch = useDispatch();
  const [connectionLost, setConnectionLost] = useState(true);
  const { getNotifications } = useApi();
  const user = useUser();
  const userId = user.getUserId();
  const accessToken = user.getAccessToken();
  
  // Use ref to track if we're already initializing to prevent double connections
  const isInitializingRef = useRef(false);

  useEffect(() => {
    // Prevent multiple simultaneous initializations (especially important for Firefox)
    if (clientRef.current || isInitializingRef.current || !userId || !accessToken) {
      return;
    }

    isInitializingRef.current = true;

    const socketFactory = () => {
      const socket = new SockJS(BACKEND_BASE_URL + '/ws');
      return socket;
    };

    const client = new Client({
      connectHeaders: {
        Authorization: `Bearer ${accessToken}`,
      },
      webSocketFactory: socketFactory,
      reconnectDelay: 5000,
      // Add heartbeat to keep connection alive (helps with Firefox)
      heartbeatIncoming: 4000,
      heartbeatOutgoing: 4000,
      onConnect: async () => {
        setConnectionLost(false);

        client.subscribe(`/topic/notifications/${userId}`, (message) => {
          if (message.body) {
            try {
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
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

      onWebSocketError: (error) => {
        console.error('WebSocket error:', error);
        setConnectionLost(true);
      },

      onStompError: (frame) => {
        console.error('STOMP error:', frame);
        setConnectionLost(true);
      },
    });

    client.activate();
    clientRef.current = client;
    isInitializingRef.current = false;

    return () => {
      if (clientRef.current) {
        clientRef.current.deactivate();
        clientRef.current = null;
      }
      isInitializingRef.current = false;
    };
    // Only re-run if userId or accessToken changes
  }, [userId, accessToken, dispatch, getNotifications]);

  return { connectionLost };
};

export default useWebSocket;
