export default (req, res, next) => {
    return req.user.role === 'admin' ?
        next() :
        res.status(403).send({
            status: 403,
            message: "You are not an Admin to perform this action"
        })
}