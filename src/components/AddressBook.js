import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { toast } from 'react-toastify';

const AddressBookContainer = styled.div`
  background: ${props => props.theme.colors.surface};
  border: 1px solid ${props => props.theme.colors.border};
  border-radius: 16px;
  padding: 24px;
  margin: 20px 0;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;

const SearchBar = styled.input`
  width: 100%;
  padding: 12px 16px;
  background: ${props => props.theme.colors.surfaceLight};
  border: 1px solid ${props => props.theme.colors.border};
  border-radius: 8px;
  color: ${props => props.theme.colors.text};
  margin-bottom: 20px;
  
  &::placeholder {
    color: ${props => props.theme.colors.textMuted};
  }
`;

const ContactGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 15px;
  margin-bottom: 20px;
`;

const ContactCard = styled.div`
  background: ${props => props.theme.colors.surfaceLight};
  border: 1px solid ${props => props.theme.colors.border};
  border-radius: 12px;
  padding: 20px;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: ${props => props.theme.shadows.md};
  }
`;

const ContactHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 10px;
`;

const ContactAvatar = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: ${props => props.theme.colors.primary};
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  color: white;
  font-size: 18px;
`;

const ContactInfo = styled.div`
  flex: 1;
`;

const ContactName = styled.div`
  font-weight: 600;
  margin-bottom: 4px;
`;

const ContactAddress = styled.div`
  font-size: 12px;
  color: ${props => props.theme.colors.textSecondary};
  font-family: monospace;
`;

const ContactMeta = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 12px;
  color: ${props => props.theme.colors.textMuted};
  margin-top: 10px;
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 40px 20px;
  color: ${props => props.theme.colors.textSecondary};
`;

const AddContactForm = styled.div`
  background: ${props => props.theme.colors.surfaceLight};
  border: 1px solid ${props => props.theme.colors.border};
  border-radius: 12px;
  padding: 20px;
  margin-top: 20px;
`;

const FormInput = styled.input`
  width: 100%;
  padding: 12px;
  background: ${props => props.theme.colors.surface};
  border: 1px solid ${props => props.theme.colors.border};
  border-radius: 8px;
  color: ${props => props.theme.colors.text};
  margin-bottom: 15px;
  
  &::placeholder {
    color: ${props => props.theme.colors.textMuted};
  }
