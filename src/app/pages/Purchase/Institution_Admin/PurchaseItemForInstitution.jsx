import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Typography } from "@mui/material";
import dayjs from "dayjs";
import { selectPurchaseInfo } from "../../../../core/reducers/purchase/purchaseSlice";
import { getTicket } from "../../../../core/reducers/ticket/ticketSlice";
import { getUser } from "../../../../core/reducers/user/userSlice";
import { getPurchaseById } from "../../../../core/thunk/purchase";
import { getUserById } from "../../../../core/thunk/user";
import { getTicketById } from "../../../../core/thunk/ticket";
import { ticket_status } from "../../../config/Constant";
import Layout from "../../../components/Layout";
import pages from "../../../config/pages";

const PurchaseItem = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const purchaseItem = useSelector(selectPurchaseInfo);
  const ticketItem = useSelector(getTicket);
  const user = useSelector(getUser);
  const [ticketStatus, setTicketStatus] = useState("");

  useEffect(() => {
    dispatch(getPurchaseById(id));
  }, [dispatch, id]);

  useEffect(() => {
    if (purchaseItem) {
      dispatch(getUserById({ user_id: purchaseItem.user_id }));
      dispatch(getTicketById(purchaseItem.ticket_id));
      setTicketStatus(
        ticket_status.find((status) => status.id === purchaseItem.ticket_status)
      );
    }
  },[dispatch, purchaseItem]);

  return (
    <Layout>
      <div className="flex flex-row justify-between">
        <Typography variant="h5">Purchase details</Typography>
        <div className="flex flex-row">
          <p
            className="italic text-cyan-600 cursor-pointer text-sm"
            onClick={() => navigate(pages.purchasePath)}
          >
            Go back Purchase page
          </p>
        </div>
      </div>
      <div className="grid gap-4 py-3">
        <div className="flex flex-wrap">
          <p className="font-bold">User name:</p>
          <p className="px-2">{user.name}</p>
        </div>
        <div className="flex flex-wrap">
          <p className="font-bold">Ticket name:</p>
          <p className="px-2">{ticketItem.name}</p>
        </div>
        <div className="flex flex-wrap">
          <p className="font-bold">Purchase date:</p>
          <p className="px-2">{dayjs(purchaseItem.purchase_date).format("DD-MM-YYYY HH:ss")}</p>
        </div>
        <div className="flex flex-wrap">
          <p className="font-bold">Ticket date:</p>
          <p className="px-2">{dayjs(purchaseItem.ticket_date).format("DD-MM-YYYY HH:ss")}</p>
        </div>
        <div className="flex flex-wrap">
          <p className="font-bold">Ticket price:</p>
          <p className="px-2">{purchaseItem.price_amount}</p>
        </div>
        <div className="flex flex-wrap">
          <p className="font-bold">Payment status:</p>
          <p className="px-2">{purchaseItem.payment_status}</p>
        </div>
        <div className="flex flex-wrap">
          <p className="font-bold">Payment method:</p>
          <p className="px-2">{purchaseItem.payment_method}</p>
        </div>
        <div className="flex flex-wrap">
          <p className="font-bold">Ticket status:</p>
          <p className="px-2">{ticketStatus.value}</p>
        </div>
      </div>
    </Layout>
  );
};

export default PurchaseItem;
