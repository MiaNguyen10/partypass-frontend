import { yupResolver } from "@hookform/resolvers/yup";
import { Typography } from "@mui/material";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import Layout from "../../components/Layout";
import pages from "../../config/pages";
import InstitutionForm from "./InstitutionForm";
import { schemaInstitution } from "./schemaInstitution";
import { useDispatch } from "react-redux";
import { createInstitution } from "../../../core/thunk/institution";

const AddInstitution = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {
    handleSubmit,
    control,
    formState: { errors: formErrors },
    reset,
    setValue,
    watch,
  } = useForm({
    resolver: yupResolver(schemaInstitution),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      address: "",
      map_location: "",
      details: "",
      cover_photo: "",
      video_link: "",
      status: "",
    },
  });

  const onSubmit = (data) => {
    // Use FormData for file uploads
    const institutionData = new FormData();

    // Append text fields
    institutionData.append("name", data.name);
    institutionData.append("email", data.email);
    institutionData.append("phone", data.phone);
    institutionData.append("address", data.address);
    institutionData.append("map_location", data.map_location || "");
    institutionData.append("details", data.details || "");
    institutionData.append("video_link", data.video_link || "");
    institutionData.append("status", data.status === "Active" ? 1 : 0);

    // Append file(s) for cover_photo
    if (data.cover_photo && data.cover_photo.length > 0) {
      data.cover_photo.forEach((file) => {
        institutionData.append("cover_photo", file);
      });
    }

    dispatch(createInstitution(institutionData));
    reset();
  };

  return (
    <Layout>
      <div className="flex flex-row justify-between">
        <Typography variant="h5">Add institution</Typography>
        <p
          className="italic text-cyan-600 cursor-pointer text-sm"
          onClick={() => navigate(pages.institutionsPath)}
        >
          Go back Institutions page
        </p>
      </div>
      <InstitutionForm
        handleSubmit={handleSubmit}
        onSubmit={onSubmit}
        control={control}
        formErrors={formErrors}
        watch={watch}
        setValue={setValue}
      />
    </Layout>
  );
};

export default AddInstitution;