`;

const AddressBook = () => {
    const [contacts, setContacts] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [showAddForm, setShowAddForm] = useState(false);
    const [newContact, setNewContact] = useState({
        name: '',
        address: '',
        ens: '',
        tags: ''
    });

    useEffect(() => {
        // Load contacts from localStorage
        const savedContacts = localStorage.getItem('addressBook');
        if (savedContacts) {
            setContacts(JSON.parse(savedContacts));
        }
    }, []);

    const saveContacts = (updatedContacts) => {
        setContacts(updatedContacts);
        localStorage.setItem('addressBook', JSON.stringify(updatedContacts));
    };

    const addContact = () => {
        if (!newContact.name || !newContact.address) {
            toast.error('Please fill in name and address');
            return;
        }

        // Basic address validation
        if (!newContact.address.match(/^0x[a-fA-F0-9]{40}$/)) {
            toast.error('Invalid Ethereum address');
            return;
        }

        const contact = {
            id: Date.now(),
            ...newContact,
            createdAt: new Date().toISOString(),
            tags: newContact.tags ? newContact.tags.split(',').map(tag => tag.trim()) : []
        };

        const updatedContacts = [...contacts, contact];
        saveContacts(updatedContacts);

        setNewContact({ name: '', address: '', ens: '', tags: '' });
        setShowAddForm(false);
        toast.success('Contact added successfully');
    };

    const removeContact = (id) => {
        const updatedContacts = contacts.filter(contact => contact.id !== id);
        saveContacts(updatedContacts);
        toast.success('Contact removed');
    };

    const filteredContacts = contacts.filter(contact =>
        contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        contact.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (contact.ens && contact.ens.toLowerCase().includes(searchTerm.toLowerCase())) ||
        contact.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
    );

    const sampleContacts = [
        {
            id: 1,
            name: 'Vitalik Buterin',
            address: '0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045',
            ens: 'vitalik.eth',
            tags: ['founder', 'ethereum'],
            createdAt: '2024-01-01'
        },
        {
            id: 2,
            name: 'DeFi Pool',
            address: '0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D',
            ens: 'uniswap.eth',
            tags: ['defi', 'swap'],
            createdAt: '2024-01-02'
        },
        {
            id: 3,
            name: 'NFT Collector',
            address: '0x1FCc3B22955e76Ca48bF025f1A6993685975Bb9e',
            ens: null,
            tags: ['nft', 'collector'],
            createdAt: '2024-01-03'
        }
    ];

    const loadSampleContacts = () => {
        saveContacts(sampleContacts);
        toast.info('Sample contacts loaded');
    };

    return (
        <AddressBookContainer>
            <Header>
                <h3>Address Book</h3>
                <div style={{ display: 'flex', gap: '10px' }}>
                    <button
                        className="btn btn-outline"
                        onClick={loadSampleContacts}
                    >
                        Load Samples
                    </button>
                    <button
                        className="btn btn-primary"
                        onClick={() => setShowAddForm(!showAddForm)}
                    >
                        + Add Contact
                    </button>
                </div>
            </Header>

            <SearchBar
                type="text"
                placeholder="Search contacts by name, address, ENS, or tags..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />

            {showAddForm && (
                <AddContactForm>
                    <h4>Add New Contact</h4>
                    <FormInput
                        type="text"
                        placeholder="Contact Name *"
                        value={newContact.name}
                        onChange={(e) => setNewContact({ ...newContact, name: e.target.value })}
                    />
                    <FormInput
                        type="text"
                        placeholder="Ethereum Address * (0x...)"
                        value={newContact.address}
                        onChange={(e) => setNewContact({ ...newContact, address: e.target.value })}
                    />
                    <FormInput
                        type="text"
                        placeholder="ENS Name (optional)"
                        value={newContact.ens}
                        onChange={(e) => setNewContact({ ...newContact, ens: e.target.value })}
                    />
                    <FormInput
                        type="text"
                        placeholder="Tags (comma separated)"
                        value={newContact.tags}
                        onChange={(e) => setNewContact({ ...newContact, tags: e.target.value })}
                    />
                    <div style={{ display: 'flex', gap: '10px' }}>
                        <button className="btn btn-primary" onClick={addContact}>
                            Save Contact
                        </button>
                        <button
                            className="btn btn-outline"
                            onClick={() => setShowAddForm(false)}
                        >
                            Cancel
                        </button>
                    </div>
                </AddContactForm>
            )}

            {filteredContacts.length === 0 ? (
                <EmptyState>
                    <div style={{ fontSize: '48px', marginBottom: '20px' }}>👤</div>
                    <h4>No contacts found</h4>
                    <p>Add contacts to quickly send transactions to frequent addresses</p>
                    <button
                        className="btn btn-primary"
                        onClick={() => setShowAddForm(true)}
                        style={{ marginTop: '15px' }}
                    >
                        Add Your First Contact
                    </button>
                </EmptyState>
            ) : (
                <ContactGrid>
                    {filteredContacts.map(contact => (
                        <ContactCard key={contact.id}>
                            <ContactHeader>
                                <ContactAvatar>
                                    {contact.name.charAt(0).toUpperCase()}
                                </ContactAvatar>
                                <ContactInfo>
                                    <ContactName>{contact.name}</ContactName>
                                    <ContactAddress>
                                        {contact.ens || `${contact.address.slice(0, 8)}...${contact.address.slice(-6)}`}
                                    </ContactAddress>
                                </ContactInfo>
                            </ContactHeader>

                            {contact.tags.length > 0 && (
                                <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', marginBottom: '10px' }}>
                                    {contact.tags.map((tag, index) => (
                                        <span
                                            key={index}
                                            style={{
                                                background: '#6366f1',
                                                color: 'white',
                                                padding: '2px 8px',
                                                borderRadius: '12px',
                                                fontSize: '10px'
                                            }}
                                        >
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            )}

                            <ContactMeta>
                                <span>Added: {new Date(contact.createdAt).toLocaleDateString()}</span>
                                <button
                                    onClick={() => removeContact(contact.id)}
                                    style={{
                                        background: 'none',
                                        border: 'none',
                                        color: '#ef4444',
                                        cursor: 'pointer',
                                        fontSize: '12px'
                                    }}
                                >
                                    Remove
                                </button>
                            </ContactMeta>
                        </ContactCard>
                    ))}
                </ContactGrid>
            )}
        </AddressBookContainer>
    );
};

export default AddressBook;