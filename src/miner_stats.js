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
            let para = document.createElement("p");
            let node = document.createTextNode(JSON.stringify(res.data));
            para.appendChild(node)

            let element = document.getElementsByClassName("boxed")[0];
            element.appendChild(para);
        })
        console.log(result);
    }
}

getMinerStats();
