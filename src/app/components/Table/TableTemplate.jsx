import { Paper, Table, TableContainer, TablePagination } from "@mui/material";
import PropTypes from "prop-types";
import HeadTable from "./HeadTable";
import BodyTable from "./BodyTable";

const TableTemplate = ({
  headCells,
  rows,
  page,
  rowsPerPage,
  handleChangePage,
  handleChangeRowsPerPage,
}) => {
  return (
    <Paper sx={{ width: "100%", overflow: "hidden" }}>
      <TableContainer component={Paper}>
        <Table
          sx={{
            minWidth: 700,
            border: "1px solid #e0e0e0",
          }}
          stickyHeader
          aria-label="sticky table"
        >
          <HeadTable headCells={headCells} />
          <BodyTable
            rows={rows}
            page={page}
            rowsPerPage={rowsPerPage}
            headCells={headCells}
          />
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
};

TableTemplate.propTypes = {
  headCells: PropTypes.array.isRequired,
  rows: PropTypes.array.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
  handleChangePage: PropTypes.func.isRequired,
  handleChangeRowsPerPage: PropTypes.func.isRequired,
};

export default TableTemplate;
