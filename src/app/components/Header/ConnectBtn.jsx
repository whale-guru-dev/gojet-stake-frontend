import React from 'react';
import { useWeb3React } from '@web3-react/core';
import { useLocation } from 'react-router-dom';
import Button from 'react-bootstrap/Button';

import useConnectHandler from '../../hooks/useConnectHandler';

const parseAddress = (address) => {
  if (address) {
    const frontTail = address.substring(0, 5);
    const endTail = address.substring(address.length - 3, address.length);
    return `${frontTail}...${endTail}`;
  }
  return 'Connect';
};

export default function ConnectBtn() {
  const { account, chainId } = useWeb3React();
  const { pathname } = useLocation();

  const onStaking = pathname === '/staking';
  const onBuyJet = pathname === '/buy-jet';

  const chainSupported =
    (onStaking && (chainId === 56 || chainId === 97)) ||
    (onBuyJet && (chainId === 56 || chainId === 97));

  const { onConnectClick } = useConnectHandler();

  return (
    <Button
      className="connect-btn"
      variant={`outline-${!chainId || chainSupported ? 'info' : 'danger'}`}
      onClick={onConnectClick}
    >
      {!chainId || chainSupported ? parseAddress(account) : 'Wrong Network'}
    </Button>
  );
}
