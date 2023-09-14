import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import firestore from "@react-native-firebase/firestore";
import { useEffect, useState } from "react";

export default function App() {
  doc = firestore().collection("shuls").doc("9IRJbPeBfeJK9H0N9n1A");
  const [name, setName] = useState("Loading...");
  const [location, setLocation] = useState("Loading...");

  useEffect(() => {
    doc
      .get()
      .then((docSnapshot) => {
        if (docSnapshot.exists) {
          data = docSnapshot.data();
          setName(data["name"]);
          setLocation(data["location"]);
        } else {
          setName("No document");
        }
      })
      .catch((e) => {
        console.warn(e);
        setName("Failed");
      });
  }, []);

  return (
    <View style={styles.container}>
      <Text>ZmanimNow</Text>
      <Text>{name}</Text>
      <Text>{location}</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
