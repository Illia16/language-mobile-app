import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Text } from 'react-native-paper';
import { isCorrect } from '../../helpers/helpers.js';

const QuestionMsgCorrectOrIncorrect = ({ currentQuestionAnswered, currentQuestion, userAnswer }) => {
	return (
		<View>
			{currentQuestionAnswered && (
				<Text
					style={
						isCorrect(currentQuestion, userAnswer)
							? answeredQ.correct
							: answeredQ.incorrect
					}>
					{isCorrect(currentQuestion, userAnswer)
						? 'Correct!'
						: `Incorrect, correct answer is: ${currentQuestion.qAnswer}`}
				</Text>
			)}
		</View>
	);
};

export default QuestionMsgCorrectOrIncorrect;

const answeredQ = StyleSheet.create({
	correct: {
		fontSize: 20,
		color: 'green',
		padding: 10,
	},
	incorrect: {
		fontSize: 20,
		color: 'red',
		padding: 10,
	},
});
