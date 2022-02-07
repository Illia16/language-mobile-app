export const sortArray = (arr) => {
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        const temp = arr[i];
        arr[i] = arr[j];
        arr[j] = temp;
    }
    return arr;
};

export const getQuestion = (m, lessonData, currentQuestionNum) => {
    let questionAnswer = {};
    if (m === 'CN - ENG' || m === 'CN - ENG MP Choice') {
        questionAnswer.question = lessonData[currentQuestionNum-1]?.wordChar
        questionAnswer.qAnswer = lessonData[currentQuestionNum-1]?.wordEng
        questionAnswer.id = lessonData[currentQuestionNum-1]?.id
    } else if (m === 'ENG - CN' || m === 'ENG - CN MP Choice') {
        questionAnswer.question = lessonData[currentQuestionNum-1]?.wordEng
        questionAnswer.qAnswer = lessonData[currentQuestionNum-1]?.wordChar
        questionAnswer.id = lessonData[currentQuestionNum-1]?.id
    } else {
        const randomIndex = Math.floor(Math.random()*['wordChar', 'wordEng'].length);
        const array = ['wordChar', 'wordEng'];
        const q = lessonData[currentQuestionNum-1];
        questionAnswer.question = q[array[randomIndex]];
        questionAnswer.qAnswer = q[array[randomIndex === 1 ? 0 : 1]];
        questionAnswer.id = lessonData[currentQuestionNum-1]?.id
    }
    return questionAnswer;
}

export const isCorrect = (currentQuestion, answer) => {
    return answer.toLowerCase().trim() === currentQuestion.qAnswer;
}