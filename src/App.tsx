import React from "react";

import logo from "./assets/logo_word_mark.svg";
import { UserSettingProvider } from "./context/userContext";
import Main from "./Main";

import "./config/theme.scss";
import "./App.style.scss";

function App(): React.ReactElement {
  return (
    <main className="main">
      <img src={logo} alt="eco₂rd" width="100px" />
      <UserSettingProvider>
        <Main />
      </UserSettingProvider>
    </main>
  );
}

export default App;
