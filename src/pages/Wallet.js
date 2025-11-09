import React, { useState } from 'react';
import styled from 'styled-components';
import { useWallet } from '../hooks/useWallet';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import QRCode from 'qrcode.react';
import { toast } from 'react-toastify';
import TransactionHistory from '../components/TransactionHistory';
import TokenApprovals from '../components/TokenApprovals';
import BiometricAuth from '../components/BiometricAuth';

const WalletContainer = styled.div`
  padding: 20px 0;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 30px;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
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

const AddressSection = styled.div`
  background: ${props => props.theme.colors.surfaceLight};
  padding: 20px;
  border-radius: 12px;
  margin-bottom: 20px;
`;

const AddressDisplay = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 10px;
  margin-bottom: 15px;
`;

const AddressText = styled.div`
  font-family: monospace;
  font-size: 16px;
  word-break: break-all;
  flex: 1;
`;

const CopyButton = styled.button`
  background: ${props => props.theme.colors.primary};
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 8px;
  cursor: pointer;
  font-size: 12px;
  white-space: nowrap;
  
  &:hover {
    background: ${props => props.theme.colors.primaryHover};
  }
`;

const QRContainer = styled.div`
  display: flex;
  justify-content: center;
  padding: 20px;
  background: white;
  border-radius: 12px;
  margin-top: 20px;
`;

const TokenList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const TokenItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px;
  background: ${props => props.theme.colors.surfaceLight};
  border-radius: 12px;
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

const TokenDetails = styled.div`
  display: flex;
  flex-direction: column;
`;

const TokenName = styled.div`
  font-weight: 600;
`;

const TokenSymbol = styled.div`
  font-size: 12px;
  color: ${props => props.theme.colors.textSecondary};
`;

const TokenBalance = styled.div`
  text-align: right;
`;

const TokenAmount = styled.div`
  font-weight: 700;
  font-size: 16px;
`;

const TokenValue = styled.div`
  font-size: 12px;
  color: ${props => props.theme.colors.textSecondary};
`;

const ActionButtons = styled.div`
  display: flex;
  gap: 10px;
  margin-top: 20px;
`;

const Button = styled.button`
  flex: 1;
  padding: 12px;
  border: none;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  
  &.btn-primary {
    background: ${props => props.theme.colors.primary};
    color: white;
    
    &:hover {
      background: ${props => props.theme.colors.primaryHover};
    }
  }
  
  &.btn-outline {
    background: transparent;
    border: 1px solid ${props => props.theme.colors.primary};
    color: ${props => props.theme.colors.primary};
    
    &:hover {
      background: ${props => props.theme.colors.primary};
      color: white;
    }
  }
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
  padding: 12px;
  border: none;
  background: ${props => props.active ? props.theme.colors.primary : 'transparent'};
  color: ${props => props.active ? 'white' : props.theme.colors.textSecondary};
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
`;

