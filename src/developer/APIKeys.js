import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { toast } from 'react-toastify';

const APIContainer = styled.div`
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

const KeyGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
  margin: 20px 0;
`;

const KeyCard = styled.div`
  background: ${props => props.theme.colors.surfaceLight};
  border: 1px solid ${props => props.theme.colors.border};
  border-radius: 12px;
  padding: 20px;
  position: relative;
`;

const KeyHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 15px;
`;

const KeyName = styled.div`
  font-weight: 600;
  font-size: 16px;
  color: ${props => props.theme.colors.text};
`;

const KeyStatus = styled.div`
  padding: 4px 8px;
  border-radius: 12px;
  font-size: 10px;
  font-weight: 600;
  background: ${props =>
        props.status === 'active' ? '#10b981' :
            props.status === 'revoked' ? '#ef4444' : '#6b7280'
    };
  color: white;
`;

const KeyValue = styled.div`
  background: ${props => props.theme.colors.surface};
  border: 1px solid ${props => props.theme.colors.border};
  border-radius: 8px;
  padding: 12px;
  font-family: monospace;
  font-size: 12px;
  word-break: break-all;
  margin-bottom: 15px;
  color: ${props => props.theme.colors.textSecondary};
`;

const KeyMeta = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 12px;
  color: ${props => props.theme.colors.textSecondary};
`;

const CreateKeyForm = styled.div`
  background: ${props => props.theme.colors.surfaceLight};
  border: 1px solid ${props => props.theme.colors.border};
  border-radius: 12px;
  padding: 20px;
  margin: 20px 0;
`;

const FormInput = styled.input`
  width: 100%;
  padding: 12px;
  background: ${props => props.theme.colors.surface};
  border: 1px solid ${props => props.theme.colors.border};
  border-radius: 8px;
  color: ${props => props.theme.colors.text};
  margin-bottom: 15px;
`;

const CheckboxGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 10px;
  margin: 15px 0;
`;

const CheckboxLabel = styled.label`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
  cursor: pointer;
