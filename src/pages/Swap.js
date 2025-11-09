import React, { useState } from 'react';
import styled from 'styled-components';
import { toast } from 'react-toastify';

const SwapContainer = styled.div`
  max-width: 480px;
  margin: 0 auto;
  padding: 20px 0;
`;

const Card = styled.div`
  background: ${props => props.theme.colors.surface};
  border: 1px solid ${props => props.theme.colors.border};
  border-radius: 20px;
  padding: 24px;
  box-shadow: ${props => props.theme.shadows.lg};
`;

const SectionTitle = styled.h2`
  font-size: 20px;
  margin-bottom: 20px;
  color: ${props => props.theme.colors.text};
  text-align: center;
`;

const SwapSection = styled.div`
  background: ${props => props.theme.colors.surfaceLight};
  border: 1px solid ${props => props.theme.colors.border};
  border-radius: 16px;
  padding: 20px;
  margin-bottom: 15px;
`;

const InputRow = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

const Input = styled.input`
  flex: 1;
  background: none;
  border: none;
  color: ${props => props.theme.colors.text};
  font-size: 24px;
  font-weight: 600;
  outline: none;
  
  &::placeholder {
    color: ${props => props.theme.colors.textMuted};
  }
`;

const TokenSelector = styled.button`
  display: flex;
  align-items: center;
  gap: 8px;
  background: ${props => props.theme.colors.surface};
  border: 1px solid ${props => props.theme.colors.borderLight};
  border-radius: 12px;
  padding: 8px 12px;
  color: ${props => props.theme.colors.text};
  cursor: pointer;
  min-width: 120px;
  
  &:hover {
    background: ${props => props.theme.colors.surfaceDark};
  }
`;

const TokenIcon = styled.div`
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background: ${props => props.theme.colors.primary};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  font-weight: bold;
  color: white;
`;

const Balance = styled.div`
  text-align: right;
  font-size: 12px;
  color: ${props => props.theme.colors.textSecondary};
  margin-top: 8px;
`;

const SwitchButton = styled.button`
  background: ${props => props.theme.colors.surfaceLight};
  border: 1px solid ${props => props.theme.colors.border};
  border-radius: 50%;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: -10px auto;
  position: relative;
  z-index: 1;
  cursor: pointer;
  color: ${props => props.theme.colors.text};
  
  &:hover {
    background: ${props => props.theme.colors.surface};
  }
`;

const PriceInfo = styled.div`
  background: ${props => props.theme.colors.surfaceLight};
  border: 1px solid ${props => props.theme.colors.border};
  border-radius: 12px;
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

const SwapButton = styled.button`
  width: 100%;
  padding: 16px;
  background: ${props => props.theme.colors.primary};
  color: white;
  border: none;
  border-radius: 12px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover:not(:disabled) {
    background: ${props => props.theme.colors.primaryHover};
    transform: translateY(-1px);
  }
  
  &:disabled {
    background: ${props => props.theme.colors.border};
    cursor: not-allowed;
    opacity: 0.6;
  }
`;

const TokenModal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

const TokenList = styled.div`
  background: ${props => props.theme.colors.surface};
  border-radius: 20px;
  padding: 20px;
  width: 90%;
  max-width: 400px;
  max-height: 80vh;
  overflow-y: auto;
`;

const TokenItem = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 15px;
  cursor: pointer;
  border-radius: 12px;
  
  &:hover {
    background: ${props => props.theme.colors.surfaceLight};
  }
`;

const SettingsButton = styled.button`
  background: none;
  border: none;
  color: ${props => props.theme.colors.textSecondary};
  cursor: pointer;
  padding: 8px;
  border-radius: 8px;
  
  &:hover {
    background: ${props => props.theme.colors.surfaceLight};
  }
`;

