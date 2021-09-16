import React from 'react';

export default function Social() {
  return (
    <div className="social-icons">
      <ul>
        <li>
          <a href="https://t.me/">
            <img
              loading="lazy"
              src="./assets/image/1024px-Telegram_logo.svg_.png"
              alt=""
              title="Telegram"
              height="auto"
              width="auto"
              className="social-icon"
            />
          </a>
        </li>
        <li>
          <a href="https://twitter.com/">
            <img
              loading="lazy"
              src="./assets/image/twitter-logo.png"
              alt=""
              title="Twitter"
              height="auto"
              width="auto"
              className="social-icon"
            />
          </a>
        </li>
        <li>
          <a href="https://medium.com/">
            <img
              loading="lazy"
              src="./assets/image/1200px-Medium_logo_Monogram.svg_.png"
              alt=""
              title="Medium"
              height="auto"
              width="auto"
              className="social-icon"
            />
          </a>
        </li>
        <li>
          <a href="https://github.com/">
            <img
              loading="lazy"
              src="./assets/image/github.png"
              alt=""
              title="Github"
              height="auto"
              width="auto"
              className="social-icon"
            />
          </a>
        </li>
      </ul>
    </div>
  );
}
