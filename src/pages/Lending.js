import React, { useState } from 'react';
import styled from 'styled-components';
import { toast } from 'react-toastify';

const LendingContainer = styled.div`
  padding: 20px 0;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
  margin-bottom: 30px;
`;

const Card = styled.div`
  background: ${props => props.theme.colors.surface};
  border: 1px solid ${props => props.theme.colors.border};
  border-radius: 16px;
  padding: 24px;
  box-shadow: ${props => props.theme.shadows.md};
`;

const MarketItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  background: ${props => props.theme.colors.surfaceLight};
  border-radius: 12px;
  margin-bottom: 15px;
  border: 1px solid ${props => props.theme.colors.border};
`;

const TokenInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

const TokenIcon = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: ${props => props.theme.colors.primary};
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  color: white;
`;

const MarketStats = styled.div`
  text-align: right;
`;

const APY = styled.div`
  font-size: 16px;
  font-weight: 600;
  color: #10b981;
  margin-bottom: 4px;
`;

const Stats = styled.div`
  font-size: 12px;
  color: ${props => props.theme.colors.textSecondary};
`;

const InputGroup = styled.div`
  margin: 15px 0;
`;

const Input = styled.input`
  width: 100%;
  padding: 12px;
  background: ${props => props.theme.colors.surfaceLight};
  border: 1px solid ${props => props.theme.colors.border};
  border-radius: 8px;
  color: ${props => props.theme.colors.text};
  margin-bottom: 10px;
`;

const ActionButton = styled.button`
  width: 100%;
  padding: 12px;
  background: ${props => props.theme.colors.primary};
  color: white;
  border: none;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  
  &:hover {
    background: ${props => props.theme.colors.primaryHover};
  }
`;

const HealthFactor = styled.div`
  background: ${props => {
        const value = parseFloat(props.value);
        if (value > 2) return '#10b981';
        if (value > 1.5) return '#f59e0b';
        return '#ef4444';
    }};
  color: white;
  padding: 10px;
  border-radius: 8px;
  text-align: center;
  margin: 15px 0;
  font-weight: 600;
`;

const Lending = () => {
    const [supplyAmount, setSupplyAmount] = useState({});
    const [borrowAmount, setBorrowAmount] = useState({});
    const [healthFactor, setHealthFactor] = useState(2.5);

    const supplyMarkets = [
        { symbol: 'ETH', name: 'Ethereum', apy: '3.2%', walletBalance: '1.245', supplied: '0.5' },
        { symbol: 'USDC', name: 'USD Coin', apy: '4.5%', walletBalance: '500', supplied: '250' },
        { symbol: 'DAI', name: 'Dai Stablecoin', apy: '4.2%', walletBalance: '100', supplied: '50' }
    ];

    const borrowMarkets = [
        { symbol: 'ETH', name: 'Ethereum', apy: '5.8%', available: '0.75', borrowed: '0.25' },
        { symbol: 'USDC', name: 'USD Coin', apy: '7.2%', available: '375', borrowed: '125' },
        { symbol: 'DAI', name: 'Dai Stablecoin', apy: '6.9%', available: '75', borrowed: '25' }
    ];

    const handleSupply = (symbol) => {
        const amount = supplyAmount[symbol] || '0';
        if (amount && parseFloat(amount) > 0) {
            toast.success(`Supplied ${amount} ${symbol}`);
            setSupplyAmount({ ...supplyAmount, [symbol]: '' });
            // Update health factor
            setHealthFactor(prev => Math.max(1.1, prev - 0.1));
        }
    };

    const handleBorrow = (symbol) => {
        const amount = borrowAmount[symbol] || '0';
        if (amount && parseFloat(amount) > 0) {
            toast.success(`Borrowed ${amount} ${symbol}`);
            setBorrowAmount({ ...borrowAmount, [symbol]: '' });
            // Update health factor
            setHealthFactor(prev => Math.max(1.0, prev - 0.2));
        }
    };

    return (
        <LendingContainer>
            <h2>Lending & Borrowing</h2>

            <HealthFactor value={healthFactor}>
                Health Factor: {healthFactor.toFixed(2)}
                <div style={{ fontSize: '12px', opacity: 0.9 }}>
                    {healthFactor > 2 ? 'Safe' : healthFactor > 1.5 ? 'Moderate' : 'Risky'}
                </div>
            </HealthFactor>

            <Grid>
                <Card>
                    <h3>Supply Markets</h3>
                    <p style={{ color: '#94a3b8', marginBottom: '20px' }}>
                        Supply assets to earn interest
                    </p>

                    {supplyMarkets.map(market => (
                        <div key={market.symbol}>
                            <MarketItem>
                                <TokenInfo>
                                    <TokenIcon>{market.symbol.charAt(0)}</TokenIcon>
                                    <div>
                                        <div style={{ fontWeight: '600' }}>{market.name}</div>
                                        <div style={{ fontSize: '12px', color: '#94a3b8' }}>
                                            Wallet: {market.walletBalance}
                                        </div>
                                    </div>
                                </TokenInfo>
                                <MarketStats>
                                    <APY>{market.apy}</APY>
                                    <Stats>Supplied: {market.supplied}</Stats>
                                </MarketStats>
                            </MarketItem>

                            <InputGroup>
                                <Input
                                    type="number"
                                    placeholder="0.0"
                                    value={supplyAmount[market.symbol] || ''}
                                    onChange={(e) => setSupplyAmount({
                                        ...supplyAmount,
                                        [market.symbol]: e.target.value
                                    })}
                                />
                                <ActionButton onClick={() => handleSupply(market.symbol)}>
                                    Supply {market.symbol}
                                </ActionButton>
                            </InputGroup>
                        </div>
                    ))}
                </Card>

                <Card>
                    <h3>Borrow Markets</h3>
                    <p style={{ color: '#94a3b8', marginBottom: '20px' }}>
                        Borrow against your supplied assets
                    </p>

                    {borrowMarkets.map(market => (
                        <div key={market.symbol}>
                            <MarketItem>
                                <TokenInfo>
                                    <TokenIcon>{market.symbol.charAt(0)}</TokenIcon>
                                    <div>
                                        <div style={{ fontWeight: '600' }}>{market.name}</div>
                                        <div style={{ fontSize: '12px', color: '#94a3b8' }}>
                                            Available: {market.available}
                                        </div>
                                    </div>
                                </TokenInfo>
                                <MarketStats>
                                    <APY>{market.apy}</APY>
                                    <Stats>Borrowed: {market.borrowed}</Stats>
                                </MarketStats>
                            </MarketItem>

                            <InputGroup>
                                <Input
                                    type="number"
                                    placeholder="0.0"
                                    value={borrowAmount[market.symbol] || ''}
                                    onChange={(e) => setBorrowAmount({
                                        ...borrowAmount,
                                        [market.symbol]: e.target.value
                                    })}
                                />
                                <ActionButton onClick={() => handleBorrow(market.symbol)}>
                                    Borrow {market.symbol}
                                </ActionButton>
                            </InputGroup>
                        </div>
                    ))}
                </Card>
            </Grid>

            <Card>
                <h3>Your Positions</h3>
                <div style={{
                    textAlign: 'center',
                    padding: '40px 20px',
                    color: '#94a3b8'
                }}>
                    No active lending positions
                    <div style={{ fontSize: '14px', marginTop: '10px' }}>
                        Supply assets to start earning interest
                    </div>
                </div>
            </Card>
        </LendingContainer>
    );
};

export default Lending;