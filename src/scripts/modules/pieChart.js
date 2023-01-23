import Chart from 'chart.js/auto'

const pieChart = (nonComplete, complete) => {
    return new Chart(
        document.getElementById('js-completed-todos'),
        {
            type: 'pie',
            data: {
                labels: [
                    'Neodrađeno',
                    'Odrađeno',
                ],
                datasets: [{
                    data: [nonComplete, complete],
                    backgroundColor: [
                        'rgb(255, 99, 132)',
                        'rgb(54, 162, 235)'
                    ],
                    hoverOffset: 4
                }]
            }
        }
    );
};

export default pieChart;