import React, {useEffect, useRef} from 'react';
import Modal from '../../Modal';
import jazzicon from 'jazzicon';
import Button from '../../Button';
import {formatBlockchainAddress, getExplorerUrl} from '../../../util';
import CopyToClipboard from '../../CopyToClipboard';
import view from './view.svg';
import copy from './copy.svg';

import style from './WalletModal.module.scss';

export default function WalletModal(props) {
    const {
        providerType,
        chainId,
        address,
        transactionList,
        onClearTransactions,
        onChange,
        requestingClearTransactions,
        visible,
        onLogout,
        ...restProps
    } = props;

    const explorerUrl = getExplorerUrl(`0x${parseInt(chainId).toString(16)}`);

    const iconContainerRef = useRef(null);
    useEffect(() => {
        if (iconContainerRef && iconContainerRef.current && visible) {
            const icon = jazzicon(21, address);

            iconContainerRef.current.innerHTML = '';
            iconContainerRef.current.appendChild(icon);
        }
    }, [iconContainerRef, address, chainId, visible]);

    const getExplorerName = chainId => {
        const address = {
            '0x1': 'View on Etherscan',
            '0x3': 'View on Etherscan Ropsten',
            '0x38': 'View on Bscscan',
            '0x61': 'View on Bscscan Testnet',
        };

        return address[chainId];
    };
    return (
        <Modal {...restProps} visible={visible} childrenClass={style.wrapper}>
            <h3 className={style.heading}>
                Account
            </h3>
            <div className={style.data}>
                <div className={style.label}>
                    Connected with {providerType}
                </div>
                <div className={style.address}>
                    <div ref={iconContainerRef} className={style.icon}/>
                    {formatBlockchainAddress(address, 12, 4)}
                </div>
                <div className={style.dataActions}>
                    <CopyToClipboard
                        buttonClass={style.dataAction}
                        buttonText={'Copy Address'}
                        text={address}
                        icon={copy}
                    />
                    <Button
                        wrapperClass={style.dataAction}
                        text={getExplorerName(`0x${parseInt(chainId).toString(16)}`)}
                        icon={view}
                        gray
                        iconAlignStart
                        iconClass={style.dataActionIcon}
                        // TODO: Insert correct Etherscan link
                        onClick={() => window.open(explorerUrl + '/address/' + address, '_blank')}
                    />
                </div>
            </div>
            <div className={style.logout}>
                <Button
                  text={'Logout'}
                  onClick={() => onLogout()}
                  small
                  gradient
                />
            </div>
            {/* {transactionList && transactionList.length > 0 && (
                <div className={style.transaction}>
                    <h4 className={style.transactionHead}>
                        Recent Transaction
                        <Button
                            wrapperClass={style.clearButton}
                            text={'Clear All'}
                            onClick={onClearTransactions}
                            gray
                            loading={requestingClearTransactions}
                        />
                    </h4>
                    <ul className={style.transactionList}>
                        {transactionList.map((item,i) => (
                            <li className={style.transactionItem} key={i}>
                                {item.name} <img src={checkIcon} alt="" className={style.checkIcon}/>
                            </li>
                        ))}
                    </ul>
                </div>
            )} */}
        </Modal>
    )
}
