import { useState, useEffect } from 'react';

export const useWalletConnect = () => {
    const [sessions, setSessions] = useState([]);
    const [connecting, setConnecting] = useState(false);

    const connectToDApp = async (dAppUrl) => {
        setConnecting(true);
        try {
            // Simulate WalletConnect connection
            setTimeout(() => {
                const newSession = {
                    id: Date.now(),
                    dApp: dAppUrl,
                    connectedAt: new Date().toISOString(),
                    status: 'connected'
                };
                setSessions(prev => [...prev, newSession]);
                setConnecting(false);
            }, 2000);
        } catch (error) {
            console.error('Connection failed:', error);
            setConnecting(false);
        }
    };

    const disconnectFromDApp = (sessionId) => {
        setSessions(prev => prev.filter(session => session.id !== sessionId));
    };

    return {
        sessions,
        connecting,
        connectToDApp,
        disconnectFromDApp
    };
};