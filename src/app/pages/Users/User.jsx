import { Typography } from "@mui/material";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { getInstitution } from "../../../core/reducers/institution/institutionSlice";
import { getUser } from "../../../core/reducers/user/userSlice";
import { getInstitutionById } from "../../../core/thunk/institution";
import { getUserById } from "../../../core/thunk/user";
import PreviewFile from "../../components/Image/PreviewFile";
import Layout from "../../components/Layout";
import pages from "../../config/pages";
import { roles } from "../../config/Constant";

const User = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const dispatch = useDispatch();
  const user = useSelector(getUser);
  const institution = useSelector(getInstitution);
  const [role, setRole] = useState("");

  useEffect(() => {
    dispatch(getUserById({ user_id: id }));
    if (user) {
      dispatch(getInstitutionById({ institution_id: user.institution_id }));
      const roleFind = roles.find((role) => role.id === user.role);
      setRole(roleFind?.value);
    }
  }, [dispatch, id, user]);

  return (
    <Layout>
      <div className="flex flex-row justify-between">
        <Typography variant="h5">User details</Typography>
        <div className="flex flex-row">
          <p
            className="italic text-cyan-600 cursor-pointer text-sm"
            onClick={() => navigate(pages.usersPath)}
          >
            Go back Users page
          </p>
          <p className="px-3"> | </p>
          <p
            className="italic text-cyan-600 cursor-pointer text-sm"
            onClick={() => navigate(`${pages.usersPath}/${id}/edit`)}
          >
            Edit
          </p>
        </div>
      </div>
      <div className="grid gap-4 py-3">
        <div className="flex flex-wrap">
          <p className="font-bold">User name:</p>
          <p className="px-2">{user.name}</p>
        </div>
        {/* <div className="flex flex-wrap">
          <p className="font-bold">Password:</p>
          <p className="px-2">{user.password}</p>
        </div> */}
        <div className="flex flex-wrap">
          <p className="font-bold">Email:</p>
          <p className="px-2">{user.email}</p>
        </div>
        <div className="flex flex-wrap">
          <p className="font-bold">Phone:</p>
          <p className="px-2">{user.phone}</p>
        </div>
        <div className="flex flex-wrap">
          <p className="font-bold">DOB:</p>
          <p className="px-2">
            {dayjs(user.date_of_birth).format("DD/MM/YYYY")}
          </p>
        </div>
        <div className="flex flex-wrap">
          <p className="font-bold">Role:</p>
          <p className="px-2">{role}</p>
        </div>
        <div className="flex flex-wrap">
          <p className="font-bold">Institution:</p>
          <p className="px-2">{institution.name}</p>
        </div>
        <div className="flex items-center space-x-2">
          <p className="font-bold">Social ID:</p>
          {user.is_social ? (
            <p className="px-2">{user.social_uuid}</p>
          ) : (
            <p className="px-2">No Social ID</p>
          )}
        </div>
        <div className="flex flex-wrap">
          <p className="font-bold">Profile picture:</p>
          <div className="px-2">
            {user.profile_pic && user.profile_pic.length > 0 && (
              <PreviewFile
                className={{ margin: "auto" }}
                width={300}
                height={"auto"}
                files={user.profile_pic}
              />
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default User;