const Swap = () => {
    const [fromToken, setFromToken] = useState({ symbol: 'ETH', name: 'Ethereum', balance: '1.245' });
    const [toToken, setToToken] = useState({ symbol: 'USDT', name: 'Tether', balance: '0' });
    const [fromAmount, setFromAmount] = useState('');
    const [toAmount, setToAmount] = useState('');
    const [showFromModal, setShowFromModal] = useState(false);
    const [showToModal, setShowToModal] = useState(false);
    const [slippage, setSlippage] = useState('0.5');

    const tokens = [
        { symbol: 'ETH', name: 'Ethereum', balance: '1.245', price: 1850 },
        { symbol: 'USDT', name: 'Tether', balance: '500.00', price: 1 },
        { symbol: 'USDC', name: 'USD Coin', balance: '250.00', price: 1 },
        { symbol: 'BTC', name: 'Bitcoin', balance: '0.035', price: 42150 },
        { symbol: 'MATIC', name: 'Polygon', balance: '125.45', price: 0.85 },
        { symbol: 'BNB', name: 'Binance Coin', balance: '2.5', price: 300 }
    ];

    const handleFromAmountChange = (value) => {
        setFromAmount(value);
        if (value && fromToken.symbol === 'ETH' && toToken.symbol === 'USDT') {
            setToAmount((parseFloat(value) * 1850).toString());
        } else if (value && fromToken.symbol === 'USDT' && toToken.symbol === 'ETH') {
            setToAmount((parseFloat(value) / 1850).toString());
        } else {
            setToAmount('');
        }
    };

    const handleTokenSelect = (token, isFrom) => {
        if (isFrom) {
            setFromToken(token);
            setShowFromModal(false);
        } else {
            setToToken(token);
            setShowToModal(false);
        }
        setFromAmount('');
        setToAmount('');
    };

    const handleSwitchTokens = () => {
        setFromToken(toToken);
        setToToken(fromToken);
        setFromAmount(toAmount);
        setToAmount(fromAmount);
    };

    const handleSwap = () => {
        toast.success(`Swapped ${fromAmount} ${fromToken.symbol} for ${toAmount} ${toToken.symbol}`);
        setFromAmount('');
        setToAmount('');
    };

    const getMinReceived = () => {
        if (!toAmount) return '0';
        const slippageAmount = parseFloat(toAmount) * (parseFloat(slippage) / 100);
        return (parseFloat(toAmount) - slippageAmount).toFixed(6);
    };

    return (
        <SwapContainer>
            <Card>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                    <SectionTitle style={{ margin: 0 }}>Swap Tokens</SectionTitle>
                    <SettingsButton>
                        ⚙️
                    </SettingsButton>
                </div>

                <SwapSection>
                    <InputRow>
                        <Input
                            type="number"
                            placeholder="0.0"
                            value={fromAmount}
                            onChange={(e) => handleFromAmountChange(e.target.value)}
                        />
                        <TokenSelector onClick={() => setShowFromModal(true)}>
                            <TokenIcon>{fromToken.symbol.charAt(0)}</TokenIcon>
                            {fromToken.symbol}
                            <span>▼</span>
                        </TokenSelector>
                    </InputRow>
                    <Balance>Balance: {fromToken.balance}</Balance>
                </SwapSection>

                <SwitchButton onClick={handleSwitchTokens}>
                    ↓↑
                </SwitchButton>

                <SwapSection>
                    <InputRow>
                        <Input
                            type="number"
                            placeholder="0.0"
                            value={toAmount}
                            readOnly
                        />
                        <TokenSelector onClick={() => setShowToModal(true)}>
                            <TokenIcon>{toToken.symbol.charAt(0)}</TokenIcon>
                            {toToken.symbol}
                            <span>▼</span>
                        </TokenSelector>
                    </InputRow>
                    <Balance>Balance: {toToken.balance}</Balance>
                </SwapSection>

                <PriceInfo>
                    <InfoRow>
                        <span>Price</span>
                        <span>1 {fromToken.symbol} = {fromToken.symbol === 'ETH' ? '1,850' : '0.00054'} {toToken.symbol}</span>
                    </InfoRow>
                    <InfoRow>
                        <span>Slippage Tolerance</span>
                        <span>{slippage}%</span>
                    </InfoRow>
                    <InfoRow>
                        <span>Minimum Received</span>
                        <span>{getMinReceived()} {toToken.symbol}</span>
                    </InfoRow>
                    <InfoRow>
                        <span>Network Fee</span>
                        <span>$2.50 - $5.00</span>
                    </InfoRow>
                </PriceInfo>

                <SwapButton
                    onClick={handleSwap}
                    disabled={!fromAmount || parseFloat(fromAmount) > parseFloat(fromToken.balance)}
                >
                    {parseFloat(fromAmount) > parseFloat(fromToken.balance) ?
                        'Insufficient Balance' :
                        `Swap ${fromToken.symbol} for ${toToken.symbol}`
                    }
                </SwapButton>
            </Card>

            {showFromModal && (
                <TokenModal onClick={() => setShowFromModal(false)}>
                    <TokenList onClick={(e) => e.stopPropagation()}>
                        <h3>Select Token</h3>
                        {tokens.map((token, index) => (
                            <TokenItem key={index} onClick={() => handleTokenSelect(token, true)}>
                                <TokenIcon>{token.symbol.charAt(0)}</TokenIcon>
                                <div>
                                    <div>{token.name}</div>
                                    <div style={{ fontSize: '12px', color: '#94a3b8' }}>{token.symbol}</div>
                                </div>
                                <div style={{ marginLeft: 'auto', fontSize: '14px' }}>
                                    {token.balance}
                                </div>
                            </TokenItem>
                        ))}
                    </TokenList>
                </TokenModal>
            )}

            {showToModal && (
                <TokenModal onClick={() => setShowToModal(false)}>
                    <TokenList onClick={(e) => e.stopPropagation()}>
                        <h3>Select Token</h3>
                        {tokens.map((token, index) => (
                            <TokenItem key={index} onClick={() => handleTokenSelect(token, false)}>
                                <TokenIcon>{token.symbol.charAt(0)}</TokenIcon>
                                <div>
                                    <div>{token.name}</div>
                                    <div style={{ fontSize: '12px', color: '#94a3b8' }}>{token.symbol}</div>
                                </div>
                                <div style={{ marginLeft: 'auto', fontSize: '14px' }}>
                                    {token.balance}
                                </div>
                            </TokenItem>
                        ))}
                    </TokenList>
                </TokenModal>
            )}

            <div style={{
                marginTop: '20px',
                textAlign: 'center',
                color: '#94a3b8',
                fontSize: '14px'
            }}>
                Powered by decentralized exchanges • Best rates guaranteed
            </div>
        </SwapContainer>
    );
};

export default Swap;