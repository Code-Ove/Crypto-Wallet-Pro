import React, { useState } from 'react';
import styled from 'styled-components';
import { CSVLink } from 'react-csv';

const HistoryContainer = styled.div`
  background: ${props => props.theme.colors.surface};
  border: 1px solid ${props => props.theme.colors.border};
  border-radius: 16px;
  padding: 24px;
  margin: 20px 0;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;

const FilterBar = styled.div`
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
  flex-wrap: wrap;
`;

const FilterButton = styled.button`
  padding: 8px 16px;
  background: ${props => props.active ? props.theme.colors.primary : 'transparent'};
  border: 1px solid ${props => props.theme.colors.border};
  border-radius: 20px;
  color: ${props => props.active ? 'white' : props.theme.colors.text};
  cursor: pointer;
  font-size: 14px;
  
  &:hover {
    background: ${props => props.active ? props.theme.colors.primary : props.theme.colors.surfaceLight};
  }
`;

const TransactionList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const TransactionItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px;
  background: ${props => props.theme.colors.surfaceLight};
  border-radius: 12px;
  border: 1px solid ${props => props.theme.colors.border};
`;

const TransactionInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

const TransactionIcon = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: ${props => {
        switch (props.type) {
            case 'sent': return '#ef4444';
            case 'received': return '#10b981';
            case 'swap': return '#6366f1';
            case 'contract': return '#f59e0b';
            default: return '#6b7280';
        }
    }};
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 18px;
`;

const TransactionDetails = styled.div`
  display: flex;
  flex-direction: column;
`;

const TransactionType = styled.div`
  font-weight: 600;
  margin-bottom: 4px;
`;

const TransactionDate = styled.div`
  font-size: 12px;
  color: ${props => props.theme.colors.textSecondary};
`;

const TransactionAmount = styled.div`
  text-align: right;
  font-weight: 600;
  color: ${props => props.type === 'sent' ? '#ef4444' : '#10b981'};
`;

const TransactionStatus = styled.div`
  font-size: 12px;
  color: ${props => {
        switch (props.status) {
            case 'confirmed': return '#10b981';
            case 'pending': return '#f59e0b';
            case 'failed': return '#ef4444';
            default: return '#6b7280';
        }
    }};
`;

const ExportButton = styled.button`
  padding: 10px 20px;
  background: ${props => props.theme.colors.primary};
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 600;
  
  &:hover {
    background: ${props => props.theme.colors.primaryHover};
  }
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 60px 20px;
  color: ${props => props.theme.colors.textSecondary};
