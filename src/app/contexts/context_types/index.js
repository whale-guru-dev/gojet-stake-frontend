import React from "react";

export const AppContextType = React.createContext({
  isMobile: false,
  isTablet: false,
  isDesktop: false,
  isReady: false,

  navigationLoading: false,
  setNavigationLoading: () => {
  },

  connectToWalletModalVisible: false,
  setConnectToWalletModalVisible: () => {
  },

  wrongNetworkVisible: false,
  setWrongNetworkVisible: () => {}
});
