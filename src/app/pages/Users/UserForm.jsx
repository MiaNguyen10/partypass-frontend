import {
  Button,
  Checkbox,
  MenuItem,
  TextField,
  Typography,
} from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import PropTypes from "prop-types";
import { Controller } from "react-hook-form";
import PreviewFile from "../../components/Image/PreviewFile";
import { roles, validFileExtensions } from "../../config/Constant";
import { useDispatch, useSelector } from "react-redux";
import { getInstitutions } from "../../../core/reducers/institution/institutionSlice";
import { useEffect } from "react";
import { getInstitutionList } from "../../../core/thunk/institution";

const UserForm = ({
  handleSubmit,
  onSubmit,
  control,
  formErrors,
  setValue,
  watch,
}) => {
  // images
  const profile_pic = watch("profile_pic");
  const allowedExts = getAllowedExt("image");
  const institutions = useSelector(getInstitutions);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getInstitutionList());
  }, [dispatch]);

  function getAllowedExt(type) {
    return validFileExtensions[type].map((e) => `.${e}`).toString();
  }

  // const handleRemove = (index) => {
  //   const updatedImages = images.filter((_, i) => i !== index);
  //   setValue("images", updatedImages); // Update form state after removing the image
  // };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4 py-3">
      <div className="grid grid-cols-2 gap-4">
        <Controller
          name="name"
          control={control}
          render={({ field: { onChange, value } }) => (
            <TextField
              value={value}
              onChange={onChange}
              error={!!formErrors?.name}
              helperText={formErrors?.name?.message}
              label="User Name"
              variant="outlined"
            />
          )}
        />
        <Controller
          name="email"
          control={control}
          render={({ field: { onChange, value } }) => (
            <TextField
              value={value}
              onChange={onChange}
              error={!!formErrors?.email}
              helperText={formErrors?.email?.message}
              label="Email"
              variant="outlined"
            />
          )}
        />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <Controller
          name="phone"
          control={control}
          render={({ field: { onChange, value } }) => (
            <TextField
              value={value}
              onChange={onChange}
              error={!!formErrors?.phone}
              helperText={formErrors?.phone?.message}
              label="Phone"
              variant="outlined"
            />
          )}
        />
        <Controller
          name="date_of_birth"
          control={control}
          defaultValue={dayjs()}
          render={({ field: { onChange, value } }) => (
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                label="DOB"
                format="DD/MM/YYYY"
                value={value || dayjs()}
                onChange={onChange}
                slotProps={{
                  textField: {
                    error: !!formErrors?.date_of_birth,
                    helperText: formErrors?.date_of_birth?.message,
                  },
                }}
              />
            </LocalizationProvider>
          )}
        />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <Controller
          name="role"
          control={control}
          render={({ field: { onChange, value } }) => (
            <TextField
              select
              value={value}
              onChange={onChange}
              error={!!formErrors?.role}
              helperText={formErrors?.role?.message}
              label="Role"
              variant="outlined"
            >
              {roles.map((role) => (
                <MenuItem key={role.id} value={role.id}>
                  {role.value}
                </MenuItem>
              ))}
            </TextField>
          )}
        />
        <Controller
          name="institution_id"
          control={control}
          render={({ field: { onChange, value } }) => (
            <TextField
              select
              value={value}
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
      </div>
      <div className="grid grid-cols-2 gap-4">
        <Controller
          name="password"
          control={control}
          render={({ field: { onChange, value } }) => (
            <TextField
              value={value}
              onChange={onChange}
              error={!!formErrors?.password}
              helperText={formErrors?.password?.message}
              label="Password"
              variant="outlined"
            />
          )}
        />
        <div className="flex items-center space-x-2">
          <Typography>Social ID:</Typography>
          <Controller
            name="is_social"
            control={control}
            render={({ field: { onChange, value } }) => (
              <Checkbox
                checked={value}
                onChange={(e) => onChange(e.target.checked)}
              />
            )}
          />
          {watch("is_social") && (
            <Controller
              name="social_uuid"
              control={control}
              render={({ field: { onChange, value } }) => (
                <TextField
                  value={value}
                  onChange={onChange}
                  error={!!formErrors?.social_uuid}
                  helperText={formErrors?.social_uuid?.message}
                  label="Social UUID"
                  variant="outlined"
                />
              )}
            />
          )}
        </div>
      </div>

      <div className="grid gap-2">
        <label className="button label" htmlFor="images">
          <span>Upload profile picture (Validate file: [{allowedExts}])</span>
        </label>
        <Controller
          name="profile_pic"
          control={control}
          render={({ field }) => (
            <input
              id="images"
              type="file"
              accept={allowedExts}
              multiple
              onChange={(event) => {
                const filesArray = Array.from(event.target.files);
                field.onChange(filesArray); // Set value in react-hook-form
                setValue("profile_pic", filesArray); // Explicitly set value if needed
              }}
            />
          )}
        />
        {profile_pic && profile_pic.length > 0 && (
          <PreviewFile
            className={{ margin: "auto" }}
            width={300}
            height={"auto"}
            files={profile_pic}
            // handleRemove={handleRemove}
          />
        )}
      </div>
      <Button type="submit" variant="contained">
        Save user
      </Button>
    </form>
  );
};

UserForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  control: PropTypes.object.isRequired,
  formErrors: PropTypes.object,
  setValue: PropTypes.func.isRequired,
  watch: PropTypes.func.isRequired,
};

export default UserForm;
