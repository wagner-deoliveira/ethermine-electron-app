function displayChart(dataX, dataY1, dataY2) {
    const ctx = document.getElementById('stats-chart').getContext('2d');
    const myChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: dataX,
            datasets: [{
                label: 'Current Hashrate',
                fill: false,
                data: dataY1,
                backgroundColor: [
                    'rgba(153, 102, 255, 0.2)'

                ],
                borderColor: [
                    'rgba(153, 102, 255, 1)'
                ],
                borderWidth: 1
            },
                {
                    label: 'Reported Hashrate',
                    fill: false,
                    data: dataY2,
                    backgroundColor: [
                        'rgba(255, 159, 64, 0.8)'
                    ],
                    borderColor: [
                        'rgba(255, 159, 64, 0.8)'
                    ],
                    borderWidth: 1
                }
            ]
        },

        options: {
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: false
                    }
                }]
            }
        }
    });
}

export default displayChart