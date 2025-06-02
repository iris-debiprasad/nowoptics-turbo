import {
  ALLOWED_HIPPA_FILE_TYPES,
  DEFAULT_EMPTY_TABLE_MESSAGE,
  HIPPA_FILE_ERRORS,
} from "@root/intake/src/constants/intake.constants";
import { HIPPA_LANGUAGE_FORM_COLUMNS } from "@root/intake/src/constants/intakeTable.constants";
import {
  useGetDefaultHippaFormsQuery,
  useUploadDefaultHippaFileMutation,
} from "@root/host/src/store/reducer/intakeApi.slice";
import {
  HippaFormTableProps,
  StateTableFileUpload,
} from "@root/host/src/types/Intake.types";
import {
  ErrorResponseType,
  GetDefaultHippaTableState,
  GetDefaultStateHippaFilesSortFields,
} from "@root/host/src/types/intakeApi.types";
import { TableSortLabel, Tooltip } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import FormUploadIcon from "@root/assets/Images/icons/form-upload.svg";
import FormDownloadIcon from "@root/assets/Images/icons/form-download.svg";
import { IconDTO } from "@root/host/src/types/IconSVG.types";
import type { CustomTablePaginationDTO } from "@root/host/src/types/customTablePagination.types";
import dynamic from "next/dynamic";
import Image from "next/image";
import { FunctionComponent, memo, useState, useRef } from "react";
import styles from "../HippaForms.module.scss";
import { useSnackBar } from "@root/intake/src/context/SnackbarContext";
import { ERROR_MESSAGE } from "@root/host/src/constants/auth.constants";
import { GetPermissionConfig } from "@root/host/src/config/permissionConfig";
import { IntakePermission } from "@root/intake/src/constants/intake-permission.constant";
import { useAppSelector } from "@root/host/src/hooks/useStore";
// const CustomTablePagination = dynamic(
//   () => import("host/CustomTablePagination"),
//   { ssr: false }
// ) as FunctionComponent<CustomTablePaginationDTO>;
import CustomTablePagination from "@root/host/src/components/customTablePagination/CustomTablePagination";
// const IconSVG = dynamic(() => import("host/IconSVG"), {
//   ssr: false,
// }) as FunctionComponent<IconDTO>;
import IconSVG from "@root/host/src/components/iconsvg/IconSVG";

const DefaultTable: FunctionComponent<HippaFormTableProps> = ({
  handleDownloadHippaFile,
}) => {
  const [canUploadDefaultHipaa] = useAppSelector((state) =>
    GetPermissionConfig({
      ...state,
      permissionName: [IntakePermission.HIPAA.UPLOAD_DEFAULT_HIPAA],
    })
  ) as boolean[];
  const { showSnackBar } = useSnackBar();
  const inputFileRef = useRef<HTMLInputElement>(null);
  const [defaultHippaPage, setDefaultHippaPage] = useState(0);
  const [defaultHippaPageSize, setDefaultHippaPageSize] = useState(5);
  const [defaultHippaState, setDefaultHippaState] =
    useState<GetDefaultHippaTableState>({
      sortDescending: false,
      sortField: "Id",
    });
  const [fileUpload, setFileUpload] = useState<
    Omit<StateTableFileUpload, "stateId">
  >({
    inputKey: Date.now(),
    code: "en-US",
  });
  const [uploadFile] = useUploadDefaultHippaFileMutation();
  const { data: defaultHippaData } = useGetDefaultHippaFormsQuery({
    filter: "",
    pageNumber: defaultHippaPage + 1,
    pageSize: defaultHippaPageSize,
    sortDescending: defaultHippaState.sortDescending,
    sortField: defaultHippaState.sortField,
  });

  const handleRequestSort = (property: string) => {
    setDefaultHippaState({
      ...defaultHippaState,
      sortDescending:
        defaultHippaState.sortField === property
          ? !defaultHippaState.sortDescending
          : false,
      sortField: property as GetDefaultStateHippaFilesSortFields,
    });
  };

  const rowsPerPageChange = (rowsPerPage: number) => {
    setDefaultHippaPage(0);
    setDefaultHippaPageSize(rowsPerPage);
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
        formData.append("code", fileUpload.code);
        const result = await uploadFile({
          code: fileUpload.code,
          file,
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

  const handleOpenFileDialog = (code: StateTableFileUpload["code"]) => {
    inputFileRef?.current?.click();
    setFileUpload({
      inputKey: Date.now(),
      code,
    });
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
                {HIPPA_LANGUAGE_FORM_COLUMNS.map((header, index) => (
                  <TableCell key={index} className="tableHeadContent">
                    <div className="textIconWrapper">
                      <div className="tableHeadIcons">
                        {header.isSort ? (
                          <div
                            data-testid={`sort-click-${header.id}`}
                            onClick={() => handleRequestSort(header.id)}
                          >
                            <TableSortLabel
                              active={defaultHippaState.sortField === header.id}
                              direction={
                                defaultHippaState.sortField === header.id ? defaultHippaState.sortDescending ? "desc" : "asc" : "asc"
                              }
                            >
                              <span className="tableHeadText">{header.name}</span>
                            </TableSortLabel>
                          </div>
                        ) : <span className="tableHeadText">{header.name}</span>
                      }
                      </div>
                    </div>
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {defaultHippaData?.Result?.Results.map((row, index) => {
                return (
                  <TableRow key={index}>
                    <TableCell className="tableRowContent">
                      {row.Description}
                    </TableCell>
                    <TableCell className="tableRowContent">
                      <div className={styles.formActionTableCell}>
                        <Tooltip title="Download Hipaa File">
                          <IconButton
                            className={`${
                              row.FilePath.length === 0
                                ? styles.disabledDownloadLink
                                : null
                            }`}
                            data-testid="download-hippa-file"
                            disabled={row.FilePath.length === 0}
                            onClick={() =>
                              handleDownloadHippaFile(row.Id, "Default")
                            }
                          >
                            <Image
                              width={10}
                              height={10}
                              src={FormDownloadIcon}
                              alt="form-action-icon"
                            />
                          </IconButton>
                        </Tooltip>
                        {canUploadDefaultHipaa && (
                          <Tooltip title="Upload Hipaa File">
                            <IconButton
                              onClick={() =>
                                handleOpenFileDialog(
                                  row.Code.split(
                                    "_"
                                  )[1] as StateTableFileUpload["code"]
                                )
                              }
                            >
                              <Image
                                width={14}
                                height={14}
                                src={FormUploadIcon}
                                alt="form-action-icon"
                              />
                            </IconButton>
                          </Tooltip>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                );
              })}
              {defaultHippaData?.Result.Results.length === 0 && (
                <span className={styles.emptyTableMessage}>
                  {DEFAULT_EMPTY_TABLE_MESSAGE}
                </span>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <CustomTablePagination
          dataCount={defaultHippaData?.Result.RowCount!}
          rowsPerPage={defaultHippaPageSize}
          page={defaultHippaPage}
          setPage={setDefaultHippaPage}
          setRowsPerPage={(num: number) => rowsPerPageChange(num)}
        />
      </div>
    </>
  );
};

export default memo(DefaultTable);
