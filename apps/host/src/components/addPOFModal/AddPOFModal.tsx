import dynamic from "next/dynamic";
import Image from "next/image";
import React, { useEffect, useState } from "react";

import {
  ProductSelectionStep2TableDataResultHeader,
  addPofConstants,
} from "@root/host/src/constants/exchangeMenu.constants";
import { useSnackBar } from "@/contexts/Snackbar/SnackbarContext";
import { getPatientOrderFrameApi } from "@/service/exchangeMenu.service";
import {
  Order,
  ProductSelectionStep2TableDataResultDTO,
  SelectOption,
  addPOFFormDTO,
  remakeExchangeDTO,
} from "@root/host/src/types/exchangeMenu.types";
import { PaperCaptureUploadModalProps } from "@root/host/src/types/paperCapture.types";
import { warrantyOrderDTO } from "@root/host/src/types/warrantyOrder.types";
import {
  AlertColor,
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  FormHelperText,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableSortLabel,
  TextField,
  Typography,
} from "@mui/material";
import serachIcon from "@root/assets/Images/icons/searchIcon.svg";
import { ERROR_MESSAGE } from "@root/host/src/constants/auth.constants";
import {
  SNACKBAR_COLOR_TYPE,
  isBridgeValidRegex,
  isEyeSizeValidRegex,
  isFrameNameValidRegex,
  isNameValidRegex,
  isTempleValidRegex,
  isVeritcalLensHeightValidRegex,
} from "@root/host/src/constants/common.constants";
import { ImageUrlConstants } from "@root/host/src/constants/image.url.constants";
import useTableFilter from "@root/host/src/hooks/useTableFilter";
import { GetCommunicationType } from "@root/host/src/service/common.service";
import { useAppSelector } from "@root/host/src/store/useStore";
import { tableQueryParams } from "@root/host/src/utils/getTableQueryParams";
import { useRouter } from "next/router";

import CustomTablePagination from "../customTablePagination/CustomTablePagination";
import IconSVG from "../iconsvg/IconSVG";
import PrimaryModal from "../primary_modal/PrimaryModal";
import TableFilter from "../tableFilter/TableFilter";
import style from "./AddPOFModal.module.scss";
import PaperCaptureSkeleton from "../skeleton_loader/patient/PaperCaptureSkeleton";

const PaperCaptureUploadModal = dynamic(
  () => import("patient/PaperCaptureUploadModal"),
  { ssr: false, loading: () => <PaperCaptureSkeleton /> }
) as React.FunctionComponent<PaperCaptureUploadModalProps>;

