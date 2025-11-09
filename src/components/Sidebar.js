import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import styled from 'styled-components';

const SidebarContainer = styled.aside`
  width: 264px;
  background: ${props => props.theme.colors.surface};
  border-right: 1px solid ${props => props.theme.colors.border};
  position: fixed;
  top: 0;
  left: ${props => props.isOpen ? '0' : '-264px'};
  height: 100vh;
  transition: left 0.3s ease;
  z-index: 1000;
  padding: 20px 0;
  overflow-y: auto;
  
  @media (max-width: 768px) {
    left: ${props => props.isOpen ? '0' : '-280px'};
  }
`;

const Logo = styled.div`
  padding: 0 20px 20px;
  border-bottom: 1px solid ${props => props.theme.colors.border};
  margin-bottom: 20px;
`;

const LogoText = styled.h2`
  color: ${props => props.theme.colors.primary};
  font-size: 24px;
  font-weight: 700;
`;

const NavSection = styled.div`
  margin-bottom: 25px;
`;

const SectionTitle = styled.div`
  padding: 0 20px 10px;
  font-size: 12px;
  font-weight: 600;
  color: ${props => props.theme.colors.textSecondary};
  text-transform: uppercase;
  letter-spacing: 1px;
`;

const Nav = styled.nav`
  display: flex;
  flex-direction: column;
  gap: 2px;
  padding: 0 15px;
`;

const NavItem = styled(Link)`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 15px;
  color: ${props => props.theme.colors.textSecondary};
  text-decoration: none;
  border-radius: 10px;
  transition: all 0.3s ease;
  font-weight: 500;
  font-size: 14px;
  
  background: ${props => props.active ? props.theme.colors.surfaceLight : 'transparent'};
  color: ${props => props.active ? props.theme.colors.primary : props.theme.colors.textSecondary};
  
  &:hover {
    background: ${props => props.theme.colors.surfaceLight};
    color: ${props => props.theme.colors.primary};
  }
`;

const NavIcon = styled.span`
  font-size: 18px;
  width: 20px;
  text-align: center;
`;

const Badge = styled.span`
  background: ${props => props.theme.colors.primary};
  color: white;
  padding: 2px 6px;
  border-radius: 8px;
  font-size: 10px;
  font-weight: 600;
  margin-left: auto;
`;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 999;
  display: ${props => props.show ? 'block' : 'none'};
  
  @media (min-width: 769px) {
    display: none;
  }
