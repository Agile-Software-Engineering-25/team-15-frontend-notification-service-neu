import { Badge, Typography } from '@mui/joy';

interface NotificationBellBadgeProps {
  children: React.ReactNode;
  unreadCount: number;
  connectionLost: boolean;
}

const NotificationBellBadge = ({ children, unreadCount, connectionLost }: NotificationBellBadgeProps) => {
  return unreadCount === 0 ? (
    <>{children}</>
  ) : (
    <Badge
      badgeContent={
        connectionLost ? (
          <Typography>!</Typography>
        ) : unreadCount > 99 ? (
          <Typography>{'99+'}</Typography>
        ) : (
          <Typography sx={{ color: 'var(--joy-palette-warning-200)' }}>
            {unreadCount}
          </Typography>
        )
      }
      color={connectionLost ? 'danger' : 'warning'}
      size="sm"
    >
      {children}
    </Badge>
  );
};

export default NotificationBellBadge;
