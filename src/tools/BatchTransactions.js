import React, { useState } from 'react';
import styled from 'styled-components';
import { toast } from 'react-toastify';

const BatchContainer = styled.div`
  padding: 20px 0;
`;

const Card = styled.div`
  background: ${props => props.theme.colors.surface};
  border: 1px solid ${props => props.theme.colors.border};
  border-radius: 16px;
  padding: 24px;
  margin-bottom: 20px;
  box-shadow: ${props => props.theme.shadows.md};
`;

const TransactionList = styled.div`
  margin: 20px 0;
`;

const TransactionItem = styled.div`
  background: ${props => props.theme.colors.surfaceLight};
  border: 1px solid ${props => props.theme.colors.border};
  border-radius: 8px;
  padding: 15px;
  margin-bottom: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const TransactionDetails = styled.div`
  flex: 1;
`;

const TransactionTo = styled.div`
  font-weight: 600;
  margin-bottom: 4px;
  font-family: monospace;
`;

const TransactionValue = styled.div`
  color: ${props => props.theme.colors.textSecondary};
  font-size: 14px;
`;

const TransactionActions = styled.div`
  display: flex;
  gap: 10px;
`;

const AddTransactionForm = styled.div`
  background: ${props => props.theme.colors.surfaceLight};
  border: 1px solid ${props => props.theme.colors.border};
  border-radius: 12px;
  padding: 20px;
  margin: 20px 0;
`;

const FormGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr auto;
  gap: 15px;
  align-items: end;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
`;

const Label = styled.label`
  margin-bottom: 8px;
  font-weight: 600;
  color: ${props => props.theme.colors.text};
`;

const Input = styled.input`
  padding: 12px;
  background: ${props => props.theme.colors.surface};
  border: 1px solid ${props => props.theme.colors.border};
  border-radius: 8px;
  color: ${props => props.theme.colors.text};
`;

const BatchSummary = styled.div`
  background: ${props => props.theme.colors.surfaceLight};
  border-radius: 12px;
  padding: 20px;
  margin: 20px 0;
`;

const SummaryGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 15px;
`;

const SummaryItem = styled.div`
  text-align: center;
  padding: 15px;
  background: ${props => props.theme.colors.surface};
  border-radius: 8px;
`;

const SummaryValue = styled.div`
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 5px;
  color: ${props => props.theme.colors.primary};
`;

const SummaryLabel = styled.div`
  font-size: 12px;
  color: ${props => props.theme.colors.textSecondary};
