import React, { useState } from 'react';
import styled from 'styled-components';
import { toast } from 'react-toastify';

const StakingContainer = styled.div`
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

const StakingCard = styled(Card)`
  background: linear-gradient(135deg, ${props => props.theme.colors.primary}, ${props => props.theme.colors.secondary});
  color: white;
`;

const APYBadge = styled.div`
  background: rgba(255, 255, 255, 0.2);
  padding: 8px 16px;
  border-radius: 20px;
  font-size: 14px;
  font-weight: 600;
  display: inline-block;
  margin-bottom: 15px;
`;

const InputGroup = styled.div`
  margin: 20px 0;
`;

const Input = styled.input`
  width: 100%;
  padding: 12px 16px;
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.3);
  border-radius: 8px;
  color: white;
  font-size: 16px;
  
  &::placeholder {
    color: rgba(255, 255, 255, 0.7);
  }
`;

const Button = styled.button`
  width: 100%;
  padding: 12px;
  background: white;
  color: ${props => props.theme.colors.primary};
  border: none;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  margin-top: 10px;
  
  &:hover {
    background: rgba(255, 255, 255, 0.9);
  }
`;

const StakingPool = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  background: ${props => props.theme.colors.surfaceLight};
  border-radius: 12px;
  margin-bottom: 15px;
  border: 1px solid ${props => props.theme.colors.border};
`;

const PoolInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
`;

const PoolIcon = styled.div`
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

const PoolStats = styled.div`
  text-align: right;
`;

const PoolAPY = styled.div`
  font-size: 16px;
  font-weight: 600;
  color: #10b981;
  margin-bottom: 4px;
`;

const PoolTVL = styled.div`
  font-size: 12px;
  color: ${props => props.theme.colors.textSecondary};
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

const PositionItem = styled.div`
  background: ${props => props.theme.colors.surfaceLight};
  border: 1px solid ${props => props.theme.colors.border};
  border-radius: 12px;
  padding: 20px;
  margin-bottom: 15px;
`;

const PositionHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
`;

const PositionDetails = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 15px;
  font-size: 14px;
