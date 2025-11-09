import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { toast } from 'react-toastify';

const AlertsContainer = styled.div`
  background: ${props => props.theme.colors.surface};
  border: 1px solid ${props => props.theme.colors.border};
  border-radius: 16px;
  padding: 24px;
  margin: 20px 0;
`;

const AlertItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px;
  background: ${props => props.theme.colors.surfaceLight};
  border-radius: 12px;
  margin-bottom: 12px;
  border-left: 4px solid ${props => {
        switch (props.condition) {
            case 'above': return '#10b981';
            case 'below': return '#ef4444';
            default: return '#6b7280';
        }
    }};
`;

const AlertInfo = styled.div`
  flex: 1;
`;

const AlertToken = styled.div`
  font-weight: 600;
  margin-bottom: 4px;
`;

const AlertCondition = styled.div`
  font-size: 14px;
  color: ${props => props.theme.colors.textSecondary};
`;

const AlertPrice = styled.div`
  font-weight: 600;
  color: ${props => props.theme.colors.primary};
`;

const Toggle = styled.label`
  position: relative;
  display: inline-block;
  width: 50px;
  height: 24px;
  margin-left: 15px;
`;

const ToggleInput = styled.input`
  opacity: 0;
  width: 0;
  height: 0;
  
  &:checked + span {
    background: ${props => props.theme.colors.primary};
  }
  
  &:checked + span:before {
    transform: translateX(26px);
  }
`;

const ToggleSlider = styled.span`
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: ${props => props.theme.colors.border};
  transition: .4s;
  border-radius: 34px;
  
  &:before {
    position: absolute;
    content: "";
    height: 16px;
    width: 16px;
    left: 4px;
    bottom: 4px;
    background: white;
    transition: .4s;
    border-radius: 50%;
  }
`;

const AddAlertButton = styled.button`
  width: 100%;
  padding: 15px;
  background: transparent;
  border: 2px dashed ${props => props.theme.colors.border};
  border-radius: 12px;
  color: ${props => props.theme.colors.text};
  cursor: pointer;
  font-size: 16px;
  margin-top: 15px;
  
  &:hover {
    border-color: ${props => props.theme.colors.primary};
    color: ${props => props.theme.colors.primary};
  }
`;

const CreateAlertForm = styled.div`
  background: ${props => props.theme.colors.surfaceLight};
  border: 1px solid ${props => props.theme.colors.border};
  border-radius: 12px;
  padding: 20px;
  margin: 20px 0;
`;

const FormGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr auto;
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

const Select = styled.select`
  padding: 12px;
  background: ${props => props.theme.colors.surface};
  border: 1px solid ${props => props.theme.colors.border};
  border-radius: 8px;
  color: ${props => props.theme.colors.text};
