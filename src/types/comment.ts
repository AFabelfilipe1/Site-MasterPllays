export interface VideoComment {
  id: string;
  videoId: string;
  userId: string;
  username: string;
  userPhoto: string | null;
  text: string;
  parentId: string | null;
  status: 'visible' | 'hidden';
  createdAt: Date | null;
  updatedAt: Date | null;
}
