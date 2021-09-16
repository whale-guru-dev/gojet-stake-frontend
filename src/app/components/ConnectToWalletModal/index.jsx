import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import ProviderList from './ProviderList';
import { CONNECTION_TYPES, PROVIDER_ITEMS } from './costants';
import { LOADING_STATUSES } from '../../consts';
import style from './ConnectToWalletModal.module.scss';
import { connectMetaMask, connectToWalletConnect } from "../../actions/user";
import Button from "../Button";
import Modal from "../Modal";

export default function ConnectToWalletModal(props) {
  const { wrapperClass, onCancel, visible, ...restProps } = props;
  const [selectedItem, setSelectedItem] = useState(null);
  const [loadingStatus, setLoadingStatus] = useState(null);

  useEffect(() => {
    setSelectedItem(null);
    setLoadingStatus(null);
  }, [visible]);

  const dispatch = useDispatch();
  const dispatchConnect = () => dispatch(connectMetaMask());
  const dispatchWalletConnect = () => dispatch(connectToWalletConnect());

  const onSelect = (item) => {
    setSelectedItem(item);
    window.localStorage.setItem('connectorId', item.connector);

    if (item.connector === CONNECTION_TYPES.metamask) {
      setLoadingStatus(LOADING_STATUSES.LOADING);
      dispatchConnect()
        .then(res => {
          if (res) {
            setLoadingStatus(LOADING_STATUSES.LOADED);
            onCancel();
          } else {
            setLoadingStatus(LOADING_STATUSES.ERROR);
          }
        });
    } else if (item.connector === CONNECTION_TYPES.walletconnect) {
      setLoadingStatus(LOADING_STATUSES.LOADING);
      dispatchWalletConnect()
        .then(res => {
          if (res) {
            setLoadingStatus(LOADING_STATUSES.LOADED);
            onCancel();
          } else {
            setLoadingStatus(LOADING_STATUSES.ERROR);
          }
        });
    }
    else {
      setLoadingStatus(LOADING_STATUSES.ERROR);
    }
  };

  useEffect(() => {
    if (!selectedItem) {
      setLoadingStatus(null);
    }
  }, [selectedItem]);

  return (
    <Modal
      wrapperClass={wrapperClass}
      title={renderTitle(selectedItem, setSelectedItem)}
      width={390}
      onCancel={onCancel}
      visible={visible}
      {...restProps}
    >
      <ProviderList
        items={PROVIDER_ITEMS}
        selectedItem={selectedItem}
        onSelect={onSelect}
        onRepeat={onSelect}
        requesting={loadingStatus === LOADING_STATUSES.LOADING}
        error={loadingStatus === LOADING_STATUSES.ERROR}
      />
    </Modal>
  );
}

function renderTitle(selectedItem, setSelectedItem) {
  if (selectedItem) {
    return (
      <div style={{textAlign: 'left'}}>
        <Button
          wrapperClass={style.back}
          onClick={() => setSelectedItem(null)}
          text={'Back'}
        />
      </div>
    );
  }
  return 'Connect to a Wallet';
}
