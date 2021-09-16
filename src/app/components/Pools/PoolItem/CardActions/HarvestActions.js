import React from 'react'
import { Flex, Heading, Text, useModal } from '@pancakeswap-libs/uikit'
import { formatNumber, getBalanceNumber, getFullDisplayBalance } from '../../../../util'
import CollectModal from '../Modals/CollectModal'
import { useGetApiPrice } from "../../../../state/hooks";
import Button from "../../../Button";
import { useSelector } from "react-redux";
import frozenCollectImage from './img/collect.png';

import style from '../PoolItem.module.scss';
import actionsStyle from './CardActions.module.scss';

const HarvestActions = ({
                          earnings,
                          coinSymbol,
                          id,
                          isBnbPool,
                          isFrozen,
                          account,
                          isLoading = false,
                        }) => {
  const earningTokenPrice = useGetApiPrice(coinSymbol) ?? 0;
  const fullBalance = getFullDisplayBalance(earnings);
  const formattedBalance = formatNumber(getBalanceNumber(earnings), 3, 3);
  const earningsDollarValue = formatNumber(
    getBalanceNumber(earnings.multipliedBy(earningTokenPrice)),
  );
  const hasEarnings = earnings.toNumber() > 0;
  const isCompoundPool = id === 0;
  const stakingPoolsData = useSelector(state => state.pools.data);
  const [onPresentCollect] = useModal(
    <CollectModal
      formattedBalance={formattedBalance}
      fullBalance={fullBalance}
      coinSymbol={coinSymbol}
      earningsDollarValue={earningsDollarValue}
      id={id}
      account={account}
      isBnbPool={isBnbPool}
      isCompoundPool={isCompoundPool}
      stakingPoolsData={stakingPoolsData}
    />,
  );

  return (
    <Flex flexDirection="column" mb="16px">
      <Flex justifyContent="space-between" alignItems="center">
        <Flex flexDirection="column" className={style.earningComponent}>
          <>
            <Heading className={style.earningNumber} color={hasEarnings ? 'text' : 'textDisabled'}>{hasEarnings ? formattedBalance : 0}</Heading>
            <Text className={style.earningValue} color={hasEarnings ? 'textSubtle' : 'textDisabled'}>
              {`~${hasEarnings ? earningsDollarValue : 0} USD`}
            </Text>
          </>
        </Flex>
        <Flex>
          {isFrozen ? (
            <Button
              wrapperClass={actionsStyle.frozenCollect}
              disabled
            >
              <img src={frozenCollectImage} alt="" className={actionsStyle.frozenImage}/>
            </Button>
          ) : (
            <Button
              wrapperClass={style.collectButton}
              text={'Collect'}
              disabled={!hasEarnings || isLoading}
              compact
              gradient
              onClick={onPresentCollect}
            />
          )}
        </Flex>
      </Flex>
    </Flex>
  )
};

export default HarvestActions;
