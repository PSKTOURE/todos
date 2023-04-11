import { createNativeStackNavigator } from "@react-navigation/native-stack";
import TodoListsScreen from "../Screen/TodoListsScreen";
import TodoListDetailScreen from "../Screen/TodoListDetailScreen";

// Composant representant la navigation entre une takList et les taches qu'elle contienne

const Stack = createNativeStackNavigator();

export default function TodoNavigation() {
  return (
    <Stack.Navigator
      initialRouteName="List"
      screenOptions={{
        headerStyle: {
          backgroundColor: "#223152",
        },
        headerTintColor: "#fff",
        headerTitleStyle: {
          fontWeight: "bold",
        },
      }}
    >
      <Stack.Screen
        name="TodoListsScreen"
        component={TodoListsScreen}
        options={{ title: "List" }}
      />
      <Stack.Screen
        name="TodoListDetailScreen"
        component={TodoListDetailScreen}
        options={{ title: "Details" }}
      />
    </Stack.Navigator>
  );
}
