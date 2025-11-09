import React, { useState } from 'react';
import styled from 'styled-components';
import { toast } from 'react-toastify';

const BuySellContainer = styled.div`
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

const TabContainer = styled.div`
  display: flex;
  background: ${props => props.theme.colors.surfaceLight};
  border-radius: 12px;
  padding: 4px;
  margin-bottom: 24px;
`;

const Tab = styled.button`
  flex: 1;
  padding: 12px;
  border: none;
  background: ${props => props.active ? props.theme.colors.primary : 'transparent'};
  color: ${props => props.active ? 'white' : props.theme.colors.textSecondary};
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
`;

const InputSection = styled.div`
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

const CurrencySelector = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  background: ${props => props.theme.colors.surface};
  border: 1px solid ${props => props.theme.colors.borderLight};
  border-radius: 12px;
  padding: 8px 12px;
  color: ${props => props.theme.colors.text};
  min-width: 120px;
`;

const CurrencyIcon = styled.div`
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

const PaymentMethods = styled.div`
  margin: 20px 0;
`;

const PaymentMethod = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 15px;
  background: ${props => props.theme.colors.surfaceLight};
  border: 1px solid ${props => props.theme.colors.border};
  border-radius: 12px;
  margin-bottom: 10px;
  cursor: pointer;
  
  &.active {
    border-color: ${props => props.theme.colors.primary};
    background: ${props => props.theme.colors.surface};
  }
`;

const MethodIcon = styled.div`
  font-size: 20px;
`;

const MethodInfo = styled.div`
  flex: 1;
`;

const MethodName = styled.div`
  font-weight: 600;
`;

const MethodFee = styled.div`
  font-size: 12px;
  color: ${props => props.theme.colors.textSecondary};
`;

const ActionButton = styled.button`
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
  
  &:hover {
    background: ${props => props.theme.colors.primaryHover};
    transform: translateY(-1px);
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

const BuySell = () => {
    const [activeTab, setActiveTab] = useState('buy');
    const [amount, setAmount] = useState('');
    const [cryptoAmount, setCryptoAmount] = useState('');
    const [paymentMethod, setPaymentMethod] = useState('card');

    const paymentMethods = [
        { id: 'card', name: 'Credit/Debit Card', fee: '2.5% fee', icon: '💳' },
        { id: 'bank', name: 'Bank Transfer', fee: '1% fee', icon: '🏦' },
        { id: 'apple', name: 'Apple Pay', fee: '1.5% fee', icon: '📱' },
        { id: 'google', name: 'Google Pay', fee: '1.5% fee', icon: '📱' }
    ];

    const handleAmountChange = (value) => {
        setAmount(value);
        if (value) {
            const cryptoValue = (parseFloat(value) / 1850).toFixed(6);
            setCryptoAmount(cryptoValue);
        } else {
            setCryptoAmount('');
        }
    };

    const handleCryptoAmountChange = (value) => {
        setCryptoAmount(value);
        if (value) {
            const fiatValue = (parseFloat(value) * 1850).toFixed(2);
            setAmount(fiatValue);
        } else {
            setAmount('');
        }
    };

    const handleAction = () => {
        if (activeTab === 'buy') {
            toast.success(`Bought ${cryptoAmount} ETH for $${amount}`);
        } else {
            toast.success(`Sold ${cryptoAmount} ETH for $${amount}`);
        }
        setAmount('');
        setCryptoAmount('');
    };

    const getTotalAmount = () => {
        if (!amount) return '0.00';

        const baseAmount = parseFloat(amount);
        const feePercentage = paymentMethods.find(m => m.id === paymentMethod)?.fee || '2.5%';
        const feeRate = parseFloat(feePercentage) / 100;

        return (baseAmount * (1 + feeRate)).toFixed(2);
    };

    return (
        <BuySellContainer>
            <Card>
                <SectionTitle>{activeTab === 'buy' ? 'Buy Crypto' : 'Sell Crypto'}</SectionTitle>

                <TabContainer>
                    <Tab
                        active={activeTab === 'buy'}
                        onClick={() => setActiveTab('buy')}
                    >
                        Buy
                    </Tab>
                    <Tab
                        active={activeTab === 'sell'}
                        onClick={() => setActiveTab('sell')}
                    >
                        Sell
                    </Tab>
                </TabContainer>

                <InputSection>
                    <InputRow>
                        <Input
                            type="number"
                            placeholder="0.00"
                            value={activeTab === 'buy' ? amount : cryptoAmount}
                            onChange={(e) => activeTab === 'buy' ?
                                handleAmountChange(e.target.value) :
                                handleCryptoAmountChange(e.target.value)
                            }
                        />
                        <CurrencySelector>
                            <CurrencyIcon>{activeTab === 'buy' ? '$' : 'E'}</CurrencyIcon>
                            {activeTab === 'buy' ? 'USD' : 'ETH'}
                        </CurrencySelector>
                    </InputRow>
                    <Balance>
                        {activeTab === 'buy' ? 'Balance: $1,500.00' : 'Balance: 1.245 ETH'}
                    </Balance>
                </InputSection>

                <InputSection>
                    <InputRow>
                        <Input
                            type="number"
                            placeholder="0.00"
                            value={activeTab === 'buy' ? cryptoAmount : amount}
                            readOnly
                        />
                        <CurrencySelector>
                            <CurrencyIcon>{activeTab === 'buy' ? 'E' : '$'}</CurrencyIcon>
                            {activeTab === 'buy' ? 'ETH' : 'USD'}
                        </CurrencySelector>
                    </InputRow>
                    <Balance>
                        {activeTab === 'buy' ? 'You receive' : 'You get'}
                    </Balance>
                </InputSection>

                <PriceInfo>
                    <InfoRow>
                        <span>Price</span>
                        <span>1 ETH = $1,850.00</span>
                    </InfoRow>
                    <InfoRow>
                        <span>Fee</span>
                        <span>{paymentMethods.find(m => m.id === paymentMethod)?.fee}</span>
                    </InfoRow>
                    <InfoRow>
                        <span>Total {activeTab === 'buy' ? 'Cost' : 'Receive'}</span>
                        <span>${getTotalAmount()}</span>
                    </InfoRow>
                </PriceInfo>

                {activeTab === 'buy' && (
                    <PaymentMethods>
                        <div style={{ marginBottom: '12px', fontWeight: '600' }}>Payment Method</div>
                        {paymentMethods.map(method => (
                            <PaymentMethod
                                key={method.id}
                                className={paymentMethod === method.id ? 'active' : ''}
                                onClick={() => setPaymentMethod(method.id)}
                            >
                                <MethodIcon>{method.icon}</MethodIcon>
                                <MethodInfo>
                                    <MethodName>{method.name}</MethodName>
                                    <MethodFee>{method.fee}</MethodFee>
                                </MethodInfo>
                            </PaymentMethod>
                        ))}
                    </PaymentMethods>
                )}

                <ActionButton onClick={handleAction}>
                    {activeTab === 'buy' ?
                        `Buy ETH for $${getTotalAmount()}` :
                        `Sell ETH for $${getTotalAmount()}`
                    }
                </ActionButton>
            </Card>

            <div style={{
                marginTop: '20px',
                textAlign: 'center',
                color: '#94a3b8',
                fontSize: '14px'
            }}>
                {activeTab === 'buy' ?
                    'Funds will be available in your wallet immediately' :
                    'Proceeds will be transferred to your bank account within 1-3 business days'
                }
            </div>
        </BuySellContainer>
    );
};

export default BuySell;