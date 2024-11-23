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
}) => {
  // //coordinates
  // const mapUrl = watch("map_location");
  // // decode html entities
  // const decodeHtmlEntities = (str) => {
  //   return str.replace(/&#x2F;/g, "/");
  // };

  // images
  const cover_photo = watch("cover_photo");
  const allowedExts = getAllowedExt("image");

  function getAllowedExt(type) {
    return validFileExtensions[type].map((e) => `.${e}`).toString();
  }

  //video link
  const htmlDecode = (decodedURL) => {
    const doc = new DOMParser().parseFromString(decodedURL, "text/html");
    return doc.documentElement.textContent;
  };

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
      <div className="grid grid-cols-2 gap-4">
        <MapComponent mapUrl={watch("map_location")} />
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
              multiple
              onChange={(event) => {
                const filesArray = Array.from(event.target.files);
                console.log("Uploaded files:", filesArray);
                field.onChange(filesArray);
                setValue("cover_photo", filesArray);
              }}
            />
          )}
        />
        {Array.isArray(cover_photo) && cover_photo.length > 0 && (
          <PreviewFile
            className={{ margin: "auto" }}
            width={300}
            height={"auto"}
            files={cover_photo}
          />
        )}
      </div>
      <div className="grid gap-2">
        <Controller
          name="video_link"
          control={control}
          render={({ field: { onChange, value } }) => (
            <TextField
              label="Video link"
              variant="outlined"
              value={value ? htmlDecode(value) : ""} // No need to decode here; value remains raw
              onChange={(event) => onChange(event.target.value)} // Pass raw value directly
              error={!!formErrors?.video_link}
              helperText={formErrors?.video_link?.message}
            />
          )}
        />
        {/* {watch("video_link") ? (
          <iframe
            width="560"
            height="315"
            src={`https://www.youtube.com/embed/${videoLink}`}
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          />
        ) : null} */}
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
};

export default InstitutionForm;
