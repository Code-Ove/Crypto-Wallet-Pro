import React from 'react';
import styled from 'styled-components';
import { useWallet } from '../hooks/useWallet';

const HeaderContainer = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 0;
  margin-bottom: 30px;
  border-bottom: 1px solid ${props => props.theme.colors.border};
`;

const LeftSection = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
`;

const MenuButton = styled.button`
  background: none;
  border: none;
  color: ${props => props.theme.colors.text};
  font-size: 24px;
  cursor: pointer;
  padding: 8px;
  border-radius: 8px;
  
  &:hover {
    background: ${props => props.theme.colors.surfaceLight};
  }
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: 700;
  color: ${props => props.theme.colors.text};
`;

const RightSection = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
`;

const NetworkBadge = styled.div`
  background: ${props => props.theme.colors.surfaceLight};
  padding: 8px 16px;
  border-radius: 20px;
  font-size: 14px;
  font-weight: 600;
  border: 1px solid ${props => props.theme.colors.border};
`;

const AddressBadge = styled.div`
  background: ${props => props.theme.colors.surfaceLight};
  padding: 8px 16px;
  border-radius: 20px;
  font-size: 14px;
  font-family: monospace;
  border: 1px solid ${props => props.theme.colors.border};
`;

const ConnectButton = styled.button`
  background: ${props => props.theme.colors.primary};
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 20px;
  font-weight: 600;
  cursor: pointer;
  
  &:hover {
    background: ${props => props.theme.colors.primaryHover};
  }
`;

const ThemeToggle = styled.button`
  background: none;
  border: none;
  color: ${props => props.theme.colors.text};
  font-size: 20px;
  cursor: pointer;
  padding: 8px;
  border-radius: 8px;
  
  &:hover {
    background: ${props => props.theme.colors.surfaceLight};
  }
`;

const NotificationBadge = styled.div`
  position: relative;
  cursor: pointer;
  
  &::after {
    content: '3';
    position: absolute;
    top: -5px;
    right: -5px;
    background: #ef4444;
    color: white;
    border-radius: 50%;
    width: 18px;
    height: 18px;
    font-size: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 600;
  }
`;

const Header = ({ toggleSidebar, toggleTheme, darkMode }) => {
    const { isConnected, address, currentNetwork, networks, disconnectWallet } = useWallet();

    const formatAddress = (addr) => {
        if (!addr) return '';
        return `${addr.slice(0, 6)}...${addr.slice(-4)}`;
    };

    return (
        <HeaderContainer>
            <LeftSection>
                <MenuButton onClick={toggleSidebar}>☰</MenuButton>
                <Title>Crypto Wallet Pro</Title>
            </LeftSection>

            <RightSection>
                {isConnected ? (
                    <>
                        <NetworkBadge>
                            {networks[currentNetwork]?.name}
                        </NetworkBadge>
                        <AddressBadge>
                            {formatAddress(address)}
                        </AddressBadge>
                        <NotificationBadge>
                            <span style={{ fontSize: '20px' }}>🔔</span>
                        </NotificationBadge>
                        <ConnectButton onClick={disconnectWallet}>
                            Disconnect
                        </ConnectButton>
                    </>
                ) : (
                    <ConnectButton>
                        Connect Wallet
                    </ConnectButton>
                )}

                <ThemeToggle onClick={toggleTheme}>
                    {darkMode ? '☀️' : '🌙'}
                </ThemeToggle>
            </RightSection>
        </HeaderContainer>
    );
};

export default Header;