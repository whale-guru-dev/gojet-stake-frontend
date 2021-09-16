import sousChef from '../../abis/sousChef.json';
import mepadABI from '../../abis/memepad.json';

const getContract = (abi, address,) => {
  return new window.web3.eth.Contract(abi, address)
};

export const getSouschefContract = (id, stakingPoolsData) => {
  const config = stakingPoolsData && stakingPoolsData.find((pool) => pool.id === id);
  if (!config) {
    return null;
  }
  return getContract(sousChef, config.stakeContractAddress)
};

export const getMepadContract = (coinAddress) => {
  return getContract(mepadABI, coinAddress)
};
