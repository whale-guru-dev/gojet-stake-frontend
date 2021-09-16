import React, { useEffect, useRef } from 'react'
import CountUp from 'react-countup'
import { Text } from '@pancakeswap-libs/uikit';

const Balance = ({ value, fontSize, color, decimals, isDisabled, unit, bold }) => {
  const previousValue = useRef(0);

  useEffect(() => {
    previousValue.current = value
  }, [value]);

  return (
    <Text bold={bold} color={isDisabled ? 'textDisabled' : color} fontSize={fontSize}>
      <CountUp start={previousValue.current} end={value} decimals={decimals} duration={1} separator="," />
      {value && unit && <span>{unit}</span>}
    </Text>
  )
};

export default Balance
