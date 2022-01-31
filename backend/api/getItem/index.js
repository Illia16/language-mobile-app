const { helpers } = require('../helper/index.js')

exports.handler = async () => {
    try {
        return helpers.getData("languageAppIn");
    } catch (er) {
        return er;
    }
}
