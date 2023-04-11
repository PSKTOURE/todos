import React, { useState } from "react";
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { signUp } from "../API/todoAPI";

import { TokenContext, UsernameContext } from "../Context/Context";

export default function SignUp() {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [copyPassword, setCopyPassword] = useState("");
  const [error, setError] = useState("");
  const [visible, setVisible] = useState(true);

  const getSignedUp = (setToken, setUsername) => {
    setError("");
    if (login == "" || password == "" || copyPassword == "") return;
    if (password != copyPassword) {
      setError("Passwords don't match");
      return;
    }
    setVisible(false);
    signUp(login, password)
      .then((token) => {
        setUsername(login);
        setToken(token);
        console.log("token", token);
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
                          getSignedUp(setToken, setUsername)
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
                          getSignedUp(setToken, setUsername)
                        }
                        value={password}
                      />
                    </View>
                    <View>
                      <Text style={styles.label}>Confirm Password</Text>
                      <TextInput
                        style={styles.input}
                        placeholder="Confirm Password"
                        onChangeText={setCopyPassword}
                        secureTextEntry={true}
                        onSubmitEditing={() =>
                          getSignedUp(setToken, setUsername)
                        }
                        value={copyPassword}
                      />
                    </View>
                    <TouchableOpacity
                      style={styles.submitButton}
                      onPress={() => getSignedUp(setToken, setUsername)}
                    >
                      <Text style={styles.submitButtonText}>Sign Up</Text>
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
    padding: 15,
    width: 300,
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
