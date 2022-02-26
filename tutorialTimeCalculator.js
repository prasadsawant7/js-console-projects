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
    let hours = Math.floor(mins / 60);
    let minutes = Math.ceil(mins % 60) + Math.ceil(secs / 60);
    console.log(`This tutorial will take total time of ${hours} hours and ${minutes} minutes`);
}

async function getTutPlaylistTotalTime(eachVideoTime) {
    try {
        let minPart = [];
        let secPart = [];
        
        eachVideoTime.map((time) => {
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