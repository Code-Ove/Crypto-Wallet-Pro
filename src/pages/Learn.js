import React, { useState } from 'react';
import styled from 'styled-components';

const LearnContainer = styled.div`
  padding: 20px 0;
`;

const CourseGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
  margin: 30px 0;
`;

const CourseCard = styled.div`
  background: ${props => props.theme.colors.surface};
  border: 1px solid ${props => props.theme.colors.border};
  border-radius: 16px;
  padding: 24px;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: ${props => props.theme.shadows.lg};
  }
`;

const CourseIcon = styled.div`
  font-size: 40px;
  margin-bottom: 15px;
`;

const CourseTitle = styled.h3`
  margin-bottom: 10px;
  color: ${props => props.theme.colors.text};
`;

const CourseDescription = styled.p`
  color: ${props => props.theme.colors.textSecondary};
  margin-bottom: 15px;
  line-height: 1.5;
`;

const ProgressBar = styled.div`
  background: ${props => props.theme.colors.surfaceLight};
  border-radius: 10px;
  height: 6px;
  margin: 10px 0;
  
  div {
    background: ${props => props.theme.colors.primary};
    height: 100%;
    border-radius: 10px;
    width: ${props => props.progress}%;
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
  margin-top: 10px;
`;

const Learn = () => {
    const [activeTab, setActiveTab] = useState('courses');

    const courses = [
        {
            id: 1,
            icon: '🎓',
            title: 'Crypto Basics',
            description: 'Learn the fundamentals of blockchain, wallets, and cryptocurrencies.',
            progress: 100,
            reward: '5 USDC',
            duration: '1 hour'
        },
        {
            id: 2,
            icon: '💱',
            title: 'Trading 101',
            description: 'Master the basics of crypto trading, charts, and risk management.',
            progress: 60,
            reward: '10 USDC',
            duration: '2 hours'
        },
        {
            id: 3,
            icon: '🏦',
            title: 'DeFi Deep Dive',
            description: 'Explore decentralized finance, lending, and yield farming.',
            progress: 0,
            reward: '15 USDC',
            duration: '3 hours'
        },
        {
            id: 4,
            icon: '🎨',
            title: 'NFT Masterclass',
            description: 'Everything about NFTs, from creation to investment strategies.',
            progress: 0,
            reward: '8 USDC',
            duration: '1.5 hours'
        }
    ];

    const articles = [
        {
            title: 'Understanding Ethereum 2.0',
            description: 'Learn about the transition to proof-of-stake and its implications.',
            readTime: '5 min'
        },
        {
            title: 'Security Best Practices',
            description: 'Essential tips to keep your crypto assets safe and secure.',
            readTime: '8 min'
        },
        {
            title: 'Tax Guide for Crypto',
            description: 'Everything you need to know about crypto taxes and reporting.',
            readTime: '10 min'
        }
    ];

    return (
        <LearnContainer>
            <h2>Learn & Earn</h2>
            <p style={{ color: '#94a3b8', marginBottom: '30px' }}>
                Expand your crypto knowledge and earn rewards while learning
            </p>

            <div style={{
                display: 'flex',
                gap: '15px',
                marginBottom: '30px',
                background: '#1a1b2f',
                padding: '10px',
                borderRadius: '12px',
                width: 'fit-content'
            }}>
                <button
                    className={`btn ${activeTab === 'courses' ? 'btn-primary' : 'btn-secondary'}`}
                    onClick={() => setActiveTab('courses')}
                >
                    Courses
                </button>
                <button
                    className={`btn ${activeTab === 'articles' ? 'btn-primary' : 'btn-secondary'}`}
                    onClick={() => setActiveTab('articles')}
                >
                    Articles
                </button>
                <button
                    className={`btn ${activeTab === 'videos' ? 'btn-primary' : 'btn-secondary'}`}
                    onClick={() => setActiveTab('videos')}
                >
                    Videos
                </button>
            </div>

            {activeTab === 'courses' && (
                <CourseGrid>
                    {courses.map(course => (
                        <CourseCard key={course.id}>
                            <CourseIcon>{course.icon}</CourseIcon>
                            <CourseTitle>{course.title}</CourseTitle>
                            <CourseDescription>{course.description}</CourseDescription>

                            <div style={{ fontSize: '12px', color: '#94a3b8', marginBottom: '10px' }}>
                                Duration: {course.duration}
                            </div>

                            {course.progress > 0 && (
                                <>
                                    <div style={{ fontSize: '12px', color: '#94a3b8' }}>
                                        Progress: {course.progress}%
                                    </div>
                                    <ProgressBar progress={course.progress}>
                                        <div></div>
                                    </ProgressBar>
                                </>
                            )}

                            <RewardBadge>
                                Earn {course.reward}
                            </RewardBadge>

                            <button
                                className="btn btn-primary"
                                style={{ width: '100%', marginTop: '15px' }}
                            >
                                {course.progress === 0 ? 'Start Course' :
                                    course.progress === 100 ? 'Completed' : 'Continue'}
                            </button>
                        </CourseCard>
                    ))}
                </CourseGrid>
            )}

            {activeTab === 'articles' && (
                <div>
                    {articles.map((article, index) => (
                        <div
                            key={index}
                            style={{
                                background: '#1a1b2f',
                                padding: '20px',
                                borderRadius: '12px',
                                marginBottom: '15px',
                                border: '1px solid #2d3748'
                            }}
                        >
                            <h4 style={{ marginBottom: '10px' }}>{article.title}</h4>
                            <p style={{ color: '#94a3b8', marginBottom: '10px' }}>
                                {article.description}
                            </p>
                            <div style={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center'
                            }}>
                                <span style={{ fontSize: '12px', color: '#6366f1' }}>
                                    {article.readTime} read
                                </span>
                                <button className="btn btn-outline" style={{ fontSize: '14px' }}>
                                    Read Article
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {activeTab === 'videos' && (
                <div style={{ textAlign: 'center', padding: '40px 20px', color: '#94a3b8' }}>
                    <div style={{ fontSize: '48px', marginBottom: '20px' }}>🎥</div>
                    <h3>Video Content Coming Soon</h3>
                    <p>We're working on bringing you high-quality video tutorials and explanations.</p>
                </div>
            )}
        </LearnContainer>
    );
};

export default Learn;