export interface AuthPayload {
  userId: string; // ObjectId
  email: string;
  firstName: string;
}
export interface RefreshPayload {
  userId: string; // ObjectId
  type: 'refresh';
}
