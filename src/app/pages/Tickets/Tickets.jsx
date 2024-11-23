import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import SearchIcon from "@mui/icons-material/Search";
import { InputAdornment, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { Controller, FormProvider, useForm } from "react-hook-form";

import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";
import ButtonBox from "../../components/Button/ButtonBox";
import Layout from "../../components/Layout";
import MenuAction from "../../components/Table/MenuAction";
import TableTemplate from "../../components/Table/TableTemplate";
import pages from "../../config/pages";

const headCells = [
  { id: "ticketName", label: "Name", minWidth: 250 },
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
    id: "startDate",
    label: "Date start",
    minWidth: 150,
  },
  {
    id: "endDate",
    label: "Date end",
    minWidth: 150,
  },
  {
    id: "action",
    minWidth: 10,
  },
];

const Tickets = () => {
  const navigate = useNavigate();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [rows, setRows] = useState([]);
  const ticketList = [
    {
      id: 1,
      ticketName: "Ticket 1",
      institutionName: "Institution 1",
      price: 100000,
      capacity: 100,
      startDate: "2022-01-01",
      endDate: "2022-01-02",
      createDt: "2022-01-01T00:00:00",
    },
    {
      id: 2,
      ticketName: "Ticket 2",
      institutionName: "Institution 2",
      price: 200000,
      capacity: 200,
      startDate: "2022-02-01",
      endDate: "2022-02-02",
      createDt: "2022-02-01T00:00:00",
    },
    {
      id: 3,
      ticketName: "Ticket 3",
      institutionName: "Institution 3",
      price: 300000,
      capacity: 300,
      startDate: "2022-03-01",
      endDate: "2022-03-02",
      createDt: "2022-03-01T00:00:00",
    },
  ];

  const defaultValues = {
    ticketName: "",
  };

  const methods = useForm({
    defaultValues,
  });

  const { handleSubmit, control, getValues } = methods;

  const filterData = (data, ticketName) => {
    const input = ticketName?.toLowerCase();

    return data && Array.isArray(data)
      ? data.filter((filterData) =>
          input ? filterData?.ticketName.toLowerCase().includes(input) : true
        )
      : [];
  };

  const onSearch = (search) => {
    let dataSearch = [];

    if (ticketList && Array.isArray(ticketList)) {
      dataSearch = filterData(ticketList || [], search?.ticketName);
    }
    const ticketData = dataSearch.map((data) => {
      const ticketId = data?.id;
      const actionSubmenu = [];

      actionSubmenu.push(
        {
          icon: <EditIcon fontSize="small" sx={{ color: "black" }} />,
          link: ticketId
            ? () => {
                navigate(`${pages.ticketsPath}/${ticketId}/edit`);
              }
            : null,
        },
        {
          icon: <DeleteIcon fontSize="small" sx={{ color: "black" }} />,
          onClick: () => {
            console.log("Delete ticket");
          },
        }
      );

      return {
        ticketName: data?.ticketName,
        institution: data?.institutionName,
        price: data?.price,
        capacity: data?.capacity,
        startDate: dayjs(data?.startDate).format("DD-MM-YY HH:mm"),
        endDate: dayjs(data?.endDate).format("DD-MM-YY HH:mm"),
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
    if (ticketList) {
      onSearch(getValues());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ticketList]);

  return (
    <>
      <Layout>
        <Typography variant="h5">Tickets Page</Typography>
        <FormProvider {...methods}>
          <form onSubmit={handleSubmit(onSearch)}>
            <div className="flex flex-row pt-5">
              <div className="flex-1">
                <Controller
                  name="ticketName"
                  control={control}
                  render={({
                    field: { onChange, value },
                    fieldState: { error },
                  }) => (
                    <div>
                      <TextField
                        name="ticketName"
                        type="text"
                        id="outlined-basic input-with-icon-textfield"
                        value={value}
                        placeholder="Enter ticket name"
                        onChange={onChange}
                        error={!!error}
                        autoComplete="off"
                        fullWidth
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <SearchIcon />
                            </InputAdornment>
                          ),
                          sx: { height: 35 },
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
                  onClick={() => navigate(pages.addTicketPath)}
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
    </>
  );
};

export default Tickets;
