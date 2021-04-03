import convertUnixTimestamp from "../utils/utils.js";

const api = "https://api.ethermine.org/"
const myHeaders = new Headers()
const myInit = {
    method: 'GET',
    headers: myHeaders,
    mode: 'cors',
    cache: 'default'
}

export async function getPriceStats() {
    const poolStatsUrl = api + 'poolStats'

    const response = await fetch(poolStatsUrl, myInit)
    if (!response.ok) {
        const message = `An error has occurred: ${response.status}`
        throw new Error(message)
    }

    const result = response.json().then(res => {
        if (res.data.isEmpty) {
            const message = "Data is empty. Check miner current activity!"
            throw new Error(message)
        }

        const {usd, btc} = res.data.price
        const {hashRate, miners, workers, blocksPerHour} = res.data.poolStats
        const {minedBlocks} = res.data
        const timeArray = []
        const minersArray = []
        const numberArray = []

        document.getElementById("usd-price").textContent = usd
        document.getElementById("btc-price").textContent = btc
        document.getElementById("hash-rate").textContent = (hashRate * Math.pow(10, -12)).toFixed(3)
        document.getElementById("miners").textContent = miners
        document.getElementById("workers").textContent = workers
        document.getElementById("blocksPerHour").textContent = blocksPerHour

        let result = minedBlocks.map(({number, miner, time}) => {
                const convertedTime = convertUnixTimestamp(time)

                timeArray.push(convertedTime)
                numberArray.push(parseFloat(number))
                minersArray.push(miner)
            }
        )
        console.log(minersArray)
        //minersBarChart(timeArray, minersArray)
        updateTableHTML(timeArray, minersArray, numberArray)
    })
}

function updateTableHTML(myArray1, myArray2, myArray3) {
    var tableBody = document.getElementById("miners-pool-chart");

    // Reset the table
    tableBody.innerHTML = "";

    let newRow1 = document.createElement("tr")
    let newRow2 = document.createElement("tr")
    let newRow3 = document.createElement("tr")

    // Build the new table
    myArray1.forEach(function(row) {

        let newCell1 = document.createElement("td");
        tableBody.appendChild(newRow1);

        if (row instanceof Array) {
            row.forEach(function(cell) {
                var newCell1 = document.createElement("td");
                newCell1.textContent = cell
                newRow1.appendChild(newCell1)
            })
        } else {
            newCell1.textContent = row;
            newRow1.appendChild(newCell1);
        }
    })

    myArray2.forEach(function(row) {
        let newCell2 = document.createElement("td");
        tableBody.appendChild(newRow2);

        if (row instanceof Array) {
            row.forEach(function(cell) {
                var newCell2 = document.createElement("td");
                newCell2.textContent = cell
                newRow2.appendChild(newCell2)
            })
        } else {
            newCell2.textContent = row;
            newRow2.appendChild(newCell2);
        }
    })

    myArray3.forEach(function(row) {
        let newCell3 = document.createElement("td");
        tableBody.appendChild(newRow3);

        if (row instanceof Array) {
            row.forEach(function(cell) {
                var newCell3 = document.createElement("td");
                newCell3.textContent = cell
                newRow3.appendChild(newCell3)
            })
        } else {
            newCell3.textContent = row;
            newRow3.appendChild(newCell3);
        }
    })
}