import { View, Text, StyleSheet, Button, SafeAreaView } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import {
  selectShuls,
  fetchShuls,
  fetchMinyanim,
  selectMinyanim,
  reset,
} from "../redux/minyanSlice";
import AsyncStorage from "@react-native-async-storage/async-storage";

const HomeScreen = () => {
  // shuls is an array of objects with id, name, location, zip
  const shuls = useSelector(selectShuls);
  const minyanim = useSelector(selectMinyanim);
  const dispatch = useDispatch();

  const handleGetShuls = () => {
    dispatch(fetchShuls());
    console.log(shuls);
  };

  const handleGetMinyanim = () => {
    console.log(minyanim)
    dispatch(fetchMinyanim());
  };

  const clearStorage = async () => {
    AsyncStorage.clear();
    reset();
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text>ZmanimNow</Text>
      </View>
      <View style={styles.shulList}>
        <Text style={{ textAlign: "center" }}>Shul List</Text>
        {shuls.map((obj) => (
          <Text key={obj.id}>{obj.name}</Text>
        ))}
      </View>
      <View style={styles.fetchShulButton}>
        <Button title="Fetch Shuls" onPress={handleGetShuls} />
        <Button title="Fetch Minyanim" onPress={handleGetMinyanim} />
        <Button title="Clear Storage" onPress={clearStorage} />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 50,
  },
  header: {
    flex: 1,
  },
  shulList: {
    flex: 4,
  },
  fetchShulButton: {
    flex: 3,
  },
});

export default HomeScreen;
