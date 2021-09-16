import { find, floor, get, map, parseInt, random, } from 'lodash';
import moment from 'moment';

export const getView = (width) => {
  let newView = 'MobileView';
  if (width > 1220) {
    newView = 'DesktopView';
  } else if (width > 767) {
    newView = 'TabView';
  }
  return newView;
};

export const getFileFromType = (data, type) => {
  return find(data, { type });
};

export const convertDurationToMinuteString = value => {
  const duration = moment.duration(parseInt(value), 'seconds');
  const hours = duration.hours();
  const minutes = duration.minutes();
  const seconds = duration.seconds();
  if (hours > 0) {
    return `${hours}h ${minutes}min ${seconds}sec`;
  }
  if (minutes > 0) {
    return `${minutes}min ${seconds}sec`;
  }
  return `${seconds}sec`;
};

export const convertDurationToMinute = (value, notShowMinute) => {
  const minute = floor(value / 60, 0);
  const seconds = floor(value % 60, 0);
  if (notShowMinute) {
    return `${minute < 10 ? `${minute}` : minute}`;
  }
  // return `${minute < 10 ? `0${minute}` : minute}:${seconds < 10 ? `0${seconds}` : seconds}`;
  return `${minute < 10 ? `${minute}` : minute}:${seconds < 10 ? `0${seconds}` : seconds}`;
};

export const createDefaultUploadFile = (data, isSoundFile) => {
  let name = get(data, 'name', '');
  let url = get(data, 'url', '');
  const id = get(data, 'id', '');
  if (!isSoundFile) {
    const imageData = getFileFromType(data, 'medium', '');
    name = get(imageData, 'name', '');
    url = get(imageData, 'url', '');
  }
  // uid must be string number
  return [{
    uid: `${moment()
      .valueOf()}`, id, name, url, status: 'done',
  }];
};

export const createDefaultFileImage = data => {
  const id = get(data, 'id');
  const name = get(data, 'data.0.name');
  const url = get(data, 'data.0.url');

  if (!id) {
    return null;
  }
  return [{ uid: id, name, url, status: 'done', id }];
};

export const createDefaultFileMp4 = (data) => {
  const id = get(data, 'id');
  const name = get(data, 'data.0.name');
  const url = get(data, 'data.0.url');

  if (!id) {
    return null;
  }

  // uid must be string number
  return [{ uid: id, name, url, status: 'done', id }];
};

export const getDurationAudio = (file) => {
  return new Promise((resolve) => {
    const objectURL = URL.createObjectURL(file);
    const myAudio = new Audio([objectURL]);
    myAudio.addEventListener('canplaythrough', () => {
      URL.revokeObjectURL(objectURL);
      resolve({
        file,
        duration: myAudio.duration,
      });
    }, false);
  });
};

export const upperCaseFirstLetter = (text) => {
  return `${text.charAt(0)
    .toUpperCase()}${text.slice(1)}`;
};

export const getQueryParam = (name, defaultData = '') => {
  const q = window.location.search.match(new RegExp('[?&]' + name + '=([^&#]*)'));
  return q ? q[1] : defaultData;
};

export const isImage = url => (/(http(s?):)([/|.|\w|\s|-])*\.(?:jpg|gif|png)/.test(url));

export const widthModal = (width) => {
  if (width < 768) {
    return width;
  }
  if (width > 767 && width < 992) {
    return width / 2 + 100;
  }
  if (width > 991 && width < 1025) {
    return width / 2;
  }
  if (width > 1024 && width < 1220) {
    return width / 2;
  }
  return width / 3;
};

export const getAvatarBg = () => {
  const number = random(1, 8);
  return {
    blue: `${process.env.PUBLIC_URL}/images/avatar-bg/${number}-blue.png`,
    gray: `${process.env.PUBLIC_URL}/images/avatar-bg/${number}-gray.png`,
  };
};

export const getHeightOffsetTopAnimations = () => {
  const height = document.getElementsByClassName('active-animation');
  const listHeightAnimation = map(height, ele => {
    const heightTemp = get(ele, 'offsetTop', 0);
    return heightTemp;
  });
  return listHeightAnimation;
};

export const formatCurrency = (currency, fixed = 2) => {
  if (!currency) {
    return '';
  }
  if (typeof currency === 'number') {
    return currency.toFixed(fixed).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1,');
  }
  return currency
  // eslint-disable-next-line
    .replace(/[(a-zA-Z)\s\_\,\-]+/g, '')
    .replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1,');
};

export const formatNumber = (value, prefix = '', fixed_amount = 2, thousands_separator = ',') => {
  const newValue = normalizeValue(value);

  if (isNaN(value)) {
    return 'NaN';
  }

  return prefix + separateThousands(newValue.toFixed(fixed_amount), thousands_separator)
};

function normalizeValue(value) {
  if (typeof value === 'string') {
    return parseFloat(value)
  }

  return value;
}

export function separateThousands(x, s) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, s);
}

export function formatBlockchainAddress(address, precision = 4, precisionEnd) {
  if (!address) {
    return ''
  }

  return `${address.slice(0, precision + 2)}...${address.slice(precisionEnd ? -precisionEnd : -precision)}`
}

export const haveContract = chainId => ['0x1', '0x3', '0x38', '0x61'].includes(chainId);

export const getExplorerUrl = chainId => {
  const urls = {
    '0x1': process.env.REACT_APP_BLOCK_EXPLORER_URL_ETH_MAINNET,
    '0x3': process.env.REACT_APP_BLOCK_EXPLORER_URL_ETH_ROPSTEN,
    '0x38': process.env.REACT_APP_BLOCK_EXPLORER_URL_BSC_MAINNET,
    '0x61': process.env.REACT_APP_BLOCK_EXPLORER_URL_BSC_TESTNET,
  };
  if (haveContract(chainId)) {
    return urls[chainId];
  }
  return urls['0x3'];
};

export const getProvider = chainId => {
  const address = {
    '0x1': 'https://mainnet.infura.io',
    '0x3': 'wss://restless-snowy-snowflake.ropsten.quiknode.pro/eaa781c59ad6621bb58f94a1c5fac1194ef72b7a/',
    '0x38': 'https://bsc-dataseed1.ninicoin.io',
    '0x61': 'https://data-seed-prebsc-1-s1.binance.org:8545/'
  };
  return address[chainId] || address['0x1'];
};
