import { MaterialIcons } from "@expo/vector-icons";
import React, { useContext, useEffect, useState } from "react";
import { StyleSheet, Switch, Text, TouchableOpacity, View } from "react-native";
import { NbDoneContext, NbNotDoneContext } from "../Context/Context";

/**
 * Composant representant une tache
 */

export default function TodoItem(props) {
  // Etat representant si une tache est finie ou pas
  const [done, setDone] = useState(props.item.done);

  // Variables de contexte representant le nombre total de taches
  // finies ou pas pour les tasksLists
  const [nbDone, setNbDone] = useContext(NbDoneContext);
  const [nbNotDone, setNbNotDone] = useContext(NbNotDoneContext);

  useEffect(() => {
    setDone(props.item.done);
  }, [props.item.done]);

  // Fonction changeant l'etat d'une tache lorsque l'on clique sur le switch
  const toggleSwitch = function (state) {
    setDone(state);
    props.changeItemDoneValue(props.item.id, state);
    if (state) {
      setNbDone(nbDone + 1);
      setNbNotDone(nbNotDone - 1);
    } else {
      setNbDone(nbDone - 1);
      setNbNotDone(nbNotDone + 1);
    }
  };

  return (
    <View style={styles.todoContent}>
      <View style={styles.flexSwitchText}>
        <Switch
          value={done}
          onValueChange={toggleSwitch}
          trackColor={{ done: "green", true: "green" }}
          thumbColor={done ? "white" : "#223152"}
        />

        <Text style={[styles.itemText, done ? styles.change : ""]}>
          {props.item.content}
        </Text>
      </View>
      <TouchableOpacity onPress={() => props.deleteTodo(props.item.id)}>
        <MaterialIcons name="delete" size={35} color="#223152" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  todoContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderWidth: 1,
    borderRadius: 12,
    borderColor: "white",
    backgroundColor: "white",
    marginBottom: 12,
    padding: 12,
  },
  itemText: {
    fontSize: 20,
    marginLeft: 12,
  },
  flexSwitchText: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  change: {
    color: "green",
  },
});
