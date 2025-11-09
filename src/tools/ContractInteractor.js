import React, { useState } from 'react';
import styled from 'styled-components';
import { toast } from 'react-toastify';

const InteractorContainer = styled.div`
  padding: 20px 0;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 30px;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const Card = styled.div`
  background: ${props => props.theme.colors.surface};
  border: 1px solid ${props => props.theme.colors.border};
  border-radius: 16px;
  padding: 24px;
  box-shadow: ${props => props.theme.shadows.md};
`;

const InputGroup = styled.div`
  margin-bottom: 20px;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 8px;
  font-weight: 600;
  color: ${props => props.theme.colors.text};
`;

const TextArea = styled.textarea`
  width: 100%;
  min-height: 200px;
  padding: 12px;
  background: ${props => props.theme.colors.surfaceLight};
  border: 1px solid ${props => props.theme.colors.border};
  border-radius: 8px;
  color: ${props => props.theme.colors.text};
  font-family: 'Courier New', monospace;
  font-size: 12px;
  resize: vertical;
`;

const FunctionList = styled.div`
  max-height: 400px;
  overflow-y: auto;
`;

const FunctionItem = styled.div`
  padding: 12px;
  background: ${props => props.theme.colors.surfaceLight};
  border: 1px solid ${props => props.theme.colors.border};
  border-radius: 8px;
  margin-bottom: 10px;
  cursor: pointer;
  
  &:hover {
    background: ${props => props.theme.colors.surfaceHover};
  }
  
  &.active {
    border-color: ${props => props.theme.colors.primary};
    background: ${props => props.theme.colors.surfaceHover};
  }
`;

const FunctionName = styled.div`
  font-weight: 600;
  margin-bottom: 4px;
  color: ${props => props.theme.colors.primary};
`;

const FunctionType = styled.div`
  font-size: 12px;
  color: ${props => props.theme.colors.textSecondary};
`;

const ParamInput = styled.input`
  width: 100%;
  padding: 8px 12px;
  background: ${props => props.theme.colors.surfaceLight};
  border: 1px solid ${props => props.theme.colors.border};
  border-radius: 6px;
  color: ${props => props.theme.colors.text};
  margin-bottom: 8px;
`;

const ContractInteractor = () => {
    const [contractAddress, setContractAddress] = useState('');
    const [abi, setAbi] = useState('');
    const [parsedAbi, setParsedAbi] = useState([]);
    const [selectedFunction, setSelectedFunction] = useState(null);
    const [paramValues, setParamValues] = useState({});
    const [result, setResult] = useState('');

    const parseABI = () => {
        try {
            const abiJson = JSON.parse(abi);
            const functions = abiJson.filter(item => item.type === 'function');
            setParsedAbi(functions);
            toast.success(`Found ${functions.length} functions`);
        } catch (error) {
            toast.error('Invalid ABI JSON');
        }
    };

    const handleParamChange = (paramName, value) => {
        setParamValues(prev => ({
            ...prev,
            [paramName]: value
        }));
    };

    const executeFunction = async () => {
        if (!selectedFunction) {
            toast.error('Please select a function first');
            return;
        }

        try {
            // Simulate contract interaction
            const params = selectedFunction.inputs.map(input =>
                paramValues[input.name] || ''
            );

            const result = {
                function: selectedFunction.name,
                params,
                timestamp: new Date().toISOString(),
                success: true,
                data: '0x1234567890abcdef...' // Mock result
            };

            setResult(JSON.stringify(result, null, 2));
            toast.success('Function executed successfully');
        } catch (error) {
            toast.error('Execution failed: ' + error.message);
        }
    };

    const sampleABI = `[
    {
      "inputs": [],
      "name": "name",
      "outputs": [{"internalType": "string", "name": "", "type": "string"}],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "symbol",
      "outputs": [{"internalType": "string", "name": "", "type": "string"}],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "totalSupply",
      "outputs": [{"internalType": "uint256", "name": "", "type": "uint256"}],
      "stateMutability": "view",
      "type": "function"
    }
  ]`;

    const loadSample = () => {
        setAbi(sampleABI);
        setContractAddress('0xTokenAddress...');
    };

    return (
        <InteractorContainer>
            <h2>Contract Interactor</h2>
            <p style={{ color: '#94a3b8', marginBottom: '30px' }}>
                Interact with any smart contract using its ABI
            </p>

            <Grid>
                <Card>
                    <h3>Contract Details</h3>

                    <InputGroup>
                        <Label>Contract Address</Label>
                        <input
                            type="text"
                            className="input"
                            placeholder="0x..."
                            value={contractAddress}
                            onChange={(e) => setContractAddress(e.target.value)}
                        />
                    </InputGroup>

                    <InputGroup>
                        <Label>
                            ABI (Application Binary Interface)
                            <button
                                onClick={loadSample}
                                style={{
                                    marginLeft: '10px',
                                    padding: '4px 8px',
                                    fontSize: '12px'
                                }}
                                className="btn btn-outline"
                            >
                                Load Sample
                            </button>
                        </Label>
                        <TextArea
                            placeholder='Paste contract ABI JSON here...'
                            value={abi}
                            onChange={(e) => setAbi(e.target.value)}
                        />
                    </InputGroup>

                    <button
                        onClick={parseABI}
                        className="btn btn-primary"
                        disabled={!abi}
                    >
                        Parse ABI
                    </button>
                </Card>

                <Card>
                    <h3>Contract Functions</h3>

                    <FunctionList>
                        {parsedAbi.map((func, index) => (
                            <FunctionItem
                                key={index}
                                className={selectedFunction?.name === func.name ? 'active' : ''}
                                onClick={() => setSelectedFunction(func)}
                            >
                                <FunctionName>{func.name}</FunctionName>
                                <FunctionType>
                                    {func.stateMutability} •
                                    Inputs: {func.inputs.length} •
                                    Outputs: {func.outputs.length}
                                </FunctionType>
                            </FunctionItem>
                        ))}
                    </FunctionList>

                    {selectedFunction && (
                        <div style={{ marginTop: '20px' }}>
                            <h4>Execute: {selectedFunction.name}</h4>

                            {selectedFunction.inputs.map((input, index) => (
                                <InputGroup key={index}>
                                    <Label>
                                        {input.name} ({input.type})
                                    </Label>
                                    <ParamInput
                                        type="text"
                                        placeholder={`Enter ${input.type} value`}
                                        value={paramValues[input.name] || ''}
                                        onChange={(e) => handleParamChange(input.name, e.target.value)}
                                    />
                                </InputGroup>
                            ))}

                            <button
                                onClick={executeFunction}
                                className="btn btn-primary"
                            >
                                Execute {selectedFunction.stateMutability === 'view' ? 'Call' : 'Transaction'}
                            </button>
                        </div>
                    )}

                    {result && (
                        <div style={{ marginTop: '20px' }}>
                            <h4>Result</h4>
                            <pre style={{
                                background: '#1a1b2f',
                                padding: '15px',
                                borderRadius: '8px',
                                fontSize: '12px',
                                overflow: 'auto',
                                maxHeight: '200px'
                            }}>
                                {result}
                            </pre>
                        </div>
                    )}
                </Card>
            </Grid>
        </InteractorContainer>
    );
};

export default ContractInteractor;