const isValidEthAddress = (address: string) => {
    const ethAddressRegex = /^0x[0-9a-fA-F]{40}$/;
    return ethAddressRegex.test(address);
  };

export default isValidEthAddress