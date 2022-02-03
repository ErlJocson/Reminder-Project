import { Container, PageTitle } from "./elements/Reminder.elements";
import {
  LoginForm,
  InputContainer,
  LoginLabel,
  LoginInput,
  Select,
} from "./elements/Login.elements";
import { useState } from "react";
import axios from "axios";
import { redirectToLogin } from "./redirect";

function AddReminders() {
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [content, setContent] = useState("");
  const [important, setImportant] = useState("");
  const token = window.sessionStorage.token;
  const handleSubmit = (event) => {
    event.preventDefault();
    axios
      .post(
        "/postNewReminders",
        {
          title: title,
          date: date,
          content: content,
          important: important,
        },

        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      )
      .then((data) => {
        alert(data.data.msg);
      });
    setTitle("");
    setDate("mm-dd-yyyy");
    setContent("");
    setImportant("");
  };

  return (
    <>
      {token && token !== "" && token !== undefined ? (
        <Container>
          <PageTitle>Add reminder</PageTitle>
          <LoginForm onSubmit={handleSubmit}>
            <InputContainer>
              <LoginLabel>Title</LoginLabel>
              <LoginInput
                onChange={(e) => setTitle(e.target.value)}
                type="text"
                placeholder="title"
                value={title}
                required
              />
            </InputContainer>
            <InputContainer>
              <LoginLabel>Date</LoginLabel>
              <LoginInput
                type="date"
                onChange={(e) => setDate(e.target.value)}
                required
              />
            </InputContainer>
            <InputContainer>
              <LoginLabel>Content</LoginLabel>
              <LoginInput
                onChange={(e) => setContent(e.target.value)}
                type="text"
                placeholder="content"
                value={content}
                required
              />
            </InputContainer>
            <InputContainer>
              <LoginLabel>Add to Important</LoginLabel>
              <Select onChange={(e) => setImportant(e.target.value)}>
                <option value="No">No</option>
                <option value="Yes">Yes</option>
              </Select>
            </InputContainer>
            <InputContainer>
              <LoginInput type="submit" />
            </InputContainer>
          </LoginForm>
        </Container>
      ) : (
        redirectToLogin()
      )}
    </>
  );
}

export default AddReminders;
