import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, TouchableOpacity, Pressable } from "react-native";
import Lesson from './components/Lesson';

export default function App() {
    const [data, setData] = useState(null);
    const [started, setStarted] = useState(false);
    const [loading, setLoading] = useState(false);
    // main menu states
    const [numQuestions, setNumQuestions] = useState(null);
    const [mode, setMode] = useState(null);
    // api error state
    const [errorApi, setErrorApi] = useState(false);


    useEffect(()=>{
        // fetchData()
        setData(
            [
                { "id": "word-1-1", "wordChar": "一", "wordPinyin": "yi1", "wordEng": "one", "level": 0},
                { "id": "word-1-2", "wordChar": "二", "wordPinyin": "er4", "wordEng": "two", "level": 0},
                { "id": "word-1-3", "wordChar": "三", "wordPinyin": "san1", "wordEng": "three", "level": 0},
                { "id": "word-1-4", "wordChar": "四", "wordPinyin": "si4", "wordEng": "four", "level": 0},
            ]
            )
    },[])

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
          body: JSON.stringify({level: 0, wordChar: '我', id: 'word-1-11', wordPinyin: 'wo3', wordEng: 'I' })
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

  const startGame = () => {
      setStarted(true);
  };

  return (
    <View style={styles.container}>
        { started ?
            <Lesson data={data} numQuestions={numQuestions} mode={mode} setStarted={setStarted} />
            :
            <View>
                <TouchableOpacity onPress={fetchData} style={{ backgroundColor: "blue", marginTop: 10 }}>
                    <Text style={{ fontSize: 20, color: "#fff", padding: 10 }}>Get the data</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={postData} style={{ backgroundColor: "blue", marginTop: 10 }}>
                    <Text style={{ fontSize: 20, color: "#fff", padding: 10 }}>Post the data</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={updateItem} style={{ backgroundColor: "blue", marginTop: 10 }}>
                    <Text style={{ fontSize: 20, color: "#fff", padding: 10 }}>Update item</Text>
                </TouchableOpacity>

                {data && data.length ?
                    <div>
                        <label>
                            <select id="numQuestions" onChange={(e)=>setNumQuestions(Number(e.target.value))}>
                                <option value=''>Questions number</option>
                                <option value={10}>10</option>
                                <option value={20}>20</option>
                                <option value={30}>30</option>
                                <option value={data.length/2}>{data.length/2}</option>
                                <option value={data.length}>{data.length}</option>
                            </select>
                        </label>

                        <label>
                            <select id="mode" onChange={(e)=>setMode(e.target.value)}>
                                <option value=''>Training mode</option>
                                <option value={'CN - ENG'}>CN - ENG</option>
                                <option value={'ENG - CN'}>ENG - CN</option>
                                <option value={'CN - ENG MP Choice'}>CN - ENG MP Choice</option>
                                <option value={'ENG - CN MP Choice'}>ENG - CN MP Choice</option>
                                <option value={'Random'}>Random</option>
                            </select>
                        </label>
                    </div>
                : null}

                <Pressable onPress={startGame} style={!numQuestions && !mode ? btnStyles.disabled : btnStyles.default } disabled={!numQuestions && !mode}>
                    <Text style={{ fontSize: 20, color: "#fff", padding: 10 }}>Start</Text>
                </Pressable>
            </View>
        }
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

const btnStyles = StyleSheet.create({
    default: {
        backgroundColor: "blue",
        marginTop: 10
    },
    disabled: {
        backgroundColor: "grey",
        marginTop: 10
    }
});