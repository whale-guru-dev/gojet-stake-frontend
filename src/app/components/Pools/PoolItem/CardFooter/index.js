import React, { useState } from 'react'
import { CardFooter } from '@pancakeswap-libs/uikit'
import ExpandedFooter from './ExpandedFooter'
import {ReactComponent as RotateIcon} from "./rotating-arrow-to-the-left.svg";
import Button from "../../../Button";
import style from './CardFooter.module.scss';
import cn from 'classnames';
import {ReactComponent as ArrowIcon} from './arrow-down.svg';

const Footer = ({
                  pool,
                  account,
                  performanceFee = 0,
                  isAutoVault = false,
                  totalCakeInVault,
                  isComingSoon
                }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const { id } = pool;

  return (
    <CardFooter className={cn(style.footer, {
      [style.comingSoon]: isComingSoon
    })}>
      <div className={style.actions}>

        <Button
          wrapperClass={style.manualButton}
          text={'Manual'}
          small
          outline
          dark
          icon={<RotateIcon/>}
          iconClass={style.manualButtonIcon}
          iconAlignStart
          disabled={isComingSoon}
        />
        <Button
          wrapperClass={cn(style.detailsButton, {
            [style.detailsButtonExpanded]: isExpanded
          })}
          onClick={() => {
            if (id && !isComingSoon) {
              setIsExpanded(!isExpanded)
            }
          }}
          text={isExpanded ? 'Hide' : 'Details'}
          disabled={isComingSoon}
          icon={<ArrowIcon/>}
          iconClass={style.detailsButtonIcon}
        />
      </div>
      {isExpanded && (
        <ExpandedFooter
          pool={pool}
          account={account}
          performanceFee={performanceFee}
          isAutoVault={isAutoVault}
          totalCakeInVault={totalCakeInVault}
        />
      )}
    </CardFooter>
  )
};

export default Footer
