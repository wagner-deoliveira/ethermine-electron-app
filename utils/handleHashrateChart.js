function displayChart (dataX, dataY1, dataY2, dataY3) {
    const ctx = document.getElementById('statsChart').getContext('2d');
    const myChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: dataX,
            datasets: [{
                label: 'Current Hashrate',
                fill: false,
                data: dataY1,
                backgroundColor: [
                    //'rgba(255, 99, 132, 0.2)',
                    //'rgba(54, 162, 235, 0.2)',
                    //'rgba(255, 206, 86, 0.2)',
                    //'rgba(75, 192, 192, 0.2)',
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
                    //'rgba(255, 99, 132, 0.2)',
                    //'rgba(54, 162, 235, 0.2)',
                    //'rgba(255, 206, 86, 0.2)',
                    //'rgba(75, 192, 192, 0.2)',
                    'rgba(255, 159, 64, 0.8)'
                ],
                borderColor: [
                    'rgba(255, 159, 64, 0.8)'
                ],
                borderWidth: 1
            },
                {
                    label: 'Average Hashrate',
                    fill: false,
                    data: dataY3,
                    backgroundColor: [
                        //'rgba(255, 99, 132, 0.2)',
                        'rgba(54, 162, 235, 0.2)'
                    ],
                    borderColor: [
                        'rgba(54, 162, 235, 0.2)'
                    ],
                    borderWidth: 1
                }]
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