// import DeleteIcon from "@mui/icons-material/Delete";
import CloseIcon from "@mui/icons-material/Close";
import EditIcon from "@mui/icons-material/Edit";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import SearchIcon from "@mui/icons-material/Search";
import { InputAdornment, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { Controller, FormProvider, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getInstitutions } from "../../../core/reducers/institution/institutionSlice";
import { getUsers } from "../../../core/reducers/user/userSlice";
import { getInstitutionList } from "../../../core/thunk/institution";
import { getUserList } from "../../../core/thunk/user";
import ButtonBox from "../../components/Button/ButtonBox";
import Layout from "../../components/Layout";
import MenuAction from "../../components/Table/MenuAction";
import TableTemplate from "../../components/Table/TableTemplate";
import { roles } from "../../config/Constant";
import pages from "../../config/pages";

const headCells = [
  { id: "name", label: "User name", minWidth: 200 },
  { id: "email", label: "Email", minWidth: 140 },
  {
    id: "phone",
    label: "Phone",
    minWidth: 100,
  },
  // {
  //   id: "date_of_birth",
  //   label: "DOB",
  //   minWidth: 100,
  // },
  {
    id: "role",
    label: "Role",
    minWidth: 150,
  },
  {
    id: "institution",
    label: "Institution",
    minWidth: 150,
  },
  {
    id: "action",
    label: "",
    minWidth: 20,
  },
];

const Users = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const institutions = useSelector(getInstitutions);
  const users = useSelector(getUsers);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [rows, setRows] = useState([]);

  useEffect(() => {
    dispatch(getUserList());
  }, [dispatch]);

  useEffect(() => {
    if (users) {
      dispatch(getInstitutionList());
    }
  }, [dispatch, users]);

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

    if (users && Array.isArray(users)) {
      dataSearch = filterData(users || [], search?.name);
    }
    const userData = dataSearch.map((data) => {
      const userId = data?.user_id;
      const actionSubmenu = [];
      const institution = institutions.find(
        (institution) =>
          institution.institution_id === Number(data?.institution_id)
      );

      actionSubmenu.push(
        {
          icon: <RemoveRedEyeIcon fontSize="small" sx={{ color: "black" }} />,
          link: userId
            ? () => {
                navigate(`${pages.usersPath}/${userId}`);
              }
            : null,
        },
        {
          icon: <EditIcon fontSize="small" sx={{ color: "black" }} />,
          link: userId
            ? () => {
                navigate(`${pages.usersPath}/${userId}/edit`);
              }
            : null,
        },
        // {
        //   icon: <DeleteIcon fontSize="small" sx={{ color: "black" }} />,
        //   onClick: () => {
        //     console.log("Delete ticket");
        //   },
        // }
      );

      return {
        name: data?.name,
        email: data?.email,
        phone: data?.phone,
        role: roles.find((role) => role.id === data?.role)?.value,
        institution: institution?.name,
        action: <MenuAction submenu={actionSubmenu} />,
      };
    });

    setRows(userData);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  useEffect(() => {
    if (users) {
      onSearch(getValues());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [users]);

  return (
    <>
      <Layout>
        <Typography variant="h5">Users Page</Typography>
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
                        placeholder="Enter user name"
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
                onClick={() => navigate(pages.addUsersPath)}
              >
                Create users
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

export default Users;
