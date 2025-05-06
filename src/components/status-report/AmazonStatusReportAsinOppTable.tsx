import { AgGridReact } from "ag-grid-react";
import { cn } from "@/lib/utils";
import { useTheme } from "../theme-provider";
import { useState, useEffect } from "react";
import "ag-grid-enterprise";
import "ag-grid-enterprise/styles/ag-grid.css";
import "ag-grid-enterprise/styles/ag-theme-balham.css";
import "ag-grid-enterprise/styles/ag-theme-alpine.css";
import "ag-grid-enterprise/styles/ag-theme-quartz.css";
import { ComponentWrapper } from "../ui/component-wrapper";
import Spinner from "../ui/spinner";
import { AmzStatusReportAsinOppColumnDefs } from "./config/tableDefs";

const AmazonStatusReportAsinOppTable = () => {
    const [gridClass, setGridClass] = useState<string>("");
    const theme = useTheme();

    useEffect(() => {
        const newGridClass =
            theme.theme === "dark" ? "ag-theme-quartz-dark" : "ag-theme-quartz";
        setGridClass(newGridClass);
    }, [theme.theme]);

    const data = {
        AmazonStatusReportAsinOpp: [
            {
                de: "30/04/2025",
                uk: "30/04/2025",
                mx: "30/04/2025",
                br: "30/04/2025",
                ca: "30/04/2025",
                es: "30/04/2025",
                fr: "30/04/2025",
                it: "30/04/2025",
                jp: "30/04/2025",
            },
        ],
    };

    const isPending = false;

    return (
        <ComponentWrapper
            title="Asin Opportunity Finder"
            className={`h-full p-4 flex flex-col`}
        >
            <div className={cn(`h-[100px]`, gridClass)}>
                {isPending ? (
                    <Spinner className="h-full flex justify-center" />
                ) : (
                    <AgGridReact
                        rowData={data?.AmazonStatusReportAsinOpp}
                        columnDefs={AmzStatusReportAsinOppColumnDefs}
                        suppressAnimationFrame={true}
                        suppressMakeColumnVisibleAfterUnGroup={true}
                        overlayLoadingTemplate={"<span>Loading...</span>"}
                        overlayNoRowsTemplate={"<span>No rows</span>"}
                        tooltipMouseTrack
                        tooltipShowDelay={0}
                        groupHeaderHeight={40}
                        headerHeight={40}
                        rowHeight={30}
                        valueCache={true}
                    />
                )}
            </div>
        </ComponentWrapper>
    );
};

export default AmazonStatusReportAsinOppTable;
