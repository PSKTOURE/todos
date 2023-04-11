import React, { useState } from "react";
import { StyleSheet } from "react-native";
import Navigation from "./Navigation/Navigation";

import {
  NbDoneContext,
  NbNotDoneContext,
  TokenContext,
  UsernameContext
} from "./Context/Context";

export default function App() {
  const [token, setToken] = useState(null);
  const [username, setUsername] = useState(null);
  const [nbDone, setNbDone] = useState(null);
  const [nbNotDone, setNbNotDone] = useState(null);

  console.log("token", token);
  return (
    <UsernameContext.Provider value={[username, setUsername]}>
      <TokenContext.Provider value={[token, setToken]}>
        <NbDoneContext.Provider value={[nbDone, setNbDone]}>
          <NbNotDoneContext.Provider value={[nbNotDone, setNbNotDone]}>
            <Navigation />
          </NbNotDoneContext.Provider>
        </NbDoneContext.Provider>
      </TokenContext.Provider>
    </UsernameContext.Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
