import { createLazyFileRoute } from "@tanstack/react-router";
import { data as dataCT } from "@/components/contribution-table/data";
import ContributionTable from "@/components/contribution-table/ContributionTable";

export const Route = createLazyFileRoute("/sales")({
    component: Sales,
});

function Sales() {
    return (
        <>
            <div>
                <div className="">
                    <ContributionTable queryData={dataCT} />
                </div>
            </div>
        </>
    );
}
