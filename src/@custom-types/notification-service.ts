enum NotificationType {
  Mail = 'mail',
  UI = 'ui',
  All = 'all',
}

interface Notification {
  id: string;
  userId: string;
  message: string;
  title: string;
  shortDescription: string;
  type: NotificationType;
}

export type { Notification, NotificationType };
