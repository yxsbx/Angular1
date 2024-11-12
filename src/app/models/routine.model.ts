export interface Routine {
  id: number;
  userId: number;
  startDate: string;
  startTime: string;
  endDate: string;
  endTime: string;
  goals: string;
  completed: boolean;
  sendToCalendar: boolean;
  createdAt: string;
  updatedAt: string;
  deletedAt?: string | null;
}
