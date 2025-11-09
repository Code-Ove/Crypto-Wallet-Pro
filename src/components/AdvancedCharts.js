import React, { useState } from 'react';
import styled from 'styled-components';
import { Line, Bar } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    BarElement,
    Title,
    Tooltip,
    Legend,
    TimeScale,
    Filler
} from 'chart.js';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    BarElement,
    Title,
    Tooltip,
    Legend,
    TimeScale,
    Filler
);

const ChartsContainer = styled.div`
  background: ${props => props.theme.colors.surface};
  border: 1px solid ${props => props.theme.colors.border};
  border-radius: 16px;
  padding: 24px;
  margin: 20px 0;
`;

const ChartHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  flex-wrap: wrap;
  gap: 15px;
`;

const ChartControls = styled.div`
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
`;

const TimeframeButton = styled.button`
  padding: 8px 16px;
  background: ${props => props.active ? props.theme.colors.primary : 'transparent'};
  border: 1px solid ${props => props.theme.colors.border};
  border-radius: 20px;
  color: ${props => props.active ? 'white' : props.theme.colors.text};
  cursor: pointer;
  font-size: 14px;
  
  &:hover {
    background: ${props => props.active ? props.theme.colors.primary : props.theme.colors.surfaceLight};
  }
`;

const ChartTypeButton = styled.button`
  padding: 8px 16px;
  background: ${props => props.active ? props.theme.colors.primary : 'transparent'};
  border: 1px solid ${props => props.theme.colors.border};
  border-radius: 8px;
  color: ${props => props.active ? 'white' : props.theme.colors.text};
  cursor: pointer;
  font-size: 14px;
`;

const ChartArea = styled.div`
  height: 400px;
  position: relative;
`;

const IndicatorSelector = styled.div`
  display: flex;
  gap: 10px;
  margin-top: 20px;
  flex-wrap: wrap;
`;

const IndicatorButton = styled.button`
  padding: 6px 12px;
  background: ${props => props.active ? props.theme.colors.primary : 'transparent'};
  border: 1px solid ${props => props.theme.colors.border};
  border-radius: 16px;
  color: ${props => props.active ? 'white' : props.theme.colors.text};
  cursor: pointer;
  font-size: 12px;
