import React, { useState } from 'react';
import styled from 'styled-components';
import { toast } from 'react-toastify';

const TradeContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 400px;
  gap: 20px;
  height: calc(100vh - 150px);
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const ChartSection = styled.div`
  background: ${props => props.theme.colors.surface};
  border: 1px solid ${props => props.theme.colors.border};
  border-radius: 16px;
  padding: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #94a3b8;
`;

const OrderSection = styled.div`
  background: ${props => props.theme.colors.surface};
  border: 1px solid ${props => props.theme.colors.border};
  border-radius: 16px;
  padding: 24px;
`;

const TabContainer = styled.div`
  display: flex;
  background: ${props => props.theme.colors.surfaceLight};
  border-radius: 12px;
  padding: 4px;
  margin-bottom: 20px;
`;

const Tab = styled.button`
  flex: 1;
  padding: 10px;
  border: none;
  background: ${props => props.active ? props.theme.colors.primary : 'transparent'};
  color: ${props => props.active ? 'white' : props.theme.colors.textSecondary};
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  font-size: 14px;
`;

const OrderType = styled.select`
  width: 100%;
  padding: 12px;
  background: ${props => props.theme.colors.surfaceLight};
  border: 1px solid ${props => props.theme.colors.border};
  border-radius: 8px;
  color: ${props => props.theme.colors.text};
  margin-bottom: 15px;
`;

const InputGroup = styled.div`
  margin-bottom: 15px;
`;

const Label = styled.div`
  font-size: 14px;
  color: ${props => props.theme.colors.textSecondary};
  margin-bottom: 8px;
`;

const Input = styled.input`
  width: 100%;
  padding: 12px;
  background: ${props => props.theme.colors.surfaceLight};
  border: 1px solid ${props => props.theme.colors.border};
  border-radius: 8px;
  color: ${props => props.theme.colors.text};
`;

const PriceInfo = styled.div`
  background: ${props => props.theme.colors.surfaceLight};
  border-radius: 8px;
  padding: 15px;
  margin: 20px 0;
  font-size: 14px;
`;

const InfoRow = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 8px;
  
  &:last-child {
    margin-bottom: 0;
  }
`;

const TradeButton = styled.button`
  width: 100%;
  padding: 15px;
  background: ${props => {
        if (props.side === 'buy') return '#10b981';
        if (props.side === 'sell') return '#ef4444';
        return props.theme.colors.primary;
    }};
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  margin-top: 10px;
  
  &:hover:not(:disabled) {
    opacity: 0.9;
  }
  
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

const OrderBook = styled.div`
  margin-top: 20px;
  max-height: 300px;
  overflow-y: auto;
`;

const OrderRow = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 8px 0;
  border-bottom: 1px solid ${props => props.theme.colors.borderLight};
  font-size: 12px;
  
  &.bid {
    color: #10b981;
  }
  
  &.ask {
    color: #ef4444;
  }