const AddPOFModal = (props: {
  setModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setIsReload: React.Dispatch<React.SetStateAction<boolean>>;
  isReload: boolean;
  formData: remakeExchangeDTO | warrantyOrderDTO;
  setFormData:
    | React.Dispatch<React.SetStateAction<remakeExchangeDTO>>
    | React.Dispatch<React.SetStateAction<warrantyOrderDTO>>;
  handleNext: () => void;
  dataParams?: any;
  setSnackBar?: any;
}) => {
  const router = useRouter();
  const query = router.query;
  const { showSnackBar } = useSnackBar();
  const handleClose = () => props.setModalOpen(false);
  const [mountOptions, setMountOptions] = React.useState<SelectOption[]>([]);
  const getDataRedux: any = useAppSelector(
    (state: any) => state.exchangeMenu.data
  );
  const [formValues, setFormValues] = React.useState<addPOFFormDTO>({
    frameName: {
      value: "",
      error: false,
      errorMessage: addPofConstants.ERROR.REQ_FRAME_NAME,
    },
    eyeSize: {
      value: "",
      error: false,
      errorMessage: addPofConstants.ERROR.REQ_EYE_SIZE,
    },
    mount: {
      value: "0",
      error: false,
      errorMessage: addPofConstants.ERROR.REQ_MOUNT,
    },
    temple: {
      value: "",
      error: false,
      errorMessage: addPofConstants.ERROR.REQ_TEMPLE,
    },
    color: {
      value: "",
      error: false,
      errorMessage: addPofConstants.ERROR.REQ_COLOR,
    },
    bridge: {
      value: "",
      error: false,
      errorMessage: addPofConstants.ERROR.REQ_BRIDGE,
    },
    holdPOF: {
      value: false,
      error: false,
      errorMessage: addPofConstants.ERROR.HOLD_POF,
    },
    verticalLensHeight: {
      value: "",
      error: false,
      errorMessage: addPofConstants.ERROR.REQ_VERTICAL_LENS_HEIGHT,
    },
    id: {
      value: "string",
      error: false,
      errorMessage: "",
    },
  });
  const [page, setPage] = useState<number>(0);
  const [rowsPerPage, setRowsPerPage] = useState<number>(5);
  const [userSetupUserDataRowCount, setUserSetupUserDataDataRowCount] =
    useState<number>(0);
  const [order, setOrder] = React.useState<Order>("desc");
  const [orderBy, setOrderBy] = React.useState<string | null>("VariantNumber");
  const [reloadButtonDisabled, setReloadButtonDisabled] =
    useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [issearchPOF, setIssearchPOF] = useState<boolean>(false);
  const [filters, setFilter] = useState("");
  const [isReload, setIsReload] = useState(false);
  const [tableData, setTableData] = useState<
    ProductSelectionStep2TableDataResultDTO[]
  >([]);
  const [openPaperCaptureUploadModal, setOpenPaperCaptureUploadModal] =
    useState(false);
  const [getPaperCaptureUploadModalID, setPaperCaptureUploadModalID] =
    useState<number>(0);

  const { anchorEl, filterOptions, filterOpen, activeFilter, methods } =
    useTableFilter(ProductSelectionStep2TableDataResultHeader, (filters) => {
      setPage(0);
      setFilter(filters);
    });
  const handleSort = (
    fieldKey: keyof ProductSelectionStep2TableDataResultDTO
  ) => {
    const isAsc = orderBy === fieldKey && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(fieldKey);
  };
  useEffect(() => {
    if (
      getDataRedux?.formdata?.productSelectionStep2?.addPOF?.valueObject !==
        undefined &&
      getDataRedux?.formdata?.productSelectionStep2?.addPOF?.valueObject
        ?.frameName !== undefined
    ) {
      setFormValues(
        getDataRedux?.formdata?.productSelectionStep2?.addPOF?.valueObject
      );
      setIssearchPOF(false);
    } else if (
      getDataRedux?.formdata?.productSelectionStep2?.addPOF?.valueObject !==
        undefined &&
      getDataRedux?.formdata?.productSelectionStep2?.addPOF?.valueObject?.Id !==
        undefined
    ) {
      setIssearchPOF(true);
    }
  }, [getDataRedux?.formdata?.productSelectionStep2?.addPOF?.valueObject]);

  const handleChangeMount = (value: any, key: string = "") => {
    setFormValues({
      ...formValues,
      [key]: {
        ...formValues[key as keyof typeof formValues],
        value: value,
        error: false,
      },
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    let _value: boolean | string = value;
    if (name === "holdPOF") {
      _value = e.target.checked;
    } else if (
      name === "eyeSize" ||
      name === "verticalLensHeight" ||
      name === "bridge" ||
      name === "temple"
    ) {
      _value = _value.replace(/[^0-9.]/g, "");
    }
    setFormValues({
      ...formValues,
      [name]: {
        ...formValues[name as keyof typeof formValues],
        value: _value,
        error: false,
      },
    });
  };

  const handleSubmit = () => {
    const formFields = Object.keys(formValues);
    let newFormValues = { ...formValues };
    for (let index = 0; index < formFields.length; index++) {
      const currentField = formFields[index];

      if (currentField !== "holdPOF") {
        const currentValue =
          formValues[currentField as keyof typeof formValues]?.value;
        if (!currentValue) {
          newFormValues = {
            ...newFormValues,
            [currentField]: {
              ...newFormValues[currentField as keyof typeof formValues],
              error: true,
            },
          };
        } else if (
          currentField === "frameName" &&
          !isFrameNameValidRegex.test(currentValue as string)
        ) {
          newFormValues = {
            ...newFormValues,
            [currentField as string]: {
              ...newFormValues[currentField as keyof typeof formValues],
              error: true,
              errorMessage: addPofConstants.ERROR.FRAME_NAME,
            },
          };
        } else if (currentField === "mount" && currentValue === "0") {
          newFormValues = {
            ...newFormValues,
            [currentField as string]: {
              ...newFormValues[currentField as keyof typeof formValues],
              error: true,
              errorMessage: addPofConstants.ERROR.REQ_MOUNT,
            },
          };
        } else if (
          currentField === "eyeSize" &&
          !isEyeSizeValidRegex.test(currentValue as string)
        ) {
          newFormValues = {
            ...newFormValues,
            [currentField as string]: {
              ...newFormValues[currentField as keyof typeof formValues],
              error: true,
              errorMessage: addPofConstants.ERROR.EYE_SIZE,
            },
          };
        } else if (
          currentField === "verticalLensHeight" &&
          !isVeritcalLensHeightValidRegex.test(currentValue as string)
        ) {
          newFormValues = {
            ...newFormValues,
            [currentField as string]: {
              ...newFormValues[currentField as keyof typeof formValues],
              error: true,
              errorMessage: addPofConstants.ERROR.VERTICAL_LENS_HEIGHT,
            },
          };
        } else if (
          currentField === "bridge" &&
          !isBridgeValidRegex.test(currentValue as any)
        ) {
          newFormValues = {
            ...newFormValues,
            [currentField as string]: {
              ...newFormValues[currentField as keyof typeof formValues],
              error: true,
              errorMessage: addPofConstants.ERROR.BRIDGE,
            },
          };
        } else if (
          currentField === "temple" &&
          !isTempleValidRegex.test(currentValue as string)
        ) {
          newFormValues = {
            ...newFormValues,
            [currentField as string]: {
              ...newFormValues[currentField as keyof typeof formValues],
              error: true,
              errorMessage: addPofConstants.ERROR.TEMPLE,
            },
          };
        } else {
          newFormValues = {
            ...newFormValues,
            [currentField]: {
              ...newFormValues[currentField as keyof typeof formValues],
              error: false,
            },
          };
        }
      }
    }

    setFormValues(newFormValues);
    let isFormValid = true;
    if (
      newFormValues.frameName.error ||
      newFormValues.eyeSize.error ||
      newFormValues.mount.error ||
      newFormValues.temple.error ||
      newFormValues.color.error ||
      newFormValues.bridge.error ||
      newFormValues.verticalLensHeight.error ||
      newFormValues.frameName.value === "" ||
      newFormValues.eyeSize.value === "" ||
      newFormValues.mount.value === "0" ||
      newFormValues.temple.value === "" ||
      newFormValues.color.value === "" ||
      newFormValues.bridge.value === "" ||
      newFormValues.verticalLensHeight.value === ""
    ) {
      isFormValid = false;
    }
    const storePofDataInLocalStorage = {
      POFEyeSize: newFormValues.eyeSize.value,
      POFBridge: newFormValues.bridge.value,
      POFTemple: newFormValues.temple.value,
      POFVerticalLensHeight: newFormValues.verticalLensHeight.value,
      POFFrameMountId: newFormValues.mount.value,
    };
    localStorage.setItem(
      "pofFrameData",
      JSON.stringify(storePofDataInLocalStorage)
    );
    if (isFormValid) {
      props.setFormData((prev: any) => {
        return {
          ...prev,
          productSelectionStep2: {
            ...prev.productSelectionStep2,

            addPOF: {
              value: "",
              error: false,
              errorMessage: "",
              valueObject: formValues,
              isSearchPOF: issearchPOF,
            },
          },
        };
      });
      props.handleNext();
    }
  };

  useEffect(() => {
    if (getPaperCaptureUploadModalID !== 0) {
      let name = "id";
      setFormValues({
        ...formValues,
        [name]: {
          ...formValues[name as keyof typeof formValues],
          value: getPaperCaptureUploadModalID.toString(),
          error: false,
        },
      });
    }
  }, [getPaperCaptureUploadModalID]);

  const getPaitientFrameData = () => {
    const params = tableQueryParams(page, rowsPerPage, order, orderBy);
    setLoading(true);
    getPatientOrderFrameApi(
      query.patientId?.toString() ||
        props?.dataParams?.patientId?.toString() ||
        "0",
      params,
      filters || ""
    )
      .then((res: any) => {
        setTableData(res.data.Result.Results);
        setUserSetupUserDataDataRowCount(res.data.Result.RowCount);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        showSnackBar(
          err?.response
            ? err?.response?.data?.Error?.Message
            : ERROR_MESSAGE.API_DEFAULT_ERROR_MESSAGE,
          SNACKBAR_COLOR_TYPE.ERROR as AlertColor
        );
      });
  };
  const getDropdownApiCalling = async () => {
    const result = await Promise.all([GetCommunicationType("FrameMount")]);
    setMountOptions(result[0].data.Result);
  };
  useEffect(() => {
    getDropdownApiCalling();
  }, []);
  useEffect(() => {
    if (issearchPOF) getPaitientFrameData();
  }, [page, rowsPerPage, order, orderBy, isReload, filters, issearchPOF]);
  const formValidationCheck = () => {
    const formFields = Object.keys(formValues);
    let newFormValues = { ...formValues };
    for (let index = 0; index < formFields.length; index++) {
      const currentField = formFields[index];

      if (currentField !== "holdPOF") {
        const currentValue =
          formValues[currentField as keyof typeof formValues]?.value;
        if (!currentValue) {
          newFormValues = {
            ...newFormValues,
            [currentField]: {
              ...newFormValues[currentField as keyof typeof formValues],
              error: true,
            },
          };
        } else if (
          currentField === "frameName" &&
          !isNameValidRegex.test(currentValue as string)
        ) {
          newFormValues = {
            ...newFormValues,
            [currentField as string]: {
              ...newFormValues[currentField as keyof typeof formValues],
              error: true,
              errorMessage: addPofConstants.ERROR.FRAME_NAME,
            },
          };
        } else if (currentField === "mount" && currentValue === "0") {
          newFormValues = {
            ...newFormValues,
            [currentField as string]: {
              ...newFormValues[currentField as keyof typeof formValues],
              error: true,
              errorMessage: addPofConstants.ERROR.REQ_MOUNT,
            },
          };
        } else if (
          currentField === "eyeSize" &&
          !isEyeSizeValidRegex.test(currentValue as string)
        ) {
          newFormValues = {
            ...newFormValues,
            [currentField as string]: {
              ...newFormValues[currentField as keyof typeof formValues],
              error: true,
              errorMessage: addPofConstants.ERROR.EYE_SIZE,
            },
          };
        } else if (
          currentField === "verticalLensHeight" &&
          !isVeritcalLensHeightValidRegex.test(currentValue as string)
        ) {
          newFormValues = {
            ...newFormValues,
            [currentField as string]: {
              ...newFormValues[currentField as keyof typeof formValues],
              error: true,
              errorMessage: addPofConstants.ERROR.VERTICAL_LENS_HEIGHT,
            },
          };
        } else if (
          currentField === "bridge" &&
          !isBridgeValidRegex.test(currentValue as any)
        ) {
          newFormValues = {
            ...newFormValues,
            [currentField as string]: {
              ...newFormValues[currentField as keyof typeof formValues],
              error: true,
              errorMessage: addPofConstants.ERROR.BRIDGE,
            },
          };
        } else if (
          currentField === "temple" &&
          !isTempleValidRegex.test(currentValue as string)
        ) {
          newFormValues = {
            ...newFormValues,
            [currentField as string]: {
              ...newFormValues[currentField as keyof typeof formValues],
              error: true,
              errorMessage: addPofConstants.ERROR.TEMPLE,
            },
          };
        } else {
          newFormValues = {
            ...newFormValues,
            [currentField]: {
              ...newFormValues[currentField as keyof typeof formValues],
              error: false,
            },
          };
        }
      }
    }
    setFormValues(newFormValues);
  };
  const rowsPerPageChange = (rowsPerPage: number) => {
    setPage(0);
    setRowsPerPage(rowsPerPage);
  };

  const headers = () => {
    return ProductSelectionStep2TableDataResultHeader.filter((header: any) => {
      return header;
    });
  };
  const handleChangeCheck = (
    event: React.ChangeEvent<HTMLInputElement>,
    row: ProductSelectionStep2TableDataResultDTO
  ) => {
    props.setFormData((prev: any) => {
      return {
        ...prev,
        productSelectionStep2: {
          ...prev.productSelectionStep2,
          addPOF: {
            value: event.target.checked,
            error: false,
            errorMessage: "",
            valueObject: row,
            isSearchPOF: issearchPOF,
          },
        },
      };
    });
  };
  const resetPOF = () => {
    props.setFormData((prev: any) => {
      return {
        ...prev,
        productSelectionStep2: {
          ...prev.productSelectionStep2,
          addPOF: {
            value: null,
            error: false,
            errorMessage: "",
            valueObject: null,
            isSearchPOF: false,
          },
        },
      };
    });
  };
  const onUploadPaperCaptureModal = () => {
    setOpenPaperCaptureUploadModal(true);
  };
  return (
    <Box className={style.addUserRoleModalWrapper}>
      <Box className={style.modalHeader}>
        <Typography className={style.modalHeading} variant="h6" component="h4">
          {issearchPOF
            ? `Search Patient Order Frames`
            : `Add Patient Owned Frame`}
        </Typography>
        <Button
          className={style.crossBtn}
          data-testid="add-new-modal-close-button"
          onClick={() => {
            resetPOF();
            handleClose();
          }}
        >
          <IconSVG
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="var(--primary-text-color)"
            name="modal_cross"
          />
        </Button>
      </Box>
      {issearchPOF ? (
        <div className={style.formContainer}>
          <div className="iris_table">
            <TableContainer
              sx={{ overflow: "auto" }}
              className={style.pofTableContainer}
            >
              <Table sx={{ minWidth: 500 }}>
                <TableHead>
                  <TableRow>
                    {headers().map((header, index) => (
                      <TableCell key={index} className="tableHeadContent">
                        <div className="textIconWrapper">
                          {header.isSort && header.name !== "Action" ? (
                            <div
                              className="tableHeadIcons"
                              data-testid={`sort-button-${header.id}`}
                              onClick={() =>
                                handleSort(
                                  header.id as keyof ProductSelectionStep2TableDataResultDTO
                                )
                              }
                            >
                              <TableSortLabel
                                active={orderBy === header.id}
                                direction={
                                  orderBy === header.id ? order! : "asc"
                                }
                              >
                                <span className="tableHeadText">
                                  {header.name}
                                </span>
                              </TableSortLabel>
                            </div>
                          ) : (
                            <span className="tableHeadText">{header.name}</span>
                          )}

                          {header.isFilter ? (
                            <div
                              className="tableHeadIcons"
                              data-testid="filter-click"
                              onClick={(e) =>
                                methods.handleFilterClick(e, header, index)
                              }
                            >
                              <IconSVG
                                width="20"
                                height="16"
                                viewBox="0 0 20 16"
                                fill="#7B7E7B"
                                name="filter_solid_icon"
                              />
                            </div>
                          ) : null}
                        </div>
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {tableData.length > 0 ? (
                    tableData?.map(
                      (
                        row: ProductSelectionStep2TableDataResultDTO,
                        index: number
                      ) => {
                        return (
                          <TableRow
                            key={index}
                            data-testid="user-setup-user-table-rows"
                          >
                            <TableCell
                              className="tableRowContent"
                              id={style.actionBtnContainer}
                            >
                              <Checkbox
                                name="Select Frame"
                                data-testid="HoldPOF-checkbox"
                                size="small"
                                onChange={(e) => handleChangeCheck(e, row)}
                                checked={
                                  props?.formData?.productSelectionStep2?.addPOF
                                    ?.valueObject?.Id === row?.Id
                                    ? true
                                    : false
                                }
                              />
                            </TableCell>
                            <TableCell
                              className="tableRowContent"
                              data-testid={`table-cell-first-name`}
                            >
                              {row?.VariantNumber}
                            </TableCell>
                            <TableCell
                              className="tableRowContent"
                              data-testid={`table-cell-last-name`}
                            >
                              {row?.ProductName}
                            </TableCell>
                            <TableCell
                              className="tableRowContent"
                              data-testid={`table-cell-email`}
                            >
                              {row?.ManufacturerColor}
                            </TableCell>
                            <TableCell
                              className="tableRowContent"
                              data-testid={`table-cell-email`}
                            >
                              {row?.EyeSize}
                            </TableCell>
                            <TableCell
                              className="tableRowContent"
                              data-testid={`table-cell-email`}
                            >
                              {row?.Bridge}
                            </TableCell>
                            <TableCell
                              className="tableRowContent"
                              data-testid={`table-cell-email`}
                            >
                              {row?.Temple}
                            </TableCell>

                            <TableCell
                              className="tableRowContent"
                              data-testid={`table-cell-email`}
                            >
                              {row?.VerticalLensHeight}
                            </TableCell>

                            <TableCell
                              className="tableRowContent"
                              data-testid={`table-cell-email`}
                            >
                              {row?.OrderNumber}
                            </TableCell>
                          </TableRow>
                        );
                      }
                    )
                  ) : (
                    <TableRow
                      sx={{
                        "&:last-child td, &:last-child th": { border: 0 },
                      }}
                    >
                      <TableCell colSpan={5}>No Record Found</TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          </div>
          <CustomTablePagination
            dataCount={userSetupUserDataRowCount}
            page={page}
            setPage={setPage}
            setRowsPerPage={rowsPerPageChange}
            rowsPerPage={rowsPerPage}
          />
          {anchorEl ? (
            <TableFilter
              open={filterOpen}
              anchorEl={anchorEl}
              handleClose={methods.handleFilterClose}
              options={filterOptions}
              filterStateValues={activeFilter}
              setFilterStateValues={methods.setFilterStateValue}
              handleFilterClear={methods.handleFilterClear}
              data-testid="table-filter"
            />
          ) : null}
          <div className="btnconatinerr">
            <Button
              onClick={() => setIssearchPOF(false)}
              fullWidth
              variant="contained"
              sx={{ float: "left" }}
              className={style.secondaryBtnn}
            >
              Back
            </Button>
            {props.formData.productSelectionStep2?.addPOF?.valueObject
              ?.VariantNumber !== undefined && (
              <Button
                onClick={() => {
                  localStorage.setItem(
                    "POFFrameVariantId",
                    props.formData.productSelectionStep2?.addPOF?.valueObject
                      ?.ProductVariantId
                  );
                  props.handleNext();
                }}
                fullWidth
                variant="contained"
                sx={{ float: "right" }}
                className={style.addBtn}
              >
                Continue
              </Button>
            )}
          </div>
        </div>
      ) : (
        <Box
          component="form"
          noValidate
          data-testid="add-user-role-form"
          className={style.formContainer}
        >
          <Grid container spacing={"20px"} className={style.formGroup}>
            <Grid item xs={12} md={6}>
              <Grid container spacing={"20px"} className={style.formGroup}>
                <Grid item xs={12} sm={6}>
                  <div className={style.formFieldContainer}>
                    <InputLabel
                      className={style.inputLabel}
                      htmlFor="addFrameName"
                    >
                      Frame Name
                    </InputLabel>
                    <TextField
                      autoFocus={true}
                      margin="normal"
                      required
                      fullWidth
                      id="addFrameName"
                      placeholder={addPofConstants.PLACEHOLDER.FRAME_NAME}
                      name="frameName"
                      type="text"
                      inputProps={{ maxLength: 100, tabIndex: 1 }}
                      className={style.textInput}
                      value={formValues.frameName.value}
                      onChange={handleChange}
                      data-testid="add-user-frameName"
                      error={formValues.frameName.error}
                      helperText={
                        formValues.frameName.error &&
                        formValues.frameName.errorMessage
                      }
                    />
                  </div>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <div className={style.formFieldContainer}>
                    <InputLabel
                      className={style.inputLabel}
                      htmlFor="addEyeSize"
                    >
                      Eye Size
                    </InputLabel>
                    <TextField
                      margin="normal"
                      required
                      fullWidth
                      id="addEyeSize"
                      placeholder={addPofConstants.PLACEHOLDER.EYE_SIZE}
                      name="eyeSize"
                      type="text"
                      inputProps={{
                        maxLength: 10,
                        pattern: "[0-9]*",
                        tabIndex: 4,
                      }}
                      className={style.textInput}
                      value={formValues.eyeSize.value}
                      onChange={handleChange}
                      data-testid="add-user-eyeSize"
                      error={formValues.eyeSize.error}
                      helperText={
                        formValues.eyeSize.error &&
                        formValues.eyeSize.errorMessage
                      }
                    />
                  </div>
                </Grid>

                <Grid item xs={12} sm={6}>
                  <div className={style.formFieldContainer}>
                    <InputLabel
                      className={style.inputLabel}
                      htmlFor="addEyeSize"
                    >
                      Mount
                    </InputLabel>
                    <Select
                      labelId="bIMount"
                      id="bIMount"
                      name="mount"
                      onChange={(e) =>
                        handleChangeMount(e?.target?.value, "mount")
                      }
                      inputProps={{ tabIndex: 2 }}
                      className={style.selectInput}
                      data-testid="doctor-type-id"
                      displayEmpty
                      size="small"
                      value={formValues.mount.value}
                      error={formValues.mount.error}
                    >
                      <MenuItem
                        value="0"
                        key="0"
                        className={style.menuItem}
                        disabled
                      >
                        {" "}
                        Select Mount
                      </MenuItem>
                      {mountOptions?.map((option: SelectOption) => {
                        return (
                          <MenuItem value={option.Id} key={option.Id}>
                            {option.Description}
                          </MenuItem>
                        );
                      })}
                    </Select>
                    {formValues.mount.error && (
                      <FormHelperText className={style.errorHelperText}>
                        {formValues.mount.errorMessage}
                      </FormHelperText>
                    )}
                  </div>
                </Grid>

                <Grid item xs={12} sm={6}>
                  <div className={style.formFieldContainer}>
                    <InputLabel
                      className={style.inputLabel}
                      htmlFor="addBridge"
                    >
                      Bridge
                    </InputLabel>
                    <TextField
                      margin="normal"
                      required
                      fullWidth
                      id="addBridge"
                      placeholder={addPofConstants.PLACEHOLDER.BRIDGE}
                      name="bridge"
                      type="text"
                      inputProps={{
                        maxLength: 10,
                        pattern: "[0-9]*",
                        tabIndex: 5,
                      }}
                      className={style.textInput}
                      value={formValues.bridge.value}
                      onChange={handleChange}
                      data-testid="add-user-bridge"
                      error={formValues.bridge.error}
                      helperText={
                        formValues.bridge.error &&
                        formValues.bridge.errorMessage
                      }
                    />
                  </div>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <div className={style.formFieldContainer}>
                    <InputLabel className={style.inputLabel} htmlFor="addColor">
                      Color
                    </InputLabel>
                    <TextField
                      margin="normal"
                      required
                      fullWidth
                      id="addColor"
                      placeholder={addPofConstants.PLACEHOLDER.COLOR}
                      name="color"
                      type="text"
                      inputProps={{ maxLength: 100, tabIndex: 3 }}
                      className={style.textInput}
                      value={formValues.color.value}
                      onChange={handleChange}
                      data-testid="add-user-color"
                      error={formValues.color.error}
                      helperText={
                        formValues.color.error && formValues.color.errorMessage
                      }
                    />
                  </div>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <div className={style.formFieldContainer}>
                    <InputLabel
                      className={style.inputLabel}
                      htmlFor="addTemple"
                    >
                      Temple
                    </InputLabel>
                    <TextField
                      margin="normal"
                      required
                      fullWidth
                      id="addTemple"
                      placeholder={addPofConstants.PLACEHOLDER.TEMPLE}
                      name="temple"
                      type="text"
                      inputProps={{
                        maxLength: 10,
                        pattern: "[0-9]*",
                        tabIndex: 6,
                      }}
                      className={style.textInput}
                      value={formValues.temple.value}
                      onChange={handleChange}
                      data-testid="add-user-temple"
                      error={formValues.temple.error}
                      helperText={
                        formValues.temple.error &&
                        formValues.temple.errorMessage
                      }
                    />
                  </div>
                </Grid>

                <Grid item xs={12} sm={6}>
                  <Box className={style.checkBoxContainer}>
                    <FormControlLabel
                      className={style.checkBoxLabel}
                      control={
                        <Checkbox
                          name="holdPOF"
                          className={style.checkBox}
                          data-testid="HoldPOF-checkbox"
                          size="small"
                          onChange={handleChange}
                          checked={formValues.holdPOF.value}
                        />
                      }
                      label={
                        <span className={style.checkBoxLabelText}>
                          Hold POF
                        </span>
                      }
                    />
                  </Box>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <div className={style.formFieldContainer}>
                    <InputLabel
                      className={style.inputLabel}
                      htmlFor="addVerticalLensHeight"
                    >
                      Vertical Height
                    </InputLabel>
                    <TextField
                      margin="normal"
                      required
                      fullWidth
                      id="addVerticalLensHeight"
                      placeholder={
                        addPofConstants.PLACEHOLDER.VERTICAL_LENS_HEIGHT
                      }
                      name="verticalLensHeight"
                      type="text"
                      inputProps={{
                        maxLength: 10,
                        pattern: "[0-9]*",
                        tabIndex: 7,
                      }}
                      className={style.textInput}
                      value={formValues.verticalLensHeight.value}
                      onChange={handleChange}
                      data-testid="add-user-verticalLensHeight"
                      error={formValues.verticalLensHeight.error}
                      helperText={
                        formValues.verticalLensHeight.error &&
                        formValues.verticalLensHeight.errorMessage
                      }
                    />
                  </div>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12} md={6}>
              {openPaperCaptureUploadModal && (
                <PrimaryModal
                  modalOpen={openPaperCaptureUploadModal}
                  setModalOpen={setOpenPaperCaptureUploadModal}
                  modalInner={
                    <PaperCaptureUploadModal
                      setOpenPaperCaptureUploadModal={
                        setOpenPaperCaptureUploadModal
                      }
                      headingText={"Paper Capture"}
                      patientId={
                        query.patientId?.toString() ||
                        props?.dataParams?.patientId?.toString() ||
                        "0"
                      }
                      dragNDropText={"prescription"}
                      setPaperCaptureUploadModalID={
                        setPaperCaptureUploadModalID
                      }
                      setSnackbar={props.setSnackBar}
                    />
                  }
                  cstmStyle={"patientPaperCaptureUploadModal"}
                />
              )}

              <Stack spacing={2}>
                <div>
                  <Button
                    className={style.prevbtn}
                    onClick={onUploadPaperCaptureModal}
                  >
                    <IconSVG
                      width="14"
                      height="15"
                      viewBox="0 0 56 56"
                      fill="#7B7E7B"
                      name="scan_icon"
                    />
                    <span className={style.searchbtnPrevious}>
                      Scan Picture
                    </span>
                  </Button>

                  <Button
                    className={style.prevbtn}
                    onClick={() => setIssearchPOF(true)}
                  >
                    <Image
                      src={serachIcon}
                      width={14}
                      height={15}
                      alt="search-icon"
                    />
                    <span className={style.searchbtnPrevious}>
                      Search Previous Order Frames
                    </span>
                  </Button>
                </div>
                <div>
                  <Image
                    src={ImageUrlConstants.ADD_POF_IMG_V1}
                    alt="Guide1"
                    height={250}
                    width={480}
                  />
                </div>
              </Stack>
            </Grid>
          </Grid>

          <Button
            onClick={handleSubmit}
            fullWidth
            variant="contained"
            className={`${style.addBtn} rightAlignedActionBtn`}
          >
            Add POF
          </Button>
        </Box>
      )}
    </Box>
  );
};

export default AddPOFModal;
