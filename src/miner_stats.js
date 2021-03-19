const api = "https://api.ethermine.org/";
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
        const minerStats = `miner/${user.wallet}/workers`;
        const response = await fetch(api + minerStats, myInit);
        if (!response.ok) {
            const message = `An error has occurred: ${response.status}`;
            throw new Error(message);
        }

        const result = response.json().then(res => {
            let para1 = document.createElement("p");
            let worker = document.createTextNode(JSON.stringify(res.data[0].worker));
            para1.appendChild(worker)
            let elementWorker = document.getElementsByClassName("miner")[0];
            elementWorker.appendChild(para1);

            let para2 = document.createElement("p");
            let hashRate = document.createTextNode(JSON.stringify(res.data[0].averageHashrate));
            para2.appendChild(hashRate)
            let elementHashrate = document.getElementsByClassName("hashrate")[0];
            elementHashrate.appendChild(para2);
        })
        console.log(result);
    }
}

getMinerStats();
