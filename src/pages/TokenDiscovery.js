import React, { useState } from 'react';
import styled from 'styled-components';

const DiscoveryContainer = styled.div`
  padding: 20px 0;
`;

const SearchBar = styled.input`
  width: 100%;
  padding: 15px 20px;
  background: ${props => props.theme.colors.surfaceLight};
  border: 1px solid ${props => props.theme.colors.border};
  border-radius: 12px;
  color: ${props => props.theme.colors.text};
  font-size: 16px;
  margin-bottom: 30px;
  
  &::placeholder {
    color: ${props => props.theme.colors.textMuted};
  }
`;

const TokenGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
`;

const TokenCard = styled.div`
  background: ${props => props.theme.colors.surface};
  border: 1px solid ${props => props.theme.colors.border};
  border-radius: 16px;
  padding: 20px;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: ${props => props.theme.shadows.lg};
  }
`;

const TokenHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 15px;
`;

const TokenIcon = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: ${props => props.theme.colors.primary};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  font-weight: bold;
  color: white;
`;

const TokenInfo = styled.div`
  flex: 1;
`;

const TokenName = styled.div`
  font-weight: 600;
  font-size: 16px;
  margin-bottom: 4px;
`;

const TokenSymbol = styled.div`
  font-size: 14px;
  color: ${props => props.theme.colors.textSecondary};
`;

const TokenPrice = styled.div`
  text-align: right;
`;

const Price = styled.div`
  font-weight: 600;
  font-size: 16px;
  margin-bottom: 4px;
`;

const Change = styled.div`
  font-size: 14px;
  color: ${props => props.change >= 0 ? '#10b981' : '#ef4444'};
`;

const TokenDiscovery = () => {
    const [searchTerm, setSearchTerm] = useState('');

    const trendingTokens = [
        { symbol: 'ETH', name: 'Ethereum', price: '$1,845.25', change: 2.5 },
        { symbol: 'BTC', name: 'Bitcoin', price: '$42,150.75', change: 1.8 },
        { symbol: 'MATIC', name: 'Polygon', price: '$0.85', change: 5.2 },
        { symbol: 'AVAX', name: 'Avalanche', price: '$35.60', change: -1.2 },
        { symbol: 'SOL', name: 'Solana', price: '$98.45', change: 8.7 },
        { symbol: 'DOT', name: 'Polkadot', price: '$7.25', change: 3.1 }
    ];

    const filteredTokens = trendingTokens.filter(token =>
        token.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        token.symbol.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <DiscoveryContainer>
            <h2>Token Discovery</h2>
            <p style={{ color: '#94a3b8', marginBottom: '30px' }}>
                Explore and discover new tokens across multiple networks
            </p>

            <SearchBar
                type="text"
                placeholder="Search tokens by name or symbol..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />

            <TokenGrid>
                {filteredTokens.map(token => (
                    <TokenCard key={token.symbol}>
                        <TokenHeader>
                            <TokenIcon>{token.symbol.charAt(0)}</TokenIcon>
                            <TokenInfo>
                                <TokenName>{token.name}</TokenName>
                                <TokenSymbol>{token.symbol}</TokenSymbol>
                            </TokenInfo>
                            <TokenPrice>
                                <Price>{token.price}</Price>
                                <Change change={token.change}>
                                    {token.change >= 0 ? '+' : ''}{token.change}%
                                </Change>
                            </TokenPrice>
                        </TokenHeader>

                        <div style={{
                            display: 'flex',
                            gap: '10px',
                            marginTop: '15px'
                        }}>
                            <button className="btn btn-primary" style={{ flex: 1 }}>
                                Buy
                            </button>
                            <button className="btn btn-outline" style={{ flex: 1 }}>
                                Add to Watchlist
                            </button>
                        </div>
                    </TokenCard>
                ))}
            </TokenGrid>
        </DiscoveryContainer>
    );
};

export default TokenDiscovery;