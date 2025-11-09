import React from 'react';
import styled from 'styled-components';
import { Line } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    Filler
} from 'chart.js';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    Filler
);

const ChartContainer = styled.div`
  background: ${props => props.theme.colors.surface};
  border: 1px solid ${props => props.theme.colors.border};
  border-radius: 16px;
  padding: 24px;
  margin: 20px 0;
`;

const PortfolioChart = () => {
    const data = {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
        datasets: [
            {
                label: 'Portfolio Value',
                data: [5000, 7500, 6200, 8900, 11000, 9500, 12500],
                borderColor: '#6366f1',
                backgroundColor: 'rgba(99, 102, 241, 0.1)',
                borderWidth: 3,
                tension: 0.4,
                fill: true,
                pointBackgroundColor: '#6366f1',
                pointBorderColor: '#ffffff',
                pointBorderWidth: 2,
                pointRadius: 6,
                pointHoverRadius: 8
            }
        ]
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                display: false
            },
            tooltip: {
                backgroundColor: '#1a1b2f',
                titleColor: '#ffffff',
                bodyColor: '#94a3b8',
                borderColor: '#2d3748',
                borderWidth: 1,
                displayColors: false,
                callbacks: {
                    label: function (context) {
                        return `$${context.parsed.y.toLocaleString()}`;
                    }
                }
            }
        },
        scales: {
            x: {
                grid: {
                    color: 'rgba(255, 255, 255, 0.1)',
                    drawBorder: false
                },
                ticks: {
                    color: '#94a3b8'
                }
            },
            y: {
                grid: {
                    color: 'rgba(255, 255, 255, 0.1)',
                    drawBorder: false
                },
                ticks: {
                    color: '#94a3b8',
                    callback: function (value) {
                        return '$' + value.toLocaleString();
                    }
                }
            }
        },
        interaction: {
            intersect: false,
            mode: 'index'
        },
        elements: {
            line: {
                tension: 0.4
            }
        }
    };

    return (
        <ChartContainer>
            <h3>Portfolio Performance</h3>
            <div style={{ height: '300px', marginTop: '20px' }}>
                <Line data={data} options={options} />
            </div>
            <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                marginTop: '20px',
                color: '#94a3b8',
                fontSize: '14px'
            }}>
                <div>
                    <div>Current Value</div>
                    <div style={{ color: '#ffffff', fontWeight: '600', fontSize: '18px' }}>
                        $12,450.75
                    </div>
                </div>
                <div style={{ textAlign: 'right' }}>
                    <div>24h Change</div>
                    <div style={{ color: '#10b981', fontWeight: '600', fontSize: '18px' }}>
                        +2.5%
                    </div>
                </div>
            </div>
        </ChartContainer>
    );
};

export default PortfolioChart;