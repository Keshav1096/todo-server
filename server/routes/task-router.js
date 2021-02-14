const express = require('express');

const TaskCtrl = require('../controllers/task-ctrl');

const router = express.Router();

router.get('/', TaskCtrl.getAllTasks);
router.post('/', TaskCtrl.createTask);
router.put('/:id', TaskCtrl.updateTask);

module.exports = router;