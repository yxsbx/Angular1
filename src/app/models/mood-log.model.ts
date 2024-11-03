export interface MoodLog {
  id: number;
  userId: number;
  date: string;
  morningMood: string;
  eveningMood: string;
  createdAt: string;
  updatedAt: string;
  deletedAt?: string | null;
}
