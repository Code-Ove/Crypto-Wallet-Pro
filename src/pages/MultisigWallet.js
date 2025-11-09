import React, { useState } from 'react';
import styled from 'styled-components';
import { toast } from 'react-toastify';

const MultisigContainer = styled.div`
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

const SectionTitle = styled.h3`
  margin-bottom: 20px;
  color: ${props => props.theme.colors.text};
`;

const SignerItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px;
  background: ${props => props.theme.colors.surfaceLight};
  border-radius: 12px;
  margin-bottom: 10px;
  border: 1px solid ${props => props.theme.colors.border};
`;

const SignerInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

const SignerIcon = styled.div`
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

const TransactionItem = styled.div`
  padding: 15px;
  background: ${props => props.theme.colors.surfaceLight};
  border-radius: 12px;
  margin-bottom: 15px;
  border: 1px solid ${props => props.theme.colors.border};
`;

const TransactionHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
`;

const TransactionDetails = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
  font-size: 14px;
`;

const DetailItem = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Approvals = styled.div`
  display: flex;
  gap: 8px;
  margin-top: 10px;
`;

const ApprovalBadge = styled.div`
  padding: 4px 8px;
  background: ${props => props.approved ? '#10b981' : '#6b7280'};
  color: white;
  border-radius: 12px;
  font-size: 12px;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 10px;
  margin-top: 15px;
`;

const Button = styled.button`
  padding: 8px 16px;
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

const Input = styled.input`
  width: 100%;
  padding: 12px;
  background: ${props => props.theme.colors.surfaceLight};
  border: 1px solid ${props => props.theme.colors.border};
  border-radius: 8px;
  color: ${props => props.theme.colors.text};
  margin: 10px 0;
`;

const MultisigWallet = () => {
    const [signers, setSigners] = useState([
        { address: '0x742d35Cc6634C0532925a3b8D...', name: 'Primary Wallet', weight: 1 },
        { address: '0x8932d35Cc6634C0532925a3b8D...', name: 'Backup Wallet', weight: 1 },
        { address: '0x4567d35Cc6634C0532925a3b8D...', name: 'Hardware Wallet', weight: 1 }
    ]);

    const [transactions, setTransactions] = useState([
        {
            id: 1,
            to: '0x8932d35Cc6634C0532925a3b8D...',
            value: '1.5 ETH',
            data: 'Transfer',
            confirmations: 2,
            required: 2,
            approvals: ['0x742d35Cc6634C0532925a3b8D...', '0x8932d35Cc6634C0532925a3b8D...']
        },
        {
            id: 2,
            to: '0x1a2b3c4d5e6f...',
            value: '0.5 ETH',
            data: 'Payment',
            confirmations: 1,
            required: 2,
            approvals: ['0x742d35Cc6634C0532925a3b8D...']
        }
    ]);

    const [newSigner, setNewSigner] = useState('');
    const [threshold, setThreshold] = useState(2);

    const approveTransaction = (txId) => {
        setTransactions(transactions.map(tx =>
            tx.id === txId
                ? {
                    ...tx,
                    confirmations: tx.confirmations + 1,
                    approvals: [...tx.approvals, '0x4567d35Cc6634C0532925a3b8D...']
                }
                : tx
        ));
        toast.success('Transaction approved!');
    };

    const executeTransaction = (txId) => {
        setTransactions(transactions.filter(tx => tx.id !== txId));
        toast.success('Transaction executed!');
    };

    const addSigner = () => {
        if (newSigner) {
            setSigners([...signers, {
                address: newSigner,
                name: 'New Signer',
                weight: 1
            }]);
            setNewSigner('');
            toast.success('Signer added!');
        }
    };

    return (
        <MultisigContainer>
            <h2>Multi-Signature Wallet</h2>

            <Grid>
                <Card>
                    <SectionTitle>Wallet Signers</SectionTitle>
                    <p style={{ color: '#94a3b8', marginBottom: '20px' }}>
                        Threshold: {threshold} out of {signers.length} signatures required
                    </p>

                    {signers.map((signer, index) => (
                        <SignerItem key={index}>
                            <SignerInfo>
                                <SignerIcon>
                                    {signer.name.charAt(0)}
                                </SignerIcon>
                                <div>
                                    <div style={{ fontWeight: '600' }}>{signer.name}</div>
                                    <div style={{ fontSize: '12px', color: '#94a3b8', fontFamily: 'monospace' }}>
                                        {signer.address.slice(0, 10)}...{signer.address.slice(-8)}
                                    </div>
                                </div>
                            </SignerInfo>
                            <div style={{ fontSize: '14px', color: '#94a3b8' }}>
                                Weight: {signer.weight}
                            </div>
                        </SignerItem>
                    ))}

                    <div style={{ marginTop: '20px' }}>
                        <Input
                            type="text"
                            placeholder="Enter signer address"
                            value={newSigner}
                            onChange={(e) => setNewSigner(e.target.value)}
                        />
                        <Button className="btn-primary" onClick={addSigner}>
                            Add Signer
                        </Button>
                    </div>
                </Card>

                <Card>
                    <SectionTitle>Pending Transactions</SectionTitle>

                    {transactions.map(tx => (
                        <TransactionItem key={tx.id}>
                            <TransactionHeader>
                                <div style={{ fontWeight: '600' }}>Transaction #{tx.id}</div>
                                <div style={{
                                    fontSize: '12px',
                                    color: tx.confirmations >= tx.required ? '#10b981' : '#f59e0b'
                                }}>
                                    {tx.confirmations}/{tx.required} confirmations
                                </div>
                            </TransactionHeader>

                            <TransactionDetails>
                                <DetailItem>
                                    <span>To:</span>
                                    <span style={{ fontFamily: 'monospace', fontSize: '12px' }}>
                                        {tx.to.slice(0, 10)}...{tx.to.slice(-8)}
                                    </span>
                                </DetailItem>
                                <DetailItem>
                                    <span>Value:</span>
                                    <span>{tx.value}</span>
                                </DetailItem>
                                <DetailItem>
                                    <span>Type:</span>
                                    <span>{tx.data}</span>
                                </DetailItem>
                            </TransactionDetails>

                            <Approvals>
                                {signers.map((signer, index) => (
                                    <ApprovalBadge
                                        key={index}
                                        approved={tx.approvals.includes(signer.address)}
                                    >
                                        {signer.name.charAt(0)}
                                    </ApprovalBadge>
                                ))}
                            </Approvals>

                            <ButtonGroup>
                                <Button
                                    className="btn-primary"
                                    onClick={() => approveTransaction(tx.id)}
                                    disabled={tx.confirmations >= tx.required}
                                >
                                    Approve
                                </Button>
                                <Button
                                    className="btn-outline"
                                    onClick={() => executeTransaction(tx.id)}
                                    disabled={tx.confirmations < tx.required}
                                >
                                    Execute
                                </Button>
                            </ButtonGroup>
                        </TransactionItem>
                    ))}
                </Card>
            </Grid>
        </MultisigContainer>
    );
};

export default MultisigWallet;