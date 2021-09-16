import React, { useContext, useEffect, useState } from 'react';
import cn from 'classnames';
import logo from '../../../../../assets/images/logo.png';

import { useDispatch, useSelector } from "react-redux";
import { AppContextType } from "../../../../contexts/context_types";
import Button from "../../../../components/Button";
import Hamburger from "../Sidebar/Hamburger";
import Wallet from "../../../../components/Wallet";
import style from './Header.module.scss';
import { useLocation } from "react-router";
import { autoConnect } from "../../../../actions/user";
import { getAccountSymbol } from "../../../../store/constants/web3";

const HIDE_LOGO_PATH = ['/pools'];

const Header = (props) => {
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
    <header className={cn(style.container, wrapperClass, {
      [style.containerScrolled]: scrolled,
      [style.containerOpen]: menuOpen,
      [style.poolsPage]: HIDE_LOGO_PATH.includes(location.pathname)
    })}>
      <div className={cn(style.content, 'content')}>
        <a
          className={style.logoLink}
          href={process.env.PROJECT_URL}
        >
          <img className={style.logo} src={logo} alt={'logo'} />
        </a>
        {
          isMobile ? (
            <Hamburger
              isOpen={menuOpen}
              onClick={onToggleOpen}
            />
          ) : renderButton(location.pathname)
        }
      </div>
    </header>
  );
};

export default Header;