`;

const BatchTransactions = () => {
    const [transactions, setTransactions] = useState([]);
    const [newTransaction, setNewTransaction] = useState({
        to: '',
        value: '',
        data: ''
    });

    const addTransaction = () => {
        if (!newTransaction.to || !newTransaction.value) {
            toast.error('Please fill in recipient and value');
            return;
        }

        // Basic address validation
        if (!newTransaction.to.match(/^0x[a-fA-F0-9]{40}$/)) {
            toast.error('Invalid Ethereum address');
            return;
        }

        const transaction = {
            id: Date.now(),
            to: newTransaction.to,
            value: newTransaction.value,
            data: newTransaction.data || '0x',
            status: 'pending'
        };

        setTransactions([...transactions, transaction]);
        setNewTransaction({ to: '', value: '', data: '' });
        toast.success('Transaction added to batch');
    };

    const removeTransaction = (id) => {
        setTransactions(transactions.filter(tx => tx.id !== id));
        toast.info('Transaction removed from batch');
    };

    const clearAll = () => {
        setTransactions([]);
        toast.info('All transactions cleared');
    };

    const executeBatch = async () => {
        if (transactions.length === 0) {
            toast.error('No transactions to execute');
            return;
        }

        try {
            // Simulate batch execution
            toast.info('Executing batch transactions...');

            await new Promise(resolve => setTimeout(resolve, 3000));

            // Update transaction statuses
            const updatedTransactions = transactions.map(tx => ({
                ...tx,
                status: 'completed',
                hash: `0x${Math.random().toString(16).substr(2, 64)}`
            }));

            setTransactions(updatedTransactions);
            toast.success(`Successfully executed ${transactions.length} transactions`);
        } catch (error) {
            toast.error('Batch execution failed: ' + error.message);
        }
    };

    const totalValue = transactions.reduce((sum, tx) => sum + parseFloat(tx.value || 0), 0);
    const gasEstimate = transactions.length * 21000; // Simple gas estimate

    const importFromCSV = (event) => {
        const file = event.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (e) => {
            try {
                const csv = e.target.result;
                const lines = csv.split('\n');
                const importedTransactions = [];

                for (let i = 1; i < lines.length; i++) { // Skip header
                    const [to, value, data] = lines[i].split(',');
                    if (to && value) {
                        importedTransactions.push({
                            id: Date.now() + i,
                            to: to.trim(),
                            value: value.trim(),
                            data: (data || '0x').trim(),
                            status: 'pending'
                        });
                    }
                }

                setTransactions([...transactions, ...importedTransactions]);
                toast.success(`Imported ${importedTransactions.length} transactions from CSV`);
            } catch (error) {
                toast.error('Failed to import CSV: ' + error.message);
            }
        };
        reader.readAsText(file);
    };

    const exportToCSV = () => {
        const headers = 'To,Value,Data\n';
        const rows = transactions.map(tx =>
            `${tx.to},${tx.value},${tx.data}`
        ).join('\n');

        const csv = headers + rows;
        const blob = new Blob([csv], { type: 'text/csv' });
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `batch-transactions-${new Date().toISOString().split('T')[0]}.csv`;
        link.click();
        window.URL.revokeObjectURL(url);
    };

    return (
        <BatchContainer>
            <h2>Batch Transactions</h2>
            <p style={{ color: '#94a3b8', marginBottom: '30px' }}>
                Execute multiple transactions in one batch to save time and gas fees
            </p>

            <Card>
                <h3>Add Transactions</h3>

                <AddTransactionForm>
                    <FormGrid>
                        <InputGroup>
                            <Label>Recipient Address</Label>
                            <Input
                                type="text"
                                placeholder="0x..."
                                value={newTransaction.to}
                                onChange={(e) => setNewTransaction({ ...newTransaction, to: e.target.value })}
                            />
                        </InputGroup>

                        <InputGroup>
                            <Label>Value (ETH)</Label>
                            <Input
                                type="number"
                                placeholder="0.0"
                                value={newTransaction.value}
                                onChange={(e) => setNewTransaction({ ...newTransaction, value: e.target.value })}
                            />
                        </InputGroup>

                        <InputGroup>
                            <Label>Data (Optional)</Label>
                            <Input
                                type="text"
                                placeholder="0x"
                                value={newTransaction.data}
                                onChange={(e) => setNewTransaction({ ...newTransaction, data: e.target.value })}
                            />
                        </InputGroup>

                        <button
                            className="btn btn-primary"
                            onClick={addTransaction}
                            style={{ height: 'fit-content' }}
                        >
                            Add to Batch
                        </button>
                    </FormGrid>
                </AddTransactionForm>

                <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
                    <label className="btn btn-outline" style={{ cursor: 'pointer' }}>
                        📁 Import CSV
                        <input
                            type="file"
                            accept=".csv"
                            onChange={importFromCSV}
                            style={{ display: 'none' }}
                        />
                    </label>

                    <button
                        className="btn btn-outline"
                        onClick={exportToCSV}
                        disabled={transactions.length === 0}
                    >
                        📤 Export CSV
                    </button>

                    <button
                        className="btn btn-outline"
                        onClick={clearAll}
                        disabled={transactions.length === 0}
                    >
                        🗑️ Clear All
                    </button>
                </div>
            </Card>

            {transactions.length > 0 && (
                <BatchSummary>
                    <h4>Batch Summary</h4>
                    <SummaryGrid>
                        <SummaryItem>
                            <SummaryValue>{transactions.length}</SummaryValue>
                            <SummaryLabel>Transactions</SummaryLabel>
                        </SummaryItem>
                        <SummaryItem>
                            <SummaryValue>{totalValue.toFixed(4)} ETH</SummaryValue>
                            <SummaryLabel>Total Value</SummaryLabel>
                        </SummaryItem>
                        <SummaryItem>
                            <SummaryValue>{(gasEstimate / 1000000).toFixed(2)}M</SummaryValue>
                            <SummaryLabel>Estimated Gas</SummaryLabel>
                        </SummaryItem>
                        <SummaryItem>
                            <SummaryValue>
                                ${(totalValue * 1850).toFixed(2)}
                            </SummaryValue>
                            <SummaryLabel>Total USD</SummaryLabel>
                        </SummaryItem>
                    </SummaryGrid>
                </BatchSummary>
            )}

            <Card>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                    <h3>Transaction Batch ({transactions.length})</h3>
                    <button
                        className="btn btn-primary"
                        onClick={executeBatch}
                        disabled={transactions.length === 0}
                    >
                        🚀 Execute Batch
                    </button>
                </div>

                <TransactionList>
                    {transactions.length === 0 ? (
                        <div style={{
                            textAlign: 'center',
                            padding: '40px 20px',
                            color: '#94a3b8'
                        }}>
                            <div style={{ fontSize: '48px', marginBottom: '20px' }}>📝</div>
                            <h4>No transactions in batch</h4>
                            <p>Add transactions above to get started</p>
                        </div>
                    ) : (
                        transactions.map(transaction => (
                            <TransactionItem key={transaction.id}>
                                <TransactionDetails>
                                    <TransactionTo>
                                        {transaction.to.slice(0, 10)}...{transaction.to.slice(-8)}
                                    </TransactionTo>
                                    <TransactionValue>
                                        {transaction.value} ETH • {transaction.data === '0x' ? 'Transfer' : 'Contract Call'}
                                    </TransactionValue>
                                    {transaction.hash && (
                                        <div style={{ fontSize: '12px', color: '#10b981', marginTop: '5px' }}>
                                            Hash: {transaction.hash.slice(0, 10)}... ✅
                                        </div>
                                    )}
                                </TransactionDetails>
                                <TransactionActions>
                                    <button
                                        className="btn btn-outline"
                                        onClick={() => removeTransaction(transaction.id)}
                                        style={{ fontSize: '12px', padding: '6px 12px' }}
                                    >
                                        Remove
                                    </button>
                                </TransactionActions>
                            </TransactionItem>
                        ))
                    )}
                </TransactionList>
            </Card>

            <Card>
                <h3>💡 Batch Transaction Tips</h3>
                <ul style={{ color: '#94a3b8', lineHeight: '1.6', paddingLeft: '20px' }}>
                    <li>Batch transactions can save up to 80% on gas fees compared to individual transactions</li>
                    <li>Use CSV import for adding multiple transactions quickly</li>
                    <li>Always test with small amounts first</li>
                    <li>Check gas prices before executing large batches</li>
                    <li>Keep transaction data under 24KB to avoid out-of-gas errors</li>
                </ul>
            </Card>
        </BatchContainer>
    );
};

export default BatchTransactions;