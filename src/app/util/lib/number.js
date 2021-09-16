export function toFixedTrunc(value, decimals = 6) {
  if (typeof value === 'number') {
    const trunc = Math.pow(10, decimals);
    return (Math.trunc(value * trunc) / trunc).toFixed(decimals);
  }

  // string
  const [integerValue, decimalValue] = value.split('.');
  if (!decimalValue) {
    return integerValue;
  }

  return [integerValue, decimalValue.substring(0, 6)].join('.');
}

export function numberWithCommas(value) {
  let x = '';
  if (typeof value === 'number') {
    x = value.toString();
  } else {
    x = value;
  }

  return x.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}
