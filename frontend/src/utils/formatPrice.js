export const formatPrice = (price) => {
  return `Rs ${price.toLocaleString("en-IN", {
    minimumFractionDigits: 2,
  })}`;
};