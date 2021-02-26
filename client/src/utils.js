export const formatPrice = (amount, decimals) => {
  if (amount !== undefined) {
    const price = decimals !== null ? amount + "." + decimals : amount;
    return new Intl.NumberFormat("de-DE").format(price);
  }
};

export const formatCurrency = (currency) => {
  return currency !== undefined ? (currency === "ARS" ? "$" : currency) : "";
};
