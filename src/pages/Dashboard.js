import React from 'react';
import styled from 'styled-components';
import { useWallet } from '../hooks/useWallet';
import PortfolioChart from '../components/PortfolioChart';
import PortfolioAnalytics from '../components/PortfolioAnalytics';
import PriceAlerts from '../components/PriceAlerts';
import TransactionHistory from '../components/TransactionHistory';

const DashboardContainer = styled.div`
  padding: 20px 0;
`;

const WelcomeSection = styled.div`
  background: linear-gradient(135deg, ${props => props.theme.colors.primary}, ${props => props.theme.colors.secondary});
  border-radius: 20px;
  padding: 30px;
  color: white;
  margin-bottom: 30px;
  text-align: center;
`;

const WelcomeTitle = styled.h1`
  font-size: 2.5rem;
  margin-bottom: 10px;
  font-weight: 700;
`;

const WelcomeSubtitle = styled.p`
  font-size: 1.1rem;
  opacity: 0.9;
  margin-bottom: 20px;
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
  margin-bottom: 30px;
`;

const StatCard = styled.div`
  background: ${props => props.theme.colors.surface};
  border: 1px solid ${props => props.theme.colors.border};
  border-radius: 16px;
  padding: 24px;
  text-align: center;
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: ${props => props.theme.shadows.lg};
  }
`;

const StatValue = styled.div`
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 8px;
  color: ${props => props.theme.colors.primary};
`;

const StatLabel = styled.div`
  color: ${props => props.theme.colors.textSecondary};
  font-size: 0.9rem;
`;

const QuickActions = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 15px;
  margin-bottom: 30px;
`;

const ActionButton = styled.button`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  padding: 25px 20px;
  background: ${props => props.theme.colors.surface};
  border: 1px solid ${props => props.theme.colors.border};
  border-radius: 16px;
  color: ${props => props.theme.colors.text};
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 14px;
  font-weight: 600;
  
  &:hover {
    background: ${props => props.theme.colors.surfaceLight};
    transform: translateY(-2px);
    box-shadow: ${props => props.theme.shadows.md};
  }
`;

const ActionIcon = styled.div`
  font-size: 32px;
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background: ${props => props.theme.colors.surfaceLight};
  display: flex;
  align-items: center;
  justify-content: center;
`;

const FeaturesGrid = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 30px;
  
  @media (max-width: 1200px) {
    grid-template-columns: 1fr;
  }
`;

const MainFeatures = styled.div`
  display: flex;
  flex-direction: column;
  gap: 30px;
`;

const SideFeatures = styled.div`
  display: flex;
  flex-direction: column;
  gap: 30px;
`;

