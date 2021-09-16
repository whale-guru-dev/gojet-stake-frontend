import { useDispatch, useSelector } from 'react-redux'
import { useContext, useEffect } from "react";
import useRefresh from "../hooks/useRefresh";
import {
  fetchPoolsPublicDataAsync,
  fetchPoolsUserDataAsync, fetchStakingPoolsData,
} from "../actions/pools";
import { fetchPrices } from "../actions/prices";
import { setBlock } from "../actions/block";
import Web3 from "web3";
import { detectAccountLock } from "../actions/user";
import { AppContextType } from "../contexts/context_types";

export const useFetchPublicData = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const interval = setInterval(async () => {
      if (window.web3 && window.web3.currentProvider) {
        const web3 = new Web3(window.web3.currentProvider);
        const blockNumber = await web3.eth.getBlockNumber();
        dispatch(setBlock(blockNumber))
      }
    }, 6000);

    return () => clearInterval(interval)
  }, [ dispatch ])
};

export const useGetApiPrices = () => {
  return useSelector(state => state.prices.data);
};

export const useGetApiPrice = (symbol) => {
  const prices = useGetApiPrices();

  if (!prices) {
    return null
  }
  return prices[symbol.toLowerCase()]
};

export const useFetchPriceList = () => {
  const { slowRefresh } = useRefresh();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchPrices())
  }, [ dispatch, slowRefresh ])
};

export const useFetchLockEvent = () => {
  const { fastRefresh } = useRefresh();
  const dispatch = useDispatch();
  const { isMobile } = useContext(AppContextType);
  useEffect(() => {
    if (!isMobile) {
      dispatch(detectAccountLock());
    }
  }, [dispatch, fastRefresh, isMobile])
};

export const usePools = (account, isStakingPoolsLoading) => {
  const { fastRefresh } = useRefresh();
  const dispatch = useDispatch();
  useEffect(() => {
    if (!isStakingPoolsLoading) {
      dispatch(fetchPoolsPublicDataAsync());
      if (account) {
        dispatch(fetchPoolsUserDataAsync(account))
      }
    }
  }, [ account, dispatch, fastRefresh, isStakingPoolsLoading ]);

  return useSelector((state) => state.pools.data);
};

export const useFetchStakingPoolList = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchStakingPoolsData());
  }, [ dispatch ]);
};

// Block
export const useBlock = () => {
  return useSelector((state) => state.block)
};
