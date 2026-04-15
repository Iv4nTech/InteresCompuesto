let chartInstance = null;

document.getElementById('calculator-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const capital = document.getElementById('capital').value;
    const rate = document.getElementById('rate').value;
    const compoundFreq = document.getElementById('compound_frequency').value;
    const timeValue = document.getElementById('time_value').value;
    const timeUnit = document.getElementById('time_unit').value;
    
    const response = await fetch('/calculate', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            capital: capital,
            rate: rate,
            compound_frequency: compoundFreq,
            time_value: timeValue,
            time_unit: timeUnit
        })
    });
    
    const data = await response.json();
    const errorBox = document.getElementById('error-box');
    
    if(data.success) {
        errorBox.style.display = 'none';
        document.getElementById('results-container').style.display = 'block';
        
        // Formateo de moneda
        document.getElementById('final-amount').innerText = '$' + data.total.toLocaleString('es-ES', { 
            minimumFractionDigits: 2, 
            maximumFractionDigits: 2 
        });
        
        renderChart(data.labels, data.data);
        
        // Scroll suave a los resultados
        document.getElementById('results-container').scrollIntoView({ behavior: 'smooth', block: 'start' });
    } else {
        errorBox.innerText = data.error;
        errorBox.style.display = 'block';
        document.getElementById('results-container').style.display = 'none';
        errorBox.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
});

function renderChart(labels, data) {
    const ctx = document.getElementById('compoundChart').getContext('2d');
    
    if (chartInstance) {
        chartInstance.destroy();
    }
    
    chartInstance = new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [{
                label: 'Crecimiento del Capital',
                data: data,
                borderColor: '#0066FF',
                backgroundColor: 'rgba(0, 102, 255, 0.1)',
                borderWidth: 3,
                pointBackgroundColor: '#FFFFFF',
                pointBorderColor: '#0066FF',
                pointBorderWidth: 2,
                pointRadius: 4,
                pointHoverRadius: 6,
                fill: true,
                tension: 0.4
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: { display: false },
                tooltip: {
                    backgroundColor: 'rgba(0, 0, 0, 0.8)',
                    titleFont: { family: "'Inter', sans-serif", size: 13 },
                    bodyFont: { family: "'Inter', sans-serif", size: 14 },
                    padding: 10,
                    displayColors: false,
                    callbacks: {
                        label: function(context) {
                            let label = context.dataset.label || '';
                            if (label) label += ': ';
                            if (context.parsed.y !== null) {
                                label += new Intl.NumberFormat('es-ES', { style: 'currency', currency: 'USD' }).format(context.parsed.y);
                            }
                            return label;
                        }
                    }
                }
            },
            scales: {
                y: {
                    beginAtZero: false,
                    grid: { color: 'rgba(0, 0, 0, 0.05)', drawBorder: false },
                    ticks: {
                        font: { family: "'Inter', sans-serif" },
                        color: '#6e6e73',
                        callback: function(value) { return '$' + value.toLocaleString(); }
                    }
                },
                x: {
                    grid: { display: false, drawBorder: false },
                    ticks: {
                        font: { family: "'Inter', sans-serif" },
                        color: '#6e6e73'
                    }
                }
            },
            interaction: {
                intersect: false,
                mode: 'index',
            },
        }
    });
}
