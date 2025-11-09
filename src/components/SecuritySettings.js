import React, { useState } from 'react';
import styled from 'styled-components';
import { useBiometricAuth } from '../hooks/useBiometricAuth';

const SecurityContainer = styled.div`
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

const SecurityItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 0;
  border-bottom: 1px solid ${props => props.theme.colors.border};
  
  &:last-child {
    border-bottom: none;
  }
`;

const SecurityInfo = styled.div`
  flex: 1;
`;

const SecurityTitle = styled.div`
  font-weight: 600;
  margin-bottom: 4px;
`;

const SecurityDescription = styled.div`
  font-size: 14px;
  color: ${props => props.theme.colors.textSecondary};
`;

const Toggle = styled.label`
  position: relative;
  display: inline-block;
  width: 60px;
  height: 34px;
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
    height: 26px;
    width: 26px;
    left: 4px;
    bottom: 4px;
    background: white;
    transition: .4s;
    border-radius: 50%;
  }
`;

const SecurityScore = styled.div`
  background: linear-gradient(135deg, #6366f1, #8b5cf6);
  color: white;
  padding: 30px;
  border-radius: 16px;
  text-align: center;
  margin-bottom: 30px;
`;

const ScoreValue = styled.div`
  font-size: 48px;
  font-weight: 700;
  margin-bottom: 10px;
`;

const ScoreLabel = styled.div`
  font-size: 16px;
  opacity: 0.9;
`;

