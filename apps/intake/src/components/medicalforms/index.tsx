import { IntakePermission } from "@root/intake/src/constants/intake-permission.constant";
import {
  DATE_TIME_ISO,
  DEFAULT_EMPTY_TABLE_MESSAGE,
  MEDICAL_FORM_ERRORS,
} from "@root/intake/src/constants/intake.constants";
import { MEDICAL_FORM_COLUMNS } from "@root/intake/src/constants/intakeTable.constants";
import { SnackBarProvider, useSnackBar } from "@root/intake/src/context/SnackbarContext";
import { GetApiLoadingState } from "@root/host/src/store/reducer/intake.selector";
import {
  RESET_INTAKE_FORM,
  RESET_PATIENT_INTAKE_FORM,
  SET_AVAILIBILITY_MODAL_PROPERTY,
} from "@root/host/src/store/reducer/intake.slice";
import {
  useCopyIntakeFormMutation,
  useGetAllMedicalFormsQuery,
  usePublishIntakeFormMutation,
} from "@root/host/src/store/reducer/intakeApi.slice";
import { FormDialogActions } from "@root/host/src/types/Intake.types";
import type {
  ErrorResponseType,
  GetMedicalFormSortFields,
} from "@root/host/src/types/intakeApi.types";
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableSortLabel,
  Tooltip,
} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import FormViewIcon from "@root/assets/Images/icons/form-all.svg";
import FormCheckIcon from "@root/assets/Images/icons/form-check.svg";
import FormEditIcon from "@root/assets/Images/icons/form-create.svg";
import FormPublish from "@root/assets/Images/icons/form-publish.svg";
import FormCopyIcon from "@root/assets/Images/icons/icon-copy.svg";
import { GetPermissionConfig } from "@root/host/src/config/permissionConfig";
import { ERROR_MESSAGE } from "@root/host/src/constants/auth.constants";
import {
  DATE_FORMAT,
  DEBOUNCE_TIME_FOR_FUNCTION,
  isAlphaNumericWithSpace,
} from "@root/host/src/constants/common.constants";
import usePermission from "@root/host/src/hooks/usePermission";
import useTableFilter from "@root/host/src/hooks/useTableFilter";
import { store } from "@root/host/src/store/store";
import type { BreadcrumbProps } from "@root/host/src/types/Breadcrumb.types";
import { PrimaryModalDTO } from "@root/host/src/types/PrimaryModal.types";
import type { TableFilterDTO } from "@root/host/src/types/TableFilter.types";
import TableFilter from "@root/host/src/components/tablefilter/TableFilter";
import dayjs from "dayjs";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { Fragment, FunctionComponent, useState } from "react";
import { Provider, batch } from "react-redux";
import { IconDTO } from "../../../../host/src/types/IconSVG.types";
import { CustomTablePaginationDTO } from "../../../../host/src/types/customTablePagination.types";
import AvailibilityModal from "../availibilitymodal";
import Dialog from "../common/dialog";
import Input from "../common/input";
import Previewintake from "../previewintake";
import styles from "./MedicalForms.module.scss";
import { useAppDispatch, useAppSelector } from "@root/host/src/hooks/useStore";
import { ConfirmationModalProps } from "@root/host/src/types/confirmationModal.types";
import BackdropLoader  from "@root/host/src/components/backdrop_loader/BackdropLoader";
import Breadcrumb  from "@root/host/src/components/breadcrumb/Breadcrumb";
import  PrimaryModal  from "@root/host/src/components/primary_modal/PrimaryModal";
import  IconSVG  from "@root/host/src/components/iconsvg/IconSVG";
import ConfirmationModal from "@root/host/src/components/confirmationModal/ConfirmationModal";
import CustomTablePagination from "@root/host/src/components/customTablePagination/CustomTablePagination";
import Image from "next/image";

