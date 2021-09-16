import {ethers} from 'ethers';
import fromExponential from 'from-exponential';
import {formatNumber} from "../../util";

export const getAccountSymbol = chainId => {
  if (chainId === 56 || chainId === 97) {
    return 'BNB';
  }
  return 'ETH';
};

export const formatUnitsToString = (amount, decimals = 18, prefix = '', fixedAmount = 0) => {
  return formatNumber(ethers.utils.formatUnits(String(amount || 0), decimals), prefix, fixedAmount);
};

export const formatUnits = (amount, decimals = 18) => {
  return ethers.utils.formatUnits(fromExponential(amount || 0), decimals);
};

export const getNameFromBlockchain = blockchain => {
  if (blockchain === 'ethereum' || blockchain === 'Ethereum') {
    return 'Ethereum';
  }
  if (blockchain === 'bsc') {
    return 'Binance Smart Chain';
  }
  return 'Polkadot';
};
