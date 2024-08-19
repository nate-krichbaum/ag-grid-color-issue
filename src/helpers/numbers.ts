import numbro from "numbro";
import { currencies } from "@/config/currencies";

export const toReadableInteger = (val: number) => {
    return Number(val).toFixed();
};
export const toReadableNumber = (
    val: number,
    country?: string,
    round?: boolean,
    expanded?: boolean,
    decimals?: number
) => {
    let finalVal = val;
    let numFormat = "0.00a";
    if (expanded && round) {
        finalVal = Math.round(val);
        numFormat = "0,0";
    } else if (round && decimals === 0) {
        numFormat = "0a";
    } else if (expanded && decimals === 2) {
        numFormat = "0,0";
        let value = numbro(finalVal.toFixed(decimals))
            .format(numFormat)
            .toUpperCase();
        return numbro(value).format(numFormat).toUpperCase();
    } else if (expanded) {
        numFormat = "0,0";
    } else if (round) {
        numFormat = "0.0a";
    } else if (decimals) {
        let value = numbro(finalVal).format(numFormat).toUpperCase();
        return Number(value).toFixed(decimals);
    }
    return numbro(finalVal).format(numFormat).toUpperCase();
};
export const toReadablePercentage = (
    val: number,
    country?: string,
    round?: boolean,
    expanded?: boolean,
    decimals?: number
) => `${toReadableNumber(val * 100, undefined, round, expanded, decimals)} %`;
export const toReadableCurrency = (
    val: number,
    country?: string,
    round?: boolean,
    expanded?: boolean,
    decimals?: number
) => {
    const currencySymbol = country ? currencies[country].symbol : "$";
    return `${currencySymbol} ${toReadableNumber(val, undefined, round, expanded, decimals)}`;
};

export const getFormattedValue = (
    value: number | null | undefined,
    numType: string,
    options?: { round?: boolean; expanded?: boolean; decimals?: number }
): string => {
    if (value === null || value === undefined) {
        return "";
    }

    let decimals = options?.decimals || undefined;

    const numTypeMap: {
        [t: string]: (
            n: number,
            country?: string,
            round?: boolean,
            expanded?: boolean,
            decimals?: number
        ) => string;
    } = {
        number: toReadableNumber,
        percent: toReadablePercentage,
        currency: toReadableCurrency,
    };
    return numTypeMap[numType](
        value,
        undefined,
        options?.round,
        options?.expanded,
        decimals
    ) as string;
};

export const getCurrencySymbol = (currency: string) => {
    let currencySymbol = "$";
    if (currency === "euro") {
        currencySymbol = "€";
    }
    if (currency === "pound") {
        currencySymbol = "£";
    }
    if (currency === "canadianDollar") {
        currencySymbol = "C$";
    }
    if (currency === "mexicanDollar") {
        currencySymbol = "Mx$";
    }
    if (currency === "real") {
        currencySymbol = "R$";
    }
    if (currency === "yen") {
        currencySymbol = "¥";
    }
    return currencySymbol;
};
