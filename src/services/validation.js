export const validateBitcoinAddress = address => {
    return /^(bc(0([ac-hj-np-z02-9]{39}|[ac-hj-np-z02-9]{59})|1[ac-hj-np-z02-9]{8,87})|[13][a-km-zA-HJ-NP-Z1-9]{25,35})$/.test(address);
}

export const validateEthereumAddress = address => {
    return /^(0x){1}[0-9a-fA-F]{40}$/i.test(address);
}

export const validateMoneroAddress = address => {
    return /^4([0-9AB]{1})([0-9a-zA-Z]{93})$/ig.test(address);
}

export const validateLitecoinAddress = address => {
    return /^[LM3][a-km-zA-HJ-NP-Z1-9]{26,33}$/.test(address);
}