import React, { useState } from 'react';
import styled from 'styled-components';
import { toast } from 'react-toastify';

const ApprovalsContainer = styled.div`
  background: ${props => props.theme.colors.surface};
  border: 1px solid ${props => props.theme.colors.border};
  border-radius: 16px;
  padding: 24px;
  margin: 20px 0;
`;

const ApprovalItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px;
  background: ${props => props.theme.colors.surfaceLight};
  border-radius: 12px;
  margin-bottom: 12px;
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

const ApprovalDetails = styled.div`
  flex: 1;
`;

const TokenName = styled.div`
  font-weight: 600;
  margin-bottom: 4px;
`;

const ContractAddress = styled.div`
  font-size: 12px;
  color: ${props => props.theme.colors.textSecondary};
  font-family: monospace;
`;

const ApprovalAmount = styled.div`
  text-align: right;
`;

const Amount = styled.div`
  font-weight: 600;
  margin-bottom: 4px;
`;

const RiskLevel = styled.div`
  font-size: 12px;
  color: ${props => {
        switch (props.level) {
            case 'high': return '#ef4444';
            case 'medium': return '#f59e0b';
            case 'low': return '#10b981';
            default: return '#6b7280';
        }
    }};
`;

const RevokeButton = styled.button`
  padding: 8px 16px;
  background: transparent;
  border: 1px solid #ef4444;
  color: #ef4444;
  border-radius: 8px;
  font-size: 12px;
  font-weight: 600;
  cursor: pointer;
  margin-left: 15px;
  
  &:hover {
    background: #ef4444;
    color: white;
  }
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
`;

const TokenApprovals = () => {
    const [filter, setFilter] = useState('all');
    const [approvals, setApprovals] = useState([
        {
            id: 1,
            token: 'USDC',
            name: 'USD Coin',
            contract: '0xUniswapRouter...',
            amount: 'Unlimited',
            risk: 'high',
            date: '2024-01-15'
        },
        {
            id: 2,
            token: 'ETH',
            name: 'Ethereum',
            contract: '0xCompound...',
            amount: '5.0 ETH',
            risk: 'medium',
            date: '2024-01-10'
        },
        {
            id: 3,
            token: 'DAI',
            name: 'Dai Stablecoin',
            contract: '0xAaveLending...',
            amount: '1000 DAI',
            risk: 'low',
            date: '2024-01-05'
        },
        {
            id: 4,
            token: 'MATIC',
            name: 'Polygon',
            contract: '0xQuickSwap...',
            amount: 'Unlimited',
            risk: 'high',
            date: '2024-01-01'
        }
    ]);

    const revokeApproval = (id) => {
        setApprovals(approvals.filter(approval => approval.id !== id));
        toast.success('Token approval revoked!');
    };

    const revokeAll = () => {
        setApprovals([]);
        toast.success('All approvals revoked!');
    };

    const filteredApprovals = filter === 'all'
        ? approvals
        : approvals.filter(approval => approval.risk === filter);

    const highRiskCount = approvals.filter(a => a.risk === 'high').length;

    return (
        <ApprovalsContainer>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                <h3>Token Approvals</h3>
                <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                    {highRiskCount > 0 && (
                        <div style={{
                            background: '#ef4444',
                            color: 'white',
                            padding: '4px 8px',
                            borderRadius: '12px',
                            fontSize: '12px',
                            fontWeight: '600'
                        }}>
                            {highRiskCount} High Risk
                        </div>
                    )}
                    <button
                        className="btn btn-outline"
                        onClick={revokeAll}
                        disabled={approvals.length === 0}
                    >
                        Revoke All
                    </button>
                </div>
            </div>

            <FilterBar>
                <FilterButton
                    active={filter === 'all'}
                    onClick={() => setFilter('all')}
                >
                    All ({approvals.length})
                </FilterButton>
                <FilterButton
                    active={filter === 'high'}
                    onClick={() => setFilter('high')}
                >
                    High Risk ({highRiskCount})
                </FilterButton>
                <FilterButton
                    active={filter === 'medium'}
                    onClick={() => setFilter('medium')}
                >
                    Medium
                </FilterButton>
                <FilterButton
                    active={filter === 'low'}
                    onClick={() => setFilter('low')}
                >
                    Low
                </FilterButton>
            </FilterBar>

            {filteredApprovals.map(approval => (
                <ApprovalItem key={approval.id}>
                    <TokenInfo>
                        <TokenIcon>{approval.token.charAt(0)}</TokenIcon>
                        <ApprovalDetails>
                            <TokenName>{approval.name} ({approval.token})</TokenName>
                            <ContractAddress>
                                {approval.contract.slice(0, 15)}...{approval.contract.slice(-10)}
                            </ContractAddress>
                        </ApprovalDetails>
                    </TokenInfo>

                    <ApprovalAmount>
                        <Amount>{approval.amount}</Amount>
                        <RiskLevel level={approval.risk}>
                            {approval.risk.charAt(0).toUpperCase() + approval.risk.slice(1)} Risk
                        </RiskLevel>
                    </ApprovalAmount>

                    <RevokeButton onClick={() => revokeApproval(approval.id)}>
                        Revoke
                    </RevokeButton>
                </ApprovalItem>
            ))}

            {filteredApprovals.length === 0 && (
                <div style={{
                    textAlign: 'center',
                    padding: '40px 20px',
                    color: '#94a3b8'
                }}>
                    No token approvals found
                </div>
            )}
        </ApprovalsContainer>
    );
};

export default TokenApprovals;