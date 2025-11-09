import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useGasPrice } from '../hooks/useGasPrice';

const GasContainer = styled.div`
  background: ${props => props.theme.colors.surface};
  border: 1px solid ${props => props.theme.colors.border};
  border-radius: 12px;
  padding: 20px;
  margin: 15px 0;
`;

const GasOption = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px;
  background: ${props => props.active ? props.theme.colors.surfaceLight : 'transparent'};
  border: 1px solid ${props => props.active ? props.theme.colors.primary : props.theme.colors.border};
  border-radius: 8px;
  margin-bottom: 10px;
  cursor: pointer;
  
  &:hover {
    background: ${props => props.theme.colors.surfaceLight};
  }
`;

const GasInfo = styled.div`
  display: flex;
  flex-direction: column;
`;

const GasSpeed = styled.div`
  font-weight: 600;
  margin-bottom: 4px;
`;

const GasPrice = styled.div`
  font-size: 12px;
  color: ${props => props.theme.colors.textSecondary};
`;

const GasTime = styled.div`
  font-size: 12px;
  color: ${props => props.theme.colors.textSecondary};
`;

const CustomGasInput = styled.input`
  width: 100%;
  padding: 12px;
  background: ${props => props.theme.colors.surfaceLight};
  border: 1px solid ${props => props.theme.colors.border};
  border-radius: 8px;
  color: ${props => props.theme.colors.text};
  margin-top: 10px;
`;

const GasSettings = ({ onGasPriceChange }) => {
    const [selectedOption, setSelectedOption] = useState('average');
    const [customGasPrice, setCustomGasPrice] = useState('');
    const { gasPrices, loading } = useGasPrice();

    const gasOptions = [
        {
            id: 'slow',
            speed: 'Slow',
            price: `${gasPrices.slow?.gwei || 25} Gwei`,
            time: '~5-10 min',
            gwei: gasPrices.slow?.gwei || 25
        },
        {
            id: 'average',
            speed: 'Average',
            price: `${gasPrices.average?.gwei || 30} Gwei`,
            time: '~1-2 min',
            gwei: gasPrices.average?.gwei || 30
        },
        {
            id: 'fast',
            speed: 'Fast',
            price: `${gasPrices.fast?.gwei || 35} Gwei`,
            time: '~30 sec',
            gwei: gasPrices.fast?.gwei || 35
        },
        {
            id: 'custom',
            speed: 'Custom',
            price: customGasPrice ? `${customGasPrice} Gwei` : 'Set custom',
            time: 'Varies',
            gwei: customGasPrice || 0
        }
    ];

    useEffect(() => {
        const selectedGas = gasOptions.find(opt => opt.id === selectedOption);
        if (selectedGas && selectedGas.gwei) {
            onGasPriceChange(selectedGas.gwei);
        }
    }, [selectedOption, customGasPrice, gasPrices]);

    return (
        <GasContainer>
            <h4>Gas Settings {loading && '⏳'}</h4>
            {gasOptions.map(option => (
                <GasOption
                    key={option.id}
                    active={selectedOption === option.id}
                    onClick={() => setSelectedOption(option.id)}
                >
                    <GasInfo>
                        <GasSpeed>{option.speed}</GasSpeed>
                        <GasPrice>{option.price}</GasPrice>
                    </GasInfo>
                    <GasTime>{option.time}</GasTime>
                </GasOption>
            ))}

            {selectedOption === 'custom' && (
                <CustomGasInput
                    type="number"
                    placeholder="Enter custom gas price (Gwei)"
                    value={customGasPrice}
                    onChange={(e) => setCustomGasPrice(e.target.value)}
                />
            )}

            <div style={{ marginTop: '15px', fontSize: '12px', color: '#94a3b8' }}>
                Estimated network fee: ${gasPrices[selectedOption]?.usd || '2.50'} - $5.00
            </div>
        </GasContainer>
    );
};

export default GasSettings;