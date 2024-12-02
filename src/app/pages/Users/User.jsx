import { Typography } from "@mui/material";
import dayjs from "dayjs";
import { useNavigate, useParams } from "react-router-dom";
import PreviewFile from "../../components/Image/PreviewFile";
import Layout from "../../components/Layout";
import pages from "../../config/pages";
import { institutions } from "../Institutions/sampleData";
import { userList } from "./sampleData";

const User = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const user = userList.find((user) => user.user_id === Number(id));
  const institution = institutions.find(
    (institution) => institution.institution_id === user.institution_id
  );

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
        <div className="flex flex-wrap">
          <p className="font-bold">Password:</p>
          <p className="px-2">{user.password}</p>
        </div>
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
          <p className="px-2">{user.role}</p>
        </div>
        <div className="flex flex-wrap">
          <p className="font-bold">Institution:</p>
          <p className="px-2">{institution && institution.name}</p>
        </div>
        <div className="flex items-center space-x-2">
          <p className="font-bold">Social ID:</p>
          {user.is_social ? <p className="px-2">{user.social_uuid}</p> : <p className="px-2">No Social ID</p>}
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