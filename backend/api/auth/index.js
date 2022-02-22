const { getData, checkPw } = require('../helper/index.js')

exports.handler = async (event, context) => {
    const parsedBody = JSON.parse(event.body);
    let ck = await checkPw(parsedBody.user);

    if (ck) {
        try {
            return getData("languageAppIn");
        } catch (er) {
            console.error('er:', er);
            return er;
        }
    } else {
        console.log('invalid....');
        const error = new Error("Wrong password...")
        error.code = 403;
        throw error;
    }
}
