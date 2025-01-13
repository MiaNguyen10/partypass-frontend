import { Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import Layout from "../../components/Layout";
import TableTemplate from "../../components/Table/TableTemplate";
import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectPurchaseList } from "../../../core/reducers/purchase/purchaseSlice";
import { getPurchaseList } from "../../../core/thunk/purchase";
import pages from "../../config/pages";
import { getTicketList } from "../../../core/thunk/ticket";
import { getTickets } from "../../../core/reducers/ticket/ticketSlice";
import { getUserList } from "../../../core/thunk/user";
import { getUsers } from "../../../core/reducers/user/userSlice";
import MenuAction from "../../components/Table/MenuAction";
import { ticket_status } from "../../config/Constant";
import dayjs from "dayjs";

const headCells = [
  { id: "user_name", label: "User name", minWidth: 130 },
  { id: "ticket_name", label: "Ticket name", minWidth: 140 },
  {
    id: "purchase_date",
    label: "Purchase date",
    minWidth: 100,
  },
  {
    id: "ticket_date",
    label: "Ticket date",
    minWidth: 150,
  },
  {
    id: "price_amount",
    label: "Price",
    minWidth: 150,
  },
  {
    id: "ticket_status",
    label: "Ticket status",
    minWidth: 150,
  },
  {
    id: "action",
    label: "",
    minWidth: 10,
  },
];

const PurchaseList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const purchaseList = useSelector(selectPurchaseList);
  const tickets = useSelector(getTickets);
  const users = useSelector(getUsers);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [rows, setRows] = useState([]);

  useEffect(() => {
    dispatch(getPurchaseList());
  }, [dispatch]);

  useEffect(() => {
    if (purchaseList.length > 0) {
      dispatch(getTicketList());
      dispatch(getUserList());
    }
  }, [dispatch, purchaseList]);

  // Create lookups for tickets and users
  const ticketLookup = useMemo(() => {
    const map = {};
    tickets.forEach((ticket) => {
      map[ticket.id] = ticket;
    });
    return map;
  }, [tickets]);

  const userLookup = useMemo(() => {
    const map = {};
    users.forEach((user) => {
      map[user.user_id] = user;
    });
    return map;
  }, [users]);
  
  const purchaseListData = useMemo(() => {
    return purchaseList.map((purchaseData) => {
      const purchase_id = purchaseData.purchase_id;
      const ticket = ticketLookup[purchaseData.ticket_id];
      const user = userLookup[purchaseData.user_id];

      const actionSubmenu = [];
      actionSubmenu.push({
        icon: <RemoveRedEyeIcon fontSize="small" sx={{ color: "black" }} />,
        link: purchase_id
          ? () => {
              navigate(`${pages.purchasePath}/${purchase_id}`);
            }
          : null,
      });

      return {
        user_name: user?.name,
        ticket_name: ticket?.name,
        purchase_date: dayjs(purchaseData.purchase_date).format("DD-MM-YYYY HH:ss"),
        ticket_date: dayjs(purchaseData.ticket_date).format("DD-MM-YYYY HH:ss"),
        price_amount: purchaseData.price_amount,
        ticket_status: ticket_status.find((status) => status.id === purchaseData.ticket_status)?.value || "",
        action: <MenuAction submenu={actionSubmenu} />,
      };
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [purchaseList, ticketLookup, userLookup]);

  useEffect(() => {
    setRows(purchaseListData);
  }, [purchaseListData]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Layout>
      <Typography variant="h5">Purchase Page</Typography>
      <br />
      <TableTemplate
        headCells={headCells}
        rows={rows}
        page={page}
        rowsPerPage={rowsPerPage}
        handleChangePage={handleChangePage}
        handleChangeRowsPerPage={handleChangeRowsPerPage}
      />
    </Layout>
  );
};

export default PurchaseList;
