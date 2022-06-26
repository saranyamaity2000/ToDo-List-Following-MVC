const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const taskSchema = new Schema({
    task_name: {
        type: String,
        required: true
    },
    task_time_limit: {
        type: String,
        required: true
    }
});


Task = mongoose.model('Task', taskSchema);
module.exports = Task;