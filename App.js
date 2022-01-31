import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";

export default function App() {
  const fetchData = async () => {

    try {
      await fetch("getUrl", {
        method: "GET",
      })
        .then((res) => res.json())
        .then((data) => {
          console.log('data',data);
        });
    } catch (er) {
      console.error('er', er);
    }
  };


  const postData = async () => {
    try {
        fetch("postURL", {
          method: 'POST',
          body: JSON.stringify({level: 5, wordChar: '一', id: 'word-1-test', wordPinyin: 'yi1', wordEng: 'one' })
        })
        .then(res => res.json())
        .then(data => {
          console.log('data from post',data);
        })
      } catch (er) {
        console.error(er);
      }
  };

  return (
    <View style={styles.container}>
      <Text>Hi there! Originally creted on: 25 Jan</Text>
      <StatusBar style="auto" />

      <TouchableOpacity onPress={fetchData} style={{ backgroundColor: "blue", marginTop: 10 }}>
        <Text style={{ fontSize: 20, color: "#fff", padding: 10 }}>Get the data</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={postData} style={{ backgroundColor: "blue", marginTop: 10 }}>
        <Text style={{ fontSize: 20, color: "#fff", padding: 10 }}>Post the data</Text>
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
