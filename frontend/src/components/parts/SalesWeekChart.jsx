import React from 'react'
import { Bar } from 'react-chartjs-2';

export const SalesWeekChart = ({data}) => {

    const labels = data.map(entry => entry.fecha);
    const ventas = data.map(entry => entry.total_ventas);

    const chartData = {
        labels: labels,
        datasets: [
            {
                label: 'Total de Ventas',
                backgroundColor: 'rgba(75,192,192,1)',
                borderColor: 'rgba(0,0,0,1)',
                borderWidth: 2,
                data: ventas
            }
        ]
    };

    return (
        <div>
            <h2>Ventas de la última semana</h2>
            <Bar
                data={chartData}
                options={{
                    scales: {
                        yAxes: [
                            {
                                ticks: {
                                    beginAtZero: true
                                }
                            }
                        ]
                    }
                }}
            />
        </div>
    )
}
