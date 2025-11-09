import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';

export const useBiometricAuth = () => {
    const [isSupported, setIsSupported] = useState(false);
    const [isEnabled, setIsEnabled] = useState(false);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        // Check if biometric authentication is supported
        const checkSupport = () => {
            // Check for WebAuthn (modern browsers)
            if (window.PublicKeyCredential) {
                setIsSupported(true);
                return;
            }

            // Check for platform-specific biometric APIs
            if (navigator.credentials) {
                setIsSupported(true);
                return;
            }

            // Fallback: check if we're in a mobile WebView with biometric support
            setIsSupported(false);
        };

        checkSupport();

        // Check if biometric auth was previously enabled
        const saved = localStorage.getItem('biometricEnabled');
        setIsEnabled(saved === 'true');
    }, []);

    const enableBiometric = async () => {
        if (!isSupported) {
            toast.error('Biometric authentication is not supported on this device');
            return false;
        }

        try {
            // Simulate biometric enrollment
            await new Promise((resolve, reject) => {
                setTimeout(() => {
                    // Mock successful enrollment
                    const success = Math.random() > 0.2; // 80% success rate for demo
                    if (success) {
                        resolve();
                    } else {
                        reject(new Error('Biometric enrollment failed'));
                    }
                }, 2000);
            });

            localStorage.setItem('biometricEnabled', 'true');
            setIsEnabled(true);
            toast.success('Biometric authentication enabled successfully');
            return true;
        } catch (error) {
            toast.error('Failed to enable biometric authentication: ' + error.message);
            return false;
        }
    };

    const disableBiometric = () => {
        localStorage.removeItem('biometricEnabled');
        setIsEnabled(false);
        setIsAuthenticated(false);
        toast.info('Biometric authentication disabled');
    };

    const authenticate = async () => {
        if (!isEnabled) {
            throw new Error('Biometric authentication is not enabled');
        }

        try {
            // Simulate biometric authentication
            await new Promise((resolve, reject) => {
                setTimeout(() => {
                    // Mock authentication (90% success rate for demo)
                    const success = Math.random() > 0.1;
                    if (success) {
                        resolve();
                    } else {
                        reject(new Error('Authentication failed'));
                    }
                }, 1500);
            });

            setIsAuthenticated(true);
            toast.success('Biometric authentication successful');
            return true;
        } catch (error) {
            setIsAuthenticated(false);
            throw error;
        }
    };

    const lock = () => {
        setIsAuthenticated(false);
    };

    return {
        isSupported,
        isEnabled,
        isAuthenticated,
        enableBiometric,
        disableBiometric,
        authenticate,
        lock
    };
};