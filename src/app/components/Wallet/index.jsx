import React, {useEffect, useRef, useState} from 'react';
import Web3 from "web3";
import jazzicon from "jazzicon";
import cn from 'classnames';
import WalletModal from "./WalletModal";
import {FAKE_TRANSACTION_LIST} from "./WalletModal/constants";
import {PROVIDER_TYPES} from "../ConnectToWalletModal/costants";
import {formatBlockchainAddress} from "../../util";

import style from './Wallet.module.scss';
import { useDispatch } from "react-redux";
import { clearUserDataOnDisconnectMetamask, setUserAccounts } from "../../actions/user";

export default function Wallet(props) {
    const {balance, address, chainId, symbol, wrapperClass} = props;
    const convertedBalance = Web3.utils.fromWei(String(balance));
    const [walletModalVisible, setWalletModalVisible] = useState(false);
    const isMobile = window.innerWidth < 768;
    const dispatch = useDispatch();

    const iconContainerRef = useRef(null);
    useEffect(() => {
        if (iconContainerRef && iconContainerRef.current) {
            const size = isMobile ? 9 : 14;
            const icon = jazzicon(size, address);

            iconContainerRef.current.innerHTML = '';
            iconContainerRef.current.appendChild(icon);
        }
    }, [iconContainerRef, address, chainId, isMobile]);

    const onLogout = () => {
      dispatch(clearUserDataOnDisconnectMetamask());
      dispatch(setUserAccounts({accounts: []}));
      window.localStorage.removeItem('connectorId');
      window.localStorage.removeItem('walletconnect');
      setWalletModalVisible(false);
    };

    return (
        <>
            <div onClick={() => setWalletModalVisible(true)} className={cn(style.wallet, wrapperClass)}>
            <span className={style.walletBalance}>
                {balance > 1 ? convertedBalance.substr(0, 6) : convertedBalance.substr(0, 8)} {symbol}
            </span>
                <span className={style.walletAddress}>
                {formatBlockchainAddress(address, isMobile ? 2: 4, 4)}
                <div ref={iconContainerRef} className={style.walletIcon} />
            </span>
            </div>
            <WalletModal
                address={address}
                visible={walletModalVisible}
                onCancel={() => setWalletModalVisible(false)}
                chainId={chainId}

                // TODO: implement API
                transactionList={FAKE_TRANSACTION_LIST}
                providerType={PROVIDER_TYPES.METAMASK}
                onClearTransactions={() => {}}
                onChange={() => {}}
                onLogout={onLogout}
                requestingClearTransactions={false}
                // ------------------
            />
        </>
    )
}
