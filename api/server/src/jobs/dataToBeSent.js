const dataToBeSent = (to, text, sender) => {
    const data = {
        to: to,
        text: text,
        sender: sender
    };
    return data
}

export default dataToBeSent;