import {
    ColDef,
    ColGroupDef,
    ValueFormatterParams,
    SideBarDef,
    ICellRendererParams,
} from "ag-grid-community";

import { toReadableNumber } from "@/helpers/numbers";
import { format } from "path";

export interface TableColumnDefs {
    defaultColDef?: ColDef;
    autoGroupColumnDef?: ColDef;
    columnDefs: ColDef[] | ColGroupDef[];
}

export const sideBar: SideBarDef = {
    toolPanels: [
        {
            id: "columns",
            labelDefault: "Columns",
            labelKey: "columns",
            iconKey: "columns",
            toolPanel: "agColumnsToolPanel",
            toolPanelParams: {
                suppressRowGroups: true,
                suppressValues: false,
                suppressPivotMode: true,
            },
        },
        {
            id: "filters",
            labelDefault: "Filters",
            labelKey: "filters",
            iconKey: "filter",
            toolPanel: "agFiltersToolPanel",
            toolPanelParams: {
                suppressExpandAll: false,
                suppressFilterSearch: false,
            },
        },
    ],
    defaultToolPanel: "",
};

export const SINGLE_VALUE_WIDTH = 120;
export const WIDE_VALUE_WIDTH = 175;

export function getMediaContributionTableDefs(): TableColumnDefs {
    return {
        defaultColDef: {
            resizable: true,
            sortable: true,
            filter: true,
            enablePivot: false,
            enableRowGroup: false,
            minWidth: 100,
            flex: 1,
            wrapHeaderText: true,
            autoHeaderHeight: true,
        },
        autoGroupColumnDef: {
            headerName: "Group",
            resizable: true,
        },
        columnDefs: [
            {
                headerName: "Ad Type",
                field: "ad_type",
                width: 150,
                resizable: true,
                chartDataType: "category",
                filter: "agSetColumnFilter",
            },
            {
                headerName: "Attr. Sales",
                field: "Second_Period_Total_Sales",
                resizable: true,
                chartDataType: "series",
                aggFunc: "sum",
                sort: "desc",
                filter: "agSetColumnFilter",
                cellClass: "currencyFormat",
                cellRenderer: (params: ICellRendererParams) => {
                    const formattedValue = toReadableNumber(
                        params.value,
                        undefined,
                        true,
                        false
                    );
                    return formattedValue;
                },
            },
            {
                headerName: "Attr. Sales LP",
                field: "First_Period_Total_Sales",
                resizable: true,
                chartDataType: "series",
                aggFunc: "sum",
                filter: "agSetColumnFilter",
                cellClass: "currencyFormat",
                cellRenderer: (params: ICellRendererParams) => {
                    const formattedValue = toReadableNumber(
                        params.value,
                        undefined,
                        true,
                        false
                    );
                    return formattedValue;
                },
            },
            {
                headerName: "Ad Spend",
                field: "Second_Period_Total_Ad_Spend",
                hide: true,
                resizable: true,
                chartDataType: "series",
                aggFunc: "sum",
                filter: "agSetColumnFilter",
                cellClass: "currencyFormat",
                cellRenderer: (params: ICellRendererParams) => {
                    const formattedValue = toReadableNumber(
                        params.value,
                        undefined,
                        true,
                        false
                    );
                    return formattedValue;
                },
            },
            {
                headerName: "Ad Spend LP",
                field: "First_Period_Total_Ad_Spend",
                hide: true,
                resizable: true,
                chartDataType: "series",
                aggFunc: "sum",
                filter: "agSetColumnFilter",
                cellClass: "currencyFormat",
                cellRenderer: (params: ICellRendererParams) => {
                    const formattedValue = toReadableNumber(
                        params.value,
                        undefined,
                        true,
                        false
                    );
                    return formattedValue;
                },
            },
        ],
    };
}

export function getColumnDefs(view: string): TableColumnDefs {
    const columnDefMap: { [view: string]: () => TableColumnDefs } = {
        MediaContributionTable: getMediaContributionTableDefs,
    };
    if (!Object.keys(columnDefMap).includes(view)) {
        return getMediaContributionTableDefs();
    }
    return columnDefMap[view]();
}
