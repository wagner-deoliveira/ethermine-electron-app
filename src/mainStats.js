import {reload, rollingTimer} from "./minerStats.js";
import {getPriceStats} from "./poolStats.js";


document.getElementById("submit").addEventListener('click', async () => {
    event.preventDefault()
    reload("server")
    await rollingTimer()
    await getPriceStats()
})