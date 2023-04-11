import React from "react";
import { Text, View } from "react-native";
import { MD3Colors, ProgressBar } from "react-native-paper";

// Composant representant la barre de progression

export default function ProgressBarUI({ percentage }) {
  return (
    <View>
      <View>
        <Text style={{ color:"white", marginVertical: 20, fontSize: 30, fontWeight: 500}}>Progression : {Math.floor(percentage * 100)}%</Text>
      </View>
      <ProgressBar
        style={{ height: 20, borderRadius: 10 }}
        progress={percentage}
        color={MD3Colors.error50}
      />
    </View>
  );
}
