const User = require('../models/users')

const updateTodo = async (req,res,next) => {
    const {userId, newColumns} = req.body
    const user = await User.findById(userId)
    user.columns = newColumns
    await user.save()
}


module.exports = {updateTodo}