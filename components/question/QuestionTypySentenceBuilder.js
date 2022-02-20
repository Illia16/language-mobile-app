import React from 'react';
import { View, Pressable } from 'react-native';
import { Text, Button } from 'react-native-paper';

const QuestionTypySentenceBuilder = ({ setUserAnswer, userAnswer, currentQuestion, currentQuestionAnswered }) => {
	return (
		<View>
			<Text>Answer:{userAnswer}</Text>
			{currentQuestion.splitted?.map((letter, i) => {
				return (
					<View key={`${i}-${letter}`}>
						<Pressable onPress={() => setUserAnswer((prev) => (prev ? prev + letter : letter))} disabled={currentQuestionAnswered}>
							<Text>{letter}</Text>
						</Pressable>
					</View>
				);
			})}
			<Button onPress={() => setUserAnswer('')} disabled={currentQuestionAnswered}>Clear</Button>
		</View>
	);
};

export default QuestionTypySentenceBuilder;
