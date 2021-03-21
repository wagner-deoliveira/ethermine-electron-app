import convertUnixTimestamp from "../utils/utils.js";
const api = "https://api.ethermine.org/miner/";
const myHeaders = new Headers();
const myInit = {
    method: 'GET',
    headers: myHeaders,
    mode: 'cors',
    cache: 'default'
};

async function getMinerStats() {
    let login, user = {};
    login = document.getElementById("login");
    login.onsubmit = async function (event) {
        event.preventDefault();
        user.wallet = document.getElementById("wallet").value;
        const minerStats = `${user.wallet}/workers`;
        const response = await fetch(api + minerStats, myInit);
        if (!response.ok) {
            const message = `An error has occurred: ${response.status}`;
            throw new Error(message);
        }

        const result = response.json().then(res => {
            if (res.data[0].isEmpty) {
                const message = "Data is empty. Check miner current activity!";
                throw new Error(message);
            }
            const {worker, time, lastSeen, reportedHashrate, currentHashrate, validShares, invalidShares, staleShares, averageHashrate } = res.data[0];
            const averageMegaHash = (averageHashrate / 1000000).toFixed(3);
            const megaHashReported = (reportedHashrate / 1000000).toFixed(3);
            const convertedTime = convertUnixTimestamp(time);

            document.getElementById("miner").textContent = worker;
            document.getElementById("averageHashrate").textContent = averageMegaHash;
            document.getElementById("reportedHashrate").textContent = megaHashReported;
            document.getElementById("time").textContent = convertedTime;

        });

        const minerRevenue = `${user.wallet}/currentStats`;
        const responseRevenue = await fetch(api + minerRevenue, myInit);
        const rev = responseRevenue.json().then(res => {
            if (res.data.isEmpty) {
                const message = "Data is empty. Check miner current activity!";
                throw new Error(message);
            }

            const {unpaid, coinsPerMin} = res.data;
            const eth = (Math.pow(10, -18) * unpaid).toFixed(6);
            document.getElementById("unpaidRevenue").textContent = eth;
            document.getElementById("estimatedEarnings").textContent = coinsPerMin;
        });
    }
}

function reload(div){
    const container = document.getElementById(div);
    const content = container.innerHTML;
    container.innerHTML = content;

    //this line is to watch the result in console , you can remove it later
    console.log("Refreshed");
}

document.getElementById("submit").onclick = getMinerStats;

//TODO : appendchild only once if child already exist in DOM
//TODO : Loop through the data keys to get values
//TODO : Automatic update using a defined period of time