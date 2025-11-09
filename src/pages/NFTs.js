import React, { useState } from 'react';
import styled from 'styled-components';

const NFTsContainer = styled.div`
  padding: 20px 0;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 20px;
`;

const NFTCard = styled.div`
  background: ${props => props.theme.colors.surface};
  border: 1px solid ${props => props.theme.colors.border};
  border-radius: 16px;
  overflow: hidden;
  transition: all 0.3s ease;
  cursor: pointer;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: ${props => props.theme.shadows.lg};
  }
`;

const NFTImage = styled.div`
  width: 100%;
  height: 280px;
  background: linear-gradient(45deg, #6366f1, #8b5cf6);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 48px;
  position: relative;
`;

const NFTBadge = styled.div`
  position: absolute;
  top: 10px;
  right: 10px;
  background: ${props => props.theme.colors.primary};
  color: white;
  padding: 4px 8px;
  border-radius: 12px;
  font-size: 10px;
  font-weight: 600;
`;

const NFTInfo = styled.div`
  padding: 16px;
`;

const NFTName = styled.h3`
  font-size: 16px;
  margin-bottom: 8px;
  color: ${props => props.theme.colors.text};
`;

const NFTCollection = styled.div`
  font-size: 14px;
  color: ${props => props.theme.colors.textSecondary};
  margin-bottom: 12px;
`;

const NFTPrice = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 14px;
`;

const PriceLabel = styled.span`
  color: ${props => props.theme.colors.textSecondary};
`;

const PriceValue = styled.span`
  font-weight: 600;
  color: ${props => props.theme.colors.primary};
`;

const FilterBar = styled.div`
  display: flex;
  gap: 10px;
  margin-bottom: 30px;
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

const EmptyState = styled.div`
  text-align: center;
  padding: 60px 20px;
  color: ${props => props.theme.colors.textSecondary};
  grid-column: 1 / -1;
`;

const CollectionStats = styled.div`
  background: ${props => props.theme.colors.surface};
  border: 1px solid ${props => props.theme.colors.border};
  border-radius: 16px;
  padding: 24px;
  margin-bottom: 30px;
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
  margin-top: 20px;
`;

const StatCard = styled.div`
  text-align: center;
  padding: 20px;
  background: ${props => props.theme.colors.surfaceLight};
  border-radius: 12px;
`;

const StatValue = styled.div`
  font-size: 24px;
  font-weight: 700;
  margin-bottom: 5px;
  color: ${props => props.theme.colors.primary};
`;

const StatLabel = styled.div`
  font-size: 12px;
  color: ${props => props.theme.colors.textSecondary};
`;

