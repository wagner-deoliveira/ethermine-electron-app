const api = "https://api.ethermine.org/"
const myHeaders = new Headers()
const myInit = {
    method: 'GET',
    headers: myHeaders,
    mode: 'cors',
    cache: 'default'
}

async function getPriceStats() {
    let login, user = {}
    login = document.getElementById("login")
    login.onsubmit = async function (event) {
        event.preventDefault()
        user.wallet = document.getElementById("wallet").value
        const poolStats = api+'poolStats'

        const response = await fetch(poolStats, myInit)
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
            document.getElementById("usd-price").textContent = usd
            document.getElementById("btc-price").textContent = btc
        })
    }
}


document.getElementById("submit").addEventListener('click', async () => {
    await getPriceStats()
})