const options = (body, ...rest) => {
    const optionsValues = {
        method: "POST",
        body: body,
        json: true,
        url: "http://api.pindo.io/v1/sms/",
        headers: {
            Authorization: "Bearer eyJhbGciOiJub25lIn0.eyJpZCI6NDcsInJldm9rZWRfdG9rZW5fY291bnQiOjF9."
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

