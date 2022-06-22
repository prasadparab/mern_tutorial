import { useEffect, useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { LoginAction } from "../actions/userActions";
import ErrorMessage from "./errorMessage";
import Loader from "./loader";
import MainScreen from "./mainScreen/mainScreen";

const LoginPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);
  const { loading, error, userInfo } = userLogin;

  const [errors, setErrors] = useState(false);
  //const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (userInfo && userInfo.token) {
      navigate("/mynotes");
    }
  }, [userInfo]);
  const submitHandler = async (e) => {
    e.preventDefault();
    // const test = await fetch("http://localhost:5000/api/notes").then((res) =>
    //   res.json()
    // );
    // console.log(test);
    console.log(email, password);
    try {
      //setLoading(true);
      const reqHeader = {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      };
      dispatch(LoginAction(email, password));
      // console.log(
      //   JSON.stringify({
      //     email,
      //     password,
      //   })
      // );
      // const data = await fetch("http://localhost:5000/api/users/login", {
      //   method: "POST",
      //   body: JSON.stringify({
      //     email,
      //     password,
      //   }),
      //   headers: {
      //     "Content-type": "application/json",
      //   },
      // }).then((res) => res.json());
      // if (data.statusCode && data.statusCode == 401) {
      //   setErrors(true);
      // } else {
      //   localStorage.setItem("userInfo", JSON.stringify(data));
      //   setErrors(false);
      //   navigate("/mynotes");
      // }
      // console.log(data);
      // setLoading(false);
    } catch (error) {
      console.log(error);
      setErrors(error);
    }
  };

  return (
    <MainScreen title={"Login"}>
      {loading && <Loader />}
      {error && <ErrorMessage>Invalid user !!!</ErrorMessage>}
      <Form onSubmit={submitHandler}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
          <Form.Text className="text-muted">
            We'll never share your email with anyone else.
          </Form.Text>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
        </Form.Group>
        {/* <Form.Group className="mb-3" controlId="formBasicCheckbox">
          <Form.Check type="checkbox" label="Check me out" />
        </Form.Group> */}
        <Button variant="primary" type="submit">
          Submit
        </Button>
        <Row className="my-4">
          <Col>
            New Customer? <Link to="/register">Regsiter here</Link>
          </Col>
        </Row>
      </Form>
    </MainScreen>
  );
};

export default LoginPage;
