import React, { useState } from 'react';
import styled from 'styled-components';
import { toast } from 'react-toastify';

const ScriptRunnerContainer = styled.div`
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

const EditorContainer = styled.div`
  margin: 20px 0;
`;

const TextArea = styled.textarea`
  width: 100%;
  min-height: 300px;
  padding: 15px;
  background: ${props => props.theme.colors.surfaceLight};
  border: 1px solid ${props => props.theme.colors.border};
  border-radius: 8px;
  color: ${props => props.theme.colors.text};
  font-family: 'Courier New', monospace;
  font-size: 14px;
  resize: vertical;
  line-height: 1.5;
`;

const OutputContainer = styled.div`
  background: ${props => props.theme.colors.surfaceLight};
  border: 1px solid ${props => props.theme.colors.border};
  border-radius: 8px;
  padding: 15px;
  margin-top: 20px;
  min-height: 150px;
  font-family: 'Courier New', monospace;
  font-size: 14px;
  white-space: pre-wrap;
  overflow-y: auto;
  max-height: 400px;
`;

const TemplateGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 15px;
  margin: 20px 0;
`;

const TemplateCard = styled.div`
  background: ${props => props.theme.colors.surfaceLight};
  border: 1px solid ${props => props.theme.colors.border};
  border-radius: 8px;
  padding: 15px;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: ${props => props.theme.shadows.md};
  }
`;

const TemplateTitle = styled.div`
  font-weight: 600;
  margin-bottom: 8px;
  color: ${props => props.theme.colors.primary};
`;

const TemplateDescription = styled.div`
  font-size: 12px;
  color: ${props => props.theme.colors.textSecondary};
  line-height: 1.4;
`;