`;

const TransactionHistory = () => {
    const [filter, setFilter] = useState('all');
    const [transactions] = useState([
        {
            id: 1,
            type: 'received',
            amount: '0.5 ETH',
            value: '$850.00',
            date: '2024-01-15 14:30',
            status: 'confirmed',
            from: '0x742...d35a',
            to: '0x893...f2b1',
            hash: '0xabc123def456ghi789jkl012mno345pqr678stu901vwx234yz',
            network: 'Ethereum'
        },
        {
            id: 2,
            type: 'sent',
            amount: '0.1 ETH',
            value: '$170.00',
            date: '2024-01-14 09:15',
            status: 'confirmed',
            from: '0x893...f2b1',
            to: '0x456...cde3',
            hash: '0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcd',
            network: 'Ethereum'
        },
        {
            id: 3,
            type: 'swap',
            amount: '1.0 ETH → 1850 USDT',
            value: '$1,850.00',
            date: '2024-01-13 16:45',
            status: 'confirmed',
            from: '0x893...f2b1',
            to: 'Uniswap',
            hash: '0x7890123456789abcdef0123456789abcdef0123456789abcdef0123456789ab',
            network: 'Ethereum'
        },
        {
            id: 4,
            type: 'received',
            amount: '2.5 MATIC',
            value: '$2.50',
            date: '2024-01-12 11:20',
            status: 'pending',
            from: '0x456...cde3',
            to: '0x893...f2b1',
            hash: '0x3456789abcdef0123456789abcdef0123456789abcdef0123456789abcdef0',
            network: 'Polygon'
        },
        {
            id: 5,
            type: 'contract',
            amount: 'Contract Interaction',
            value: '$0.00',
            date: '2024-01-11 08:30',
            status: 'confirmed',
            from: '0x893...f2b1',
            to: '0xContract...',
            hash: '0xdef0123456789abcdef0123456789abcdef0123456789abcdef0123456789ab',
            network: 'Ethereum'
        }
    ]);

    const getIcon = (type) => {
        switch (type) {
            case 'sent': return '↑';
            case 'received': return '↓';
            case 'swap': return '⇄';
            case 'contract': return '📄';
            default: return '•';
        }
    };

    const filteredTransactions = filter === 'all'
        ? transactions
        : transactions.filter(tx => tx.type === filter);

    const csvData = filteredTransactions.map(tx => ({
        Date: tx.date,
        Type: tx.type.charAt(0).toUpperCase() + tx.type.slice(1),
        Amount: tx.amount,
        Value: tx.value,
        Status: tx.status,
        From: tx.from,
        To: tx.to,
        Hash: tx.hash,
        Network: tx.network
    }));

    return (
        <HistoryContainer>
            <Header>
                <h3>Transaction History</h3>
                <CSVLink data={csvData} filename="transactions.csv">
                    <ExportButton>Export CSV</ExportButton>
                </CSVLink>
            </Header>

            <FilterBar>
                <FilterButton
                    active={filter === 'all'}
                    onClick={() => setFilter('all')}
                >
                    All
                </FilterButton>
                <FilterButton
                    active={filter === 'sent'}
                    onClick={() => setFilter('sent')}
                >
                    Sent
                </FilterButton>
                <FilterButton
                    active={filter === 'received'}
                    onClick={() => setFilter('received')}
                >
                    Received
                </FilterButton>
                <FilterButton
                    active={filter === 'swap'}
                    onClick={() => setFilter('swap')}
                >
                    Swap
                </FilterButton>
                <FilterButton
                    active={filter === 'contract'}
                    onClick={() => setFilter('contract')}
                >
                    Contract
                </FilterButton>
            </FilterBar>

            <TransactionList>
                {filteredTransactions.length === 0 ? (
                    <EmptyState>
                        <div style={{ fontSize: '48px', marginBottom: '20px' }}>📜</div>
                        <h4>No transactions found</h4>
                        <p>Your transaction history will appear here</p>
                    </EmptyState>
                ) : (
                    filteredTransactions.map(tx => (
                        <TransactionItem key={tx.id}>
                            <TransactionInfo>
                                <TransactionIcon type={tx.type}>
                                    {getIcon(tx.type)}
                                </TransactionIcon>
                                <TransactionDetails>
                                    <TransactionType>
                                        {tx.type.charAt(0).toUpperCase() + tx.type.slice(1)}
                                    </TransactionType>
                                    <TransactionDate>
                                        {tx.date} • <TransactionStatus status={tx.status}>
                                            {tx.status.charAt(0).toUpperCase() + tx.status.slice(1)}
                                        </TransactionStatus>
                                    </TransactionDate>
                                    <div style={{ fontSize: '12px', color: '#94a3b8', marginTop: '4px' }}>
                                        {tx.network} • {tx.hash.slice(0, 10)}...{tx.hash.slice(-8)}
                                    </div>
                                </TransactionDetails>
                            </TransactionInfo>
                            <div style={{ textAlign: 'right' }}>
                                <TransactionAmount type={tx.type}>
                                    {tx.type === 'sent' ? '-' : tx.type === 'received' ? '+' : ''}{tx.amount}
                                </TransactionAmount>
                                <div style={{ fontSize: '12px', color: '#94a3b8' }}>
                                    {tx.value}
                                </div>
                            </div>
                        </TransactionItem>
                    ))
                )}
            </TransactionList>

            <div style={{
                marginTop: '20px',
                padding: '15px',
                background: '#1a1b2f',
                borderRadius: '8px',
                fontSize: '14px',
                color: '#94a3b8',
                textAlign: 'center'
            }}>
                Showing {filteredTransactions.length} of {transactions.length} transactions
            </div>
        </HistoryContainer>
    );
};

export default TransactionHistory;