import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';

export const useNotifications = () => {
    const [notifications, setNotifications] = useState([]);
    const [permission, setPermission] = useState('default');

    const requestPermission = async () => {
        if (!('Notification' in window)) {
            toast.error('This browser does not support notifications');
            return false;
        }

        try {
            const result = await Notification.requestPermission();
            setPermission(result);
            return result === 'granted';
        } catch (error) {
            console.error('Error requesting notification permission:', error);
            return false;
        }
    };

    const showNotification = (title, options = {}) => {
        if (permission !== 'granted') {
            // Fallback to toast
            toast.info(title);
            return;
        }

        const notification = new Notification(title, {
            icon: '/crypto-wallet-icon.png',
            badge: '/crypto-wallet-badge.png',
            ...options
        });

        const newNotification = {
            id: Date.now(),
            title,
            ...options,
            timestamp: new Date().toISOString()
        };

        setNotifications(prev => [newNotification, ...prev.slice(0, 49)]); // Keep last 50

        notification.onclick = () => {
            window.focus();
            notification.close();
        };
    };

    const clearNotifications = () => {
        setNotifications([]);
    };

    const removeNotification = (id) => {
        setNotifications(prev => prev.filter(notif => notif.id !== id));
    };

    // Price alert notification
    const createPriceAlert = (token, targetPrice, condition) => {
        const alert = {
            id: `price-alert-${Date.now()}`,
            type: 'price_alert',
            token,
            targetPrice,
            condition,
            active: true,
            createdAt: new Date().toISOString()
        };

        // In a real app, this would be saved to a backend
        const alerts = JSON.parse(localStorage.getItem('priceAlerts') || '[]');
        alerts.push(alert);
        localStorage.setItem('priceAlerts', JSON.stringify(alerts));

        showNotification(`Price alert set for ${token} ${condition} $${targetPrice}`);
    };

    // Transaction notification
    const notifyTransaction = (hash, status, amount, token) => {
        const messages = {
            pending: `Transaction pending: ${amount} ${token}`,
            confirmed: `Transaction confirmed: ${amount} ${token}`,
            failed: `Transaction failed: ${amount} ${token}`
        };

        showNotification(messages[status], {
            data: { hash, status, type: 'transaction' }
        });
    };

    // Security notification
    const notifySecurity = (message, level = 'info') => {
        showNotification(`Security: ${message}`, {
            data: { type: 'security', level }
        });
    };

    useEffect(() => {
        // Check existing permission
        if ('Notification' in window) {
            setPermission(Notification.permission);
        }

        // Load saved notifications
        const savedAlerts = localStorage.getItem('priceAlerts');
        if (savedAlerts) {
            // You could set up interval checks for price alerts here
        }
    }, []);

    return {
        notifications,
        permission,
        requestPermission,
        showNotification,
        clearNotifications,
        removeNotification,
        createPriceAlert,
        notifyTransaction,
        notifySecurity
    };
};