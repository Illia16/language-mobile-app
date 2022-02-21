import React from 'react';
import { StyleSheet, View } from 'react-native';
import { RadioButton, Text } from 'react-native-paper';

const RadioButtons = ({
	handleMode,
	mode,
	setNumQuestions,
	numQuestions,
	filteredData,
}) => {
	const modes = [
		{ name: 'Word - Translation', value: 'wordTranslation' },
		{ name: 'Translation - Word', value: 'translationWord' },
		{ name: 'Word - Translation Multiple Choice', value: 'wordTranslationMPChoice' },
		{ name: 'Translation - Word Multiple Choice', value: 'translationWordMPChoice' },
		{
			name: 'Sentence Builder: Word - Translation',
			value: 'sentenceWordTranslation',
		},
		{
			name: 'Sentence Builder: Translation - Word',
			value: 'sentenceTranslationWord',
		},
		{ name: 'Random', value: 'random' },
	];

	const numberOfQ = [
		filteredData.length >= 10 && 10,
		filteredData.length >= 20 && 20,
		filteredData.length >= 30 && 30,
		Math.round(filteredData.length / 2),
		filteredData.length,
	].filter(el=>el);

	return (
		<View style={styles.radioContainer}>
			<View style={styles.radioSubContainer}>
				<RadioButton.Group onValueChange={handleMode} value={mode}>
					<Text style={styles.itemsCenter}>Mode</Text>
					{modes.map((item, i) => {
						return (
							<View key={`${i}-${item.value}`} style={styles.itemsCenter}>
								<Text>{item.name}</Text>
								<RadioButton value={item.value} />
							</View>
						);
					})}
				</RadioButton.Group>
			</View>

			<View style={styles.radioSubContainer}>
				<RadioButton.Group onValueChange={setNumQuestions} value={numQuestions}>
					<Text style={styles.itemsCenter}>Select number of questions</Text>
                    {numberOfQ.map((number, i) => {
						return (
							<View key={`${i}-${number}`} style={styles.itemsCenter}>
								<Text>{number}</Text>
								<RadioButton value={number} />
							</View>
						);
					})}
				</RadioButton.Group>
			</View>
		</View>
	);
};

export default RadioButtons;

const styles = StyleSheet.create({
	radioContainer: {
		display: 'flex',
		flexDirection: 'row',
		width: '75%',
        marginTop: 25,
        marginBottom: 25,
	},
	radioSubContainer: {
		width: '50%',
		alignItems: 'center',
	},
	itemsCenter: {
		alignItems: 'center',
		textAlign: 'center',
	},
});
