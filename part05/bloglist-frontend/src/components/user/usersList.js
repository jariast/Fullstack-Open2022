import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUsers, selectAllUsers } from './usersSlice';

const UsersList = () => {
  const dispatch = useDispatch();

  const users = useSelector(selectAllUsers);

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  return (
    <>
      <table>
        <thead>
          <tr>
            <th></th>
            <th>Blogs Created</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.name}</td>
              <td>{user.blogs.length}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default UsersList;
