import {
  LoginForm,
  InputContainer,
  LoginInput,
  LoginLabel,
} from "./elements/Login.elements";
import { useState } from "react";
import axios from "axios";

function Register() {
  const [newUserEmail, setNewUserEmail] = useState("");
  const [newUsername, setNewUsername] = useState("");
  const [newUserPassword, setNewUserPassword] = useState("");
  const [confirmPass, setConfirmPass] = useState("");

  const valid = () => {
    axios
      .post("/register", {
        email: newUserEmail,
        username: newUsername,
        password: newUserPassword,
      })
      .then((response) => {
        const backendMsg = response.data.msg;
        if (
          backendMsg !==
          "Email is already used or something went wrong with the server"
        ) {
          sessionStorage.setItem("token", backendMsg);
          window.location.href = "/";
          alert("Account created");
        }
      })
      .catch((err) => console.log(err));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (newUserPassword === confirmPass) {
      valid();
      setNewUserEmail("");
      setNewUsername("");
      setNewUserPassword("");
      setConfirmPass("");
    } else {
      alert("Password do not match");
      setNewUserPassword("");
      setConfirmPass("");
    }
  };

  return (
    <>
      <LoginForm onSubmit={handleSubmit}>
        <InputContainer>
          <LoginLabel htmlFor="">Email: </LoginLabel>
          <LoginInput
            onChange={(e) => setNewUserEmail(e.target.value)}
            type="email"
            placeholder="email"
            value={newUserEmail}
            required
          />
        </InputContainer>
        <InputContainer>
          <LoginLabel htmlFor="">Username: </LoginLabel>
          <LoginInput
            onChange={(e) => setNewUsername(e.target.value)}
            type="text"
            placeholder="username"
            value={newUsername}
            required
          />
        </InputContainer>
        <InputContainer>
          <LoginLabel htmlFor="">Password: </LoginLabel>
          <LoginInput
            onChange={(e) => setNewUserPassword(e.target.value)}
            type="password"
            placeholder="password"
            value={newUserPassword}
            required
          />
        </InputContainer>
        <InputContainer>
          <LoginLabel htmlFor="">Confirm Password: </LoginLabel>
          <LoginInput
            onChange={(e) => setConfirmPass(e.target.value)}
            type="password"
            value={confirmPass}
            placeholder="confirm password"
            required
          />
        </InputContainer>
        <InputContainer>
          <LoginInput type="submit" placeholder="password" />
        </InputContainer>
      </LoginForm>
    </>
  );
}

export default Register;
