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
import { useRef } from "react";

const AddInstitution = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const fileInputRef = useRef(null);

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
    // Create a FormData object
    const formData = new FormData();

    // Append fields to the FormData object
    formData.append("name", data.name);
    formData.append("email", data.email);
    formData.append("phone", data.phone);
    formData.append("address", data.address);
    formData.append("map_location", data.map_location);
    formData.append("details", data.details);
    formData.append("video_link", data.video_link);
    formData.append("status", data.status === "Active" ? 1 : 0);

    // Append the image file
    if (data.cover_photo && data.cover_photo[0]) {
      formData.append("cover_photo", data.cover_photo[0]);
    }

    dispatch(createInstitution({ institutionData: formData })).then(() => {
      if (fileInputRef.current) {
        fileInputRef.current.value = null;
      }
    });
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
        fileInputRef={fileInputRef}
      />
    </Layout>
  );
};

export default AddInstitution;
