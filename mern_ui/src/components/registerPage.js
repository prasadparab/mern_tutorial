import { useEffect, useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { RegisterUser } from "../actions/userActions";
import ErrorMessage from "./errorMessage";
import Loader from "./loader";
import MainScreen from "./mainScreen/mainScreen";

const RegisterPage = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConformPassword] = useState("");
  const [pic, setPic] = useState(
    "https://icon-library.com/images/lion-595b40b75ba036ed117d858a.svg.svg"
  );
  const [message, setMessage] = useState(null);
  const [picMessage, setpicMessage] = useState(null);
  const dispatch = useDispatch();
  const [errors, setErrors] = useState(false);
  const [loadingIcon, setLoading] = useState(false);

  const userLogin = useSelector((state) => state.userLogin);
  const { loading, error, userInfo } = userLogin;

  const postImage = async (file) => {
    console.log("posting image");
    if (!file) {
      return setpicMessage("Please select image");
    }
    setpicMessage(null);
    console.log(file.type);
    if (
      file.type === "image/jpeg" ||
      file.type === "image/png" ||
      file.type === "image/png"
    ) {
      const data = new FormData();
      data.append("profileImg", file);
      const imgUrl = await fetch("/api/images/profile-pic", {
        method: "POST",
        body: data,
        header: {
          "Content-Type": "multipart/form-data;",
        },
      }).then((res) => res.json());
      setPic(imgUrl.userCreated.profileImg);
      console.log(imgUrl);
    }
  };
  useEffect(() => {
    if (error) {
      setErrors(error);
    }

    setLoading(loading);

    if (userInfo) {
      if (userInfo.token) {
        setMessage("User Registered successfully !!!");
        setTimeout(() => {
          navigate("/login");
        }, 10000);
      }
    }
  }, [error, userInfo, loading]);

  const submitHandler = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setMessage("Passwords do not match");
      return;
    } else {
      setMessage(null);
      console.log(name, email, password, confirmPassword, pic);

      try {
        setErrors(false);
        dispatch(RegisterUser({ name, email, password, pic }));
        // setLoading(true);
        // const data = await fetch("http://localhost:5000/api/users/register", {
        //   method: "POST",
        //   headers: {
        //     "Content-type": "application/json",
        //   },
        //   body: JSON.stringify({ name, email, password, pic }),
        // }).then((res) => res.json());
        // setLoading(false);
        // console.log(data);
        // if (data.message) {
        //   setErrors(data.message);
        // }
        // if (data.token) {
        //   setMessage("user created sucessfully !!");
        //   setTimeout(() => {
        //     navigate("/");
        //   }, 5000);
        // }
      } catch (e) {
        setErrors(e);
        console.log(e);
      }
    }
  };
  return (
    <MainScreen title="Register">
      {loadingIcon && <Loader />}
      {errors && <ErrorMessage variant="danger">{errors}</ErrorMessage>}
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
        <Form.Group className="mb-3" controlId="formBasicEmail">
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
        </Form.Group>

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
        {picMessage && <ErrorMessage>{picMessage}</ErrorMessage>}
        <Form.Group className="mb-3" controlId="formProfilePic">
          <Form.Label>Profile picture</Form.Label>
          <Form.Control
            type="file"
            label="Upload profile picture"
            onChange={(e) => postImage(e.target.files[0])}
          ></Form.Control>
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
        <Row className="my-4">
          <Col>
            Existing Customer? <Link to="/login">Login here</Link>
          </Col>
        </Row>
      </Form>
    </MainScreen>
  );
};

export default RegisterPage;
