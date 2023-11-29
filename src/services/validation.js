export const validateBitcoinAddress = address => {
    // Bitcoin address regex (mainnet)
    const btcRegex = /^(1|3)[a-zA-HJ-NP-Z0-9]{25,34}$/;
    // Bitcoin Bech32 address regex (mainnet)
    const btcBech32Regex = /^bc1[a-zA-HJ-NP-Z0-9]{25,39}$/;
    // Bitcoin address regex (testnet)
    const btcTestnetRegex = /^(m|n|2)[a-zA-HJ-NP-Z0-9]{25,34}$/;
    // Bitcoin Bech32 address regex (testnet)
    const btcBech32TestnetRegex = /^tb1[a-zA-HJ-NP-Z0-9]{25,39}$/;
    
    return btcRegex.test(address) || btcBech32Regex.test(address) || btcTestnetRegex.test(address) || btcBech32TestnetRegex.test(address);
}

export const validateEthereumAddress = address => {
    return /^0x[0-9A-Fa-f]{40}$/i.test(address);
}

export const validateLitecoinAddress = address => {
    // Litecoin address regex (mainnet)
    const ltcRegex = /^[LM3][a-km-zA-HJ-NP-Z1-9]{26,34}$/;
    // Litecoin address regex (testnet)
    const ltcTestnetRegex = /^[Q2][a-km-zA-HJ-NP-Z1-9]{26,34}$/;
    
    return ltcRegex.test(address) || ltcTestnetRegex.test(address);

export const validateMoneroAddress = address => {
    return /^4([0-9AB]{1})([0-9a-zA-Z]{93})$/ig.test(address);
}