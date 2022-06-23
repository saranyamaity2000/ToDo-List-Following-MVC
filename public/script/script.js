// get Date and time
const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

const getCurrentTime = () => {
    let today = new Date();
    let todayDay = days[today.getDay()];
    let todayDate = `${today.getDate()} ${months[today.getMonth()]}, ${today.getFullYear()}`;

    let todayTime, type;

    if (today.getHours() >= 12) {
        type = "PM";
    } else {
        type = "AM";
    }

    if (today.getHours() >= 13) {
        todayTime = (today.getHours() - 12) + ":" + today.getMinutes() + ":" + today.getSeconds() + " " + type;
    } else {
        todayTime = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds() + " " + type;
    }
    return [todayTime, todayDay, todayDate];
}

// setting an interva to update time in every 200 ms! 
setInterval(
    () => {
        const [time, day, date] = getCurrentTime();
        let x = document.querySelector('#exact-time');
        x.innerHTML = time;
    }, 100
);


let overall_task_status = false;
let intervalID


const start = pointedBlock => {
    if (overall_task_status) {
        alert('You can only do one task at a time');
    } else {
        const status = confirm('Do you want to start doing your task?');
        if (status) {
            const id = $(pointedBlock).attr('id');
            const i = parseInt(id.split('-')[1]);

            const startButtonID = `#start-${i}`; // pointed block itself pointing to start ; 
            const endButtonID = `#end-${i}`;
            $(startButtonID).attr('disabled', true);
            $(endButtonID).attr('disabled', false);

            let toggleStatus = true;
            intervalID = setInterval(() => {
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
            overall_task_status = true;
        }
    }
};


const end = pointedBlock => {
    if (overall_task_status) {
        const status = confirm('Have You Done Your Task?');
        if (status) {
            const id = $(pointedBlock).attr('id');
            const i = parseInt(id.split('-')[1]);

            const startButtonID = `#start-${i}`;
            const endButtonID = `#end-${i}`;

            console.log($(startButtonID).parent());

            clearInterval(intervalID);

            $(startButtonID).parent().parent().hide(500);

            overall_task_status = false;

            $("#addTaskBtn").attr('disabled', false);
        }
    }
}; 