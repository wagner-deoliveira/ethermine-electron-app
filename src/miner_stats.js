const api = "https://api.ethermine.org/";
const myHeaders = new Headers();
const myInit = {
    method: 'GET',
    headers: myHeaders,
    mode: 'cors',
    cache: 'default'
};

function convertUnixTimestamp (unix_timestamp){
    var date = new Date(unix_timestamp * 1000); // to ms
    var hours = date.getHours();
    var minutes = "0" + date.getMinutes();
    var seconds = "0" + date.getSeconds();
    var formattedTime = hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);

    return formattedTime;
}

async function getMinerStats() {
    let login, user = {};
    login = document.getElementById("login");
    login.onsubmit = async function (event) {
        event.preventDefault();
        user.wallet = document.getElementById("wallet").value;
        const minerStats = `miner/${user.wallet}/workers`;
        const response = await fetch(api + minerStats, myInit);
        if (!response.ok) {
            const message = `An error has occurred: ${response.status}`;
            throw new Error(message);
        }

        const result = response.json().then(res => {
            if (res.data.isEmpty){
                const message = "Data is empty. Check miner current activity!";
                throw new Error(message);
            } else {
                let para1 = document.createElement("p");
                let worker = document.createTextNode(res.data[0].worker);
                para1.appendChild(worker)
                let elementWorker = document.getElementsByClassName("miner")[0];
                elementWorker.appendChild(para1);

                let para2 = document.createElement("p");
                let hashRate = res.data[0].averageHashrate;
                const megaHash = (hashRate / 1000000).toFixed(2);
                const pMegaHash = document.createTextNode(megaHash);
                para2.appendChild(pMegaHash)
                let elementHashrate = document.getElementsByClassName("hashrate")[0];
                elementHashrate.appendChild(para2);

                let para3 = document.createElement("p");
                let reportedHashRate = res.data[0].reportedHashrate;
                const megaHashReported = (reportedHashRate / 1000000).toFixed(2);
                const pmegaHashReported = document.createTextNode(megaHashReported);
                para3.appendChild(pmegaHashReported)
                let elementReportedHashrate = document.getElementsByClassName("reportedHashrate")[0];
                elementReportedHashrate.appendChild(para3);

                let para4 = document.createElement("p");
                let time = res.data[0].time;
                const convertedTime = document.createTextNode(convertUnixTimestamp(time));
                para4.appendChild(convertedTime)
                let elementTime = document.getElementsByClassName("time")[0];
                elementTime.appendChild(para4);
            }
        });
    }
}

getMinerStats();

//TODO : appendchild only once if child already exist in DOM
//TODO : Loop through the data keys to get values
//TODO : Automatic update using a defined period of time