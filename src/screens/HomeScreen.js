import { View, Text, StyleSheet, Button, SafeAreaView } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { selectShuls, fetchShuls } from "../redux/minyanSlice";

const HomeScreen = () => {
  // shuls is an array of objects with id, name, location, zip
  const shuls = useSelector(selectShuls);
  const dispatch = useDispatch();

  const handleGetShuls = () => {
    dispatch(fetchShuls());
    console.log(shuls);
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
