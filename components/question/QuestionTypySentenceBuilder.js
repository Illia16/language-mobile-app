import React from 'react';
import { View, Pressable } from 'react-native';
import { Text, Button } from 'react-native-paper';

const QuestionTypySentenceBuilder = ({ setUserAnswer, userAnswer, currentQuestion }) => {
	return (
		<View>
			<Text>Answer:{userAnswer}</Text>
			{currentQuestion.splitted?.map((letter, i) => {
				return (
					<View>
						<Pressable onPress={() => setUserAnswer((prev) => (prev ? prev + letter : letter))}>
							<Text>{letter}</Text>
						</Pressable>
					</View>
				);
			})}
			<Button onPress={() => setUserAnswer('')}>Clear</Button>
		</View>
	);
};

export default QuestionTypySentenceBuilder;
