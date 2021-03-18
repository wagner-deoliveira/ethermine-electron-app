const api = "https://api.ethermine.org/";
let myHeaders = new Headers();
let myInit = {
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
        const worker = response.json().then(data => {
            let listItem = document.createElement('li');
            listItem.appendChild(
                document.createElement('strong')
            ).textContent = worker.Name;
        })
        console.log(worker);
    }
}

getMinerStats().then(r => {});
