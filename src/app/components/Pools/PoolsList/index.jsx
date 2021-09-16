import React from 'react';
import style from './PoolList.module.scss';
import cn from 'classnames';
import PoolItem from "../PoolItem";

/**
 * @return {null}
 */

const PoolsList = (props) => {
  const {
    items,
    title,
    account,
    loading,
    wrapperClass
  } = props;

  if ((!items || !items.length) && !loading) {
    return null;
  }

  return (
    <div className={cn(style.container, wrapperClass, {
      [style.containerLoading]: loading
    })}>
      {title && (
        <h3 className={style.title}>
          {title}
        </h3>
      )}
      <ul className={style.items}>
        {(!items || loading ? new Array(3).fill({}) : items).map((item, i) => (
          <li className={style.item} key={i}>
            <PoolItem
              pool={item}
              loading={loading}
              account={account}
            />
          </li>
        ))}
      </ul>
    </div>
  )
};

export default PoolsList;
