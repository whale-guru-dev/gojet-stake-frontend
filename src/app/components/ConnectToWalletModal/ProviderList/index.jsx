import React from 'react';
import style from './ProviderList.module.scss';
import cn from 'classnames';
import Button from "../../../components/Button";
import spinner from "../../../../assets/images/spinner.png";

export default function ProviderList(props) {
    const {wrapperClass, onSelect, onRepeat, selectedItem, requesting, error, items} = props;
    const itemList = selectedItem ? [selectedItem] : items;

    return (
        <div className={style.container}>
            {requesting && (
                <div className={style.requestingBox}>
                    <img src={spinner} alt="" className={style.spinner}/>
                    Initializing
                </div>
            )}
            {error && (
                <div className={style.errorBox}>
                    Error Connecting
                    <Button
                        wrapperClass={style.errorButton}
                        text={'Try Again'}
                        gray
                        small
                        onClick={() => onRepeat && onRepeat(selectedItem)}
                    />
                </div>
            )}
            <ul className={cn(style.container, wrapperClass, {
                [style.selected]: selectedItem
            })}>
                {itemList && itemList.map((item, i) => (
                    <li className={style.item} key={i}>
                        <button className={style.button} onClick={() => !selectedItem && onSelect && onSelect(item)}>
                            <span className={style.textGroup}>
                                <span className={style.name}>
                                    {item.name}
                                </span>
                                {selectedItem && item.description && (
                                    <span className={style.description}>
                                        {item.description}
                                    </span>
                                )}
                            </span>
                            <img src={item.picture} alt="" className={style.picture}/>
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    )
}
