import { yupResolver } from "@hookform/resolvers/yup";
import { Typography } from "@mui/material";
import dayjs from "dayjs";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Layout from "../../components/Layout";
import pages from "../../config/pages";
import UserForm from "./UserForm";
import { schemaUser } from "./schemaUser";
import { createUser } from "../../../core/thunk/user";

const AddUser = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

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
      institution_id: null,
      is_social: false,
      social_uuid: "",
      profile_pic: [],
    },
  });

  const onSubmit = (data) => {
    const formData = new FormData();

    // Convert numeric and boolean fields
    formData.append("name", data.name);
    formData.append("email", data.email);
    formData.append("phone", data.phone);
    formData.append("date_of_birth", data.date_of_birth.toISOString());
    formData.append("password", data.password);
    formData.append("role", parseInt(data.role, 10));
    formData.append("institution_id", parseInt(data.institution_id, 10));
    formData.append("is_social", data.is_social ? 1 : 0);
    formData.append("social_uuid", data.social_uuid);

    // Append image files
    data.images.forEach((image) => {
      formData.append("images", image);
    });

    dispatch(createUser(formData));
    reset();
  };

  return (
    <Layout>
      <div className="flex flex-row justify-between">
        <Typography variant="h5">Add user</Typography>
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

export default AddUser;