const MedicalForms = () => {
  const [canPublishForm, canCopyForm] = useAppSelector((state) =>
    GetPermissionConfig({
      ...state,
      permissionName: [
        IntakePermission.MEDICAL_FORMS.PUBLISH_FORM,
        IntakePermission.MEDICAL_FORMS.COPY_FORM,
      ],
    })
  ) as boolean[];
  const isLoading = useAppSelector((state) => GetApiLoadingState({ ...state }));
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { showSnackBar } = useSnackBar();
  const { open } = useAppSelector((state) => state.intake.formAvailibility);
  const [previewModal, setPreviewModal] = useState({
    open: false,
    templateId: "",
  });
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [order, setOrder] = useState<"asc" | "desc">("desc");
  const [orderBy, setOrderBy] = useState<GetMedicalFormSortFields>("Id");
  const [filters, setFilter] = useState("");
  const [formCopyError, setFormCopyError] = useState("");
  const [formDialogAction, setFormDialogAction] = useState<FormDialogActions>({
    type: "Publish",
    code: "",
    open: false,
    templateId: "",
  });

  // Debounce the parameters (example with manual timeout)
  const [debouncedParams, setDebouncedParams] = useState({
    rowsPerPage,
    order,
    orderBy,
    page,
    filters,
  });

  React.useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedParams({ rowsPerPage, order, orderBy, page, filters });
    }, DEBOUNCE_TIME_FOR_FUNCTION);

    return () => clearTimeout(handler); // Cleanup the timeout
  }, [rowsPerPage, order, orderBy, page, filters]);

  const { data, refetch } = useGetAllMedicalFormsQuery({
    pageSize: debouncedParams.rowsPerPage,
    sortDescending: debouncedParams.order === "desc",
    sortField: debouncedParams.orderBy,
    pageNumber: debouncedParams.page + 1,
    filters: debouncedParams.filters,
  });

  const [publishTemplate] = usePublishIntakeFormMutation();
  const [copyTemplate] = useCopyIntakeFormMutation();

  const handleRequestSort = (
    _: unknown,
    property: GetMedicalFormSortFields
  ) => {
    setOrder(order === "asc" ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleAvailibilityModal = (
    templateId: number,
    templateCode: string
  ) => {
    batch(() => {
      dispatch(
        SET_AVAILIBILITY_MODAL_PROPERTY({
          key: "open",
          value: true,
        })
      );
      dispatch(
        SET_AVAILIBILITY_MODAL_PROPERTY({
          key: "templateId",
          value: templateId,
        })
      );
      dispatch(
        SET_AVAILIBILITY_MODAL_PROPERTY({
          key: "templateCode",
          value: templateCode,
        })
      );
    });
  };

  const rowsPerPageChange = (rowsPerPage: number) => {
    setPage(0);
    setRowsPerPage(rowsPerPage);
  };

  const handleFormDialogToggle = (payload: FormDialogActions) => {
    setFormDialogAction(payload);
  };

  const handleFormDialogConfirm = async (type: FormDialogActions["type"]) => {
    const row = data?.Result.Results.find(
      (row) => row.Id.toString() === formDialogAction.templateId
    );

    try {
      if (type === "Publish") {
        const result = await publishTemplate({
          templateId: formDialogAction.templateId,
        }).unwrap();
        if (result.Error) {
          showSnackBar(
            result.Error.Message ?? ERROR_MESSAGE.API_DEFAULT_ERROR_MESSAGE,
            "error"
          );
          return;
        }
        setFormDialogAction({
          type: "Publish",
          code: "",
          open: false,
          templateId: "",
        });
        showSnackBar(result.SuccessMessage, "success");
        return;
      }

      if (!formDialogAction.code) {
        setFormCopyError(MEDICAL_FORM_ERRORS.REQUIRED_FORM_CODE);
        return;
      }

      if (formDialogAction.code === row?.Code) {
        setFormCopyError(MEDICAL_FORM_ERRORS.DUPLICATE_FORM_CODE);
        return;
      }

      if (!isAlphaNumericWithSpace.test(formDialogAction.code)) {
        setFormCopyError(MEDICAL_FORM_ERRORS.INVALID_FORM_CODE);
        return;
      }

      const result = await copyTemplate({
        templateId: formDialogAction.templateId,
        code: formDialogAction.code,
      }).unwrap();

      if (result.Error) {
        showSnackBar(
          result.Error.Message ?? ERROR_MESSAGE.API_DEFAULT_ERROR_MESSAGE,
          "error"
        );
        return;
      }
      showSnackBar(result.SuccessMessage, "success");
      setFormDialogAction({
        type: "Publish",
        code: "",
        open: false,
        templateId: "",
      });
      setFormCopyError("");
      return;
    } catch (error) {
      showSnackBar(
        (error as ErrorResponseType)?.data?.Error?.Message ??
          ERROR_MESSAGE.API_DEFAULT_ERROR_MESSAGE,
        "error"
      );
    }
  };

  const handleFormEdit = (templateId: string) => {
    router.push(`/intake/setup?templateId=${templateId}`);
  };

  const handlePreviewModalToggle = (open: boolean, templateId: string) => {
    setPreviewModal({
      open,
      templateId,
    });
    if (!open) {
      dispatch(RESET_PATIENT_INTAKE_FORM());
    }
  };

  const handleChangeRoute = () => {
    dispatch(RESET_INTAKE_FORM());
    router.replace("/intake/setup");
  };

  const { anchorEl, filterOptions, filterOpen, activeFilter, methods } =
    useTableFilter(MEDICAL_FORM_COLUMNS, (filters) => {
      setPage(0);
      setFilter(filters);
    });

  const handleReload = () => {
    if (
      page !== 0 ||
      order !== "desc" ||
      orderBy !== "Id" ||
      rowsPerPage !== 5 ||
      filters !== ""
    ) {
      methods.reset();
      setOrder("desc");
      setOrderBy("Id");
      setRowsPerPage(5);
      setPage(0);
    } else {
      refetch();
    }
  };

  return (
    <Fragment>
      <BackdropLoader openLoader={isLoading} />
      <Breadcrumb
        links={[
          {
            label: "Home",
            href: "/",
          },
          {
            label: "Medical Form",
            href: "/intake",
          },
        ]}
      />
      <div className={styles.medicalFormsPage}>
        <div className={styles.pageHeader}>
          <p>
            Medical Forms
            <span className="iris_table_heading">
              <Button
                className={styles.reloadButton}
                onClick={handleReload}
                data-testid="reload-button"
                aria-labelledby="refresh_button"
              >
                <IconSVG
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="#7B7E7B"
                  name="refresh_button"
                />
              </Button>
            </span>
          </p>
        </div>
        <div className={`cardSection ${styles.medicalFormsContainer}`}>
          <div className={styles.header}>
            <span className="iris_table_heading"></span>
            <div>
              <Link href="/intake/hipaa" className={styles.viewHippaBtn}>
                View Privacy and Consent
              </Link>
              <button
                onClick={handleChangeRoute}
                aria-label="route-change-btn"
                className={styles.addNewButton}
              >
                ADD NEW
              </button>
            </div>
          </div>
          <div className="iris_table">
            <TableContainer sx={{ overflow: "auto" }}>
              <Table sx={{ minWidth: 500 }}>
                <TableHead>
                  <TableRow>
                    {MEDICAL_FORM_COLUMNS.map((header, index) => (
                      <TableCell key={index} className="tableHeadContent">
                        <div className="textIconWrapper">
                          {header.isSort ? (
                            <div
                              className="tableHeadIcons"
                              data-testid={`sort-click-${header.id}`}
                              onClick={(e) =>
                                handleRequestSort(
                                  e,
                                  header.id as GetMedicalFormSortFields
                                )
                              }
                            >
                              <TableSortLabel
                                active={orderBy === header.id}
                                direction={
                                  orderBy === header.id ? order : "asc"
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
                  {data?.Result.Results.map((row, index) => {
                    return (
                      <TableRow key={index}>
                        <TableCell className="tableRowContent">
                          {row.Id}
                        </TableCell>
                        <TableCell className="tableRowContent">
                          {row.Code}
                        </TableCell>
                        <TableCell className="tableRowContent">
                          {row.Status}
                        </TableCell>
                        <TableCell className="tableRowContent">
                          {dayjs(row.CreatedOn).format(DATE_FORMAT)}
                        </TableCell>
                        <TableCell className="tableRowContent">
                          {dayjs(row.PublishedDate).isValid()
                            ? dayjs(row.PublishedDate).format(DATE_FORMAT)
                            : ""}
                        </TableCell>
                        <TableCell className="tableRowContent">
                          {dayjs(row.ModifiedOn).isValid()
                            ? dayjs(row.ModifiedOn).format(DATE_FORMAT)
                            : ""}
                        </TableCell>
                        <TableCell className="tableRowContent">
                          {row.ModifiedBy}
                        </TableCell>
                        <TableCell className="tableRowContent">
                          <div className={styles.formActionTableCell}>
                            <div>
                              <Tooltip title="View Template">
                                <IconButton
                                  data-testid="view-icon-button"
                                  onClick={() =>
                                    handlePreviewModalToggle(
                                      true,
                                      row.Id.toString()
                                    )
                                  }
                                >
                                  <Image
                                    width={14}
                                    height={14}
                                    src={FormViewIcon}
                                    alt="form-view-icon"
                                  />
                                </IconButton>
                              </Tooltip>
                            </div>
                            <div>
                              {row.Status == "Draft" && (
                                <>
                                  <Tooltip title="Edit Template">
                                    <IconButton
                                      data-testid="edit-icon-button"
                                      onClick={() =>
                                        handleFormEdit(row.Id.toString())
                                      }
                                    >
                                      <Image
                                        width={14}
                                        height={14}
                                        src={FormEditIcon}
                                        alt="form-edit-icon"
                                      />
                                    </IconButton>
                                  </Tooltip>
                                </>
                              )}
                            </div>
                            <div>
                              {(row.Status === "Published" ||
                                row.Status === "Published Inactive" ||
                                row.Status === "Unpublished") &&
                                canCopyForm && (
                                  <Tooltip title="Copy Template">
                                    <IconButton
                                      data-testid="copy-icon-button"
                                      onClick={() =>
                                        handleFormDialogToggle({
                                          code: "",
                                          open: true,
                                          templateId: row.Id.toString(),
                                          type: "Copy",
                                        })
                                      }
                                    >
                                      <Image
                                        width={14}
                                        height={14}
                                        src={FormCopyIcon}
                                        alt="form-copy-icon"
                                      />
                                    </IconButton>
                                  </Tooltip>
                                )}
                            </div>
                            <div>
                              {(row.Status === "Published" ||
                                row.Status === "Published Inactive" ||
                                row.Status === "Unpublished") && (
                                <Tooltip title={`Set Template Availability`}>
                                  <IconButton
                                    onClick={() =>
                                      handleAvailibilityModal(row.Id, row.Code)
                                    }
                                    data-testid="availibility-modal-btn"
                                  >
                                    <Image
                                      width={14}
                                      height={14}
                                      src={FormCheckIcon}
                                      alt="form-action-icon"
                                    />
                                  </IconButton>
                                </Tooltip>
                              )}
                            </div>
                            <div>
                              {row.Status == "Draft" &&
                                row.IsMultilingualTemplatePresent &&
                                canPublishForm && (
                                  <Tooltip title="Publish Template">
                                    <IconButton
                                      data-testid="publish-icon-button"
                                      onClick={() =>
                                        handleFormDialogToggle({
                                          code: row.Code,
                                          open: true,
                                          templateId: row.Id.toString(),
                                          type: "Publish",
                                        })
                                      }
                                    >
                                      <Image
                                        width={14}
                                        height={14}
                                        src={FormPublish}
                                        alt="form-publish-icon"
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
                  {data?.Result.Results.length === 0 && (
                    <span className={styles.emptyTableMessage}>
                      {DEFAULT_EMPTY_TABLE_MESSAGE}
                    </span>
                  )}
                </TableBody>
              </Table>
            </TableContainer>
            <CustomTablePagination
              dataCount={data?.Result.RowCount!}
              rowsPerPage={rowsPerPage}
              page={page}
              setPage={setPage}
              setRowsPerPage={rowsPerPageChange}
            />
          </div>
        </div>
      </div>
      <PrimaryModal modalOpen={open} modalInner={<AvailibilityModal />} />

      <Dialog
        headingStyles={styles.headingTitle}
        open={formDialogAction.type === "Publish" && formDialogAction.open}
        heading="Complete Form"
        handleCancel={() =>
          handleFormDialogToggle({
            code: "",
            open: false,
            type: "Publish",
            templateId: "",
          })
        }
        handleConfirm={() => handleFormDialogConfirm("Publish")}
        altConfirmText="Complete"
        altCancelText="Close"
      >
        <p className={styles.publishModalTitle}>
          Once you complete the form, you can no longer edit. You will then be
          ready to set your availability and publish date.
        </p>
      </Dialog>

      <Dialog
        headingStyles={styles.headingTitle}
        open={formDialogAction.type === "Copy" && formDialogAction.open}
        heading="Duplicate Medical Form"
        handleCancel={() =>
          handleFormDialogToggle({
            code: "",
            open: false,
            type: "Copy",
            templateId: "",
          })
        }
        handleConfirm={() => handleFormDialogConfirm("Copy")}
        altConfirmText="Submit"
        hideCancel
      >
        <div className={styles.codeInput}>
          <Input
            placeholder="Enter description"
            value={formDialogAction.code}
            onChange={(e) =>
              setFormDialogAction({
                ...formDialogAction,
                code: e.target.value,
              })
            }
          />
          <p className={`${styles.formCopyError} errorMessage`}>
            {formCopyError}
          </p>
        </div>
      </Dialog>
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

      <Previewintake
        open={previewModal.open}
        templateId={previewModal.templateId}
        handleClose={() => handlePreviewModalToggle(false, "")}
      />
    </Fragment>
  );
};

export default function MedicalRoot() {
  const router = useRouter();

  usePermission({
    ...IntakePermission.MEDICAL_FORMS,
  });
  return (
    <Provider store={store}>
      <SnackBarProvider>
        <MedicalForms key={router.asPath} />
      </SnackBarProvider>
    </Provider>
  );
}
