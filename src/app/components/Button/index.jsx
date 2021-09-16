import React from 'react';
import style from './Button.module.scss';
import cn from 'classnames';
import spinner from './spinner.png';

export default function Button(props) {
    const {
        // PROPS
        wrapperClass,
        iconClass,
        text,
        children,
        loading=false,
        icon,
        iconAlignStart = false,
        preventDefault = false,
        stopPropagation = false,
        disabled,

        // EVENTS
        onClick,

        // STYLES
        // --sizes--
        primary,
        compact,
        small,
        // --colors--
        light,
        dark,
        gray,
        gradient,
        // --misc--
        outline,
        round
    } = props;

    const buttonIcon = icon && getIconLayout(icon, iconAlignStart, iconClass);

    return (
        <button
            onClick={e => handleClick(e, onClick, preventDefault, stopPropagation)}
            className={cn(style.button, wrapperClass, {
                [style.buttonCompact]: compact,
                [style.buttonPrimary]: primary,
                [style.buttonSmall]: small,
                [style.buttonDark]: dark,
                [style.buttonLight]: light,
                [style.buttonGray]: gray,
                [style.buttonGradient]: gradient,
                [style.buttonOutline]: outline,
                [style.buttonRound]: round,
                [style.buttonDisabled]: disabled,
            })}
            disabled={disabled}
            text={text}
        >
            {iconAlignStart && buttonIcon}
            {text}
            {children}
            {!iconAlignStart && buttonIcon}
            {loading && (
              <img src={spinner} alt="" className={style.loading} /> )}
        </button>
    )
}

function handleClick(e, callback, preventDefault, stopPropagation) {
    if (preventDefault) {
        e.preventDefault();
    }

    if (stopPropagation) {
        e.stopPropagation();
    }

    if (callback) {
        callback(e);
    }
}

function getIconLayout(icon, alignStart, iconClass) {
    const iconClassName = cn(style.icon, iconClass, {
        [style.iconAlignStart]: alignStart,
    });

    if (typeof icon === 'string') {
        return (
            <img
                className={iconClassName}
                src={icon}
                alt={'icon'}
            />
        )
    }

    return (
        <span className={iconClassName}>
            {icon}
        </span>
    )
}
