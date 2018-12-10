export const toMinFixed = (num, decimals) =>
  (+num).toFixed(Math.max(decimals, (num.toString().split('.')[1] || []).length));
