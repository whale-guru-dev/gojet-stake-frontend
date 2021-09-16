import { useEffect } from 'react';
import { connectorLocalStorageKey } from '../contexts/WalletContext';
import useAuth from './useAuth';

const useEagerConnect = () => {
  const { login } = useAuth();

  useEffect(() => {
    const connectorId = window.localStorage.getItem(connectorLocalStorageKey);

    if (connectorId) {
      login(connectorId);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
};

export default useEagerConnect;
