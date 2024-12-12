import {
  Button,
  Checkbox,
  MenuItem,
  TextField,
  Typography,
} from "@mui/material";
import {
  DatePicker,
  LocalizationProvider,
  TimePicker,
} from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import PropTypes from "prop-types";
import { useEffect } from "react";
import { Controller } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { getInstitutions } from "../../../core/reducers/institution/institutionSlice";
import { getInstitutionList } from "../../../core/thunk/institution";
import dayjs from "dayjs";

const TicketForm = ({ handleSubmit, onSubmit, control, formErrors, watch }) => {
  const dispatch = useDispatch();
  const institutions = useSelector(getInstitutions);

  useEffect(() => {
    dispatch(getInstitutionList());
  }, [dispatch]);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4 py-3">
      <Controller
        name="name"
        control={control}
        render={({ field: { onChange, value } }) => (
          <TextField
            value={value}
            onChange={onChange}
            error={!!formErrors?.name}
            helperText={formErrors?.name?.message}
            label="Ticket Name"
            variant="outlined"
          />
        )}
      />
      <Controller
        name="description"
        control={control}
        render={({ field: { onChange, value } }) => (
          <TextField
            value={value}
            onChange={onChange}
            label="Description"
            variant="outlined"
            multiline
            rows={3}
          />
        )}
      />
      <div className="grid grid-cols-3 gap-4">
        <Controller
          name="institution_id"
          control={control}
          render={({ field: { onChange, value } }) => (
            <TextField
              select
              value={value || ""}
              onChange={onChange}
              error={!!formErrors?.institution_id}
              helperText={formErrors?.institution_id?.message}
              label="Institution"
              variant="outlined"
            >
              {institutions.map((institution) => (
                <MenuItem
                  key={institution.institution_id}
                  value={institution.institution_id}
                >
                  {institution.name}
                </MenuItem>
              ))}
            </TextField>
          )}
        />
        <Controller
          name="price"
          control={control}
          render={({ field: { onChange, value } }) => (
            <TextField
              value={value}
              onChange={onChange}
              error={!!formErrors?.price}
              helperText={formErrors?.price?.message}
              label="Price"
              variant="outlined"
            />
          )}
        />
        <Controller
          name="capacity"
          control={control}
          render={({ field: { onChange, value } }) => (
            <TextField
              value={value}
              onChange={onChange}
              error={!!formErrors?.capacity}
              helperText={formErrors?.capacity?.message}
              label="Capacity"
              variant="outlined"
            />
          )}
        />
      </div>
      <Controller
        name="benefits"
        control={control}
        render={({ field: { onChange, value } }) => (
          <TextField
            value={value}
            onChange={onChange}
            label="Benefits"
            variant="outlined"
            multiline
            rows={3}
          />
        )}
      />
      <Controller
        name="is_regular"
        control={control}
        render={({ field: { onChange, value } }) => (
          <div className="flex items-center space-x-2">
            <Checkbox
              checked={value || false} // Ensure boolean value
              onChange={(e) => onChange(e.target.checked)}
            />
            <Typography>Regular ticket</Typography>
          </div>
        )}
      />
      {
        // Show start date and end date if is_regular is false
        !watch("is_regular") && (
          <div className="grid grid-cols-3 gap-4">
            <Controller
              name="date"
              control={control}
              render={({ field: { onChange, value } }) => (
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    label="Date"
                    value={value ? value : null}
                    onChange={onChange}
                    format="DD/MM/YYYY"
                    slotProps={{
                      textField: {
                        error: !!formErrors?.date,
                        helperText: formErrors?.date?.message,
                      },
                    }}
                  />
                </LocalizationProvider>
              )}
            />
            <Controller
              name="start_datetime"
              control={control}
              render={({ field: { onChange, value } }) => (
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <TimePicker
                    label="Start Time"
                    value={value ? dayjs(value, "HH:mm:ss") : null}
                    onChange={(newValue) => {
                      onChange(newValue ? newValue.format("HH:mm:ss") : null);
                    }}
                    format="HH:mm:ss"
                    slotProps={{
                      textField: {
                        error: !!formErrors?.start_datetime,
                        helperText: formErrors?.start_datetime?.message,
                      },
                    }}
                  />
                </LocalizationProvider>
              )}
            />
            <Controller
              name="end_datetime"
              control={control}
              render={({ field: { onChange, value } }) => (
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <TimePicker
                    label="End Time"
                    value={value ? dayjs(value, "HH:mm:ss") : null}
                    onChange={(newValue) => {
                      onChange(newValue ? newValue.format("HH:mm:ss") : null);
                    }}
                    format="HH:mm:ss"
                    slotProps={{
                      textField: {
                        error: !!formErrors?.end_datetime,
                        helperText: formErrors?.end_datetime?.message,
                      },
                    }}
                  />
                </LocalizationProvider>
              )}
            />
          </div>
        )
      }

      <Button type="submit" variant="contained">
        Save ticket
      </Button>
    </form>
  );
};

TicketForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  control: PropTypes.object.isRequired,
  formErrors: PropTypes.object,
  watch: PropTypes.func.isRequired,
};

export default TicketForm;
