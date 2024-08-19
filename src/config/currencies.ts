const USD = "$";
const CAD = "C$";
const GBP = "£";
const EURO = "€";
const MxD = "Mx$";
const REAL = "R$";
const JPY = "¥";

export const currencies: {
    [country: string]: { currency: string; symbol: string; domain: string };
} = {
    US: { currency: "dollar", symbol: USD, domain: ".com" },
    UK: { currency: "pound", symbol: GBP, domain: ".co.uk" },
    DE: { currency: "euro", symbol: EURO, domain: ".de" },
    IT: { currency: "euro", symbol: EURO, domain: ".it" },
    ES: { currency: "euro", symbol: EURO, domain: ".es" },
    FR: { currency: "euro", symbol: EURO, domain: ".fr" },
    CA: { currency: "canadianDollar", symbol: CAD, domain: ".ca" },
    MX: { currency: "mexicanDollar", symbol: MxD, domain: ".mx" },
    BR: { currency: "real", symbol: REAL, domain: ".com.br" },
    JP: { currency: "yen", symbol: JPY, domain: ".co.jp" },
};
