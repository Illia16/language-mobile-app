const AWS = require("aws-sdk");
var dynamoDB = new AWS.DynamoDB.DocumentClient();

exports.helpers = {
    getData: async (tableName) => {
        const res = await dynamoDB.scan({TableName: tableName}).promise();
        const response = {
            statusCode: 200,
            body: JSON.stringify(res.Items),
            headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Credentials": true,
            },
        };

        return response;
    },
    postData: (tableName, tableData) => dynamoDB.put({TableName: tableName, Item: tableData}).promise(),
    updateItem: (params) => dynamoDB.update(params).promise(),
}
