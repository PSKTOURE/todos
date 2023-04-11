import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import { StyleSheet, TextInput, TouchableOpacity, View } from "react-native";

// Composant representant la barre d'input afin de rajouter soit
// taskList ou une tache.

export default function Input({ add }) {
  const [text, setText] = useState("");

  return (
    <View>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.inputBox}
          onChangeText={setText}
          onSubmitEditing={() => {
            add(text);
            setText("");
          }}
          placeholder="Enter new Item"
          value={text}
        />
        <TouchableOpacity
          style={styles.addItems}
          onPress={() => {
            add(text);
            setText("");
          }}
        >
          <Ionicons name="add" size={30} color="#223152" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  inputBox: {
    padding: 13,
    backgroundColor: "white",
    fontSize: 18,
    width: "auto",
    borderWidth: 4,
    borderRadius: 12,
    flex: 1,
    borderColor: "green",
  },
  addItems: {
    marginLeft: 12,
    backgroundColor: "white",
    padding: 12,
    borderRadius: 100,
  },
});
