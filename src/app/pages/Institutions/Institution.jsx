import { Link, Typography } from "@mui/material";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { getInstitution } from "../../../core/reducers/institution/institutionSlice";
import { getInstitutionById } from "../../../core/thunk/institution";
import Layout from "../../components/Layout";
import { institution_status, roles } from "../../config/Constant";
import pages from "../../config/pages";
import MapComponent from "./MapComponent";
import LockerForInstitution from "./LockerForInstitution";
import RestrictedPermission from "../../middlewares/PermissionProvider/RestrictedPermission";

const Institution = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();
  const institution = useSelector(getInstitution);

  useEffect(() => {
    dispatch(getInstitutionById(id));
  }, [dispatch, id]);

  return (
    <Layout>
      <div className="flex flex-row justify-between">
        <Typography variant="h5">Institution details</Typography>
        <RestrictedPermission allowedRoles={[roles[1].value]}>
          <div className="flex flex-row">
            <p
              className="italic text-cyan-600 cursor-pointer text-sm"
              onClick={() => navigate(pages.institutionsPath)}
            >
              Go back Institutions page
            </p>
            <p className="px-3"> | </p>
            <p
              className="italic text-cyan-600 cursor-pointer text-sm"
              onClick={() => navigate(`${pages.institutionsPath}/${id}/edit`)}
            >
              Edit
            </p>
          </div>
        </RestrictedPermission>
      </div>
      <div className="grid gap-4 py-3">
        <div className="flex flex-wrap">
          <p className="font-bold">Institution name:</p>
          <p className="px-2">{institution.name}</p>
        </div>
        <div className="flex flex-wrap">
          <p className="font-bold">Email:</p>
          <p className="px-2">{institution.email}</p>
        </div>
        <div className="flex flex-wrap">
          <p className="font-bold">Phone:</p>
          <p className="px-2">{institution.phone}</p>
        </div>
        <div className="flex flex-wrap">
          <p className="font-bold">Address:</p>
          <p className="px-2">{institution.address}</p>
        </div>
        <div className="flex flex-wrap">
          <p className="font-bold">Details:</p>
          <p className="px-2">{institution.details}</p>
        </div>
        <div className="flex flex-wrap">
          <p className="font-bold">Status:</p>
          <p className="px-2">
            {institution.status === 0
              ? institution_status[0].value
              : institution_status[1].value}
          </p>
        </div>
        <div className="flex flex-wrap">
          <p className="font-bold">Map location:</p>
          {institution.map_location ? (
            <MapComponent mapUrl={institution.map_location} />
          ) : (
            <p className="px-2">No map location</p>
          )}
        </div>
        <div>
          <p className="font-bold">Images:</p>
          <div className="px-2">
            <img
              src={institution.cover_photo}
              alt="cover_photo"
              width={300}
              height="auto"
            />
          </div>
        </div>
        <div className="flex flex-wrap">
          <p className="font-bold">Video link:</p>
          <div className="px-2 flex flex-col">
            {institution.video_link ? (
              <Link
                href={institution.video_link}
                underline="hover"
                target="_blank"
                rel="noopener noreferrer"
              >
                <p className="text-cyan-600 italic font-bold">
                  Press here to open video
                </p>
              </Link>
            ) : (
              <p>No video</p>
            )}
            {/* {institution ? (
              <iframe
                width="560"
                height="315"
                src={`https://www.youtube.com/embed/${videoLink}`}
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              />
            ) : (
              <p>No video</p>
            )} */}
          </div>
        </div>
      </div>
      <RestrictedPermission allowedRoles={[roles[1].value]}>
        <div>
          <LockerForInstitution institution_id={id} />
        </div>
      </RestrictedPermission>
    </Layout>
  );
};

export default Institution;
