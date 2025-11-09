import React, { createContext, useContext, useState, useEffect } from 'react';
import { ethers } from 'ethers';

const WalletContext = createContext();

export const useWallet = () => {
    const context = useContext(WalletContext);
    if (!context) {
        throw new Error('useWallet must be used within a WalletProvider');
    }
    return context;
};

export const WalletProvider = ({ children }) => {
    const [wallet, setWallet] = useState(null);
    const [balance, setBalance] = useState('0');
    const [address, setAddress] = useState('');
    const [currentNetwork, setCurrentNetwork] = useState('ethereum');
    const [isConnected, setIsConnected] = useState(false);
    const [portfolioValue, setPortfolioValue] = useState(0);

    const networks = {
        ethereum: {
            name: 'Ethereum',
            symbol: 'ETH',
            chainId: 1,
            rpcUrl: 'https://mainnet.infura.io/v3/your-project-id',
            explorer: 'https://etherscan.io'
        },
        binance: {
            name: 'Binance Smart Chain',
            symbol: 'BNB',
            chainId: 56,
            rpcUrl: 'https://bsc-dataseed.binance.org/',
            explorer: 'https://bscscan.com'
        },
        polygon: {
            name: 'Polygon',
            symbol: 'MATIC',
            chainId: 137,
            rpcUrl: 'https://polygon-rpc.com',
            explorer: 'https://polygonscan.com'
        },
        avalanche: {
            name: 'Avalanche',
            symbol: 'AVAX',
            chainId: 43114,
            rpcUrl: 'https://api.avax.network/ext/bc/C/rpc',
            explorer: 'https://snowtrace.io'
        },
        arbitrum: {
            name: 'Arbitrum',
            symbol: 'ETH',
            chainId: 42161,
            rpcUrl: 'https://arb1.arbitrum.io/rpc',
            explorer: 'https://arbiscan.io'
        },
        optimism: {
            name: 'Optimism',
            symbol: 'ETH',
            chainId: 10,
            rpcUrl: 'https://mainnet.optimism.io',
            explorer: 'https://optimistic.etherscan.io'
        }
    };

    // Enhanced wallet functions
    const createWallet = () => {
        try {
            const newWallet = ethers.Wallet.createRandom();
            const walletData = {
                address: newWallet.address,
                privateKey: newWallet.privateKey,
                mnemonic: newWallet.mnemonic.phrase,
                createdAt: new Date().toISOString()
            };

            setWallet(walletData);
            setAddress(newWallet.address);
            setIsConnected(true);
            setBalance('1.245'); // Mock balance
            setPortfolioValue(2300.50); // Mock portfolio value

            localStorage.setItem('cryptoWallet', JSON.stringify(walletData));
            localStorage.setItem('walletConnected', 'true');

            return walletData;
        } catch (error) {
            console.error('Error creating wallet:', error);
            throw error;
        }
    };

    const connectWallet = (privateKeyOrMnemonic) => {
        try {
            let wallet;
            if (privateKeyOrMnemonic.split(' ').length > 1) {
                wallet = ethers.Wallet.fromMnemonic(privateKeyOrMnemonic);
            } else {
                wallet = new ethers.Wallet(privateKeyOrMnemonic);
            }

            const walletData = {
                address: wallet.address,
                privateKey: wallet.privateKey,
                mnemonic: wallet.mnemonic?.phrase || '',
                connectedAt: new Date().toISOString()
            };

            setWallet(walletData);
            setAddress(wallet.address);
            setIsConnected(true);
            setBalance('1.245');
            setPortfolioValue(2300.50);

            localStorage.setItem('cryptoWallet', JSON.stringify(walletData));
            localStorage.setItem('walletConnected', 'true');

            return walletData;
        } catch (error) {
            console.error('Error connecting wallet:', error);
            throw error;
        }
    };

    const disconnectWallet = () => {
        setWallet(null);
        setAddress('');
        setIsConnected(false);
        setBalance('0');
        setPortfolioValue(0);
        localStorage.removeItem('cryptoWallet');
        localStorage.removeItem('walletConnected');
    };

    const switchNetwork = (networkKey) => {
        if (networks[networkKey]) {
            setCurrentNetwork(networkKey);
            localStorage.setItem('currentNetwork', networkKey);
        }
    };

    const getBalance = async () => {
        if (!address) return '0';

        const mockBalances = {
            ethereum: '1.245',
            binance: '5.678',
            polygon: '125.45',
            avalanche: '23.67',
            arbitrum: '0.892',
            optimism: '1.034'
        };

        const balance = mockBalances[currentNetwork] || '0';
        setBalance(balance);
        return balance;
    };

    const getPortfolioValue = () => {
        // Mock portfolio calculation
        const value = 12450.75;
        setPortfolioValue(value);
        return value;
    };

    // Initialize wallet from localStorage
    useEffect(() => {
        const savedWallet = localStorage.getItem('cryptoWallet');
        const savedNetwork = localStorage.getItem('currentNetwork');

        if (savedWallet) {
            const walletData = JSON.parse(savedWallet);
            setWallet(walletData);
            setAddress(walletData.address);
            setIsConnected(true);
            getBalance();
            getPortfolioValue();
        }

        if (savedNetwork && networks[savedNetwork]) {
            setCurrentNetwork(savedNetwork);
        }
    }, []);

    const value = {
        // State
        wallet,
        balance,
        address,
        currentNetwork,
        isConnected,
        portfolioValue,
        networks,

        // Actions
        createWallet,
        connectWallet,
        disconnectWallet,
        switchNetwork,
        getBalance,
        getPortfolioValue
    };

    return (
        <WalletContext.Provider value={value}>
            {children}
        </WalletContext.Provider>
    );
};