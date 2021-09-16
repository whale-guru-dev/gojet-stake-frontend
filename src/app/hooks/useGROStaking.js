import { useState, useMemo, useContext } from 'react';
import { useWeb3React } from '@web3-react/core';

import { stkJETContractABI, JETContractABI } from '../contracts';
import { getWeb3, numberToBN } from '../util';

import useNotification from './useNotification';
import JetDefiContext from '../contexts/jet-defi-context';
import { JET_CONTRACT_ADDRESS, STK_JET_CONTRACT_ADDRESS } from '../consts/jet-defi-consts';

const MAX_GRO = '1000000000000000000000000';

export default function useGROStaking() {
  const { addNotification } = useNotification();
  const { setLastUpdatedTime } = useContext(JetDefiContext);

  const [depositAmount, setDepositAmount] = useState('');
  const [withdrawAmount, setWithdrawAmount] = useState('');

  const { account, library, chainId } = useWeb3React();
  const address = account;
  const web3 = getWeb3(library);

  const JETContractInstance = useMemo(
    () => new web3.eth.Contract(JETContractABI, JET_CONTRACT_ADDRESS),
    [web3]
  );
  const stkJETContractInstance = useMemo(
    () => new web3.eth.Contract(stkJETContractABI, STK_JET_CONTRACT_ADDRESS),
    [web3]
  );

  const isChainValid = () => {
    if (chainId !== 56 && chainId !== 97) {
      addNotification({
        title: 'Chain Error',
        message: 'Please check if BSC main or testnet network is chosen.',
        type: 'danger',
      });
      return false;
    }
    return true;
  };

  const onGRODeposit = async () => {
    const depositAmountNumber = Number(depositAmount);
    if (depositAmount <= 0 || !isChainValid()) {
      return;
    }

    const depositAmountInWei = numberToBN(depositAmountNumber, 1e18);
    // check allowance
    const allowance = await JETContractInstance.methods
      .allowance(address, STK_JET_CONTRACT_ADDRESS)
      .call();
    if (allowance < depositAmountInWei) {
      await JETContractInstance.methods.approve(STK_JET_CONTRACT_ADDRESS, MAX_GRO).send({
        from: address,
      });
    }

    try {
      await stkJETContractInstance.methods.deposit(depositAmountInWei).send({
        from: address,
      });
      addNotification({
        title: 'Success',
        message: `You have successfully deposited ${depositAmount} GRO`,
        type: 'success',
      });
    } catch (err) {
      console.log(err);
      addNotification({
        title: 'Failed!',
        message: 'Deposit Failed. Please check if you have enough balance.',
        type: 'danger',
      });
    } finally {
      setLastUpdatedTime(Date.now());
    }
  };

  const onGROWithdraw = async () => {
    const withdrawAmountNumber = Number(withdrawAmount);
    if (withdrawAmountNumber <= 0 || !isChainValid()) {
      return;
    }

    const withdrawAmountInWei = numberToBN(withdrawAmountNumber, 1e18);
    try {
      await stkJETContractInstance.methods.withdraw(withdrawAmountInWei).send({
        from: address,
      });
      addNotification({
        title: 'Success',
        message: `You have successfully withdrawn ${withdrawAmount} GRO`,
        type: 'success',
      });
    } catch (err) {
      console.log(err);
      addNotification({
        title: 'Failed!',
        message: 'Withdraw Failed. Please check if you have enough balance.',
        type: 'danger',
      });
    } finally {
      setLastUpdatedTime(Date.now());
    }
  };

  return {
    depositAmount,
    setDepositAmount,
    withdrawAmount,
    setWithdrawAmount,
    onGRODeposit,
    onGROWithdraw,
  };
}
