import dotenv from 'dotenv';

dotenv.config();

const { PINDO_TOKEN } = process.env;
console.log('YEAHH', PINDO_TOKEN);

const options = body => {

    const optionsValues = {
        method: "POST",
        body: body,
        json: true,
        url: "http://api.pindo.io/v1/sms/",
        headers: {
            Authorization: `Bearer ${PINDO_TOKEN}`
        }
    };
    return optionsValues
}


const callback = (error, response, body) => {
    if (!error && response.statusCode == 200) {
        console.log('success');
    }
    console.log('response ==>', response.statusCode);
    return response;
}
//call the request

module.exports = {
    options,
    callback
};
