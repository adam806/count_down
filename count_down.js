let figlet = require('figlet');
const end_time = 1598889600000; //20200901
let current_time = new Date().getTime();
let refresh_time = 1569149222000;//5分钟刷新一次
let refresh_day = 0;

get_remain_time(end_time, current_time, false);

let timer = setInterval(() => {
    current_time = new Date().getTime();
    if (current_time >= end_time) {
        figlet(`Time up`, function (err, data) {
            if (err) {
                console.log('Something went wrong...');
                console.dir(err);
                return;
            }
            console.log(data)
        });
        clearInterval(timer);
    }
    get_remain_time(end_time, current_time, true);

}, refresh_time)

function get_remain_time(end_time, current_time, refresh) {
    let remain_time = end_time - current_time;//timestamp差值
    let display_day = Math.floor(remain_time / 1000 / 60 / 60 / 24);//显示day
    let current_day = new Date(current_time).getDate();//当前调取本方法的时间
    if (!refresh) {
        refresh_day = new Date(current_time).getDate()
        figlet(`${display_day}!`, function (err, data) {
            if (err) {
                console.log('Something went wrong...');
                console.dir(err);
                return;
            }
            console.log(data)
        });
    } else if (refresh && (current_day - refresh_day >= 1)) {
        refresh_day = new Date(current_time).getDate()
        console.clear()
        figlet(`${display_day}!`, function (err, data) {
            if (err) {
                console.log('Something went wrong...');
                console.dir(err);
                return;
            }
            console.log(data)
        });
    }
}