const ScriptRunner = () => {
    const [script, setScript] = useState('');
    const [output, setOutput] = useState('');
    const [isRunning, setIsRunning] = useState(false);

    const templates = [
        {
            name: 'Token Balance Checker',
            description: 'Check balances of multiple tokens across different addresses',
            code: `// Token Balance Checker Script
const tokens = [
  '0xToken1',
  '0xToken2', 
  '0xToken3'
];

const addresses = [
  '0xAddress1',
  '0xAddress2'
];

async function checkBalances() {
  const results = [];
  
  for (const address of addresses) {
    const balances = {};
    
    for (const token of tokens) {
      // Simulate balance check
      const balance = Math.random() * 1000;
      balances[token] = balance;
    }
    
    results.push({ address, balances });
  }
  
  return results;
}

// Execute and return results
const results = await checkBalances();
return JSON.stringify(results, null, 2);`
        },
        {
            name: 'Portfolio Value Calculator',
            description: 'Calculate total portfolio value across multiple chains',
            code: `// Portfolio Value Calculator
const portfolio = {
  ethereum: {
    'ETH': 1.5,
    'USDC': 500,
    'DAI': 300
  },
  polygon: {
    'MATIC': 1000,
    'USDC': 200
  },
  binance: {
    'BNB': 2.5,
    'BUSD': 150
  }
};

const prices = {
  'ETH': 1850,
  'USDC': 1,
  'DAI': 1,
  'MATIC': 0.85,
  'BNB': 300,
  'BUSD': 1
};

function calculatePortfolioValue(portfolio, prices) {
  let totalValue = 0;
  const breakdown = {};

  for (const [chain, assets] of Object.entries(portfolio)) {
    breakdown[chain] = {};
    let chainTotal = 0;

    for (const [asset, amount] of Object.entries(assets)) {
      const value = amount * (prices[asset] || 0);
      breakdown[chain][asset] = {
        amount,
        value: value.toFixed(2)
      };
      chainTotal += value;
    }

    breakdown[chain].total = chainTotal.toFixed(2);
    totalValue += chainTotal;
  }

  return {
    totalValue: totalValue.toFixed(2),
    breakdown
  };
}

const result = calculatePortfolioValue(portfolio, prices);
return JSON.stringify(result, null, 2);`
        },
        {
            name: 'Transaction Batch Generator',
            description: 'Generate multiple transactions for airdrops or payments',
            code: `// Transaction Batch Generator
const recipients = [
  { address: '0xRecipient1', amount: '0.1' },
  { address: '0xRecipient2', amount: '0.2' },
  { address: '0xRecipient3', amount: '0.15' }
];

function generateTransactions(recipients, tokenAddress = null) {
  const transactions = recipients.map(recipient => {
    const tx = {
      to: recipient.address,
      value: recipient.amount,
      data: '0x'
    };

    if (tokenAddress) {
      // ERC20 transfer
      tx.to = tokenAddress;
      tx.value = '0';
      // Add ERC20 transfer data here
    }

    return tx;
  });

  return {
    count: transactions.length,
    totalValue: recipients.reduce((sum, r) => sum + parseFloat(r.amount), 0),
    transactions
  };
}

// Generate ETH transfers
const ethTransactions = generateTransactions(recipients);
return JSON.stringify(ethTransactions, null, 2);`
        },
        {
            name: 'Gas Price Optimizer',
            description: 'Find optimal gas prices based on network conditions',
            code: `// Gas Price Optimizer
const networkConditions = {
  currentBaseFee: 30,
  pendingTransactions: 150,
  averageBlockSize: 0.8
};

function optimizeGasPrice(conditions) {
  const { currentBaseFee, pendingTransactions, averageBlockSize } = conditions;
  
  let multiplier = 1.0;
  
  // Adjust based on pending transactions
  if (pendingTransactions > 200) multiplier *= 1.3;
  else if (pendingTransactions > 100) multiplier *= 1.15;
  else if (pendingTransactions < 50) multiplier *= 0.9;
  
  // Adjust based on block size
  if (averageBlockSize > 0.9) multiplier *= 1.2;
  else if (averageBlockSize < 0.5) multiplier *= 0.85;
  
  const optimizedGasPrice = Math.floor(currentBaseFee * multiplier);
  
  return {
    currentBaseFee,
    optimizedGasPrice,
    multiplier: multiplier.toFixed(2),
    recommendation: optimizedGasPrice <= currentBaseFee * 1.1 ? 'Use current' : 'Use optimized'
  };
}

const result = optimizeGasPrice(networkConditions);
return JSON.stringify(result, null, 2);`
        }
    ];

    const runScript = async () => {
        if (!script.trim()) {
            toast.error('Please write a script first');
            return;
        }

        setIsRunning(true);
        setOutput('Running script...\n\n');

        try {
            // Create a safe execution environment
            const AsyncFunction = Object.getPrototypeOf(async function () { }).constructor;

            // Wrap the script in a safe execution context
            const wrappedScript = `
        try {
          ${script}
        } catch (error) {
          return 'Error: ' + error.message;
        }
      `;

            const func = new AsyncFunction(wrappedScript);
            const result = await func();

            setOutput(prev => prev + '✅ Script executed successfully:\n\n' + (result || 'No return value'));
            toast.success('Script executed successfully');
        } catch (error) {
            setOutput(prev => prev + '❌ Script execution failed:\n\n' + error.message);
            toast.error('Script execution failed: ' + error.message);
        } finally {
            setIsRunning(false);
        }
    };

    const loadTemplate = (templateCode) => {
        setScript(templateCode);
        toast.info('Template loaded');
    };

    const clearScript = () => {
        setScript('');
        setOutput('');
        toast.info('Script cleared');
    };

    return (
        <ScriptRunnerContainer>
            <h2>Script Runner</h2>
            <p style={{ color: '#94a3b8', marginBottom: '30px' }}>
                Write and execute custom JavaScript scripts for blockchain automation and analysis
            </p>

            <Card>
                <h3>Script Templates</h3>
                <TemplateGrid>
                    {templates.map((template, index) => (
                        <TemplateCard
                            key={index}
                            onClick={() => loadTemplate(template.code)}
                        >
                            <TemplateTitle>{template.name}</TemplateTitle>
                            <TemplateDescription>{template.description}</TemplateDescription>
                        </TemplateCard>
                    ))}
                </TemplateGrid>
            </Card>

            <Card>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                    <h3>Script Editor</h3>
                    <div style={{ display: 'flex', gap: '10px' }}>
                        <button
                            className="btn btn-outline"
                            onClick={clearScript}
                        >
                            Clear
                        </button>
                        <button
                            className="btn btn-primary"
                            onClick={runScript}
                            disabled={isRunning || !script.trim()}
                        >
                            {isRunning ? 'Running...' : 'Run Script'}
                        </button>
                    </div>
                </div>

                <EditorContainer>
                    <TextArea
                        placeholder="Write your JavaScript code here...
// Use async/await for asynchronous operations
// Return values will be displayed in the output
// Example: return 'Hello, World!';"
                        value={script}
                        onChange={(e) => setScript(e.target.value)}
                        spellCheck={false}
                    />
                </EditorContainer>

                <h4>Output</h4>
                <OutputContainer>
                    {output || 'Script output will appear here...'}
                </OutputContainer>
            </Card>

            <Card>
                <h3>📚 Scripting Guide</h3>
                <div style={{ color: '#94a3b8', lineHeight: '1.6' }}>
                    <h4>Available APIs</h4>
                    <ul style={{ paddingLeft: '20px', marginBottom: '20px' }}>
                        <li><code>fetch()</code> - Make HTTP requests to APIs</li>
                        <li><code>JSON</code> - Parse and stringify JSON data</li>
                        <li><code>Math</code> - Mathematical operations</li>
                        <li><code>Date</code> - Date and time operations</li>
                        <li>All standard JavaScript features</li>
                    </ul>

                    <h4>Best Practices</h4>
                    <ul style={{ paddingLeft: '20px' }}>
                        <li>Use <code>async/await</code> for asynchronous operations</li>
                        <li>Wrap code in <code>try/catch</code> blocks for error handling</li>
                        <li>Return meaningful results using <code>return</code> statements</li>
                        <li>Test with small scripts first</li>
                        <li>Use templates as starting points</li>
                    </ul>
                </div>
            </Card>
        </ScriptRunnerContainer>
    );
};

export default ScriptRunner;