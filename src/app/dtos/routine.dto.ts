export interface RoutineDto {
  id: number;
  userId: number;
  startDate: string;
  startTime: string;
  endDate: string;
  endTime: string;
  goals: string;
  completed: boolean;
  sendToCalendar: boolean;
}
