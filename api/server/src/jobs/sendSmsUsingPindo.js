import dotenv from 'dotenv';

dotenv.config();

const { PINDO_TOKEN } = process.env;

const options = (body, ...rest) => {

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
        console.log(body);
    }
}
//call the request

module.exports = {
    options,
    callback
};

