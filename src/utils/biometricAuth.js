export const biometricAuth = {
    isSupported: () => {
        // Check if biometric authentication is supported
        return typeof window !== 'undefined' &&
            (window.PublicKeyCredential !== undefined ||
                window.localStorage !== undefined);
    },

    enableBiometric: async () => {
        try {
            // Simulate biometric setup
            return new Promise((resolve) => {
                setTimeout(() => {
                    localStorage.setItem('biometricEnabled', 'true');
                    resolve({ success: true });
                }, 1000);
            });
        } catch (error) {
            return { success: false, error: error.message };
        }
    },

    disableBiometric: () => {
        localStorage.removeItem('biometricEnabled');
        return { success: true };
    },

    authenticate: async () => {
        try {
            // Simulate biometric authentication
            return new Promise((resolve) => {
                setTimeout(() => {
                    resolve({ success: true });
                }, 500);
            });
        } catch (error) {
            return { success: false, error: 'Authentication failed' };
        }
    },

    isEnabled: () => {
        return localStorage.getItem('biometricEnabled') === 'true';
    }
};