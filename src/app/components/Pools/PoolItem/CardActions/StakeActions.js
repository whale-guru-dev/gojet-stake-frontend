import React from 'react'
import { Flex, Heading, Text, useModal, } from '@pancakeswap-libs/uikit'
import BigNumber from 'bignumber.js'
import { formatNumber, getBalanceNumber, getDecimalAmount } from '../../../../util'
import NotEnoughTokensModal from '../Modals/NotEnoughTokensModal'
import StakeModal from '../Modals/StakeModal'
import Button from "../../../Button";
import { useSelector } from "react-redux";
import plus from './img/plus.png';
import minus from './img/minus.png';
import stake from './img/stake.png';

import style from '../PoolItem.module.scss';
import cardActionsStyle from './CardActions.module.scss';

const StakeAction = ({
                       pool,
                       stakingTokenBalance,
                       stakingTokenPrice,
                       stakedBalance,
                       isBnbPool,
                       account,
                       isStaked,
                       isLoading = false,
                     }) => {
  const { coinSymbol, stakingLimit, isFrozen, endBlock } = pool;
  const convertedLimit = getDecimalAmount(new BigNumber(stakingLimit));
  const stakingMax =
    stakingLimit && stakingTokenBalance.isGreaterThan(convertedLimit) ? convertedLimit : stakingTokenBalance;
  const formattedBalance = formatNumber(getBalanceNumber(stakedBalance), 3, 3);
  const stakingMaxDollarValue = formatNumber(
    getBalanceNumber(stakedBalance.multipliedBy(stakingTokenPrice)),
  );
  const [onPresentTokenRequired] = useModal(<NotEnoughTokensModal tokenSymbol={coinSymbol} />);
  const stakingPoolsData = useSelector(state => state.pools.data);
  const [onPresentStake] = useModal(
    <StakeModal account={account} stakingMax={stakingMax} isBnbPool={isBnbPool} pool={pool}
                stakingTokenPrice={stakingTokenPrice} stakingPoolsData={stakingPoolsData} />,
  );
  const currentBlock = useSelector(state => state.block.currentBlock);
  const isEndBlock = currentBlock ? !endBlock || Number(currentBlock) > Number(endBlock) : true;

  const [onPresentUnstake] = useModal(
    <StakeModal
      stakingMax={stakedBalance}
      isBnbPool={isBnbPool}
      pool={pool}
      stakingTokenPrice={stakingTokenPrice}
      isRemovingStake
      account={account}
      stakingPoolsData={stakingPoolsData}
    />,
  );

  const renderStakeAction = () => {
    return isStaked ? (
      <Flex justifyContent="space-between" alignItems="center">
        <Flex flexDirection="column" className={style.earningComponent}>
          <Heading className={style.earningNumber}>{formattedBalance}</Heading>
          <Text className={style.earningValue} color={'#22282a'}>{`~${stakingMaxDollarValue || 0} USD`}</Text>
        </Flex>
        <Flex>
          {
            isFrozen ? (
              <>
                <Button
                  wrapperClass={cardActionsStyle.frozenStakeButton}
                  disabled
                >
                  <img src={plus} alt="" className={cardActionsStyle.frozenImage} />
                </Button>
                <Button
                  wrapperClass={cardActionsStyle.frozenStakeButton}
                  disabled
                >
                  <img src={minus} alt="" className={cardActionsStyle.frozenImage} />
                </Button>
              </>
            ) : (
              <>
                <Button
                  wrapperClass={style.stakeButton}
                  disabled={isLoading}
                  text={'-'}
                  compact
                  gradient
                  outline
                  onClick={onPresentUnstake}
                />
                  { !isEndBlock ? (
                    <Button
                      wrapperClass={style.stakeButton}
                      disabled={isEndBlock || isLoading}
                      text={'+'}
                      compact
                      gradient
                      outline
                      onClick={stakingTokenBalance.gt(0) ? onPresentStake : onPresentTokenRequired}
                    />
                  ) : (
                    <Button
                      wrapperClass={style.stakeButton}
                      disabled
                      text={'+'}
                      compact
                      gray
                      outline
                      onClick={stakingTokenBalance.gt(0) ? onPresentStake : onPresentTokenRequired}
                    />
                  )}

              </>
            )
          }
        </Flex>
      </Flex>
    ) : (
      <>
        {isFrozen ? (
          <Button
            wrapperClass={cardActionsStyle.frozenEnableButton}
            disabled
          >
            <img src={stake} alt="" className={cardActionsStyle.frozenImage} />
          </Button>
        ) : (
          <Button
            wrapperClass={style.button}
            disabled={isEndBlock || isLoading}
            compact
            gradient
            onClick={stakingTokenBalance.gt(0) ? onPresentStake : onPresentTokenRequired}
          >
            Stake
          </Button>
        )}
      </>
    )
  };

  return <Flex flexDirection="column">{renderStakeAction()}</Flex>
};

export default StakeAction
