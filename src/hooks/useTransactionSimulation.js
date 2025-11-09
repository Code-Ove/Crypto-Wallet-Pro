import { useState, useCallback } from 'react';
import { toast } from 'react-toastify';

export const useTransactionSimulation = () => {
    const [simulationResult, setSimulationResult] = useState(null);
    const [simulating, setSimulating] = useState(false);

    const simulateTransaction = useCallback(async (transaction) => {
        setSimulating(true);
        try {
            // Simulate transaction simulation
            await new Promise(resolve => setTimeout(resolve, 2000));

            const risks = [];
            const warnings = [];
            const changes = [];

            // Analyze transaction type
            if (transaction.value > 0) {
                changes.push({
                    type: 'transfer',
                    from: transaction.from,
                    to: transaction.to,
                    amount: transaction.value,
                    token: 'ETH'
                });
            }

            // Check for token approvals
            if (transaction.data && transaction.data.startsWith('0x095ea7b3')) {
                risks.push({
                    level: 'high',
                    type: 'token_approval',
                    message: 'This transaction grants token spending approval',
                    details: 'The contract will be able to spend your tokens'
                });
            }

            // Check gas usage
            if (transaction.gasLimit > 300000) {
                warnings.push({
                    level: 'medium',
                    type: 'high_gas',
                    message: 'High gas limit detected',
                    details: 'This transaction may interact with complex contracts'
                });
            }

            // Check recipient
            if (transaction.to === '0x0000000000000000000000000000000000000000') {
                risks.push({
                    level: 'high',
                    type: 'burn_address',
                    message: 'Sending to zero address',
                    details: 'This may result in permanent loss of funds'
                });
            }

            const result = {
                success: true,
                risks,
                warnings,
                changes,
                estimatedGas: Math.floor(transaction.gasLimit * 0.7),
                gasCost: {
                    eth: '0.0021',
                    usd: '4.20'
                },
                overallRisk: risks.length > 0 ? 'high' : warnings.length > 0 ? 'medium' : 'low'
            };

            setSimulationResult(result);
            return result;
        } catch (error) {
            const errorResult = {
                success: false,
                error: error.message,
                overallRisk: 'unknown'
            };
            setSimulationResult(errorResult);
            toast.error('Simulation failed: ' + error.message);
            return errorResult;
        } finally {
            setSimulating(false);
        }
    }, []);

    const clearSimulation = useCallback(() => {
        setSimulationResult(null);
    }, []);

    const getRiskColor = useCallback((riskLevel) => {
        switch (riskLevel) {
            case 'high': return '#ef4444';
            case 'medium': return '#f59e0b';
            case 'low': return '#10b981';
            default: return '#6b7280';
        }
    }, []);

    return {
        simulationResult,
        simulating,
        simulateTransaction,
        clearSimulation,
        getRiskColor
    };
};