import React from 'react';
import {InputNumber} from "antd";
import cn from 'classnames';

import style from './TextInput.module.scss';

export default function NumberInput(props) {
    const {inputClass, id, value, placeholder, onChange, onFocus, min, max, step, disabled} = props;
    return (
      <InputNumber
        className={cn(style.container, inputClass)}
        {...{id, value, placeholder, onFocus, min, max, disabled, step}}
        onChange={value => onChange(value)}
        bordered={false}
      />
    )
}
