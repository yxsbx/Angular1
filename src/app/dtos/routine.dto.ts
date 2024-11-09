export interface RoutineDto {
  id: number;
  userId: number;
  startDateTime: string;
  endDateTime: string;
  goals: string;
  completed: boolean;
  sendToCalendar: boolean;
}
