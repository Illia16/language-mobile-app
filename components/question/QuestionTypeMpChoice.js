import React from 'react';
import { View } from 'react-native';
import { Text, RadioButton } from 'react-native-paper';

const QuestionTypeMpChoice = ({ setUserAnswer, userAnswer, currentQuestion, currentQuestionAnswered }) => {
	return (
		<RadioButton.Group
			onValueChange={(newVal) => setUserAnswer(newVal)}
			value={userAnswer}>
			{currentQuestion.all.map((item, i) => {
				return (
					<View key={`${i}-${item}`}>
						<Text>{item}</Text>
						<RadioButton value={item} disabled={currentQuestionAnswered} />
					</View>
				);
			})}
		</RadioButton.Group>
	);
};

export default QuestionTypeMpChoice;
