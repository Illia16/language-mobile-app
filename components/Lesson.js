import React, { useState, useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, Text } from 'react-native-paper';
import { getLesson, getQuestion, isCorrect } from '../helpers/helpers.js';

// Question-related components
import QuestionMsgCorrectOrIncorrect from './question/QuestionMsgCorrectOrIncorrect';
import QuestionTypeRegular from './question/QuestionTypeRegular';
import QuestionTypeMpChoice from './question/QuestionTypeMpChoice';
import QuestionTypySentenceBuilder from './question/QuestionTypySentenceBuilder';

// Lesson-related componets
import LessonReport from './LessonReport';

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
		r.question = question;
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

	// setting lesson data (questions) based on the selected mode and number of questions(available/wanted)
	useEffect(() => {
		setLessonData(getLesson(mode, data).slice(0, numQuestions));
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

					<QuestionMsgCorrectOrIncorrect
						currentQuestionAnswered={currentQuestionAnswered}
						currentQuestion={currentQuestion}
						userAnswer={userAnswer}
					/>

					{/* handling question based on the mode */}
					{currentQuestion.all && currentQuestion.all.length && (
						<QuestionTypeMpChoice
							setUserAnswer={setUserAnswer}
							userAnswer={userAnswer}
							currentQuestion={currentQuestion}
						/>
					)}

					{currentQuestion.splitted && currentQuestion.splitted.length && (
						<QuestionTypySentenceBuilder
							setUserAnswer={setUserAnswer}
							userAnswer={userAnswer}
							currentQuestion={currentQuestion}
						/>
					)}

                    {!currentQuestion.splitted && !currentQuestion.all && (
                        <QuestionTypeRegular
                            currentQuestionAnswered={currentQuestionAnswered}
                            userAnswer={userAnswer}
                            setUserAnswer={setUserAnswer}
                        />
					)}

					<Button
						onPress={check}
						style={
							!userAnswer || currentQuestionAnswered
								? btnStyles.disabled
								: btnStyles.default
						}
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
                <LessonReport report={report} setStarted={setStarted} />
			)}
		</View>
	);
};

export default Lesson;

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
