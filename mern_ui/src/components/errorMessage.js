import { Alert } from "react-bootstrap";
const ErrorMessage = ({ variant = "info", children }) => {
  return (
    <div>
      <Alert variant={variant}>
        <strong>{children}</strong>
      </Alert>
    </div>
  );
};

export default ErrorMessage;
