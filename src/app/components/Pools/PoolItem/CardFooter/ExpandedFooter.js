import React from 'react'
import styled from 'styled-components'
import { getBalanceNumber } from '../../../../util'
import { Flex, LinkExternal, MetamaskIcon, Skeleton, Text, } from '@pancakeswap-libs/uikit'
import { registerToken } from '../../../../util'
import Balance from '../../../Balance'
import { BASE_BSC_SCAN_URL, BASE_TESTBSC_SCAN_URL } from "../../../../consts/base-consts";

import style from './CardFooter.module.scss';
import { get } from "lodash";

const ExpandedWrapper = styled(Flex)`
  svg {
    height: 14px;
    width: 14px;
  }
  clear: both;
`;

const ExpandedFooter = ({
                          pool,
                          account,
                          performanceFee = 0,
                          isAutoVault = false,
                          totalCakeInVault,
                        }) => {
  const { rewardTokenAddress, totalStaked, stakeContractAddress, chainId } = pool;

  const tokenAddress = rewardTokenAddress;
  const poolContractAddress = stakeContractAddress;
  const imageSrc = pool.smallerCoinImage;
  const isMetaMaskInScope = window.ethereum && !!(window.ethereum.isMetaMask);


  return (
    <ExpandedWrapper className={style.expanded} flexDirection="column">
      <Flex mb="2px" justifyContent="space-between" alignItems="center">
        <Text small color='#000'>Total staked:</Text>
        <Flex alignItems="flex-start">
          {totalStaked ? (
            <>
              <Balance
                color={'#0098ff'}
                fontSize="14px"
                value={getBalanceNumber(totalStaked)}
                bold
              />
              <Text ml="4px" color={'#0098ff'} bold fontSize="14px">
                {pool.coinSymbol}
              </Text>
            </>
          ) : (
            <Skeleton width="90px" height="21px" />
          )}
        </Flex>
      </Flex>
      {poolContractAddress && (
        <Flex mb="2px" justifyContent="flex-end" color='#0098ff'>
          <LinkExternal
            bold={false}
            color='#0098ff'
            small
            href={`${parseInt(chainId) === 56 ? BASE_BSC_SCAN_URL : BASE_TESTBSC_SCAN_URL}/address/${poolContractAddress}`}
          >
            View Contract
          </LinkExternal>
        </Flex>
      )}
      {account && isMetaMaskInScope && tokenAddress && (
        <Flex justifyContent="flex-end" color='#0098ff'>
          <LinkExternal
            color='#0098ff'
            bold={false}
            small
            onClick={() => registerToken(tokenAddress, pool.coinSymbol, get(pool,'decimals', 18), imageSrc)}
          >
            Add to Metamask
          </LinkExternal>
          <MetamaskIcon ml="4px" />
        </Flex>
      )}
    </ExpandedWrapper>
  )
};

export default React.memo(ExpandedFooter)
