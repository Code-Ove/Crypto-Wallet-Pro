export const transactionDecoder = {
    // Common ERC20 function signatures
    erc20Signatures: {
        '0xa9059cbb': 'transfer(address,uint256)',
        '0x095ea7b3': 'approve(address,uint256)',
        '0x23b872dd': 'transferFrom(address,address,uint256)',
        '0x70a08231': 'balanceOf(address)',
        '0xdd62ed3e': 'allowance(address,address)',
        '0x06fdde03': 'name()',
        '0x95d89b41': 'symbol()',
        '0x313ce567': 'decimals()',
        '0x18160ddd': 'totalSupply()'
    },

    // Common ERC721 function signatures
    erc721Signatures: {
        '0x70a08231': 'balanceOf(address)',
        '0x6352211e': 'ownerOf(uint256)',
        '0x42842e0e': 'safeTransferFrom(address,address,uint256)',
        '0xb88d4fde': 'safeTransferFrom(address,address,uint256,bytes)',
        '0x23b872dd': 'transferFrom(address,address,uint256)',
        '0x095ea7b3': 'approve(address,uint256)',
        '0xa22cb465': 'setApprovalForAll(address,bool)',
        '0x081812fc': 'getApproved(uint256)',
        '0xe985e9c5': 'isApprovedForAll(address,address)'
    },

    // Common DEX function signatures
    dexSignatures: {
        '0x7ff36ab5': 'swapExactETHForTokens(uint256,address[],address,uint256)',
        '0x18cbafe5': 'swapExactTokensForETH(uint256,uint256,address[],address,uint256)',
        '0x38ed1739': 'swapExactTokensForTokens(uint256,uint256,address[],address,uint256)',
        '0x8803dbee': 'swapTokensForExactTokens(uint256,uint256,address[],address,uint256)',
        '0xf305d719': 'addLiquidityETH(address,uint256,uint256,uint256,address,uint256)',
        '0xe8e33700': 'addLiquidity(address,address,uint256,uint256,uint256,uint256,address,uint256)',
        '0xbaa2abde': 'removeLiquidityETH(address,uint256,uint256,uint256,address,uint256)',
        '0x02751cec': 'removeLiquidity(address,address,uint256,uint256,uint256,uint256,address,uint256)'
    },

    decodeFunction: (data) => {
        if (!data || data === '0x') {
            return {
                type: 'transfer',
                function: 'transfer',
                parameters: [],
                description: 'Native token transfer'
            };
        }

        const methodId = data.slice(0, 10).toLowerCase();

        // Check ERC20 functions
        if (transactionDecoder.erc20Signatures[methodId]) {
            return transactionDecoder.decodeERC20(data, methodId);
        }

        // Check ERC721 functions
        if (transactionDecoder.erc721Signatures[methodId]) {
            return transactionDecoder.decodeERC721(data, methodId);
        }

        // Check DEX functions
        if (transactionDecoder.dexSignatures[methodId]) {
            return transactionDecoder.decodeDEX(data, methodId);
        }

        // Unknown function
        return {
            type: 'unknown',
            function: 'unknown',
            methodId,
            parameters: [],
            description: 'Unknown contract interaction'
        };
    },

    decodeERC20: (data, methodId) => {
        const functionName = transactionDecoder.erc20Signatures[methodId];
        const parameters = [];

        switch (methodId) {
            case '0xa9059cbb': // transfer
                parameters.push({
                    name: 'to',
                    type: 'address',
                    value: '0x' + data.slice(34, 74)
                });
                parameters.push({
                    name: 'value',
                    type: 'uint256',
                    value: BigInt('0x' + data.slice(74, 138)).toString()
                });
                break;

            case '0x095ea7b3': // approve
                parameters.push({
                    name: 'spender',
                    type: 'address',
                    value: '0x' + data.slice(34, 74)
                });
                parameters.push({
                    name: 'value',
                    type: 'uint256',
                    value: BigInt('0x' + data.slice(74, 138)).toString()
                });
                break;

            case '0x23b872dd': // transferFrom
                parameters.push({
                    name: 'from',
                    type: 'address',
                    value: '0x' + data.slice(34, 74)
                });
                parameters.push({
                    name: 'to',
                    type: 'address',
                    value: '0x' + data.slice(98, 138)
                });
                parameters.push({
                    name: 'value',
                    type: 'uint256',
                    value: BigInt('0x' + data.slice(138, 202)).toString()
                });
                break;
        }

        return {
            type: 'erc20',
            function: functionName,
            methodId,
            parameters,
            description: `ERC20 ${functionName.split('(')[0]}`
        };
    },

    decodeERC721: (data, methodId) => {
        const functionName = transactionDecoder.erc721Signatures[methodId];
        const parameters = [];

        switch (methodId) {
            case '0x42842e0e': // safeTransferFrom
            case '0x23b872dd': // transferFrom
                parameters.push({
                    name: 'from',
                    type: 'address',
                    value: '0x' + data.slice(34, 74)
                });
                parameters.push({
                    name: 'to',
                    type: 'address',
                    value: '0x' + data.slice(98, 138)
                });
                parameters.push({
                    name: 'tokenId',
                    type: 'uint256',
                    value: BigInt('0x' + data.slice(138, 202)).toString()
                });
                break;

            case '0x095ea7b3': // approve
                parameters.push({
                    name: 'to',
                    type: 'address',
                    value: '0x' + data.slice(34, 74)
                });
                parameters.push({
                    name: 'tokenId',
                    type: 'uint256',
                    value: BigInt('0x' + data.slice(74, 138)).toString()
                });
                break;
        }

        return {
            type: 'erc721',
            function: functionName,
            methodId,
            parameters,
            description: `NFT ${functionName.split('(')[0]}`
        };
    },

    decodeDEX: (data, methodId) => {
        const functionName = transactionDecoder.dexSignatures[methodId];

        return {
            type: 'dex',
            function: functionName,
            methodId,
            parameters: [],
            description: `DEX ${functionName.split('(')[0]}`
        };
    },

    formatValue: (value, type) => {
        if (type === 'uint256') {
            // Format large numbers
            const num = BigInt(value);
            if (num > BigInt(1e18)) {
                return (Number(num) / 1e18).toFixed(4) + ' tokens';
            }
            return num.toString();
        }

        if (type === 'address') {
            return `${value.slice(0, 8)}...${value.slice(-6)}`;
        }

        return value;
    },

    getTransactionDescription: (tx) => {
        if (!tx.data || tx.data === '0x') {
            return `Transfer ${tx.value || '0'} ETH to ${tx.to.slice(0, 8)}...${tx.to.slice(-6)}`;
        }

        const decoded = transactionDecoder.decodeFunction(tx.data);

        if (decoded.type === 'erc20' && decoded.function === 'transfer') {
            const to = decoded.parameters.find(p => p.name === 'to');
            const value = decoded.parameters.find(p => p.name === 'value');
            return `Transfer ${transactionDecoder.formatValue(value.value, 'uint256')} tokens to ${to.value.slice(0, 8)}...${to.value.slice(-6)}`;
        }

        if (decoded.type === 'erc20' && decoded.function === 'approve') {
            const spender = decoded.parameters.find(p => p.name === 'spender');
            const value = decoded.parameters.find(p => p.name === 'value');
            const amount = value.value === '115792089237316195423570985008687907853269984665640564039457584007913129639935'
                ? 'UNLIMITED'
                : transactionDecoder.formatValue(value.value, 'uint256');
            return `Approve ${amount} tokens for ${spender.value.slice(0, 8)}...${spender.value.slice(-6)}`;
        }

        return decoded.description;
    }
};