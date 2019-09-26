let figlet = require('figlet');
let schedule = require('node-schedule')

const end_time = 1598889600000; //20200901
let current_time = new Date().getTime();
let refresh_day = 0;

get_remain_time(end_time, current_time, false);

//每天10:00刷新
let rule = new schedule.RecurrenceRule();
rule.hour = 10;
rule.minute = 00;

let job = schedule.scheduleJob(rule, function () {
    current_time = new Date().getTime();
    get_remain_time(end_time, current_time, true);

});

if (current_time >= end_time) {
    figlet(`Time up`, function (err, data) {
        if (err) {
            console.log('Something went wrong...');
            console.dir(err);
            return;
        }
        console.log(data)
    });
    job.cancel()
}

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
        console.clear()
        refresh_day = new Date(current_time).getDate()
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