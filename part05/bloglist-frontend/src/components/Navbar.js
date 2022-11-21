import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { selectLoggedUser, userLoggedOut } from './user/usersSlice';

const NavBar = () => {
  const user = useSelector(selectLoggedUser);
  const dispatch = useDispatch();

  const handleLogout = () => {
    window.localStorage.removeItem('user');
    dispatch(userLoggedOut());
  };

  return (
    <nav>
      <ul>
        <li>
          <Link to="/blogs">Blogs</Link>
        </li>
        <li>
          <Link to="/users">Users</Link>
        </li>
      </ul>
      <span>{`${user.name} is Logged In`}</span>
      <button id="logout-button" onClick={handleLogout}>
        Log out
      </button>
    </nav>
  );
};

export default NavBar;
