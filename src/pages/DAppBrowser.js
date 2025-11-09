import React, { useState } from 'react';
import styled from 'styled-components';

const BrowserContainer = styled.div`
  padding: 20px 0;
  height: calc(100vh - 100px);
`;

const BrowserHeader = styled.div`
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
`;

const UrlBar = styled.input`
  flex: 1;
  padding: 12px 16px;
  background: ${props => props.theme.colors.surfaceLight};
  border: 1px solid ${props => props.theme.colors.border};
  border-radius: 12px;
  color: ${props => props.theme.colors.text};
  font-size: 14px;
`;

const GoButton = styled.button`
  padding: 12px 24px;
  background: ${props => props.theme.colors.primary};
  color: white;
  border: none;
  border-radius: 12px;
  cursor: pointer;
  font-weight: 600;
`;

const BrowserContent = styled.div`
  background: white;
  border: 1px solid ${props => props.theme.colors.border};
  border-radius: 12px;
  height: calc(100% - 80px);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: black;
`;

const DAppGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 20px;
  margin-top: 20px;
`;

const DAppCard = styled.div`
  background: ${props => props.theme.colors.surface};
  border: 1px solid ${props => props.theme.colors.border};
  border-radius: 12px;
  padding: 20px;
  text-align: center;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: ${props => props.theme.shadows.lg};
  }
`;

const DAppIcon = styled.div`
  font-size: 32px;
  margin-bottom: 10px;
`;

const DAppBrowser = () => {
    const [url, setUrl] = useState('');
    const [activeTab, setActiveTab] = useState('popular');

    const popularDApps = [
        { name: 'Uniswap', icon: '🔄', category: 'DeFi', url: 'https://app.uniswap.org' },
        { name: 'OpenSea', icon: '🖼', category: 'NFT', url: 'https://opensea.io' },
        { name: 'Aave', icon: '🏦', category: 'Lending', url: 'https://app.aave.com' },
        { name: 'Compound', icon: '💱', category: 'Lending', url: 'https://compound.finance' },
        { name: 'Curve', icon: '📊', category: 'DeFi', url: 'https://curve.fi' },
        { name: '1inch', icon: '⚡', category: 'DEX', url: 'https://app.1inch.io' },
    ];

    const handleDAppClick = (dappUrl) => {
        setUrl(dappUrl);
    };

    const handleGo = () => {
        if (url && !url.startsWith('http')) {
            setUrl('https://' + url);
        }
    };

    return (
        <BrowserContainer>
            <BrowserHeader>
                <UrlBar
                    type="text"
                    placeholder="Enter dApp URL or search..."
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleGo()}
                />
                <GoButton onClick={handleGo}>Go</GoButton>
            </BrowserHeader>

            {!url ? (
                <div>
                    <h3>Popular dApps</h3>
                    <DAppGrid>
                        {popularDApps.map((dapp, index) => (
                            <DAppCard key={index} onClick={() => handleDAppClick(dapp.url)}>
                                <DAppIcon>{dapp.icon}</DAppIcon>
                                <div style={{ fontWeight: '600', marginBottom: '5px' }}>{dapp.name}</div>
                                <div style={{ fontSize: '12px', color: '#94a3b8' }}>{dapp.category}</div>
                            </DAppCard>
                        ))}
                    </DAppGrid>
                </div>
            ) : (
                <BrowserContent>
                    <div style={{ textAlign: 'center', padding: '40px' }}>
                        <div style={{ fontSize: '48px', marginBottom: '20px' }}>🌐</div>
                        <h3>dApp Browser</h3>
                        <p style={{ marginBottom: '20px', color: '#666' }}>
                            Loading: {url}
                        </p>
                        <p style={{ color: '#999', fontSize: '14px' }}>
                            In a real implementation, this would load the actual dApp website with Web3 injection
                        </p>
                    </div>
                </BrowserContent>
            )}
        </BrowserContainer>
    );
};

export default DAppBrowser;