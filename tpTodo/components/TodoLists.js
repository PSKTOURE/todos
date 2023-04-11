import { MaterialIcons } from "@expo/vector-icons";
import { useContext, useEffect, useState } from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native-web";
import {
  deleteTaskList,
  getAllTask,
  getTaskLists,
  input,
} from "../API/todoAPI";
import {
  NbDoneContext,
  NbNotDoneContext,
  TokenContext,
  UsernameContext,
} from "../Context/Context";
import Input from "./UI/Input";
import ProgressBarUI from "./UI/ProgressBarUI";

/**
 * Composant representant la liste des TodoLists
 */

export default function TodoLists({ navigation }) {
  // etat representant le nombre de taches achevées pour l'ensemble des taskLists
  const [nbDone, setNbDone] = useContext(NbDoneContext);

  // etat representant le nombre de taches non achevées pour l'ensemble des taskLists
  const [nbNotDone, setNbNotDone] = useContext(NbNotDoneContext);

  // etat representant le rapport nbDone / (nbDone + nbNotDone)
  const [percentage, setPercentage] = useState(null);

  // etat representant la liste contenant les todoLists
  const [list, setList] = useState(null);

  // etat representant la liste contenant les todos(taks)
  const [tasks, setTasks] = useState(null);
  const [error, setError] = useState("");

  // variable pour le message de feedback
  const [feedBack, setFeedBack] = useState("");

  // variable de contexte
  const [username, setUsername] = useContext(UsernameContext);
  const [token, setToken] = useContext(TokenContext);

  /** fonction pour recuperer l'ensemble des taksLists
      fait appel a l'API et set l'etat list au résultat
      recuperer 
  */
  const _getTaskLists = () => {
    setError("");
    return getTaskLists(username, token)
      .then((taskLists) => {
        setList(taskLists);
        return taskLists;
      })
      .catch((err) => {
        setError(err.message);
      });
  };

  /** fonction pour recuperer l'ensemble des tasks
      fait appel a l'API et set l'etat tasks au résultat
      recuperer 
  */
  const _getAllTask = () => {
    setError("");
    return getAllTask(token, username)
      .then((tasks) => {
        setTasks(tasks);
        return tasks;
      })
      .then((tasks) => {
        setNbDone(tasks.filter((task) => task.done).length);
        return tasks;
      })
      .then((tasks) => {
        setNbNotDone(tasks.filter((task) => !task.done).length);
      })
      .then(() => computePercentage())
      .catch((err) => setError(err.message));
  };

  // fontion pour calculer le rapport nbDone / (nbDone + nbNotDone)
  const computePercentage = () => {
    nbDone + nbNotDone === 0
      ? setPercentage(0)
      : setPercentage(nbDone / (nbDone + nbNotDone));
  };

  useEffect(() => {
    _getAllTask();
  }, [nbDone, nbNotDone, list]);

  useEffect(() => {
    _getTaskLists();
    _getAllTask();
  }, []);

  // helper fonction rajoutant une taklist à la liste de tasklists et mettant à jour l'etat
  const _addTaskList = (newTaskList) => {
    const newList = [...list, newTaskList];
    setList(newList);
    return list;
  };

  // Fonction faisant la requete d'ajout a l'API
  const addTaskList = (text) => {
    setFeedBack("");
    const res = input(text, username, token);
    if (res === null) {
      setFeedBack("Enter Valid Input");
      return;
    }
    res
      .then((newTaskList) => {
        if (newTaskList.title !== "") _addTaskList(newTaskList);
      })
      .catch((err) => {
        setError(err.message);
      });
  };

  // Fonction faisant la requete à l'API afin de supprimer une takslist
  // Supprime au meme moment les taches contenu dans la takslist s'il en existe.
  const _deleteTaskList = (id) => {
    return deleteTaskList(id, token)
      .then(() => {
        const newList = list.filter((item) => item.id !== id);
        setList(newList);
      })
      .catch((err) => setError(err.message));
  };

  return (
    <View style={styles.body}>
      <View>
        <Text
          style={{
            color: "red",
            textAlign: "center",
            fontSize: 30,
            fontWeight: 500,
          }}
        >
          {feedBack}
        </Text>
      </View>
      <View>
        <Input add={addTaskList} />
      </View>
      <FlatList
        data={list}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() =>
              navigation.navigate("TodoListDetailScreen", {
                id: item.id,
              })
            }
          >
            <View style={styles.todoContent}>
              <View style={styles.flexSwitchText}>
                <Text style={styles.itemText}>{item.title}</Text>
              </View>
              <TouchableOpacity onPress={() => _deleteTaskList(item.id)}>
                <MaterialIcons name="delete" size={35} color="#223152" />
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        )}
      />
      <View>
        <ProgressBarUI percentage={percentage} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  content: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "#0080F6",
    padding: 16,
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 40,
  },

  images: {
    marginLeft: 16,
    padding: 5,
    flexDirection: "row",
    backgroundColor: "yellowgreen",
    borderRadius: 60,
  },
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
  body: {
    flex: 1,
    textAlign: "center",
    padding: 20,
    justifyContent: "center",
    backgroundColor: "#223152",
  },
});
