import { yupResolver } from "@hookform/resolvers/yup";
import { Typography } from "@mui/material";
import dayjs from "dayjs";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { getUser } from "../../../core/reducers/user/userSlice";
import { getUserById, updateUser } from "../../../core/thunk/user";
import Layout from "../../components/Layout";
import pages from "../../config/pages";
import UserForm from "./UserForm";
import { schemaUser } from "./schemaUser";

const EditUser = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector(getUser);

  useEffect(() => {
    dispatch(getUserById({ user_id: id }));
  }, [dispatch, id]);

  const {
    handleSubmit,
    control,
    formState: { errors: formErrors },
    reset,
    setValue,
    watch,
  } = useForm({
    resolver: yupResolver(schemaUser),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      date_of_birth: dayjs(),
      // password: "",
      role: "",
      institution_id: "",
      is_social: false,
      social_uuid: "",
      profile_pic: [],
    },
  });

  //get ticket by id
  useEffect(() => {
    if (user) {
      // Reset form with user data
      reset({
        name: user.name || "",
        email: user.email || "",
        phone: user.phone || "",
        date_of_birth: dayjs(user.date_of_birth) || dayjs(),
        // password: user.password || "",
        role: user.role || null,
        institution_id: user.institution_id || null,
        is_social: user.is_social,
        social_uuid: user.social_uuid,
        profile_pic: user.profile_pic || [],
      });
    }
  }, [reset, user]);

  const onSubmit = (data) => {
    const userData = {
      ...data,
      institution_id: parseInt(data.institution_id, 10),
      role: parseInt(data.role, 10),
    }
    dispatch(updateUser({ user_id: id, userData: userData }))
      .then(() => {
        dispatch(getUserById({ user_id: id }));
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <Layout>
      <div className="flex flex-row justify-between">
        <Typography variant="h5">Edit user</Typography>
        <p
          className="italic text-cyan-600 cursor-pointer text-sm"
          onClick={() => navigate(pages.usersPath)}
        >
          Go back Users page
        </p>
      </div>
      <UserForm
        handleSubmit={handleSubmit}
        onSubmit={onSubmit}
        control={control}
        formErrors={formErrors}
        setValue={setValue}
        watch={watch}
      />
    </Layout>
  );
};

export default EditUser;
