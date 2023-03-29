import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';

function SignUpForm({ onLogin }) {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [bio, setBio] = useState("");
  const [errors, setErrors] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    setErrors([]);
    setIsLoading(true);
    fetch("http://127.0.0.1:3000/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username,
        password,
        password_confirmation: passwordConfirmation,
        image_url: imageUrl,
        bio,
      }),
    }).then((r) => {
      setIsLoading(false);
      if (r.ok) {
        r.json().then((user) => {
          onLogin(user);
          navigate('/navbar'); // Replace "/todos" with the actual path to your todos page
        });
      } else {
        r.json().then((err) => setErrors(err.errors));
      }
    });
  }

  return (
    <form className="container mt-4">
      <h2 className="text-center mb-4"></h2>
      {errors.length > 0 && (
        <div className="alert alert-danger" role="alert">
          {errors.map((error) => (
            <p key={error}>{error}</p>
          ))}
        </div>
      )}
      <div className="mb-3">
        <label htmlFor="username" className="form-label">
          Username:
        </label>
        <input
          type="text"
          className="form-control"
          id="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
      <div className="mb-3">
        <label htmlFor="password" className="form-label">
          Password:
        </label>
        <input
          type="password"
          className="form-control"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <div className="mb-3">
        <label htmlFor="passwordConfirmation" className="form-label">
          Confirm Password:
        </label>
        <input
          type="password"
          className="form-control"
          id="passwordConfirmation"
          value={passwordConfirmation}
          onChange={(e) => setPasswordConfirmation(e.target.value)}
        />
      </div>
      <div className="mb-3">
        <label htmlFor="imageUrl" className="form-label">
          Image URL:
        </label>
        <input
          type="text"
          className="form-control"
          id="imageUrl"
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
        />
      </div>
      <div className="mb-3">
        <label htmlFor="bio" className="form-label">
          Bio:
        </label>
        <textarea
          className="form-control"
          id="bio"
          value={bio}
          onChange={(e) => setBio(e.target.value)}
        />
      </div>
      <button disabled={isLoading} type="submit" className="btn btn-primary">
        {isLoading ? "Loading..." : "Sign Up"}
      </button>
    </form>
  );
}

export default SignUpForm;
