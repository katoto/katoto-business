export function centToYuan(val: number, digits = 2) {
  if (typeof val !== 'number') {
    return val;
  }
  const yuan = val / 100;
  if (digits > 0) {
    return yuan.toFixed(digits);
  }
  return yuan;
}
