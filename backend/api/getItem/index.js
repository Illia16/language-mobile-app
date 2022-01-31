const AWS = require("aws-sdk");
var dynamoDB = new AWS.DynamoDB.DocumentClient();

exports.handler = async () => {
    try {
        const res = await dynamoDB.scan({TableName: "languageAppIn"}).promise();
        const response = {
            statusCode: 200,
            body: JSON.stringify(res.Items),
            headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Credentials": true,
            },
        };

        return response;
    } catch (er) {
        return er;
    }
}
