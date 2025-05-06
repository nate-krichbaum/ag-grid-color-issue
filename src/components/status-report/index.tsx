import AmazonStatusReportAsinOppTable from "./AmazonStatusReportAsinOppTable";
import AmazonStatusReportCompIntelTable from "./AmazonStatusReportCompIntelTable";
import AmazonStatusReportKeepaTable from "./AmazonStatusReportKeepaTable";
import AmazonStatusReportPdpTable from "./AmazonStatusReportPdpTable";

const StatusReportTable = () => {
  return (
    <>
      {" "}
      <div>
        <AmazonStatusReportCompIntelTable />
      </div>
      <div>
        <AmazonStatusReportAsinOppTable />
      </div>
      <div>
        <AmazonStatusReportPdpTable />
      </div>
      <div>
        <AmazonStatusReportKeepaTable />
      </div>
    </>
  );
};

export default StatusReportTable;
