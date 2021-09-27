import Web3 from "web3";
import detectEthereumProvider from '@metamask/detect-provider';
import { createAction, createActions } from 'redux-actions';
import { isEmpty } from 'lodash';
import {  getAccountSymbol } from "../store/constants/web3";
import { getExplorerUrl, getProvider } from "../util";
import BigNumber from "bignumber.js";
import WalletConnectProvider from "@walletconnect/web3-provider";
import { CONNECTION_TYPES } from "../components/ConnectToWalletModal/costants";

export const clearUserDataOnDisconnectMetamask = createAction('CLEAR_USER_DATA_ON_DISCONNECT_METAMASK');
/** SET USER ACCOUNTS **/
export const setUserAccounts = createAction('SET_USER_ACCOUNTS');

/** CONNECT TO METAMASK **/
const { connectWalletRequest, connectWalletSuccess, connectWalletFail } = createActions({
  CONNECT_WALLET_REQUEST: () => {
  },
  CONNECT_WALLET_SUCCESS: data => ({ data }),
  CONNECT_WALLET_FAIL: error => ({ error }),
});

export const switchNetwork = (poolChainId, toastInfo) => {
  const connectorId = window.localStorage.getItem('connectorId');
  const chainId = parseInt(poolChainId);
  if (connectorId === CONNECTION_TYPES.metamask) {
    if (window.ethereum) {
      const symbol = getAccountSymbol(chainId);
      try {
        window.ethereum.request({
          method: 'wallet_addEthereumChain',
          params: [
            {
              chainId: `0x${chainId.toString(16)}`,
              chainName: 'Binance Smart Chain Mainnet',
              nativeCurrency: {
                name: symbol,
                symbol: symbol.toLowerCase(),
                decimals: 18,
              },
              rpcUrls: [getProvider(`0x${chainId.toString(16)}`)],
              blockExplorerUrls: [getExplorerUrl(`0x${chainId.toString(16)}`)],
            },
          ],
        });
        return true;
      } catch (e) {
        return false;
      }
    }
  } else if (connectorId === CONNECTION_TYPES.walletconnect) {
    toastInfo && toastInfo('Info', `Please change network to ${chainId === 56 ? 'BSC Mainnet' : 'BSC Testnet'} in WalletConnected App`);
  }
  return false;
};

export const connectMetaMask = () => async dispatch => {
  dispatch(connectWalletRequest());

  // Check metamask is install or not
  if (window.ethereum) {
    if (window.ethereum.isMetaMask) {
      window.ethereum.autoRefreshOnNetworkChange = false;
    }
    const provider = await detectEthereumProvider();
    // If the provider returned by detectEthereumProvider is not the same as
    // window.ethereum, something is overwriting it, perhaps another wallet.
    if (provider !== window.ethereum) {
      window.web3 = new Web3(provider);
    } else {
      window.web3 = new Web3(window.ethereum);
    }

    window.ethereum && window.ethereum.on('accountsChanged', async (accounts) => {
      if (!accounts || !accounts[0]) {
        dispatch(clearUserDataOnDisconnectMetamask());
        dispatch(setUserAccounts({ accounts }));
      } else {
        const balance = await window.web3.eth.getBalance(accounts[0]);
        dispatch(setUserAccounts({ accounts, balance }));
      }
    });

    window.ethereum && window.ethereum.on('chainChanged', async (chainId) => {
      const accounts = await window.web3.eth.getAccounts();
      let balance;

      if (accounts && accounts[0]) {
        balance = await window.web3.eth.getBalance(accounts[0]);


        dispatch(setUserAccounts({
          accounts,
          balance,
          chainId
        }));
      }
    });

    return window.ethereum.request({ method: 'eth_requestAccounts' })
      .then(async () => {
        const chainId = window.ethereum.chainId;
        if (parseInt(chainId) !== parseInt(process.env.REACT_APP_CHAIN_ID)) {
          const hasNetwork = await switchNetwork();
          if (!hasNetwork) {
            return false;
          }
        }
        const accounts = await window.web3.eth.getAccounts();
        const balance = await window.web3.eth.getBalance(accounts[0]);
        dispatch(connectWalletSuccess());
        dispatch(setUserAccounts({
          accounts,
          balance,
          chainId,
        }));

        return true;
      })
      .catch((error) => {
        dispatch(connectWalletFail(error));
        return false;
      });
  }

  return new Promise((resolve, reject) => {
    const err = 'Metamask not install.';

    resolve(err);
    return dispatch(connectWalletFail(err));
  });
};

