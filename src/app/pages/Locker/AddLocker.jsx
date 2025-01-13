import { yupResolver } from "@hookform/resolvers/yup";
import { Typography } from "@mui/material";
import { jwtDecode } from "jwt-decode";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createLocker } from "../../../core/thunk/locker";
import Layout from "../../components/Layout";
import pages from "../../config/pages";
import LockerForm from "./LockerForm";
import { schemaLocker } from "./schemaLocker";

const AddLocker = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {institution_id} = jwtDecode(sessionStorage.getItem("token"));

  const {
    handleSubmit,
    control,
    formState: { errors: formErrors },
    reset,
  } = useForm({
    resolver: yupResolver(schemaLocker),
    defaultValues: {
      locker_number: "",
      institution_id: null,
      status: "",
    },
  });

  const onSubmit = (data) => {
    const lockerData = {
      ...data,
      institution_id: parseInt(institution_id, 10),
    };
    dispatch(createLocker({ lockerData })).catch((error) => {
      console.log(error);
    });
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
