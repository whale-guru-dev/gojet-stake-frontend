import React, { useCallback, useState } from 'react'
import useToast from '../../../../hooks/useToast'
import { useSousApprove } from "../../../../hooks/useApprove";
import { getMepadContract } from "../../../../util";
import Button from "../../../Button";
import { useSelector } from "react-redux";
import { STAKING_TYPES } from "../../../../consts/project-consts";
import frozenEnable from './img/enable.png';

import style from '../PoolItem.module.scss';
import cardActionsStyle from "./CardActions.module.scss";

const ApprovalAction = ({ pool, account, isLoading = false }) => {
  const { id, coinSymbol, status, isFrozen } = pool;
  const stakingTokenContract = getMepadContract(pool.stakeTokenAddress);
  const [requestedApproval, setRequestedApproval] = useState(false);
  const stakingPoolsData = useSelector(state => state.pools.data);
  const { onApprove } = useSousApprove(stakingTokenContract, id, account, stakingPoolsData);
  const { toastSuccess, toastError } = useToast();
  const isDisabled = status !== STAKING_TYPES.LIVE.toUpperCase() || requestedApproval || !id;
  const handleApprove = useCallback(async () => {
    try {
      setRequestedApproval(true);
      const txHash = await onApprove();
      if (txHash) {
        toastSuccess('Contract Enabled', `You can now stake in the ${coinSymbol} pool!`);
        setRequestedApproval(false)
      } else {
        // user rejected tx or didn't go thru
        toastError(
          'Error',
          'Please try again. Confirm the transaction and make sure you are paying enough gas!',
        );
        setRequestedApproval(false)
      }
    } catch (e) {
      console.error(e);
      toastError('Error', e?.message)
    }
  }, [onApprove, setRequestedApproval, toastSuccess, toastError, coinSymbol]);

  return isFrozen ? (
    <Button
      wrapperClass={cardActionsStyle.frozenEnableButton}
      disabled
    >
      <img src={frozenEnable} alt="" className={cardActionsStyle.frozenImage} />
    </Button>
  ) : (
    <Button
      wrapperClass={style.button}
      loading={requestedApproval}
      disabled={isDisabled}
      onClick={handleApprove}
      width="100%"
      compact
      gradient
    >
      {requestedApproval ? 'Enabling' : 'Enable'}
    </Button>
  )
};

export default ApprovalAction
