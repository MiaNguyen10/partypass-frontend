import { yupResolver } from "@hookform/resolvers/yup";
import { Typography } from "@mui/material";
import dayjs from "dayjs";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { getTicket } from "../../../../core/reducers/ticket/ticketSlice";
import { getTicketById, updateTicket } from "../../../../core/thunk/ticket";
import { schemaTicket } from "../schemaTicket";
import Layout from "../../../components/Layout";
import pages from "../../../config/pages";
import TicketForm from "../TicketForm";

const EditTicket = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const ticket = useSelector(getTicket);

  useEffect(() => {
    dispatch(getTicketById(id));
  }, [dispatch, id]);

  const {
    handleSubmit,
    control,
    formState: { errors: formErrors },
    reset,
    watch,
  } = useForm({
    resolver: yupResolver(schemaTicket),
    defaultValues: {
      name: "",
      description: "",
      institution_id: "",
      price: 0, // or default to a numeric value if desired
      capacity: 0, // same as price
      benefits: "",
      is_regular: false,
      date: dayjs(),
      start_datetime: dayjs(),
      end_datetime: dayjs(),
    },
  });

  //get ticket by id
  useEffect(() => {
    if (ticket) {
      // Reset form with ticket data
      reset({
        name: ticket.name || "",
        description: ticket.description || "",
        institution_id: ticket.institution_id || null,
        price: ticket.price || 0,
        capacity: ticket.capacity || 0,
        benefits: ticket.benefits || "",
        is_regular: ticket.is_regular === 1 ? true : false,
        date: ticket.is_regular ? "" : dayjs(ticket.date),
        start_datetime: ticket.is_regular ? "" : ticket.start_datetime,
        end_datetime: ticket.is_regular ? "" : ticket.end_datetime,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ticket]);

  const onSubmit = (data) => {
    const ticketData = {
      ...data,
      institution_id: parseInt(data.institution_id, 10),
      price: parseFloat(data.price),
      capacity: parseInt(data.capacity, 10),
      is_regular: data.is_regular ? 1 : 0,
      date: data.is_regular ? "" : data.date,
      start_datetime: data.is_regular ? "" : data.start_datetime,
      end_datetime: data.is_regular ? "" : data.end_datetime,
    };
    
    dispatch(updateTicket({ ticket_id: id, ticketData }))
      .then(() => {
        dispatch(getTicketById(id));
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <Layout>
      <div className="flex flex-row justify-between">
        <Typography variant="h5">Edit ticket</Typography>
        <p
          className="italic text-cyan-600 cursor-pointer text-sm"
          onClick={() => navigate(pages.ticketsPath)}
        >
          Go back Tickets page
        </p>
      </div>
      <TicketForm
        handleSubmit={handleSubmit}
        onSubmit={onSubmit}
        control={control}
        formErrors={formErrors}
        watch={watch}
      />
    </Layout>
  );
};

export default EditTicket;
