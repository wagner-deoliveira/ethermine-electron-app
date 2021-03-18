const api = "https://api.ethermine.org/";
const wallet = "c0ddc2ed1355017398346ba3e5018ae3690e06c2";
const minerStats = `miner/${wallet}/workers`;

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
            // listItem.append(
            //     ` can be found in ${
            //         worker.Location
            //     }. Cost: `
            // );
            // listItem.appendChild(
            //     document.createElement('strong')
            // ).textContent = `£${product.Price}`;
            // myList.appendChild(listItem);

    })
    console.log(worker);
    return worker;
}