import { Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { getInstitutionById } from "../../../core/thunk/institution";
import PreviewFile from "../../components/Image/PreviewFile";
import Layout from "../../components/Layout";
import pages from "../../config/pages";
import MapComponent from "./MapComponent";
import { getInstitution } from "../../../core/reducers/institution/institutionSlice";
import { institution_status } from "../../config/Constant";

const Institution = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();
  const institution = useSelector(getInstitution);
  //coordinates
  const [mapLocation, setMapLocation] = useState("");
  // decode html entities
  const decodeHtmlEntities = (str) => {
    return str.replace(/&#x2F;/g, "/");
  };
  //video link
  //const [videoLink, setVideoLink] = useState("");

  const htmlDecode = (decodedURL) => {
    const doc = new DOMParser().parseFromString(decodedURL, "text/html");
    return doc.documentElement.textContent;
  };

  useEffect(() => {
    dispatch(getInstitutionById(id));
    if (institution.map_location) {
      setMapLocation(decodeHtmlEntities(institution.map_location));
    }
    // if (institution.video_link) {
    //   const decodedURL = htmlDecode(institution.video_link);
    //   if (decodedURL && decodedURL.includes("youtu.be/")) {
    //     const videoId = decodedURL.split("youtu.be/")[1].split("?")[0];
    //     setVideoLink(videoId);
    //   } else {
    //     console.warn("Invalid YouTube URL format:", decodedURL);
    //   }
    // }
  }, [dispatch, id]);

  return (
    <Layout>
      <div className="flex flex-row justify-between">
        <Typography variant="h5">Institution details</Typography>
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
            <MapComponent mapUrl={mapLocation} />
          ) : (
            <p className="px-2">No map location</p>
          )}
        </div>
        <div className="flex flex-wrap">
          <p className="font-bold">Images:</p>
          <div className="px-2">
            {institution?.cover_photo &&
            Array.isArray(institution.cover_photo) &&
            institution.cover_photo.length > 0 ? (
              <PreviewFile
                className={{ margin: "auto" }}
                width={300}
                height={"auto"}
                files={institution.cover_photo}
              />
            ) : (
              <p>No image</p>
            )}
          </div>
        </div>
        <div className="flex flex-wrap">
          <p className="font-bold">Video link:</p>
          <div className="px-2">
          {htmlDecode(institution.video_link)}
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
    </Layout>
  );
};

export default Institution;
