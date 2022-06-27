const getCurrentTime = require('../util/date_and_time');
const Task = require('../models/task');

exports.showTasks = (req, res) => {
    const [time, day, date] = getCurrentTime();

    const conditions = {};

    Task.find(conditions, (err, foundTasks) => {
        if (err) {
            res.send("Sorry! Something went wrong! while retrieving tasks!");
        } else {
            res.render('list',
                {
                    pageTitle: "Taskin",
                    time: time,
                    day: day,
                    date: date,
                    tasks: foundTasks
                }
            );
        }
    });
};

exports.addTask = (req, res) => {
    const input = req.body;

    const task = new Task({
        task_name: input.task_name,
        task_time_limit: input.task_time_limit
    });

    task.save()
        .then(result => {
            res.redirect('/');
        }).catch(err => {
            console.error(err);
            res.send('Sorry! Something went wrong while saving the task!');
        });
};

exports.deleteTask = (req, res) => {
    const input = req.body;
    console.log(input);
    
    const deletedTaskid = input.deletedTaskId;

    setTimeout(() => {
        Task.findByIdAndRemove(deletedTaskid, err => {
            if (err) {
                res.send("Sorry! Internal Deletion failed but your data was deleted")
            } else {
                res.redirect('/');
            }
        });
    }, 500); // needed delay for refletion provided js animation!
};

