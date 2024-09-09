export interface AuthPayload {
  userId: string; // ObjectId
  email: string;
  firstName: string;
  isPremium: boolean;
}
export interface RefreshPayload {
  userId: string; // ObjectId
  type: 'refresh';
}
