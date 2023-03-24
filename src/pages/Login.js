import { useState } from "react";
import LoginForm from "../components/LoginForm";
import SignUpForm from "../components/SignUpForm";
import { Button } from "react-bootstrap";

function Login({ onLogin }) {
  const [showLogin, setShowLogin] = useState(true);

  return (
    <div className="container">
      <h2 className="text-center mb-4">{showLogin ? "Log In" : "Sign Up"}</h2>
      <div className="row justify-content-center">
        <div className="col-md-6">
          {showLogin ? (
            <LoginForm onLogin={onLogin} />
          ) : (
            <SignUpForm onLogin={onLogin} />
          )}
          <Button
            variant="link"
            className="d-block mx-auto mt-3"
            onClick={() => setShowLogin(!showLogin)}
          >
            {showLogin ? "Sign Up" : "Log In"}
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Login;
