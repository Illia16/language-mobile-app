const AWS = require("aws-sdk");
const dynamoDB = new AWS.DynamoDB({
  region: "us-east-1",
  apiVersion: "2012-08-10",
});

exports.handler = async () => {
    return new Promise((resolve, reject) => {
        dynamoDB.scan({ TableName: "languageAppIn" }, (err, data) => {
            if (err) {
                reject(err);
            } else {
                const unmarshalledData = data.Items.map((el) => {
                    return AWS.DynamoDB.Converter.unmarshall(el);
                });

            const response = {
                statusCode: 200,
                body: JSON.stringify(unmarshalledData),
                headers: {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Credentials": true,
                },
            };

            resolve(response);
        }
      });
    });
};
