import styled from "@emotion/styled";
import {
  TableBody,
  TableCell,
  tableCellClasses,
  TableRow,
} from "@mui/material";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

import PropTypes from "prop-types";

const BodyTable = ({ rows, page, rowsPerPage, headCells }) => {
  return (
    <TableBody>
      {rows
        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
        .map((row) => {
          return (
            <StyledTableRow hover role="checkbox" tabIndex={-1} key={row.code}>
              {headCells.map((column) => {
                const value = row[column.id];
                return (
                  <StyledTableCell key={column.id} align={column.align}>
                    {column.format && typeof value === "number"
                      ? column.format(value)
                      : value}
                  </StyledTableCell>
                );
              })}
            </StyledTableRow>
          );
        })}
    </TableBody>
  );
};

BodyTable.propTypes = {
  rows: PropTypes.array.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
  headCells: PropTypes.array.isRequired,
};

export default BodyTable;
