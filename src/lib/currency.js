// AED to LKR conversion rate (approximate, fixed for display consistency)
export const AED_TO_LKR = 88;

export const formatLKR = (lkr) => {
  return new Intl.NumberFormat("en-LK", {
    style: "decimal",
    maximumFractionDigits: 0,
  }).format(Math.round(lkr));
};

export const formatAED = (aed) => {
  return new Intl.NumberFormat("en-AE", {
    style: "decimal",
    maximumFractionDigits: 0,
  }).format(Math.round(aed));
};

export const aedToLkr = (aed) => aed * AED_TO_LKR;