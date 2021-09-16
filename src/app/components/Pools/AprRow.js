import React from 'react'
import { Flex, Skeleton, TooltipText, useTooltip } from '@pancakeswap-libs/uikit'
import { getBalanceNumber } from '../../util'
import { getRoi, tokenEarnedPerThousandDollarsCompounding } from '../../util';
// import ApyCalculatorModal from "../ApyCalculatorModal";
import Balance from "../Balance";
// import { BASE_EXCHANGE_URL } from "../../config";
import { useGetApiPrice } from "../../state/hooks";
import { getPoolApr } from "../../util";
import { get } from 'lodash';
import { STAKING_TYPES } from "../../consts/project-consts";

const AprRow = ({ wrapperClass, pool, stakingTokenPrice, isAutoVault = false, compoundFrequency = 1, performanceFee = 0 }) => {
  const { stakeTokenAddress, totalStaked, status, rewardPerBlock, apy } = pool;

  const tooltipContent = isAutoVault
    ? 'APY includes compounding, APR doesn’t. This pool’s CAKE is compounded automatically, so we show APY.'
    : 'This pool’s rewards aren’t compounded automatically, so we show APR';

  const { targetRef, tooltip, tooltipVisible } = useTooltip(tooltipContent, { placement: 'bottom-end' });

  const earningTokenPrice = useGetApiPrice(pool.coinSymbol) ?? 0;
  const apr = getPoolApr(
    stakingTokenPrice,
    earningTokenPrice,
    getBalanceNumber(totalStaked, get(stakeTokenAddress, 'decimals', 18)),
    getBalanceNumber(rewardPerBlock, get(stakeTokenAddress, 'decimals', 18)),
    apy);

  // special handling for tokens like tBTC or BIFI where the daily token rewards for $1000 dollars will be less than 0.001 of that token
  const isHighValueToken = Math.round(earningTokenPrice / 1000) > 0;
  const roundingDecimals = isHighValueToken ? 4 : 2;

  const earningsPercentageToDisplay = () => {
    if (isAutoVault) {
      const oneThousandDollarsWorthOfToken = 1000 / earningTokenPrice;
      const tokenEarnedPerThousand365D = tokenEarnedPerThousandDollarsCompounding({
        numberOfDays: 365,
        farmApr: apr,
        tokenPrice: earningTokenPrice,
        roundingDecimals,
        compoundFrequency,
        performanceFee,
      });
      return getRoi({
        amountEarned: tokenEarnedPerThousand365D,
        amountInvested: oneThousandDollarsWorthOfToken,
      })
    }
    return apr
  };

  return (
    <Flex className={wrapperClass} alignItems="center" justifyContent="space-between">
      {tooltipVisible && tooltip}
      <TooltipText ref={targetRef} color={'#22282a'} style={{textDecoration: 'none', fontWeight: 'bold'}}>
        APY:
      </TooltipText>
      {status !== STAKING_TYPES.LIVE.toUpperCase() || !apr ? (
        <Skeleton width="79px" height="25px" />
      ) : (
        <Flex alignItems="center">
          <Balance
            fontSize="16px"
            isDisabled={status !== STAKING_TYPES.LIVE.toUpperCase()}
            value={earningsPercentageToDisplay()}
            decimals={2}
            unit="%"
            bold
            color={'#22282a'}
          />
        </Flex>
      )}
    </Flex>
  )
};

export default AprRow
