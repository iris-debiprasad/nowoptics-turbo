import {
  DATE_FORMAT,
  INPUT_MASK,
  SNACKBAR_COLOR_TYPE,
  isMobileNumberValidRegex,
} from "@root/host/src/constants/common.constants";
import {
  Order,
  PatientListToMerge,
  SelectPatientForMergeModalProps,
  SelectPatientMergeGridDataType,
} from "../../types/MergePatient.types";
import {
  Box,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Button,
  AlertColor,
  Checkbox,
  TableSortLabel,
} from "@mui/material";
import dayjs from "dayjs";
import CustomTablePagination from "../customTablePagination/CustomTablePagination";
import IconSVG from "../iconsvg/IconSVG";
import style from "./SelectPatientForMergeModal.module.scss";
import { tableQueryParams } from "@root/host/src/utils/getTableQueryParams";
import { useEffect, useState } from "react";
import { useSnackBar } from "@/contexts/Snackbar/SnackbarContext";
import { ERROR_MESSAGE } from "@root/host/src/constants/auth.constants";
import { SelectPatientForMergeHeader } from "@root/host/src/constants/mergePatient.constants";
import MergePatientModal from "./MergePatientModal";
import {
  GetPatientMergeDetails,
  GetPatientMergeGrid,
} from "@root/host/src/service/common.service";
import BackdropLoader from "../backdrop_loader/BackdropLoader";
import useAxiosLoader from "@root/host/src/hooks/useAxiosLoader";
import PrimaryModal from "../primary_modal/PrimaryModal";
import { useRouter } from "next/router";
import { IMask } from "react-imask";

