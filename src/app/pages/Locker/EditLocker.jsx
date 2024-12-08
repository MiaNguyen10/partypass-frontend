import { yupResolver } from "@hookform/resolvers/yup";
import { Typography } from "@mui/material";
import { useContext, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { getLocker } from "../../../core/reducers/locker/lockerSlice";
import { getLockerById, updateLocker } from "../../../core/thunk/locker";
import Layout from "../../components/Layout";
import { locker_status } from "../../config/Constant";
import pages from "../../config/pages";
import { UserInfoContext } from "../../middlewares/UserInfoProvider/UserInfoProvider";
import LockerForm from "./LockerForm";
import { schemaLocker } from "./schemaLocker";

const EditLocker = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const locker = useSelector(getLocker);
  const {institutionId} = useContext(UserInfoContext);

  useEffect(() => {
    dispatch(getLockerById({ locker_id: id }));
  }, [dispatch, id]);

  const {
    handleSubmit,
    control,
    formState: { errors: formErrors },
    reset,
  } = useForm({
    resolver: yupResolver(schemaLocker),
    defaultValues: {
      locker_number: "",
      institution_id: "",
      status: "",
    },
  });

  useEffect(() => {
    if (locker) {
      // Reset form with ticket data
      reset({
        locker_number: locker.locker_number || "",
        institution_id: institutionId || "",
        status:
          locker.status == 0 ? locker_status[0].id : locker_status[1].id || "",
      });
    }
  }, [locker, reset, institutionId]);

  const onSubmit = (data) => {
    const lockerData = {
      ...data,
      institution_id: institutionId,
    }
    dispatch(updateLocker({ locker_id: id, lockerData }))
      .then(() => {
        dispatch(getLockerById({ locker_id: id }));
      })
      .catch((error) => {
        console.error(error);
      });
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