/** CONNECT TO WALLET CONNECT **/
export const connectToWalletConnect = () => async (dispatch) => {
  dispatch(connectWalletRequest());
  try {

    const POLLING_INTERVAL = 12000;
    const provider = new WalletConnectProvider({
      rpc: {
        56: 'https://bsc-dataseed1.ninicoin.io',
        97: 'https://data-seed-prebsc-1-s1.binance.org:8545/'
      },
      bridge: 'https://bridge.walletconnect.org',
      qrcode: true,
      pollingInterval: POLLING_INTERVAL
    });

    const supportedChainIds = [56, 97];

    if (!provider.wc.connected) {
      await provider.wc.createSession({
        chainId: supportedChainIds[0]
      });
    }

    //  Enable session (triggers QR Code modal)
    await provider.enable();

    //  Create Web3
    const web3 = new Web3(provider);
    window.web3 = web3;

    const accounts = await web3.eth.getAccounts();
    const chainId = await web3.eth.getChainId();
    const bnbBalance = await web3.eth.getBalance(accounts[0]);
    const balance = new BigNumber(bnbBalance).toJSON();
    dispatch(connectWalletSuccess());
    dispatch(setUserAccounts({ accounts, balance, chainId: chainId }));

    provider.on("accountsChanged", async (accounts) => {
      const chainId = await window.web3.eth.getChainId();
      const bnbBalance = await window.web3.eth.getBalance(accounts[0]);
      const balance = new BigNumber(bnbBalance).toJSON();
      dispatch(setUserAccounts({ accounts, balance, chainId: chainId }));
    });

    // Subscribe to chainId change
    provider.on("chainChanged", async (chainId) => {
      const bnbBalance = await window.web3.eth.getBalance(accounts[0]);
      const balance = new BigNumber(bnbBalance).toJSON();
      dispatch(setUserAccounts({ balance, chainId: chainId }));
    });

    provider.on('disconnect', () => {
      dispatch(clearUserDataOnDisconnectMetamask());
      dispatch(setUserAccounts({ accounts: [] }));
      window.web3 = undefined;
    });
    return true;
  } catch (error) {
    dispatch(connectWalletFail());
    return false;
  }
};

const autoConnectMetamask = () => async dispatch => {
  if (window.ethereum) {
    if (window.ethereum.isMetaMask) {
      window.ethereum.autoRefreshOnNetworkChange = false;
    }
    const provider = await detectEthereumProvider();
    // If the provider returned by detectEthereumProvider is not the same as
    // window.ethereum, something is overwriting it, perhaps another wallet.
    if (provider !== window.ethereum) {
      window.web3 = new Web3(provider);
    } else {
      window.web3 = new Web3(window.ethereum);
    }
    window.ethereum.request({ method: 'eth_accounts' }).then(async (accounts) => {
      if (isEmpty(accounts)) {
        dispatch(setUserAccounts({ accounts: [] }));
      } else {
        const chainId = window.ethereum.chainId;
        const balance = await window.web3.eth.getBalance(accounts[0]);
        dispatch(setUserAccounts({ accounts, balance, chainId }));
      }
    });

    window.ethereum && window.ethereum.on('accountsChanged', async (accounts) => {
      if (!accounts || !accounts[0]) {
        dispatch(clearUserDataOnDisconnectMetamask());
        dispatch(setUserAccounts({ accounts }));
      } else {
        const balance = await window.web3.eth.getBalance(accounts[0]);
        dispatch(setUserAccounts({ accounts, balance }));
      }
    });

    window.ethereum && window.ethereum.on('chainChanged', async (chainId) => {
      const accounts = await window.web3.eth.getAccounts();
      let balance;

      if (accounts && accounts[0]) {
        balance = await window.web3.eth.getBalance(accounts[0]);


        dispatch(setUserAccounts({
          accounts,
          balance,
          chainId
        }));
      }
    });
  }
};

