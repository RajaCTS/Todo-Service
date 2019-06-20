var { Todo } = require('../../model/todoModel');
var mongoose = require('mongoose');
var generateTaskID = () => {
    var objID = (mongoose.Types.ObjectId().toHexString());

    var objIDResult = "T" + (objID.slice(objID.length - (1 + 5), objID.length));
    return objIDResult
}
var todoService = {
    getTodoList: (req) => {
        return Todo.find({userID: req.query.userID})
    },
    newTodo: (req) => {
        var newTaskID = generateTaskID()
        var todoCreate = new Todo({
            title: req.body.title,
            doneBy: req.body.doneBy,
            createdOn: new Date(),
            desc: req.body.desc,
            taskID: newTaskID,
            userID: req.body.userID
        })
        return todoCreate.save()
    },
    updateTodo: (req) => {
        return Todo.findOneAndUpdate({taskID: req.query.taskID}, req.body,{upsert:true})
    },
    deleteTodo: (req)=>{
        return Todo.findOneAndRemove({taskID: req.query.taskID})
    }
}

module.exports = { todoService }