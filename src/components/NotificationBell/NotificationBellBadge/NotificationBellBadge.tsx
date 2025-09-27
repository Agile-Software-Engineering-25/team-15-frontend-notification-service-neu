import { Badge, Typography } from '@mui/joy';
import { useTypedSelector } from '@stores/rootReducer';
import { useEffect, useState } from 'react';

interface NotificationBellBadgeProps {
  children: React.ReactNode;
}

const NotificationBellBadge = ({ children }: NotificationBellBadgeProps) => {
  let notifications = useTypedSelector((state) => state.notifications.data);
  const [unreadMessages, setUnreadMessages] = useState(0);

  useEffect(() => {
    setUnreadMessages(notifications.filter((n) => n.readAt === null).length);
  }, [notifications]);

  return unreadMessages === 0 ? (
    <>{children}</>
  ) : (
    <Badge
      badgeContent={
        unreadMessages > 0 ? (
          unreadMessages > 5 ? (
            <Typography
              sx={{ color: 'var(--joy-palette-primary-200)', p: 0.2 }}
            >
              {'5+'}
            </Typography>
          ) : (
            <Typography sx={{ color: 'var(--joy-palette-primary-200)' }}>
              {unreadMessages}
            </Typography>
          )
        ) : undefined
      }
      color="primary"
      size="md"
    >
      {children}
    </Badge>
  );
};

export default NotificationBellBadge;