`;

const Sidebar = ({ isOpen, toggleSidebar }) => {
    const location = useLocation();

    const coreFeatures = [
        { path: '/', icon: '📊', label: 'Dashboard' },
        { path: '/wallet', icon: '👛', label: 'Wallet' },
        { path: '/nfts', icon: '🖼', label: 'NFT Gallery', badge: 'NEW' },
    ];

    const tradingFeatures = [
        { path: '/swap', icon: '🔄', label: 'Swap' },
        { path: '/advanced-trade', icon: '📈', label: 'Advanced Trade' },
        { path: '/bridge', icon: '🌉', label: 'Cross-Chain Bridge' },
        { path: '/buy-sell', icon: '💳', label: 'Buy/Sell' },
    ];

    const defiFeatures = [
        { path: '/staking', icon: '💰', label: 'Staking' },
        { path: '/yield-farming', icon: '🌾', label: 'Yield Farming' },
        { path: '/lending', icon: '🏦', label: 'Lending' },
    ];

   

    const socialFeatures = [
        { path: '/social', icon: '👥', label: 'Social' },
        { path: '/learn', icon: '📚', label: 'Learn & Earn' },
    ];

    const settingsFeatures = [
        { path: '/networks', icon: '⚡', label: 'Networks' },
        { path: '/security', icon: '🔒', label: 'Security' },
        { path: '/address-book', icon: '📒', label: 'Address Book' },
        { path: '/api-keys', icon: '🔑', label: 'API Keys' },
    ];
    const advancedFeatures = [
        { path: '/dapp-browser', icon: '🌐', label: 'DApp Browser' },
        { path: '/multisig', icon: '👥', label: 'Multi-Sig Wallet' },
        { path: '/token-discovery', icon: '🔍', label: 'Token Discovery' },
        { path: '/contract-interactor', icon: '⚙️', label: 'Contract Interactor' },
        { path: '/batch-transactions', icon: '📦', label: 'Batch Transactions' },
        { path: '/script-runner', icon: '📜', label: 'Script Runner' },
        { path: '/dapp-browser', icon: '🌐', label: 'DApp Browser' },
        { path: '/multisig', icon: '👥', label: 'Multi-Sig Wallet' },
        { path: '/token-discovery', icon: '🔍', label: 'Token Discovery' },
    ];

    const analyticsFeatures = [
        { path: '/advanced-charts', icon: '📊', label: 'Advanced Charts' },
        { path: '/achievements', icon: '🏆', label: 'Achievements' },
    ];


    return (
        <>
            <Overlay show={isOpen} onClick={toggleSidebar} />
            <SidebarContainer isOpen={isOpen}>
                <Logo>
                    <LogoText>WalletPro</LogoText>
                </Logo>

                <NavSection>
                    <SectionTitle>Core</SectionTitle>
                    <Nav>
                        {coreFeatures.map(item => (
                            <NavItem
                                key={item.path}
                                to={item.path}
                                active={location.pathname === item.path ? 1 : 0}
                                onClick={() => window.innerWidth < 769 && toggleSidebar()}
                            >
                                <NavIcon>{item.icon}</NavIcon>
                                {item.label}
                                {item.badge && <Badge>{item.badge}</Badge>}
                            </NavItem>
                        ))}
                    </Nav>
                </NavSection>

                <NavSection>
                    <SectionTitle>Trading</SectionTitle>
                    <Nav>
                        {tradingFeatures.map(item => (
                            <NavItem
                                key={item.path}
                                to={item.path}
                                active={location.pathname === item.path ? 1 : 0}
                                onClick={() => window.innerWidth < 769 && toggleSidebar()}
                            >
                                <NavIcon>{item.icon}</NavIcon>
                                {item.label}
                            </NavItem>
                        ))}
                    </Nav>
                </NavSection>

                <NavSection>
                    <SectionTitle>DeFi</SectionTitle>
                    <Nav>
                        {defiFeatures.map(item => (
                            <NavItem
                                key={item.path}
                                to={item.path}
                                active={location.pathname === item.path ? 1 : 0}
                                onClick={() => window.innerWidth < 769 && toggleSidebar()}
                            >
                                <NavIcon>{item.icon}</NavIcon>
                                {item.label}
                            </NavItem>
                        ))}
                    </Nav>
                </NavSection>

                <NavSection>
                    <SectionTitle>Advanced</SectionTitle>
                    <Nav>
                        {advancedFeatures.map(item => (
                            <NavItem
                                key={item.path}
                                to={item.path}
                                active={location.pathname === item.path ? 1 : 0}
                                onClick={() => window.innerWidth < 769 && toggleSidebar()}
                            >
                                <NavIcon>{item.icon}</NavIcon>
                                {item.label}
                            </NavItem>
                        ))}
                    </Nav>
                </NavSection>

                <NavSection>
                    <SectionTitle>Social & Learn</SectionTitle>
                    <Nav>
                        {socialFeatures.map(item => (
                            <NavItem
                                key={item.path}
                                to={item.path}
                                active={location.pathname === item.path ? 1 : 0}
                                onClick={() => window.innerWidth < 769 && toggleSidebar()}
                            >
                                <NavIcon>{item.icon}</NavIcon>
                                {item.label}
                            </NavItem>
                        ))}
                    </Nav>
                </NavSection>

                <NavSection>
                    <SectionTitle>Settings</SectionTitle>
                    <Nav>
                        {settingsFeatures.map(item => (
                            <NavItem
                                key={item.path}
                                to={item.path}
                                active={location.pathname === item.path ? 1 : 0}
                                onClick={() => window.innerWidth < 769 && toggleSidebar()}
                            >
                                <NavIcon>{item.icon}</NavIcon>
                                {item.label}
                            </NavItem>
                        ))}
                    </Nav>
                </NavSection>
            </SidebarContainer>
        </>
    );
};

export default Sidebar;