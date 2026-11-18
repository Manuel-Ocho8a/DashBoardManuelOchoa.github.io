// Base de datos de Manuel
const chartData = {
    all: {
        labels: ['Abdominales', 'Dorsales', 'Bupper', 'Sentadillas', 'Bícep', 'Trícep', 'Lateral', 'T. Cooper (Vueltas)'],
        september: [26, 51, 17, 33, 12, 23, 17, 30],
        november: [19, 47, 19, 36, 19, 30, 28, 28]
    },
    superior: {
        labels: ['Dorsales', 'Bícep', 'Trícep', 'Lateral'],
        september: [51, 12, 23, 17],
        november: [47, 19, 30, 28]
    },
    inferior: {
        labels: ['Sentadillas'],
        september: [33],
        november: [36]
    },
    cardio: {
        labels: ['Abdominales', 'Bupper', 'T. Cooper (Vueltas)'],
        september: [26, 17, 30],
        november: [19, 19, 28]
    }
};

const jumpData = {
    labels: ['Salto 1', 'Salto 2'],
    september: [1.74, 1.88],
    november: [1.26, 1.50]
};

let performanceChart;
let jumpChart;

function initCharts() {
    const ctxMain = document.getElementById('performanceChart').getContext('2d');
    
    let gradientSep = ctxMain.createLinearGradient(0, 0, 0, 400);
    gradientSep.addColorStop(0, 'rgba(34, 211, 238, 0.8)');
    gradientSep.addColorStop(1, 'rgba(34, 211, 238, 0.2)');

    let gradientNov = ctxMain.createLinearGradient(0, 0, 0, 400);
    gradientNov.addColorStop(0, 'rgba(173, 255, 47, 0.8)');
    gradientNov.addColorStop(1, 'rgba(173, 255, 47, 0.2)');

    performanceChart = new Chart(ctxMain, {
        type: 'bar',
        data: {
            labels: chartData.all.labels,
            datasets: [
                {
                    label: 'Sep-12-2026',
                    data: chartData.all.september,
                    backgroundColor: gradientSep,
                    borderColor: '#22d3ee',
                    borderWidth: 1,
                    borderRadius: 4
                },
                {
                    label: 'Nov-14-2026',
                    data: chartData.all.november,
                    backgroundColor: gradientNov,
                    borderColor: '#ADFF2F',
                    borderWidth: 1,
                    borderRadius: 4
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: { labels: { color: '#9ca3af', font: { family: "'Inter', sans-serif" } } },
                tooltip: { backgroundColor: 'rgba(10, 25, 47, 0.9)', titleColor: '#ADFF2F', bodyColor: '#fff', borderColor: 'rgba(173, 255, 47, 0.3)', borderWidth: 1, padding: 10 }
            },
            scales: {
                y: { beginAtZero: true, grid: { color: 'rgba(255, 255, 255, 0.05)' }, ticks: { color: '#9ca3af' } },
                x: { grid: { display: false }, ticks: { color: '#9ca3af' } }
            },
            animation: { duration: 500, easing: 'easeOutQuart' }
        }
    });

    const ctxJump = document.getElementById('jumpChart').getContext('2d');
    
    jumpChart = new Chart(ctxJump, {
        type: 'line',
        data: {
            labels: jumpData.labels,
            datasets: [
                {
                    label: 'Sep-12',
                    data: jumpData.september,
                    borderColor: '#22d3ee',
                    backgroundColor: 'rgba(34, 211, 238, 0.2)',
                    pointBackgroundColor: '#22d3ee',
                    pointBorderColor: '#fff',
                    pointHoverBackgroundColor: '#fff',
                    pointHoverBorderColor: '#22d3ee',
                    fill: true,
                    tension: 0.4
                },
                {
                    label: 'Nov-14',
                    data: jumpData.november,
                    borderColor: '#ADFF2F',
                    backgroundColor: 'rgba(173, 255, 47, 0.2)',
                    pointBackgroundColor: '#ADFF2F',
                    pointBorderColor: '#0A192F',
                    pointHoverBackgroundColor: '#0A192F',
                    pointHoverBorderColor: '#ADFF2F',
                    fill: true,
                    tension: 0.4
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: { position: 'bottom', labels: { color: '#9ca3af', font: { family: "'Inter', sans-serif" } } },
                tooltip: { backgroundColor: 'rgba(10, 25, 47, 0.9)', titleColor: '#fff', bodyColor: '#fff', borderColor: 'rgba(255, 255, 255, 0.1)', borderWidth: 1 }
            },
            scales: {
                y: { min: 1.0, max: 2.0, grid: { color: 'rgba(255, 255, 255, 0.05)' }, ticks: { color: '#9ca3af', callback: function(value) { return value + 'm'; } } },
                x: { grid: { display: false }, ticks: { color: '#9ca3af' } }
            }
        }
    });
}

function filterChart(category) {
    performanceChart.data.labels = chartData[category].labels;
    performanceChart.data.datasets[0].data = chartData[category].september;
    performanceChart.data.datasets[1].data = chartData[category].november;
    performanceChart.update();

    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.classList.remove('tab-active', 'text-gray-900');
        btn.classList.add('text-gray-400');
    });
    
    const activeBtn = document.getElementById(`btn-${category}`);
    activeBtn.classList.add('tab-active');
    activeBtn.classList.remove('text-gray-400');
}

// NUEVAS FUNCIONES PARA EL MODAL DE IMÁGENES
function openModal(imageSrc) {
    const modal = document.getElementById('imageModal');
    const modalImg = document.getElementById('modalImg');
    
    modalImg.src = imageSrc;
    modal.classList.add('active');
    // Bloquea el scroll del fondo mientras está abierto
    document.body.style.overflow = 'hidden'; 
}

function closeModal(event) {
    const modal = document.getElementById('imageModal');
    
    // Cierra el modal SOLO si tocas el fondo negro, no si tocas la imagen misma
    if (event.target === modal) {
        modal.classList.remove('active');
        // Restaura el scroll del fondo
        document.body.style.overflow = 'auto';
    }
}

window.onload = initCharts;