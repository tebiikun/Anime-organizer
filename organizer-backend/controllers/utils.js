module.exports.returnErrorStatus = (res, status, err) => {

    return res.status(status).json({
        success: false,
        message: err
    })
}