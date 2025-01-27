import { yupResolver } from "@hookform/resolvers/yup";
import { Typography } from "@mui/material";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { getInstitution } from "../../../core/reducers/institution/institutionSlice";
import { getUser } from "../../../core/reducers/user/userSlice";
import { getInstitutionById } from "../../../core/thunk/institution";
import { getUserById } from "../../../core/thunk/user";
import Layout from "../../components/Layout";
import { roles } from "../../config/Constant";
import pages from "../../config/pages";
import UserForm from "./UserForm";
import { schemaUser } from "./schemaUser";

const EditUser = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector(getUser);
  const institution = useSelector(getInstitution)
  const [role, setRole] = useState("");

  useEffect(() => {
      dispatch(getUserById({ user_id: id }));
      if (user) {
        dispatch(getInstitutionById({ institution_id: user.institution_id }));
        const roleFind = roles.find((role) => role.id === user.role);
        setRole(roleFind?.value);
      }
    }, [dispatch, id, user]);

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
      password: "",
      role: "",
      institution: "",
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
        name: user.name,
        email: user.email,
        phone: user.phone,
        date_of_birth: dayjs(user.date_of_birth) || dayjs(),
        password: user.password,
        role: role,
        institution: institution ? institution.name : "",
        is_social: user.is_social,
        social_uuid: user.social_uuid,
        profile_pic: user.profile_pic || [],
      });
    }
  }, [reset, user, role, institution]);

  const onSubmit = (data) => {
    console.log(data);
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
