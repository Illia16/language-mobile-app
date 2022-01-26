const AWS = require('aws-sdk')
const dynamoDB = new AWS.DynamoDB({ region: 'us-east-1', apiVersion: '2012-08-10' })

exports.handler = (event, context, callback) => {
    const getData = (params) => {
        dynamoDB.scan(params, (err, data) => {
          if (err) {
              callback(err)
          } else {
                const unmarshalledData = data.Items.map(el => {
                    return AWS.DynamoDB.Converter.unmarshall(el)
                })

                const response = {
                    "statusCode": 200,
                    "body": JSON.stringify(unmarshalledData),
                    "headers": {
                        "Access-Control-Allow-Origin": "*",
    	            "Access-Control-Allow-Credentials": true
                    }

                };

                callback(null, response)
          }
        })
    }

    const params = {
        TableName: 'languageAppIn'
    }

    if (event.httpMethod === 'GET') {
            getData(params)
    }

    if (event.httpMethod === 'POST') {
        const parsedBody = JSON.parse(event.body);

        dynamoDB.putItem({
            TableName: "languageAppIn",
            Item : {
                "time": {N: parsedBody.time},
                "moves": {N: parsedBody.moves},
                "name": {S: parsedBody.name},
                "id": {S: parsedBody.id}
            }
        }, function(err, data) {
            if (err) {
                console.log('Error putting item into dynamodb failed: '+err);
            }
            else {
                getData(params)
            }
        });
    }
}
