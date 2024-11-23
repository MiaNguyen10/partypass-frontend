import { Button, MenuItem, TextField } from "@mui/material";
import PropTypes from "prop-types";
import { Controller } from "react-hook-form";
import { institutions } from "../Institutions/sampleData";
import { locker_status } from "../../config/Constant";

const LockerForm = ({ handleSubmit, onSubmit, control, formErrors }) => {
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4 py-3">
      <Controller
        name="locker_number"
        control={control}
        render={({ field: { onChange, value } }) => (
          <TextField
            value={value}
            onChange={onChange}
            error={!!formErrors?.ticketName}
            helperText={formErrors?.ticketName?.message}
            required
            label="Locker Number"
            variant="outlined"
          />
        )}
      />
      <Controller
        name="institution"
        control={control}
        render={({ field: { onChange, value } }) => (
          <TextField
            select
            value={value}
            onChange={onChange}
            error={!!formErrors?.institution}
            helperText={formErrors?.institution?.message}
            required
            label="Institution"
            variant="outlined"
          >
            {institutions.map((institution) => (
              <MenuItem
                key={institution.institution_id}
                value={institution.name}
              >
                {institution.name}
              </MenuItem>
            ))}
          </TextField>
        )}
      />
      <Controller
        name="status"
        control={control}
        render={({ field: { onChange, value } }) => (
          <TextField
            select
            value={value}
            onChange={onChange}
            error={!!formErrors?.status}
            helperText={formErrors?.status?.message}
            required
            label="Locker status"
            variant="outlined"
          >
            {locker_status.map((status) => (
              <MenuItem key={status.value} value={status.value}>
                {status.value}
              </MenuItem>
            ))}
          </TextField>
        )}
      />
      <Button type="submit" variant="contained">
        Save ticket
      </Button>
    </form>
  );
};

LockerForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  control: PropTypes.object.isRequired,
  formErrors: PropTypes.object,
  setValue: PropTypes.func.isRequired,
  watch: PropTypes.func.isRequired,
};

export default LockerForm;
