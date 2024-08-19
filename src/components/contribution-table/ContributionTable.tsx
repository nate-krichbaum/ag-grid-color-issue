import { useRef, useState, useMemo, useCallback } from "react";
import { AgGridReact } from "ag-grid-react";
import { excelStyles } from "./config/helperFunctions";
import {
    ProcessCellForExportParams,
    FirstDataRenderedEvent,
    ChartRef,
    GridApi,
    ChartModel,
} from "ag-grid-community";
import { AgChartTheme } from "ag-charts-community";
import { getColumnDefs } from "./config/tableDefs";
import { cn } from "@/lib/utils";
import { useTheme } from "@/components/theme-provider";
import "ag-grid-enterprise";
import "ag-grid-enterprise/styles/ag-grid.css";
import "ag-grid-enterprise/styles/ag-theme-balham.css";
import "ag-grid-enterprise/styles/ag-theme-alpine.css";
import "ag-grid-enterprise/styles/ag-theme-quartz.css";
import { Card } from "../ui/card";
import { ComponentWrapper } from "../ui/component-wrapper";
import { toReadableNumber } from "@/helpers/numbers";
import { getChartColorHex } from "@/config/constants";

interface Props {
    queryData: ContributionData[];
    isLoading?: boolean;
}

interface ContributionData {
    ad_type: string;
    First_Period_Total_Sales: number;
    Second_Period_Total_Sales: number;
    First_Period_Total_Ad_Spend: number;
    Second_Period_Total_Ad_Spend: number;
}
[];

let chartRef: ChartRef;
let chartModel: ChartModel;

const ContributionTable = (props: Props) => {
    const gridRef: any = useRef<AgGridReact>();
    const theme = useTheme();

    const [themeName, setThemeName] = useState<string>(
        theme.theme === "dark" ? "AGTthemeDark" : "AGTthemeLight"
    );
    const [gridClass, setGridClass] = useState("");

    const { queryData, isLoading } = {
        queryData: props.queryData ? props.queryData : [],
        isLoading: props.isLoading,
    };

    const { defaultColDef, columnDefs, autoGroupColumnDef } = getColumnDefs(
        "MediaContributionTable"
    );

    const AGTTheme = (theme: string): AgChartTheme => {
        return {
            baseTheme: theme === "dark" ? "ag-default-dark" : "ag-default",
            palette: {
                fills: [
                    getChartColorHex(1),
                    getChartColorHex(2),
                    getChartColorHex(3),
                    getChartColorHex(4),
                    getChartColorHex(5),
                    getChartColorHex(6),
                    getChartColorHex(7),
                    getChartColorHex(8),
                    getChartColorHex(9),
                    getChartColorHex(10),
                ],
            },
            overrides: {
                common: {
                    title: {
                        enabled: true,
                        text: "Ad Type Breakdown Per Dimension",
                    },
                    legend: {
                        enabled: true,
                    },
                    background: { visible: false },
                    axes: {
                        number: {
                            label: {
                                formatter: function (params: any) {
                                    return toReadableNumber(
                                        params.value,
                                        undefined,
                                        true,
                                        false
                                    );
                                },
                            },
                        },
                    },
                },
                bar: {
                    series: {
                        label: {
                            enabled: true,
                            formatter: function (params: any) {
                                return toReadableNumber(
                                    params.value,
                                    undefined,
                                    true,
                                    false
                                );
                            },
                            placement: "outside",
                            color: theme === "dark" ? "#fff" : "#000",
                        },
                    },
                    axes: {
                        number: {
                            gridLine: { enabled: false },
                            label: { enabled: false },
                        },
                    },
                },
            },
        };
    };

    const chartThemes = {
        AGTthemeDark: AGTTheme("dark"),
        AGTthemeLight: AGTTheme("light"),
    };

    const popupParent = useMemo<HTMLElement | null>(() => {
        return document.body;
    }, []);

    const onFirstDataRendered = useCallback(
        (params: FirstDataRenderedEvent) => {
            chartRef = params.api.createRangeChart({
                chartContainer: document.querySelector("#myChart") as any,
                cellRange: {
                    columns: [
                        "ad_type",
                        "Second_Period_Total_Sales",
                        "First_Period_Total_Sales",
                        "Second_Period_Total_Ad_Spend",
                        "First_Period_Total_Ad_Spend",
                    ],
                },
                chartType: "groupedBar",
            })!;
        },
        []
    );

    const [agRef, setAgRef] = useState<any>();

    const onGridReady = (params: any) => {
        setAgRef(params.api);
        params.api.closeToolPanel();
        params.api;
    };

    const defaultExcelExportParams = useMemo(() => {
        return {
            suppressRowOutline: true,
            suppressColumnOutline: true,
            skipRowGroups: true,
            allColumns: true,
            processCellCallback: (params: ProcessCellForExportParams) => {
                return params.formatValue(params.value);
            },
        };
    }, []);

    function saveChart(gridApi: GridApi) {
        const chartModels = gridApi!.getChartModels() || [];
        if (chartModels.length > 0) {
            chartModel = chartModels[0];
            delete chartModel.chartThemeName;
            delete chartModel.chartPalette;
        }
    }

    function clearChart(chartRef: ChartRef | undefined) {
        if (chartRef) {
            chartRef.destroyChart();
            chartRef = undefined;
        }
    }

    function restoreChart(chartModel: ChartModel, gridApi: GridApi) {
        if (!chartModel) return;
        chartRef = gridApi!.restoreChart(
            chartModel,
            document.querySelector("#myChart") as any
        )!;
    }

    useMemo(() => {
        console.log(chartThemes);
        setGridClass(
            theme.theme === "dark" ? "ag-theme-quartz-dark" : "ag-theme-quartz"
        );
        setThemeName(theme.theme === "dark" ? "AGTthemeDark" : "AGTthemeLight");
        if (gridRef.current?.api) {
            saveChart(gridRef.current?.api);
            console.log(chartModel);
            clearChart(chartRef);
            restoreChart(chartModel, gridRef.current?.api);
        }
    }, [theme.theme]);

    return (
        <>
            <div className="grid gap-0 md:grid-cols-1 lg:gap-4 lg:grid-cols-2">
                <ComponentWrapper
                    title="Media Contribution by Ad Type"
                    about="Ad Type Breakdowns"
                    className="h-[560px] p-4"
                >
                    <div className={cn(`h-full`, gridClass)}>
                        <AgGridReact
                            ref={gridRef}
                            rowData={queryData}
                            columnDefs={columnDefs}
                            defaultColDef={defaultColDef}
                            popupParent={popupParent}
                            enableCharts={true}
                            customChartThemes={chartThemes}
                            chartThemes={[themeName]}
                            excelStyles={excelStyles("dollar")}
                            onFirstDataRendered={onFirstDataRendered}
                            suppressCsvExport={true}
                            allowContextMenuWithControlKey={true}
                            grandTotalRow={"bottom"}
                            animateRows={true}
                            overlayLoadingTemplate={"<span>Loading...</span>"}
                            overlayNoRowsTemplate={"<span>No rows</span>"}
                            defaultExcelExportParams={defaultExcelExportParams}
                        ></AgGridReact>
                    </div>
                </ComponentWrapper>
                <ComponentWrapper
                    title="Media Contribution by Ad Type"
                    about="Ad Type Breakdowns"
                    className="h-[560px] p-4"
                >
                    <Card className="dark:bg-[#212835] h-full">
                        <div
                            id="myChart"
                            className={cn("size-full", gridClass)}
                        />
                    </Card>
                </ComponentWrapper>
            </div>
        </>
    );
};

export default ContributionTable;
