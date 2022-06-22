import { Fragment, useEffect } from "react";
import {
  NavDropdown,
  Navbar,
  Nav,
  Form,
  FormControl,
  Button,
  Container,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { LogoutAction } from "../actions/userActions";
const Header = ({ setSearch }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  return (
    <Navbar bg="light" expand="lg">
      <Container fluid>
        {userInfo.name ? (
          <Fragment>
            <Navbar.Brand>
              <Link to="/">Home</Link>
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="navbarScroll" />
            <Navbar.Collapse id="navbarScroll">
              <Nav
                className="me-auto my-2 my-lg-0"
                style={{ maxHeight: "100px" }}
                navbarScroll
              >
                <Nav.Link href="/mynotes">My Notes</Nav.Link>
                {/* <Nav.Link href="#action2">Link</Nav.Link> */}
                <NavDropdown
                  title={userInfo?.name || "Profile"}
                  id="navbarScrollingDropdown"
                >
                  <NavDropdown.Item href="/profile">
                    {userInfo ? "View" : "View Profile"}
                  </NavDropdown.Item>
                  {/* <NavDropdown.Item href="#action4">
                Another action
              </NavDropdown.Item> */}
                  <NavDropdown.Divider />
                  <NavDropdown.Item href="#action5">
                    Something else here
                  </NavDropdown.Item>
                </NavDropdown>
                {/* <Nav.Link href="#" disabled>
              Link
            </Nav.Link> */}
              </Nav>
              <Form className="d-flex">
                <FormControl
                  type="search"
                  placeholder="Search"
                  className="me-2"
                  aria-label="Search"
                  onChange={(e) => setSearch(e.target.value)}
                />
                <Button
                  variant="outline-success"
                  onClick={() => {
                    dispatch(LogoutAction());
                    navigate("/");
                  }}
                >
                  Logout
                </Button>
              </Form>
            </Navbar.Collapse>
          </Fragment>
        ) : (
          <Navbar.Brand>
            <Link to="/login">Login</Link>
          </Navbar.Brand>
        )}
      </Container>
    </Navbar>
  );
};

export default Header;
