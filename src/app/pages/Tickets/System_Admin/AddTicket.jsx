import { yupResolver } from "@hookform/resolvers/yup";
import { Typography } from "@mui/material";
import dayjs from "dayjs";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { schemaTicket } from "../schemaTicket";
import { createTicket } from "../../../../core/thunk/ticket";
import Layout from "../../../components/Layout";
import pages from "../../../config/pages";
import TicketForm from "../TicketForm";

const AddTicket = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

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
      institution_id: null,
      price: 0, // or default to a numeric value if desired
      capacity: 0, // same as price
      benefits: "",
      is_regular: false,
      date: dayjs(),
      start_datetime: dayjs(),
      end_datetime: dayjs(),
    },
  });

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
    dispatch(createTicket(ticketData));
    reset();
  };

  return (
    <Layout>
      <div className="flex flex-row justify-between">
        <Typography variant="h5">Add ticket</Typography>
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

export default AddTicket;
