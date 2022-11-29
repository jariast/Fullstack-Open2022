import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { selectLoggedUser, userLoggedOut } from './user/usersSlice';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Container } from 'react-bootstrap';

const NavBar = () => {
  const user = useSelector(selectLoggedUser);
  const dispatch = useDispatch();

  const handleLogout = () => {
    window.localStorage.removeItem('user');
    dispatch(userLoggedOut());
  };

  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="#" as="span">
              <Link to="/blogs">Blogs</Link>
            </Nav.Link>
            <Nav.Link href="#" as="span">
              <Link to="/users">Users</Link>
            </Nav.Link>
            <Navbar.Text>
              Signed in as: {user.name}{' '}
              <button id="logout-button" onClick={handleLogout}>
                Log out
              </button>
            </Navbar.Text>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;
