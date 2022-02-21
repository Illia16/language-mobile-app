import React from 'react';
import { View, Pressable, StyleSheet } from 'react-native';
import { Text, Button, useTheme} from 'react-native-paper';

const QuestionTypySentenceBuilder = ({ setUserAnswer, userAnswer, currentQuestion, currentQuestionAnswered }) => {
    const { colors } = useTheme();

	return (
		<View>
			<Text style={styles.userAnswer}>Answer:{userAnswer}</Text>
            <Button onPress={() => setUserAnswer('')} disabled={currentQuestionAnswered} style={styles.clearBtn}>Clear</Button>
            <View style={styles.answerBtnContainer}>
                {currentQuestion.splitted?.map((letter, i) => {
                    return (
                        <View key={`${i}-${letter}`}>
                            <Pressable onPress={() => setUserAnswer((prev) => (prev ? prev + letter : letter))} disabled={currentQuestionAnswered} style={styles.answerBtn}>
                                <Text style={{color: colors.textBtn, ...styles.answerBtnInner}}>{letter}</Text>
                            </Pressable>
                        </View>
                    );
                })}
            </View>
		</View>
	);
};

export default QuestionTypySentenceBuilder;

const styles = StyleSheet.create({
    userAnswer: {
        fontSize: 20,
        textAlign: 'center',
    },
    answerBtnContainer: {
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'center',
    },
	answerBtn: {
        width: 50,
        height: 50,
        backgroundColor: '#1a203a',
        margin: 5,
        alignItems: 'center',
        justifyContent: 'center',
	},
    answerBtnInner: {
        fontSize: 30,
        textAlign: 'center',
    },
    clearBtn: {
        marginBottom: 20,
    }
});

