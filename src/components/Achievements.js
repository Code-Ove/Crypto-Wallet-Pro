import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { toast } from 'react-toastify';

const AchievementsContainer = styled.div`
  background: ${props => props.theme.colors.surface};
  border: 1px solid ${props => props.theme.colors.border};
  border-radius: 16px;
  padding: 24px;
  margin: 20px 0;
`;

const AchievementGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 20px;
  margin-top: 20px;
`;

const AchievementCard = styled.div`
  background: ${props => props.theme.colors.surfaceLight};
  border: 1px solid ${props => props.theme.colors.border};
  border-radius: 12px;
  padding: 20px;
  text-align: center;
  position: relative;
  opacity: ${props => props.earned ? 1 : 0.6};
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: ${props => props.theme.shadows.md};
  }
`;

const AchievementIcon = styled.div`
  font-size: 40px;
  margin-bottom: 15px;
  filter: ${props => props.earned ? 'none' : 'grayscale(100%)'};
`;

const AchievementTitle = styled.h4`
  margin-bottom: 8px;
  color: ${props => props.theme.colors.text};
`;

const AchievementDescription = styled.p`
  color: ${props => props.theme.colors.textSecondary};
  font-size: 14px;
  margin-bottom: 12px;
`;

const ProgressBar = styled.div`
  background: ${props => props.theme.colors.surface};
  border-radius: 10px;
  height: 6px;
  margin: 10px 0;
  overflow: hidden;
  
  div {
    background: ${props => props.theme.colors.primary};
    height: 100%;
    border-radius: 10px;
    width: ${props => props.progress}%;
    transition: width 0.3s ease;
  }