`;

const PriceAlerts = () => {
    const [alerts, setAlerts] = useState([]);
    const [showCreateForm, setShowCreateForm] = useState(false);
    const [newAlert, setNewAlert] = useState({
        token: 'ETH',
        condition: 'above',
        price: '',
        active: true
    });

    useEffect(() => {
        const savedAlerts = localStorage.getItem('priceAlerts');
        if (savedAlerts) {
            setAlerts(JSON.parse(savedAlerts));
        } else {
            // Set default alerts
            const defaultAlerts = [
                {
                    id: 1,
                    token: 'ETH',
                    condition: 'above',
                    price: 2000,
                    active: true,
                    createdAt: '2024-01-15'
                },
                {
                    id: 2,
                    token: 'BTC',
                    condition: 'below',
                    price: 35000,
                    active: true,
                    createdAt: '2024-01-14'
                },
                {
                    id: 3,
                    token: 'MATIC',
                    condition: 'above',
                    price: 1.5,
                    active: false,
                    createdAt: '2024-01-13'
                }
            ];
            setAlerts(defaultAlerts);
            localStorage.setItem('priceAlerts', JSON.stringify(defaultAlerts));
        }
    }, []);

    const toggleAlert = (id) => {
        const updatedAlerts = alerts.map(alert =>
            alert.id === id ? { ...alert, active: !alert.active } : alert
        );
        setAlerts(updatedAlerts);
        localStorage.setItem('priceAlerts', JSON.stringify(updatedAlerts));
        toast.info('Alert updated');
    };

    const addNewAlert = () => {
        if (!newAlert.price) {
            toast.error('Please enter a price');
            return;
        }

        const alert = {
            id: Date.now(),
            ...newAlert,
            price: parseFloat(newAlert.price),
            createdAt: new Date().toISOString()
        };

        const updatedAlerts = [...alerts, alert];
        setAlerts(updatedAlerts);
        localStorage.setItem('priceAlerts', JSON.stringify(updatedAlerts));

        setNewAlert({
            token: 'ETH',
            condition: 'above',
            price: '',
            active: true
        });
        setShowCreateForm(false);

        toast.success('Price alert created!');
    };

    const removeAlert = (id) => {
        const updatedAlerts = alerts.filter(alert => alert.id !== id);
        setAlerts(updatedAlerts);
        localStorage.setItem('priceAlerts', JSON.stringify(updatedAlerts));
        toast.info('Alert removed');
    };

    const tokens = [
        { symbol: 'ETH', name: 'Ethereum', currentPrice: 1845.25 },
        { symbol: 'BTC', name: 'Bitcoin', currentPrice: 42150.75 },
        { symbol: 'MATIC', name: 'Polygon', currentPrice: 0.85 },
        { symbol: 'AVAX', name: 'Avalanche', currentPrice: 35.60 },
        { symbol: 'SOL', name: 'Solana', currentPrice: 98.45 }
    ];

    return (
        <AlertsContainer>
            <h3>Price Alerts</h3>
            <p style={{ color: '#94a3b8', marginBottom: '20px' }}>
                Get notified when prices reach your targets
            </p>

            {showCreateForm && (
                <CreateAlertForm>
                    <h4>Create Price Alert</h4>
                    <FormGrid>
                        <InputGroup>
                            <Label>Token</Label>
                            <Select
                                value={newAlert.token}
                                onChange={(e) => setNewAlert({ ...newAlert, token: e.target.value })}
                            >
                                {tokens.map(token => (
                                    <option key={token.symbol} value={token.symbol}>
                                        {token.name} ({token.symbol})
                                    </option>
                                ))}
                            </Select>
                        </InputGroup>

                        <InputGroup>
                            <Label>Condition</Label>
                            <Select
                                value={newAlert.condition}
                                onChange={(e) => setNewAlert({ ...newAlert, condition: e.target.value })}
                            >
                                <option value="above">Price Above</option>
                                <option value="below">Price Below</option>
                            </Select>
                        </InputGroup>

                        <InputGroup>
                            <Label>Price (USD)</Label>
                            <Input
                                type="number"
                                placeholder="0.00"
                                value={newAlert.price}
                                onChange={(e) => setNewAlert({ ...newAlert, price: e.target.value })}
                            />
                        </InputGroup>

                        <button
                            className="btn btn-primary"
                            onClick={addNewAlert}
                            style={{ height: 'fit-content' }}
                        >
                            Create Alert
                        </button>
                    </FormGrid>

                    <div style={{ marginTop: '15px', fontSize: '14px', color: '#94a3b8' }}>
                        Current {tokens.find(t => t.symbol === newAlert.token)?.name} price: $
                        {tokens.find(t => t.symbol === newAlert.token)?.currentPrice.toLocaleString()}
                    </div>
                </CreateAlertForm>
            )}

            {alerts.map(alert => (
                <AlertItem key={alert.id} condition={alert.condition}>
                    <AlertInfo>
                        <AlertToken>{alert.token}/USD</AlertToken>
                        <AlertCondition>
                            {alert.condition === 'above' ? 'Above' : 'Below'} ${alert.price.toLocaleString()}
                        </AlertCondition>
                    </AlertInfo>
                    <AlertPrice>${alert.price.toLocaleString()}</AlertPrice>
                    <Toggle>
                        <ToggleInput
                            type="checkbox"
                            checked={alert.active}
                            onChange={() => toggleAlert(alert.id)}
                        />
                        <ToggleSlider />
                    </Toggle>
                    <button
                        onClick={() => removeAlert(alert.id)}
                        style={{
                            background: 'none',
                            border: 'none',
                            color: '#ef4444',
                            cursor: 'pointer',
                            marginLeft: '10px',
                            fontSize: '16px'
                        }}
                    >
                        ×
                    </button>
                </AlertItem>
            ))}

            <AddAlertButton onClick={() => setShowCreateForm(!showCreateForm)}>
                + Add Price Alert
            </AddAlertButton>

            {alerts.length === 0 && !showCreateForm && (
                <div style={{
                    textAlign: 'center',
                    padding: '40px 20px',
                    color: '#94a3b8'
                }}>
                    <div style={{ fontSize: '48px', marginBottom: '20px' }}>🔔</div>
                    <h4>No price alerts</h4>
                    <p>Create alerts to get notified when prices hit your targets</p>
                </div>
            )}
        </AlertsContainer>
    );
};

export default PriceAlerts;