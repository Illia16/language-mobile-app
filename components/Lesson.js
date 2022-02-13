import React, { useState, useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, Text, TextInput, List, RadioButton } from 'react-native-paper';
import { sortArray, getQuestion, isCorrect } from '../helpers/helpers.js';

const Lesson = ({ data, numQuestions, mode, setStarted }) => {
	const [lessonData, setLessonData] = useState(null);
	const [currentQuestionNum, setCurrentQuestionNum] = useState(1);
	const [currentQuestion, setCurrentQuestion] = useState({});
	const [currentQuestionAnswered, setCurrentQuestionAnswered] = useState(false);
	const [userAnswer, setUserAnswer] = useState(null);
	const [numOfCorrectAnswers, setNumOfCorrectAnswers] = useState(0);
	const [report, setReport] = useState([]);
	const [lessonDone, setLessonDone] = useState(null);

	// handling incorrect, correct answers and if no more questions, stopping the lesson
	const check = () => {
		if (!isCorrect(currentQuestion, userAnswer)) {
			setCurrentQuestionAnswered(true);
			recordUserAnswer(false, userAnswer, currentQuestion);
		} else {
			setCurrentQuestionAnswered(true);
			recordUserAnswer(true, userAnswer, currentQuestion);
			setNumOfCorrectAnswers(numOfCorrectAnswers + 1);
		}

		if (lessonData.length <= currentQuestionNum) {
			setLessonDone(true);
		}
	};

	// recording answers, their correctness for report at the end and updating API.
	const recordUserAnswer = (correct, userAnswer, { qAnswer, question, id }) => {
		const r = {};
        r.question = question
		r.userAnswer = userAnswer;
		r.correctAnswer = qAnswer;
		r.id = id;

		if (correct) {
			r.isCorrect = true;
		} else {
			r.isCorrect = false;
		}

		setReport((prevArray) => [...prevArray, r]);
	};

	const nextQuestion = () => {
		setCurrentQuestionNum(currentQuestionNum + 1);
		setCurrentQuestionAnswered(false);
		setUserAnswer('');
	};

	// setting questions based on preferred number of them
	useEffect(() => {
		setLessonData(sortArray(data).slice(0, numQuestions));
	}, []);

	// gettign current question based on the MODE selected
	useEffect(() => {
		if (lessonData && lessonData.length) {
			setCurrentQuestion(getQuestion(mode, lessonData, currentQuestionNum));
		}
	}, [lessonData, currentQuestionNum]);

	return (
		<View>
			{lessonData && lessonData.length && !lessonDone ? (
				<View>
					<Text>Current question {currentQuestionNum}</Text>
					<Text>{currentQuestion.question}</Text>

					{currentQuestionAnswered ? (
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
					) : null}

					{/* handling question based on the mode */}
					{currentQuestion.all && currentQuestion.all.length ? (
                        <RadioButton.Group onValueChange={(newVal) => setUserAnswer(newVal)} value={userAnswer}>
                            {currentQuestion.all.map((item) => {
                                return (
                                    <View>
                                        <Text>{item}</Text>
                                        <RadioButton value={item} />
                                    </View>
                                );
                            })}
                        </RadioButton.Group>
					) : (
						<TextInput
							style={
								currentQuestionAnswered
									? textInput.disabled
									: textInput.default
							}
							editable={!currentQuestionAnswered}
							placeholder='enter here'
							value={userAnswer}
							onChangeText={setUserAnswer}
						/>
					)}

					<Button
						onPress={check}
						style={!userAnswer || currentQuestionAnswered ? btnStyles.disabled : btnStyles.default}
						disabled={!userAnswer || currentQuestionAnswered}>
						<Text>Check</Text>
					</Button>
					{!lessonDone && (
						<Button
							onPress={nextQuestion}
							style={
								!currentQuestionAnswered
									? btnStyles.disabled
									: btnStyles.default
							}
							disabled={!currentQuestionAnswered}>
							<Text>Next Q</Text>
						</Button>
					)}
				</View>
			) : null}

			{lessonDone && (
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
			)}
		</View>
	);
};

export default Lesson;

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
