export const phishingDetection = {
    knownPhishingDomains: [
        'myetherwallet.com', // Fake version
        'metamask.io', // Fake version
        'trust-wallet.com', // Fake version
        'coinbase-login.com', // Fake
        'binance-security.com', // Fake
        'crypto-scam.com',
        'free-eth.com',
        'airdrop-scam.com'
    ],

    suspiciousPatterns: [
        /myetherwallet[^.]*\.com/i,
        /metamask[^.]*\.com/i,
        /trust[^.]*wallet/i,
        /coinbase[^.]*login/i,
        /binance[^.]*security/i,
        /free[-_]?crypto/i,
        /airdrop[-_]?reward/i,
        /wallet[-_]?connect[-_]?phishing/i
    ],

    checkUrl: (url) => {
        try {
            const domain = new URL(url).hostname.toLowerCase();

            // Check against known phishing domains
            if (phishingDetection.knownPhishingDomains.includes(domain)) {
                return {
                    isPhishing: true,
                    confidence: 'high',
                    reason: 'Known phishing domain',
                    domain
                };
            }

            // Check for suspicious patterns
            for (const pattern of phishingDetection.suspiciousPatterns) {
                if (pattern.test(domain)) {
                    return {
                        isPhishing: true,
                        confidence: 'medium',
                        reason: 'Suspicious domain pattern',
                        domain,
                        pattern: pattern.toString()
                    };
                }
            }

            // Check for typosquatting (basic version)
            const legitimateDomains = [
                'myetherwallet.com',
                'metamask.io',
                'trustwallet.com',
                'coinbase.com',
                'binance.com'
            ];

            for (const legitDomain of legitimateDomains) {
                if (phishingDetection.isTyposquatting(domain, legitDomain)) {
                    return {
                        isPhishing: true,
                        confidence: 'high',
                        reason: 'Possible typosquatting',
                        domain,
                        legitimateDomain: legitDomain
                    };
                }
            }

            return {
                isPhishing: false,
                confidence: 'low',
                domain
            };

        } catch (error) {
            return {
                isPhishing: false,
                confidence: 'unknown',
                error: 'Invalid URL'
            };
        }
    },

    isTyposquatting: (suspiciousDomain, legitimateDomain) => {
        // Simple Levenshtein distance check for typosquatting
        const levenshteinDistance = (a, b) => {
            const matrix = [];
            for (let i = 0; i <= b.length; i++) {
                matrix[i] = [i];
            }
            for (let j = 0; j <= a.length; j++) {
                matrix[0][j] = j;
            }
            for (let i = 1; i <= b.length; i++) {
                for (let j = 1; j <= a.length; j++) {
                    if (b.charAt(i - 1) === a.charAt(j - 1)) {
                        matrix[i][j] = matrix[i - 1][j - 1];
                    } else {
                        matrix[i][j] = Math.min(
                            matrix[i - 1][j - 1] + 1,
                            matrix[i][j - 1] + 1,
                            matrix[i - 1][j] + 1
                        );
                    }
                }
            }
            return matrix[b.length][a.length];
        };

        const distance = levenshteinDistance(suspiciousDomain, legitimateDomain);
        return distance <= 2 && distance > 0; // Allow for small typos
    },

    checkTransaction: (transaction) => {
        const warnings = [];

        // Check for suspicious amounts
        if (transaction.value && parseFloat(transaction.value) === 0) {
            warnings.push({
                level: 'low',
                message: 'Zero-value transaction - could be a approval or setup transaction'
            });
        }

        // Check for known malicious contracts
        const knownMaliciousContracts = [
            '0x0000000000000000000000000000000000000000', // Example
            '0xdead000000000000000000000000000000000000' // Example
        ];

        if (knownMaliciousContracts.includes(transaction.to?.toLowerCase())) {
            warnings.push({
                level: 'high',
                message: 'Transaction to known malicious contract'
            });
        }

        // Check for unusual gas limits
        if (transaction.gas && parseInt(transaction.gas) > 300000) {
            warnings.push({
                level: 'medium',
                message: 'Unusually high gas limit - could be a complex contract interaction'
            });
        }

        return warnings;
    },

    warnUser: (detectionResult) => {
        if (detectionResult.isPhishing) {
            const message = `⚠️ Security Warning: This website (${detectionResult.domain}) appears to be a phishing site. Reason: ${detectionResult.reason}`;

            // Show browser notification if available
            if ('Notification' in window && Notification.permission === 'granted') {
                new Notification('Phishing Detection Alert', {
                    body: message,
                    icon: '/warning-icon.png'
                });
            }

            // Return message for UI display
            return message;
        }

        return null;
    }
};