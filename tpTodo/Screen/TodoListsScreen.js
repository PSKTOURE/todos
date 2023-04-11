import React from "react";
import { View } from "react-native";
import TodoLists from "../components/TodoLists";

export default function TodoListsScreen({ navigation }) {
  return (
    <View>
      <TodoLists navigation={navigation} />
    </View>
  );
}
