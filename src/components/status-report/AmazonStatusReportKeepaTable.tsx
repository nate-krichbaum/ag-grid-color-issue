import { AgGridReact } from "ag-grid-react";
import { cn } from "@/lib/utils";
import { useTheme } from "../theme-provider";
import { useState, useEffect } from "react";
import { format, parseISO } from "date-fns";
import "ag-grid-enterprise";
import "ag-grid-enterprise/styles/ag-grid.css";
import "ag-grid-enterprise/styles/ag-theme-balham.css";
import "ag-grid-enterprise/styles/ag-theme-alpine.css";
import "ag-grid-enterprise/styles/ag-theme-quartz.css";
import { ComponentWrapper } from "../ui/component-wrapper";
import Spinner from "../ui/spinner";
import { AmazonStatusReportKeepaColumnsDefs } from "./config/tableDefs";

const AmazonStatusReportKeepaTable = () => {
    const [gridClass, setGridClass] = useState<string>("");
    const theme = useTheme();

    useEffect(() => {
        const newGridClass =
            theme.theme === "dark" ? "ag-theme-quartz-dark" : "ag-theme-quartz";
        setGridClass(newGridClass);
    }, [theme.theme]);

    const data = {
        AmazonStatusReportKeepa: [
            {
                source: "KEEPA DATA (Competitor)",
                ca: "28/04/2025",
                uk: "30/04/2025",
                de: "30/04/2025",
                fr: "30/04/2025",
                es: "30/04/2025",
                it: "30/04/2025",
                LOAD_TIMESTAMP: "2025-04-30 14:15:28.284145+00:00",
            },
            {
                source: "KEEPA DATA (L'Oreal)",
                ca: "28/04/2025",
                uk: "30/04/2025",
                de: "30/04/2025",
                fr: "30/04/2025",
                es: "30/04/2025",
                it: "30/04/2025",
                LOAD_TIMESTAMP: "2025-04-30 14:15:28.284145+00:00",
            },
        ],
    };

    const isPending = false;

    const latestTimestamp =
        data?.AmazonStatusReportKeepa?.[0]?.LOAD_TIMESTAMP || "";
    return (
        <>
            <ComponentWrapper
                title="Keepa Data"
                className={`h-full p-4 flex flex-col`}
            >
                <div className={cn(`h-[150px]`, gridClass)}>
                    {isPending ? (
                        <Spinner className="h-full flex justify-center" />
                    ) : (
                        <AgGridReact
                            rowData={data?.AmazonStatusReportKeepa}
                            columnDefs={AmazonStatusReportKeepaColumnsDefs}
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
            <div className="flex flex-col items-end px-4 py-2 ">
                <span className="font-semibold text-lg">
                    Last Refreshed On (UTC):
                </span>
                <span className="text-lg">
                    {latestTimestamp
                        ? format(
                              parseISO(latestTimestamp),
                              "dd/MM/yyyy hh:mm:ss a"
                          )
                        : "Loading..."}
                </span>
            </div>
        </>
    );
};

export default AmazonStatusReportKeepaTable;