const NFTs = () => {
    const [activeFilter, setActiveFilter] = useState('all');
    const [selectedNFT, setSelectedNFT] = useState(null);

    const nfts = [
        {
            id: 1,
            name: 'CryptoPunk #1234',
            collection: 'CryptoPunks',
            image: '👨',
            price: '45.2 ETH',
            value: '$83,420',
            rarity: 'Rare',
            ownedSince: '2023-12-01'
        },
        {
            id: 2,
            name: 'Bored Ape #5678',
            collection: 'Bored Ape Yacht Club',
            image: '🐵',
            price: '78.5 ETH',
            value: '$145,225',
            rarity: 'Epic',
            ownedSince: '2023-11-15'
        },
        {
            id: 3,
            name: 'Art Block #9012',
            collection: 'Art Blocks',
            image: '🎨',
            price: '12.3 ETH',
            value: '$22,755',
            rarity: 'Uncommon',
            ownedSince: '2024-01-05'
        },
        {
            id: 4,
            name: 'Doodle #3456',
            collection: 'Doodles',
            image: '👻',
            price: '23.1 ETH',
            value: '$42,735',
            rarity: 'Rare',
            ownedSince: '2023-10-20'
        },
        {
            id: 5,
            name: 'Moonbird #7890',
            collection: 'Moonbirds',
            image: '🦉',
            price: '34.7 ETH',
            value: '$64,195',
            rarity: 'Epic',
            ownedSince: '2023-09-12'
        },
        {
            id: 6,
            name: 'Azuki #1234',
            collection: 'Azuki',
            image: '🎌',
            price: '19.8 ETH',
            value: '$36,630',
            rarity: 'Rare',
            ownedSince: '2024-01-10'
        }
    ];

    const collections = [...new Set(nfts.map(nft => nft.collection))];
    const rarities = ['All', 'Common', 'Uncommon', 'Rare', 'Epic', 'Legendary'];

    const filteredNFTs = activeFilter === 'all'
        ? nfts
        : nfts.filter(nft =>
            nft.collection === activeFilter ||
            nft.rarity.toLowerCase() === activeFilter.toLowerCase()
        );

    const totalValue = nfts.reduce((sum, nft) => {
        return sum + parseFloat(nft.value.replace('$', '').replace(',', ''));
    }, 0);

    const collectionStats = {
        totalNFTs: nfts.length,
        totalValue: `$${totalValue.toLocaleString()}`,
        collections: collections.length,
        averageValue: `$${Math.round(totalValue / nfts.length).toLocaleString()}`
    };

    return (
        <NFTsContainer>
            <h2>NFT Gallery</h2>
            <p style={{ color: '#94a3b8', marginBottom: '30px' }}>
                Manage and display your NFT collection across multiple chains
            </p>

            <CollectionStats>
                <h3>Collection Overview</h3>
                <StatsGrid>
                    <StatCard>
                        <StatValue>{collectionStats.totalNFTs}</StatValue>
                        <StatLabel>Total NFTs</StatLabel>
                    </StatCard>
                    <StatCard>
                        <StatValue>{collectionStats.totalValue}</StatValue>
                        <StatLabel>Total Value</StatLabel>
                    </StatCard>
                    <StatCard>
                        <StatValue>{collectionStats.collections}</StatValue>
                        <StatLabel>Collections</StatLabel>
                    </StatCard>
                    <StatCard>
                        <StatValue>{collectionStats.averageValue}</StatValue>
                        <StatLabel>Average Value</StatLabel>
                    </StatCard>
                </StatsGrid>
            </CollectionStats>

            <FilterBar>
                <FilterButton
                    active={activeFilter === 'all'}
                    onClick={() => setActiveFilter('all')}
                >
                    All NFTs
                </FilterButton>

                {collections.map(collection => (
                    <FilterButton
                        key={collection}
                        active={activeFilter === collection}
                        onClick={() => setActiveFilter(collection)}
                    >
                        {collection}
                    </FilterButton>
                ))}

                {rarities.map(rarity => (
                    <FilterButton
                        key={rarity}
                        active={activeFilter === rarity.toLowerCase()}
                        onClick={() => setActiveFilter(rarity.toLowerCase())}
                    >
                        {rarity}
                    </FilterButton>
                ))}
            </FilterBar>

            <Grid>
                {filteredNFTs.length === 0 ? (
                    <EmptyState>
                        <div style={{ fontSize: '48px', marginBottom: '20px' }}>🖼️</div>
                        <h4>No NFTs found</h4>
                        <p>Try adjusting your filters or import NFTs from another wallet</p>
                        <button className="btn btn-primary" style={{ marginTop: '15px' }}>
                            Import NFTs
                        </button>
                    </EmptyState>
                ) : (
                    filteredNFTs.map(nft => (
                        <NFTCard key={nft.id} onClick={() => setSelectedNFT(nft)}>
                            <NFTImage>
                                {nft.image}
                                <NFTBadge>{nft.rarity}</NFTBadge>
                            </NFTImage>
                            <NFTInfo>
                                <NFTName>{nft.name}</NFTName>
                                <NFTCollection>{nft.collection}</NFTCollection>
                                <NFTPrice>
                                    <PriceLabel>Floor Price</PriceLabel>
                                    <PriceValue>{nft.price}</PriceValue>
                                </NFTPrice>
                                <NFTPrice>
                                    <PriceLabel>Value</PriceLabel>
                                    <PriceValue>{nft.value}</PriceValue>
                                </NFTPrice>
                                <div style={{
                                    fontSize: '12px',
                                    color: '#94a3b8',
                                    marginTop: '10px',
                                    borderTop: '1px solid #2d3748',
                                    paddingTop: '10px'
                                }}>
                                    Owned since {nft.ownedSince}
                                </div>
                            </NFTInfo>
                        </NFTCard>
                    ))
                )}
            </Grid>

            {selectedNFT && (
                <div style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background: 'rgba(0, 0, 0, 0.8)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    zIndex: 1000,
                    padding: '20px'
                }}>
                    <div style={{
                        background: '#1a1b2f',
                        borderRadius: '16px',
                        padding: '30px',
                        maxWidth: '500px',
                        width: '100%',
                        border: '1px solid #2d3748'
                    }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '20px' }}>
                            <h3>{selectedNFT.name}</h3>
                            <button
                                onClick={() => setSelectedNFT(null)}
                                style={{
                                    background: 'none',
                                    border: 'none',
                                    color: '#94a3b8',
                                    fontSize: '24px',
                                    cursor: 'pointer'
                                }}
                            >
                                ×
                            </button>
                        </div>

                        <div style={{
                            background: 'linear-gradient(45deg, #6366f1, #8b5cf6)',
                            height: '300px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontSize: '64px',
                            borderRadius: '12px',
                            marginBottom: '20px'
                        }}>
                            {selectedNFT.image}
                        </div>

                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', marginBottom: '20px' }}>
                            <div>
                                <div style={{ fontSize: '12px', color: '#94a3b8' }}>Collection</div>
                                <div style={{ fontWeight: '600' }}>{selectedNFT.collection}</div>
                            </div>
                            <div>
                                <div style={{ fontSize: '12px', color: '#94a3b8' }}>Rarity</div>
                                <div style={{ fontWeight: '600', color: '#6366f1' }}>{selectedNFT.rarity}</div>
                            </div>
                            <div>
                                <div style={{ fontSize: '12px', color: '#94a3b8' }}>Current Price</div>
                                <div style={{ fontWeight: '600' }}>{selectedNFT.price}</div>
                            </div>
                            <div>
                                <div style={{ fontSize: '12px', color: '#94a3b8' }}>Estimated Value</div>
                                <div style={{ fontWeight: '600' }}>{selectedNFT.value}</div>
                            </div>
                        </div>

                        <div style={{ display: 'flex', gap: '10px' }}>
                            <button className="btn btn-primary" style={{ flex: 1 }}>
                                List for Sale
                            </button>
                            <button className="btn btn-outline" style={{ flex: 1 }}>
                                Transfer
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </NFTsContainer>
    );
};

export default NFTs;