const SelectPatientForMergeModal = (props: SelectPatientForMergeModalProps) => {
  const {
    setIsSelectPatientForMergeModal,
    patientIdsForMerge,
    isMergeFromDiffModule,
    setSnackBar,
  } = props;
  const [data, setData] = useState<SelectPatientMergeGridDataType[]>([]);
  const [page, setPage] = useState<number>(0);
  const [rowsPerPage, setRowsPerPage] = useState<number>(5);
  const [dataCount, setDataCount] = useState<number | null>(null);
  const [order, setOrder] = useState<Order | null>("desc");
  const [orderBy, setOrderBy] = useState<string | null>("Id");
  const { showSnackBar } = useSnackBar();
  const [mergePatientModal, setMergePatientModal] = useState(false);
  const loading = useAxiosLoader();
  const [patientListToMerge, setPatientListToMerge] = useState<
    PatientListToMerge[]
  >([]);
  const [selectedRows, setSelectedRows] = useState<number[]>([]);
  const router = useRouter();
  const maskedMobile = IMask.createMask({
    mask: INPUT_MASK.MOBILE_NUMBER,
  });

  const getMaskedPhoneNumber = (phoneNumber: string) => {
    maskedMobile.resolve(phoneNumber);
    return maskedMobile.value;
  };
  const rowsPerPageChange = (rowsPerPage: number) => {
    setPage(0);
    setRowsPerPage(rowsPerPage);
  };
  const handleClose = () => setIsSelectPatientForMergeModal(false);

  const getData = () => {
    const params = tableQueryParams(page, rowsPerPage, order, orderBy);
    const patientListParam = patientIdsForMerge.join(",");
    GetPatientMergeGrid(patientListParam, params)
      .then((res) => {
        const result = res.data?.Result;
        setData(result?.Results);
        setDataCount(result?.RowCount);
      })
      .catch((err) => {
        setDataCount(0);

        if (isMergeFromDiffModule) {
          setSnackBar &&
            setSnackBar(
              err.response
                ? err.response.data.Error.Message
                : ERROR_MESSAGE.API_DEFAULT_ERROR_MESSAGE,
              SNACKBAR_COLOR_TYPE.ERROR as AlertColor
            );
        } else {
          showSnackBar(
            err.response
              ? err.response.data.Error.Message
              : ERROR_MESSAGE.API_DEFAULT_ERROR_MESSAGE,
            SNACKBAR_COLOR_TYPE.ERROR as AlertColor
          );
        }
      });
  };
  useEffect(() => {
    getData();
  }, [page, rowsPerPage, order, orderBy]);

  function hanldeConfirmMerge() {
    GetPatientMergeDetails(selectedRows.join(","))
      .then((res) => {
        setPatientListToMerge(res.data?.Result);
        setMergePatientModal(true);
      })
      .catch((err) => {
        if (isMergeFromDiffModule) {
          setSnackBar &&
            setSnackBar(
              err.response
                ? err.response.data.Error.Message
                : ERROR_MESSAGE.API_DEFAULT_ERROR_MESSAGE,
              SNACKBAR_COLOR_TYPE.ERROR as AlertColor
            );
        } else {
          showSnackBar(
            err.response
              ? err.response.data.Error.Message
              : ERROR_MESSAGE.API_DEFAULT_ERROR_MESSAGE,
            SNACKBAR_COLOR_TYPE.ERROR as AlertColor
          );
        }
      });
  }

  const handleRequestSort = (
    event: React.MouseEvent<unknown>,
    property: string
  ) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleCheck = (row: SelectPatientMergeGridDataType) => {
    const { Id } = row;
    const isSelected = selectedRows.includes(Id);

    if (isSelected) {
      setSelectedRows(selectedRows.filter((selectedId) => selectedId !== Id));
    } else {
      setSelectedRows([...selectedRows, Id]);
    }
  };

  return (
    <Box className={style.modalContainer}>
      <BackdropLoader openLoader={loading} />
      <div className={style.headingwrapper}>
        <p className={style.headingText}>Duplicate Account Merge</p>
        <div className={style.closeIconWrapper} onClick={() => handleClose()}>
          <IconSVG
            width="12"
            height="12"
            viewBox="0 0 15 15"
            fill="#4d4d4d"
            name="modal_cross"
          />
        </div>
      </div>
      <hr className={style.lineColor} />
      <div className={`${style.tablewrapper} iris_table`}>
        <TableContainer
          sx={{ overflow: "auto" }}
          className={style.frameClubTable}
        >
          <Table sx={{ minWidth: 500 }}>
            <TableHead>
              <TableRow className={style.tableRow}>
                {SelectPatientForMergeHeader.map((header, index) => (
                  <TableCell className="tableHeadContent" key={index}>
                    <div className="textIconWrapper">
                      {header.isSort ? (
                        <div
                          data-testid={`sort-click-${header.id}`}
                          onClick={(e) => handleRequestSort(e, header.id)}
                        >
                          <TableSortLabel
                            active={orderBy === header.id}
                            direction={orderBy === header?.id ? order! : "asc"}
                          >
                            <span className="tableHeadText">{header.name}</span>
                          </TableSortLabel>
                        </div>
                      ) : (
                        <span className="tableHeadText">{header.name}</span>
                      )}
                    </div>
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {data &&
                data.length > 0 &&
                data.map((row: SelectPatientMergeGridDataType, index: any) => (
                  <TableRow key={index}>
                    <TableCell className="tableRowContent">
                      <div>
                        <Checkbox
                          color="primary"
                          checked={selectedRows.includes(row.Id)}
                          onChange={() => handleCheck(row)}
                        />
                      </div>
                    </TableCell>
                    <TableCell className="tableRowContent">
                      <span
                        className={style.activeLinkCell}
                        onClick={() =>
                          window.open(`/patient/${row.Id}`, "_blank")
                        }
                      >
                        {row.Id}
                      </span>
                    </TableCell>
                    <TableCell className="tableRowContent">
                      {row.FirstName}
                    </TableCell>
                    <TableCell className="tableRowContent">
                      {row.LastName}
                    </TableCell>
                    <TableCell className="tableRowContent">
                      {dayjs(row.DOB).format(DATE_FORMAT)}
                    </TableCell>
                    <TableCell className="tableRowContent">
                      {row.Email}
                    </TableCell>
                    <TableCell className="tableRowContent">
                      {row.Address}
                    </TableCell>
                    <TableCell className="tableRowContent">
                      {row.ZipCode}
                    </TableCell>
                    <TableCell className="tableRowContent">
                      {row.StoreNumber}
                    </TableCell>
                    <TableCell className="tableRowContent">
                      {row.StoreName}
                    </TableCell>
                    <TableCell className="tableRowContent">
                      {isMobileNumberValidRegex.test(row.PhoneNumber)
                        ? getMaskedPhoneNumber(row.PhoneNumber)
                        : row.PhoneNumber}
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
        {data && data.length > 0 && (
          <CustomTablePagination
            page={page}
            rowsPerPage={rowsPerPage}
            setRowsPerPage={rowsPerPageChange}
            setPage={setPage}
            dataCount={dataCount ? dataCount : 0}
          />
        )}
      </div>
      <div className={style.btnContainer}>
        <Button
          onClick={() => hanldeConfirmMerge()}
          className={
            selectedRows.length < 2 ? style.disabledBtn : style.confirmBtn
          }
          disabled={selectedRows.length < 2}
        >
          Confirm Merge
        </Button>
        <Button onClick={() => handleClose()} className={style.closeBtn}>
          Cancel
        </Button>
      </div>
      {mergePatientModal && patientListToMerge && (
        <PrimaryModal
          modalOpen={mergePatientModal}
          setModalOpen={setMergePatientModal}
          modalInner={
            <MergePatientModal
              setIsSelectPatientForMergeModal={setIsSelectPatientForMergeModal}
              patientListToMerge={patientListToMerge}
              setMergePatientModal={setMergePatientModal}
              isMergeFromDiffModule={isMergeFromDiffModule}
              setSnackBar={setSnackBar}
            />
          }
          cstmStyle={"mergePatientModal"}
        />
      )}
    </Box>
  );
};

export default SelectPatientForMergeModal;
