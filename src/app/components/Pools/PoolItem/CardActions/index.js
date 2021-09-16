import BigNumber from 'bignumber.js'
import React from 'react'
import { Box, Flex } from '@pancakeswap-libs/uikit'
import ApprovalAction from './ApprovalAction'
import StakeActions from './StakeActions'
import HarvestActions from './HarvestActions'
import style from './CardActions.module.scss';

const CardActions = ({
                       pool,
                       stakedBalance,
                       accountHasStakedBalance,
                       stakingTokenPrice,
                       account,
                       isComingSoon
                     }) => {
  const { id, coinSymbol, harvest = true, userData, isFrozen } = pool;
  // Pools using native BNB behave differently than pools using a token
  const allowance = new BigNumber(userData?.allowance || 0);
  const stakingTokenBalance = new BigNumber(userData?.stakingTokenBalance?.toString() || 0);
  const earnings = new BigNumber(userData?.pendingReward || 0);
  const needsApproval = !accountHasStakedBalance && !allowance.gt(0);
  // const needsApproval = true;
  const isStaked = stakedBalance.gt(0);
  const isLoading = !userData;

  return (
    <Flex flexDirection="column">
      <Flex flexDirection="column">
        {harvest && (
          <>
            <Box display="inline">
              <span className={style.label}>
                {`${coinSymbol} `} Earned
              </span>
            </Box>
            <HarvestActions
              earnings={earnings}
              coinSymbol={coinSymbol}
              isFrozen={isFrozen}
              id={id}
              account={account}
              isLoading={isLoading}
            />
          </>
        )}
        <Box display="inline">
          <span className={style.label}>
            {isStaked ? coinSymbol : 'Stake'}{' '}
          </span>
          <span className={style.label}>
            {isStaked ? 'Staked' : `${coinSymbol}`}
          </span>
        </Box>
        {needsApproval ? (
          <ApprovalAction pool={pool} isLoading={isLoading} account={account} />
        ) : (
          <StakeActions
            isLoading={isLoading}
            pool={pool}
            stakingTokenBalance={stakingTokenBalance}
            stakingTokenPrice={stakingTokenPrice}
            stakedBalance={stakedBalance}
            isStaked={isStaked}
            account={account}
          />
        )}
      </Flex>
    </Flex>
  )
};

export default CardActions
