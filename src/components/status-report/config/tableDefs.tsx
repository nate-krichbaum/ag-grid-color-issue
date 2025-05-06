import { ValueFormatterParams } from "ag-grid-community";

const emptyToDashFormatter = (params: ValueFormatterParams) => {
  return params.value ? params.value : "-";
};
export const AmzStatusReportAsinOppColumnDefs = [
  {
    headerName: "DE",
    field: "de",
    cellDataType: "dateString",
    valueFormatter: emptyToDashFormatter,
  },
  {
    headerName: "UK",
    field: "uk",
    cellDataType: "dateString",
    valueFormatter: emptyToDashFormatter,
  },
  {
    headerName: "ES",
    field: "es",
    cellDataType: "dateString",
    valueFormatter: emptyToDashFormatter,
  },
  {
    headerName: "FR",
    field: "fr",
    cellDataType: "dateString",
    valueFormatter: emptyToDashFormatter,
  },
  {
    headerName: "IT",
    field: "it",
    cellDataType: "dateString",
    valueFormatter: emptyToDashFormatter,
  },
  {
    headerName: "CA",
    field: "ca",
    cellDataType: "dateString",
    valueFormatter: emptyToDashFormatter,
  },
  {
    headerName: "MX",
    field: "mx",
    cellDataType: "dateString",
    valueFormatter: emptyToDashFormatter,
  },
  {
    headerName: "BR",
    field: "br",
    cellDataType: "dateString",
    valueFormatter: emptyToDashFormatter,
  },
  {
    headerName: "JP",
    field: "jp",
    cellDataType: "dateString",
    valueFormatter: emptyToDashFormatter,
  },
];

export const AmazStatusReportCompIntelColumnsDefs = [
  {
    headerName: "DE",
    field: "de",
    cellDataType: "dateString",
    valueFormatter: emptyToDashFormatter,
  },
  {
    headerName: "UK",
    field: "uk",
    cellDataType: "dateString",
    valueFormatter: emptyToDashFormatter,
  },
  {
    headerName: "ES",
    field: "es",
    cellDataType: "dateString",
    valueFormatter: emptyToDashFormatter,
  },
  {
    headerName: "FR",
    field: "fr",
    cellDataType: "dateString",
    valueFormatter: emptyToDashFormatter,
  },
  {
    headerName: "IT",
    field: "it",
    cellDataType: "dateString",
    valueFormatter: emptyToDashFormatter,
    flex: 1,
  },
  {
    headerName: "CA",
    field: "ca",
    cellDataType: "dateString",
    valueFormatter: emptyToDashFormatter,
  },
];

export const AmazonStatusReportKeepaColumnsDefs = [
  {
    headerName: "DashBoards",
    field: "source",
    valueFormatter: (params: ValueFormatterParams) => {
      const raw = params.value;
      const match = raw?.match(/\(([^)]+)\)/);
      return match ? match[1] : raw;
    },
  },
  {
    headerName: "DE",
    field: "de",
    cellDataType: "dateString",
    valueFormatter: emptyToDashFormatter,
  },
  {
    headerName: "UK",
    field: "uk",
    cellDataType: "dateString",
    valueFormatter: emptyToDashFormatter,
  },
  {
    headerName: "ES",
    field: "es",
    cellDataType: "dateString",
    valueFormatter: emptyToDashFormatter,
  },
  {
    headerName: "FR",
    field: "fr",
    cellDataType: "dateString",
    valueFormatter: emptyToDashFormatter,
  },
  {
    headerName: "IT",
    field: "it",
    cellDataType: "dateString",
    valueFormatter: emptyToDashFormatter,
  },
  {
    headerName: "CA",
    field: "ca",
    cellDataType: "dateString",
    valueFormatter: emptyToDashFormatter,
  },
];

export const AmazonStatusReportPdpColumnsDefs = [
  {
    headerName: "DE",
    field: "de",
    cellDataType: "dateString",
    valueFormatter: emptyToDashFormatter,
  },
  {
    headerName: "UK",
    field: "uk",
    cellDataType: "dateString",
    valueFormatter: emptyToDashFormatter,
  },
  {
    headerName: "ES",
    field: "es",
    cellDataType: "dateString",
    valueFormatter: emptyToDashFormatter,
  },
  {
    headerName: "FR",
    field: "fr",
    cellDataType: "dateString",
    valueFormatter: emptyToDashFormatter,
  },

  {
    headerName: "IT",
    field: "it",
    cellDataType: "dateString",
    valueFormatter: emptyToDashFormatter,
  },
  {
    headerName: "CA",
    field: "ca",
    cellDataType: "dateString",
    valueFormatter: emptyToDashFormatter,
  },
  {
    headerName: "MX",
    field: "mx",
    cellDataType: "dateString",
    valueFormatter: emptyToDashFormatter,
  },
  {
    headerName: "BR",
    field: "br",
    cellDataType: "dateString",
    valueFormatter: emptyToDashFormatter,
  },
  {
    headerName: "JP",
    field: "jp",
    cellDataType: "dateString",
    valueFormatter: emptyToDashFormatter,
  },
];
