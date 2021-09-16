import sousChefABI from '../abis/sousChef.json';
import masterChefABI from '../abis/masterChef.json';
import mepadABI from '../abis/memepad.json';
import { createAction, createActions } from "redux-actions";
import Api from '../store/api';
import { getWeb3NoAccount } from "../util";
import {
  getAllowance,
  getBalanceOf,
  getEndBlock, getIsFrozen, getMinDepositAmount,
  getPendingReward,
  getRewardPerBlock,
  getStartBlock,
  getTotalStakingTokens,
  getUserInfo
} from "../util";


export const setPoolsUserData = createAction('SET_POOLS_USER_DATA');
export const setPoolsPublicData = createAction('SET_POOLS_PUBLIC_DATA');
export const updatePoolsUserData = createAction('UPDATE_POOLS_USER_DATA');

export const fetchPoolsAllowance = async (account, getState) => {
  const chainId = getState().user.chainId;
  const stakingPools = getState().pools.data.filter(item => parseInt(item.chainId) === parseInt(chainId));

  let allowanceDatas = {};
  const web3 = getWeb3NoAccount(chainId);
  for (let i = 0; i < stakingPools.length; i++) {
    const p = stakingPools[i];
    const stakeContract = new web3.eth.Contract(mepadABI, p.stakeTokenAddress);
    try {
      allowanceDatas[p.id] = await getAllowance(stakeContract, account, p.stakeContractAddress);
    } catch {
      allowanceDatas[p.id] = 0;
    }
  }
  return allowanceDatas;
};

export const fetchUserBalances = async (account, getState) => {
  // Non BNB pools
  const chainId = getState().user.chainId;
  const stakingPools = getState().pools.data.filter(item => parseInt(item.chainId) === parseInt(chainId));
  let tokenBalances = {};
  const web3 = getWeb3NoAccount(chainId);
  for (let i = 0; i < stakingPools.length; i++) {
    const p = stakingPools[i];
    const stakeContract = new web3.eth.Contract(mepadABI, p.stakeTokenAddress);
    try {
      tokenBalances[p.id] = await getBalanceOf(stakeContract, account);
    } catch {
      tokenBalances[p.id] = 0;
    }
  }
  return tokenBalances;
};

export const fetchUserStakeBalances = async (account, getState) => {
  const chainId = getState().user.chainId;
  const stakingPools = getState().pools.data.filter(item => parseInt(item.chainId) === parseInt(chainId));

  const web3 = getWeb3NoAccount(chainId);
  let userInfos = {};
  for (let i = 0; i < stakingPools.length; i++) {
    const p = stakingPools[i];
    const stakeContract = new web3.eth.Contract(p.isMaster ? masterChefABI : sousChefABI, p.stakeContractAddress);
    try {
      const returnData = await getUserInfo(stakeContract, account);
      userInfos[p.id] = returnData.amount;
    } catch {
      userInfos[p.id] = 0;
    }
  }
  return userInfos;
};

export const fetchUserPendingRewards = async (account, getState) => {
  const chainId = getState().user.chainId;
  const stakingPools = getState().pools.data.filter(item => parseInt(item.chainId) === parseInt(chainId));

  const web3 = getWeb3NoAccount(chainId);
  let pendingRewards = {};
  for (let i = 0; i < stakingPools.length; i++) {
    const p = stakingPools[i];
    const stakeContract = new web3.eth.Contract(p.isMaster ? masterChefABI : sousChefABI, p.stakeContractAddress);
    try {
      pendingRewards[p.id] = await getPendingReward(stakeContract, account);
    } catch {
      pendingRewards[p.id] = 0
    }
  }
  return pendingRewards;
};


export const fetchPoolsUserDataAsync = (account) => async (dispatch, getState) => {
  try {
    const allowances = await fetchPoolsAllowance(account, getState);
    const stakingTokenBalances = await fetchUserBalances(account, getState);
    const stakedBalances = await fetchUserStakeBalances(account, getState);
    const pendingRewards = await fetchUserPendingRewards(account, getState);

    const chainId = getState().user.chainId;
    const stakingPools = getState().pools.data.filter(item => parseInt(item.chainId) === parseInt(chainId));
    const userData = stakingPools.map((pool) => ({
      id: pool.id,
      allowance: allowances[pool.id],
      stakingTokenBalance: stakingTokenBalances[pool.id],
      stakedBalance: stakedBalances[pool.id],
      pendingReward: pendingRewards[pool.id],
    }));
    dispatch(setPoolsUserData(userData));
  } catch (e) {
    console.error("e = ", e);
  }
};

export const fetchRewardPerBlock = async (getState) => {
  const chainId = getState().user.chainId;
  const stakingPools = getState().pools.data.filter(item => parseInt(item.chainId) === parseInt(chainId));

  const web3 = getWeb3NoAccount(chainId);
  let rewardPerBlocks = {};
  for (let i = 0; i < stakingPools.length; i++) {
    const p = stakingPools[i];
    const stakeContract = new web3.eth.Contract(p.isMaster ? masterChefABI : sousChefABI, p.stakeContractAddress);
    try {
      rewardPerBlocks[p.id] = await getRewardPerBlock(stakeContract);
    } catch {
      rewardPerBlocks[p.id] = 0;
    }
  }
  return rewardPerBlocks;
};

