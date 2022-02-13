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
    const q = lessonData[currentQuestionNum-1];

    if (m !== 'random') {
        questionAnswer.question = q.wordData[m === 'wordTranslation' || m === 'wordTranslationMPChoice' ? 'word' : 'translation'];
        questionAnswer.qAnswer = q.wordData[m === 'wordTranslation' || m === 'wordTranslationMPChoice' ? 'translation' : 'word'];
        questionAnswer.id = q.id;

        if (m === 'wordTranslationMPChoice') {
            questionAnswer.all = fillMpChoiceArray(lessonData,  questionAnswer.qAnswer, 'translation');
        } else if (m === 'translationWordMPChoice') {
            questionAnswer.all = fillMpChoiceArray(lessonData,  questionAnswer.qAnswer, 'word');
        }
    } else {
        const allModes = ['wordTranslation', 'translationWord', 'wordTranslationMPChoice', 'translationWordMPChoice'];
        const randomIndex = Math.floor(Math.random()*allModes.length);
        const randomMode = allModes[randomIndex];

        questionAnswer.question = q.wordData[randomMode === 'wordTranslation' || randomMode === 'wordTranslationMPChoice' ? 'word' : 'translation'];
        questionAnswer.qAnswer = q.wordData[randomMode === 'wordTranslation' || randomMode === 'wordTranslationMPChoice' ? 'translation' : 'word'];
        questionAnswer.id = q.id;

        if (randomMode === 'wordTranslationMPChoice') {
            questionAnswer.all = fillMpChoiceArray(lessonData,  questionAnswer.qAnswer, 'translation');
        } else if (randomMode === 'translationWordMPChoice') {
            questionAnswer.all = fillMpChoiceArray(lessonData,  questionAnswer.qAnswer, 'word');
        }
    }

    return questionAnswer;
}

// function to procude 4 MP choices + include 1 correct answer
export const fillMpChoiceArray = (data, correctAnswer, mpChoiceType) => {
    const result = data.map((el,i) => i<=2 && el.wordData[mpChoiceType] !== correctAnswer && el.wordData[mpChoiceType]).filter(el=>el);
    result.push(correctAnswer);
    return sortArray(result);
}

export const isCorrect = (currentQuestion, answer) => {
    return answer.toLowerCase().trim() === currentQuestion.qAnswer.toLowerCase().trim();
}