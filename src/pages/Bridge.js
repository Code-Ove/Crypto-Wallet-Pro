import React, { useState } from 'react';
import styled from 'styled-components';
import { toast } from 'react-toastify';

const BridgeContainer = styled.div`
  max-width: 500px;
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

const BridgeSection = styled.div`
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
  font-size: 18px;
  font-weight: 600;
  outline: none;
`;

const NetworkSelector = styled.div`
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

const NetworkIcon = styled.div`
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

const ArrowDown = styled.div`
  text-align: center;
  font-size: 24px;
  margin: 10px 0;
  color: ${props => props.theme.colors.primary};
`;

const BridgeInfo = styled.div`
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

const BridgeButton = styled.button`
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

const Bridge = () => {
    const [fromNetwork, setFromNetwork] = useState('ethereum');
    const [toNetwork, setToNetwork] = useState('polygon');
    const [amount, setAmount] = useState('');
    const [bridging, setBridging] = useState(false);

    const networks = {
        ethereum: { name: 'Ethereum', symbol: 'ETH' },
        polygon: { name: 'Polygon', symbol: 'MATIC' },
        binance: { name: 'BSC', symbol: 'BNB' },
        avalanche: { name: 'Avalanche', symbol: 'AVAX' },
        arbitrum: { name: 'Arbitrum', symbol: 'ETH' }
    };

    const handleBridge = async () => {
        if (!amount) return;

        setBridging(true);
        // Simulate bridge transaction
        setTimeout(() => {
            toast.success(`Bridged ${amount} ${networks[fromNetwork].symbol} from ${networks[fromNetwork].name} to ${networks[toNetwork].name}`);
            setAmount('');
            setBridging(false);
        }, 3000);
    };

    return (
        <BridgeContainer>
            <Card>
                <SectionTitle>Cross-Chain Bridge</SectionTitle>

                <BridgeSection>
                    <div style={{ marginBottom: '10px', fontSize: '14px', color: '#94a3b8' }}>
                        From
                    </div>
                    <InputRow>
                        <Input
                            type="number"
                            placeholder="0.0"
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                        />
                        <NetworkSelector>
                            <NetworkIcon>E</NetworkIcon>
                            {networks[fromNetwork].symbol}
                        </NetworkSelector>
                    </InputRow>
                    <div style={{ fontSize: '12px', color: '#94a3b8', marginTop: '8px' }}>
                        Balance: 1.245 {networks[fromNetwork].symbol}
                    </div>
                </BridgeSection>

                <ArrowDown>↓</ArrowDown>

                <BridgeSection>
                    <div style={{ marginBottom: '10px', fontSize: '14px', color: '#94a3b8' }}>
                        To
                    </div>
                    <InputRow>
                        <Input
                            type="number"
                            placeholder="0.0"
                            value={amount}
                            readOnly
                        />
                        <NetworkSelector>
                            <NetworkIcon>P</NetworkIcon>
                            {networks[toNetwork].symbol}
                        </NetworkSelector>
                    </InputRow>
                    <div style={{ fontSize: '12px', color: '#94a3b8', marginTop: '8px' }}>
                        You will receive
                    </div>
                </BridgeSection>

                <BridgeInfo>
                    <InfoRow>
                        <span>Bridge Fee</span>
                        <span>0.1%</span>
                    </InfoRow>
                    <InfoRow>
                        <span>Estimated Time</span>
                        <span>5-15 minutes</span>
                    </InfoRow>
                    <InfoRow>
                        <span>You Will Receive</span>
                        <span>{amount ? (parseFloat(amount) * 0.999).toFixed(6) : '0'} {networks[toNetwork].symbol}</span>
                    </InfoRow>
                </BridgeInfo>

                <BridgeButton
                    onClick={handleBridge}
                    disabled={!amount || bridging}
                >
                    {bridging ? 'Bridging...' : 'Bridge Now'}
                </BridgeButton>
            </Card>
        </BridgeContainer>
    );
};

export default Bridge;