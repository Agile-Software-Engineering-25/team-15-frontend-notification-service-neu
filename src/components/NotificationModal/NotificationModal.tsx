import type { NotificationObject } from '@/@custom-types/notification-service';
import { t } from 'i18next';
import { useEffect, useState } from 'react';

const NotificationModal = ({
  notification,
  setSelectedNotification,
  modifyNotification,
}: {
  notification: NotificationObject | null;
  setSelectedNotification: (notification: NotificationObject | null) => void;
  modifyNotification: (notificationId: string, read: boolean) => void;
}) => {
  const [isRead, setIsRead] = useState(notification?.readAt ? true : false);

  useEffect(() => {
    if (!notification) return;

    setIsRead(notification.readAt ? true : false);
  }, [notification]);

  // modal logic here
  return notification ? (
    <>
      <div
        style={{
          position: 'fixed',
          background: '#000',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          opacity: 0.5,
          width: '200vw',
          height: '200vh',
          zIndex: 999,
          transform: 'translate(-50%, -50%)',
        }}
        onClick={() => {
          setSelectedNotification(null);
        }}
      ></div>
      <div
        style={{
          position: 'fixed',
          top: '50%',
          left: '50%',
          backgroundColor: '#fbfcfe',
          padding: '25px',
          borderRadius: '12px',
          border: 0,
          transform: 'translate(-50%, -50%)',
          zIndex: 1000,
          fontFamily: 'Arial, sans-serif',
          minWidth: '400px',
          maxWidth: '90vw',
        }}
      >
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: '60px',
            marginBottom: '15px',
          }}
        >
          <h2 style={{ fontSize: '1.5rem', margin: 0, fontWeight: 600 }}>
            {t('components.notificationModal.name')}
          </h2>
          <button
            style={{
              background: 'none',
              border: 'none',
              color: 'blue',
              cursor: 'pointer',
            }}
            onClick={() => modifyNotification(notification.id, !isRead)}
          >
            {isRead
              ? t('components.notificationModal.markAsUnread')
              : t('components.notificationModal.markAsRead')}
          </button>
        </div>
        <hr></hr>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
              gap: '10px',
              marginTop: 10,
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <div
              style={{
                background: '#e8e8e8',
                padding: 10,
                borderRadius: '12px',
                width: '100%',
              }}
            >
              <h1 style={{ fontSize: '1.2rem', margin: 0, fontWeight: 600 }}>
                {t('components.notificationModal.title')}
              </h1>
              <h2 style={{ fontSize: '1.1rem', margin: 0, fontWeight: 400, wordBreak: 'break-word', maxWidth: '400px' }}>
                {notification.title}
              </h2>
            </div>
            <div
              style={{
                background: '#e8e8e8',
                padding: 10,
                borderRadius: '12px',
                width: '100%',
              }}
            >
              <h1 style={{ fontSize: '1.2rem', margin: 0, fontWeight: 600 }}>
                {t('components.notificationModal.description')}
              </h1>
             <h2 style={{ fontSize: '1.1rem', margin: 0, fontWeight: 400, wordBreak: 'break-word', maxWidth: '400px' }}>
                {notification.shortDescription}
              </h2>
            </div>
          </div>

          <div
            style={{
              background: '#e8e8e8',
              padding: 10,
              borderRadius: '12px',
           
            }}
          >
            <h1 style={{ fontSize: '1.2rem', margin: 0, fontWeight: 600 }}>
              {t('components.notificationModal.message')}
            </h1>
            <h2 style={{ fontSize: '1.1rem', margin: 0, fontWeight: 400, wordBreak: 'break-word', maxWidth: '400px' }}>
              {notification.message}
            </h2>
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'row', gap: '10px' }}>
          <button
            onClick={() => {
              setSelectedNotification(null);
            }}
            style={{
              background: '#0d2f6b',
              color: '#fff',
              border: 'none',
              fontFamily: 'Arial, sans-serif',
              fontWeight: 800,
              fontSize: '0.8rem',
              padding: '10px',
              borderRadius: '8px',
              width: '100%',
              cursor: 'pointer',
              marginTop: '20px',
            }}
          >
            {t('components.notificationModal.close')}
          </button>
        </div>
      </div>
    </>
  ) : null;
};

export default NotificationModal;
