import React, { useState, useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import { Provider as PaperProvider, Button, RadioButton, Text } from 'react-native-paper';
import Lesson from './components/Lesson';
import { containerCss, buttonCss, radioContainerCss } from './styles/global';

const App = () => {
	const [data, setData] = useState(null);
	const [started, setStarted] = useState(false);
	const [loading, setLoading] = useState(false);
	// main menu states
	const [numQuestions, setNumQuestions] = useState(null);
	const [mode, setMode] = useState(null);
	// api error state
	const [errorApi, setErrorApi] = useState(false);

	useEffect(() => {
		// fetchData()
		setData([
			{
				id: 'word-1-1',
				wordChar: '一',
				wordPinyin: 'yi1',
				wordEng: 'one',
				level: 0,
			},
			{
				id: 'word-1-2',
				wordChar: '二',
				wordPinyin: 'er4',
				wordEng: 'two',
				level: 0,
			},
			{
				id: 'word-1-3',
				wordChar: '三',
				wordPinyin: 'san1',
				wordEng: 'three',
				level: 0,
			},
			{
				id: 'word-1-4',
				wordChar: '四',
				wordPinyin: 'si4',
				wordEng: 'four',
				level: 0,
			},
		]);
        // setTimeout(() => {
        //     setNumQuestions('2');
        //     setMode('CN - ENG');
        //     setStarted(true);
        // }, 300);
	}, []);

	const fetchData = async () => {
		setLoading(true);
		setTimeout(() => {
			setData([
				{
					id: 'word-1-1',
					wordChar: '一',
					wordPinyin: 'yi1',
					wordEng: 'one',
					level: 0,
				},
				{
					id: 'word-1-2',
					wordChar: '二',
					wordPinyin: 'er4',
					wordEng: 'two',
					level: 0,
				},
				{
					id: 'word-1-3',
					wordChar: '三',
					wordPinyin: 'san1',
					wordEng: 'three',
					level: 0,
				},
				{
					id: 'word-1-4',
					wordChar: '四',
					wordPinyin: 'si4',
					wordEng: 'four',
					level: 0,
				},
			]);
			setLoading(false);
		}, 2000);

		// try {
		// 	await fetch('getItemURL', {
		// 		method: 'GET',
		// 	})
		// 		.then((res) => res.json())
		// 		.then((res) => {
		// 			setLoading(false);
		// 			console.log('data', res);
		// 			setData(res);
		// 		});
		// } catch (er) {
		// 	setLoading(false);
		// 	console.error('er', er);
		// }
	};

	const postData = async () => {
		try {
			fetch('postItemURL', {
				method: 'POST',
				body: JSON.stringify({
					level: 0,
					wordChar: '我',
					id: 'word-1-11',
					wordPinyin: 'wo3',
					wordEng: 'I',
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

	const updateItem = async () => {
		try {
			fetch('updateItemURL', {
				method: 'POST',
				body: JSON.stringify({
					level: 12,
					wordChar: '一',
					id: 'word-1-test',
					wordPinyin: 'yu1',
					wordEng: 'one',
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

	return (
		<PaperProvider>
			<View style={styles.container}>
				{started ? (
					<Lesson
						data={data}
						numQuestions={numQuestions}
						mode={mode}
						setStarted={setStarted}
					/>
				) : (
					<View>
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
							onPress={postData}>
							Post the data
						</Button>

						<Button
							mode='contained'
							loading={loading}
							style={styles.buttonDefault}
							onPress={updateItem}>
							Post the data
						</Button>

						{data && data.length ? (
                            <View style={styles.radioContainer}>
                                <RadioButton.Group onValueChange={(v) => setNumQuestions(v)} value={numQuestions}>
                                    <Text>Select number of questions</Text>
                                    <View>
                                        <Text>10</Text>
                                        <RadioButton value={10} />
                                    </View>
                                    <View>
                                        <Text>20</Text>
                                        <RadioButton value={20}/>
                                    </View>
                                    <View>
                                        <Text>30</Text>
                                        <RadioButton value={30}/>
                                    </View>
                                    <View>
                                        <Text>{data.length / 2}</Text>
                                        <RadioButton value={data.length / 2} />
                                    </View>
                                    <View>
                                        <Text>{data.length}</Text>
                                        <RadioButton value={data.length} />
                                    </View>
                                </RadioButton.Group>


                                <RadioButton.Group onValueChange={(v) => setMode(v)} value={mode}>
                                    <Text>Mode</Text>
                                    <View>
                                        <Text>CN - ENG</Text>
                                        <RadioButton value={'CN - ENG'} />
                                    </View>
                                    <View>
                                        <Text>ENG - CN</Text>
                                        <RadioButton value={'ENG - CN'}/>
                                    </View>
                                    <View>
                                        <Text>CN - ENG MP Choice</Text>
                                        <RadioButton value={'CN - ENG MP Choice'}/>
                                    </View>
                                    <View>
                                        <Text>ENG - CN MP Choice</Text>
                                        <RadioButton value={'ENG - CN MP Choice'} />
                                    </View>
                                    <View>
                                        <Text>Random</Text>
                                        <RadioButton value={'Random'} />
                                    </View>
                                </RadioButton.Group>
							</View>
						) : null}

						<Button
							mode='contained'
							style={
								!numQuestions && !mode
									? styles.buttonDisabled
									: styles.buttonDefault
							}
							onPress={startGame}
                            disabled={!numQuestions & !mode}>
							Start
						</Button>
					</View>
				)}
			</View>
		</PaperProvider>
	);
}

const styles = StyleSheet.create({
	container: {
		...containerCss,
	},
    radioContainer: {
        ...radioContainerCss,
    },
	buttonDefault: {
		...buttonCss.default,
	},
	buttonDisabled: {
		...buttonCss.disabled,
	},
});


export default App;