import {
  AntDesign, Feather, FontAwesome5, MaterialIcons
} from "@expo/vector-icons";
import { StyleSheet, TouchableOpacity, View } from "react-native";

/**
 * Composant contenant les bouttons showAll, showCompleted, showNonCompleted, checkAll, uncheckAll  
 */

export default function Footer({
  showAll,
  showCompletedItems,
  showNonCompletedItems,
  checkAll,
  unCheckAll,
}) {
  return (
    <View style={styles.groupBouton}>
      <TouchableOpacity style={styles.singleIcon} onPress={showAll}>
        <FontAwesome5 name="list-ol" size={24} color="#223152" />
      </TouchableOpacity>
      <TouchableOpacity style={styles.singleIcon} onPress={showCompletedItems}>
        <Feather name="check-square" size={24} color="#223152" />
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.singleIcon}
        onPress={showNonCompletedItems}
      >
        <AntDesign name="closesquareo" size={24} color="#223152" />
      </TouchableOpacity>
      <TouchableOpacity style={styles.singleIcon} onPress={checkAll}>
        <MaterialIcons name="done-all" size={24} color="#223152" />
      </TouchableOpacity>
      <TouchableOpacity style={styles.singleIcon} onPress={unCheckAll}>
        <MaterialIcons name="remove-done" size={24} color="#223152" />
      </TouchableOpacity>
    </View>
  );
}
const styles = StyleSheet.create({
  groupBouton: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  singleIcon: {
    backgroundColor: "white",
    padding: 12,
    borderRadius: 12,
  },
});
