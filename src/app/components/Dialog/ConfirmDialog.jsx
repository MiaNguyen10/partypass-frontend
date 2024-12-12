import { useTheme } from "@emotion/react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  Typography,
  useMediaQuery,
} from "@mui/material";
import React from "react";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import { deleteTicket, getTicketList } from "../../../core/thunk/ticket";
import { deleteInstitution, getInstitutionList } from "../../../core/thunk/institution";

const ConfirmDialog = ({
  atr,
  open,
  setOpen,
  ticketId,
  setTicketId,
  institutionId,
  setInstitutionId,
}) => {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));
  const dispatch = useDispatch();

  const handleClose = () => {
    setOpen(false);
  };

  const handleAgree = async () => {
    switch (atr) {
      case "ticket":
        await dispatch(deleteTicket(ticketId));
        await dispatch(getTicketList());
        setOpen(false);
        setTicketId(null);
        break;
      case "organization":
        await dispatch(deleteInstitution(institutionId));
        await dispatch(getInstitutionList());
        setOpen(false);
        setInstitutionId(null);
        break;
      default:
        break;
    }
  };

  return (
    <React.Fragment>
      <Dialog
        fullScreen={fullScreen}
        open={open}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogContent>
          <DialogContentText>
            <Typography className="text-black font-semibold">
              Are you sure you want to delete this {atr}?
            </Typography>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose}>
            Cancel
          </Button>
          <Button onClick={handleAgree} autoFocus>
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
};

ConfirmDialog.propTypes = {
  atr: PropTypes.string.isRequired,
  open: PropTypes.bool.isRequired,
  setOpen: PropTypes.func.isRequired,
  ticketId: PropTypes.number,
  setTicketId: PropTypes.func,
  institutionId: PropTypes.number,
  setInstitutionId: PropTypes.func,
};

export default ConfirmDialog;
