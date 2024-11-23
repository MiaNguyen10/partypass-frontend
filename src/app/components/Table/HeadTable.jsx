import styled from "@emotion/styled";
import {
  TableCell,
  tableCellClasses,
  TableHead,
  TableRow,
} from "@mui/material";
import PropTypes from "prop-types";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const HeadTable = ({ headCells }) => {
  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell) => (
          <StyledTableCell
            key={headCell.id}
            align={headCell.align || "left"}
            style={{ minWidth: headCell.minWidth }}
          >
            {headCell.label}
          </StyledTableCell>
        ))}
      </TableRow>
    </TableHead>
  );
};

HeadTable.propTypes = {
  headCells: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      align: PropTypes.string,
      minWidth: PropTypes.number,
      label: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default HeadTable;
