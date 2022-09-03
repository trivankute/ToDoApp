const express = require('express')
const router = express.Router()
const catchAsync = require('../utils/catchAsync')
const todoController = require('../controllers/todos')
router.route('/updateTodo')
    .post(catchAsync(todoController.updateTodo))
    
module.exports = router