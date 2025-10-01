// hooks/useWebSocket.tsx
import { useEffect, useRef, useState } from 'react';
import { Client } from '@stomp/stompjs';
import SockJS from 'sockjs-client';
import { useDispatch } from 'react-redux';
import {replaceNotifications } from '@/stores/slices/notificationSlice';
import type { NotificationObject } from '@custom-types/notification-service';
import useApi from './useApi';

const useWebSocket = (userId: string) => {
  const clientRef = useRef<Client | null>(null);
  const dispatch = useDispatch();
  const [connectionLost, setConnectionLost] = useState(true);
  const { getNotifications } = useApi();

  useEffect(() => {
    // Client nur einmal initialisieren
    if (clientRef.current) return;

    const socketFactory = () => new SockJS('http://localhost:8080/api/v1/websocket');

    const client = new Client({
      webSocketFactory: socketFactory,
      reconnectDelay: 5000, // Auto-Reconnect

      onConnect: async () => {
        console.log("✅ WebSocket connected");
        setConnectionLost(false);

        try {
          const fresh = await getNotifications(userId);
          dispatch(replaceNotifications(fresh)); // ersetzt alte Daten mit aktuellem Backend-Stand
        } catch (e) {
          console.error("❌ Fehler beim Laden der Notifications", e);
        }

        client.subscribe(`/topic/notifications/${userId}`, (message) => {
          if (message.body) {
            try {
              const notification: NotificationObject[] = JSON.parse(message.body);
              dispatch(replaceNotifications(notification));
            } catch (err) {
              console.error('❌ Fehler beim Parsen der Notification:', err);
            }
          }
        });
      },

      onDisconnect: () => {
        console.warn("⚠️ Disconnected");
        setConnectionLost(true);
      },

      onWebSocketClose: () => {
        console.warn("⚠️ Socket closed");
        setConnectionLost(true);
      },

      onWebSocketError: (err) => {
        console.error("⚠️ Socket error", err);
        setConnectionLost(true);
      },

      onStompError: (frame) => {
        console.error("❌ Broker error: ", frame.headers['message']);
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
