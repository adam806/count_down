let figlet = require('figlet');
const end_time = 1598889600000; //20200901
let current_time = new Date().getTime();
let refresh_time = 300000;//5分钟刷新一次
let current_day = new Date(current_time).getDate();

get_remain_time(end_time, current_time, false);
let timer = setInterval(() => {
    current_time = new Date().getTime();
    current_day = new Date(current_time).getDate();
    get_remain_time(end_time, current_time, true);

    if (current_time >= end_time) {
        figlet(`Time up`, function (err, data) {
            if (err) {
                console.log('Something went wrong...');
                console.dir(err);
                return;
            }
            console.log(data)
        });
    }
}, refresh_time)

function get_remain_time(endTime, currentTime, refresh) {
    let remain_time = endTime - currentTime;//timestamp
    let refresh_day = new Date(currentTime).getDate();
    let day = Math.floor(remain_time / 1000 / 60 / 60 / 24);
    if (!refresh) {
        figlet(`${day}!`, function (err, data) {
            if (err) {
                console.log('Something went wrong...');
                console.dir(err);
                return;
            }
            console.log(data)
        });
    } else if (refresh && refresh_day - current_day >= 1) {
        console.clear()
        figlet(`${day}!`, function (err, data) {
            if (err) {
                console.log('Something went wrong...');
                console.dir(err);
                return;
            }
            console.log(data)
        });
    }
}