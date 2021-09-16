import React from 'react'
import { Modal, Text } from '@pancakeswap-libs/uikit'
import useTheme from '../../../../hooks/useTheme'
import { BASE_EXCHANGE_URL } from "../../../../consts/base-consts";
import Button from "../../../Button";
import style from '../PoolItem.module.scss';

const NotEnoughTokensModal = ({ tokenSymbol, onDismiss }) => {
  const { theme } = useTheme();

  return (
    <Modal
      title={`${tokenSymbol} required`}
      onDismiss={onDismiss}
      headerBackground={theme.colors.gradients.cardHeader}
    >
      <Text color="failure" bold>
        Insufficient {tokenSymbol} balance
      </Text>
      <Text mt="24px">You will need to buy {tokenSymbol} to stake in this pool!</Text>
      <Button
        compact
        blue
        wrapperClass={style.buyButton}
        onClick={() => window.open(`${BASE_EXCHANGE_URL}/#/swap?outputCurrency=0xd7730681b1dc8f6f969166b29d8a5ea8568616a3`)}>
        Buy {tokenSymbol}
      </Button>
      <Button compact light  role='button' className={style.closeButton} onClick={onDismiss}>
        Close Window
      </Button>
    </Modal>
  )
};

export default NotEnoughTokensModal
