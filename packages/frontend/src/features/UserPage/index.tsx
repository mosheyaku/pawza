export interface UserPageProps {
  userId: string;
}

function UserPage({ userId }: UserPageProps) {
  return <div>UserPage of {userId}</div>;
}

export default UserPage;
