import CloseIcon from "@mui/icons-material/Close";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import SearchIcon from "@mui/icons-material/Search";
import { InputAdornment, TextField, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Controller, FormProvider, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getInstitutions } from "../../../core/reducers/institution/institutionSlice";
import {
  getInstitutionList
} from "../../../core/thunk/institution";
import ButtonBox from "../../components/Button/ButtonBox";
import ConfirmDialog from "../../components/Dialog/ConfirmDialog";
import Layout from "../../components/Layout";
import MenuAction from "../../components/Table/MenuAction";
import TableTemplate from "../../components/Table/TableTemplate";
import { institution_status } from "../../config/Constant";
import pages from "../../config/pages";

const headCells = [
  { id: "name", label: "Name", minWidth: 130 },
  { id: "email", label: "Email", minWidth: 140 },
  {
    id: "phone",
    label: "Phone",
    minWidth: 100,
  },
  {
    id: "address",
    label: "Address",
    minWidth: 150,
  },
  {
    id: "status",
    label: "Status",
    minWidth: 150,
  },
  {
    id: "action",
    label: "",
    minWidth: 10,
  },
];

const Institutions = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const institutions = useSelector(getInstitutions);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [rows, setRows] = useState([]);
  const [openConfirmDialog, setOpenConfirmDialog] = React.useState(false);
  const [institutionId, setInstitutionId] = React.useState(null);

  const defaultValues = {
    name: "",
  };

  const methods = useForm({
    defaultValues,
  });

  useEffect(() => {
    dispatch(getInstitutionList());
  }, [dispatch]);

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

    if (institutions && Array.isArray(institutions)) {
      dataSearch = filterData(institutions || [], search?.name);
    }
    const institutionData = dataSearch.map((data) => {
      const institution_id = data?.institution_id;
      const actionSubmenu = [];

      actionSubmenu.push(
        {
          icon: <RemoveRedEyeIcon fontSize="small" sx={{ color: "black" }} />,
          link: institution_id
            ? () => {
                console.log();
                navigate(`${pages.institutionsPath}/${institution_id}`);
              }
            : null,
        },
        {
          icon: <EditIcon fontSize="small" sx={{ color: "black" }} />,
          link: institution_id
            ? () => {
                navigate(`${pages.institutionsPath}/${institution_id}/edit`);
              }
            : null,
        },
        {
          icon: <DeleteIcon fontSize="small" sx={{ color: "black" }} />,
          onClick: () => {
            setOpenConfirmDialog(true);
            setInstitutionId(institution_id);
          },
        }
      );

      return {
        name: data?.name,
        email: data?.email,
        phone: data?.phone,
        address: data?.address,
        status:
          data?.status === 0
            ? institution_status[0].value
            : institution_status[1].value,
        action: <MenuAction submenu={actionSubmenu} />,
      };
    });

    setRows(institutionData);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  useEffect(() => {
    if (institutions) {
      onSearch(getValues());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [institutions]);

  return (
    <>
      <Layout>
        <Typography variant="h5">Institutions Page</Typography>
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
                        placeholder="Enter institution name"
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
                onClick={() => navigate(pages.addInstitutionPath)}
              >
                Create Institution
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
        atr="organization"
        open={openConfirmDialog}
        setOpen={setOpenConfirmDialog}
        institutionId={institutionId}
        setInstitutionId={setInstitutionId}
      />
    </>
  );
};

export default Institutions;
