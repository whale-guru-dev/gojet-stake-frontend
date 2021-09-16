import React from 'react';

export default function Logo() {
  return (
    <div className="logo_container">
      <span className="logo_helper" />
      <a href="/">
        <img
          src="./assets/image/logo.png"
          alt="Growth Defi"
          id="logo"
          data-height-percentage={100}
        />
      </a>
    </div>
  );
}