const Dashboard = () => {
    const { balance, address, isConnected, currentNetwork, networks, portfolioValue, createWallet } = useWallet();

    const quickActions = [
        { icon: '👛', label: 'Wallet', path: '/wallet', color: '#6366f1' },
        { icon: '🔄', label: 'Swap', path: '/swap', color: '#10b981' },
        { icon: '🌉', label: 'Bridge', path: '/bridge', color: '#8b5cf6' },
        { icon: '💰', label: 'Staking', path: '/staking', color: '#f59e0b' },
        { icon: '🏦', label: 'Lending', path: '/lending', color: '#ec4899' },
        { icon: '🖼', label: 'NFTs', path: '/nfts', color: '#06b6d4' },
        { icon: '📈', label: 'Trade', path: '/advanced-trade', color: '#84cc16' },
        { icon: '🌐', label: 'DApps', path: '/dapp-browser', color: '#f97316' }
    ];

    const stats = [
        { value: `$${portfolioValue.toLocaleString()}`, label: 'Portfolio Value' },
        { value: `${balance} ${networks[currentNetwork]?.symbol}`, label: 'Wallet Balance' },
        { value: '+12.5%', label: '24h Change', change: 'positive' },
        { value: '8', label: 'Assets' }
    ];

    if (!isConnected) {
        return (
            <DashboardContainer>
                <WelcomeSection>
                    <WelcomeTitle>🚀 CryptoWallet Pro</WelcomeTitle>
                    <WelcomeSubtitle>
                        Your all-in-one solution for cryptocurrency management, trading, and DeFi
                    </WelcomeSubtitle>
                    <p style={{ marginBottom: '30px', opacity: 0.8 }}>
                        Connect your wallet to access 30+ advanced features including cross-chain swaps,
                        yield farming, NFT management, and much more.
                    </p>
                    <button
                        className="btn btn-primary"
                        onClick={createWallet}
                        style={{
                            padding: '15px 30px',
                            fontSize: '16px',
                            fontWeight: '600'
                        }}
                    >
                        Create New Wallet
                    </button>
                </WelcomeSection>

                <FeaturesGrid>
                    <MainFeatures>
                        <div className="card">
                            <h3>🌟 Featured Capabilities</h3>
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px', marginTop: '20px' }}>
                                <div>
                                    <h4>🔄 Cross-Chain</h4>
                                    <p>Swap and bridge assets across multiple blockchains</p>
                                </div>
                                <div>
                                    <h4>🏦 DeFi Suite</h4>
                                    <p>Lending, borrowing, and yield farming in one place</p>
                                </div>
                                <div>
                                    <h4>🎨 NFT Gallery</h4>
                                    <p>Manage and display your NFT collection</p>
                                </div>
                                <div>
                                    <h4>🔒 Advanced Security</h4>
                                    <p>Multi-sig, social recovery, and hardware wallet support</p>
                                </div>
                            </div>
                        </div>
                    </MainFeatures>

                    <SideFeatures>
                        <div className="card">
                            <h3>📊 Why Choose CryptoWallet Pro?</h3>
                            <ul style={{ paddingLeft: '20px', lineHeight: '1.8' }}>
                                <li>30+ advanced features</li>
                                <li>Multi-chain support</li>
                                <li>Enterprise-grade security</li>
                                <li>User-friendly interface</li>
                                <li>Regular updates</li>
                            </ul>
                        </div>
                    </SideFeatures>
                </FeaturesGrid>
            </DashboardContainer>
        );
    }

    return (
        <DashboardContainer>
            <WelcomeSection style={{ textAlign: 'left', background: 'linear-gradient(135deg, #1a1b2f, #2d3748)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <div>
                        <WelcomeTitle style={{ fontSize: '2rem' }}>Welcome back! 👋</WelcomeTitle>
                        <WelcomeSubtitle>
                            Your crypto journey at a glance - manage, trade, and grow your portfolio
                        </WelcomeSubtitle>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                        <div style={{ fontSize: '0.9rem', opacity: 0.8 }}>Current Network</div>
                        <div style={{ fontSize: '1.1rem', fontWeight: '600' }}>
                            {networks[currentNetwork]?.name}
                        </div>
                    </div>
                </div>
            </WelcomeSection>

            <StatsGrid>
                {stats.map((stat, index) => (
                    <StatCard key={index}>
                        <StatValue>{stat.value}</StatValue>
                        <StatLabel>{stat.label}</StatLabel>
                    </StatCard>
                ))}
            </StatsGrid>

            <QuickActions>
                {quickActions.map((action, index) => (
                    <ActionButton
                        key={index}
                        onClick={() => window.location.href = action.path}
                        style={{ borderLeft: `4px solid ${action.color}` }}
                    >
                        <ActionIcon style={{ color: action.color }}>
                            {action.icon}
                        </ActionIcon>
                        {action.label}
                    </ActionButton>
                ))}
            </QuickActions>

            <FeaturesGrid>
                <MainFeatures>
                    <PortfolioChart />
                    <PortfolioAnalytics />
                    <TransactionHistory />
                </MainFeatures>

                <SideFeatures>
                    <PriceAlerts />
                    <div className="card">
                        <h3>📰 Market Overview</h3>
                        <div style={{ marginTop: '15px' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 0', borderBottom: '1px solid #2d3748' }}>
                                <span>BTC</span>
                                <span style={{ color: '#10b981' }}>+2.3%</span>
                                <span>$42,150</span>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 0', borderBottom: '1px solid #2d3748' }}>
                                <span>ETH</span>
                                <span style={{ color: '#10b981' }}>+1.8%</span>
                                <span>$2,845</span>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 0' }}>
                                <span>SOL</span>
                                <span style={{ color: '#ef4444' }}>-0.5%</span>
                                <span>$98</span>
                            </div>
                        </div>
                    </div>

                    <div className="card">
                        <h3>⚡ Quick Stats</h3>
                        <div style={{ marginTop: '15px' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                                <span>Active Networks</span>
                                <span style={{ fontWeight: '600' }}>6</span>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                                <span>dApps Connected</span>
                                <span style={{ fontWeight: '600' }}>3</span>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                                <span>Yield Positions</span>
                                <span style={{ fontWeight: '600' }}>2</span>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <span>Security Score</span>
                                <span style={{ fontWeight: '600', color: '#10b981' }}>95%</span>
                            </div>
                        </div>
                    </div>
                </SideFeatures>
            </FeaturesGrid>
        </DashboardContainer>
    );
};

export default Dashboard;