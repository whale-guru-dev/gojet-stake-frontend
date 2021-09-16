import { has, isEmpty, get } from 'lodash';
import { handleActions } from "redux-actions";

const initialState = {
  connectWallet: {
    error: null,
    isConnect: false,
    requesting: false,
  },
  amountTokenAllowTransfer: {
    error: null,
    isConnect: false,
    requesting: false,
  },
  approveToken: {
    error: null,
    isConnect: false,
    requesting: false,
  },
  buyToken: {
    error: null,
    isConnect: false,
    requesting: false,
  },
  buyTokenProcess: {
    step: 1,
    amount: 0,
    approved: false,
    completed: false
  },
  userAccount: {
    balance: 0,
    accounts: [],
    error: null,
    requesting: false,
  },
  chainId: '0x38',
  transactionLogs: {
    result: [],
  },
  redeemTokens: {
    error: null,
    result: null,
    requesting: false,
  },
  reqBuyToken: {
    error: null,
    isConnect: false,
    requesting: false,
  },
  checkWhitelistContract: {
    requesting: false,
    result: null,
    error: null,
  },
  isWhitelist: false,
  rewardedAmount: 0,
  redeemed: false,
  amount: 0
};

export const user = handleActions({

  /** SET USER ACCOUNTS **/
  SET_USER_ACCOUNTS: (state, { payload }) => ({
    ...state,
    userAccount: {
      ...state.userAccount,
      accounts: has(payload, 'accounts') ? payload.accounts : state.userAccount.accounts,
      balance: has(payload, 'balance') ? payload.balance : state.userAccount.balance
    },
    connectWallet: {
      ...state.connectWallet,
      ...{ isConnect: has(payload, 'accounts') ? !isEmpty(payload.accounts) : !isEmpty(state.userAccount.accounts) },
    },
    chainId: has(payload, 'chainId') ? parseInt(payload.chainId) : parseInt(state.chainId)
  }),

  /** CONNECT WALLET **/
  CONNECT_WALLET_REQUEST: (state) => ({
    ...state,
    connectWallet: {
      ...state.connectWallet,
      requesting: true,
    },
  }),
  CONNECT_WALLET_SUCCESS: (state) => ({
    ...state,
    connectWallet: {
      ...state.connectWallet,
      requesting: false,
      isConnect: true,
      error: null,
    },
  }),
  CONNECT_WALLET_FAIL: (state, { payload }) => ({
    ...state,
    connectWallet: {
      ...state.connectWallet,
      requesting: false,
      error: payload.error,
    },
  }),
  /* APPROVE TOKEN */
  APPROVE_TOKEN_REQUEST: (state) => ({
    ...state,
    approveToken: {
      ...state.approveToken,
      requesting: true,
      error: null
    }
  }),
  APPROVE_TOKEN_SUCCESS: (state, { payload }) => ({
    ...state,
    approveToken: {
      ...state.approveToken,
      requesting: false,
      result: payload.data,
      error: null
    },
    buyTokenProcess: {
      ...state.buyTokenProcess,
      approved: true
    }
  }),
  APPROVE_TOKEN_FAIL: (state, { payload }) => ({
    ...state,
    approveToken: {
      ...state.approveToken,
      requesting: false,
      error: payload
    }
  }),
  /* GET AMOUNT OF TOKEN ALLOW TRANSFER */
  GET_AMOUNT_TOKEN_ALLOW_TRANSFER_REQUEST: (state) => ({
    ...state,
    amountTokenAllowTransfer: {
      ...state.amountTokenAllowTransfer,
      requesting: true,
      error: null
    }
  }),
  GET_AMOUNT_TOKEN_ALLOW_TRANSFER_SUCCESS: (state, { payload }) => ({
    ...state,
    amountTokenAllowTransfer: {
      ...state.amountTokenAllowTransfer,
      requesting: false,
      result: get(payload, 'data', 0),
      error: null
    },
    buyTokenProcess: {
      ...state.buyTokenProcess,
      amount: get(payload, 'data', 0),
      // approved: Number(get(payload, 'data', 0)) > 0
    }
  }),
  GET_AMOUNT_TOKEN_ALLOW_TRANSFER_FAIL: (state, { payload }) => ({
    ...state,
    amountTokenAllowTransfer: {
      ...state.amountTokenAllowTransfer,
      requesting: false,
      error: payload
    },
    buyTokenProcess: {
      ...state.buyTokenProcess,
      amount: 0,
      approved: false
    }
  }),
  /* STORE TRANSACTION LOG */
  STORE_TRANSACTION_LOG: (state, { payload }) => ({
    ...state,
    transactionLogs: {
      result: [
        payload,
        ...state.transactionLogs.result,
      ]
    }
  }),
  /* BUY TOKEN */
  BUY_TOKEN_REQUEST: (state) => ({
    ...state,
    reqBuyToken: {
      ...state.reqBuyToken,
      requesting: true,
      error: null,
    },
  }),
  BUY_TOKEN_SUCCESS: (state, { payload }) => ({
    ...state,
    reqBuyToken: {
      ...state.reqBuyToken,
      requesting: false,
      result: payload.data,
      error: null,
    },
  }),
  BUY_TOKEN_FAIL: (state, { payload }) => ({
    ...state,
    reqBuyToken: {
      ...state.reqBuyToken,
      requesting: false,
      error: payload,
    },
  }),
  FETCH_WHITELIST_FROM_CONTRACT_REQUEST: (state) => ({
    ...state,
    checkWhitelistContract: {
      ...state.checkWhitelistContract,
      requesting: true,
      error: null,
    },
  }),
  FETCH_WHITELIST_FROM_CONTRACT_SUCCESS: (state, { payload }) => ({
    ...state,
    checkWhitelistContract: {
      ...state.checkWhitelistContract,
      requesting: false,
      error: null,
      result: payload.data,
    }
  }),
  FETCH_WHITELIST_FROM_CONTRACT_FAIL: (state, { payload }) => ({
    ...state,
    checkWhitelistContract: {
      ...state.checkWhitelistContract,
      requesting: false,
      error: payload.error,
    }
  }),
  SET_IS_WHITELIST: (state, { payload }) => ({
    ...state,
    isWhitelist: payload,
  }),
  SET_REWARDED_AMOUNT: (state, { payload }) => ({
    ...state,
    rewardedAmount: payload,
  }),
  SET_REDEEMED: (state, { payload }) => ({
    ...state,
    redeemed: payload,
  }),
  SET_AMOUNT: (state, { payload }) => ({
    ...state,
    amount: payload,
  }),
  REDEEM_TOKENS_REQUEST: state => ({
    ...state,
    redeemTokens: {
      ...state.redeemTokens,
      requesting: true
    }
  }),
  REDEEM_TOKENS_SUCCESS:(state, { payload }) => ({
    ...state,
    redeemTokens: {
      ...state.redeemTokens,
      requesting: false,
      result: payload.data
    }
  }),
  REDEEM_TOKENS_FAIL:(state, { payload }) => ({
    ...state,
    redeemTokens: {
      ...state.redeemTokens,
      requesting: false,
      result: null,
      error: payload.data
    }
  }),
}, initialState);

export default user;
