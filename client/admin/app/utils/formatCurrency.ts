const CURRENCY_FORMATTER = new Intl.NumberFormat(undefined, {
  style: "currency",
  currency: "INR",
});

export default function formatCurrency(price: number) {
  return CURRENCY_FORMATTER.format(price);
}
