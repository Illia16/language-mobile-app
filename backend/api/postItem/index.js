const { helpers } = require('../helper/index.js')

exports.handler = async (event) => {
    const parsedBody = JSON.parse(event.body);
    try {
        await helpers.postData("languageAppIn", {
            "level": parsedBody.level,
            "wordChar": parsedBody.wordChar,
            "wordPinyin": parsedBody.wordPinyin,
            "wordEng": parsedBody.wordEng,
            "id": parsedBody.id,
        });

        const updatedData = await helpers.getData("languageAppIn");
        return updatedData;
    } catch (er) {
        return er;
    }
}