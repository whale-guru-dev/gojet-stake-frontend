import Web3 from "web3";
import detectEthereumProvider from '@metamask/detect-provider';
import { createAction, createActions } from 'redux-actions';
import { get, isEmpty } from 'lodash';
import moment from 'moment';
import Api from '../store/api';
// import projectAbi from '../abis/projectContractAbi.json';
// import projectContractAbi from '../abis/projectContractAbi.json';
import { formatUnits, getAccountSymbol } from "../store/constants/web3";
import fromExponential from "from-exponential";
import { ethers } from 'ethers';
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

// export const buyToken = (contractAddress, accountAddress, amount, toastSuccess, toastError) => async (dispatch, getState) => {
//   dispatch(buyTokenRequest());
//   if (window.web3.currentProvider) {
//     const convertAmountForTx = fromExponential(amount);
//     const { user } = getState();
//     const { chainId } = user;
//     window.web3 = new Web3(window.web3.currentProvider);
//     const log = {
//       convertAmountForTx,
//       chainId,
//       contractAddress,
//       accountAddress,
//       date: moment().valueOf(),
//     };
//     const callback = (err, pendingTransactionHash) => {
//       if (err) {
//         console.log(err);
//       }
//       if (pendingTransactionHash) {
//         log.transactionHash = pendingTransactionHash;
//       }
//     };
//     const acceptedAmount = window.web3.utils.toHex(String(ethers.utils.parseUnits(convertAmountForTx, 18)));
//     return Api.User.buyToken({ accountAddress, contractAddress, amount: acceptedAmount, callback }).then((response) => {
//       dispatch(buyTokenSuccess(response));
//       log.isError = false;
//       dispatch(fetchWhitelistFromContract(accountAddress, contractAddress));
//       toastSuccess(`Swap Successed!`, `You swapped ${convertAmountForTx} successfully`);
//       return response;
//     }).catch(error => {
//       const errorCode = get(error, 'code');
//       if (errorCode !== 4001) {
//         log.isError = true;
//       }
//       toastError('Error', 'Please try again and confirm the transaction.');
//       return dispatch(buyTokenFail(error));
//     });
//   } else {
//     toastError('Error', 'Wallet is not connected.');
//     dispatch(buyTokenFail("Unconnected"));
//   }
// };

export const setIsWhiteList = createAction('SET_IS_WHITELIST');
export const setRewardedAmount = createAction('SET_REWARDED_AMOUNT');
export const setRedeemed = createAction('SET_REDEEMED');
export const setAmount = createAction('SET_AMOUNT');

// const { fetchWhitelistFromContractRequest, fetchWhitelistFromContractSuccess, fetchWhitelistFromContractFail } = createActions({
//   FETCH_WHITELIST_FROM_CONTRACT_REQUEST: () => {
//   },
//   FETCH_WHITELIST_FROM_CONTRACT_SUCCESS: data => ({ data }),
//   FETCH_WHITELIST_FROM_CONTRACT_FAIL: error => ({ error }),
// });

// export const fetchWhitelistFromContract = (address, smartContractAddress) => async dispatch => {
//   if (smartContractAddress === '') {
//     return;
//   }
//   dispatch(fetchWhitelistFromContractRequest());
//   if (window.web3) {
//     try {
//       if (address) {
//         const projectContract = new window.web3.eth.Contract(projectAbi, smartContractAddress);
//         return projectContract.methods['getWhitelist'](address).call()
//           .then(whitelistRes => {
//             const whitelist = get(whitelistRes, '_whitelist', false);
//             const rewardedAmount = get(whitelistRes, '_rewardedAmount', '0');
//             const redeemed = get(whitelistRes, '_redeemed', false);
//             const amount = get(whitelistRes, '_amount', '0');
//             dispatch(setIsWhiteList(whitelist));
//             dispatch(setRewardedAmount(rewardedAmount));
//             dispatch(setRedeemed(redeemed));
//             dispatch(setAmount(amount));
//             dispatch(fetchWhitelistFromContractSuccess(whitelistRes));
//           }).catch(e => {
//             dispatch(fetchWhitelistFromContractFail(e.toString()));
//           });
//       }
//     } catch (error) {
//       dispatch(fetchWhitelistFromContractFail(error.toString()));
//     }
//   }
// };


// const { redeemTokensRequest, redeemTokensSuccess, redeemTokensFail } = createActions({
//   REDEEM_TOKENS_REQUEST: () => {
//   },
//   REDEEM_TOKENS_SUCCESS: data => ({ data }),
//   REDEEM_TOKENS_FAIL: error => ({ error })
// });

// export const redeemTokens = () => (dispatch, getState) => {
//   dispatch(redeemTokensRequest());

//   const { projects, user } = getState();
//   const { rewardedAmount, chainId } = user;
//   const walletAddress = get(user, 'userAccount.accounts.0', '').toLowerCase();
//   if (projects && projects.project.result && walletAddress) {
//     const {
//       contractIsFinished,
//       smartContractAddress,
//       acceptedTokenDecimals,
//       acceptedTokenSymbol,
//       tokenName,
//       tokenSymbol,
//       tokenDecimals
//     } = projects.project.result;
//     if (contractIsFinished) {
//       try {
//         window.web3 = new Web3(window.web3.currentProvider);
//         let log = {
//           chainId,
//           walletAddress,
//           smartContractAddress,
//           acceptedTokenDecimals,
//           acceptedTokenSymbol,
//           tokenName,
//           tokenSymbol,
//           tokenDecimals,
//           eventName: 'redeemTokens',
//           display: `Claimed ${formatUnits(rewardedAmount, tokenDecimals)} ${tokenSymbol}`
//         };
//         if (smartContractAddress) {
//           const launchXContract = new window.web3.eth.Contract(projectContractAbi, smartContractAddress);
//           launchXContract.methods.redeemTokens().send({ from: walletAddress })
//             .then(response => {
//               log = {
//                 ...log,
//                 ...response
//               };
//               console.log('log: ', log);
//               dispatch(redeemTokensSuccess(log));
//               dispatch(fetchWhitelistFromContract(walletAddress, smartContractAddress));
//             })
//             .catch(error => {
//               return dispatch(redeemTokensFail(error));
//             });
//         }
//       } catch (error) {
//         return dispatch(redeemTokensFail(error));
//       }
//     }
//   }
// };
