import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { selectUserById } from './usersSlice';

const User = () => {
  const { userId } = useParams();

  const user = useSelector((state) => selectUserById(state, userId));

  if (!user) {
    return (
      <>
        <h1>User Not Found</h1>
      </>
    );
  }

  return (
    <>
      <h1>{user.name}</h1>
    </>
  );
};

export default User;
