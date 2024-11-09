export interface Routine {
  id: number;
  userId: number;
  startDateTime: string;
  endDateTime: string;
  goals: string;
  completed: boolean;
  sendToCalendar: boolean;
  createdAt: string;
  updatedAt: string;
  deletedAt?: string | null;
}
