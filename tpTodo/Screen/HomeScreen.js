import React from "react";
import { Text, View } from "react-native";

import { UsernameContext } from "../Context/Context";

export default function HomeScreen() {
  return (
    <UsernameContext.Consumer>
      {([username, setUsername]) => {
        return (
          <View
            style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
          >
            <Text style={{ color: "white", fontSize: 50, fontWeight: 700 }}>
              Welcome !
            </Text>
            <Text style={{ color: "white", fontSize: 50, fontWeight: 700 }}>
              You are logged as {username}
            </Text>
          </View>
        );
      }}
    </UsernameContext.Consumer>
  );
}
