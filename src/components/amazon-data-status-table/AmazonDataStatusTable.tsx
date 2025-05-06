import {
  CellClassParams,
  ColDef,
  RowGroupOpenedEvent,
  IAggFuncParams,
  SideBarDef,
} from "ag-grid-community";
import { AgGridReact } from "ag-grid-react";
import { useMemo, useRef, useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { useTheme } from "../theme-provider";
import "ag-grid-community";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-balham.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import { ComponentWrapper } from "../ui/component-wrapper";
import { Button } from "../ui/button";
import Spinner from "../ui/spinner";

interface AmazonDataStatusTableProps {
  data: any;
  isPending: boolean;
  fullScreen: boolean;
  handleFullScreen: () => void;
}

const AmazonDataStatusTable = (props: AmazonDataStatusTableProps) => {
  const { fullScreen, handleFullScreen, data, isPending } = props;
  const gridRef: any = useRef();
  const theme = useTheme();
  const [gridClass, setGridClass] = useState<string>("");
  const rowData = data;

  useEffect(() => {
    const newGridClass =
      theme.theme === "dark" ? "ag-theme-quartz-dark" : "ag-theme-quartz";
    setGridClass(newGridClass);
  }, [theme.theme]);

  function onRowGroupOpened(event: RowGroupOpenedEvent) {
    gridRef.current.api.autoSizeColumns(["ag-Grid-AutoColumn"]);
  }

  const defaultColDef: ColDef = useMemo(() => {
    return {
      resizable: true,
      sortable: true,
      filter: false,
    };
  }, []);

  const autoGroupColumnDef: ColDef = useMemo(() => {
    return {
      headerName: "Metric",
      field: "kpi",
      sort: "asc",
      resizable: true,
      cellRendererParams: {
        suppressCount: true,
      },
      pinned: "left",
      minWidth: 280,
    };
  }, []);

  function getMinimumDate(dates: string[]): string | null {
    if (dates.length === 0) return null;

    // Convert date strings to Date objects and find the minimum
    return dates.sort((dateStrA, dateStrB) => {
      const [dayA, monthA, yearA] = dateStrA.split("/").map(Number);
      const [dayB, monthB, yearB] = dateStrB.split("/").map(Number);

      const parsedDateA = new Date(yearA, monthA - 1, dayA);
      const parsedDateB = new Date(yearB, monthB - 1, dayB);

      return parsedDateA.getTime() - parsedDateB.getTime();
    })[0];
  }

  const sideBar: SideBarDef = {
    toolPanels: [
      {
        id: "columns",
        labelDefault: "Columns",
        labelKey: "columns",
        iconKey: "columns",
        toolPanel: "agColumnsToolPanel",
        toolPanelParams: {
          suppressRowGroups: false,
          suppressValues: true,
          suppressPivotMode: false,
          suppressPivots: true,
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

  const generateCountryColumn = (countryCode: string): ColDef => {
    return {
      headerName: countryCode.toUpperCase(),
      field: countryCode.toLowerCase(),
      cellDataType: "dateString",
      resizable: true,
      aggFunc: (params: IAggFuncParams) => {
        const values = params.values.filter((val) => val !== null);
        if (values.length === 0) {
          return null;
        }
        return getMinimumDate(values);
      },
      cellStyle: (params: CellClassParams) => {
        if (params.value === null) {
          return null;
        }
        // Parse 'DD/MM/YYYY' format manually
        const [day, month, year] = params.value.split("/").map(Number);
        const date = new Date(year, month - 1, day);
        const now = new Date();
        const fiveDaysAgo = new Date();
        fiveDaysAgo.setDate(now.getDate() - 6);

        const threeDaysAgo = new Date();
        threeDaysAgo.setDate(now.getDate() - 4);

        if (date <= fiveDaysAgo) {
          return { backgroundColor: "#EF4444" };
        }
        if (date <= threeDaysAgo) {
          return { backgroundColor: "#FACC15" };
        }
        return { backgroundColor: "#84CC16" };
      },
      enableValue: true,
    };
  };

  const columnDefs: ColDef[] = useMemo(() => {
    return [
      {
        headerName: "KPI",
        field: "kpi",
        sort: "asc",
        resizable: true,
        enableRowGroup: true,
        rowGroup: true,
        filter: true,
      },
      {
        headerName: "Division",
        field: "div_division",
        sort: "asc",
        resizable: true,
        enableRowGroup: true,
        rowGroup: true,
        filter: true,
      },
      generateCountryColumn("de"),
      generateCountryColumn("uk"),
      generateCountryColumn("es"),
      generateCountryColumn("fr"),
      generateCountryColumn("it"),
      generateCountryColumn("ca"),
      generateCountryColumn("mx"),
      generateCountryColumn("br"),
      generateCountryColumn("jp"),
    ];
  }, []);

  const fullScreenButton = (
    <Button variant={"outline"} onClick={handleFullScreen}>
      {fullScreen ? "Exit Full Screen" : "Full Screen"}
    </Button>
  );

  const autoSizeStrategy = useMemo(() => {
    return {
      type: "fitGridWidth" as const,
      defaultMinWidth: 100,
      columnLimits: [],
    };
  }, []);

  return (
    <ComponentWrapper
      title="Amazon Data Status"
      about="Shows Amazon Data Status By Country By Metric"
      className={`${fullScreen ? "h-screen" : "h-full"} p-4 flex flex-col`}
      // additionalComponent={fullScreenButton}
    >
      <div className={cn(`flex-grow`, gridClass)}>
        {isPending ? (
          <Spinner className="h-full flex justify-center" />
        ) : (
          <AgGridReact
            ref={gridRef}
            rowData={rowData}
            columnDefs={columnDefs}
            defaultColDef={defaultColDef}
            autoGroupColumnDef={autoGroupColumnDef}
            sideBar={sideBar}
            groupDefaultExpanded={0}
            groupDisplayType="singleColumn"
            suppressAggFuncInHeader={true}
            suppressCsvExport={true}
            suppressExcelExport={true}
            grandTotalRow={"bottom"}
            animateRows={true}
            rowGroupPanelShow={"never"}
            suppressMakeColumnVisibleAfterUnGroup={true}
            overlayLoadingTemplate={"<span>Loading...</span>"}
            overlayNoRowsTemplate={"<span>No rows</span>"}
            onRowGroupOpened={onRowGroupOpened}
            // groupHeaderHeight={60}
            // headerHeight={50}
            rowHeight={40}
            pivotMode={true}
            valueCache={true}
            autoSizeStrategy={autoSizeStrategy}
            domLayout="autoHeight"
          />
        )}
      </div>
      <p className="text-sm m-2">
        Dates are aggregated based on the minimum date per division.All dates
        are formatted as dd/mm/yyyy. Expand for more details.
      </p>
    </ComponentWrapper>
  );
};

export default AmazonDataStatusTable;
