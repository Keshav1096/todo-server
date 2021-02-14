const Task = require('../models/task-model');
const User = require('../models/user-model');
const encrypt = require('../utils/crypto');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const jwtPassword = process.env.JWT_PASSWORD;

verifyJwtToken = (token) => {
    if (!token) return false;
    try {
        jwt.verify(token, jwtPassword)
    } catch (err) {
        return false;
    }
    return true;
}

// Creating task
createTask = async (req, res) => {
    let body = req.body;
    let token = req.headers["auth-token"] || false;
    let isAuthenticated = verifyJwtToken(token);
    if (!isAuthenticated) return res.status(403).json({ success: false, message: "Invalid Token" });

    let task = new Task(body);
    task.save().then(() => {
        return res.status(200).json({
            success: true,
            id: task.id,
            message: "Task Created Successfully"
        })
    }).catch(err => {
        return res.status(400).json({
            success: false,
            err,
            message: "Error in creating task"
        });
    });


}
getAllTasks = async (req, res) => {
    // let uid = req.params.uid || false;
    let token = req.headers["auth-token"] || false;
    let isAuthenticated = verifyJwtToken(token);
    if (!isAuthenticated) return res.status(403).json({ success: false, message: "Invalid Token" });

    User.find({ authToken: token }).then(async user => {
        let uid = user[0]._id;
        if (!uid) return res.status(400).json({ success: false, message: "invalid params" });
        let allTasks = await Task.find({ uid }).catch(err => { return res.status(404).json({ success: false, message: "Some error occured" }); });
        return res.status(200).json({
            success: true,
            data: {
                total: allTasks.length,
                tasks: allTasks
            },
            message: "Tasks retreived"
        });
    }).catch(err => { console.log(err) });
}

updateTask = (req, res) => {
    let body = req.body;
    let id = req.params.id || false;
    let token = req.headers["auth-token"];
    let isAuthenticated = verifyJwtToken(token);
    if (!isAuthenticated) return res.status(403).json({ success: false, message: "Invalid Token" });

    if (!id) return res.status(403).json({ success: false, message: "Task id missing" });

    Task.findOne({ _id: id }).then(task => {
        updatedTask = Object.assign(task, body);
        updatedTask.save().then(() => {
            return res.status(200).json({
                success: true,
                message: "Task Updated"
            });
        }).catch(err => {
            return res.status(400).json({
                success: false,
                err,
                message: "Task not updated"
            });
        });
    }).catch(err => {
        return res.status(400).json({
            success: false,
            err,
            message: "Task not found"
        });
    });
}
module.exports = { getAllTasks, createTask, updateTask }