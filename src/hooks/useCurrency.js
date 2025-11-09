import { useState, useEffect } from 'react';

export const useCurrency = () => {
    const [baseCurrency, setBaseCurrency] = useState('USD');
    const [exchangeRates, setExchangeRates] = useState({});
    const [loading, setLoading] = useState(false);

    const currencies = [
        { code: 'USD', symbol: '$', name: 'US Dollar' },
        { code: 'EUR', symbol: '€', name: 'Euro' },
        { code: 'GBP', symbol: '£', name: 'British Pound' },
        { code: 'JPY', symbol: '¥', name: 'Japanese Yen' },
        { code: 'CAD', symbol: 'C$', name: 'Canadian Dollar' },
        { code: 'AUD', symbol: 'A$', name: 'Australian Dollar' },
        { code: 'CHF', symbol: 'CHF', name: 'Swiss Franc' },
        { code: 'CNY', symbol: '¥', name: 'Chinese Yuan' },
        { code: 'INR', symbol: '₹', name: 'Indian Rupee' },
        { code: 'BRL', symbol: 'R$', name: 'Brazilian Real' }
    ];

    const fetchExchangeRates = async () => {
        setLoading(true);
        try {
            // Mock exchange rates - in real app, use an API like CoinGecko
            const mockRates = {
                USD: 1,
                EUR: 0.85,
                GBP: 0.73,
                JPY: 110.25,
                CAD: 1.25,
                AUD: 1.35,
                CHF: 0.92,
                CNY: 6.45,
                INR: 74.50,
                BRL: 5.20
            };

            setExchangeRates(mockRates);

            // Simulate API delay
            setTimeout(() => {
                setLoading(false);
            }, 1000);

        } catch (error) {
            console.error('Error fetching exchange rates:', error);
            setLoading(false);
        }
    };

    const convertAmount = (amount, fromCurrency = 'USD', toCurrency = baseCurrency) => {
        if (!exchangeRates[fromCurrency] || !exchangeRates[toCurrency]) {
            return amount;
        }

        const amountInUSD = amount / exchangeRates[fromCurrency];
        return amountInUSD * exchangeRates[toCurrency];
    };

    const formatCurrency = (amount, currencyCode = baseCurrency) => {
        const currency = currencies.find(c => c.code === currencyCode);
        if (!currency) return `${amount} ${currencyCode}`;

        return `${currency.symbol}${amount.toLocaleString(undefined, {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        })}`;
    };

    const setCurrency = (currencyCode) => {
        if (currencies.find(c => c.code === currencyCode)) {
            setBaseCurrency(currencyCode);
            localStorage.setItem('preferredCurrency', currencyCode);
        }
    };

    useEffect(() => {
        const savedCurrency = localStorage.getItem('preferredCurrency');
        if (savedCurrency && currencies.find(c => c.code === savedCurrency)) {
            setBaseCurrency(savedCurrency);
        }

        fetchExchangeRates();

        // Refresh rates every 5 minutes
        const interval = setInterval(fetchExchangeRates, 5 * 60 * 1000);
        return () => clearInterval(interval);
    }, []);

    return {
        baseCurrency,
        currencies,
        exchangeRates,
        loading,
        setCurrency,
        convertAmount,
        formatCurrency,
        refetchRates: fetchExchangeRates
    };
};