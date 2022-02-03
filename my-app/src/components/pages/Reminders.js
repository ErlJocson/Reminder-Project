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

function Reminders() {
  const [userData, setUserData] = useState([]);
  const token = window.sessionStorage.token;
  const getData = () => {
    axios
      .get("/sendReminders", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((data) => {
        if (data) {
          setUserData(data.data.user);
        } else {
          setUserData([]);
        }
      });
  };
  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      {window.sessionStorage.token ? (
        <Container>
          <PageTitle>Reminders</PageTitle>
          <ReminderCard>
            {userData &&
              userData.map((reminder) => {
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

export default Reminders;
