import { yupResolver } from "@hookform/resolvers/yup";
import { Typography } from "@mui/material";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { getInstitution } from "../../../core/reducers/institution/institutionSlice";
import {
  getInstitutionById,
  updateInstitution,
} from "../../../core/thunk/institution";
import Layout from "../../components/Layout";
import pages from "../../config/pages";
import InstitutionForm from "./InstitutionForm";
import { schemaInstitution } from "./schemaInstitution";
import { institution_status } from "../../config/Constant";

const EditInstitution = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const institution = useSelector(getInstitution);

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
    const institutionData = {
      name: data.name,
      email: data.email,
      phone: data.phone,
      address: data.address,
      map_location: data.map_location,
      details: data.details,
      cover_photo: data.cover_photo,
      video_link: data.video_link,
      status: data.status === "Active" ? 1 : 0,
    };

    // // Use FormData for file uploads
    // const institutionData = new FormData();

    // // Append text fields
    // institutionData.append("name", data.name);
    // institutionData.append("email", data.email);
    // institutionData.append("phone", data.phone);
    // institutionData.append("address", data.address);
    // institutionData.append("map_location", data.map_location || "");
    // institutionData.append("details", data.details || "");
    // institutionData.append("video_link", data.video_link || "");
    // institutionData.append("status", data.status === "Active" ? 1 : 0);

    // // Append file(s) for cover_photo
    // if (data.cover_photo && data.cover_photo.length > 0) {
    //   data.cover_photo.forEach((file) => {
    //     institutionData.append("cover_photo", file);
    //   });
    // }

    dispatch(
      updateInstitution({ ...institutionData, institution_id: id })
    ).then(() => {
      dispatch(getInstitutionById(id));
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
      />
    </Layout>
  );
};

export default EditInstitution;
