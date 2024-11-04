export interface Routine {
  id: number;
  userId: number;
  date: string;
  goals: string;
  completed: boolean;
  createdAt: string;
  updatedAt: string;
  deletedAt?: string | null;
}
