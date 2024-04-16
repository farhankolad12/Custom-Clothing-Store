const CURRENCY_FORMATTER = new Intl.NumberFormat(undefined, {
  style: "currency",
  currency: "inr",
});

export function formatCurrency(num: number) {
  return CURRENCY_FORMATTER.format(num);
}