const Wallet = () => {
    const { address, balance, currentNetwork, networks } = useWallet();
    const [showPrivateKey, setShowPrivateKey] = useState(false);
    const [activeTab, setActiveTab] = useState('assets');

    const tokens = [
        { symbol: 'ETH', name: 'Ethereum', amount: balance, value: `$${(parseFloat(balance) * 1850).toFixed(2)}` },
        { symbol: 'USDT', name: 'Tether', amount: '500.00', value: '$500.00' },
        { symbol: 'USDC', name: 'USD Coin', amount: '250.00', value: '$250.00' },
        { symbol: 'DAI', name: 'Dai Stablecoin', amount: '100.00', value: '$100.00' },
        { symbol: 'MATIC', name: 'Polygon', amount: '125.45', value: '$106.63' },
        { symbol: 'BNB', name: 'Binance Coin', amount: '2.5', value: '$750.00' }
    ];

    const handleCopy = () => {
        toast.success('Address copied to clipboard!');
    };

    const totalValue = tokens.reduce((sum, token) => {
        return sum + parseFloat(token.value.replace('$', '').replace(',', ''));
    }, 0);

    return (
        <WalletContainer>
            <TabContainer>
                <Tab
                    active={activeTab === 'assets'}
                    onClick={() => setActiveTab('assets')}
                >
                    💰 Assets
                </Tab>
                <Tab
                    active={activeTab === 'history'}
                    onClick={() => setActiveTab('history')}
                >
                    📜 History
                </Tab>
                <Tab
                    active={activeTab === 'security'}
                    onClick={() => setActiveTab('security')}
                >
                    🔒 Security
                </Tab>
                <Tab
                    active={activeTab === 'approvals'}
                    onClick={() => setActiveTab('approvals')}
                >
                    ✅ Approvals
                </Tab>
            </TabContainer>

            {activeTab === 'assets' && (
                <Grid>
                    <div>
                        <Card>
                            <SectionTitle>Wallet Address</SectionTitle>
                            <AddressSection>
                                <AddressDisplay>
                                    <AddressText>{address}</AddressText>
                                    <CopyToClipboard text={address} onCopy={handleCopy}>
                                        <CopyButton>Copy</CopyButton>
                                    </CopyToClipboard>
                                </AddressDisplay>

                                <div style={{ textAlign: 'center', marginBottom: '15px' }}>
                                    <div style={{ color: '#94a3b8', fontSize: '14px' }}>
                                        Scan QR Code to receive funds
                                    </div>
                                </div>

                                <QRContainer>
                                    <QRCode value={address} size={200} />
                                </QRContainer>
                            </AddressSection>

                            <div style={{ marginTop: '20px' }}>
                                <div style={{ color: '#94a3b8', fontSize: '14px' }}>
                                    Current Network
                                </div>
                                <div style={{ fontSize: '16px', fontWeight: '600', marginTop: '5px' }}>
                                    {networks[currentNetwork]?.name}
                                </div>
                            </div>
                        </Card>

                        <Card style={{ marginTop: '20px' }}>
                            <SectionTitle>Quick Actions</SectionTitle>
                            <ActionButtons>
                                <Button className="btn-primary">
                                    Receive
                                </Button>
                                <Button className="btn-outline">
                                    Send
                                </Button>
                                <Button className="btn-outline">
                                    Swap
                                </Button>
                            </ActionButtons>
                        </Card>

                        <Card style={{ marginTop: '20px' }}>
                            <SectionTitle>Wallet Security</SectionTitle>
                            <div style={{ color: '#94a3b8', marginBottom: '15px' }}>
                                Keep your private keys secure and never share them with anyone.
                            </div>
                            <ActionButtons>
                                <Button
                                    className="btn-outline"
                                    onClick={() => setShowPrivateKey(!showPrivateKey)}
                                >
                                    {showPrivateKey ? 'Hide' : 'Show'} Private Key
                                </Button>
                                <Button className="btn-primary">
                                    Backup Wallet
                                </Button>
                            </ActionButtons>

                            {showPrivateKey && (
                                <div style={{
                                    marginTop: '15px',
                                    padding: '15px',
                                    background: '#1a1b2f',
                                    borderRadius: '8px',
                                    border: '1px solid #ef4444'
                                }}>
                                    <div style={{
                                        fontFamily: 'monospace',
                                        fontSize: '12px',
                                        wordBreak: 'break-all',
                                        color: '#ef4444'
                                    }}>
                                        ⚠️ Warning: Never share this key! {address}
                                    </div>
                                </div>
                            )}
                        </Card>
                    </div>

                    <div>
                        <Card>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                                <SectionTitle style={{ margin: 0 }}>Your Assets</SectionTitle>
                                <div style={{ fontSize: '18px', fontWeight: '700', color: '#6366f1' }}>
                                    ${totalValue.toLocaleString()}
                                </div>
                            </div>
                            <TokenList>
                                {tokens.map((token, index) => (
                                    <TokenItem key={index}>
                                        <TokenInfo>
                                            <TokenIcon>
                                                {token.symbol.charAt(0)}
                                            </TokenIcon>
                                            <TokenDetails>
                                                <TokenName>{token.name}</TokenName>
                                                <TokenSymbol>{token.symbol}</TokenSymbol>
                                            </TokenDetails>
                                        </TokenInfo>
                                        <TokenBalance>
                                            <TokenAmount>{token.amount}</TokenAmount>
                                            <TokenValue>{token.value}</TokenValue>
                                        </TokenBalance>
                                    </TokenItem>
                                ))}
                            </TokenList>
                        </Card>

                        <Card style={{ marginTop: '20px' }}>
                            <SectionTitle>Portfolio Allocation</SectionTitle>
                            <div style={{
                                textAlign: 'center',
                                padding: '40px 20px',
                                color: '#94a3b8'
                            }}>
                                <div style={{ fontSize: '48px', marginBottom: '20px' }}>📊</div>
                                <p>Portfolio chart visualization</p>
                                <p style={{ fontSize: '14px' }}>
                                    Showing asset distribution across your holdings
                                </p>
                            </div>
                        </Card>
                    </div>
                </Grid>
            )}

            {activeTab === 'history' && (
                <TransactionHistory />
            )}

            {activeTab === 'security' && (
                <div>
                    <BiometricAuth />
                    <Card style={{ marginTop: '20px' }}>
                        <SectionTitle>Security Overview</SectionTitle>
                        <div style={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                            gap: '15px',
                            marginTop: '20px'
                        }}>
                            <div style={{ textAlign: 'center', padding: '20px', background: '#1a1b2f', borderRadius: '12px' }}>
                                <div style={{ fontSize: '24px', fontWeight: '700', color: '#10b981' }}>95%</div>
                                <div style={{ fontSize: '14px', color: '#94a3b8' }}>Security Score</div>
                            </div>
                            <div style={{ textAlign: 'center', padding: '20px', background: '#1a1b2f', borderRadius: '12px' }}>
                                <div style={{ fontSize: '24px', fontWeight: '700', color: '#6366f1' }}>8</div>
                                <div style={{ fontSize: '14px', color: '#94a3b8' }}>Features Enabled</div>
                            </div>
                            <div style={{ textAlign: 'center', padding: '20px', background: '#1a1b2f', borderRadius: '12px' }}>
                                <div style={{ fontSize: '24px', fontWeight: '700', color: '#f59e0b' }}>2</div>
                                <div style={{ fontSize: '14px', color: '#94a3b8' }}>Recommendations</div>
                            </div>
                        </div>
                    </Card>
                </div>
            )}

            {activeTab === 'approvals' && (
                <TokenApprovals />
            )}
        </WalletContainer>
    );
};

export default Wallet;