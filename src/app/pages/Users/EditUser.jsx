import { yupResolver } from "@hookform/resolvers/yup";
import { Typography } from "@mui/material";
import dayjs from "dayjs";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import Layout from "../../components/Layout";
import pages from "../../config/pages";
import { institutions } from "../Institutions/sampleData";
import { userList } from "./sampleData";
import UserForm from "./UserForm";
import { schemaUser } from "./schemaUser";

const EditUser = () => {
  const { id } = useParams();
  const navigate = useNavigate();

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
    // Fetch ticket by id
    const user = userList.find((user) => user.user_id === Number(id));

    if (user) {
      const institution = institutions.find(
        (institution) =>
          institution.institution_id === Number(user.institution_id)
      );
      // Reset form with user data
      reset({
        name: user.name,
        email: user.email,
        phone: user.phone,
        date_of_birth: dayjs(user.date_of_birth) || dayjs(),
        password: user.password ,
        role: user.role ,
        institution: institution ? institution.name : "",
        is_social: user.is_social,
        social_uuid: user.social_uuid,
        profile_pic: user.profile_pic || [],
      });
    }
  }, [id, reset]);

  const onSubmit = (data) => {
    console.log("Submit data:", data);
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
