const { helpers } = require('../helper/index.js')

exports.handler = async (event) => {
    const parsedBody = JSON.parse(event.body);

    var params = {
        TableName: 'languageAppIn',
        Key:{
            "id": parsedBody.id,
        },
        UpdateExpression: "set #lvl = :lvl",
        ExpressionAttributeValues:{
            ":lvl": parsedBody.level,
        },
        ExpressionAttributeNames: {'#lvl' : 'level'},
        ReturnValues:"UPDATED_NEW"
    };


    try {
        await helpers.updateItem(params);
        const updatedData = await helpers.getData("languageAppIn");
        return updatedData;
    } catch (er) {
        return er;
    }
}