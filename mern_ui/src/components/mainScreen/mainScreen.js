import { Container, Row } from "react-bootstrap";

const MainScreen = ({ title, children }) => {
  return (
    <div>
      <Container>
        <Row>
          <div className="page">{title && <h1>{title}</h1>}</div>
          <hr />
          {children}
        </Row>
      </Container>
    </div>
  );
};

export default MainScreen;
