const mongoose = require('mongoose');
var Todo = mongoose.model('Todo', {
    title: {
        type: String
    },
    createdOn: {
        type: Date
    },
    doneBy: {
        type: String
    },
    desc: {
        type: String
    },
    taskID: {
        type: String
    },
    userID: {
        type: String
    }
})

module.exports = {Todo}