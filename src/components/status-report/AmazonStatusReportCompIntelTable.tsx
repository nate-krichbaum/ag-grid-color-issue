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
import { AmazStatusReportCompIntelColumnsDefs } from "./config/tableDefs";
import { format, nextMonday } from "date-fns";

const AmazonStatusReportCompIntelTable = () => {
    const [gridClass, setGridClass] = useState<string>("");
    const theme = useTheme();
    useEffect(() => {
        const newGridClass =
            theme.theme === "dark" ? "ag-theme-quartz-dark" : "ag-theme-quartz";
        setGridClass(newGridClass);
    }, [theme.theme]);

    const data = {
        AmazonStatusReportCompIntel: [
            {
                ca: "19/04/2025",
                uk: "19/04/2025",
                de: "19/04/2025",
                fr: "19/04/2025",
                es: "19/04/2025",
                it: "19/04/2025",
            },
        ],
    };

    const isPending = false;

    function getNextMondayDate() {
        const today = new Date();
        const monday = nextMonday(today);
        return format(monday, "dd/MM/yyyy");
    }
    return (
        <ComponentWrapper
            title="Competitive Intelligence"
            className={`h-full p-4 flex flex-col`}
        >
            <div className={cn(`h-[100px]`, gridClass)}>
                {isPending ? (
                    <Spinner className="h-full flex justify-center" />
                ) : (
                    <AgGridReact
                        rowData={data?.AmazonStatusReportCompIntel}
                        columnDefs={AmazStatusReportCompIntelColumnsDefs}
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
            <p className="text-sm m-2">
                Next Available Date:{" "}
                {isPending ? "Loading..." : getNextMondayDate()}
            </p>
        </ComponentWrapper>
    );
};

export default AmazonStatusReportCompIntelTable;
