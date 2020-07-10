const User = require('../models/user-model')
const ErrorUtil = require('../controllers/utils')

createUser = (req, res) => {
    const body = req.body
    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide a user'
        });
    }

    const user = new User(body)

    if (!user) {
        return res.status(400).json({
            success: false,
            error: err
        })
    }

    user
        .save()
        .then(() => {
            return res.status(201).json({
                success: true,
                id: user._id,
                message: 'user created!'
            })
        })
        .catch(error => {
            return res.status(400).json({
                success: false,
                message: 'could not create a user'
            })
        })

}


updateUser = (req, res) => {
    const body = req.body
    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide a user id'
        });
    }

    User.findOne({_id: req.params.id}, (error, user) => {
        if (error) {
            return res.status(404).json({
                success: false,
                message: 'user does not exist'
            })
        }

        user.name = body.name
        user.username = body.username
        user
            .save()
            .then( () => {
                return res.status(200).json({
                    success: true,
                    message: 'user updated'
                })
            })
            .catch(error => {
                res.status(404).json({
                    success: false,
                    message: 'user Not updated'
                })
            })
    })
}


deleteUser = async (req, res) => {
    await User.findByIdAndDelete({_id: req.params.id}, (error, user) => {

        if (error) {

            console.log(error)
            return ErrorUtil.returnErrorStatus(res, 400, error);
        }

        if (!user) {
            return ErrorUtil.returnErrorStatus(res, 404, 'user not found');
        }

        return res.status(200).json({ 
            success: true, 
            data: user })
    }).catch(err => console.log(err))
}


getUserById = async (req, res) => {
    await User.findOne({_id: req.params.id}, (error, user) => {
        
        if (error) {
            return ErrorUtil.returnErrorStatus(res, 400, error);
        }
        
        if (!user) {
            return ErrorUtil.returnErrorStatus(res, 404, 'user not found');
        }

        return res.status(200).json({
            success: true,
            data: user
        })
    }).catch( error => console.log(error))
}

getUsers = async (req, res) => {
    await User.find({}, (error, users) => {
        if (error) { return ErrorUtil.returnErrorStatus(res, 400, error) }
        if (!users.length) {return ErrorUtil.returnErrorStatus(res, 404, 'users not found')}

        return res.status(200).json({
            success: true,
            data: users
        })
    }).catch(error => console.log(error))
}


module.exports = {
    createUser,
    updateUser,
    deleteUser,
    getUserById,
    getUsers
}
