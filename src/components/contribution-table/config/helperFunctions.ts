import { ExcelStyle } from "ag-grid-community";

export const currencyFormatter: { [country: string]: string } = {
    dollar: "$ #,##0.00",
    pound: "£ #,##0.00",
    euro: "€ #,##0.00",
    canadianDollar: "C$ #,##0.00",
    mexicanDollar: "Mx$ #,##0.00",
};

export const excelStyles = (country: string): ExcelStyle[] => [
    {
        id: "numberType",
        numberFormat: {
            format: "0",
        },
    },
    {
        id: "currencyFormat",
        numberFormat: {
            format: currencyFormatter[country] || "$ #,##0.00",
        },
    },
    {
        id: "negativeInBrackets",
        numberFormat: {
            format: "$[blue] #,##0;$ [red](#,##0)",
        },
    },
    {
        id: "booleanType",
        dataType: "Boolean",
    },
    {
        id: "stringType",
        dataType: "String",
    },
    {
        id: "dateType",
        dataType: "DateTime",
    },
    {
        id: "percentageType",
        numberFormat: {
            format: "0.00%",
        },
    },
];
