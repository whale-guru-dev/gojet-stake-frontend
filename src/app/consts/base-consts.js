import BigNumber from 'bignumber.js/bignumber'

BigNumber.config({
  EXPONENTIAL_AT: 1000,
  DECIMAL_PLACES: 80,
});

export const BSC_BLOCK_TIME = 3;
export const CAKE_PER_BLOCK = new BigNumber(40);
export const BLOCKS_PER_YEAR = new BigNumber((60 / BSC_BLOCK_TIME) * 60 * 24 * 365); // 10512000
export const BASE_EXCHANGE_URL = 'https://exchange.pancakeswap.finance';
export const BASE_BSC_SCAN_URL = 'https://bscscan.com';
export const BASE_TESTBSC_SCAN_URL = 'https://testnet.bscscan.com';
