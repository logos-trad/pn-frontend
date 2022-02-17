export interface Notification {
    iun: string;
    paNotificationId: string;
    senderId: string;
    sentAt: string;
    subject: string;
    notificationStatus: NotificationStatus;
    recipientId: string;
}

export enum NotificationStatus {
    RECEIVED = 'RECEIVED',
    DELIVERING = 'DELIVERING',
    DELIVERED = 'DELIVERED',
    VIEWED = 'VIEWED',
    EFFECTIVE_DATE = 'EFFECTIVE_DATE',
    PAID = 'PAID',
    UNREACHABLE = 'UNREACHABLE',
    CANCELED = 'CANCELED'
}

export interface GetNotificationsResponse {
    notifications: Array<Notification>;
    totalElements: number;
}

export interface GetNotificationsParams {
    startDate: string;
    endDate: string;
    recipientId?: string;
    status?: string;
    subjectRegExp?: string;
}