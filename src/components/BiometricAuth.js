import React from 'react';
import styled from 'styled-components';
import { useBiometricAuth } from '../hooks/useBiometricAuth';
import { toast } from 'react-toastify';

const BiometricContainer = styled.div`
  background: ${props => props.theme.colors.surface};
  border: 1px solid ${props => props.theme.colors.border};
  border-radius: 16px;
  padding: 24px;
  margin: 20px 0;
`;

const BiometricOption = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  background: ${props => props.theme.colors.surfaceLight};
  border-radius: 12px;
  margin-bottom: 15px;
  border: 1px solid ${props => props.theme.colors.border};
`;

const OptionInfo = styled.div`
  flex: 1;
`;

const OptionTitle = styled.div`
  font-weight: 600;
  margin-bottom: 4px;
  color: ${props => props.theme.colors.text};
`;

const OptionDescription = styled.div`
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

const SetupButton = styled.button`
  padding: 10px 20px;
  background: ${props => props.theme.colors.primary};
  color: white;
  border: none;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  
  &:hover {
    background: ${props => props.theme.colors.primaryHover};
  }
  
  &:disabled {
    background: ${props => props.theme.colors.border};
    cursor: not-allowed;
  }
`;

const BiometricAuth = () => {
    const {
        isSupported,
        isEnabled,
        isAuthenticated,
        enableBiometric,
        disableBiometric,
        authenticate
    } = useBiometricAuth();

    const handleToggle = async (enabled) => {
        if (enabled) {
            const success = await enableBiometric();
            if (success) {
                toast.success('Biometric authentication enabled');
            }
        } else {
            disableBiometric();
        }
    };

    const handleTestAuth = async () => {
        try {
            await authenticate();
            toast.success('Biometric authentication successful!');
        } catch (error) {
            toast.error('Authentication failed: ' + error.message);
        }
    };

    if (!isSupported) {
        return (
            <BiometricContainer>
                <h3>Biometric Authentication</h3>
                <div style={{
                    textAlign: 'center',
                    padding: '40px 20px',
                    color: '#94a3b8'
                }}>
                    <div style={{ fontSize: '48px', marginBottom: '20px' }}>📱</div>
                    <h4>Not Supported</h4>
                    <p>Biometric authentication is not supported on this device or browser.</p>
                </div>
            </BiometricContainer>
        );
    }

    return (
        <BiometricContainer>
            <h3>Biometric Authentication</h3>
            <p style={{ color: '#94a3b8', marginBottom: '20px' }}>
                Use fingerprint or face recognition for secure wallet access
            </p>

            <BiometricOption>
                <OptionInfo>
                    <OptionTitle>Enable Biometric Auth</OptionTitle>
                    <OptionDescription>
                        Use your device's biometric features for quick and secure access
                    </OptionDescription>
                </OptionInfo>
                <Toggle>
                    <ToggleInput
                        type="checkbox"
                        checked={isEnabled}
                        onChange={(e) => handleToggle(e.target.checked)}
                    />
                    <ToggleSlider />
                </Toggle>
            </BiometricOption>

            {isEnabled && (
                <>
                    <BiometricOption>
                        <OptionInfo>
                            <OptionTitle>Authentication Status</OptionTitle>
                            <OptionDescription>
                                {isAuthenticated ? 'Authenticated and ready' : 'Locked - authentication required'}
                            </OptionDescription>
                        </OptionInfo>
                        <div style={{
                            color: isAuthenticated ? '#10b981' : '#f59e0b',
                            fontWeight: '600',
                            fontSize: '14px'
                        }}>
                            {isAuthenticated ? 'UNLOCKED' : 'LOCKED'}
                        </div>
                    </BiometricOption>

                    <div style={{ display: 'flex', gap: '10px', marginTop: '20px' }}>
                        <SetupButton onClick={handleTestAuth}>
                            Test Authentication
                        </SetupButton>
                        <button
                            className="btn btn-outline"
                            onClick={() => handleToggle(false)}
                        >
                            Disable
                        </button>
                    </div>
                </>
            )}

            <div style={{
                marginTop: '20px',
                padding: '15px',
                background: '#1a1b2f',
                borderRadius: '8px',
                fontSize: '14px',
                color: '#94a3b8'
            }}>
                <strong>Security Note:</strong> Biometric data never leaves your device and is
                protected by your device's secure enclave.
            </div>
        </BiometricContainer>
    );
};

export default BiometricAuth;