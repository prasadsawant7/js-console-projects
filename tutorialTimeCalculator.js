const container = document.getElementById("container");

function readFile(input) {
    let file = input.files[0];
    
    let reader = new FileReader();
    
    reader.readAsText(file);

    reader.onload = function() {
        container.innerHTML = reader.result;
        getTutPlaylistTotalTime(getTimeArr());
        console.clear();
    };
    
    reader.onerror = function() {
        container.innerHTML = reader.error;
    };
}

function getTimeArr() {
    const arr = document.querySelectorAll("ytd-thumbnail-overlay-time-status-renderer.style-scope, ytd-thumbnail-overlay-time-status-renderer.ytd-thumbnail");
    let newStr = [];
    for(let i=0;i<=34;i++) {
        if(arr[i].childNodes[2].innerText.includes("\n")) {
            newStr.push(parseFloat(arr[i].childNodes[2].innerText.replaceAll("\n", "").trim().replaceAll(":", ".")));
        } else {
            newStr.push(parseFloat(arr[i].childNodes[2].innerText.replaceAll(":", ".")));
        }
    }
    return newStr;
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
        console.clear();
        console.log("You can do it!");
    }
}

const getTutTotalTime = (mins, secs) => {
    let hours = Math.floor(mins / 60);
    let minutes = Math.ceil(mins % 60) + Math.ceil(secs / 60);
    document.body.innerHTML = `This tutorial will take total time of ${hours} hours and ${minutes} minutes`;
}

/*
// NOTE --> {arr[0].childNodes[2].innerText}
function getTimeArr() {
    const arr = document.querySelectorAll("ytd-thumbnail-overlay-time-status-renderer.style-scope, ytd-thumbnail-overlay-time-status-renderer.ytd-thumbnail");
    let newStr = [];
    for(let i=0;i<=34;i++) {
        if(arr[i].childNodes[2].innerText.includes("\n")) {
            newStr.push(parseFloat(arr[i].childNodes[2].innerText.replaceAll("\n", "").trim().replaceAll(":", ".")));
        } else {
            newStr.push(parseFloat(arr[i].childNodes[2].innerText.replaceAll(":", ".")));
        }
    }
    return newStr;
}
console.log(getTimeArr());
*/