import React from 'react'
import style from './Banner.module.scss';

export default function StakingBanner(props) {
  const { title, text, image } = props;

  return (
    <div className={style.container}>
      {image && (
        <img src={image} className={style.image} alt=""/>
      )}
      <div className={style.content}>
        {title && (
          <h2 className={style.title}>
            {title}
          </h2>
        )}
        {text && (
          <p className={style.text}>
            {text}
          </p>
        )}
      </div>
    </div>
  )
}