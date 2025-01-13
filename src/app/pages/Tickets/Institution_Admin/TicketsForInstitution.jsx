import CloseIcon from "@mui/icons-material/Close";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import SearchIcon from "@mui/icons-material/Search";
import { InputAdornment, TextField, Typography } from "@mui/material";
import dayjs from "dayjs";
import { jwtDecode } from "jwt-decode";
import React, { useEffect, useState } from "react";
import { Controller, FormProvider, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  getInstitutions,
  getTicketListFromSpecificInstitution,
} from "../../../../core/reducers/institution/institutionSlice";
import {
  getInstitutionList,
  getTicketListFromInstitution,
} from "../../../../core/thunk/institution";
import ButtonBox from "../../../components/Button/ButtonBox";
import ConfirmDialog from "../../../components/Dialog/ConfirmDialog";
import Layout from "../../../components/Layout";
import MenuAction from "../../../components/Table/MenuAction";
import TableTemplate from "../../../components/Table/TableTemplate";
import pages from "../../../config/pages";

const headCells = [
  { id: "name", label: "Name", minWidth: 250 },
  { id: "institution", label: "Institution", minWidth: 140 },
  {
    id: "price",
    label: "Price",
    minWidth: 100,
  },
  {
    id: "capacity",
    label: "Capacity",
    minWidth: 100,
  },
  {
    id: "date",
    label: "Date",
    minWidth: 120,
  },
  {
    id: "start_datetime",
    label: "Time start",
    minWidth: 120,
  },
  {
    id: "end_datetime",
    label: "End time",
    minWidth: 120,
  },
  {
    id: "action",
    label: "",
    minWidth: 10,
  },
];

const TicketsForInstitution = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { institution_id } = jwtDecode(sessionStorage.getItem("token"));
  const institutionTickets = useSelector(getTicketListFromSpecificInstitution);
  const institutions = useSelector(getInstitutions);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [rows, setRows] = useState([]);
  const [openConfirmDialog, setOpenConfirmDialog] = React.useState(false);
  const [ticketId, setTicketId] = React.useState(null);

  useEffect(() => {
    dispatch(getTicketListFromInstitution(institution_id));

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [institution_id]);

  useEffect(() => {
    if (institutionTickets?.length > 0) {
      dispatch(getInstitutionList());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [institutionTickets]);

  const defaultValues = {
    name: "",
  };

  const methods = useForm({
    defaultValues,
  });

  const { handleSubmit, control, getValues, reset } = methods;

  const filterData = (data, name) => {
    const input = name?.toLowerCase();

    return data && Array.isArray(data)
      ? data.filter((filterData) =>
          input ? filterData?.name.toLowerCase().includes(input) : true
        )
      : [];
  };

  const onSearch = (search) => {
    let dataSearch = [];

    if (institutionTickets && Array.isArray(institutionTickets)) {
      dataSearch = filterData(institutionTickets || [], search?.name);
    }
    const ticketData = dataSearch.map((data) => {
      const ticketId = data?.ticket_id;
      const actionSubmenu = [];
       // Preprocess once, e.g., when institutions data is loaded:
       const institutionMap = new Map(
        institutions.map((inst) => [inst.institution_id, inst])
      );

      // Then during lookup:
      const institution = institutionMap.get(Number(data?.institution_id));

      actionSubmenu.push(
        {
          icon: <RemoveRedEyeIcon fontSize="small" sx={{ color: "black" }} />,
          link: ticketId
            ? () => {
                navigate(`${pages.ticketsPathForInstitution}/${ticketId}`);
              }
            : null,
        },
        {
          icon: <EditIcon fontSize="small" sx={{ color: "black" }} />,
          link: ticketId
            ? () => {
                navigate(`${pages.ticketPathForInstitution}/${ticketId}/edit`);
              }
            : null,
        },
        {
          icon: <DeleteIcon fontSize="small" sx={{ color: "black" }} />,
          onClick: () => {
            setOpenConfirmDialog(true);
            setTicketId(ticketId);
          },
        }
      );

      return {
        name: data?.name,
        institution: institution.name,
        price: data?.price,
        capacity: data?.capacity,
        date: data?.is_regular
          ? "Regular event"
          : dayjs(data?.date).format("DD/MM/YYYY"),
        start_datetime: data?.is_regular
          ? "Regular event"
          : data?.start_datetime,
        end_datetime: data?.is_regular ? "Regular event" : data?.end_datetime,
        action: <MenuAction submenu={actionSubmenu} />,
      };
    });

    setRows(ticketData);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  useEffect(() => {
    if (institutionTickets) {
      onSearch(getValues());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [institutionTickets]);

  return (
    <>
      <Layout>
        <Typography variant="h5">Tickets Page</Typography>
        <FormProvider {...methods}>
          <form onSubmit={handleSubmit(onSearch)}>
            <div className="flex flex-row pt-5">
              <div className="flex-1">
                <Controller
                  name="name"
                  control={control}
                  render={({
                    field: { onChange, value },
                    fieldState: { error },
                  }) => (
                    <div>
                      <TextField
                        name="name"
                        type="text"
                        id="outlined-basic input-with-icon-textfield"
                        value={value}
                        placeholder="Enter ticket name"
                        onChange={onChange}
                        error={!!error}
                        autoComplete="off"
                        fullWidth
                        slotProps={{
                          input: {
                            startAdornment: (
                              <InputAdornment position="start">
                                <SearchIcon />
                              </InputAdornment>
                            ),
                            endAdornment: (
                              <InputAdornment position="end">
                                <CloseIcon
                                  onClick={() => reset()}
                                  className="cursor-pointer"
                                />
                              </InputAdornment>
                            ),
                            sx: { height: 35 },
                          },
                        }}
                        variant="outlined"
                      />
                    </div>
                  )}
                />
              </div>
              <div className="px-3">
                <ButtonBox type="submit" variant="outlined">
                  Search
                </ButtonBox>
              </div>
              <ButtonBox
                variant="outlined"
                onClick={() => navigate(pages.addTicketPathForInstitution)}
              >
                Create ticket
              </ButtonBox>
            </div>
          </form>
        </FormProvider>
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
      <ConfirmDialog
        atr="ticket"
        open={openConfirmDialog}
        setOpen={setOpenConfirmDialog}
        ticketId={ticketId}
        setTicketId={setTicketId}
      />
    </>
  );
};

export default TicketsForInstitution;
