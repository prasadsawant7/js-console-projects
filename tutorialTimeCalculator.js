const eachVideoTime = [
    1.16,
    5.29,
    4.33,
    4.38,
    4.10,
    6.46,
    4.36,
    4.51,
    3.31,
    2.18,
    1.43,
    1.16,
    5.33,
    0.23,
    5.18,
    9.29,
    3.58,
    2.21,
    4.26,
    5.06,
    142.06
];

const getTutTotalTime = (mins, secs) => {
    /*
        1 min -> 60 sec (1*60)
        60 min -> 3600 sec (60*60)
        60 min == 1 hour
        3600 sec == 1 hour
        1. Math.floor(8526 / 3600) = 2 --> hours
        2. 
            i.  Math.floor(8526 % 3600) = 1326 --> secs
            ii. Math.floor(1326 / 60) = 22 min
    */
    let hours = Math.floor(mins / 60);
    let minutes = Math.ceil(mins % 60) + Math.ceil(secs / 60);
    console.log(`This tutorial will take total time of ${hours} hours and ${minutes} minutes`);
}

async function getTutPlaylistTotalTime(totalTimeArr) {
    try {
        let minPart = [];
        let secPart = [];
        
        totalTimeArr.map((time) => {
            minPart.push(Math.floor(time));
            if(((time % 1).toFixed(2).slice(2,4)).charAt(0) === "0") {
                secPart.push(Number(((time % 1).toFixed(2).slice(2,4)).replace("0", ".")));
            } else {
                secPart.push(Number((time % 1).toFixed(2).slice(2,4)));
            }
        });

        const sumOfMin = minPart.reduce((sum, i) => sum + i, 0);
        const sumOfSec = secPart.reduce((sum, i) => sum + i, 0);
        
        await getTutTotalTime(sumOfMin, sumOfSec);
    } catch(error) {
        console.log(error);
    } finally {
        console.log("You can do it!");
    }
}

getTutPlaylistTotalTime(eachVideoTime);