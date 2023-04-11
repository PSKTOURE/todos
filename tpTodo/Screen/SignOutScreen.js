import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

import { TokenContext } from "../Context/Context";

export default function SignOut({ navigation }) {
  return (
    <TokenContext.Consumer>
      {([token, setToken]) => (
        <>
          <View style={{ flex: 1, justifyContent: "center" }}>
            <Text style={styles.text}>Sign Out</Text>
            <TouchableOpacity
              style={styles.content}
              onPress={() => setToken(null)}
            >
              <Text style={styles.text}>Sign me out</Text>
            </TouchableOpacity>
          </View>
        </>
      )}
    </TokenContext.Consumer>
  );
}

const styles = StyleSheet.create({
  content: {
    backgroundColor: "#0080F6",
    padding: 16,
    marginVertical: 8,
    marginHorizontal: 400,
    borderRadius: 40,
  },
  text: {
    color: "white",
    fontSize: 50,
    fontWeight: 700,
    textAlign: "center",
  },
});
