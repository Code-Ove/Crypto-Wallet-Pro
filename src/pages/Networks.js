import React from 'react';
import styled from 'styled-components';
import { useWallet } from '../hooks/useWallet';

const NetworksContainer = styled.div`
  padding: 20px 0;
  max-width: 600px;
  margin: 0 auto;
`;

const Card = styled.div`
  background: ${props => props.theme.colors.surface};
  border: 1px solid ${props => props.theme.colors.border};
  border-radius: 16px;
  padding: 24px;
  box-shadow: ${props => props.theme.shadows.md};
`;

const SectionTitle = styled.h2`
  font-size: 20px;
  margin-bottom: 20px;
  color: ${props => props.theme.colors.text};
`;

const NetworkList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const NetworkItem = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 20px;
  background: ${props => props.theme.colors.surfaceLight};
  border: 1px solid ${props => props.active ? props.theme.colors.primary : props.theme.colors.border};
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    background: ${props => props.theme.colors.surface};
    transform: translateY(-1px);
  }
`;

const NetworkIcon = styled.div`
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background: ${props => props.theme.colors.primary};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  font-weight: bold;
  color: white;
`;

const NetworkInfo = styled.div`
  flex: 1;
`;

const NetworkName = styled.div`
  font-weight: 600;
  font-size: 16px;
  margin-bottom: 4px;
`;

const NetworkStatus = styled.div`
  font-size: 12px;
  color: ${props => props.theme.colors.textSecondary};
`;

const ActiveBadge = styled.div`
  background: ${props => props.theme.colors.success};
  color: white;
  padding: 4px 12px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 600;
`;

const AddNetworkButton = styled.button`
  width: 100%;
  padding: 20px;
  background: ${props => props.theme.colors.surfaceLight};
  border: 2px dashed ${props => props.theme.colors.border};
  border-radius: 12px;
  color: ${props => props.theme.colors.text};
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    border-color: ${props => props.theme.colors.primary};
    background: ${props => props.theme.colors.surface};
  }
`;

const NetworkDetails = styled.div`
  background: ${props => props.theme.colors.surfaceLight};
  padding: 20px;
  border-radius: 12px;
  margin-top: 20px;
  font-family: monospace;
  font-size: 14px;