`;

const APIKeys = () => {
    const [apiKeys, setApiKeys] = useState([]);
    const [showCreateForm, setShowCreateForm] = useState(false);
    const [newKey, setNewKey] = useState({
        name: '',
        permissions: {
            read_balance: true,
            read_transactions: true,
            read_nfts: false,
            read_contracts: false,
            write_transactions: false
        },
        expiresIn: '30' // days
    });

    useEffect(() => {
        // Load API keys from localStorage
        const savedKeys = localStorage.getItem('apiKeys');
        if (savedKeys) {
            setApiKeys(JSON.parse(savedKeys));
        }
    }, []);

    const generateAPIKey = () => {
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let key = 'cw_'; // crypto wallet prefix
        for (let i = 0; i < 32; i++) {
            key += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return key;
    };

    const createAPIKey = () => {
        if (!newKey.name.trim()) {
            toast.error('Please enter a name for the API key');
            return;
        }

        const apiKey = {
            id: Date.now(),
            name: newKey.name,
            key: generateAPIKey(),
            permissions: newKey.permissions,
            createdAt: new Date().toISOString(),
            expiresAt: new Date(Date.now() + parseInt(newKey.expiresIn) * 24 * 60 * 60 * 1000).toISOString(),
            status: 'active',
            lastUsed: null,
            usageCount: 0
        };

        const updatedKeys = [...apiKeys, apiKey];
        setApiKeys(updatedKeys);
        localStorage.setItem('apiKeys', JSON.stringify(updatedKeys));

        setNewKey({
            name: '',
            permissions: {
                read_balance: true,
                read_transactions: true,
                read_nfts: false,
                read_contracts: false,
                write_transactions: false
            },
            expiresIn: '30'
        });
        setShowCreateForm(false);

        toast.success('API key created successfully');
    };

    const revokeAPIKey = (id) => {
        const updatedKeys = apiKeys.map(key =>
            key.id === id ? { ...key, status: 'revoked' } : key
        );
        setApiKeys(updatedKeys);
        localStorage.setItem('apiKeys', JSON.stringify(updatedKeys));
        toast.info('API key revoked');
    };

    const deleteAPIKey = (id) => {
        const updatedKeys = apiKeys.filter(key => key.id !== id);
        setApiKeys(updatedKeys);
        localStorage.setItem('apiKeys', JSON.stringify(updatedKeys));
        toast.info('API key deleted');
    };

    const copyToClipboard = (text) => {
        navigator.clipboard.writeText(text);
        toast.success('API key copied to clipboard');
    };

    const permissionsList = [
        { id: 'read_balance', name: 'Read Balance', description: 'Access to wallet balances' },
        { id: 'read_transactions', name: 'Read Transactions', description: 'Access to transaction history' },
        { id: 'read_nfts', name: 'Read NFTs', description: 'Access to NFT collections' },
        { id: 'read_contracts', name: 'Read Contracts', description: 'Access to smart contract data' },
        { id: 'write_transactions', name: 'Write Transactions', description: 'Permission to send transactions' }
    ];

    const togglePermission = (permissionId) => {
        setNewKey(prev => ({
            ...prev,
            permissions: {
                ...prev.permissions,
                [permissionId]: !prev.permissions[permissionId]
            }
        }));
    };

    return (
        <APIContainer>
            <h2>API Keys Management</h2>
            <p style={{ color: '#94a3b8', marginBottom: '30px' }}>
                Manage API keys for developer access and third-party integrations
            </p>

            <Card>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                    <h3>Your API Keys</h3>
                    <button
                        className="btn btn-primary"
                        onClick={() => setShowCreateForm(!showCreateForm)}
                    >
                        + Create New Key
                    </button>
                </div>

                {showCreateForm && (
                    <CreateKeyForm>
                        <h4>Create New API Key</h4>

                        <FormInput
                            type="text"
                            placeholder="Key Name (e.g., 'My DApp Integration')"
                            value={newKey.name}
                            onChange={(e) => setNewKey({ ...newKey, name: e.target.value })}
                        />

                        <div>
                            <label style={{ fontWeight: '600', marginBottom: '10px', display: 'block' }}>
                                Permissions
                            </label>
                            <CheckboxGrid>
                                {permissionsList.map(permission => (
                                    <CheckboxLabel key={permission.id}>
                                        <input
                                            type="checkbox"
                                            checked={newKey.permissions[permission.id]}
                                            onChange={() => togglePermission(permission.id)}
                                        />
                                        <div>
                                            <div style={{ fontWeight: '500' }}>{permission.name}</div>
                                            <div style={{ fontSize: '12px', color: '#94a3b8' }}>
                                                {permission.description}
                                            </div>
                                        </div>
                                    </CheckboxLabel>
                                ))}
                            </CheckboxGrid>
                        </div>

                        <div>
                            <label style={{ fontWeight: '600', marginBottom: '10px', display: 'block' }}>
                                Expires In
                            </label>
                            <select
                                value={newKey.expiresIn}
                                onChange={(e) => setNewKey({ ...newKey, expiresIn: e.target.value })}
                                className="input"
                            >
                                <option value="7">7 days</option>
                                <option value="30">30 days</option>
                                <option value="90">90 days</option>
                                <option value="365">1 year</option>
                                <option value="never">Never</option>
                            </select>
                        </div>

                        <div style={{ display: 'flex', gap: '10px', marginTop: '20px' }}>
                            <button className="btn btn-primary" onClick={createAPIKey}>
                                Create API Key
                            </button>
                            <button
                                className="btn btn-outline"
                                onClick={() => setShowCreateForm(false)}
                            >
                                Cancel
                            </button>
                        </div>
                    </CreateKeyForm>
                )}

                <KeyGrid>
                    {apiKeys.length === 0 ? (
                        <div style={{
                            gridColumn: '1 / -1',
                            textAlign: 'center',
                            padding: '40px 20px',
                            color: '#94a3b8'
                        }}>
                            <div style={{ fontSize: '48px', marginBottom: '20px' }}>🔑</div>
                            <h4>No API Keys</h4>
                            <p>Create your first API key to get started with integrations</p>
                        </div>
                    ) : (
                        apiKeys.map(apiKey => (
                            <KeyCard key={apiKey.id}>
                                <KeyHeader>
                                    <KeyName>{apiKey.name}</KeyName>
                                    <KeyStatus status={apiKey.status}>
                                        {apiKey.status.toUpperCase()}
                                    </KeyStatus>
                                </KeyHeader>

                                <KeyValue>
                                    {apiKey.key}
                                </KeyValue>

                                <KeyMeta>
                                    <div>
                                        Created: {new Date(apiKey.createdAt).toLocaleDateString()}
                                    </div>
                                    <div>
                                        Uses: {apiKey.usageCount}
                                    </div>
                                </KeyMeta>

                                <div style={{
                                    display: 'flex',
                                    gap: '10px',
                                    marginTop: '15px',
                                    fontSize: '12px'
                                }}>
                                    <button
                                        className="btn btn-outline"
                                        onClick={() => copyToClipboard(apiKey.key)}
                                        style={{ padding: '6px 12px', fontSize: '12px' }}
                                    >
                                        Copy
                                    </button>

                                    {apiKey.status === 'active' && (
                                        <button
                                            className="btn btn-outline"
                                            onClick={() => revokeAPIKey(apiKey.id)}
                                            style={{
                                                padding: '6px 12px',
                                                fontSize: '12px',
                                                borderColor: '#ef4444',
                                                color: '#ef4444'
                                            }}
                                        >
                                            Revoke
                                        </button>
                                    )}

                                    <button
                                        className="btn btn-outline"
                                        onClick={() => deleteAPIKey(apiKey.id)}
                                        style={{
                                            padding: '6px 12px',
                                            fontSize: '12px',
                                            borderColor: '#ef4444',
                                            color: '#ef4444'
                                        }}
                                    >
                                        Delete
                                    </button>
                                </div>
                            </KeyCard>
                        ))
                    )}
                </KeyGrid>
            </Card>

            <Card>
                <h3>API Documentation</h3>
                <div style={{ color: '#94a3b8', lineHeight: '1.6' }}>
                    <h4>Base URL</h4>
                    <code style={{
                        background: '#1a1b2f',
                        padding: '10px',
                        borderRadius: '6px',
                        display: 'block',
                        marginBottom: '15px'
                    }}>
                        https://api.cryptowallet.com/v1
                    </code>

                    <h4>Authentication</h4>
                    <p>Include your API key in the request header:</p>
                    <code style={{
                        background: '#1a1b2f',
                        padding: '10px',
                        borderRadius: '6px',
                        display: 'block',
                        marginBottom: '15px'
                    }}>
                        Authorization: Bearer YOUR_API_KEY
                    </code>

                    <h4>Endpoints</h4>
                    <ul style={{ paddingLeft: '20px' }}>
                        <li><code>GET /wallet/balance</code> - Get wallet balances</li>
                        <li><code>GET /transactions</code> - Get transaction history</li>
                        <li><code>GET /nfts</code> - Get NFT collections</li>
                        <li><code>POST /transactions/send</code> - Send transactions</li>
                        <li><code>GET /contracts/read</code> - Read contract data</li>
                    </ul>
                </div>
            </Card>
        </APIContainer>
    );
};

export default APIKeys;