`;

const AdvancedCharts = () => {
    const [timeframe, setTimeframe] = useState('1D');
    const [chartType, setChartType] = useState('line');
    const [indicators, setIndicators] = useState({
        sma: true,
        ema: false,
        bollinger: false,
        rsi: false,
        macd: false
    });

    const timeframes = ['1H', '4H', '1D', '1W', '1M', '1Y'];
    const chartTypes = ['line', 'candle', 'bar', 'area'];

    // Mock price data
    const generatePriceData = () => {
        const data = [];
        let price = 1800;
        const baseTime = new Date('2024-01-01').getTime();

        for (let i = 0; i < 100; i++) {
            const volatility = 0.02;
            const change = price * volatility * (Math.random() - 0.5);
            price += change;

            data.push({
                time: new Date(baseTime + i * 24 * 60 * 60 * 1000),
                price: price,
                volume: Math.random() * 1000000
            });
        }

        return data;
    };

    const priceData = generatePriceData();

    const chartData = {
        labels: priceData.map(d => d.time.toLocaleDateString()),
        datasets: [
            {
                label: 'ETH Price',
                data: priceData.map(d => d.price),
                borderColor: '#6366f1',
                backgroundColor: chartType === 'area' ? 'rgba(99, 102, 241, 0.1)' : 'transparent',
                borderWidth: 2,
                fill: chartType === 'area',
                tension: 0.4
            },
            indicators.sma && {
                label: 'SMA (20)',
                data: priceData.map((d, i) => {
                    if (i < 20) return null;
                    const slice = priceData.slice(i - 20, i);
                    return slice.reduce((sum, item) => sum + item.price, 0) / 20;
                }),
                borderColor: '#f59e0b',
                borderWidth: 1,
                borderDash: [5, 5],
                pointRadius: 0,
                fill: false
            },
            indicators.ema && {
                label: 'EMA (12)',
                data: priceData.map((d, i) => {
                    if (i < 12) return null;
                    // Simple EMA calculation
                    const multiplier = 2 / (12 + 1);
                    let ema = priceData[i - 12].price;
                    for (let j = i - 11; j <= i; j++) {
                        ema = (priceData[j].price - ema) * multiplier + ema;
                    }
                    return ema;
                }),
                borderColor: '#10b981',
                borderWidth: 1,
                pointRadius: 0,
                fill: false
            }
        ].filter(Boolean)
    };

    const volumeData = {
        labels: priceData.map(d => d.time.toLocaleDateString()),
        datasets: [
            {
                label: 'Volume',
                data: priceData.map(d => d.volume),
                backgroundColor: priceData.map((d, i) =>
                    i > 0 && d.price > priceData[i - 1].price ? '#10b981' : '#ef4444'
                ),
                borderColor: priceData.map((d, i) =>
                    i > 0 && d.price > priceData[i - 1].price ? '#10b981' : '#ef4444'
                ),
                borderWidth: 1
            }
        ]
    };

    const chartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        interaction: {
            mode: 'index',
            intersect: false
        },
        plugins: {
            legend: {
                position: 'top',
                labels: {
                    color: '#94a3b8',
                    usePointStyle: true
                }
            },
            tooltip: {
                backgroundColor: '#1a1b2f',
                titleColor: '#ffffff',
                bodyColor: '#94a3b8',
                borderColor: '#2d3748',
                borderWidth: 1
            }
        },
        scales: {
            x: {
                grid: {
                    color: 'rgba(255, 255, 255, 0.1)'
                },
                ticks: {
                    color: '#94a3b8'
                }
            },
            y: {
                grid: {
                    color: 'rgba(255, 255, 255, 0.1)'
                },
                ticks: {
                    color: '#94a3b8',
                    callback: function (value) {
                        return '$' + value.toLocaleString();
                    }
                }
            }
        }
    };

    const volumeOptions = {
        ...chartOptions,
        scales: {
            ...chartOptions.scales,
            y: {
                ...chartOptions.scales.y,
                ticks: {
                    color: '#94a3b8',
                    callback: function (value) {
                        if (value >= 1000000) return (value / 1000000).toFixed(1) + 'M';
                        if (value >= 1000) return (value / 1000).toFixed(0) + 'K';
                        return value;
                    }
                }
            }
        }
    };

    const toggleIndicator = (indicator) => {
        setIndicators(prev => ({
            ...prev,
            [indicator]: !prev[indicator]
        }));
    };

    return (
        <ChartsContainer>
            <ChartHeader>
                <div>
                    <h3>Advanced Charts</h3>
                    <p style={{ color: '#94a3b8', margin: 0 }}>
                        ETH/USD • ${priceData[priceData.length - 1]?.price.toFixed(2)}
                        <span style={{ color: '#10b981', marginLeft: '10px' }}>
                            +2.5% (24h)
                        </span>
                    </p>
                </div>

                <ChartControls>
                    <div style={{ display: 'flex', gap: '5px' }}>
                        {timeframes.map(tf => (
                            <TimeframeButton
                                key={tf}
                                active={timeframe === tf}
                                onClick={() => setTimeframe(tf)}
                            >
                                {tf}
                            </TimeframeButton>
                        ))}
                    </div>

                    <div style={{ display: 'flex', gap: '5px' }}>
                        {chartTypes.map(type => (
                            <ChartTypeButton
                                key={type}
                                active={chartType === type}
                                onClick={() => setChartType(type)}
                            >
                                {type.charAt(0).toUpperCase() + type.slice(1)}
                            </ChartTypeButton>
                        ))}
                    </div>
                </ChartControls>
            </ChartHeader>

            <ChartArea>
                {chartType === 'bar' ? (
                    <Bar data={chartData} options={chartOptions} />
                ) : (
                    <Line data={chartData} options={chartOptions} />
                )}
            </ChartArea>

            <div style={{ height: '150px', marginTop: '20px' }}>
                <Bar data={volumeData} options={volumeOptions} />
            </div>

            <IndicatorSelector>
                <span style={{ color: '#94a3b8', fontSize: '14px' }}>Indicators:</span>
                {Object.keys(indicators).map(indicator => (
                    <IndicatorButton
                        key={indicator}
                        active={indicators[indicator]}
                        onClick={() => toggleIndicator(indicator)}
                    >
                        {indicator.toUpperCase()}
                    </IndicatorButton>
                ))}
            </IndicatorSelector>

            <div style={{
                marginTop: '20px',
                padding: '15px',
                background: '#1a1b2f',
                borderRadius: '8px',
                fontSize: '14px',
                color: '#94a3b8'
            }}>
                <strong>Chart Features:</strong> Zoom with mouse wheel • Pan by dragging •
                Click legend to toggle datasets • Hover for detailed values
            </div>
        </ChartsContainer>
    );
};

export default AdvancedCharts;