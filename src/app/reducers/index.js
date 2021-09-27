import localForage from 'localforage';
import common from './common';
import user from './user';
import pools from './pools';
import prices from './prices';
import block from './block';
import { persistReducer } from 'redux-persist';


const commonConfig = {
  key: 'common',
  storage: localForage,
  whitelist: []
};

const userConfig = {
  key: 'user',
  storage: localForage,
  whitelist: []
};

const poolsConfig = {
  key: 'pools',
  storage: localForage,
  whitelist: []
};

const pricesConfig = {
  key: 'prices',
  storage: localForage,
  whitelist: []
};

const blockConfig = {
  key: 'block',
  storage: localForage,
  whitelist: []
};

const reducers = {
  common: persistReducer(commonConfig, common),
  user: persistReducer(userConfig, user),
  pools: persistReducer(poolsConfig, pools),
  prices: persistReducer(pricesConfig, prices),
  block: persistReducer(blockConfig, block),
};

export default reducers;
