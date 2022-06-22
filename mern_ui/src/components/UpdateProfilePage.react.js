import { useEffect, useState } from "react";
import { Button, Form, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import ErrorMessage from "./errorMessage";
import Loader from "./loader";
import MainScreen from "./mainScreen/mainScreen";
import { UpdateUserProfileAction } from "../actions/userActions";
const UpdateProfilePage = () => {
  const userUpdate = useSelector((state) => state.userUpdate);
  const { success } = userUpdate;
  const userDetails = useSelector((state) => state.userLogin);

  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConformPassword] = useState("");
  const dispatch = useDispatch();
  useEffect(() => {
    console.log("updated");
    if (success) {
      setMessage("USer updated successfully !!");
    }
    setName(userDetails.userInfo.name);
  }, [success, userDetails]);
  const submitHandler = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setMessage("Passwords do not match");
      return;
    } else {
      dispatch(UpdateUserProfileAction({ name, password }));
    }
  };
  return (
    <MainScreen title="Register">
      {/* {loadingIcon && <Loader />} */}
      {/* {errors && <ErrorMessage variant="danger">{errors}</ErrorMessage>} */}
      {message && <ErrorMessage variant="info">{message}</ErrorMessage>}
      <Form onSubmit={submitHandler}>
        <Form.Group className="mb-3" controlId="formBasicName">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </Form.Group>
        {/* <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Form.Text className="text-muted">
            We'll never share your email with anyone else.
          </Form.Text>
        </Form.Group> */}

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicPassword2">
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            value={confirmPassword}
            onChange={(e) => setConformPassword(e.target.value)}
          />
        </Form.Group>
        {/* {picMessage && <ErrorMessage>{picMessage}</ErrorMessage>}
        <Form.Group className="mb-3" controlId="formProfilePic">
          <Form.Label>Profile picture</Form.Label>
          <Form.Control
            type="file"
            label="Upload profile picture"
            onChange={(e) => postImage(e.target.files[0])}
          ></Form.Control>
        </Form.Group> */}
        <Button variant="primary" type="submit">
          Submit
        </Button>
        {/* <Row className="my-4">
          <Col>
            Existing Customer? <Link to="/login">Login here</Link>
          </Col>
        </Row> */}
      </Form>
    </MainScreen>
  );
};

export default UpdateProfilePage;
