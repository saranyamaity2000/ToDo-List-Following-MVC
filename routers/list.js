const path = require('path');
const express = require('express');
const taskController = require('../controllers/task');

const router = express.Router();

router.get('/', taskController.showTasks);

router.post('/add-task', taskController.addTask);

router.post('/delete', taskController.deleteTask);

module.exports = router; 