const SecuritySettings = () => {
    const [settings, setSettings] = useState({
        biometric: false,
        autoLock: true,
        phishingDetection: true,
        transactionScan: true,
        hideBalances: false,
        requirePassword: true,
        twoFactorAuth: false,
        sessionTimeout: '15'
    });

    const { isSupported } = useBiometricAuth();

    const handleToggle = (setting) => {
        setSettings(prev => ({
            ...prev,
            [setting]: !prev[setting]
        }));
    };

    const handleSessionTimeoutChange = (minutes) => {
        setSettings(prev => ({
            ...prev,
            sessionTimeout: minutes
        }));
    };

    const calculateSecurityScore = () => {
        let score = 50; // Base score

        if (settings.biometric) score += 10;
        if (settings.autoLock) score += 5;
        if (settings.phishingDetection) score += 10;
        if (settings.transactionScan) score += 10;
        if (settings.hideBalances) score += 5;
        if (settings.requirePassword) score += 5;
        if (settings.twoFactorAuth) score += 15;

        return Math.min(100, score);
    };

    const securityScore = calculateSecurityScore();
    const getScoreColor = (score) => {
        if (score >= 80) return '#10b981';
        if (score >= 60) return '#f59e0b';
        return '#ef4444';
    };

    return (
        <SecurityContainer>
            <SecurityScore>
                <ScoreValue style={{ color: getScoreColor(securityScore) }}>
                    {securityScore}%
                </ScoreValue>
                <ScoreLabel>Security Score</ScoreLabel>
                <div style={{ marginTop: '15px', fontSize: '14px', opacity: 0.8 }}>
                    {securityScore >= 80 ? 'Excellent security!' :
                        securityScore >= 60 ? 'Good, but can be improved' :
                            'Consider enabling more security features'}
                </div>
            </SecurityScore>

            <Card>
                <h3>Authentication & Access</h3>

                {isSupported && (
                    <SecurityItem>
                        <SecurityInfo>
                            <SecurityTitle>Biometric Authentication</SecurityTitle>
                            <SecurityDescription>Use fingerprint or face ID to unlock your wallet</SecurityDescription>
                        </SecurityInfo>
                        <Toggle>
                            <ToggleInput
                                type="checkbox"
                                checked={settings.biometric}
                                onChange={() => handleToggle('biometric')}
                            />
                            <ToggleSlider />
                        </Toggle>
                    </SecurityItem>
                )}

                <SecurityItem>
                    <SecurityInfo>
                        <SecurityTitle>Auto Lock</SecurityTitle>
                        <SecurityDescription>Automatically lock wallet after inactivity</SecurityDescription>
                    </SecurityInfo>
                    <Toggle>
                        <ToggleInput
                            type="checkbox"
                            checked={settings.autoLock}
                            onChange={() => handleToggle('autoLock')}
                        />
                        <ToggleSlider />
                    </Toggle>
                </SecurityItem>

                <SecurityItem>
                    <SecurityInfo>
                        <SecurityTitle>Session Timeout</SecurityTitle>
                        <SecurityDescription>Auto lock after specified minutes</SecurityDescription>
                    </SecurityInfo>
                    <select
                        value={settings.sessionTimeout}
                        onChange={(e) => handleSessionTimeoutChange(e.target.value)}
                        style={{
                            padding: '8px 12px',
                            background: '#1a1b2f',
                            border: '1px solid #374151',
                            borderRadius: '6px',
                            color: 'white'
                        }}
                    >
                        <option value="5">5 minutes</option>
                        <option value="15">15 minutes</option>
                        <option value="30">30 minutes</option>
                        <option value="60">1 hour</option>
                    </select>
                </SecurityItem>

                <SecurityItem>
                    <SecurityInfo>
                        <SecurityTitle>Require Password for Transactions</SecurityTitle>
                        <SecurityDescription>Always require password confirmation for sending funds</SecurityDescription>
                    </SecurityInfo>
                    <Toggle>
                        <ToggleInput
                            type="checkbox"
                            checked={settings.requirePassword}
                            onChange={() => handleToggle('requirePassword')}
                        />
                        <ToggleSlider />
                    </Toggle>
                </SecurityItem>

                <SecurityItem>
                    <SecurityInfo>
                        <SecurityTitle>Two-Factor Authentication</SecurityTitle>
                        <SecurityDescription>Add an extra layer of security with 2FA</SecurityDescription>
                    </SecurityInfo>
                    <Toggle>
                        <ToggleInput
                            type="checkbox"
                            checked={settings.twoFactorAuth}
                            onChange={() => handleToggle('twoFactorAuth')}
                        />
                        <ToggleSlider />
                    </Toggle>
                </SecurityItem>
            </Card>

            <Card>
                <h3>Privacy & Protection</h3>

                <SecurityItem>
                    <SecurityInfo>
                        <SecurityTitle>Hide Balances</SecurityTitle>
                        <SecurityDescription>Mask your balances when sharing screen</SecurityDescription>
                    </SecurityInfo>
                    <Toggle>
                        <ToggleInput
                            type="checkbox"
                            checked={settings.hideBalances}
                            onChange={() => handleToggle('hideBalances')}
                        />
                        <ToggleSlider />
                    </Toggle>
                </SecurityItem>

                <SecurityItem>
                    <SecurityInfo>
                        <SecurityTitle>Phishing Detection</SecurityTitle>
                        <SecurityDescription>Warn about suspicious websites and transactions</SecurityDescription>
                    </SecurityInfo>
                    <Toggle>
                        <ToggleInput
                            type="checkbox"
                            checked={settings.phishingDetection}
                            onChange={() => handleToggle('phishingDetection')}
                        />
                        <ToggleSlider />
                    </Toggle>
                </SecurityItem>

                <SecurityItem>
                    <SecurityInfo>
                        <SecurityTitle>Transaction Scanning</SecurityTitle>
                        <SecurityDescription>Scan transactions for potential risks before signing</SecurityDescription>
                    </SecurityInfo>
                    <Toggle>
                        <ToggleInput
                            type="checkbox"
                            checked={settings.transactionScan}
                            onChange={() => handleToggle('transactionScan')}
                        />
                        <ToggleSlider />
                    </Toggle>
                </SecurityItem>
            </Card>

            <Card>
                <h3>Backup & Recovery</h3>
                <div style={{ display: 'flex', gap: '10px', marginTop: '15px', flexWrap: 'wrap' }}>
                    <button className="btn btn-primary">Backup Seed Phrase</button>
                    <button className="btn btn-outline">Export Private Key</button>
                    <button className="btn btn-outline">Setup Social Recovery</button>
                    <button className="btn btn-outline">View Recovery Phrase</button>
                </div>

                <div style={{
                    marginTop: '20px',
                    padding: '15px',
                    background: '#1a1b2f',
                    borderRadius: '8px',
                    fontSize: '14px',
                    color: '#94a3b8'
                }}>
                    <strong>Important:</strong> Always keep your recovery phrase secure and never share it with anyone.
                    Consider using a hardware wallet for maximum security.
                </div>
            </Card>

            <Card>
                <h3>Security Audit</h3>
                <div style={{ marginTop: '15px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                        <span>Last Security Check</span>
                        <span style={{ color: '#10b981', fontWeight: '600' }}>Today</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                        <span>Known Devices</span>
                        <span style={{ fontWeight: '600' }}>3 devices</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                        <span>Active Sessions</span>
                        <span style={{ fontWeight: '600' }}>1 session</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <span>Security Updates</span>
                        <span style={{ color: '#10b981', fontWeight: '600' }}>Up to date</span>
                    </div>
                </div>

                <button className="btn btn-outline" style={{ width: '100%', marginTop: '20px' }}>
                    Run Security Audit
                </button>
            </Card>
        </SecurityContainer>
    );
};

export default SecuritySettings;