import convertUnixTimestamp from "../utils/utils.js";
import minersBarChart from "../utils/handleMinersChart.js";

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
        const {minedBlocks} = res.data.minedBlocks
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
                minersArray.push(parseFloat(miner))
            }
        )
        minersBarChart(numberArray, timeArray, minersArray)
    })
}