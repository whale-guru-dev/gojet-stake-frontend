import metamask from './img/metamask.png';
import trustwallet from './img/trustwallet.svg';
import walletconnect from './img/walletconnect.svg';

export const PROVIDER_TYPES = {
  METAMASK: 'MetaMask',
  TRUSTWALLET: 'TrustWallet',
  WALLETCONNECT: 'WalletConnect'
};

export const CONNECTION_TYPES = {
  metamask: 'metamask',
  walletconnect: 'walletconnect'
};

export const PROVIDER_ITEMS = [
  {
    name: PROVIDER_TYPES.METAMASK,
    connector: CONNECTION_TYPES.metamask,
    description: 'Easy to use browser extension.',
    picture: metamask
  },
  {
    name: PROVIDER_TYPES.TRUSTWALLET,
    connector: CONNECTION_TYPES.metamask,
    description: 'Easy to use browser extension.',
    picture: trustwallet
  },
  {
    name: PROVIDER_TYPES.WALLETCONNECT,
    connector: CONNECTION_TYPES.walletconnect,
    description: 'Easy to use browser extension.',
    picture: walletconnect
  }
];
