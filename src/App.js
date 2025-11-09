import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import styled, { ThemeProvider } from 'styled-components';
import { darkTheme } from './styles/theme';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard';
import Wallet from './pages/Wallet';
import Swap from './pages/Swap';
import BuySell from './pages/BuySell';
import Networks from './pages/Networks';
import NFTs from './pages/NFTs';
import Staking from './pages/Staking';
import Bridge from './pages/Bridge';
import DAppBrowser from './pages/DAppBrowser';
import MultisigWallet from './pages/MultisigWallet';
import YieldFarming from './pages/YieldFarming';
import Lending from './pages/Lending';
import AdvancedTrade from './pages/AdvancedTrade';
import TokenDiscovery from './pages/TokenDiscovery';
import Social from './pages/Social';
import Learn from './pages/Learn';
import SecuritySettings from './components/SecuritySettings';
import { WalletProvider } from './hooks/useWallet';
import AddressBook from './components/AddressBook';
import AdvancedCharts from './components/AdvancedCharts';
import Achievements from './components/Achievements';
import ContractInteractor from './tools/ContractInteractor';
import BatchTransactions from './tools/BatchTransactions';
import ScriptRunner from './tools/ScriptRunner';
import APIKeys from './developer/APIKeys';

const AppContainer = styled.div`
  display: flex;
  min-height: 100vh;
  background: ${props => props.theme.colors.background};
  color: ${props => props.theme.colors.text};
`;

const MainContent = styled.div`
  flex: 1;
  margin-left: ${props => props.sidebarOpen ? '250px' : '0'};
  transition: margin-left 0.3s ease;
  padding: 20px;
  
  @media (max-width: 768px) {
    margin-left: 0;
    padding: 10px;
  }
`;

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [darkMode, setDarkMode] = useState(true);

  useEffect(() => {
    const savedTheme = localStorage.getItem('darkMode');
    if (savedTheme !== null) {
      setDarkMode(JSON.parse(savedTheme));
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = !darkMode;
    setDarkMode(newTheme);
    localStorage.setItem('darkMode', JSON.stringify(newTheme));
  };

  return (
    <ThemeProvider theme={darkMode ? darkTheme : darkTheme}>
      <WalletProvider>
        <AppContainer>
          <Sidebar
            isOpen={sidebarOpen}
            toggleSidebar={() => setSidebarOpen(!sidebarOpen)}
          />
          <MainContent sidebarOpen={sidebarOpen}>
            <Header
              toggleSidebar={() => setSidebarOpen(!sidebarOpen)}
              toggleTheme={toggleTheme}
              darkMode={darkMode}
            />
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/wallet" element={<Wallet />} />
              <Route path="/nfts" element={<NFTs />} />
              <Route path="/swap" element={<Swap />} />
              <Route path="/staking" element={<Staking />} />
              <Route path="/bridge" element={<Bridge />} />
              <Route path="/dapp-browser" element={<DAppBrowser />} />
              <Route path="/multisig" element={<MultisigWallet />} />
              <Route path="/yield-farming" element={<YieldFarming />} />
              <Route path="/lending" element={<Lending />} />
              <Route path="/advanced-trade" element={<AdvancedTrade />} />
              <Route path="/buy-sell" element={<BuySell />} />
              <Route path="/networks" element={<Networks />} />
              <Route path="/token-discovery" element={<TokenDiscovery />} />
              <Route path="/social" element={<Social />} />
              <Route path="/learn" element={<Learn />} />
              <Route path="/address-book" element={<AddressBook />} />
              <Route path="/advanced-charts" element={<AdvancedCharts />} />
              <Route path="/achievements" element={<Achievements />} />
              <Route path="/contract-interactor" element={<ContractInteractor />} />
              <Route path="/batch-transactions" element={<BatchTransactions />} />
              <Route path="/script-runner" element={<ScriptRunner />} />
              <Route path="/api-keys" element={<APIKeys />} />
              <Route path="/security" element={<SecuritySettings />} />
            </Routes>
          </MainContent>
          <ToastContainer
            position="bottom-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="dark"
          />
        </AppContainer>
      </WalletProvider>
    </ThemeProvider>
  );
}

export default App;