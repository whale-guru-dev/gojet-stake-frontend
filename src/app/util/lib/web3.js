import Web3 from 'web3'
import getRpcUrl from './getRpcUrl'


const getWeb3NoAccount = (chainId) => {
  const RPC_URL = getRpcUrl(chainId);
  const httpProvider = new Web3.providers.HttpProvider(RPC_URL, { timeout: 10000 });
  return new Web3(httpProvider);
};

export { getWeb3NoAccount }

export const getWeb3 = (library) => {
    return new Web3(
        // Replace YOUR-PROJECT-ID with a Project ID from your Infura Dashboard
        library || new Web3.providers.HttpProvider('https://main-light.eth.linkpool.io')
    );
};

export default getWeb3;
