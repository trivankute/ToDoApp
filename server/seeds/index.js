const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/to_do_app')
  .then(() => console.log("Connection to mongoDB opens"))
  .catch(error => handleError(error));
function handleError(error) {
    console.log(error)
}
const User = require('../models/user')

async function createUser () {
    const a = await new User({
        username:"trivan"
        ,
        columns:
        [
            {
                taskLists:[
                    {
                    topic:"Learning",
                    content:"learning Redux in 1 week",
                    },

                ]
            }
        ],
    })
    const newUser = await User.register(a,"trivan")
    console.log(newUser)
}
createUser()