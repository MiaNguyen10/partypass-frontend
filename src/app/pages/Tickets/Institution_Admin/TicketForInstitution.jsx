import { Checkbox, Typography } from "@mui/material";
import dayjs from "dayjs";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { getTicket } from "../../../../core/reducers/ticket/ticketSlice";
import { getInstitution } from "../../../../core/reducers/institution/institutionSlice";
import { getTicketById } from "../../../../core/thunk/ticket";
import { getInstitutionById } from "../../../../core/thunk/institution";
import Layout from "../../../components/Layout";
import pages from "../../../config/pages";

const TicketForInstitution = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();
  const ticket = useSelector(getTicket);
  const institution = useSelector(getInstitution);

  useEffect(() => {
    dispatch(getTicketById(id));
  }, [dispatch, id]);

  useEffect(() => {
    if (ticket && ticket.institution_id) {
      dispatch(getInstitutionById(ticket.institution_id));
    }
  }, [dispatch, ticket]);

  return (
    <Layout>
      <div className="flex flex-row justify-between">
        <Typography variant="h5">Ticket details</Typography>
        <div className="flex flex-row">
          <p
            className="italic text-cyan-600 cursor-pointer text-sm"
            onClick={() => navigate(pages.ticketsPathForInstitution)}
          >
            Go back Tickets page
          </p>
          <p className="px-3"> | </p>
          <p
            className="italic text-cyan-600 cursor-pointer text-sm"
            onClick={() => navigate(`${pages.ticketsPathForInstitution}/${id}/edit`)}
          >
            Edit
          </p>
        </div>
      </div>
      <div className="grid gap-4 py-3">
        <div className="flex flex-wrap">
          <p className="font-bold">Ticket name:</p>
          <p className="px-2">{ticket.name}</p>
        </div>
        <div className="flex flex-wrap">
          <p className="font-bold">Ticket description:</p>
          <p className="px-2">{ticket.description}</p>
        </div>
        <div className="flex flex-wrap">
          <p className="font-bold">Institution:</p>
          <p className="px-2">{institution.name}</p>
        </div>
        <div className="flex flex-wrap">
          <p className="font-bold">Ticket price:</p>
          <p className="px-2">{ticket.price}</p>
        </div>
        <div className="flex flex-wrap">
          <p className="font-bold">Capacity:</p>
          <p className="px-2">{ticket.capacity}</p>
        </div>
        <div className="flex flex-wrap">
          <p className="font-bold">Benefits:</p>
          <p className="px-2">{ticket.benefits}</p>
        </div>
        <div className="flex items-center space-x-2">
          <p className="font-bold">Regular ticket:</p>
          <Checkbox
            checked={ticket.is_regular === 1 ? true : false}
            disabled
            className=""
          />
        </div>
        {
          // Show start date and end date if is_regular is false
          !ticket.is_regular && (
            <>
              <div className="flex flex-wrap">
                <p className="font-bold">Date:</p>
                <p className="px-2">
                  {dayjs(ticket.date).format("DD-MM-YYYY")}
                </p>
              </div>
              <div className="flex flex-wrap">
                <p className="font-bold">Start time:</p>
                <p className="px-2">{ticket.start_datetime}</p>
              </div>
              <div className="flex flex-wrap">
                <p className="font-bold">End time:</p>
                <p className="px-2">{ticket.end_datetime}</p>
              </div>
            </>
          )
        }
      </div>
    </Layout>
  );
};

export default TicketForInstitution;
