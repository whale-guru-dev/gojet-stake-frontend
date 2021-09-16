import { useRef, useState, useEffect, useMemo } from 'react';
import { useWeb3React } from '@web3-react/core';

import { BNtoNumber, getWeb3, request } from '../util';
import { stkJETContractABI, JETContractABI } from '../contracts';
import {
  FETCH_INTERVAL,
  JET_CONTRACT_ADDRESS,
  STK_JET_CONTRACT_ADDRESS,
} from '../consts/jet-defi-consts';

async function getJetToUSD() {
  const usdValue = await request(
    `https://api.coingecko.com/api/v3/simple/token_price/ethereum?contract_addresses=${JET_CONTRACT_ADDRESS}&vs_currencies=usd`,
    {}
  );

  return usdValue[JET_CONTRACT_ADDRESS.toLowerCase()].usd;
}

export default function useBalance(lastUpdatedTime) {
  const handler = useRef(null);
  const [ethBalance, setEthBalance] = useState(0);
  const [jetBalance, setJetBalance] = useState(0);
  const [stkGROBalance, setStkGROBalance] = useState(0);
  const [stkGROToUSD, setStkGROToUSD] = useState(0);
  const [stkTotalReserve, setStkTotalReserve] = useState(0);
  const [stkGRORatio, setStkGRORatio] = useState(0);

  const defaultDecimals = 1e18;

  const { account, library, chainId } = useWeb3React();
  const address = account;
  const web3 = getWeb3(library);

  const stkGROContractInstance = useMemo(
    () => new web3.eth.Contract(stkJETContractABI, STK_JET_CONTRACT_ADDRESS),
    [web3]
  );

  const jetContractInstance = useMemo(
    () => new web3.eth.Contract(JETContractABI, JET_CONTRACT_ADDRESS),
    [web3]
  );

  useEffect(() => {
    async function getBalance() {
      const promises = [];

      if (address && chainId === 1) {
        promises.push(
          web3.eth.getBalance(address),
          jetContractInstance.methods.balanceOf(address).call(),
          stkGROContractInstance.methods.balanceOf(address).call(),
          stkGROContractInstance.methods.totalReserve().call(),
          stkGROContractInstance.methods.totalSupply().call(),
          getJetToUSD()
        );
      } else {
        promises.push(0, 0, 0, 0, 1, 0);
      }

      // calculate user balance in USD
      // get stkGRO price: stkGRO contract totalReserve / totalSupply

      const [ethBalance, jetBalance, stkGROBalance, totalReserve, totalSupply, jetToUsd] =
        await Promise.all(promises);

      setEthBalance(Number(BNtoNumber(ethBalance.toString(), defaultDecimals)));
      setJetBalance(Number(BNtoNumber(jetBalance.toString(), defaultDecimals)));
      setStkGROBalance(Number(BNtoNumber(stkGROBalance.toString(), defaultDecimals)));
      setStkTotalReserve(Number(BNtoNumber(totalReserve.toString(), defaultDecimals)));
      setStkGRORatio(
        Number(BNtoNumber(totalReserve.toString(), defaultDecimals)) /
          Number(BNtoNumber(totalSupply.toString(), defaultDecimals))
      );
      setStkGROToUSD((jetToUsd * totalReserve) / totalSupply);
    }

    handler.current = setInterval(() => {
      getBalance();
    }, FETCH_INTERVAL);

    return () => {
      if (handler.current) {
        clearInterval(handler.current);
      }
    };
  }, [web3, address, chainId, jetContractInstance, stkGROContractInstance, lastUpdatedTime]);

  return {
    ethBalance,
    jetBalance,
    stkGROBalance,
    stkGROToUSD,
    stkTotalReserve,
    stkGRORatio,
  };
}