`;

const AdvancedTrade = () => {
    const [activeTab, setActiveTab] = useState('limit');
    const [orderType, setOrderType] = useState('limit');
    const [side, setSide] = useState('buy');
    const [amount, setAmount] = useState('');
    const [price, setPrice] = useState('');

    const orderBook = {
        bids: [
            { price: 1845.50, amount: 2.5, total: 4613.75 },
            { price: 1845.25, amount: 1.8, total: 3321.45 },
            { price: 1845.00, amount: 3.2, total: 5904.00 },
            { price: 1844.75, amount: 1.5, total: 2767.13 },
            { price: 1844.50, amount: 2.1, total: 3873.45 }
        ],
        asks: [
            { price: 1845.75, amount: 1.2, total: 2214.90 },
            { price: 1846.00, amount: 2.8, total: 5168.80 },
            { price: 1846.25, amount: 1.5, total: 2769.38 },
            { price: 1846.50, amount: 3.1, total: 5724.15 },
            { price: 1846.75, amount: 2.0, total: 3693.50 }
        ]
    };

    const handleTrade = () => {
        if (amount && price) {
            toast.success(`${side === 'buy' ? 'Buy' : 'Sell'} order placed for ${amount} ETH at $${price}`);
            setAmount('');
            setPrice('');
        }
    };

    return (
        <TradeContainer>
            <ChartSection>
                <div style={{ textAlign: 'center' }}>
                    <div style={{ fontSize: '48px', marginBottom: '20px' }}>📈</div>
                    <h3>TradingView Chart</h3>
                    <p>Advanced trading charts with technical indicators</p>
                    <p style={{ fontSize: '14px', marginTop: '10px' }}>
                        In a real implementation, this would integrate with TradingView widgets
                    </p>
                </div>
            </ChartSection>

            <OrderSection>
                <TabContainer>
                    <Tab
                        active={activeTab === 'limit'}
                        onClick={() => setActiveTab('limit')}
                    >
                        Limit
                    </Tab>
                    <Tab
                        active={activeTab === 'market'}
                        onClick={() => setActiveTab('market')}
                    >
                        Market
                    </Tab>
                    <Tab
                        active={activeTab === 'stop'}
                        onClick={() => setActiveTab('stop')}
                    >
                        Stop
                    </Tab>
                </TabContainer>

                <TabContainer>
                    <Tab
                        active={side === 'buy'}
                        onClick={() => setSide('buy')}
                        style={{
                            background: side === 'buy' ? '#10b981' : 'transparent',
                            color: side === 'buy' ? 'white' : '#10b981'
                        }}
                    >
                        Buy
                    </Tab>
                    <Tab
                        active={side === 'sell'}
                        onClick={() => setSide('sell')}
                        style={{
                            background: side === 'sell' ? '#ef4444' : 'transparent',
                            color: side === 'sell' ? 'white' : '#ef4444'
                        }}
                    >
                        Sell
                    </Tab>
                </TabContainer>

                <InputGroup>
                    <Label>Order Type</Label>
                    <OrderType value={orderType} onChange={(e) => setOrderType(e.target.value)}>
                        <option value="limit">Limit Order</option>
                        <option value="market">Market Order</option>
                        <option value="stop-limit">Stop Limit</option>
                    </OrderType>
                </InputGroup>

                <InputGroup>
                    <Label>Amount (ETH)</Label>
                    <Input
                        type="number"
                        placeholder="0.0"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                    />
                </InputGroup>

                <InputGroup>
                    <Label>Price (USD)</Label>
                    <Input
                        type="number"
                        placeholder="0.0"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                    />
                </InputGroup>

                <PriceInfo>
                    <InfoRow>
                        <span>Current Price</span>
                        <span>$1,845.25</span>
                    </InfoRow>
                    <InfoRow>
                        <span>24h Change</span>
                        <span style={{ color: '#10b981' }}>+2.5%</span>
                    </InfoRow>
                    <InfoRow>
                        <span>Total Cost</span>
                        <span>${amount && price ? (parseFloat(amount) * parseFloat(price)).toFixed(2) : '0.00'}</span>
                    </InfoRow>
                </PriceInfo>

                <TradeButton
                    side={side}
                    onClick={handleTrade}
                    disabled={!amount || !price}
                >
                    {side === 'buy' ? 'Buy' : 'Sell'} ETH
                </TradeButton>

                <OrderBook>
                    <h4 style={{ marginBottom: '15px' }}>Order Book</h4>

                    <div style={{ marginBottom: '10px' }}>
                        <strong style={{ fontSize: '12px' }}>BIDS</strong>
                        {orderBook.bids.map((order, index) => (
                            <OrderRow key={index} className="bid">
                                <span>{order.price}</span>
                                <span>{order.amount}</span>
                                <span>{order.total.toLocaleString()}</span>
                            </OrderRow>
                        ))}
                    </div>

                    <div style={{
                        textAlign: 'center',
                        padding: '5px 0',
                        fontWeight: '600',
                        color: '#6366f1'
                    }}>
                        $1,845.25
                    </div>

                    <div>
                        <strong style={{ fontSize: '12px' }}>ASKS</strong>
                        {orderBook.asks.map((order, index) => (
                            <OrderRow key={index} className="ask">
                                <span>{order.price}</span>
                                <span>{order.amount}</span>
                                <span>{order.total.toLocaleString()}</span>
                            </OrderRow>
                        ))}
                    </div>
                </OrderBook>
            </OrderSection>
        </TradeContainer>
    );
};

export default AdvancedTrade;