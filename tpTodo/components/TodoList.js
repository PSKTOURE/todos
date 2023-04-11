import React, { useContext, useEffect, useState } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { addTask, deleteTask, getTodos, updateTask } from "../API/todoAPI";
import {
  NbDoneContext,
  NbNotDoneContext,
  TokenContext,
} from "../Context/Context";
import Footer from "./UI/Footer";
import Header from "./UI/Header";
import TodoItem from "./TodoItem";
import ProgressBarUI from "./UI/ProgressBarUI";
import Input from "./UI/Input";

/**
 * Composant represtant une TodoList
 * Une TodoList est composée de Todos
 */

export default function TodoList({ route }) {
  // constante representant l'id de la TodoList passer par la navigation
  const listID = route.params.id;

  // Variables de contexte representant le nombre total de taches
  // finies ou pas pour les tasksLists
  const [nbDone, setNbDone] = useContext(NbDoneContext);
  const [nbNotDone, setNbNotDone] = useContext(NbNotDoneContext);
  const [token, setToken] = useContext(TokenContext);

  // etat representant le nombre de todos done pour cette TodoList
  const [countOfItemsDone, setCountOfItemsDone] = useState(0);

  // Etat representant la liste contenant les todos
  const [todos, setTodos] = useState(null);

  // Etat representant etat precedant de la liste contenant les todos
  const [previous, setPrevious] = useState(null);
  const [error, setError] = useState("");

  // Fonction faisant appel a l'API pour recuperer l'ensemble des taches
  // et mettant à jour l'etat todos
  const _getTodos = () => {
    setError("");
    return getTodos(listID, token)
      .then((data) => {
        setTodos(data);
        setPrevious(data);
        setCountOfItemsDone(data.filter((item) => item.done).length);
        return data;
      })
      .catch((err) => {
        setError(err.message);
      });
  };

  // Fonction faisant appel a l'API pour rajouter une tache
  // et mettant à jour l'etat todos
  const _addTask = (content) => {
    setError("");
    const res = addTask(content, listID, token);
    if (res === null) {
      setError("Invalid Input");
      return;
    }
    res
      .then((todo) => {
        const newTodos = [...todos, todo];
        setPrevious(newTodos);
        setTodos(newTodos);
        setNbNotDone(nbNotDone + 1);
        return todos;
      })
      .catch((err) => setError(err.message));
  };

  // Fonction faisant appel a l'API pour supprimer une tache
  // et mettant à jour l'etat todos
  const _deleteTask = (id) => {
    return deleteTask(id, token)
      .then(() => {
        const newTodos = [];
        for (let item of todos) {
          if (item.id !== id) {
            newTodos.push(item);
          } else {
            item.done ? setNbDone(nbDone - 1) : setNbNotDone(nbNotDone - 1);
          }
        }
        setTodos(newTodos);
        setCountOfItemsDone(newTodos.filter((item) => item.done).length);
      })
      .catch((err) => setError(err.message));
  };

  useEffect(() => {
    _getTodos().then((data) => setTodos(data));
  }, []);

  useEffect(() => {}, [todos]);

  useEffect(() => {}, [nbDone, nbNotDone]);

  // Fonction faisant appel a l'API pour changer l'etat d'une tache
  // et mettant à jour l'etat todos
  const changeItemDoneValue = (id, done) => {
    return updateTask(id, done, token)
      .then(() => {
        const copyOftodos = todos.map((item) => {
          if (item.id === id) item.done = !item.done;
          return item;
        });
        setTodos(copyOftodos);
        setCountOfItemsDone(copyOftodos.filter((item) => item.done).length);
      })
      .catch((err) => setError(err.message));
  };

  const showCompletedItems = () => {
    const compleTedItems = previous.filter((item) => item.done);
    setTodos(compleTedItems);
  };

  const showNonCompletedItems = () => {
    const compleTedItems = previous.filter((item) => !item.done);
    setTodos(compleTedItems);
  };

  const showAll = () => {
    setTodos(previous);
    setCountOfItemsDone(previous.filter((item) => item.done).length);
  };

  const checkAll = () => {
    let count = todos.filter((todo) => !todo.done).length;
    todos.forEach((item) => {
      if (!item.done) {
        changeItemDoneValue(item.id, true);
      }
    });
    setTodos(todos);
    setCountOfItemsDone(todos.length);
    setNbDone(nbDone + count);
    setNbNotDone(nbNotDone - count);
  };

  const unCheckAll = () => {
    let count = todos.filter((todo) => todo.done).length;
    todos.forEach((item) => {
      if (item.done) {
        changeItemDoneValue(item.id, false);
      }
    });
    setTodos(todos);
    setCountOfItemsDone(0);
    setNbDone(nbDone - count);
    setNbNotDone(nbNotDone + count);
  };

  return (
    <View style={styles.container}>
      <Header />
      <Text
        style={{
          textAlign: "center",
          color: "white",
          marginVertical: 20,
          fontSize: 30,
          fontWeight: 500,
        }}
      >
        Number of tasks done : {countOfItemsDone}
      </Text>
      <Text
        style={{
          color: "red",
          textAlign: "center",
          fontSize: 30,
          fontWeight: 500,
        }}
      >
        {error}
      </Text>
      <View style={styles.body}>
        <Input add={_addTask} />

        <FlatList
          data={todos}
          renderItem={({ item }) => (
            <TodoItem
              item={item}
              changeItemDoneValue={changeItemDoneValue}
              deleteTodo={_deleteTask}
            />
          )}
        />

        <Footer
          showCompletedItems={showCompletedItems}
          showNonCompletedItems={showNonCompletedItems}
          showAll={showAll}
          checkAll={checkAll}
          unCheckAll={unCheckAll}
        />
        <ProgressBarUI
          percentage={
            nbNotDone + nbDone === 0 ? 0 : nbDone / (nbNotDone + nbDone)
          }
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    height: "50%",
  },
  body: {
    flex: 1,
    textAlign: "center",
    padding: 20,
    justifyContent: "center",
    backgroundColor: "#223152",
  },
  bouton: {
    marginVertical: 20,
    marginBottom: 10,
    paddingHorizontal: 8,
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
});
