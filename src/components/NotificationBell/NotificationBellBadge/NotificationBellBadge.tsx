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
          unreadMessages > 99 ? (
            <Typography>{'99+'}</Typography>
          ) : (
            <Typography sx={{ color: 'var(--joy-palette-warning-200)' }}>
              {unreadMessages}
            </Typography>
          )
        ) : undefined
      }
      color="warning"
      size="sm"
    >
      {children}
    </Badge>
  );
};

export default NotificationBellBadge;
