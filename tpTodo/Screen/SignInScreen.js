import { Link } from "@react-navigation/native";
import React from "react";
import { Text, View } from "react-native";

import SignIn from "../components/SignIn";

export default function SignInScreen() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <SignIn />
      <Text style={{ color: "white", marginTop: 15 }}>
        If you prefer, you can{" "}
        <Link
          style={{ textDecorationLine: "underline" }}
          to={{ screen: "SignUp" }}
        >
          Sign Up
        </Link>
      </Text>
    </View>
  );
}
