const { getData } = require('../helper/index.js')

exports.handler = async (event, context) => {
    try {
        return getData("languageAppIn");
    } catch (er) {
        console.error('er:', er);
        return er;
    }
}
