import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Text } from 'react-native-paper';
import { isCorrect } from '../../helpers/helpers.js';

const QuestionMsgCorrectOrIncorrect = ({ currentQuestionAnswered, currentQuestion, userAnswer }) => {
	return (
		<View style={{minHeight: 50, marginBottom: 20}}>
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
        textAlign: 'center',
	},
	incorrect: {
		fontSize: 20,
		color: 'red',
        textAlign: 'center',
	},
});
