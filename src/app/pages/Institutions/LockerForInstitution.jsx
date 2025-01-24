import CloseIcon from "@mui/icons-material/Close";
import SearchIcon from "@mui/icons-material/Search";
import { InputAdornment, TextField, Typography } from "@mui/material";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import { useEffect, useState } from "react";
import { Controller, FormProvider, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { getInstitution } from "../../../core/reducers/institution/institutionSlice";
import { getLockersByInstitution } from "../../../core/reducers/locker/lockerSlice";
import { getInstitutionById } from "../../../core/thunk/institution";
import { getLockerListByInstitution } from "../../../core/thunk/locker";
import ButtonBox from "../../components/Button/ButtonBox";
import Layout from "../../components/Layout";
import TableTemplate from "../../components/Table/TableTemplate";
import { locker_status } from "../../config/Constant";
import MenuAction from "../../components/Table/MenuAction";
import pages from "../../config/pages";

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

const LockerForInstitution = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const lockers = useSelector(getLockersByInstitution);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [rows, setRows] = useState([]);
  const institution = useSelector(getInstitution);

  const defaultValues = {
    locker_number: "",
    institution: "",
  };

  const methods = useForm({
    defaultValues,
  });

  useEffect(() => {
    dispatch(getLockerListByInstitution({ institution_id: id }));
  }, [dispatch, id]);

  useEffect(() => {
    if (lockers) {
      if (id) {
        dispatch(getInstitutionById(id));
      }
    }
  }, [dispatch, id, lockers]);

  const { handleSubmit, control, getValues, reset } = methods;

  const filterData = (data, locker_number) => {
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

          return matchesLocker;
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

      actionSubmenu.push(
        {
          icon: <RemoveRedEyeIcon fontSize="small" sx={{ color: "black" }} />,
          link: lockerId
            ? () => {
                navigate(`${pages.lockersPath}/${lockerId}`);
              }
            : null,
        },
      );
      return {
        locker_number: data?.locker_number,
        institution: institution?.name,
        status:
          data?.status == 0 ? locker_status[0].value : locker_status[1].value,
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
    <Layout>
      <div className="flex flex-row justify-between">
        <Typography variant="h5">Lockers of Institution</Typography>
        <p
          className="italic text-cyan-600 cursor-pointer text-sm"
          onClick={() => navigate(-1)}
        >
          Go back
        </p>
      </div>

      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSearch)}>
          <div className="flex flex-row pt-5 space-x-3">
            <div className="flex-1">
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
            </div>
            <ButtonBox type="submit" variant="outlined">
              Search
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
  );
};

export default LockerForInstitution;
