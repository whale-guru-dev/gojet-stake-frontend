import React, { useEffect, useState } from 'react'
import { Flex, Modal, Text } from '@pancakeswap-libs/uikit'
import { useSousStake } from '../../../../hooks/useStake'
import { useSousUnstake } from '../../../../hooks/useUnstake'
import useTheme from '../../../../hooks/useTheme'
import useToast from '../../../../hooks/useToast'
import BigNumber from 'bignumber.js'
import {
  formatNumber,
  getBalanceNumber,
  getDecimalAmount,
  getFullDisplayBalance
} from '../../../../util'
import Button from "../../../Button";
import RangeInput from "../../../Form/components/Input/RangeInput";
import NumberInput from "../../../Form/components/Input/NumberInput";
import style from '../PoolItem.module.scss';
import { get } from 'lodash'
import getCoinImage from '../../../../../assets/images/vdc-compound.png';

const StakeModal = ({
                      pool,
                      stakingMax,
                      stakingTokenPrice,
                      isRemovingStake = false,
                      onDismiss,
                      account,
                      stakingPoolsData
                    }) => {
  const { id, coinSymbol, pid, minAmount, stakeTokenDecimals } = pool;

  const minDepositAmount = getBalanceNumber(minAmount, stakeTokenDecimals);
  const { theme } = useTheme();
  const { onStake } = useSousStake(id, account, pid, stakingPoolsData);
  const { onUnstake } = useSousUnstake(id, account, pid, stakingPoolsData);
  const { toastSuccess, toastError } = useToast();

  const [pendingTx, setPendingTx] = useState(false);
  const [stakeAmount, setStakeAmount] = useState(0);
  const [percent, setPercent] = useState(0);

  const [coinImage, setCoinImage] = useState(null);

  useEffect(() => {
    if (!pool.smallerCoinImage || pool.smallerCoinImage === '') {
      setCoinImage(getCoinImage);
    } else {
      setCoinImage(pool.smallerCoinImage);
    }
  }, [pool.smallerCoinImage]);

  const formattedStakingMax = getFullDisplayBalance(stakingMax, get(pool, 'stakeTokenDecimals', 18), 4);

  if (!stakingTokenPrice) {
    stakingTokenPrice = 0;
  }

  const usdValueStaked = stakeAmount && formatNumber(new BigNumber(stakeAmount).times(stakingTokenPrice).toNumber().toFixed(4));

  const handleStakeInputChange = (inputValue) => {
    const value = !isNaN(parseFloat(inputValue)) ? parseFloat(inputValue) : 0;
    const convertedInput = getDecimalAmount(new BigNumber(value), get(pool, 'stakeTokenDecimals', 18));
    setStakeAmount(value > formattedStakingMax ? formattedStakingMax : value);
    const percentage = Math.floor(convertedInput.dividedBy(stakingMax).multipliedBy(100).toNumber());
    setPercent(Math.min(percentage, 100))
  };

  const handleChangePercent = (sliderPercent) => {
    const percentageOfStakingMax = stakingMax.multipliedBy(sliderPercent / 100);
    const amountToStake = getFullDisplayBalance(percentageOfStakingMax, get(pool, 'stakeTokenDecimals', 18), 4);
    setStakeAmount(amountToStake > formattedStakingMax ? formattedStakingMax : amountToStake);
    setPercent(sliderPercent)
  };

  const handleConfirmClick = async () => {
    setPendingTx(true);

    if (isRemovingStake) {
      // unstaking
      try {
        await onUnstake(stakeAmount, get(pool, 'decimals', 18));
        toastSuccess(
          `Unstaked!`,
          `Your ${coinSymbol} earnings have also been harvested to your wallet!`,
        );
        setPendingTx(false);
        onDismiss()
      } catch (e) {
        toastError('Canceled', 'Please try again and confirm the transaction.');
        setPendingTx(false)
      }
    } else {
      try {
        // staking
        await onStake(stakeAmount, get(pool, 'decimals', 18));
        toastSuccess(`Staked!`, `Your ${coinSymbol} funds have been staked in the pool!`);
        setPendingTx(false);
        onDismiss()
      } catch (e) {
        console.error(e);
        toastError('Canceled', 'Please try again and confirm the transaction.');
        setPendingTx(false)
      }
    }
  };

  return (
    <Modal
      minWidth={370}
      title={isRemovingStake ? 'Unstake' : 'Stake in Pool'}
      onDismiss={onDismiss}
      headerBackground={theme.colors.gradients.cardHeader}
      className={style.modalStake}
    >
      <Flex alignItems="center" justifyContent="space-between" mb="8px">
        <Text bold>{isRemovingStake ? 'Unstake' : 'Stake'}:</Text>
        <Flex alignItems="right" minWidth="80px">
          <img src={getCoinImage} width={24} height={24}
               alt={coinSymbol} className={style.mainCoinImage} />
          <Text ml="4px" bold>
            {coinSymbol}
          </Text>
        </Flex>
      </Flex>

      <div className={style.box}>
        <NumberInput
          inputClass={style.input}
          value={stakeAmount}
          onChange={handleStakeInputChange}
          step={0.1}
          disabled={pendingTx}
          min={0}
          max={stakingMax}
        />
        <div className={style.index}>{`~${usdValueStaked || 0} USD`}</div>
      </div>
      <div className={style.balance}>
        Balance: {formattedStakingMax}
      </div>

      <RangeInput
        inputClass={style.range}
        max={100}
        min={0}
        value={percent}
        onChange={handleChangePercent}
        step={1}
        format={false}
        displayHead={false}
        disabled={pendingTx}
      />
      <div className={style.options}>
        <Button
          wrapperClass={style.option}
          text={'25%'}
          disabled={pendingTx}
          onClick={() => handleChangePercent(25)}
        />
        <Button
          wrapperClass={style.option}
          text={'50%'}
          disabled={pendingTx}
          onClick={() => handleChangePercent(50)}
        />
        <Button
          wrapperClass={style.option}
          text={'75%'}
          disabled={pendingTx}
          onClick={() => handleChangePercent(75)}
        />
        <Button
          wrapperClass={style.option}
          text={'MAX'}
          disabled={pendingTx}
          onClick={() => handleChangePercent(100)}
        />
      </div>
      <Button
        wrapperClass={style.button}
        loading={pendingTx}
        disabled={!stakeAmount || parseFloat(stakeAmount) === 0 || pendingTx || (!isRemovingStake && stakeAmount < minDepositAmount)}
        text={pendingTx ? 'Confirming' : 'Confirm'}
        onClick={handleConfirmClick}
        compact
        gradient
      />
    </Modal>
  )
};

export default StakeModal