/** CONNECT TO WALLET CONNECT **/
const autoConnectWallet = () => async (dispatch) => {
  dispatch(connectWalletRequest());
  try {

    const POLLING_INTERVAL = 12000;
    const provider = new WalletConnectProvider({
      rpc: {
        56: 'https://bsc-dataseed1.ninicoin.io',
        97: 'https://data-seed-prebsc-1-s1.binance.org:8545/'
      },
      qrcode: false,
      pollingInterval: POLLING_INTERVAL
    });

    //  Enable session (triggers QR Code modal)
    await provider.enable();

    //  Create Web3
    const web3 = new Web3(provider);
    window.web3 = web3;

    const accounts = await web3.eth.getAccounts();
    const chainId = await web3.eth.getChainId();
    const bnbBalance = await web3.eth.getBalance(accounts[0]);
    const balance = new BigNumber(bnbBalance).toJSON();
    dispatch(connectWalletSuccess());
    dispatch(setUserAccounts({ accounts, balance, chainId: chainId }));

    provider.on("accountsChanged", async (accounts) => {
      const chainId = await web3.eth.getChainId();
      const bnbBalance = await web3.eth.getBalance(accounts[0]);
      const balance = new BigNumber(bnbBalance).toJSON();
      dispatch(setUserAccounts({ accounts, balance, chainId: chainId }));
    });

    // Subscribe to chainId change
    provider.on("chainChanged", async (chainId) => {
      const bnbBalance = await web3.eth.getBalance(accounts[0]);
      const balance = new BigNumber(bnbBalance).toJSON();
      dispatch(setUserAccounts({ balance, chainId: chainId }));
    });

    provider.on('disconnect', () => {
      dispatch(clearUserDataOnDisconnectMetamask());
      dispatch(setUserAccounts({ accounts: [] }));
    });
    return true;
  } catch (error) {
    dispatch(connectWalletFail());
    return false;
  }
};

export const autoConnect = () => dispatch => {
  const connectorId = window.localStorage.getItem('connectorId');
  if (connectorId === CONNECTION_TYPES.metamask) {
    dispatch(autoConnectMetamask());
  } else if (connectorId === CONNECTION_TYPES.walletconnect) {
    dispatch(autoConnectWallet());
  }
};


export const detectAccountLock = () => async dispatch => {
  const connectorId = window.localStorage.getItem('connectorId');
  if (connectorId === CONNECTION_TYPES.metamask) {
    if (window.ethereum) {

      const provider = await detectEthereumProvider();
      // If the provider returned by detectEthereumProvider is not the same as
      // window.ethereum, something is overwriting it, perhaps another wallet.
      if (provider !== window.ethereum) {
        window.web3 = new Web3(provider);
      } else {
        window.web3 = new Web3(window.ethereum);
      }

      const accounts = await window.web3.eth.getAccounts();
      if (accounts && accounts[0]) {

      } else {
        dispatch(connectWalletFail())
      }
    }
  }
};

/** WITHDRAW STAKE **/
const { buyTokenRequest, buyTokenSuccess, buyTokenFail } = createActions({
  BUY_TOKEN_REQUEST: () => {
  },
  BUY_TOKEN_SUCCESS: data => ({ data }),
  BUY_TOKEN_FAIL: error => ({ error })
});

export const setIsWhiteList = createAction('SET_IS_WHITELIST');
export const setRewardedAmount = createAction('SET_REWARDED_AMOUNT');
export const setRedeemed = createAction('SET_REDEEMED');
export const setAmount = createAction('SET_AMOUNT');
