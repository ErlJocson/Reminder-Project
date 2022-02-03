import { useState, useEffect } from "react";
import {
  Container,
  ReminderCard,
  PageTitle,
  ReminderCardContents,
  ReminderTitle,
  ReminderDate,
  ReminderContent,
  Contents,
} from "./elements/Reminder.elements";
import { redirectToLogin } from "./redirect";
import axios from "axios";
import { GrClose } from "react-icons/gr";

function ImportantReminders() {
  const [importantUserData, setImportantUserData] = useState([]);
  const token = window.sessionStorage.token;

  const getData = () => {
    axios
      .get("/sendImportantReminders", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((data) => setImportantUserData(data.data.user));
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      {window.sessionStorage.token ? (
        <Container>
          <PageTitle>important reminders</PageTitle>
          <ReminderCard>
            {importantUserData &&
              importantUserData.map((reminder) => {
                return (
                  <ReminderCardContents key={reminder.id}>
                    <Contents>
                      <ReminderTitle>
                        {reminder.title}
                        <GrClose
                          onClick={() => {
                            axios
                              .post(
                                "/deleteReminder",
                                {
                                  userId: reminder.curr_user,
                                  reminderId: reminder.id,
                                },
                                {
                                  headers: {
                                    Authorization: `Bearer ${token}`,
                                  },
                                }
                              )
                              .then((res) => {
                                if (res.data.msg) {
                                  getData();
                                  alert("Reminder deleted");
                                }
                              });
                          }}
                        />
                      </ReminderTitle>
                      <ReminderDate>{reminder.date_posted}</ReminderDate>
                      <ReminderContent>{reminder.content}</ReminderContent>
                    </Contents>
                  </ReminderCardContents>
                );
              })}
          </ReminderCard>
        </Container>
      ) : (
        redirectToLogin()
      )}
    </>
  );
}

export default ImportantReminders;
