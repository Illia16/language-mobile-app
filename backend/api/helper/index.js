const AWS = require('aws-sdk');
var dynamoDB = new AWS.DynamoDB.DocumentClient();
var client = new AWS.SecretsManager({ region: 'us-east-1' });

module.exports = {
	getData: async (tableName) => {
		const res = await dynamoDB.scan({ TableName: tableName }).promise();
		const response = {
			statusCode: 200,
			body: JSON.stringify(res.Items),
			headers: {
				'Access-Control-Allow-Origin': '*',
				'Access-Control-Allow-Credentials': true,
			},
		};

		return response;
	},
	postData: (tableName, tableData) => dynamoDB.put({ TableName: tableName, Item: tableData }).promise(),
	updateItem: (params) => dynamoDB.update(params).promise(),
	checkPw: async (userInput) => {
		var secretName = 'arn:aws:secretsmanager:us-east-1:177749704705:secret:language-app-IKxaTF';
		var secret;
		var decodedBinarySecret;

        try {
            const data = await client.getSecretValue({ SecretId: secretName }).promise();

            if ('SecretString' in data) {
                secret = data.SecretString;
                return Object.values(JSON.parse(secret)).includes(userInput);
            } else {
                let buff = new Buffer(data.SecretBinary, 'base64');
                decodedBinarySecret = buff.toString('ascii');
            }
        } catch (err) {
            if (err) {
                if (err.code === 'DecryptionFailureException')
                    // Secrets Manager can't decrypt the protected secret text using the provided KMS key.
                    // Deal with the exception here, and/or rethrow at your discretion.
                    throw err;
                else if (err.code === 'InternalServiceErrorException')
                    // An error occurred on the server side.
                    // Deal with the exception here, and/or rethrow at your discretion.
                    throw err;
                else if (err.code === 'InvalidParameterException')
                    // You provided an invalid value for a parameter.
                    // Deal with the exception here, and/or rethrow at your discretion.
                    throw err;
                else if (err.code === 'InvalidRequestException')
                    // You provided a parameter value that is not valid for the current state of the resource.
                    // Deal with the exception here, and/or rethrow at your discretion.
                    throw err;
                else if (err.code === 'ResourceNotFoundException')
                    // We can't find the resource that you asked for.
                    // Deal with the exception here, and/or rethrow at your discretion.
                    throw err;
            }
        }
	},
};
