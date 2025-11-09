import React, { useState } from 'react';
import styled from 'styled-components';
import { toast } from 'react-toastify';

const FarmingContainer = styled.div`
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

const FarmingPool = styled.div`
  background: ${props => props.theme.colors.surfaceLight};
  border: 1px solid ${props => props.theme.colors.border};
  border-radius: 12px;
  padding: 20px;
  margin-bottom: 15px;
`;

const PoolHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
`;

const PoolTokens = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
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

const PoolInfo = styled.div`
  flex: 1;
`;

const PoolName = styled.div`
  font-weight: 600;
  font-size: 16px;
`;

const PoolAPY = styled.div`
  background: linear-gradient(135deg, #10b981, #059669);
  color: white;
  padding: 4px 12px;
  border-radius: 20px;
  font-size: 14px;
  font-weight: 600;
`;

const PoolStats = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 15px;
  margin: 15px 0;
`;

const Stat = styled.div`
  text-align: center;
  padding: 10px;
  background: ${props => props.theme.colors.surface};
  border-radius: 8px;
`;

const StatValue = styled.div`
  font-weight: 600;
  font-size: 16px;
  margin-bottom: 4px;
`;

const StatLabel = styled.div`
  font-size: 12px;
  color: ${props => props.theme.colors.textSecondary};
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
  margin-top: 10px;
  
  &:hover {
    background: ${props => props.theme.colors.primaryHover};
  }
`;

const Input = styled.input`
  width: 100%;
  padding: 12px;
  background: ${props => props.theme.colors.surface};
  border: 1px solid ${props => props.theme.colors.border};
  border-radius: 8px;
  color: ${props => props.theme.colors.text};
  margin: 10px 0;
`;

const YieldFarming = () => {
    const [depositAmount, setDepositAmount] = useState({});
    const [withdrawAmount, setWithdrawAmount] = useState({});

    const farmingPools = [
        {
            id: 1,
            name: 'ETH-USDT LP',
            tokens: ['ETH', 'USDT'],
            apy: '45.2%',
            tvl: '$12.5M',
            yourStake: '0.5 LP',
            rewards: '125 SUSHI'
        },
        {
            id: 2,
            name: 'MATIC-USDC LP',
            tokens: ['MATIC', 'USDC'],
            apy: '62.8%',
            tvl: '$8.2M',
            yourStake: '150 LP',
            rewards: '450 QUICK'
        },
        {
            id: 3,
            name: 'AVAX-WETH LP',
            tokens: ['AVAX', 'WETH'],
            apy: '78.3%',
            tvl: '$5.7M',
            yourStake: '25 LP',
            rewards: '89 JOE'
        }
    ];

    const handleDeposit = (poolId) => {
        const amount = depositAmount[poolId] || '0';
        if (amount && parseFloat(amount) > 0) {
            toast.success(`Deposited ${amount} LP tokens to farm`);
            setDepositAmount({ ...depositAmount, [poolId]: '' });
        }
    };

    const handleWithdraw = (poolId) => {
        const amount = withdrawAmount[poolId] || '0';
        if (amount && parseFloat(amount) > 0) {
            toast.success(`Withdrawn ${amount} LP tokens from farm`);
            setWithdrawAmount({ ...withdrawAmount, [poolId]: '' });
        }
    };

    const handleHarvest = (poolId) => {
        toast.success('Rewards harvested successfully!');
    };

    return (
        <FarmingContainer>
            <h2>Yield Farming</h2>
            <p style={{ color: '#94a3b8', marginBottom: '30px' }}>
                Provide liquidity to earn high yield farming rewards
            </p>

            <Grid>
                <Card>
                    <h3>Your Farming Positions</h3>
                    {farmingPools.map(pool => (
                        <FarmingPool key={pool.id}>
                            <PoolHeader>
                                <PoolTokens>
                                    <TokenIcon>E</TokenIcon>
                                    <TokenIcon>U</TokenIcon>
                                    <PoolInfo>
                                        <PoolName>{pool.name}</PoolName>
                                        <div style={{ fontSize: '12px', color: '#94a3b8' }}>
                                            {pool.tokens.join(' - ')}
                                        </div>
                                    </PoolInfo>
                                </PoolTokens>
                                <PoolAPY>{pool.apy}</PoolAPY>
                            </PoolHeader>

                            <PoolStats>
                                <Stat>
                                    <StatValue>{pool.yourStake}</StatValue>
                                    <StatLabel>Your Stake</StatLabel>
                                </Stat>
                                <Stat>
                                    <StatValue>{pool.rewards}</StatValue>
                                    <StatLabel>Rewards</StatLabel>
                                </Stat>
                            </PoolStats>

                            <ActionButton onClick={() => handleHarvest(pool.id)}>
                                Harvest Rewards
                            </ActionButton>
                        </FarmingPool>
                    ))}
                </Card>

                <Card>
                    <h3>Add Liquidity</h3>
                    <p style={{ color: '#94a3b8', marginBottom: '20px' }}>
                        Deposit LP tokens to start earning yield
                    </p>

                    {farmingPools.map(pool => (
                        <FarmingPool key={pool.id}>
                            <PoolHeader>
                                <PoolTokens>
                                    <TokenIcon>{pool.tokens[0].charAt(0)}</TokenIcon>
                                    <TokenIcon>{pool.tokens[1].charAt(0)}</TokenIcon>
                                    <PoolName>{pool.name}</PoolName>
                                </PoolTokens>
                                <PoolAPY>{pool.apy}</PoolAPY>
                            </PoolHeader>

                            <Input
                                type="number"
                                placeholder="0.0"
                                value={depositAmount[pool.id] || ''}
                                onChange={(e) => setDepositAmount({
                                    ...depositAmount,
                                    [pool.id]: e.target.value
                                })}
                            />

                            <ActionButton onClick={() => handleDeposit(pool.id)}>
                                Deposit & Farm
                            </ActionButton>
                        </FarmingPool>
                    ))}
                </Card>
            </Grid>
        </FarmingContainer>
    );
};

export default YieldFarming;