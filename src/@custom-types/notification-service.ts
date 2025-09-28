enum NotifyType {
  Mail = 'mail',
  UI = 'ui',
  All = 'all',
}

enum NotificationType {
  Info = 'Info',
  Warning = 'Warning',
  Congratulation = 'Congratulation',
  None = 'None',
}

interface NotificationObject {
  id: string;
  userId: string;
  message: string;
  title: string;
  shortDescription: string;
  notify: NotifyType;
  type: NotificationType;
  readAt: string | null;
  receivedAt: Date;
}

export type { NotificationObject, NotifyType };
