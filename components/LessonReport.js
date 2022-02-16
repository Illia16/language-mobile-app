import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, Text, List } from 'react-native-paper';

const LessonReport = ({ report, setStarted }) => {
	return (
		<List.Section>
			<List.Subheader>Results:</List.Subheader>
			<View>
				{report.map((item) => {
					return (
						<View>
							<Text
								style={
									item.isCorrect
										? reportStyles.correct
										: reportStyles.incorrect
								}>
								Question: {item.question}
							</Text>
							<Text
								style={
									item.isCorrect
										? reportStyles.correct
										: reportStyles.incorrect
								}>
								My answer: {item.userAnswer}
							</Text>
							<Text
								style={
									item.isCorrect
										? reportStyles.correct
										: reportStyles.incorrect
								}>
								Correct answer: {item.correctAnswer}
							</Text>
						</View>
					);
				})}
			</View>

			<Button onPress={() => setStarted(false)} style={btnStyles.default}>
				<Text>Back to menu</Text>
			</Button>
		</List.Section>
	);
};

export default LessonReport;

const reportStyles = StyleSheet.create({
	correct: {
		color: 'green',
		padding: 20,
	},
	incorrect: {
		color: 'red',
		padding: 20,
	},
});

const btnStyles = StyleSheet.create({
	default: {
		backgroundColor: 'blue',
		marginTop: 10,
	},
	disabled: {
		backgroundColor: 'grey',
		marginTop: 10,
	},
});