`;

const DetailItem = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Staking = () => {
    const [activeTab, setActiveTab] = useState('stake');
    const [stakeAmount, setStakeAmount] = useState('');
    const [unstakeAmount, setUnstakeAmount] = useState('');

    const stakingPools = [
        {
            id: 1,
            symbol: 'ETH',
            name: 'Ethereum 2.0 Staking',
            apy: '4.5%',
            tvl: '$45.2B',
            description: 'Stake ETH to help secure the Ethereum network',
            minStake: '0.01 ETH'
        },
        {
            id: 2,
            symbol: 'MATIC',
            name: 'Polygon Staking',
            apy: '6.2%',
            tvl: '$2.1B',
            description: 'Stake MATIC to secure the Polygon network',
            minStake: '1 MATIC'
        },
        {
            id: 3,
            symbol: 'AVAX',
            name: 'Avalanche Staking',
            apy: '7.8%',
            tvl: '$1.8B',
            description: 'Stake AVAX on the Avalanche network',
            minStake: '1 AVAX'
        },
        {
            id: 4,
            symbol: 'DOT',
            name: 'Polkadot Staking',
            apy: '12.5%',
            tvl: '$3.4B',
            description: 'Stake DOT to secure Polkadot relay chain',
            minStake: '1 DOT'
        }
    ];

    const userPositions = [
        {
            id: 1,
            symbol: 'ETH',
            name: 'Ethereum 2.0',
            staked: '2.5 ETH',
            rewards: '0.12 ETH',
            value: '$4,625',
            apy: '4.5%',
            startDate: '2023-11-15'
        },
        {
            id: 2,
            symbol: 'MATIC',
            name: 'Polygon Staking',
            staked: '150 MATIC',
            rewards: '9.3 MATIC',
            value: '$135',
            apy: '6.2%',
            startDate: '2024-01-10'
        }
    ];

    const handleStake = (poolId) => {
        if (!stakeAmount) {
            toast.error('Please enter an amount to stake');
            return;
        }

        const pool = stakingPools.find(p => p.id === poolId);
        toast.success(`Staked ${stakeAmount} ${pool.symbol} successfully!`);
        setStakeAmount('');
    };

    const handleUnstake = (positionId) => {
        if (!unstakeAmount) {
            toast.error('Please enter an amount to unstake');
            return;
        }

        const position = userPositions.find(p => p.id === positionId);
        toast.success(`Unstaked ${unstakeAmount} ${position.symbol} successfully!`);
        setUnstakeAmount('');
    };

    const handleHarvest = (positionId) => {
        const position = userPositions.find(p => p.id === positionId);
        toast.success(`Harvested ${position.rewards} ${position.symbol} rewards!`);
    };

    return (
        <StakingContainer>
            <h2>Staking</h2>
            <p style={{ color: '#94a3b8', marginBottom: '30px' }}>
                Earn passive income by staking your crypto assets
            </p>

            <TabContainer>
                <Tab
                    active={activeTab === 'stake'}
                    onClick={() => setActiveTab('stake')}
                >
                    Stake Assets
                </Tab>
                <Tab
                    active={activeTab === 'positions'}
                    onClick={() => setActiveTab('positions')}
                >
                    My Positions
                </Tab>
                <Tab
                    active={activeTab === 'pools'}
                    onClick={() => setActiveTab('pools')}
                >
                    Staking Pools
                </Tab>
            </TabContainer>

            {activeTab === 'stake' && (
                <Grid>
                    <StakingCard>
                        <APYBadge>UP TO 12.5% APY</APYBadge>
                        <h3 style={{ color: 'white', marginBottom: '10px' }}>Stake Your Assets</h3>
                        <p style={{ color: 'rgba(255, 255, 255, 0.8)', marginBottom: '20px' }}>
                            Choose a staking pool and start earning rewards
                        </p>

                        <InputGroup>
                            <Input
                                type="number"
                                placeholder="0.0"
                                value={stakeAmount}
                                onChange={(e) => setStakeAmount(e.target.value)}
                            />
                        </InputGroup>

                        <div style={{ marginBottom: '20px' }}>
                            <div style={{ fontSize: '14px', marginBottom: '8px', opacity: 0.8 }}>Select Pool</div>
                            <select
                                style={{
                                    width: '100%',
                                    padding: '12px',
                                    background: 'rgba(255, 255, 255, 0.1)',
                                    border: '1px solid rgba(255, 255, 255, 0.3)',
                                    borderRadius: '8px',
                                    color: 'white'
                                }}
                            >
                                {stakingPools.map(pool => (
                                    <option key={pool.id} value={pool.id}>
                                        {pool.name} ({pool.apy} APY)
                                    </option>
                                ))}
                            </select>
                        </div>

                        <Button onClick={() => handleStake(1)}>
                            Stake Now
                        </Button>
                    </StakingCard>

                    <Card>
                        <h3>Staking Benefits</h3>
                        <ul style={{ color: '#94a3b8', lineHeight: '1.8', paddingLeft: '20px' }}>
                            <li>Earn passive income on your crypto holdings</li>
                            <li>Help secure blockchain networks</li>
                            <li>Competitive APY rates</li>
                            <li>Flexible unstaking periods</li>
                            <li>Compound your rewards</li>
                        </ul>

                        <div style={{
                            marginTop: '20px',
                            padding: '15px',
                            background: '#1a1b2f',
                            borderRadius: '8px',
                            fontSize: '14px'
                        }}>
                            <strong>Note:</strong> Staked assets may have an unbonding period before they can be withdrawn.
                        </div>
                    </Card>
                </Grid>
            )}

            {activeTab === 'positions' && (
                <div>
                    <h3>Your Staking Positions</h3>
                    {userPositions.length === 0 ? (
                        <Card>
                            <div style={{ textAlign: 'center', padding: '40px 20px', color: '#94a3b8' }}>
                                <div style={{ fontSize: '48px', marginBottom: '20px' }}>💰</div>
                                <h4>No active positions</h4>
                                <p>Start staking to earn rewards on your crypto assets</p>
                                <button
                                    className="btn btn-primary"
                                    onClick={() => setActiveTab('stake')}
                                    style={{ marginTop: '15px' }}
                                >
                                    Start Staking
                                </button>
                            </div>
                        </Card>
                    ) : (
                        userPositions.map(position => (
                            <PositionItem key={position.id}>
                                <PositionHeader>
                                    <PoolInfo>
                                        <PoolIcon>{position.symbol.charAt(0)}</PoolIcon>
                                        <div>
                                            <div style={{ fontWeight: '600', fontSize: '16px' }}>{position.name}</div>
                                            <div style={{ fontSize: '12px', color: '#94a3b8' }}>
                                                Started: {position.startDate}
                                            </div>
                                        </div>
                                    </PoolInfo>
                                    <PoolStats>
                                        <PoolAPY>{position.apy} APY</PoolAPY>
                                        <div style={{ fontSize: '12px', color: '#94a3b8' }}>
                                            Value: {position.value}
                                        </div>
                                    </PoolStats>
                                </PositionHeader>

                                <PositionDetails>
                                    <DetailItem>
                                        <span>Staked Amount</span>
                                        <span style={{ fontWeight: '600' }}>{position.staked}</span>
                                    </DetailItem>
                                    <DetailItem>
                                        <span>Rewards Earned</span>
                                        <span style={{ color: '#10b981', fontWeight: '600' }}>{position.rewards}</span>
                                    </DetailItem>
                                </PositionDetails>

                                <div style={{ display: 'flex', gap: '10px', marginTop: '15px' }}>
                                    <button
                                        className="btn btn-primary"
                                        onClick={() => handleHarvest(position.id)}
                                    >
                                        Harvest Rewards
                                    </button>
                                    <button
                                        className="btn btn-outline"
                                        onClick={() => handleUnstake(position.id)}
                                    >
                                        Unstake
                                    </button>
                                </div>
                            </PositionItem>
                        ))
                    )}
                </div>
            )}

            {activeTab === 'pools' && (
                <div>
                    <h3>Available Staking Pools</h3>
                    <Grid>
                        {stakingPools.map(pool => (
                            <Card key={pool.id}>
                                <PoolInfo>
                                    <PoolIcon>{pool.symbol.charAt(0)}</PoolIcon>
                                    <div style={{ flex: 1 }}>
                                        <div style={{ fontWeight: '600', fontSize: '16px', marginBottom: '4px' }}>
                                            {pool.name}
                                        </div>
                                        <div style={{ fontSize: '12px', color: '#94a3b8' }}>
                                            {pool.description}
                                        </div>
                                    </div>
                                </PoolInfo>

                                <div style={{ margin: '15px 0' }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                                        <span style={{ fontSize: '14px', color: '#94a3b8' }}>APY</span>
                                        <span style={{ fontWeight: '600', color: '#10b981' }}>{pool.apy}</span>
                                    </div>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                                        <span style={{ fontSize: '14px', color: '#94a3b8' }}>Total Value Locked</span>
                                        <span style={{ fontWeight: '600' }}>{pool.tvl}</span>
                                    </div>
                                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                        <span style={{ fontSize: '14px', color: '#94a3b8' }}>Minimum Stake</span>
                                        <span style={{ fontWeight: '600' }}>{pool.minStake}</span>
                                    </div>
                                </div>

                                <button
                                    className="btn btn-primary"
                                    onClick={() => {
                                        setActiveTab('stake');
                                        toast.info(`Selected ${pool.name} for staking`);
                                    }}
                                    style={{ width: '100%' }}
                                >
                                    Stake {pool.symbol}
                                </button>
                            </Card>
                        ))}
                    </Grid>
                </div>
            )}
        </StakingContainer>
    );
};

export default Staking;