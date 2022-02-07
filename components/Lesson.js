import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, TouchableOpacity, FlatList, Pressable, TextInput } from "react-native";
import { sortArray, getQuestion, isCorrect  } from '../helpers/helpers.js'

const Lesson = ({data, numQuestions, mode, setStarted}) => {
    const [lessonData, setLessonData] = useState(null);
    const [currentQuestionNum, setCurrentQuestionNum] = useState(1);
    const [currentQuestion, setCurrentQuestion] = useState({});
    const [currentQuestionAnswered, setCurrentQuestionAnswered] = useState(false);
    const [answer, setAnswer] = useState(null);
    const [numOfCorrectAnswers, setNumOfCorrectAnswers] = useState(0);
    const [report, setReport] = useState([]);
    const [lessonDone, setLessonDone] = useState(null);

    // handling incorrect, correct answers and if no more questions, stopping the lesson
    const check = () => {
        if (!isCorrect(currentQuestion, answer)) {
            setCurrentQuestionAnswered(true)
            recordUserAnswer(false, answer, currentQuestion)
        } else {
            setCurrentQuestionAnswered(true)
            recordUserAnswer(true, answer, currentQuestion)
            setNumOfCorrectAnswers(numOfCorrectAnswers+1)
        }

        if (lessonData.length <= currentQuestionNum) {
            setLessonDone(true);
        }
    }


    // recording answers, their correctness for report at the end and updating API.
    const recordUserAnswer = (correct, answer, {qAnswer, id}) => {
        const r = {};
        r.userAnswer = answer;
        r.correctAnswer = qAnswer;
        r.id = id;

        if (correct) {
            r.isCorrect = true;
        } else {
            r.isCorrect = false;
        }

        setReport(prevArray => [...prevArray, r])
    }

    const nextQuestion = () => {
        setCurrentQuestionNum(currentQuestionNum+1);
        setCurrentQuestionAnswered(false)
        setAnswer('')
    }

    // setting questions based on preferred number of them
    useEffect(()=>{
        setLessonData(sortArray(data).slice(0,numQuestions));
    },[])

    // gettign current question based on the MODE selected
    useEffect(()=>{
        if (lessonData && lessonData.length) {
            setCurrentQuestion(getQuestion(mode, lessonData, currentQuestionNum));
        }
    },[lessonData, currentQuestionNum])

    const renderReport = ({ item }) => {
        return(
            <View>
                <Text style={item.isCorrect ? reportStyles.correct : reportStyles.incorrect}>My answer: {item.userAnswer}</Text>
                <Text style={item.isCorrect ? reportStyles.correct : reportStyles.incorrect}>Correct answer: {item.correctAnswer}</Text>
            </View>
        )
    };

    return(
        <View>
            {lessonData && lessonData.length && !lessonDone ?
                <View>
                    <Text style={{ fontSize: 20, color: "black", padding: 10 }}>Current question {currentQuestionNum}</Text>
                    <Text style={{ fontSize: 20, color: "black", padding: 10 }}>{currentQuestion.question}</Text>

                    {currentQuestionAnswered ?
                    <Text
                        style={isCorrect(currentQuestion, answer) ? answeredQ.correct : answeredQ.incorrect}>
                        {isCorrect(currentQuestion, answer) ? 'Correct!' : `Incorrect, correct answer is: ${currentQuestion.qAnswer}`}
                    </Text>
                    : null}

                    <TextInput
                        style={currentQuestionAnswered ? textInput.disabled : textInput.default }
                        placeholder="enter here"
                        value={answer}
                        onChangeText={setAnswer}
                        editable={!currentQuestionAnswered}
                    />

                    <Pressable
                        onPress={check}
                        style={!answer ? btnStyles.disabled : btnStyles.default }
                        disabled={!answer}>
                        <Text style={{ fontSize: 20, color: "white", padding: 10 }}>Check</Text>
                    </Pressable>
                    {!lessonDone &&
                        <Pressable
                            onPress={nextQuestion}
                            style={!currentQuestionAnswered ? btnStyles.disabled : btnStyles.default } disabled={!currentQuestionAnswered}>
                            <Text style={{ fontSize: 20, color: "white", padding: 10 }}>Next Q</Text>
                        </Pressable>
                    }
                </View>
            : null}

            {lessonDone &&
                <View>
                    <FlatList
                        data={report}
                        renderItem={renderReport}
                        keyExtractor={item => item.id}
                    />
                    <Pressable
                        onPress={()=>setStarted(false)}
                        style={btnStyles.default }>
                        <Text style={{ fontSize: 20, color: "white", padding: 10 }}>Back to menu</Text>
                    </Pressable>
                </View>
            }
        </View>
    )
}

export default Lesson

const answeredQ = StyleSheet.create({
    correct: {
        fontSize: 20,
        color: "green",
        padding: 10
    },
    incorrect: {
        fontSize: 20,
        color: "red",
        padding: 10
    },
});

const textInput = StyleSheet.create({
    default: {
        fontSize: 20,
        color: "black",
        borderColor: "black",
        borderWidth: 1,
        padding: 10,
    },
    disabled: {
        fontSize: 20,
        color: "black",
        borderColor: "black",
        borderWidth: 1,
        padding: 10,
        opacity: 0.3,
    },
});

const btnStyles = StyleSheet.create({
    default: {
        backgroundColor: "blue",
        marginTop: 10
    },
    disabled: {
        backgroundColor: "grey",
        marginTop: 10
    }
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
