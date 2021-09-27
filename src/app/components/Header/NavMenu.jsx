import React, { useContext, useEffect, useState } from 'react';
import clsx from 'clsx';
import { useDispatch, useSelector } from "react-redux";
import { AppContextType } from "../../contexts/context_types";
import Button from "../../components/Button";
import Hamburger from "../../routes/Staking/Layout/Sidebar/Hamburger";
import Wallet from "../../components/Wallet";
import style from './Header.module.scss';
import { useLocation } from "react-router";
import { autoConnect } from "../../actions/user";
import { getAccountSymbol } from "../../store/constants/web3";

import SubMenu from './SubMenu';

// const HIDE_LOGO_PATH = ['/pools'];

// eslint-disable-next-line react/prop-types
export default function NavMenu(props) {
  const { pathname } = useLocation();

  const onStaking = pathname === '/staking';
  const show = onStaking;

  const [scrolled, setScrolled] = useState(false);
  const { wrapperClass, menuOpen, isMobile, onToggleOpen } = props;
  const { setConnectToWalletModalVisible } = useContext(AppContextType);
  const isConnected = useSelector(state => state.user.connectWallet.isConnect);
  const address = useSelector(state => state.user.userAccount.accounts ? state.user.userAccount.accounts[0] : '');
  const balance = useSelector(state => state.user.userAccount.balance);
  const chainId = useSelector(state => state.user.chainId);
  const symbol = getAccountSymbol(chainId);
  const location = useLocation();
  const dispatch = useDispatch();

  useEffect(() => {
    const dispatchAutoConnect = () => dispatch(autoConnect());
    dispatchAutoConnect();
  }, [dispatch]);

  useEffect(() => {
    handleScroll();
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    }
  });

  const handleScroll = (e) => {

    if (!scrolled && window.scrollY > 1) {
      setScrolled(true);
    } else if (scrolled && window.scrollY < 1) {
      setScrolled(false);
    }
  };

  const renderButton = (pathname) => {
    return (
      isConnected ? (
        <Wallet
          wrapperClass={style.wallet}
          {...{ address, chainId, balance, symbol }}
        />
      ) : (
        <Button
          wrapperClass={style.button}
          text={'Connect Wallet'}
          compact
          gradient
          onClick={() => setConnectToWalletModalVisible(true)}
        />
      )
    );
  };

  return (
    <>
      <li
        className={clsx(
          'menu-item menu-item-type-custom menu-item-object-custom menu-item-home',
          pathname === '/' && 'current-menu-item current_page_item'
        )}
      >
        <a href="/" aria-current="page">
          Home
        </a>
      </li>

      <li
        className={clsx(
          'menu-item menu-item-type-post_type menu-item-object-page',
          pathname === '/jet' && 'current-menu-item page_item current_page_item'
        )}
      >
        <a>JET</a>

        <SubMenu />
      </li>

      <li
        className="menu-item menu-item-type-custom menu-item-object-custom"
        style={{ display: show ? '' : 'none' }}
      >
        {
          isMobile ? (
            <Hamburger
              isOpen={menuOpen}
              onClick={onToggleOpen}
            />
          ) : renderButton(location.pathname)
        }
      </li>
    </>
  );
}
