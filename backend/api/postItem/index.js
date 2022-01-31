const AWS = require('aws-sdk')
var dynamoDB = new AWS.DynamoDB.DocumentClient();
const { handler: getData } = require('../getItem/index.js')

exports.handler = async (event) => {
    const parsedBody = JSON.parse(event.body);
    try {
        await dynamoDB.put({
            TableName: "languageAppIn",
            Item : {
                "level": parsedBody.level,
                "wordChar": parsedBody.wordChar,
                "wordPinyin": parsedBody.wordPinyin,
                "wordEng": parsedBody.wordEng,
                "id": parsedBody.id,
            },
        }).promise();
        return getData();
    } catch (er) {
        return er;
    }
}