export const fetchPoolsBlockLimits = async (getState) => {
  const chainId = getState().user.chainId;
  const stakingPools = getState().pools.data.filter(item => parseInt(item.chainId) === parseInt(chainId));

  const web3 = getWeb3NoAccount(chainId);
  let blockLimits = {};
  for (let i = 0; i < stakingPools.length; i++) {
    const p = stakingPools[i];
    const stakeContract = new web3.eth.Contract(p.isMaster ? masterChefABI : sousChefABI, p.stakeContractAddress);
    try {
      const startBlock = await getStartBlock(stakeContract);
      const endBlock = await getEndBlock(stakeContract);
      blockLimits[p.id] = {
        startBlock,
        endBlock
      }
    } catch {
      blockLimits[p.id] = {
        startBlock: 0,
        endBlock: 0
      }
    }
  }
  return blockLimits;
};

export const fetchPoolsTotalStaking = async (getState) => {
  const chainId = getState().user.chainId;
  const stakingPools = getState().pools.data.filter(item => parseInt(item.chainId) === parseInt(chainId));

  const web3 = getWeb3NoAccount(chainId);
  let totalStaked = {};
  for (let i = 0; i < stakingPools.length; i++) {
    const p = stakingPools[i];
    const stakeContract = new web3.eth.Contract(p.isMaster ? masterChefABI : sousChefABI, p.stakeContractAddress);
    try {
      totalStaked[p.id] = await getTotalStakingTokens(stakeContract);
    } catch {
      totalStaked[p.id] = 0;
    }
  }
  return totalStaked;
};

export const fetchPoolFrozen = async (getState) => {
  const chainId = getState().user.chainId;
  const stakingPools = getState().pools.data.filter(item => parseInt(item.chainId) === parseInt(chainId));

  const web3 = getWeb3NoAccount(chainId);
  let frozens = {};
  for (let i = 0; i < stakingPools.length; i++) {
    const p = stakingPools[i];
    if (p.isMaster) {
      const stakeContract = new web3.eth.Contract(masterChefABI, p.stakeContractAddress);
      try {
        frozens[p.id] = await getIsFrozen(stakeContract);
      } catch {
        frozens[p.id] = false;
      }
    } else {
      frozens[p.id] = false;
    }
  }
  return frozens;
};


export const fetchPoolMinStakeValue = async (getState) => {
  const chainId = getState().user.chainId;
  const stakingPools = getState().pools.data.filter(item => parseInt(item.chainId) === parseInt(chainId));const web3 = getWeb3NoAccount(chainId);
  let minAmounts = {};
  for (let i = 0; i < stakingPools.length; i++) {
    const p = stakingPools[i];
    const stakeContract = new web3.eth.Contract(p.isMaster ? masterChefABI : sousChefABI, p.stakeContractAddress);
    try {
      minAmounts[p.id] = await getMinDepositAmount(stakeContract);
    } catch {
      minAmounts[p.id] = 0;
    }
  }
  return minAmounts;
};


// Thunks
export const fetchPoolsPublicDataAsync = () => async (dispatch, getState) => {
  try {
    const rewardPerBlocks = await fetchRewardPerBlock(getState);
    const blockLimits = await fetchPoolsBlockLimits(getState);
    const totalStakings = await fetchPoolsTotalStaking(getState);
    const frozens = await fetchPoolFrozen(getState);
    const minAmounts = await fetchPoolMinStakeValue(getState);

    const chainId = getState().user.chainId;
    const poolsConfig = getState().pools.data.filter(item => parseInt(item.chainId) === parseInt(chainId));
    const liveData = poolsConfig.map((pool) => {
      return {
        id: pool.id,
        rewardPerBlock: rewardPerBlocks[pool.id],
        ...blockLimits[pool.id],
        totalStaked: totalStakings[pool.id],
        minAmount: minAmounts[pool.id],
        isFrozen: frozens[pool.id]
      }
    });
    dispatch(setPoolsPublicData(liveData));
  } catch (e) {

  }
};

export const updateUserAllowance = (id, account) => async (dispatch, getState) => {
  const allowances = await fetchPoolsAllowance(account, getState);
  dispatch(updatePoolsUserData({ id, field: 'allowance', value: allowances[id] }));
};

export const updateUserBalance = (id, account) => async (dispatch, getState) => {
  const tokenBalances = await fetchUserBalances(account, getState);
  dispatch(updatePoolsUserData({ id, field: 'stakingTokenBalance', value: tokenBalances[id] }));
};

export const updateUserStakedBalance = (id, account) => async (dispatch, getState) => {
  const stakedBalances = await fetchUserStakeBalances(account, getState);
  dispatch(updatePoolsUserData({ id, field: 'stakedBalance', value: stakedBalances[id] }));
};

export const updateUserPendingReward = (id, account) => async (dispatch, getState) => {
  const pendingRewards = await fetchUserPendingRewards(account, getState);
  dispatch(updatePoolsUserData({ id, field: 'pendingReward', value: pendingRewards[id] }));
};

const { setPoolsDataRequest, setPoolsDataSuccess, setPoolsDataFail } = createActions({
  SET_POOLS_DATA_REQUEST: () => {
  },
  SET_POOLS_DATA_SUCCESS: data => ({ data }),
  SET_POOLS_DATA_FAIL: error => ({ error }),
});

export const fetchStakingPoolsData = () => async (dispatch) => {
  dispatch(setPoolsDataRequest());
  return Api.Pool.getSkakingData()
    .then(({ data }) => {
      data.sort((a, b) => (a.order > b.order) ? 1 : ((b.order > a.order) ? -1 : 0));
      dispatch(setPoolsDataSuccess(data));
      return data;
    })
    .catch((error) => {
      dispatch(setPoolsDataFail(error));
    });
};
