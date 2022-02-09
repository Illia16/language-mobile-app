const { getData, postData } = require('../helper/index.js')

exports.handler = async (event) => {
    const parsedBody = JSON.parse(event.body);
    try {
        await postData("languageAppIn", {
            "level": parsedBody.level,
            "wordChar": parsedBody.wordChar,
            "wordPinyin": parsedBody.wordPinyin,
            "wordEng": parsedBody.wordEng,
            "id": parsedBody.id,
        });

        const updatedData = await getData("languageAppIn");
        return updatedData;
    } catch (er) {
        return er;
    }
}