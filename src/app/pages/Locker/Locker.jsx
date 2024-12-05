import { Typography } from "@mui/material";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { getInstitution } from "../../../core/reducers/institution/institutionSlice";
import { getLocker } from "../../../core/reducers/locker/lockerSlice";
import { getInstitutionById } from "../../../core/thunk/institution";
import { getLockerById } from "../../../core/thunk/locker";
import Layout from "../../components/Layout";
import { locker_status } from "../../config/Constant";
import pages from "../../config/pages";

const Locker = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();
  const locker = useSelector(getLocker);
  const institution = useSelector(getInstitution);

  useEffect(() => {
    dispatch(getLockerById({ locker_id: id }));
  }, [dispatch, id]);

  useEffect(() => {
    if (locker && locker.institution_id) {
      dispatch(getInstitutionById(locker.institution_id));
    }
  }, [dispatch, locker]);

  return (
    <Layout>
      <div className="flex flex-row justify-between">
        <Typography variant="h5">Locker details</Typography>
        <div className="flex flex-row">
          <p
            className="italic text-cyan-600 cursor-pointer text-sm"
            onClick={() => navigate(pages.lockersPath)}
          >
            Go back Lockers page
          </p>
          <p className="px-3"> | </p>
          <p
            className="italic text-cyan-600 cursor-pointer text-sm"
            onClick={() => navigate(`${pages.lockersPath}/${id}/edit`)}
          >
            Edit
          </p>
        </div>
      </div>
      <div className="grid gap-4 py-3">
        <div className="flex flex-wrap">
          <p className="font-bold">Locker number:</p>
          <p className="px-2">{locker.locker_number}</p>
        </div>
        <div className="flex flex-wrap">
          <p className="font-bold">Institution:</p>
          <p className="px-2">{institution.name}</p>
        </div>
        <div className="flex flex-wrap">
          <p className="font-bold">Status:</p>
          <p className="px-2">{locker.status == 0 ? locker_status[0].value : locker_status[1].value}</p>
        </div>
        </div>
    </Layout>
  );
};

export default Locker;
