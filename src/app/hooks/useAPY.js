import { useState, useEffect, useRef, useMemo } from 'react';
import { useWeb3React } from '@web3-react/core';

import { stkJETContractABI, JETContractABI } from '../contracts';
import { getWeb3, BNtoNumber, getPancakeSwapReserves, request } from '../util';
import {
  FETCH_INTERVAL,
  JET_CONTRACT_ADDRESS,
  STK_JET_CONTRACT_ADDRESS,
} from '../consts/jet-defi-consts';

const rewardsPerYear = 24000;
const zeroAddress = '0x0000000000000000000000000000000000000000';
const last30DaysInBlock = 162000;
export default function useAPY() {
  const handler = useRef(null);
  const [groAPY, setGROAPY] = useState(0);

  const { account, library } = useWeb3React();
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

  const defaultDecimals = 1e18;

  useEffect(() => {
    async function getAPRGro() {
      const currentBlock = await web3.eth.getBlockNumber();
      const etherScanUrl = `https://api.etherscan.io/api?module=account&action=tokentx&address=${STK_JET_CONTRACT_ADDRESS}&startblock=${
        currentBlock - last30DaysInBlock
      }&endblock=${currentBlock}&sort=asc&apikey=NS5MWIQIXIYB9S6RS2FC6BANBW3Y9F9XV5`;
      let stkGROVolumeChangeLast30Days = 0;
      const stkGroContractBalance = await jetContractInstance.methods
        .balanceOf(STK_JET_CONTRACT_ADDRESS)
        .call();

      try {
        const { result } = await request(etherScanUrl, {});
        result
          .filter((tx) => tx.tokenSymbol === 'GRO' && tx.to !== zeroAddress)
          .forEach((tx) => {
            stkGROVolumeChangeLast30Days += Number(BNtoNumber(tx.value, defaultDecimals));
          });
      } catch (e) {
        console.log('--> fetch events failed', e);
      }

      const annualRewards = rewardsPerYear + ((stkGROVolumeChangeLast30Days * 0.05) / 30) * 365; // 24000 is 2000 GRO monthly. And second one is 5% fee gathered
      const APR = annualRewards / Number(BNtoNumber(stkGroContractBalance, defaultDecimals));
      setGROAPY(Math.E ** APR - 1);
    }

    getAPRGro();
    handler.current = setInterval(() => {
      getAPRGro();
    }, FETCH_INTERVAL * 12); // 1 min

    return () => {
      if (handler.current) {
        clearInterval(handler.current);
      }
    };
  }, [address, web3, stkGROContractInstance, jetContractInstance]);

  return { groAPY };
}
