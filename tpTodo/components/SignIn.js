import React, { useState } from "react";
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

import { signIn } from "../API/todoAPI";

import { TokenContext, UsernameContext } from "../Context/Context";

export default function SignIn() {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [visible, setVisible] = useState(true);

  const getSignedIn = (setToken, setUsername) => {
    setError("");
    if (login == "" || password == "") return;
    setVisible(false);
    signIn(login, password)
      .then((token) => {
        setUsername(login);
        setToken(token);
      })
      .catch((err) => {
        setError(err.message);
      });
    setVisible(true);
  };

  return (
    <TokenContext.Consumer>
      {([token, setToken]) => (
        <UsernameContext.Consumer>
          {([username, setUsername]) => {
            return (
              <View>
                {visible ? (
                  <>
                    <View>
                      <Text style={styles.label}>Login</Text>
                      <TextInput
                        style={styles.input}
                        placeholder="Login"
                        onChangeText={setLogin}
                        onSubmitEditing={() =>
                          getSignedIn(setToken, setUsername)
                        }
                        value={login}
                      />
                    </View>
                    <View>
                      <Text style={styles.label}>Password</Text>
                      <TextInput
                        style={styles.input}
                        placeholder="Password"
                        onChangeText={setPassword}
                        secureTextEntry={true}
                        onSubmitEditing={() =>
                          getSignedIn(setToken, setUsername)
                        }
                        value={password}
                      />
                    </View>
                    <TouchableOpacity
                      style={styles.submitButton}
                      onPress={() => getSignedIn(setToken, setUsername)}
                    >
                      <Text style={styles.submitButtonText}>Sign In</Text>
                    </TouchableOpacity>
                    {error ? (
                      <Text style={styles.text_error}>{error}</Text>
                    ) : (
                      []
                    )}
                  </>
                ) : (
                  <ActivityIndicator />
                )}
              </View>
            );
          }}
        </UsernameContext.Consumer>
      )}
    </TokenContext.Consumer>
  );
}

const styles = StyleSheet.create({
  label: {
    textAlign: "center",
    color: "white",
    fontWeight: 600,
    marginBottom: 15,
  },
  text_error: {
    color: "red",
  },
  text_input: {
    backgroundColor: "white",
    margin: 5,
  },
  input: {
    width: 300,
    padding: 15,
    marginBottom: 15,
    borderColor: "black",
    borderWidth: 1,
    borderRadius: 10,
    backgroundColor: "white",
  },
  submitButton: {
    borderRadius: 10,
    backgroundColor: "#0080F6",
    padding: 15,
  },
  submitButtonText: {
    color: "white",
    textAlign: "center",
    fontSize: 30,
    fontWeight: 500,
  },
});
