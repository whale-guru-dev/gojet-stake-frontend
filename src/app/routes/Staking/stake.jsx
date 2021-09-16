import React, { useState } from 'react'
import cn from 'classnames';
import Helmet from "react-helmet";
import StakeUnstakeModal from "./StakeUnstakeModal";
import { useSelector } from "react-redux";
import {
  useFetchLockEvent,
  useFetchPriceList,
  useFetchPublicData,
  useFetchStakingPoolList,
  usePools
} from "../../state/hooks";
import PoolsList from "../../components/Pools/PoolsList";
import StakingBanner from "../../components/StakingBanner";
import bg from '../../../assets/images/vdc-compound.png';

import style from './Staking.module.scss';
import { STAKING_INDEXES } from "../../consts/project-consts";
// import '../../../assets/stylesheets/stake.css';

export default function Stake() {
  const [isLoading] = useState(false);
  const [stakeItem, setStakeItem] = useState(null);
  const [unstakeItem, setUnstakeItem] = useState(null);
  const accounts = useSelector(state => state.user.userAccount.accounts);
  useFetchStakingPoolList();
  const isStakingPoolsLoading = useSelector(state => state.pools.requesting);
  useFetchPriceList();
  useFetchPublicData();
  useFetchLockEvent();

  const poolSort = (item1, item2) => {
    if (item1.status === item2.status) {
      return item1.order > item2.order ? 1 : item1.order < item2.order ? -1 : 0;
    }
    return STAKING_INDEXES[item1.status] > STAKING_INDEXES[item2.status] ? 1 : STAKING_INDEXES[item1.status] < STAKING_INDEXES[item2.status] ? -1 : 0;
  };
  const pools = usePools(accounts[0], isStakingPoolsLoading)?.sort(poolSort) ?? [];

  return (
    <div className={cn(style.container, { [style.loading]: isLoading })}>
      <Helmet>
        <title>
          Staking | GoJET Launchpad
        </title>
      </Helmet>
      <StakingBanner
        title={'GoJET Staking Pools'}
        text={'Choose your pool and get rewarded for staking JET.'}
        image={bg}
      />
      <section className={cn(style.body, 'content')}>
        <PoolsList
          items={pools}
          account={accounts[0]}
          loading={false}
        />
      </section>
      <StakeUnstakeModal
        heading={'Stake in Pool'}
        item={stakeItem ? stakeItem : {}}
        visible={!!stakeItem}
        onCancel={() => setStakeItem(null)}

        // TODO: Implement API
        balance={3.48789894377432}
        onConfirm={item => {
        }}
        requestingConfirmation={false}
      />
      <StakeUnstakeModal
        heading={'Unstake'}
        item={unstakeItem ? unstakeItem : {}}
        visible={!!unstakeItem}
        onCancel={() => setUnstakeItem(null)}

        // TODO: Implement API
        balance={3.48789894377432}
        onConfirm={item => {
        }}
        requestingConfirmation={false}
      />
    </div>
  )
}
