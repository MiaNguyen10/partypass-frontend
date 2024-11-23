import { yupResolver } from "@hookform/resolvers/yup";
import { Button, MenuItem, TextField, Typography } from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import dayjs from "dayjs";
import { Controller, useForm } from "react-hook-form";
import * as yup from "yup";
import Layout from "../../components/Layout";
import institutions from "./sampleData";

const AddTicket = () => {
    const schema = yup.object().shape({
      ticketName: yup.string().required("Name is required"),
      description: yup.string(),
      institution: yup.string().required("Institution is required"),
      price: yup
        .number()
        .required("Price is required")
        .typeError("Price must be a number"),
      capacity: yup
        .number()
        .required("Capacity is required")
        .typeError("Capacity must be a number"),
      startDate: yup
        .date()
        .required("Start date is required")
        .typeError("Invalid start date"),
      endDate: yup
        .date()
        .required("End date is required")
        .typeError("Invalid end date"),
    });
  
    const {
      handleSubmit,
      control,
      formState: { errors: formErrors },
      reset,
    } = useForm({
      resolver: yupResolver(schema),
      defaultValues: {
        ticketName: "",
        description: "",
        institution: "",
        price: "", // or default to a numeric value if desired
        capacity: "", // same as price
        startDate: dayjs(), // Default to current date
        endDate: dayjs(), // Default to current date
      },
    });
  
    const onSubmit = (data) => {
      console.log("Submit data:", data);
      reset();
    };
  
    return (
      <Layout>
        <Typography variant="h5">Add ticket</Typography>
        <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4 py-3">
          <Controller
            name="ticketName"
            control={control}
            render={({ field: { onChange, value } }) => (
              <TextField
                value={value}
                onChange={onChange}
                error={!!formErrors?.ticketName}
                helperText={formErrors?.ticketName?.message}
                required
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
                    <MenuItem key={institution.id} value={institution.name}>
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
                  required
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
                  required
                  label="Capacity"
                  variant="outlined"
                />
              )}
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <Controller
              name="startDate"
              control={control}
              defaultValue={dayjs()} 
              render={({ field: { onChange, value } }) => (
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DateTimePicker
                    label="Start Date"
                    value={value || dayjs()}
                    onChange={onChange}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        error={!!formErrors?.startDate}
                        helperText={formErrors?.startDate?.message}
                      />
                    )}
                  />
                </LocalizationProvider>
              )}
            />
            <Controller
              name="endDate"
              control={control}
              defaultValue={dayjs()} 
              render={({ field: { onChange, value } }) => (
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DateTimePicker
                    label="End Date"
                    value={value || dayjs()}
                    onChange={onChange}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        error={!!formErrors?.endDate}
                        helperText={formErrors?.endDate?.message}
                      />
                    )}
                  />
                </LocalizationProvider>
              )}
            />
          </div>
          <Button type="submit" variant="contained">
            Save ticket
          </Button>
        </form>
      </Layout>
    );
  };
  

export default AddTicket;
