import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const SignInView = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  return (
    <>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          fetch("http://localhost:5123/register", {
            method: "POST",
            body: JSON.stringify({
              email: email,
              password: password,
            }),
            headers: {
              "Content-Type": "application/json",
            },
          }).then((response) => {
            if (response.ok) {
              navigate("/");
            } else {
              alert(
                `Error code: ${response.status} with message: Login or password in invalid format`
              );
            }
          });
        }}
      >
        <div>
          <input
            defaultValue={email}
            onChange={(e) => setEmail(e.target.value)}
            type="text"
            name="email"
            placeholder="Email"
          />
        </div>
        <div>
          <input
            defaultValue={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            name="password"
            placeholder="Password"
          />
        </div>
        <button>Sign up</button>
      </form>
    </>
  );
};
