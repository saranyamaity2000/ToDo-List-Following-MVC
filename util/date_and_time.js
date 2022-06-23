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

module.exports = getCurrentTime; 