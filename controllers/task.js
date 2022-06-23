const getCurrentTime = require('../util/date_and_time');
const tasks = [];
const completedTasks = [];

exports.showTasks = (req, res) => {
    const [time, day, date] = getCurrentTime();
    res.render('list',
        { pageTitle: "Taskin", time: time, day: day, date: date, tasks: tasks, completedTasks: completedTasks }
    );
};

exports.addTask = (req, res) => {
    const input = req.body;
    [heading, timeLimit] = [input.task_name, input.task_time_limit];
    tasks.push([heading, timeLimit]);
    res.redirect('/');
};

exports.deleteTask = (req, res) => {
    const input = req.body;
    deletedTaskid = input.deletedTaskId;
    deletedTask = tasks[deletedTaskid];
    completedTasks.push(deletedTask);
    tasks.splice(deletedTaskid, 1);
    setTimeout(() => {
        res.redirect('/');
    }, 500);
}; 