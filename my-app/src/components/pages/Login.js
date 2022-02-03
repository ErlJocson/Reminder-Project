import {
  LoginForm,
  InputContainer,
  LoginLabel,
  LoginInput,
} from "./elements/Login.elements";
import { useState } from "react";
import axios from "axios";

function Login() {
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const token = window.sessionStorage.token;
  const handleSubmit = (event) => {
    event.preventDefault();
    axios
      .post("/token", {
        email: userEmail,
        password: userPassword,
      })
      .then((data) => {
        if (data.data.msg === false) {
          alert("Password or Email does not found");
        } else {
          sessionStorage.setItem("token", data.data.msg);
          window.location.href = "/";
        }
      })
      .catch((err) => {
        console.log(err);
      });
    setUserEmail("");
    setUserPassword("");
  };

  return (
    <>
      {token !== "" && token !== undefined ? (
        (window.location.href = "/")
      ) : (
        <LoginForm onSubmit={handleSubmit}>
          <InputContainer>
            <LoginLabel htmlFor="email">Email: </LoginLabel>
            <LoginInput
              onChange={(e) => setUserEmail(e.target.value)}
              type="email"
              placeholder="email"
              value={userEmail}
              required
            />
          </InputContainer>
          <InputContainer>
            <LoginLabel htmlFor="password">Password: </LoginLabel>
            <LoginInput
              onChange={(e) => setUserPassword(e.target.value)}
              type="password"
              placeholder="password"
              value={userPassword}
              required
            />
          </InputContainer>
          <InputContainer>
            <LoginInput type="submit" placeholder="password" />
          </InputContainer>
        </LoginForm>
      )}
    </>
  );
}

export default Login;
