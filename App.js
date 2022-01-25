import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";

export default function App() {
  const fetchData = async () => {

    try {
      await fetch("URL", {
        method: "GET",
        headers: {
                "x-api-key": 'KEY',
        }
      })
        .then((res) => res.json())
        .then((data) => {
          console.log('data',data);
        });
    } catch (er) {
      console.error('er', er);
    }
  };

  return (
    <View style={styles.container}>
      <Text>Hi there! 25 Jan</Text>
      <StatusBar style="auto" />

      <TouchableOpacity onPress={fetchData} style={{ backgroundColor: "blue" }}>
        <Text style={{ fontSize: 20, color: "#fff" }}>Fetch the data</Text>
      </TouchableOpacity>
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
