import { yupResolver } from "@hookform/resolvers/yup";
import { Typography } from "@mui/material";
import { useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { getInstitution } from "../../../core/reducers/institution/institutionSlice";
import {
  getInstitutionById,
  updateInstitution,
} from "../../../core/thunk/institution";
import Layout from "../../components/Layout";
import { institution_status } from "../../config/Constant";
import pages from "../../config/pages";
import InstitutionForm from "./InstitutionForm";
import { schemaInstitution } from "./schemaInstitution";

const EditInstitution = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const institution = useSelector(getInstitution);
  const fileInputRef = useRef(null);

  useEffect(() => {
    dispatch(getInstitutionById(id));
  }, [dispatch, id]);

  const {
    handleSubmit,
    control,
    formState: { errors: formErrors },
    reset,
    watch,
    setValue,
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

  //get ticket by id
  useEffect(() => {
    if (institution) {
      // Reset form with institution data
      reset({
        name: institution.name || "",
        email: institution.email || "",
        phone: institution.phone || "",
        address: institution.address || "",
        map_location: institution.map_location || "",
        details: institution.details || "",
        cover_photo: institution.cover_photo || "",
        video_link: institution.video_link || "",
        status:
          institution.status === 0
            ? institution_status[0].value
            : institution_status[1].value || "",
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [institution]);

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

    dispatch(
      updateInstitution({ institutionData: formData, institution_id: id })
    )
      .then(() => {
        dispatch(getInstitutionById(id));
         // Reset the file input
         if (fileInputRef.current) {
          fileInputRef.current.value = null;
        }
      })
      .catch((error) => {
        console.error("Update Error:", error);
      });
  };

  return (
    <Layout>
      <div className="flex flex-row justify-between">
        <Typography variant="h5">Edit ticket</Typography>
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

export default EditInstitution;
