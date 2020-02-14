export default (req, res, next) => {
    return req.body.phone.length === 13 ?
        next() :
        res.status(400).send({
            status: 400,
            message: "Number is incomplete"
        })
}