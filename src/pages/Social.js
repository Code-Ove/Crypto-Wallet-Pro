import React, { useState } from 'react';
import styled from 'styled-components';

const SocialContainer = styled.div`
  padding: 20px 0;
`;

const Feed = styled.div`
  max-width: 600px;
  margin: 0 auto;
`;

const PostCard = styled.div`
  background: ${props => props.theme.colors.surface};
  border: 1px solid ${props => props.theme.colors.border};
  border-radius: 16px;
  padding: 20px;
  margin-bottom: 20px;
`;

const PostHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 15px;
`;

const Avatar = styled.div`
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

const PostContent = styled.div`
  margin-bottom: 15px;
  line-height: 1.5;
`;

const PostStats = styled.div`
  display: flex;
  gap: 20px;
  color: ${props => props.theme.colors.textSecondary};
  font-size: 14px;
`;

const Stat = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  cursor: pointer;
  
  &:hover {
    color: ${props => props.theme.colors.primary};
  }
`;

const CreatePost = styled.div`
  background: ${props => props.theme.colors.surface};
  border: 1px solid ${props => props.theme.colors.border};
  border-radius: 16px;
  padding: 20px;
  margin-bottom: 20px;
`;

const TextArea = styled.textarea`
  width: 100%;
  background: ${props => props.theme.colors.surfaceLight};
  border: 1px solid ${props => props.theme.colors.border};
  border-radius: 12px;
  padding: 15px;
  color: ${props => props.theme.colors.text};
  resize: vertical;
  min-height: 80px;
  margin-bottom: 15px;
  
  &::placeholder {
    color: ${props => props.theme.colors.textMuted};
  }
`;

const Social = () => {
    const [newPost, setNewPost] = useState('');

    const posts = [
        {
            id: 1,
            user: 'crypto_trader',
            avatar: 'C',
            content: 'Just entered a long position on ETH. The technical analysis looks bullish with strong support at $1,800. #Trading #ETH',
            likes: 24,
            comments: 8,
            time: '2 hours ago'
        },
        {
            id: 2,
            user: 'defi_enthusiast',
            avatar: 'D',
            content: 'Providing liquidity on Uniswap V3 has been yielding 45% APY. The concentrated liquidity feature is game-changing! #DeFi #Uniswap',
            likes: 42,
            comments: 12,
            time: '5 hours ago'
        },
        {
            id: 3,
            user: 'nft_collector',
            avatar: 'N',
            content: 'Added a new CryptoPunk to my collection! The digital art space continues to evolve rapidly. #NFT #CryptoArt',
            likes: 18,
            comments: 3,
            time: '1 day ago'
        }
    ];

    const handlePost = () => {
        if (newPost.trim()) {
            // In a real app, this would send the post to a backend
            alert('Post created: ' + newPost);
            setNewPost('');
        }
    };

    return (
        <SocialContainer>
            <h2>Social Feed</h2>
            <p style={{ color: '#94a3b8', marginBottom: '30px' }}>
                Connect with other crypto enthusiasts and share insights
            </p>

            <Feed>
                <CreatePost>
                    <TextArea
                        placeholder="Share your crypto insights, trades, or questions..."
                        value={newPost}
                        onChange={(e) => setNewPost(e.target.value)}
                    />
                    <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                        <button
                            className="btn btn-primary"
                            onClick={handlePost}
                            disabled={!newPost.trim()}
                        >
                            Post
                        </button>
                    </div>
                </CreatePost>

                {posts.map(post => (
                    <PostCard key={post.id}>
                        <PostHeader>
                            <Avatar>{post.avatar}</Avatar>
                            <div>
                                <div style={{ fontWeight: '600' }}>{post.user}</div>
                                <div style={{ fontSize: '12px', color: '#94a3b8' }}>
                                    {post.time}
                                </div>
                            </div>
                        </PostHeader>

                        <PostContent>
                            {post.content}
                        </PostContent>

                        <PostStats>
                            <Stat>
                                <span>👍</span>
                                {post.likes}
                            </Stat>
                            <Stat>
                                <span>💬</span>
                                {post.comments}
                            </Stat>
                            <Stat>
                                <span>🔄</span>
                                Share
                            </Stat>
                        </PostStats>
                    </PostCard>
                ))}
            </Feed>
        </SocialContainer>
    );
};

export default Social;