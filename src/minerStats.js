import convertUnixTimestamp from "../utils/utils.js"
import displayChart from "../utils/handleHashrateChart.js"
import sharesChart from "../utils/handleSharesChart.js"

const api = "https://api.ethermine.org/miner/"
const myHeaders = new Headers()
const myInit = {
    method: 'GET',
    headers: myHeaders,
    mode: 'cors',
    cache: 'default'
}

async function getMinerStats() {
    let user = {}
    user.wallet = document.getElementById("wallet").value
    const minerStats = `${user.wallet}/workers`
    const minerRevenue = `${user.wallet}/currentStats`
    const minerDashboard = `${user.wallet}/dashboard`

    const response = await fetch(api + minerStats, myInit)
    if (!response.ok) {
        const message = `An error has occurred: ${response.status}`
        throw new Error(message)
    }

    const result = response.json().then(res => {
        if (res.data[0].isEmpty) {
            const message = "Data is empty. Check miner current activity!"
            throw new Error(message)
        }
        const {
            worker,
            time,
            lastSeen,
            reportedHashrate,
            currentHashrate,
            validShares,
            invalidShares,
            staleShares,
            averageHashrate
        } = res.data[0]
        const averageMegaHash = (averageHashrate / 1000000).toFixed(3)
        const megaHashReported = (reportedHashrate / 1000000).toFixed(3)
        const megaHashCurrent = (currentHashrate / 1000000).toFixed(3)
        const convertedTime = convertUnixTimestamp(time)

        document.getElementById("miner").textContent = worker
        document.getElementById("average-hashrate").textContent = averageMegaHash
        document.getElementById("reported-hashrate").textContent = megaHashReported
        document.getElementById("current-hashrate").textContent = megaHashCurrent
        document.getElementById("time").textContent = convertedTime
    })

    const responseRevenue = await fetch(api + minerRevenue, myInit)
    const rev = responseRevenue.json().then(res => {
        if (res.data.isEmpty) {
            const message = "Data is empty. Check miner current activity!"
            throw new Error(message)
        }

        const {unpaid, coinsPerMin} = res.data
        const eth = (Math.pow(10, -18) * unpaid).toFixed(6)
        document.getElementById("unpaid-revenue").textContent = eth
        document.getElementById("estimated-earnings").textContent = coinsPerMin
    })

    const responseDashboard = await fetch(api + minerDashboard, myInit)
    const dashboard = responseDashboard.json().then(res => {
        if (res.data.isEmpty) {
            const message = "Data is empty. Check miner current activity!"
            throw new Error(message)
        }
        const {statistics} = res.data
        const timeArray = []
        const currentHashrateArray = []
        const reportedHashrateArray = []
        const validSharesArray = []
        const invalidSharesArray = []
        const staleSharesArray = []

        let result = statistics.map(({
                                         time,
                                         reportedHashrate,
                                         currentHashrate,
                                         validShares,
                                         invalidShares,
                                         staleShares
                                     }) => {
                const convertedTime = convertUnixTimestamp(time)
                const convertedCurrentHashrate = (currentHashrate / 1000000).toFixed(3)
                const convertedReportedHashrate = (reportedHashrate / 1000000).toFixed(3)

                timeArray.push(convertedTime)
                currentHashrateArray.push(parseFloat(convertedCurrentHashrate))
                reportedHashrateArray.push(parseFloat(convertedReportedHashrate))
                validSharesArray.push(parseFloat(validShares))
                invalidSharesArray.push(parseFloat(invalidShares))
                staleSharesArray.push(parseFloat(staleShares))
            }
        )
        displayChart(timeArray, currentHashrateArray, reportedHashrateArray)
        sharesChart(timeArray, validSharesArray, staleSharesArray, invalidSharesArray)
    })
}

export function reload(div) {
    const container = document.getElementsByClassName(div)
    const content = container.innerHTML
    container.innerHTML = content
}

function startTimer(duration, display) {
    var timer = duration, minutes, seconds
    setInterval(function () {
        minutes = parseInt(timer / 60, 10)
        seconds = parseInt(timer % 60, 10)

        minutes = minutes < 10 ? "0" + minutes : minutes
        seconds = seconds < 10 ? "0" + seconds : seconds

        display.textContent = minutes + ":" + seconds

        if (--timer < 0) {
            timer = duration
        }
    }, 1000)
}

export async function rollingTimer() {
    const xMinutes = 60 * 10,
        display = document.querySelector('#countdown')
    startTimer(xMinutes, display)
    await getMinerStats()
}


//TODO : Automatic update using a defined period of time (almost done)