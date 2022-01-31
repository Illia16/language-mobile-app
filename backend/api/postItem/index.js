const AWS = require('aws-sdk')
const dynamoDB = new AWS.DynamoDB({ region: 'us-east-1', apiVersion: '2012-08-10' })
const { handler: getData } = require('../getItem/index.js')

exports.handler = async (event) => {
    const parsedBody = JSON.parse(event.body);
    try {
        await dynamoDB.putItem({
            TableName: "languageAppIn",
            Item : {
                "level": {N: parsedBody.level},
                "wordChar": {S: parsedBody.wordChar},
                "wordPinyin": {S: parsedBody.wordPinyin},
                "wordEng": {S: parsedBody.wordEng},
                "id": {S: parsedBody.id}
            },
        }).promise();
        return getData();
    } catch (er) {
        return er;
    }
}