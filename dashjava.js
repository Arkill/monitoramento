// Dados para os gráficos
var vehicleData = {
    labels: ['Moto R15', 'Carro Celta'],
    avgSpeed: [50, 60],
    distance: [120, 150],
    activity: [5, 6]
};

// Função para criar gráficos
function createChart(ctx, type, data, label) {
    new Chart(ctx, {
        type: type,
        data: {
            labels: vehicleData.labels,
            datasets: [
                {
                    label: label,
                    data: data,
                    backgroundColor: [
                        'rgba(75, 192, 192, 0.2)',
                        'rgba(255, 99, 132, 0.2)'
                    ],
                    borderColor: [
                        'rgba(75, 192, 192, 1)',
                        'rgba(255, 99, 132, 1)'
                    ],
                    borderWidth: 1
                }
            ]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: 'top'
                },
                title: {
                    display: true,
                    text: label
                }
            },
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}

// Criação dos gráficos
document.addEventListener('DOMContentLoaded', function () {
    var avgSpeedCtx = document.getElementById('avgSpeedChart').getContext('2d');
    createChart(avgSpeedCtx, 'bar', vehicleData.avgSpeed, 'Velocidade Média');

    var distanceCtx = document.getElementById('distanceChart').getContext('2d');
    createChart(distanceCtx, 'line', vehicleData.distance, 'Distância');

    var activityCtx = document.getElementById('activityChart').getContext('2d');
    createChart(activityCtx, 'pie', vehicleData.activity, 'Atividade');
});
