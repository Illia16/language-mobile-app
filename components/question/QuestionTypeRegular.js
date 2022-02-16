import React from 'react';
import { StyleSheet } from 'react-native';
import { TextInput } from 'react-native-paper';

const QuestionTypeRegular = ({ currentQuestionAnswered, userAnswer, setUserAnswer }) => {
	return (
		<TextInput
			style={currentQuestionAnswered ? textInput.disabled : textInput.default}
			editable={!currentQuestionAnswered}
			placeholder='enter here'
			value={userAnswer}
			onChangeText={setUserAnswer}
		/>
	);
};

export default QuestionTypeRegular;


const textInput = StyleSheet.create({
	default: {
		fontSize: 20,
		color: 'black',
		borderColor: 'black',
		borderWidth: 1,
		padding: 10,
	},
	disabled: {
		fontSize: 20,
		color: 'black',
		borderColor: 'black',
		borderWidth: 1,
		padding: 10,
		opacity: 0.3,
	},
});
