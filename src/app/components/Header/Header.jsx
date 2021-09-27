import React, { useEffect, useState } from "react";
import Logo from "./Logo";
import Social from "./Social";
import NavMenu from "./NavMenu";
import styles from '../../routes/Staking/Layout/Layout.module.scss';

export default function Header() {
  const [pageYOffset, setPageYOffset] = React.useState(0);
  const [toggleMobileNav, setToggleMobileNav] = React.useState(false);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleScroll = () => {
    setPageYOffset(window.pageYOffset);
  };

  const [isOpen, setIsOpen] = useState(false);

  return (
    <header
      id="main-header"
      data-height-onload={66}
      className={pageYOffset > 7 ? "et-fixed-header" : ""}
      style={{
        top: 0,
      }}
    >
      <div className="container clearfix et_menu_container">
        <Logo />
        <div id="et-top-navigation" data-height={66} data-fixed-height={63}>
          <nav id="top-menu-nav">
            <ul id="top-menu" className="nav">
              <NavMenu
                menuOpen={isOpen}
                onHamburgerClick={() => setIsOpen(!isOpen)}
                wrapperClass={styles.header}
              />
            </ul>
          </nav>
          <div id="et_mobile_nav_menu">
            <div
              className={
                toggleMobileNav ? "mobile_nav opened" : "mobile_nav closed"
              }
            >
              <div className="d-flex align-items-center pb-4">
                <span
                  className="mobile_menu_bar mobile_menu_bar_toggle ml-1"
                  onClick={() => setToggleMobileNav(~toggleMobileNav)}
                />
              </div>
              <ul
                id="mobile_menu"
                className={
                  toggleMobileNav
                    ? "et_mobile_menu et_mobile_menu_display"
                    : "et_mobile_menu"
                }
                // style={{display: toggleMobileNav?"block": "none"}}
              >
                <NavMenu
                  menuOpen={isOpen}
                  onHamburgerClick={() => setIsOpen(!isOpen)}
                  wrapperClass={styles.header}
                />
              </ul>
            </div>
          </div>
        </div>
      </div>
      <Social />
    </header>
  );
}
