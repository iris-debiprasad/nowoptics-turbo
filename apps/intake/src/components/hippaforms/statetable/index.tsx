import { HIPPA_STATE_FORM_COLUMNS } from "@/constants/intakeTable.constants";
import {
  useGetAllHippaFormsQuery,
  useUploadStateHippaFileMutation,
} from "@root/host/src/store/reducer/intakeApi.slice";
import {
  HippaFormTableProps,
  StateTableFileUpload,
} from "@root/host/src/types/Intake.types";
import {
  ErrorResponseType,
  GetAllHippaTableState,
  GetAllStateHippaFilesSortFields,
  GetDefaultStateHippaFilesSortFields,
} from "@root/host/src/types/intakeApi.types";
import IconButton from "@mui/material/IconButton";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import FormUploadIcon from "@root/assets/Images/icons/form-upload.svg";
import type { CustomTablePaginationDTO } from "@root/host/src/types/customTablePagination.types";
import dynamic from "next/dynamic";
import Image from "next/image";
import { FunctionComponent, memo, useRef, useState } from "react";
import styles from "../HippaForms.module.scss";

import {
  ALLOWED_HIPPA_FILE_TYPES,
  DEFAULT_EMPTY_TABLE_MESSAGE,
  HIPPA_FILE_ERRORS,
} from "@/constants/intake.constants";
import { useSnackBar } from "@/context/SnackbarContext";
import { TableSortLabel, Tooltip } from "@mui/material";
import { ERROR_MESSAGE } from "@root/host/src/constants/auth.constants";
import { IconDTO } from "@root/host/src/types/IconSVG.types";
import { useAppSelector } from "@root/host/src/hooks/useStore";
import { GetPermissionConfig } from "@root/host/src/config/permissionConfig";
import { IntakePermission } from "@/constants/intake-permission.constant";
import { TableFilterDTO } from "@root/host/src/types/TableFilter.types";
import useTableFilter from "@root/host/src/hooks/useTableFilter";
const CustomTablePagination = dynamic(
  () => import("host/CustomTablePagination"),
  { ssr: false }
) as FunctionComponent<CustomTablePaginationDTO>;
const IconSVG = dynamic(() => import("host/IconSVG"), {
  ssr: false,
}) as FunctionComponent<IconDTO>;
const TableFilter = dynamic(() => import("host/TableFilter"), {
  ssr: false,
}) as React.FunctionComponent<TableFilterDTO>;

