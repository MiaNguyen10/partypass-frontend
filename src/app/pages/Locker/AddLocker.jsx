import { yupResolver } from "@hookform/resolvers/yup";
import { Typography } from "@mui/material";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import Layout from "../../components/Layout";
import pages from "../../config/pages";
import LockerForm from "./LockerForm";
import { schemaLocker } from "./schemaLocker";

const AddLocker = () => {
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

  const onSubmit = (data) => {
    console.log("Submit data:", data);
    reset();
  };

  return (
    <Layout>
      <div className="flex flex-row justify-between">
        <Typography variant="h5">Add Locker</Typography>
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

export default AddLocker;
