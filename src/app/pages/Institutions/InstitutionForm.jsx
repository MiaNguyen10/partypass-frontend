import { Button, MenuItem, TextField } from "@mui/material";
import PropTypes from "prop-types";
import { Controller } from "react-hook-form";
import PreviewFile from "../../components/Image/PreviewFile";
import { institution_status, validFileExtensions } from "../../config/Constant";
import MapComponent from "./MapComponent";

const InstitutionForm = ({
  handleSubmit,
  onSubmit,
  control,
  formErrors,
  watch,
  setValue,
  fileInputRef,
}) => {
  //map location
  const extractIframeSrcUrl = (iframeHtml) => {
    // Check if the input is already a URL or does not contain iframe structure
    if (iframeHtml.startsWith("http") || !iframeHtml.includes("<iframe")) {
      return iframeHtml; // Assume it's already the extracted URL
    }
    // Use a regular expression to match the src attribute
    const srcMatch = iframeHtml.match(/src="([^"]+)"/);
    // Return the URL if found, otherwise return null
    setValue("map_location", srcMatch ? srcMatch[1] : null);
  };

  // images
  const cover_photo = watch("cover_photo");
  const allowedExts = getAllowedExt("image");

  function getAllowedExt(type) {
    return validFileExtensions[type].map((e) => `.${e}`).toString();
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4 py-3">
      {/* name and email */}
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
              label="Institution Name"
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
      {/* phone and address */}
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
          name="address"
          control={control}
          render={({ field: { onChange, value } }) => (
            <TextField
              value={value}
              onChange={onChange}
              error={!!formErrors?.address}
              helperText={formErrors?.address?.message}
              label="Address"
              variant="outlined"
            />
          )}
        />
      </div>
      {/* map */}
      <div className="grid grid-cols-2 gap-3">
        <MapComponent mapUrl={watch("map_location")} />
        <div className="flex flex-col space-y-2">
          <Controller
            name="map_location"
            control={control}
            render={({ field: { onChange, value } }) => (
              <TextField
                value={value}
                onChange={onChange}
                error={!!formErrors?.map_location}
                helperText={formErrors?.map_location?.message}
                label="Map location"
                variant="outlined"
                multiline
              />
            )}
          />
          <Button
            variant="contained"
            onClick={() => extractIframeSrcUrl(watch("map_location"))}
          >
            Extract URL
          </Button>
        </div>
      </div>
      <Controller
        name="details"
        control={control}
        render={({ field: { onChange, value } }) => (
          <TextField
            value={value}
            onChange={onChange}
            error={!!formErrors?.details}
            helperText={formErrors?.details?.message}
            label="Detail"
            variant="outlined"
            multiline
          />
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
            label="Institution status"
            variant="outlined"
          >
            {institution_status.map((status) => (
              <MenuItem key={status.id} value={status.value}>
                {status.value}
              </MenuItem>
            ))}
          </TextField>
        )}
      />
      {/* cover photo */}
      <div className="grid gap-2">
        <label className="button label" htmlFor="cover_photo">
          <span>Upload cover photo (Validate file: [{allowedExts}])</span>
        </label>
        <Controller
          name="cover_photo"
          control={control}
          render={({ field }) => (
            <input
              id="cover_photo"
              type="file"
              accept={allowedExts}
              ref={fileInputRef}
              onChange={(event) => {
                const filesArray = Array.from(event.target.files);
                field.onChange(filesArray);
                setValue("cover_photo", filesArray);
              }}
            />
          )}
        />
        {cover_photo &&
          (Array.isArray(cover_photo) && cover_photo.length > 0 ? (
            <PreviewFile
              className={{ margin: "auto" }}
              width={300}
              height={"auto"}
              files={cover_photo}
            />
          ) : (
            <img
              src={watch("cover_photo")}
              alt="cover_photo"
              width={300}
              height="auto"
            />
          ))}
      </div>
      <div className="grid gap-2">
        <Controller
          name="video_link"
          control={control}
          render={({ field: { onChange, value } }) => (
            <TextField
              label="Video link"
              variant="outlined"
              value={value}
              onChange={(event) => onChange(event.target.value)}
              error={!!formErrors?.video_link}
              helperText={formErrors?.video_link?.message}
            />
          )}
        />
      </div>

      <Button type="submit" variant="contained">
        Save institution
      </Button>
    </form>
  );
};

InstitutionForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  control: PropTypes.object.isRequired,
  formErrors: PropTypes.object,
  watch: PropTypes.func.isRequired,
  setValue: PropTypes.func.isRequired,
  fileInputRef: PropTypes.object.isRequired,
};

export default InstitutionForm;