const StateTable: FunctionComponent<HippaFormTableProps> = ({
  handleDownloadHippaFile,
}) => {
  const [canUploadStateFile] = useAppSelector((state) =>
    GetPermissionConfig({
      ...state,
      permissionName: [IntakePermission.HIPAA.UPLOAD_STATE_HIPAA],
    })
  ) as boolean[];
  const { showSnackBar } = useSnackBar();
  const inputFileRef = useRef<HTMLInputElement>(null);
  const [fileUpload, setFileUpload] = useState<StateTableFileUpload>({
    inputKey: Date.now(),
    stateId: -1,
    code: "en-US",
  });
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [order, setOrder] = useState<"asc" | "desc">("asc");
  const [orderBy, setOrderBy] = useState<GetAllStateHippaFilesSortFields>("Name");
  const [filters, setFilter] = useState("");

  const [uploadFile] = useUploadStateHippaFileMutation();
  const { data: allHippaData } = useGetAllHippaFormsQuery({
    filters: filters,
    pageNumber: page + 1,
    pageSize: rowsPerPage,
    sortDescending: order === "desc",
    sortField: orderBy,
  });
  const { anchorEl, filterOptions, filterOpen, activeFilter, methods } =
  useTableFilter(HIPPA_STATE_FORM_COLUMNS, (filters) => {
    setPage(0);
    setFilter(filters);
  });

  const handleRequestSort = (
    _: unknown,
    property: GetAllStateHippaFilesSortFields
  ) => {
    setOrder(order === "asc" ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleOpenFileDialog = (stateId: number, code: "en-US" | "es-ES") => {
    inputFileRef?.current?.click();
    setFileUpload({
      inputKey: Date.now(),
      code,
      stateId,
    });
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    try {
      const file = e.target.files?.[0];
      if (file === undefined) return;
      const fileExtension = file.name.slice(
        (Math.max(0, file.name.lastIndexOf(".")) || Infinity) + 1
      );
      if (
        ALLOWED_HIPPA_FILE_TYPES.findIndex((type) => type === fileExtension) ===
        -1
      ) {
        showSnackBar(HIPPA_FILE_ERRORS.INVALID_FILE_TYPE, "error");
        return;
      }
      if (file) {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("stateId", fileUpload.stateId.toString());
        formData.append("code", fileUpload.code);
        const result = await uploadFile({
          code: fileUpload.code,
          file,
          stateId: fileUpload.stateId,
        }).unwrap();
        if (result.Error) {
          showSnackBar(
            result.Error.Message ?? ERROR_MESSAGE.API_DEFAULT_ERROR_MESSAGE,
            "error"
          );
          return;
        }
        showSnackBar(result.SuccessMessage, "success");
        if(inputFileRef.current) inputFileRef.current.value = "";
      }
    } catch (error) {
      showSnackBar(
        (error as ErrorResponseType)?.data?.SuccessMessage ??
          ERROR_MESSAGE.API_DEFAULT_ERROR_MESSAGE,
        "error"
      );
    }
  };

  const rowsPerPageChange = (rowsPerPage: number) => {
    setPage(0);
    setRowsPerPage(rowsPerPage);
  };

  return (
    <>
      <input
        type="file"
        style={{ display: "none" }}
        onChange={handleFileUpload}
        data-testid="file-upload"
        ref={inputFileRef}
      />
      <div className="iris_table">
        <TableContainer sx={{ overflow: "auto" }}>
          <Table sx={{ minWidth: 500 }}>
            <TableHead>
              <TableRow>
                {HIPPA_STATE_FORM_COLUMNS.map((header, index) => (
                  <TableCell key={index} className="tableHeadContent">
                    <div className="textIconWrapper">
                      {header.isSort ? (
                        <div
                          className="tableHeadIcons"
                          data-testid={`sort-click-${header.id}`}
                          onClick={(e) =>
                            handleRequestSort(
                              e,
                              header.id as GetAllStateHippaFilesSortFields
                            )
                          }
                        >
                          <TableSortLabel
                            active={orderBy === header.id}
                            direction={orderBy === header.id ? order : "asc"}
                          >
                            <span className="tableHeadText">{header.name}</span>
                          </TableSortLabel>
                        </div>
                      ) : (
                        <span className="tableHeadText">{header.name}</span>
                      )}
                      {header.isFilter ? (
                        <div
                          onClick={(e) =>
                            methods.handleFilterClick(e, header, index)
                          }
                          className={`${styles.insurancePlansTableHeadIcons} tableHeadIcons`}
                          data-testid={`filter-icon-${header.id}`}
                          aria-label="Filter icon"
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
              {allHippaData?.Result.Results.map((row, index) => {
                const [
                  { HippaFormId: englishHippaFormid },
                  { HippaFormId: spanishHippaFormId },
                ] = row.HippaForms;
                return (
                  <TableRow key={index}>
                    <TableCell className="tableRowContent">
                      {row.Name}
                    </TableCell>
                    <TableCell className="tableRowContent">
                      <div className={styles.languageActionCell}>
                        <div>
                          <Tooltip title="Download English Hippa File">
                            <span
                              data-testid="download-english-hippa-file"
                              className={`${
                                !englishHippaFormid &&
                                styles.disabledDownloadLink
                              }`}
                              onClick={() =>
                                handleDownloadHippaFile(
                                  row.HippaForms[0].HippaFormId,
                                  "State"
                                )
                              }
                            >
                              English
                            </span>
                          </Tooltip>
                          {canUploadStateFile && (
                            <Tooltip title="Upload English Hippa File">
                              <IconButton
                                data-testid="upload-english-hippa-file"
                                onClick={() =>
                                  handleOpenFileDialog(row.Id, "en-US")
                                }
                              >
                                <Image
                                  width={14}
                                  height={14}
                                  src={FormUploadIcon}
                                  alt="form-download-icon"
                                />
                              </IconButton>
                            </Tooltip>
                          )}
                        </div>
                        <div>
                          <Tooltip title="Download Spanish Hippa File">
                            <span
                              data-testid="download-spanish-hippa-file"
                              className={`${
                                !spanishHippaFormId &&
                                styles.disabledDownloadLink
                              }`}
                              onClick={() =>
                                handleDownloadHippaFile(
                                  row.HippaForms[1].HippaFormId,
                                  "State"
                                )
                              }
                            >
                              Spanish
                            </span>
                          </Tooltip>
                          {canUploadStateFile && (
                            <Tooltip title="Upload Spanish Hippa File">
                              <IconButton
                                data-testid="upload-spanish-hippa-file"
                                onClick={() =>
                                  handleOpenFileDialog(row.Id, "es-ES")
                                }
                              >
                                <Image
                                  width={16}
                                  height={16}
                                  src={FormUploadIcon}
                                  alt="form-download-icon"
                                />
                              </IconButton>
                            </Tooltip>
                          )}
                        </div>
                      </div>
                    </TableCell>
                  </TableRow>
                );
              })}
              {allHippaData?.Result.Results.length === 0 && (
                <span className={styles.emptyTableMessage}>
                  {DEFAULT_EMPTY_TABLE_MESSAGE}
                </span>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <CustomTablePagination
          dataCount={allHippaData?.Result.RowCount!}
          rowsPerPage={rowsPerPage}
          page={page}
          setPage={setPage}
          setRowsPerPage={rowsPerPageChange}
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
          />
        ) : null}
      </div>
    </>
  );
};

export default memo(StateTable);
