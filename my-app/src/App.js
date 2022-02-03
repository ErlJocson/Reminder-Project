import React from "react";
import Navigation from "./components/navigation/Navigation";
import AddReminders from "./components/pages/AddReminders";
import ImportantReminders from "./components/pages/ImportantReminders";
import Login from "./components/pages/Login";
import Register from "./components/pages/Register";

import Reminders from "./components/pages/Reminders";
import GlobalStyle from "./globalStyles";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <>
      <GlobalStyle />
      <BrowserRouter>
        <Navigation />
        <Routes>
          <Route exact element={<Reminders />} path="/" />
          <Route element={<ImportantReminders />} path="/important-reminder" />
          <Route element={<AddReminders />} path="/add-reminder" />
          <Route element={<Login />} path="/login" />
          <Route element={<Register />} path="/register" />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
