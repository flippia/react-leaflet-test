import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import Box from "@mui/material/Box";

const columns = [
  { field: "Asset Name", headerName: "Asset Name", width: 150 },
  {
    field: "Lat",
    headerName: "Latitude",
    type: "number",
    width: 100,
  },
  {
    field: "Long",
    headerName: "Longitude",
    type: "number",
    width: 100,
  },
  {
    field: "Business Category",
    headerName: "Business Category",
    width: 150,
  },
  {
    field: "Risk Rating",
    headerName: "Risk Rating",
    type: "number",
    width: 100,
  },
  {
    field: "Year",
    headerName: "Year",
    type: "number",
    width: 100,
  },
];

const Table = (props) => {
  const { data } = props;
  data.forEach((oneData, index) => (oneData.id = index));
  return (
    <Box sx={{ height: 500, width: "80%" }}>
      <DataGrid
        rows={data}
        columns={columns}
        rowsPerPageOptions={[50, 100]}
        disableSelectionOnClick
        experimentalFeatures={{ newEditingApi: true }}
      />
    </Box>
  );
};

export default Table;
