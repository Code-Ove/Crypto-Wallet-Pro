import { useState, useEffect } from 'react';

export const useGasPrice = () => {
    const [gasPrices, setGasPrices] = useState({
        slow: { gwei: 25, usd: 2.10 },
        average: { gwei: 30, usd: 2.52 },
        fast: { gwei: 35, usd: 2.94 }
    });
    const [loading, setLoading] = useState(false);

    const fetchGasPrices = async () => {
        setLoading(true);
        try {
            // Simulate API call to gas price service
            setTimeout(() => {
                setGasPrices({
                    slow: { gwei: Math.floor(20 + Math.random() * 10), usd: 2.10 },
                    average: { gwei: Math.floor(25 + Math.random() * 15), usd: 2.52 },
                    fast: { gwei: Math.floor(30 + Math.random() * 20), usd: 2.94 }
                });
                setLoading(false);
            }, 1000);
        } catch (error) {
            console.error('Error fetching gas prices:', error);
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchGasPrices();
        const interval = setInterval(fetchGasPrices, 30000); // Update every 30 seconds
        return () => clearInterval(interval);
    }, []);

    return { gasPrices, loading, refetch: fetchGasPrices };
};