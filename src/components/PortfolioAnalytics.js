import React from 'react';
import styled from 'styled-components';
import { Doughnut, Bar } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    ArcElement,
    Title,
    Tooltip,
    Legend
} from 'chart.js';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    ArcElement,
    Title,
    Tooltip,
    Legend
);

const AnalyticsContainer = styled.div`
  background: ${props => props.theme.colors.surface};
  border: 1px solid ${props => props.theme.colors.border};
  border-radius: 16px;
  padding: 24px;
  margin: 20px 0;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 30px;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const ChartContainer = styled.div`
  background: ${props => props.theme.colors.surfaceLight};
  border-radius: 12px;
  padding: 20px;
  margin: 15px 0;
`;

const MetricGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 15px;
  margin: 20px 0;
`;

const MetricCard = styled.div`
  background: ${props => props.theme.colors.surfaceLight};
  border-radius: 8px;
  padding: 15px;
  text-align: center;
`;

const MetricValue = styled.div`
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 5px;
  color: ${props => props.theme.colors.primary};
`;

const MetricLabel = styled.div`
  font-size: 12px;
  color: ${props => props.theme.colors.textSecondary};
`;

const PortfolioAnalytics = () => {
    const allocationData = {
        labels: ['Ethereum', 'Bitcoin', 'Stablecoins', 'DeFi Tokens', 'NFTs'],
        datasets: [
            {
                data: [40, 25, 20, 10, 5],
                backgroundColor: [
                    '#6366f1',
                    '#f59e0b',
                    '#10b981',
                    '#8b5cf6',
                    '#ec4899'
                ],
                borderWidth: 2,
                borderColor: '#1a1b2f'
            }
        ]
    };

    const performanceData = {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
        datasets: [
            {
                label: 'Portfolio Value',
                data: [5000, 7500, 6200, 8900, 11000, 12500],
                backgroundColor: '#6366f1',
                borderColor: '#6366f1',
                borderWidth: 2,
                fill: false
            }
        ]
    };

    const chartOptions = {
        responsive: true,
        plugins: {
            legend: {
                position: 'bottom',
                labels: {
                    color: '#94a3b8',
                    padding: 20
                }
            }
        }
    };

    const barOptions = {
        responsive: true,
        plugins: {
            legend: {
                display: false
            }
        },
        scales: {
            y: {
                grid: {
                    color: 'rgba(255, 255, 255, 0.1)'
                },
                ticks: {
                    color: '#94a3b8'
                }
            },
            x: {
                grid: {
                    color: 'rgba(255, 255, 255, 0.1)'
                },
                ticks: {
                    color: '#94a3b8'
                }
            }
        }
    };

    return (
    <AnalyticsContainer>
      <h3>Portfolio Analytics</h3>
      
      <MetricGrid>
        <MetricCard>
          <MetricValue>+24.5%</MetricValue>
          <MetricLabel>Total Return</MetricLabel>
        </MetricCard>
        <MetricCard>
          <MetricValue>$12,450</MetricValue>
          <MetricLabel>Portfolio Value</MetricLabel>
        </MetricCard>
        <MetricCard>
          <MetricValue>+$2,450</MetricValue>
          <MetricLabel>Profit/Loss</MetricLabel>
        </MetricCard>
        <MetricCard>
          <MetricValue>8</MetricValue>
          <MetricLabel>Assets</MetricLabel>
        </MetricCard>
      </MetricGrid>

      <Grid>
        <div>
          <h4>Asset Allocation</h4>
          <ChartContainer>
            <Doughnut data={allocationData} options={chartOptions} />
          </ChartContainer>
        </div>
        
        <div>
          <h4>Performance</h4>
          <ChartContainer>
            <Bar data={performanceData} options={barOptions} />
          </ChartContainer>
        </div>
      </Grid>

      <div>
        <h4>Risk Analysis</h4>
        <div style={{ 
          background: '#1a1b2f', 
          padding: '20px', 
          borderRadius: '12px',
          marginTop: '15px'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '15px' }}>
            <span>Portfolio Risk Score</span>
            <span style={{ color: '#10b981', fontWeight: '600' }}>Medium (6.2/10)</span>
          </div>
          <div style={{ 
            background: '#2d3748', 
            borderRadius: '10px', 
            height: '8px',
            marginBottom: '20px'
          }}>
            <div style={{ 
              background: '#10b981', 
              width: '62%', 
              height: '100%', 
              borderRadius: '10px' 
            }}></div>
          </div>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '15px' }}>
            <div>
              <div style={{ fontSize: '12px', color: '#94a3b8' }}>Volatility</div>
              <div style={{ fontWeight: '600' }}>Medium</div>
            </div>
            <div>
              <div style={{ fontSize: '12px', color: '#94a3b8' }}>Diversification</div>
              <div style={{ fontWeight: '600' }}>Good</div>
            </div>
            <div>
              <div style={{ fontSize: '12px', color: '#94a3b8' }}>Liquidity</div>
              <div style={{ fontWeight: '600' }}>High</div>
            </div>
            <div>
              <div style={{ fontSize: '12px', color: '#94a3b8' }}>Correlation</div>
              <div style={{ fontWeight: '600' }}>0.68</div>
            </div>
          </div>
        </div>
      </div>
    </AnalyticsContainer >
  );
};

export default PortfolioAnalytics;