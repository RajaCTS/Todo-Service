const express = require('express');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const _ = require('lodash');

const { mongoose } = require('./commonModule/mongooseConnect.js');
const { todoService } = require('./Router/todoList/todoService.js')
const { userService } = require('./Router/userLogin/loginService.js')

const app = express();
app.use(bodyParser.json());
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "*");
    next();
});

app.get('/todos', (req, res) => {
    todoService.getTodoList(req).then((result) => {
        res.send({
            result,
            message: 'Success of getting Todos'
        })
    }).catch((err) => {
        console.log(err)
    });
})

app.post('/todos', (req, res) => {
    todoService.newTodo(req).then((result) => {
        res.send({
            result,
            message: 'New Todo list created'
        })
    }).catch((err) => {
        console.log(err)
    });
})

app.put('/todos', (req, res) => {
    todoService.updateTodo(req).then((result) => {
        res.send({
            result,
            message: 'Todo list updated'
        })
    }).catch((err) => {
        console.log(err);
    })
})

app.delete('/todos', (req, res) => {
    todoService.deleteTodo(req).then((result) => {
        res.send({
            result,
            message: 'Todo list Deleted'
        })
    }).catch((err) => {
        console.log(err);
    })
})

app.post('/newUser', (req, res) => {
    userService.createUser(req).then((result) => {
        if (result.errmsg) {
            var resultData = { errmsg: 'EmailID is already available' }
            res.status(400).send(resultData)
        } else {
            var resutlData = _.pick(result, ['userName', 'userID', 'emailID']);
            res.header('autherization', result['x_auth']).send(resutlData);
        }

    })
})

app.post('/login', (req, res) => {
    userService.login(req).then((result) => {
        if (result.errmsg) {
            res.status(400).send(result)
        } else {
            var resutlData = _.pick(result, ['userName', 'userID', 'emailID','msg']);
            res.header('autherization', result['x_auth']).send(resutlData);
        }
    })
})

var port = 3000;

app.listen(port, () => {
    console.log(`App Listening to port ${port}`);
})

