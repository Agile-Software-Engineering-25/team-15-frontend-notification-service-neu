enum NotificationType {
  Mail = 'mail',
  UI = 'ui',
  All = 'all',
}

interface NotificationObject {
  id: string;
  userId: string;
  message: string;
  title: string;
  shortDescription: string;
  type: NotificationType;
  readAt: string | null;
}

export type { NotificationObject, NotificationType };
