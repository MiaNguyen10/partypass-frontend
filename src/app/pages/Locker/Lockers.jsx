import CloseIcon from "@mui/icons-material/Close";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import SearchIcon from "@mui/icons-material/Search";
import { InputAdornment, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { Controller, FormProvider, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import ButtonBox from "../../components/Button/ButtonBox";
import Layout from "../../components/Layout";
import MenuAction from "../../components/Table/MenuAction";
import TableTemplate from "../../components/Table/TableTemplate";
import pages from "../../config/pages";
import { institutions } from "../Institutions/sampleData";
import { lockers } from "./sampleData";

const headCells = [
  { id: "locker_number", label: "Locker number", minWidth: 200 },
  { id: "institution", label: "Institution", minWidth: 200 },
  {
    id: "status",
    label: "Locker status",
    minWidth: 150,
  },
  {
    id: "action",
    label: "",
    minWidth: 10,
  },
];

const Lockers = () => {
  const navigate = useNavigate();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [rows, setRows] = useState([]);

  const defaultValues = {
    locker_number: "",
    institution: "",
  };

  const methods = useForm({
    defaultValues,
  });

  const { handleSubmit, control, getValues, reset } = methods;

  const filterData = (data, locker_number, institution) => {
    const institutionInput = institution?.toLowerCase();
    const lockerNumberInput = locker_number
      ? locker_number.toString().toLowerCase()
      : null;

    return data && Array.isArray(data)
      ? data.filter((filterData) => {
          const matchesLocker = lockerNumberInput
            ? filterData?.locker_number
                .toString()
                .toLowerCase()
                .includes(lockerNumberInput)
            : true;

          const matchesInstitution = institutionInput
            ? institutions
                .find(
                  (inst) => inst.institution_id === filterData.institution_id
                )
                ?.name.toLowerCase()
                .includes(institutionInput)
            : true;

          return matchesLocker && matchesInstitution;
        })
      : [];
  };

  const onSearch = (search) => {
    let dataSearch = [];

    if (lockers && Array.isArray(lockers)) {
      dataSearch = filterData(
        lockers || [],
        search?.locker_number,
        search?.institution
      );
    }
    const lockerData = dataSearch.map((data) => {
      const lockerId = data?.id;
      const actionSubmenu = [];
      const institution = institutions.find(
        (institution) =>
          institution.institution_id === Number(data?.institution_id)
      );

      actionSubmenu.push(
        // {
        //   icon: <RemoveRedEyeIcon fontSize="small" sx={{ color: "black" }} />,
        //   link: lockerId
        //     ? () => {
        //         navigate(`${pages.lockersPath}/${lockerId}`);
        //       }
        //     : null,
        // },
        {
          icon: <EditIcon fontSize="small" sx={{ color: "black" }} />,
          link: lockerId
            ? () => {
                navigate(`${pages.lockersPath}/${lockerId}/edit`);
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
        locker_number: data?.locker_number,
        institution: institution?.name,
        status: data?.status,
        action: <MenuAction submenu={actionSubmenu} />,
      };
    });

    setRows(lockerData);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  useEffect(() => {
    if (lockers) {
      onSearch(getValues());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lockers]);

  return (
    <>
      <Layout>
        <Typography variant="h5">Lockers Page</Typography>

        <FormProvider {...methods}>
          <form onSubmit={handleSubmit(onSearch)}>
            <div className="pt-5 grid grid-cols-6 gap-2">
              <Controller
                name="locker_number"
                control={control}
                render={({
                  field: { onChange, value },
                  fieldState: { error },
                }) => (
                  <TextField
                    name="locker_number"
                    type="text"
                    className="col-span-2"
                    value={value}
                    placeholder="Enter locker number"
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
                )}
              />
              <Controller
                name="institution"
                control={control}
                render={({
                  field: { onChange, value },
                  fieldState: { error },
                }) => (
                  <TextField
                    name="institution"
                    type="text"
                    className="col-span-2"
                    value={value}
                    placeholder="Enter institution"
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
                )}
              />
              <ButtonBox type="submit" variant="outlined">
                Search
              </ButtonBox>
              <ButtonBox
                variant="outlined"
                onClick={() => navigate(pages.addLockerPath)}
              >
                Create locker
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

export default Lockers;