`;

const Networks = () => {
    const { currentNetwork, networks, switchNetwork } = useWallet();

    const popularNetworks = [
        { key: 'ethereum', name: 'Ethereum Mainnet', symbol: 'ETH', status: 'Active' },
        { key: 'binance', name: 'Binance Smart Chain', symbol: 'BNB', status: 'Active' },
        { key: 'polygon', name: 'Polygon Mainnet', symbol: 'MATIC', status: 'Active' },
        { key: 'avalanche', name: 'Avalanche C-Chain', symbol: 'AVAX', status: 'Active' },
        { key: 'arbitrum', name: 'Arbitrum One', symbol: 'ETH', status: 'Active' },
        { key: 'optimism', name: 'Optimism', symbol: 'ETH', status: 'Active' },
        { key: 'fantom', name: 'Fantom Opera', symbol: 'FTM', status: 'Active' },
        { key: 'base', name: 'Base Mainnet', symbol: 'ETH', status: 'Active' }
    ];

    const testNetworks = [
        { key: 'goerli', name: 'Goerli Testnet', symbol: 'ETH', status: 'Testnet' },
        { key: 'sepolia', name: 'Sepolia Testnet', symbol: 'ETH', status: 'Testnet' },
        { key: 'mumbai', name: 'Polygon Mumbai', symbol: 'MATIC', status: 'Testnet' }
    ];

    return (
        <NetworksContainer>
            <Card>
                <SectionTitle>Select Network</SectionTitle>

                <h3 style={{ marginBottom: '15px', color: '#94a3b8' }}>Main Networks</h3>
                <NetworkList>
                    {popularNetworks.map(network => (
                        <NetworkItem
                            key={network.key}
                            active={currentNetwork === network.key}
                            onClick={() => switchNetwork(network.key)}
                        >
                            <NetworkIcon>
                                {network.symbol.charAt(0)}
                            </NetworkIcon>
                            <NetworkInfo>
                                <NetworkName>{network.name}</NetworkName>
                                <NetworkStatus>
                                    {network.status} • Fast • Secure
                                </NetworkStatus>
                            </NetworkInfo>
                            {currentNetwork === network.key && (
                                <ActiveBadge>Active</ActiveBadge>
                            )}
                        </NetworkItem>
                    ))}
                </NetworkList>

                <h3 style={{ marginBottom: '15px', color: '#94a3b8', marginTop: '30px' }}>Test Networks</h3>
                <NetworkList>
                    {testNetworks.map(network => (
                        <NetworkItem
                            key={network.key}
                            active={currentNetwork === network.key}
                            onClick={() => switchNetwork(network.key)}
                        >
                            <NetworkIcon style={{ background: '#6b7280' }}>
                                {network.symbol.charAt(0)}
                            </NetworkIcon>
                            <NetworkInfo>
                                <NetworkName>{network.name}</NetworkName>
                                <NetworkStatus>
                                    {network.status} • Test tokens only
                                </NetworkStatus>
                            </NetworkInfo>
                            {currentNetwork === network.key && (
                                <ActiveBadge style={{ background: '#6b7280' }}>Active</ActiveBadge>
                            )}
                        </NetworkItem>
                    ))}
                </NetworkList>

                <div style={{ marginTop: '30px' }}>
                    <AddNetworkButton>
                        + Add Custom Network
                    </AddNetworkButton>
                </div>
            </Card>

            <Card style={{ marginTop: '20px' }}>
                <SectionTitle>Network Information</SectionTitle>
                <NetworkDetails>
                    <div style={{ marginBottom: '10px' }}>
                        <strong>Current Network:</strong> {networks[currentNetwork]?.name}
                    </div>
                    <div style={{ marginBottom: '10px' }}>
                        <strong>Chain ID:</strong> {networks[currentNetwork]?.chainId}
                    </div>
                    <div style={{ marginBottom: '10px' }}>
                        <strong>Currency:</strong> {networks[currentNetwork]?.symbol}
                    </div>
                    <div style={{ marginBottom: '10px' }}>
                        <strong>RPC URL:</strong> {networks[currentNetwork]?.rpcUrl}
                    </div>
                    <div>
                        <strong>Block Explorer:</strong> {networks[currentNetwork]?.explorer}
                    </div>
                </NetworkDetails>
            </Card>

            <Card style={{ marginTop: '20px' }}>
                <SectionTitle>Network Statistics</SectionTitle>
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
                    gap: '15px',
                    marginTop: '15px'
                }}>
                    <div style={{ textAlign: 'center', padding: '15px', background: '#1a1b2f', borderRadius: '8px' }}>
                        <div style={{ fontSize: '18px', fontWeight: '600', color: '#6366f1' }}>8</div>
                        <div style={{ fontSize: '12px', color: '#94a3b8' }}>Networks</div>
                    </div>
                    <div style={{ textAlign: 'center', padding: '15px', background: '#1a1b2f', borderRadius: '8px' }}>
                        <div style={{ fontSize: '18px', fontWeight: '600', color: '#10b981' }}>5</div>
                        <div style={{ fontSize: '12px', color: '#94a3b8' }}>Active</div>
                    </div>
                    <div style={{ textAlign: 'center', padding: '15px', background: '#1a1b2f', borderRadius: '8px' }}>
                        <div style={{ fontSize: '18px', fontWeight: '600', color: '#f59e0b' }}>3</div>
                        <div style={{ fontSize: '12px', color: '#94a3b8' }}>Testnets</div>
                    </div>
                </div>
            </Card>
        </NetworksContainer>
    );
};

export default Networks;