`;

const RewardBadge = styled.div`
  background: linear-gradient(135deg, #f59e0b, #d97706);
  color: white;
  padding: 4px 8px;
  border-radius: 12px;
  font-size: 12px;
  font-weight: 600;
  display: inline-block;
`;

const EarnedBadge = styled.div`
  position: absolute;
  top: 10px;
  right: 10px;
  background: #10b981;
  color: white;
  padding: 2px 8px;
  border-radius: 10px;
  font-size: 10px;
  font-weight: 600;
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 15px;
  margin-bottom: 30px;
`;

const StatCard = styled.div`
  background: ${props => props.theme.colors.surfaceLight};
  border-radius: 8px;
  padding: 15px;
  text-align: center;
`;

const StatValue = styled.div`
  font-size: 24px;
  font-weight: 700;
  color: ${props => props.theme.colors.primary};
  margin-bottom: 5px;
`;

const StatLabel = styled.div`
  font-size: 12px;
  color: ${props => props.theme.colors.textSecondary};
`;

const Achievements = () => {
    const [achievements, setAchievements] = useState([]);
    const [userStats, setUserStats] = useState({
        totalEarned: 0,
        achievementsCompleted: 0,
        totalRewards: '0 USDC',
        level: 1
    });

    useEffect(() => {
        // Load achievements from localStorage or initialize
        const savedAchievements = localStorage.getItem('userAchievements');
        const savedStats = localStorage.getItem('userStats');

        if (savedAchievements) {
            setAchievements(JSON.parse(savedAchievements));
        } else {
            // Initialize default achievements
            const defaultAchievements = [
                {
                    id: 1,
                    title: 'First Steps',
                    description: 'Create your first wallet',
                    icon: '👶',
                    reward: '5 USDC',
                    progress: 100,
                    total: 1,
                    earned: true,
                    category: 'onboarding'
                },
                {
                    id: 2,
                    title: 'Crypto Pioneer',
                    description: 'Make your first transaction',
                    icon: '🚀',
                    reward: '10 USDC',
                    progress: 100,
                    total: 1,
                    earned: true,
                    category: 'transactions'
                },
                {
                    id: 3,
                    title: 'DeFi Explorer',
                    description: 'Complete a swap on a DEX',
                    icon: '🔄',
                    reward: '15 USDC',
                    progress: 100,
                    total: 1,
                    earned: true,
                    category: 'defi'
                },
                {
                    id: 4,
                    title: 'Multi-Chain Master',
                    description: 'Use 3 different networks',
                    icon: '🌐',
                    reward: '20 USDC',
                    progress: 2,
                    total: 3,
                    earned: false,
                    category: 'networks'
                },
                {
                    id: 5,
                    title: 'NFT Collector',
                    description: 'Add an NFT to your collection',
                    icon: '🖼',
                    reward: '25 USDC',
                    progress: 0,
                    total: 1,
                    earned: false,
                    category: 'nft'
                },
                {
                    id: 6,
                    title: 'Yield Farmer',
                    description: 'Stake tokens in a liquidity pool',
                    icon: '💰',
                    reward: '30 USDC',
                    progress: 0,
                    total: 1,
                    earned: false,
                    category: 'defi'
                },
                {
                    id: 7,
                    title: 'Security Pro',
                    description: 'Enable all security features',
                    icon: '🔒',
                    reward: '25 USDC',
                    progress: 40,
                    total: 5,
                    earned: false,
                    category: 'security'
                },
                {
                    id: 8,
                    title: 'Trading Guru',
                    description: 'Execute 10 trades',
                    icon: '📈',
                    reward: '50 USDC',
                    progress: 3,
                    total: 10,
                    earned: false,
                    category: 'trading'
                }
            ];
            setAchievements(defaultAchievements);
            localStorage.setItem('userAchievements', JSON.stringify(defaultAchievements));
        }

        if (savedStats) {
            setUserStats(JSON.parse(savedStats));
        } else {
            const defaultStats = {
                totalEarned: 30,
                achievementsCompleted: 3,
                totalRewards: '30 USDC',
                level: 1
            };
            setUserStats(defaultStats);
            localStorage.setItem('userStats', JSON.stringify(defaultStats));
        }
    }, []);

    const claimReward = (achievementId) => {
        const achievement = achievements.find(a => a.id === achievementId);
        if (achievement && achievement.progress >= achievement.total && !achievement.earned) {
            const updatedAchievements = achievements.map(a =>
                a.id === achievementId ? { ...a, earned: true } : a
            );

            const rewardAmount = parseInt(achievement.reward);
            const updatedStats = {
                ...userStats,
                totalEarned: userStats.totalEarned + rewardAmount,
                achievementsCompleted: userStats.achievementsCompleted + 1,
                totalRewards: `${userStats.totalEarned + rewardAmount} USDC`
            };

            setAchievements(updatedAchievements);
            setUserStats(updatedStats);

            localStorage.setItem('userAchievements', JSON.stringify(updatedAchievements));
            localStorage.setItem('userStats', JSON.stringify(updatedStats));

            toast.success(`🎉 Achievement unlocked! You earned ${achievement.reward}`);
        }
    };

    const updateProgress = (achievementId, progress) => {
        const updatedAchievements = achievements.map(a => {
            if (a.id === achievementId) {
                const newProgress = Math.min(a.total, a.progress + progress);
                return { ...a, progress: newProgress };
            }
            return a;
        });

        setAchievements(updatedAchievements);
        localStorage.setItem('userAchievements', JSON.stringify(updatedAchievements));
    };

    const categories = [
        { id: 'all', name: 'All', icon: '🏆' },
        { id: 'onboarding', name: 'Onboarding', icon: '👋' },
        { id: 'transactions', name: 'Transactions', icon: '💸' },
        { id: 'defi', name: 'DeFi', icon: '🏦' },
        { id: 'nft', name: 'NFT', icon: '🖼' },
        { id: 'security', name: 'Security', icon: '🔒' },
        { id: 'trading', name: 'Trading', icon: '📈' }
    ];

    const [activeCategory, setActiveCategory] = useState('all');

    const filteredAchievements = activeCategory === 'all'
        ? achievements
        : achievements.filter(a => a.category === activeCategory);

    return (
        <AchievementsContainer>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                <h3>Achievements & Rewards</h3>
                <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                    <div style={{
                        background: '#6366f1',
                        color: 'white',
                        padding: '4px 12px',
                        borderRadius: '20px',
                        fontSize: '14px',
                        fontWeight: '600'
                    }}>
                        Level {userStats.level}
                    </div>
                </div>
            </div>

            <StatsGrid>
                <StatCard>
                    <StatValue>{userStats.achievementsCompleted}</StatValue>
                    <StatLabel>Achievements Completed</StatLabel>
                </StatCard>
                <StatCard>
                    <StatValue>{userStats.totalEarned}</StatValue>
                    <StatLabel>Total Earned (USDC)</StatLabel>
                </StatCard>
                <StatCard>
                    <StatValue>{achievements.length}</StatValue>
                    <StatLabel>Total Achievements</StatLabel>
                </StatCard>
                <StatCard>
                    <StatValue>
                        {Math.round((userStats.achievementsCompleted / achievements.length) * 100)}%
                    </StatValue>
                    <StatLabel>Completion Rate</StatLabel>
                </StatCard>
            </StatsGrid>

            <div style={{
                display: 'flex',
                gap: '10px',
                marginBottom: '20px',
                flexWrap: 'wrap'
            }}>
                {categories.map(category => (
                    <button
                        key={category.id}
                        className={`btn ${activeCategory === category.id ? 'btn-primary' : 'btn-outline'}`}
                        onClick={() => setActiveCategory(category.id)}
                        style={{ fontSize: '14px' }}
                    >
                        {category.icon} {category.name}
                    </button>
                ))}
            </div>

            <AchievementGrid>
                {filteredAchievements.map(achievement => (
                    <AchievementCard
                        key={achievement.id}
                        earned={achievement.earned}
                        onClick={() => !achievement.earned && achievement.progress >= achievement.total && claimReward(achievement.id)}
                        style={{
                            cursor: !achievement.earned && achievement.progress >= achievement.total ? 'pointer' : 'default'
                        }}
                    >
                        {achievement.earned && <EarnedBadge>EARNED</EarnedBadge>}

                        <AchievementIcon earned={achievement.earned}>
                            {achievement.icon}
                        </AchievementIcon>

                        <AchievementTitle>{achievement.title}</AchievementTitle>
                        <AchievementDescription>{achievement.description}</AchievementDescription>

                        <RewardBadge>
                            {achievement.reward}
                        </RewardBadge>

                        {!achievement.earned && (
                            <>
                                <ProgressBar progress={(achievement.progress / achievement.total) * 100}>
                                    <div></div>
                                </ProgressBar>
                                <div style={{ fontSize: '12px', color: '#94a3b8' }}>
                                    {achievement.progress}/{achievement.total}
                                </div>

                                {achievement.progress >= achievement.total && (
                                    <div style={{
                                        marginTop: '10px',
                                        color: '#10b981',
                                        fontSize: '12px',
                                        fontWeight: '600'
                                    }}>
                                        Click to claim reward!
                                    </div>
                                )}
                            </>
                        )}
                    </AchievementCard>
                ))}
            </AchievementGrid>

            <div style={{
                marginTop: '30px',
                padding: '20px',
                background: '#1a1b2f',
                borderRadius: '12px',
                textAlign: 'center'
            }}>
                <h4 style={{ marginBottom: '10px' }}>🎯 Pro Tips</h4>
                <p style={{ color: '#94a3b8', margin: 0 }}>
                    Complete achievements to earn USDC rewards and unlock exclusive features.
                    New achievements are added regularly!
                </p>
            </div>
        </AchievementsContainer>
    );
};

export default Achievements;