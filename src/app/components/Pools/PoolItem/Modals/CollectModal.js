import React, { useState } from 'react'
import { ButtonMenu, ButtonMenuItem, Flex, HelpIcon, Modal, Text, useTooltip, } from '@pancakeswap-libs/uikit'
import useTheme from '../../../../hooks/useTheme'
import { useSousHarvest } from '../../../../hooks/useHarvest'
import { useSousStake } from '../../../../hooks/useStake'
import useToast from '../../../../hooks/useToast'
import Button from "../../../Button";
import style from "../PoolItem.module.scss";

const CollectModal = ({
                        formattedBalance,
                        fullBalance,
                        coinSymbol,
                        earningsDollarValue,
                        id,
                        pid,
                        account,
                        isCompoundPool = false,
                        onDismiss,
                        stakingPoolsData
                      }) => {
  const { theme } = useTheme();
  const { toastSuccess, toastError } = useToast();
  const { onReward } = useSousHarvest(id, account, stakingPoolsData);
  const { onStake } = useSousStake(id, account, pid, stakingPoolsData);
  const [pendingTx, setPendingTx] = useState(false);
  const [shouldCompound, setShouldCompound] = useState(isCompoundPool);
  const { targetRef, tooltip, tooltipVisible } = useTooltip(
    <>
      <Text mb="12px">Compound: collect and restake CAKE into pool.</Text>
      <Text>Harvest: collect CAKE and send to wallet</Text>
    </>,
    { placement: 'bottom-end', tooltipOffset: [20, 10] },
  );

  const handleHarvestConfirm = async () => {
    setPendingTx(true);
    // compounding
    if (shouldCompound) {
      try {
        await onStake(fullBalance);
        toastSuccess(
          `Compounded!`,
          `Your ${coinSymbol} earnings have been re-invested into the pool!`,
        );
        setPendingTx(false);
        onDismiss()
      } catch (e) {
        toastError('Canceled', 'Please try again and confirm the transaction.');
        setPendingTx(false)
      }
    } else {
      // harvesting
      try {
        await onReward();
        toastSuccess(`Harvested!`, `Your ${coinSymbol} earnings have been sent to your wallet!`);
        setPendingTx(false);
        onDismiss()
      } catch (e) {
        console.log('error = ', e);
        toastError('Canceled', 'Please try again and confirm the transaction.');
        setPendingTx(false)
      }
    }
  };

  return (
    <Modal
      title={`${coinSymbol} Harvest`}
      minWidth={370}
      onDismiss={onDismiss}
      headerBackground={theme.colors.gradients.cardHeader}
      className={style.modalStake}
    >
      {isCompoundPool && (
        <Flex justifyContent="center" alignItems="center" mb="24px">
          <ButtonMenu
            activeIndex={shouldCompound ? 0 : 1}
            scale="sm"
            variant="subtle"
            onItemClick={(index) => setShouldCompound(!index)}
          >
            <ButtonMenuItem as="button">Compound</ButtonMenuItem>
            <ButtonMenuItem as="button">Harvest</ButtonMenuItem>
          </ButtonMenu>
          <Flex ml="10px" ref={targetRef}>
            <HelpIcon color="textSubtle" />
          </Flex>
          {tooltipVisible && tooltip}
        </Flex>
      )}

      <Flex justifyContent="space-between" alignItems="center" mb="24px">
        <Text color={'#2a2a78'} fontSize={'20px'} bold >{shouldCompound ? 'Compounding' : 'Harvesting'}:</Text>
        <Flex flexDirection="column">
          <Text color={'#2a2a78'} fontSize={'25px'} bold >
            {formattedBalance} {coinSymbol}
          </Text>
          <Text color={'#2a2a78'} fontSize={'15px'} bold alignItems="right">{`~${earningsDollarValue || 0} USD`}</Text>
        </Flex>
      </Flex>
      <Button
        wrapperClass={style.button}
        loading={pendingTx}
        text={pendingTx ? 'Confirming' : 'Confirm'}
        onClick={handleHarvestConfirm}
        compact
        gradient
      />
      <Button wrapperClass={style.closeWindow} variant="text" onClick={onDismiss} text={'Close window'} />
    </Modal>
  )
};

export default CollectModal
