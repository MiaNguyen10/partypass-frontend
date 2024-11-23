import { yupResolver } from "@hookform/resolvers/yup";
import { Typography } from "@mui/material";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import Layout from "../../components/Layout";
import pages from "../../config/pages";
import { institutions } from "../Institutions/sampleData";
import LockerForm from "./LockerForm";
import { lockers } from "./sampleData";
import {schemaLocker} from "./schemaLocker";

const EditLocker = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const {
    handleSubmit,
    control,
    formState: { errors: formErrors },
    reset,
  } = useForm({
    resolver: yupResolver(schemaLocker),
    defaultValues: {
      locker_number: "",
      institution: "",
      status: "",
    },
  });

  //get locker by id
  useEffect(() => {
    // Fetch locker by id
    const locker = lockers.find((locker) => locker.id === Number(id));

    if (locker) {
      const institution = institutions.find(
        (institution) =>
          institution.institution_id === Number(locker.institution_id)
      );
      // Reset form with ticket data
      reset({
        locker_number: locker.locker_number || "",
        institution: institution.name || "",
        status: locker.status || "",
      });
    }
  }, [id, reset]);

  const onSubmit = (data) => {
    console.log("Submit data:", data);
  };

  return (
    <Layout>
      <div className="flex flex-row justify-between">
        <Typography variant="h5">Edit locker</Typography>
        <p
          className="italic text-cyan-600 cursor-pointer text-sm"
          onClick={() => navigate(pages.lockersPath)}
        >
          Go back Lockers page
        </p>
      </div>
      <LockerForm
        handleSubmit={handleSubmit}
        onSubmit={onSubmit}
        control={control}
        formErrors={formErrors}
      />
    </Layout>
  );
};

export default EditLocker;
