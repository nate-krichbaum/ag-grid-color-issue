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
import { AmazonStatusReportPdpColumnsDefs } from "./config/tableDefs";
const AmazonStatusReportPdpTable = () => {
    const [gridClass, setGridClass] = useState<string>("");
    const theme = useTheme();

    useEffect(() => {
        const newGridClass =
            theme.theme === "dark" ? "ag-theme-quartz-dark" : "ag-theme-quartz";
        setGridClass(newGridClass);
    }, [theme.theme]);

    const data = {
        AmazonStatusReportPdp: [
            {
                de: "22/04/2025",
                uk: "22/04/2025",
                mx: "27/04/2025",
                br: "22/04/2025",
                ca: "27/04/2025",
                es: "22/04/2025",
                fr: "22/04/2025",
                it: "22/04/2025",
                jp: "22/04/2025",
            },
        ],
    };

    const isPending = false;
    return (
        <>
            <ComponentWrapper
                title="Pdp Data"
                className={`h-full p-4 flex flex-col`}
            >
                <div className={cn(`h-[100px] `, gridClass)}>
                    {isPending ? (
                        <Spinner className="h-full flex justify-center" />
                    ) : (
                        <AgGridReact
                            rowData={data?.AmazonStatusReportPdp}
                            columnDefs={AmazonStatusReportPdpColumnsDefs}
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
        </>
    );
};

export default AmazonStatusReportPdpTable;
