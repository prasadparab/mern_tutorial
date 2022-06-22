import { useEffect } from "react";
import { Button, Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";

const LandingPage = () => {
  // useEffect(()=>{
  //   const user = localStorage.getItem("userInfo");
  //   if(user){
  //     history.pushState("/mynotes")
  //   }

  // },[history])
  return (
    <div style={{ minHeight: "70vh" }}>
      <Container>
        <Row>
          <div className="intro-text">Welcome!!</div>
          <div className="buttonContainer">
            {/* <a href="/login"> */}
            <Link to="/login">
              <Button size="lg" variant="outline-primary" className="mx-5">
                Login
              </Button>
            </Link>
            {/* </a> */}
            <Link to="/register">
              <Button siza="lg">Register</Button>
            </Link>
          </div>
        </Row>
      </Container>
    </div>
  );
};

export default LandingPage;
