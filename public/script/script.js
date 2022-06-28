// UTILITY FUNCTIONS !---------------------------------------------------------------->
// get Date and time
const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

const getCurrentTime = () => {
    let today = new Date();
    let todayDay = days[today.getDay()];
    let todayDate = `${today.getDate()} ${months[today.getMonth()]}, ${today.getFullYear()}`;

    let todayTime, type;

    if (today.getHours() >= 12)
        type = "PM";
    else
        type = "AM";

    let hours, mins, secs;
    if (today.getHours() >= 13) {
        hours = String(today.getHours() - 12), mins = String(today.getMinutes()), secs = String(today.getSeconds());
    } else {
        hours = String(today.getHours()), mins = String(today.getMinutes()), secs = String(today.getSeconds());
    }
    if (hours.length < 1) hours = "0" + hours;
    if (hours.length < 2) hours = "0" + hours;
    if (mins.length < 1) mins = "0" + mins;
    if (mins.length < 2) mins = "0" + mins;
    if (secs.length < 1) secs = "0" + secs;
    if (secs.length < 2) secs = "0" + secs;
    todayTime = hours + ":" + mins + ":" + secs + " " + type;
    return [todayTime, todayDay, todayDate];
}

const getTaskId = (pointedBlock) => {
    const id = $(pointedBlock).attr('id');
    let taskId = parseInt(id.split('-')[1]);
    return taskId;
}

const loadRunningState = taskId => {
    const i = taskId;

    const startButtonID = `#start-${i}`;
    const endButtonID = `#end-${i}`;
    $(startButtonID).attr('disabled', true);
    $(endButtonID).attr('disabled', false);

    let toggleStatus = true;
    colorChangingID = setInterval(() => {
        if (toggleStatus) { // bg color white font red 
            $(endButtonID).css('background-color', "#ffffff");
            $(endButtonID).css('color', "#ff0000");
            $(endButtonID).css('font-weight', 'bold');
        }
        else { // bg color red font white
            $(endButtonID).css('background-color', "#ff0000");
            $(endButtonID).css('color', "#ffffff");
        }
        toggleStatus ^= true;
    }, 1000);
    $("#addTaskBtn").attr('disabled', true);
}

const taskFinishedState = taskId => {
    const i = taskId;

    const startButtonID = `#start-${i}`;
    const endButtonID = `#end-${i}`;
    clearInterval(colorChangingID);

    $(startButtonID).parent().parent().hide(500);
    $("#addTaskBtn").attr('disabled', false);
};

// const deleteTaskById = async (taskId) => {
//     options = {
//         "body": "deletedTaskId=" + taskId,
//         "method": "POST"
//     };
//     await fetch("/delete", options);
// }

const deleteTaskById = async (taskId) => {
    const options = {
        "headers": {
            "content-type": "application/x-www-form-urlencoded", //
            // "Referer": "http://localhost:3000/",
        },
        "body": "deletedTaskId=" + taskId,
        "method": "POST"
    };
    await fetch("http://localhost:3000/delete", options);
}


// ON CLICK / ON CHANGE Functions!  
//----------------------------------------------------------------

const start = pointedBlock => {
    if (runningTaskId != null) {
        alert('You can only do one task at a time');
    } else {
        const isConfirmed = confirm('Do you want to start doing your task?');
        if (isConfirmed) {
            runningTaskId = getTaskId(pointedBlock);
            localStorage.setItem('runningTaskId', runningTaskId);
            loadRunningState(runningTaskId);
        }
    }
};


const end = async pointedBlock => {
    if (runningTaskId != null) {
        const isConfirmed = confirm('Have You Done Your Task?');
        if (isConfirmed) {
            runningTaskId = getTaskId(pointedBlock); // though not needed as runningTaskId is already set to that id! 
            let dbTaskId = $(pointedBlock).val();
            console.log(dbTaskId);
            await deleteTaskById(dbTaskId);
            taskFinishedState(runningTaskId);
            runningTaskId = null;
            localStorage.removeItem('runningTaskId');
        }
    };
}
// check At the beginning of running! 

let colorChangingID; // GLOBAL !  
let runningTaskId = localStorage.getItem("runningTaskId");

if (runningTaskId === null) {
    console.log("Nothing is running");
} else {
    console.log(runningTaskId + " is running");
    loadRunningState(runningTaskId);
}

// setting an interva to update time in every 200 ms! 
setInterval(
    () => {
        const [time, day, date] = getCurrentTime();
        let x = document.querySelector('#exact-time');
        x.innerHTML = time;
    }, 200
);