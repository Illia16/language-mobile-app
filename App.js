import React, { useState } from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, TouchableOpacity, FlatList } from "react-native";

export default function App() {
    const [data, setData] = useState(null);

  const fetchData = async () => {
    try {
      await fetch("getItemURL", {
        method: "GET",
      })
        .then((res) => res.json())
        .then((res) => {
          console.log('data',res);
          setData(res);
        });
    } catch (er) {
      console.error('er', er);
    }
  };


  const postData = async () => {
    try {
        fetch("postItemURL", {
          method: 'POST',
          body: JSON.stringify({level: 7, wordChar: '一', id: 'word-1-test', wordPinyin: 'test1!!!!', wordEng: 'one' })
        })
        .then(res => res.json())
        .then(data => {
          console.log('data from post',data);
        })
      } catch (er) {
        console.error(er);
      }
  };

  const updateItem = async () => {
    try {
        fetch("updateItemURL", {
          method: 'POST',
          body: JSON.stringify({level: 12, wordChar: '一', id: 'word-1-test', wordPinyin: 'yu1', wordEng: 'one' })
        })
        .then(res => res.json())
        .then(data => {
          console.log('data from post',data);
        })
      } catch (er) {
        console.error(er);
      }
  };

  const renderItem = ({ item }) => {
    return (
        <Text>
            <Text style={{margin: 20}}>{item.wordChar}</Text>
            <Text style={{margin: 20}}>{item.wordEng}</Text>
            <Text style={{margin: 20}}>{item.wordPinyin}</Text>
        </Text>
    );
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

      <TouchableOpacity onPress={updateItem} style={{ backgroundColor: "blue", marginTop: 10 }}>
        <Text style={{ fontSize: 20, color: "#fff", padding: 10 }}>Update item</Text>
      </TouchableOpacity>

        <FlatList
            style={{marginTop: 40}}
            data={data}
            renderItem={renderItem}
            keyExtractor={item => item.id}
        />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 25,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
