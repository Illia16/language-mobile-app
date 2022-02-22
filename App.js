import React, { useState, useEffect } from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import { DefaultTheme, Provider as PaperProvider, Button, TextInput, Modal, Portal, Text } from 'react-native-paper';

// Components
import PostItem from './components/mainMenu/PostItem';
import RadioButtons from './components/mainMenu/RadioButtons';
import Lesson from './components/Lesson';
import { sentenceBuilderArr } from './helpers/helpers.js';
// styles
import { containerCss, buttonCss } from './styles/global';


const App = () => {
    // auth
	const [userPW, setUserPW] = useState('');
	const [authorized, setAuthorized] = useState(true);
    // data
	const [data, setData] = useState(null);
	const [filteredData, setFilteredData] = useState(null);

    // logic
	const [started, setStarted] = useState(false);
	const [loading, setLoading] = useState(false);
	// main menu states
	const [numQuestions, setNumQuestions] = useState(null);
	const [mode, setMode] = useState(null);
	// api error state
	const [errorApi, setErrorApi] = useState(false);

    // post item
    const [post, setPost] = useState({visible: false, item: {id: '', word: '', translation: '', transcription: '', isSentense: false}});

	// useEffect(() => {
	// 	// fetchData()
	// 	setData([
    //         {
    //             id: '1-11',
    //             level: 0,
    //             wordData: {
    //                 word: '我',
    //                 translation: 'I',
    //                 transcription: 'wo3'
    //             },
    //             isSentense: false
    //         },
    //         {
    //             id: '1-1',
    //             level: 0,
    //             wordData: {
    //                 word: '一',
    //                 translation: 'one',
    //                 transcription: 'yi1'
    //             },
    //             isSentense: false
    //         },
    //         {
    //             id: '1-2',
    //             level: 0,
    //             wordData: {
    //                 word: '二',
    //                 translation: 'two',
    //                 transcription: 'er4'
    //             },
    //             isSentense: false
    //         },
    //         {
    //             id: '1-3',
    //             level: 0,
    //             wordData: {
    //                 word: '你好',
    //                 translation: 'Hello',
    //                 transcription: ' ni3hao3'
    //             },
    //             isSentense: true
    //         },
    //         {
    //             id: '1-4',
    //             level: 0,
    //             wordData: {
    //                 word: '你叫什么?',
    //                 translation: 'What is your name?',
    //                 transcription: 'ni3 jiao4 shen me?'
    //             },
    //             isSentense: true
    //         },
	// 	]);
    //     setFilteredData([
    //         {
    //             id: '1-11',
    //             level: 0,
    //             wordData: {
    //                 word: '我',
    //                 translation: 'I',
    //                 transcription: 'wo3'
    //             },
    //             isSentense: false
    //         },
    //         {
    //             id: '1-1',
    //             level: 0,
    //             wordData: {
    //                 word: '一',
    //                 translation: 'one',
    //                 transcription: 'yi1'
    //             },
    //             isSentense: false
    //         },
    //         {
    //             id: '1-2',
    //             level: 0,
    //             wordData: {
    //                 word: '二',
    //                 translation: 'two',
    //                 transcription: 'er4'
    //             },
    //             isSentense: false
    //         },
    //         {
    //             id: '1-3',
    //             level: 0,
    //             wordData: {
    //                 word: '你好',
    //                 translation: 'Hello',
    //                 transcription: ' ni3hao3'
    //             },
    //             isSentense: true
    //         },
    //         {
    //             id: '1-4',
    //             level: 0,
    //             wordData: {
    //                 word: '你叫什么?',
    //                 translation: 'What is your name?',
    //                 transcription: 'ni3 jiao4 shen me?'
    //             },
    //             isSentense: true
    //         },
	// 	]);

    //     // usefull for styling quetions, remove later
    //     // setTimeout(() => {
    //     //     setNumQuestions('3');
    //     //     setMode('sentenceWordTranslation');
    //     //     setStarted(true);
    //     // }, 300);
	// }, []);

    const auth = async () => {
		try {
			fetch('auth', {
				method: 'POST',
				body: JSON.stringify({user: userPW}),
			})
				.then((res) => res.json())
				.then((data) => {
					console.log('data from auth', data);
                    setAuthorized(true);
                    setData(data);
                    setFilteredData(data);
				});
		} catch (er) {
			console.error(er);
		}
	};

	const fetchData = async () => {
		setLoading(true);

		try {
			await fetch('getItemAPI', {
				method: 'GET',
			})
				.then((res) => res.json())
				.then((res) => {
					setLoading(false);
					console.log('data', res);
					setData(res);
				});
		} catch (er) {
			setLoading(false);
			console.error('er', er);
		}
	};

	const updateItem = async () => {
		try {
			fetch('updateItemAPI', {
				method: 'POST',
				body: JSON.stringify({
                    id: '1-11-test',
					level: 2,
					wordData: {
                        word: '我',
                        translation: 'I',
                        transcription: 'wo3'
                    },
                    isSentense: false
				}),
			})
				.then((res) => res.json())
				.then((data) => {
					console.log('data from post', data);
				});
		} catch (er) {
			console.error(er);
		}
	};

	const startGame = () => {
		setStarted(true);
	};

    const handleMode = (mode) => {
        if (mode === 'sentenceWordTranslation' || mode === 'sentenceTranslationWord') {
            setMode(mode);
            setFilteredData(sentenceBuilderArr(data))
        } else {
            setMode(mode);
            setFilteredData(data);
        }
    }

    const theme = {
        ...DefaultTheme,
        roundness: 2,
        colors: {
            ...DefaultTheme.colors,
            primary: '#1a203a',
            accent: '#1a203a',
            background: '#f9f4f2',
            text: '#1a203a',
            textBtn: '#ffffff',
            disabled: 'grey'
        },
        container: {
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#f9f4f2',
            paddingTop: 50,
            paddingBottom: 50,
        },
        center: {
            alignItems: 'center',
        }
    }

	return (
		<PaperProvider theme={theme}>
            <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                <View style={{...theme.container}}>
                    {started ? (
                        <Lesson
                            data={filteredData}
                            numQuestions={numQuestions}
                            mode={mode}
                            setStarted={setStarted}
                        />
                    ) : (authorized && data && data.length ?
                        <View style={{...theme.center}}>
                            <Button
                                mode='contained'
                                loading={loading}
                                style={styles.buttonDefault}
                                onPress={fetchData}>
                                Get the data
                            </Button>

                            <Button
                                mode='contained'
                                loading={loading}
                                style={styles.buttonDefault}
                                onPress={() => setPost({...post, visible: true})}>
                                Post the data
                            </Button>

                            <Button
                                mode='contained'
                                loading={loading}
                                style={styles.buttonDefault}
                                onPress={updateItem}>
                                Update data
                            </Button>

                            {filteredData && filteredData.length && (
                                <RadioButtons
                                    handleMode={handleMode}
                                    mode={mode}
                                    setNumQuestions={setNumQuestions}
                                    numQuestions={numQuestions}
                                    filteredData={filteredData}
                                />
                            )}

                            <Button
                                mode='contained'
                                style={
                                    !numQuestions || !mode
                                        ? styles.buttonDisabled
                                        : styles.buttonDefault
                                }
                                onPress={startGame}
                                disabled={!numQuestions || !mode}>
                                Start
                            </Button>


                            <PostItem post={post} setPost={setPost} />
                        </View>
                        : (
                            <View style={{flex: 1, justifyContent:'center', maxHeight: 75, width: 150, ...theme.center}}>
                                <Button
                                    mode='contained'
                                    loading={loading}
                                    style={styles.buttonDefault}
                                    onPress={auth}
                                >
                                    Auth
                                </Button>
                                <TextInput
                                    style={{maxHeight: 75, width: 150, textAlign: 'center', marginTop: 20}}
                                    placeholder='enter pw here'
                                    value={userPW}
                                    onChangeText={setUserPW}
                                />
                            </View>
                        )
                    )}
                </View>
            </ScrollView>
		</PaperProvider>
	);
}

const styles = StyleSheet.create({
	container: {
		...containerCss,
	},
	buttonDefault: {
		...buttonCss.default,
	},
	buttonDisabled: {
		...buttonCss.disabled,
	},
});


export default App;