import BigNumber from 'bignumber.js'
import { ethers } from 'ethers'
import { BIG_TEN } from './bigNumber'

export const approve = async (lpContract, senderAddress, account) => {
  return lpContract.methods
    .approve(senderAddress, ethers.constants.MaxUint256)
    .send({ from: account })
};

export const sousStake = async (sousChefContract, amount, decimals = 18, account, pid) => {
  return sousChefContract.methods
    .deposit(new BigNumber(amount).times(BIG_TEN.pow(decimals)).toFixed().toString())
    .send({ from: account })
    .on('transactionHash', (tx) => {
      return tx.transactionHash
    })
};

export const sousUnstake = async (sousChefContract, amount, decimals = 18, account, pid) => {
  return sousChefContract.methods
    .withdraw(new BigNumber(amount).times(BIG_TEN.pow(decimals)).toFixed().toString())
    .send({ from: account })
    .on('transactionHash', (tx) => {
      return tx.transactionHash
    })
};

export const soushHarvest = async (sousChefContract, account) => {
  return sousChefContract.methods
    .withdraw('0')
    .send({ from: account })
    .on('transactionHash', (tx) => {
      return tx.transactionHash
    })
};

export const getAllowance = async (tokenContract, account, contractAddress) => {
  return tokenContract.methods
    .allowance(account, contractAddress)
    .call();
};

export const getBalanceOf = async (tokenContract, account) => {
  return tokenContract.methods
    .balanceOf(account)
    .call();
};

export const getUserInfo = async (stakeContract, account) => {
  return stakeContract.methods
    .userInfo(account)
    .call();
};

export const getPendingReward = async (stakeContract, account) => {
  return stakeContract.methods
    .pendingReward(account)
    .call();
};

export const getRewardPerBlock = async (stakeContract) => {
  return stakeContract.methods
    .rewardPerBlock()
    .call();
};

export const getStartBlock = async (stakeContract) => {
  return stakeContract.methods
    .startBlock()
    .call();
};

export const getEndBlock = async (stakeContract) => {
  return stakeContract.methods
    .bonusEndBlock()
    .call();
};

export const getTotalStakingTokens = async (stakeContract) => {
  return stakeContract.methods
    .totalStakingTokens()
    .call();
};

export const getIsFrozen = async (stakeContract) => {
  return stakeContract.methods.isFrozen().call()
};

export const getMinDepositAmount = async (stakeContract) => {
  return stakeContract.methods.minDepositAmount().call();
};
