import React, { useContext } from 'react';
import style from './PoolItem.module.scss';
import { get } from 'lodash';
import cn from 'classnames';
import CoinAvatar from "../../CoinAvatar";
import { useGetApiPrice } from "../../../state/hooks";
import { Flex } from '@pancakeswap-libs/uikit'
import CardActions from "./CardActions";
import { BigNumber } from "bignumber.js";
import CardFooter from './CardFooter';
import { AppContextType } from "../../../contexts/context_types";
import AprRow from "../AprRow";
import { useSelector } from "react-redux";
import { switchNetwork } from "../../../actions/user";
import { STAKING_TYPES } from "../../../consts/project-consts";
import Button from "../../Button";
import CardRibbon from "./CardRibbon";
import useToast from "../../../hooks/useToast";

export default function PoolItem(props) {
  const {
    pool = {},
    loading,
    wrapperClass,
    account,
  } = props;

  const { setConnectToWalletModalVisible } = useContext(AppContextType);
  const { userData } = pool;

  const name = get(pool, 'poolTitle');
  const logoUrl = get(pool, 'mainCoinImage');
  const description = get(pool, 'description');
  const iconUrl = get(pool, 'smallerCoinImage');
  const poolChainId = get(pool, 'chainId');
  const chainId = useSelector(state => state.user.chainId);
  const stakedBalance = new BigNumber(userData?.stakedBalance || 0);
  const accountHasStakedBalance = stakedBalance?.toNumber() > 0;
  const stakingTokenPrice = useGetApiPrice(pool.coinSymbol) ?? 0;
  const wrongNetwork = parseInt(poolChainId) !== chainId;
  const address = useSelector(state => state.user.userAccount.accounts ? state.user.userAccount.accounts[0] : '');
  const isComingSoon = pool.status === STAKING_TYPES.UPCOMING;
  const isFinished = pool.status === STAKING_TYPES.COMPLETED;
  const { toastError } = useToast();

  return (
    <div
      className={cn(style.container, wrapperClass, {
        [style.containerLoading]: loading
      })}
    >
      {isFinished && <CardRibbon title='Finished' />}
      {isComingSoon && (
        <div className={style.comingSoon}>
          Coming Soon
        </div>
      )}
      <div className={style.head}>
        <div>
          <strong className={style.title}>
            {name}
          </strong>
          <span className={style.type}>
            {description}
          </span>
        </div>
        {/* <CoinAvatar
          wrapperClass={style.picture}
          image={logoUrl}
          icon={iconUrl}
        /> */}
      </div>
      <div className={style.body}>
        <AprRow wrapperClass={style.apy} pool={pool} stakingTokenPrice={stakingTokenPrice} />
        <Flex flexDirection="column">
          {isComingSoon ? (
            <>
              <label className={style.earningText}>Start earning</label>
              <Button
                wrapperClass={style.comingSoonButton}
                text={'Coming Soon'}
                disabled
                compact
                gradient
              />
            </>
          ) : account && !wrongNetwork ? (
            <CardActions
              pool={pool}
              stakedBalance={stakedBalance}
              stakingTokenPrice={stakingTokenPrice}
              accountHasStakedBalance={accountHasStakedBalance}
              account={account}
            />
          ) : (
            <>
              <label className={style.earningText}>
                Start earning
              </label>
              <Button
                wrapperClass={style.buttonUnlock}
                text={'Unlock Wallet'}
                onClick={async () => {
                  if (!address) {
                    setConnectToWalletModalVisible(true);
                  } else if (wrongNetwork) {
                    switchNetwork(poolChainId, toastError);
                  }
                }}
                compact
                gradient
              />
            </>
          )}
        </Flex>
      </div>
      <CardFooter isComingSoon={isComingSoon} pool={pool} account={account} />
    </div>
  )
}
