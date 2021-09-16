import bscAvatar from "../../assets/images/bscAvatar.png";

export const LOADING_STATUSES = {
  LOADING: 'loading',
  LOADED: 'loaded',
  ERROR: 'error'
};

export const BLOCKCHAIN_TYPES = {
  BSC: '0x38',
  BSC_TEST: '0x61',
};

export const BLOCKCHAIN_ICON_BY_ID = {
  [BLOCKCHAIN_TYPES.BSC]: {
    icon: '',
    avatar: bscAvatar
  },
  [BLOCKCHAIN_TYPES.BSC_TEST]: {
    icon: '',
    avatar: bscAvatar
  }
};

export const CHAIN_ID_TYPES = {
  BSC: '56',
  BSC_TEST: '97',
};