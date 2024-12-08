import { Button, MenuItem, TextField } from "@mui/material";
import PropTypes from "prop-types";
import { useContext, useEffect } from "react";
import { Controller } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { getInstitution } from "../../../core/reducers/institution/institutionSlice";
import { getInstitutionById } from "../../../core/thunk/institution";
import { locker_status } from "../../config/Constant";
import { UserInfoContext } from "../../middlewares/UserInfoProvider/UserInfoProvider";

const LockerForm = ({ handleSubmit, onSubmit, control, formErrors }) => {
  const dispatch = useDispatch();
  const { institutionId } = useContext(UserInfoContext);
  const institution = useSelector(getInstitution);
  

  useEffect(() => {
    dispatch(getInstitutionById(institutionId));
  },[dispatch, institutionId]);

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
            label="Locker Number"
            variant="outlined"
          />
        )}
      />
      <Controller
        name="institution_id"
        control={control}
        render={({ field: { onChange } }) => (
          <TextField
            value={institution.name}
            onChange={onChange}
            error={!!formErrors?.institution_id}
            helperText={formErrors?.institution_id?.message}
            required
            label="Institution"
            variant="outlined"
            disabled
          >
            {/* {institutions.map((institution) => (
              <MenuItem
                key={institution.institution_id}
                value={institution.institution_id}
              >
                {institution.name}
              </MenuItem>
            ))} */}
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
            label="Locker status"
            variant="outlined"
          >
            {locker_status.map((status) => (
              <MenuItem key={status.id} value={status.id}>
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
};

export default LockerForm;
