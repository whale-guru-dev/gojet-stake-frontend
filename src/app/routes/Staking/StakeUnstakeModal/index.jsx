import React, {useState} from 'react';
import Modal from "../../../components/Modal";
import Button from "../../../components/Button";
import { formatNumber } from "../../../util";
import RangeInput from "../../../components/Form/components/Input/RangeInput";
import NumberInput from "../../../components/Form/components/Input/NumberInput";

import style from './StakeModal.module.scss';

export default function StakeUnstakeModal(props) {
    const {heading, item={}, balance=0, onConfirm, requestingConfirmation} = props;
    const [value, setValue] = useState(0);

    return (
        <Modal {...props} childrenClass={style.wrapper} wrapperClass={style.container}>
            <h3 className={style.heading}>{heading}</h3>
            <div className={style.label}>
                Stake:
                <span className={style.avatarGroup}>
                    <div className={style.avatar} style={{backgroundImage: `url(${item.avatar})`}}/>
                    {item.symbol}
                </span>
            </div>
            <div className={style.box}>
                <NumberInput
                    inputClass={style.input}
                    value={value}
                    onChange={value => setValue(value)}
                    min={0}
                    max={balance}
                    step={0.1}
                />
                <div className={style.index}>-{formatNumber(value * item.cost)} USD</div>
            </div>
            <div className={style.balance}>
                Balance: {balance}
            </div>
            <RangeInput
                inputClass={style.range}
                max={balance}
                min={0}
                value={value}
                onChange={value => setValue(value)}
                step={0.000001}
                format={false}
                displayHead={false}
            />
            <div className={style.options}>
                <Button
                    wrapperClass={style.option}
                    text={'25%'}
                    onClick={() => setValue(balance * 0.25)}
                />
                <Button
                    wrapperClass={style.option}
                    text={'50%'}
                    onClick={() => setValue(balance * 0.5)}
                />
                <Button
                    wrapperClass={style.option}
                    text={'75%'}
                    onClick={() => setValue(balance * 0.75)}
                />
                <Button
                    wrapperClass={style.option}
                    text={'MAX'}
                    onClick={() => setValue(balance)}
                />
            </div>
            <Button
                wrapperClass={style.button}
                text={'Confirm'}
                onClick={() => onConfirm(item)}
                primary
                loading={requestingConfirmation}
                disabled={!value || value === 0}
            />
        </Modal>
    )
}
