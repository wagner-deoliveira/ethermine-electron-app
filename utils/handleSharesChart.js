function sharesChart(dataX, dataY1, dataY2, dataY3) {
    const ctx = document.getElementById('sharesChart').getContext('2d');
    const myChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: dataX,
            datasets: [{
                label: 'Valid shares',
                fill: false,
                data: dataY1,
                backgroundColor: [
                    'rgba(54, 162, 235, 0.2)'
                ],
                borderColor: [
                    'rgba(54, 162, 235, 0.2)'
                ],
                borderWidth: 1
            },
                {
                    label: 'Stale shares',
                    fill: false,
                    data: dataY2,
                    backgroundColor: [
                        'rgba(255, 206, 86, 0.2)'
                    ],
                    borderColor: [
                        'rgba(255, 206, 86, 0.2))'
                    ],
                    borderWidth: 1
                },
                {
                    label: 'Invalid shares',
                    fill: false,
                    data: dataY3,
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.2)'
                    ],
                    borderColor: [
                        'rgba(255, 99, 132, 0.2)'
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

export default sharesChart