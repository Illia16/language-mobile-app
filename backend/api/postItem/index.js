const { getData, postData } = require('../helper/index.js')

exports.handler = async (event) => {
    const parsedBody = JSON.parse(event.body);
    try {
        await postData("languageAppIn", {
            "id": parsedBody.id,
            "level": parsedBody.level,
            "wordData": {
                "word": parsedBody.wordData.word,
                "translation": parsedBody.wordData.translation,
                "transcription": parsedBody.wordData.transcription
            },
            "isSentense": parsedBody.isSentense
        });

        const updatedData = await getData("languageAppIn");
        return updatedData;
    } catch (er) {
        return er;
    }
}