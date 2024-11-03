export interface Notification {
  id: number;
  userId: number;
  type: string;
  message: string;
  scheduledTime: string;
  createdAt: string;
  updatedAt: string;
  deletedAt?: string | null;
}
