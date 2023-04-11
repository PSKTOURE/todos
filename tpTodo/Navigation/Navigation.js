// npm i --save @react-navigation/bottom-tabs @react-navigation/native

import React from "react";
import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons, Entypo } from "@expo/vector-icons";

import HomeScreen from "../Screen/HomeScreen";
import SignInScreen from "../Screen/SignInScreen";
import SignUpScreen from "../Screen/SignUpScreen";
import SignOutScreen from "../Screen/SignOutScreen";

import { TokenContext } from "../Context/Context";
import TodoNavigation from "./TodoNavigation";

// Composant representant la barre de navigation

const Tab = createBottomTabNavigator();

const MyTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: "#223152",
    background: "#223152",
  },
};

export default function Navigation() {
  return (
    <TokenContext.Consumer>
      {([token, setToken]) => (
        <NavigationContainer theme={MyTheme}>
          {token == null ? (
            <Tab.Navigator
              screenOptions={({ route }) => ({
                headerStyle: {
                  backgroundColor: "#223152",
                },
                headerTintColor: "#fff",
                headerTitleStyle: {
                  fontWeight: "bold",
                },
                tabBarIcon: ({ focused, color, size }) => {
                  let iconName;
                  if (route.name === "SignIn") iconName = "login";
                  if (route.name === "SignUp") iconName = "lock-open";
                  return <Entypo name={iconName} size={size} color={color} />;
                },
              })}
            >
              <Tab.Screen name="SignIn" component={SignInScreen} />
              <Tab.Screen name="SignUp" component={SignUpScreen} />
            </Tab.Navigator>
          ) : (
            <Tab.Navigator
              screenOptions={({ route }) => ({
                headerStyle: {
                  backgroundColor: "#223152",
                },
                headerTintColor: "#fff",
                headerTitleStyle: {
                  fontWeight: "bold",
                },
                tabBarIcon: ({ focused, color, size }) => {
                  let iconName;
                  if (route.name === "Home") iconName = "ios-home";
                  if (route.name === "TodoNavigation")
                    iconName = "ios-list-sharp";
                  if (route.name === "SignOut") iconName = "ios-log-out";
                  return <Ionicons name={iconName} size={size} color={color} />;
                },
              })}
            >
              <Tab.Screen name="Home" component={HomeScreen} />
              <Tab.Screen name="TodoNavigation" component={TodoNavigation} />
              <Tab.Screen name="SignOut" component={SignOutScreen} />
            </Tab.Navigator>
          )}
        </NavigationContainer>
      )}
    </TokenContext.Consumer>
  );
}
