require('dotenv').config();

const api = "https://api.ethermine.org/";
const minerStats = `miner/${process.env.MY_WALLET}/workers`;

let myHeaders = new Headers();
let myInit = {
    method: 'GET',
    headers: myHeaders,
    mode: 'cors',
    cache: 'default'
};


async function getMinerStats() {
    const response = await fetch(api + minerStats, myInit);
    if (!response.ok) {
        const message = `An error has occured: ${response.status}`;
        throw new Error(message);
    }
    const worker = response.json().then(data => {
        let listItem = document.createElement('li');
        listItem.appendChild(
            document.createElement('strong')
        ).textContent = worker.Name;
    })
    console.log(worker);
    return worker;
}