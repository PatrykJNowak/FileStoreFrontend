import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export const LoginView = () => {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  return (
    <>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          fetch("http://localhost:5123/login", {
            method: "POST",
            body: JSON.stringify({
              email: login,
              password: password,
            }),
            headers: {
              "Content-Type": "application/json",
            },
          })
            .then((response) => {
              if (response.ok) {
                return response.json();
              } else {
                alert(
                  "Not found user with given login and password. Try again"
                );
                throw new Error("Login failed!");
              }
            })
            .then((data) => {
              localStorage.setItem("token", data.accessToken);
              navigate("/file");
            });
        }}
      >
        <div>
          <input
            onChange={(e) => setLogin(e.target.value)}
            type="text"
            name="login"
            placeholder="Login"
          />
        </div>
        <div>
          <input
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            name="password"
            placeholder="Password"
          />
        </div>
        <div>
          <button disabled={login.length === 0 || password.length === 0}>
            Sign in
          </button>
        </div>
        <div>
          <Link to="/signup">
            <button>Sign up!</button>
          </Link>
        </div>
      </form>
    </>
  );
};
