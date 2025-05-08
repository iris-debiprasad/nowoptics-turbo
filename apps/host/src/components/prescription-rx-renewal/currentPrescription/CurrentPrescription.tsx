import { ChangeEvent, use, useEffect, useRef, useState } from "react";
import {
  AlertColor,
  Box,
  Button,
  Checkbox,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import style from "./CurrentPrescription.module.scss";
import {
  RX_MODE_CONSTANT,
  RX_RENEWAL_CONSTANT,
  RX_TYPE_CONSTANT,
  currentPrescriptionHeader,
} from "@root/host/src/constants/RxRenewal.constants";
import { Visibility } from "@mui/icons-material";
import BeginVisionOnlineTest from "../BeginVisionOnlineTest";
import ChooseToRenew from "../choseToRenew";
import { useSnackBar } from "@/contexts/Snackbar/SnackbarContext";
import { getRxSelectConfig } from "@/service/order-common.service";
import {
  getRxRangeFromResponse,
  setHelpRxTexts,
} from "@root/host/src/utils/commonRxUtils";

import {
  ADD_HELP_TEXT_CONFIG_CODE,
  AXIS_HELP_TEXT_CONFIG_CODE,
  BASE_CURVE_HELP_TEXT_CONFIG_CODE,
  BRAND_HELP_TEXT_CONFIG_CODE,
  CYLINDER_HELP_TEXT_CONFIG_CODE,
  DIAMETER_HELP_TEXT_CONFIG_CODE,
  SPHERE_HELP_TEXT_CONFIG_CODE,
} from "@root/host/src/constants/commonRx.constants";
import { getPatientEyeGlassHeaders } from "@root/host/src/utils/getRxHeaders";
import { ERROR_MESSAGE } from "@root/host/src/constants/auth.constants";
import {
  DATE_FORMAT,
  LOADING,
  NO_RECORD_FOUND,
  SNACKBAR_COLOR_TYPE,
  SO_DEFAULT_STORE_ID,
  USER_TYPE,
} from "@root/host/src/constants/common.constants";
import AddNewRx from "../addNewRx";
import { CurrentPrescriptionrDTO } from "@root/host/src/types/rxRenewal.types";
import {
  AddNewRxPrescriptionModalPropsDTO,
  ContactRxPrescriptionDTO,
  EyeGlassType,
  MyAccountPrescriptionType,
  helpingTextsDTO,
} from "@root/host/src/types/commonRx.types";
import PrimaryModal from "@/components/primary_modal/PrimaryModal";
import CommonTableSkeleton from "@/components/skeleton_loader/CommonTableSkeleton/CommonTableSkeleton";
import dynamic from "next/dynamic";
import { useRecaptchaToken } from "@root/host/src/hooks/useGoogleRecaptcha";
import { addMyAccountPrescription } from "@/service/common.service";
import dayjs from "dayjs";
import { Order } from "@root/host/src/types/order-common.types";
import LoadingScreen from "@/components/loadingScreen/LoadingScreen";
import { tableQueryParams } from "@root/host/src/utils/getTableQueryParams";
import {
  getMrsToken,
  getRxRangeBasedOnBrandIdItemNumber,
  getRxRenewalExpiredPrescriptions,
  viewCustomerRxPaperCapture,
} from "@/service/rxRenewal.service";
import useAxiosLoader from "@/hooks/useAxiosLoader";
import { getPrescriptionByIdCustomer } from "@/service/rxRenewal.service";
import {
  convertToPrescriptionDataAssociatePatient,
  convertToPrescriptionDataAssociatePatientContact,
} from "@root/host/src/utils/commonRxUtils";
import { AddPrescriptionDTO } from "@root/host/src/types/MyAccount.types";
import { useAppSelector } from "@/store/useStore";

const AddNewRxPrescriptionModal = dynamic(
  () => import("patient/AddNewPrescriptionModal"),
  {
    ssr: false,
    loading: () => (
      <div style={{ minHeight: window.innerWidth > 900 ? "380px" : "500px" }}>
        <CommonTableSkeleton
          rows={window.innerWidth > 900 ? 5 : 10}
          columns={window.innerWidth > 600 ? 5 : 1}
          headSkeletonHeight={20}
          bodySkeletonHeight={50}
        />
      </div>
    ),
  }
) as React.FunctionComponent<AddNewRxPrescriptionModalPropsDTO>;

const ContactRxPrescriptionModal = dynamic(
  () => import("patient/ContactRxPrescriptionModal"),
  {
    ssr: false,
    loading: () => (
      <div style={{ minHeight: window.innerWidth > 900 ? "500px" : "600px" }}>
        <CommonTableSkeleton
          rows={window.innerWidth > 900 ? 8 : 10}
          columns={window.innerWidth > 600 ? 5 : 1}
          headSkeletonHeight={20}
          bodySkeletonHeight={50}
        />
      </div>
    ),
  }
) as React.FunctionComponent<ContactRxPrescriptionDTO>;

const CurrentPrescription = () => {
  const loading = useAxiosLoader();
  const { authData, EventId } = useAppSelector((state) => state.visionIntake);
  const [userData, setUserData] = useState<any>(authData);
  const [rxModalOpen, setRxModalOpen] = useState<boolean>(false);
  const [rxData, setRxData] = useState({
    spectacleid: "0",
    contactid: "0",
    rxmode: "",
    rxtype: "",
    spectacleMode: "",
    contactMode: "",
  });
  const [contactRxModalOpen, setContactRxModalOpen] = useState<boolean>(false);
  const [chooseToRenewOpen, setChooseToRenew] = useState(false);
  const [showChoosePrescription, setShowChoosePrescription] =
    useState<boolean>(false);
  const [showBeginTest, setShowBeginTest] = useState<boolean>(false);
  const { fetchRecaptchaToken } = useRecaptchaToken();
  const [showBoth, setShowBoth] = useState(false);
  const [showAddPrescriptionModal, setShowAddPrescriptionModal] =
    useState<boolean>(false);
  const [openContactAddRxModal, setOpenContactAddRxModal] =
    useState<boolean>(false);
  const { showSnackBar } = useSnackBar();
  const [addPrescriptionHeaders, setAddPrescriptionHeaders] = useState<any>([]);
  const [page, setPage] = useState<number>(0);
  const [rowsPerPage, setRowsPerPage] = useState<number>(5);
  const [order, setOrder] = useState<Order | null>("desc");
  const [orderBy, setOrderBy] = useState<string | null>("Id");
  const [prescriptionData, setPrescriptionData] = useState([]);
  const [prescriptionValues, setPrescriptionValues] = useState<any>(null);
  const [contactValues, setContactValues] = useState<any>(null);
  const [brandHelpText, setBrandHelpText] = useState<string>("");
  const [baseCurveHelpText, setBaseCurveHelpText] = useState<string>("");
  const [diameterHelpText, setDiameterHelpText] = useState<string>("");
  const [patientPaperCaptureId, setPatientPaperCaptureId] = useState<number>(0);
  const [prescriptionCount, setPrescriptionCount] = useState<number | null>(
    null
  );
  const [selectedPrescriptionId, setSelectedPrescriptionId] =
    useState<number>(0);
  const [pdfSrc, setPdfSrc] = useState<any>("");
  const [isPdfFile, setIsPdfFile] = useState<boolean>(false);
  const [rxHeadersBasedOnBrand, setRxHeadersBasedOnBrand] = useState<any>({
    leftBrand: null,
    rightBrand: null,
  });

  const [rxHelpingTexts, setRxHelpingTexts] = useState<helpingTextsDTO>({
    sphereHelpText: "",
    cylinderHelpText: "",
    addHelpText: "",
    axisHelpText: "",
    baseCurveHelpText: "",
    diameterHelpText: "",
    brandHelpText: "",
  });
  const [storeId, setStoreId] = useState<any>(null);

  const handleAddPrescriptionSave = (data: AddPrescriptionDTO) => {
    patientSavePrescription(data);
  };

  const getPrescriptionsData = async (patientId: string) => {
    const params = tableQueryParams(page, rowsPerPage, order, orderBy);
    getRxRenewalExpiredPrescriptions(params, patientId, EventId)
      .then((res) => {
        const data = res?.data?.Result;
        setPrescriptionData(data);
      })
      .catch((err) => {
        setPrescriptionData([]);
        setPrescriptionCount(0);
        showSnackBar(
          err.response
            ? err.response?.data?.Error?.Message
            : ERROR_MESSAGE.API_DEFAULT_ERROR_MESSAGE,
          SNACKBAR_COLOR_TYPE.ERROR as AlertColor
        );
      });
  };

  const patientSavePrescription = async (payload: AddPrescriptionDTO) => {
    const token = await fetchRecaptchaToken("Add_Rx");
    const newPayloadWithEventId = {
      ...payload,
      EventId: EventId,
    };
    addMyAccountPrescription(newPayloadWithEventId, token)
      .then((res) => {
        if (showAddPrescriptionModal && !showBoth) {
          setShowAddPrescriptionModal(false);
          setShowBeginTest(true);
        }
        if (openContactAddRxModal && !showBoth) {
          setOpenContactAddRxModal(false);
          setShowBeginTest(true);
        }
        if (showBoth && showAddPrescriptionModal) {
          setShowAddPrescriptionModal(false);
          setOpenContactAddRxModal(true);
        }
        if (showBoth && openContactAddRxModal) {
          setOpenContactAddRxModal(false);
          setShowBeginTest(true);
        }
        if (payload.IsSpectacleRx) {
          setRxData({
            ...rxData,
            spectacleid: res.data.Result?.Id,
            spectacleMode: RX_MODE_CONSTANT.outside,
          });
        } else {
          setRxData({
            ...rxData,
            contactid: res.data.Result?.Id,
            contactMode: RX_MODE_CONSTANT.outside,
          });
        }
        showSnackBar(
          res.data.SuccessMessage
            ? res.data.SuccessMessage
            : "Prescription added successfully",
          SNACKBAR_COLOR_TYPE.SUCCESS as AlertColor
        );
      })
      .catch((error) => {
        showSnackBar(
          error.response
            ? error.response.data.Error?.Message
            : ERROR_MESSAGE.API_DEFAULT_ERROR_MESSAGE,
          SNACKBAR_COLOR_TYPE.ERROR as AlertColor
        );
      });
  };
  const handleAddContactPrescription = (data: AddPrescriptionDTO) => {
    patientSavePrescription(data);
  };

  // function called on click of view button
  const handleEyeGlassRxModal = (row: EyeGlassType) => {
    if (!row.IsSpectacleRx) {
      handleContactViewPrescription(row.Id, row, false, true);
    } else {
      handleViewPrescriptionEyeglass(row.Id, row, false, true);
    }
  };

  const getRxPaperCapture = (
    paperCaptureId: number,
    IsSpectacleRx: boolean
  ) => {
    if (userData?.userType === USER_TYPE.PATIENT) {
      viewCustomerRxPaperCapture(paperCaptureId)
        .then((res) => {
          const response = res?.data?.Result?.BlobFile;
          const octetStream = response?.FileContents;
          if (response.FileDownloadName.includes(".pdf")) {
            setIsPdfFile(true);
          } else {
            setIsPdfFile(false);
          }
          const blob = new Blob([Buffer.from(octetStream, "base64")], {
              type: "application/pdf",
            }),
            url = URL.createObjectURL(blob);
          setPdfSrc(url);

          if (IsSpectacleRx) {
            handleAddEyeglassRx();
          } else {
            handleContactAddNewRx();
          }
        })
        .catch((err) => {
          showSnackBar(
            err.response
              ? err.response.data.Error.Message
              : ERROR_MESSAGE.API_DEFAULT_ERROR_MESSAGE,
            SNACKBAR_COLOR_TYPE.ERROR as AlertColor
          );
        });
    }
  };

  // function to get the prescription values for contacts
  const handleContactViewPrescription = (
    id: number,
    row: EyeGlassType,
    view: boolean,
    edit: boolean
  ) => {
    setPdfSrc(null);
    setSelectedPrescriptionId(id);
    setIsPdfFile(false);
    getContactFormValues(id, view, edit, row.IsSpectacleRx as boolean);
  };

  const handleViewPrescriptionEyeglass = (
    id: number,
    row: EyeGlassType,
    view: boolean,
    edit: boolean
  ) => {
    setPdfSrc("");
    setIsPdfFile(false);
    setSelectedPrescriptionId(id);
    getPrescriptionFormValuesEyeglass(
      id,
      view,
      edit,
      row.IsSpectacleRx as boolean
    );
  };

  const handleViewEyeGlassPrescription = () => {
    handleAddEyeglassRx();
    setShowBoth(false);
    setRxData({
      ...rxData,
      rxtype: RX_TYPE_CONSTANT.eyeglass,
      rxmode: RX_MODE_CONSTANT.outside,
    });
  };
  const handleViewContactPrescription = () => {
    handleContactAddNewRx();
    setShowBoth(false);
    setRxData({
      ...rxData,
      rxtype: RX_TYPE_CONSTANT.contacts,
      rxmode: RX_MODE_CONSTANT.outside,
    });
  };
  const handleViewBothPrescription = () => {
    setShowBoth(true);
    handleAddEyeglassRx();
    setRxData({
      ...rxData,
      rxtype: RX_TYPE_CONSTANT.eyeglassContactsBoth,
      rxmode: RX_MODE_CONSTANT.outside,
    });
  };

  const getPrescriptionFormValuesEyeglass = (
    id: number,
    view: boolean,
    edit: boolean,
    IsSpectacleRx: boolean
  ) => {
    if (userData?.userType === USER_TYPE.PATIENT) {
      getPrescriptionByIdCustomer(id)
        .then((res) => {
          const result = res?.data?.Result;
          const values = convertToPrescriptionDataAssociatePatient(result);
          setPrescriptionValues(values);

          setPatientPaperCaptureId(result.PatientPaperCaptureId);
          if (result.PatientPaperCaptureId > 0) {
            getRxPaperCapture(result.PatientPaperCaptureId, IsSpectacleRx);
          } else {
            handleAddEyeglassRx();
          }
        })
        .catch((err) => {
          showSnackBar(
            err.response
              ? err.response.data.Error.Message
              : ERROR_MESSAGE.API_DEFAULT_ERROR_MESSAGE,
            SNACKBAR_COLOR_TYPE.ERROR as AlertColor
          );
        });
    }
  };

  function handleAddEyeglassRx(): void {
    getRxSelectConfig()
      .then((res) => {
        const result = res?.data?.Result;
        const rxHelpTexts = setHelpRxTexts(result);
        const rxRangeOptions = getRxRangeFromResponse(result);
        const headers = getPatientEyeGlassHeaders(
          rxRangeOptions.sphereOptions,
          rxRangeOptions.axisOptions,
          rxRangeOptions.cylinderOptions,
          rxRangeOptions.addOptions,
          rxRangeOptions.monoPdOptions,
          rxRangeOptions.prismOptions,
          rxHelpTexts.sphereHelpText,
          rxHelpTexts.cylinderHelpText,
          rxHelpTexts.addHelpText,
          rxHelpTexts.axisHelpText,
          rxHelpTexts.MonoPdHelpText,
          rxHelpTexts.prismHelpText
        );
        setAddPrescriptionHeaders(headers);
        if (chooseToRenewOpen) {
          setRxModalOpen(false);
          setShowChoosePrescription(false);
          setShowAddPrescriptionModal(true);
        } else {
          setRxModalOpen(true);
        }
      })
      .catch((err) => {
        showSnackBar(
          err.response
            ? err.response.data.Error.Message
            : ERROR_MESSAGE.API_DEFAULT_ERROR_MESSAGE,
          SNACKBAR_COLOR_TYPE.ERROR as AlertColor
        );
      });
  }

  // get contact form values
  const getContactFormValues = (
    id: number,
    view: boolean,
    edit: boolean,
    IsSpectacleRx: boolean
  ) => {
    getPrescriptionByIdCustomer(id)
      .then((res) => {
        const result = res?.data?.Result;
        const values = convertToPrescriptionDataAssociatePatientContact(result);
        getRightLeftBrandData(
          result?.LeftEyeEntity?.BrandId,
          result?.RightEyeEntity?.BrandId,
          view,
          edit
        );
        setContactValues(values);
        setPatientPaperCaptureId(result.PatientPaperCaptureId);
        if (result.PatientPaperCaptureId > 0) {
          getRxPaperCapture(result.PatientPaperCaptureId, IsSpectacleRx);
        } else {
          handleContactAddNewRx();
        }
      })
      .catch((err) => {
        showSnackBar(
          err.response
            ? err.response.data.Error.Message
            : ERROR_MESSAGE.API_DEFAULT_ERROR_MESSAGE,
          SNACKBAR_COLOR_TYPE.ERROR as AlertColor
        );
      });
  };

  const getRightLeftBrandData = async (
    leftBrandId: number,
    rightBrandId: number,
    view: boolean,
    edit: boolean
  ) => {
    if (leftBrandId && rightBrandId) {
      const [leftBrand, rightBrand] = await Promise.all([
        getRxRangeBasedOnBrandIdItemNumber("", 0, "cl", leftBrandId),
        getRxRangeBasedOnBrandIdItemNumber("", 0, "cl", rightBrandId),
      ]);
      const leftBrandData = leftBrand?.data?.Result;
      const rightBrandData = rightBrand?.data?.Result;
      setRxHeadersBasedOnBrand({
        leftBrand: leftBrandData,
        rightBrand: rightBrandData,
      });
      const helpingTexts = setHelpRxTexts(leftBrandData?.RxHelpingTexts);
      setRxHelpingTexts(helpingTexts);
      if (chooseToRenewOpen) {
        setRxModalOpen(false);
        setContactRxModalOpen(false);
        setShowChoosePrescription(false);
        setShowAddPrescriptionModal(true);
      } else {
        setContactRxModalOpen(true);
      }
    } else if (leftBrandId && !rightBrandId) {
      const [leftBrand] = await Promise.all([
        getRxRangeBasedOnBrandIdItemNumber("", 0, "cl", leftBrandId),
      ]);
      const leftBrandData = leftBrand?.data?.Result;
      setRxHeadersBasedOnBrand({
        leftBrand: leftBrandData,
        rightBrand: null,
      });
      const helpingTexts = leftBrandData?.RxHelpingTexts;
      setRxHelpingTexts(helpingTexts);

      if (chooseToRenewOpen) {
        setRxModalOpen(false);
        setContactRxModalOpen(false);
        setShowChoosePrescription(false);
        setShowAddPrescriptionModal(true);
      } else {
        setContactRxModalOpen(true);
      }
    } else if (rightBrandId && !leftBrandId) {
      const [rightBrand] = await Promise.all([
        getRxRangeBasedOnBrandIdItemNumber("", 0, "cl", rightBrandId),
      ]);
      const rightBrandData = rightBrand?.data?.Result;
      setRxHeadersBasedOnBrand({
        leftBrand: null,
        rightBrand: rightBrandData,
      });
      const helpingTexts = setHelpRxTexts(rightBrandData?.RxHelpingTexts);
      setRxHelpingTexts(helpingTexts);
      if (chooseToRenewOpen) {
        setRxModalOpen(false);
        setContactRxModalOpen(false);
        setShowChoosePrescription(false);
        setShowAddPrescriptionModal(true);
      } else {
        setContactRxModalOpen(true);
      }
    }
  };

  // it opens the modal
  function handleContactAddNewRx(): void {
    getRxSelectConfig()
      .then((res) => {
        const result = res?.data?.Result;
        const brandHelpText = result?.filter(
          (item: { ConfigCode: string; ConfigValue: string }) =>
            item.ConfigCode === BRAND_HELP_TEXT_CONFIG_CODE
        )[0].ConfigValue;
        const baseCurveHelpText = result?.filter(
          (item: { ConfigCode: string; ConfigValue: string }) =>
            item.ConfigCode === BASE_CURVE_HELP_TEXT_CONFIG_CODE
        )[0].ConfigValue;
        const diameterHelpText = result?.filter(
          (item: { ConfigCode: string; ConfigValue: string }) =>
            item.ConfigCode === DIAMETER_HELP_TEXT_CONFIG_CODE
        )[0].ConfigValue;
        const sphereHelpText = result?.filter(
          (item: { ConfigCode: string; ConfigValue: string }) =>
            item.ConfigCode === SPHERE_HELP_TEXT_CONFIG_CODE
        )[0].ConfigValue;
        const cylinderHelpText = result?.filter(
          (item: { ConfigCode: string; ConfigValue: string }) =>
            item.ConfigCode === CYLINDER_HELP_TEXT_CONFIG_CODE
        )[0].ConfigValue;
        const addHelpText = result?.filter(
          (item: { ConfigCode: string; ConfigValue: string }) =>
            item.ConfigCode === ADD_HELP_TEXT_CONFIG_CODE
        )[0].ConfigValue;
        const axisHelpText = result?.filter(
          (item: { ConfigCode: string; ConfigValue: string }) =>
            item.ConfigCode === AXIS_HELP_TEXT_CONFIG_CODE
        )[0].ConfigValue;
        setRxHelpingTexts({
          sphereHelpText: sphereHelpText,
          cylinderHelpText: cylinderHelpText,
          addHelpText: addHelpText,
          axisHelpText: axisHelpText,
          baseCurveHelpText: baseCurveHelpText,
          diameterHelpText: diameterHelpText,
          brandHelpText: brandHelpText,
        });
        setShowChoosePrescription(false);
        if (chooseToRenewOpen) {
          setOpenContactAddRxModal(true);
        } else {
          setContactRxModalOpen(true);
        }
      })
      .catch((err) => {
        showSnackBar(
          err.response
            ? err.response.data.Error.Message
            : ERROR_MESSAGE.API_DEFAULT_ERROR_MESSAGE,
          SNACKBAR_COLOR_TYPE.ERROR as AlertColor
        );
      });
  }

  const handleChooseToRenew = () => {
    setShowChoosePrescription(!showChoosePrescription);
    setChooseToRenew(true);
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      const selectedStore = localStorage?.getItem("selectedStore");
      setStoreId(
        selectedStore
          ? JSON.parse(selectedStore as string)?.Id
          : SO_DEFAULT_STORE_ID
      );
    }
  }, [typeof window !== "undefined" && localStorage?.getItem("selectedStore")]);

  useEffect(() => {
    if (userData?.userType == USER_TYPE.PATIENT)
      getPrescriptionsData(userData?.PatientId);
  }, [page, rowsPerPage, order, orderBy, userData]);

  function handlePrescriptionSelection(
    e: ChangeEvent<HTMLInputElement>,
    row: MyAccountPrescriptionType
  ): void {
    if (e.target.checked) {
      if (row.IsSpectacleRx) {
        setRxData({
          ...rxData,
          spectacleid: row.Id.toString(),
          spectacleMode:
            row.PrescriptionSource === "EHR"
              ? RX_MODE_CONSTANT.ehr
              : RX_MODE_CONSTANT.outside,
        });
      } else {
        setRxData({
          ...rxData,
          contactid: row.Id.toString(),
          contactMode:
            row.PrescriptionSource === "EHR"
              ? RX_MODE_CONSTANT.ehr
              : RX_MODE_CONSTANT.outside,
        });
      }
    } else {
      if (row.IsSpectacleRx) {
        setRxData({
          ...rxData,
          spectacleid: "0",
          spectacleMode: "",
        });
      } else {
        setRxData({
          ...rxData,
          contactid: "0",
          contactMode: "",
        });
      }
    }
  }

  const disableCheckBox = (row: MyAccountPrescriptionType): boolean => {
    const currentMode =
      row.PrescriptionSource === "EHR"
        ? RX_MODE_CONSTANT.ehr
        : RX_MODE_CONSTANT.outside;
    if (row.IsSpectacleRx) {
      if (rxData.contactid && rxData.contactMode) {
        return rxData.contactMode !== currentMode;
      }
      return +rxData.spectacleid !== 0 && +rxData.spectacleid !== row.Id;
    } else {
      if (rxData.spectacleid && rxData.spectacleMode) {
        return rxData.spectacleMode !== currentMode;
      }
      return +rxData.contactid !== 0 && +rxData.contactid !== row.Id;
    }
  };

  return (
    <>
      {!showChoosePrescription &&
        !showBeginTest &&
        !showAddPrescriptionModal &&
        !openContactAddRxModal && (
          <Box className={style.boxContainer}>
            <Box className={style.textContainer}>
              <Typography variant="h4" className={style.primaryHeading}>
                {RX_RENEWAL_CONSTANT.CURRENT_PRESCRIPTION_MAIN_HEADING}
              </Typography>
              <Typography variant="h6" className={style.secondaryHeading}>
                {RX_RENEWAL_CONSTANT.CURRENT_PRESCRIPTION_SECONDARY_HEADING}
              </Typography>
            </Box>
            <Box className={style.container}>
              <div className={style.tableHeaderForMobile}>
                <Typography variant="h6" className={style.tableHeading}>
                  {RX_RENEWAL_CONSTANT.CURRENT_PRESCRIPTION_TABLE_HEADING}
                </Typography>
                <Button
                  className={style.renewBtnInMobile}
                  onClick={() => {
                    setShowBeginTest(!showBeginTest);
                  }}
                  disabled={
                    rxData.contactid === "0" && rxData.spectacleid === "0"
                  }
                >
                  {RX_RENEWAL_CONSTANT.CURRENT_PRESCRIPTION_RENEW_BTN}
                </Button>
              </div>
              <Box className={style.normalShow}>
                {prescriptionData.length > 0 &&
                  prescriptionData.map(
                    (row: MyAccountPrescriptionType, index: number) => (
                      <div style={{ display: "flex", gap: "5px" }} key={index}>
                        <Checkbox
                          checked={
                            row.IsSpectacleRx
                              ? +rxData.spectacleid === row.Id
                              : +rxData.contactid === row.Id
                          }
                          onChange={(e) => handlePrescriptionSelection(e, row)}
                          disabled={disableCheckBox(row)}
                          style={{ height: "50px" }}
                        />

                        <Box key={index} className={style.gap}>
                          <Box className={style.dataContainer}>
                            <Box>
                              <div>
                                <Typography
                                  variant="h2"
                                  className={style.dataHeading}
                                >
                                  {RX_RENEWAL_CONSTANT.TABLE_HEADING1}
                                </Typography>
                                <Typography
                                  variant="h6"
                                  className={style.secondaryHeading}
                                  style={{ textAlign: "left" }}
                                >
                                  {row.PrescriptionType}
                                </Typography>
                              </div>
                            </Box>
                            <Box>
                              <Typography
                                variant="h2"
                                className={style.dataHeading}
                              >
                                {RX_RENEWAL_CONSTANT.TABLE_HEADING2}
                              </Typography>
                              <Typography
                                variant="h6"
                                className={style.secondaryHeading}
                                style={{ textAlign: "left" }}
                              >
                                {dayjs(row.Date).format(DATE_FORMAT)}
                              </Typography>
                            </Box>
                            <Box>
                              <Typography
                                variant="h2"
                                className={style.dataHeading}
                              >
                                {RX_RENEWAL_CONSTANT.TABLE_HEADING3}
                              </Typography>
                              <Typography
                                variant="h6"
                                className={style.secondaryHeading}
                                style={{ textAlign: "left" }}
                              >
                                {dayjs(row.ExpirationDate).format(DATE_FORMAT)}
                              </Typography>
                            </Box>
                          </Box>
                          <Box
                            className={style.btnContainer}
                            sx={{ flexDirection: "column" }}
                          >
                            <Button
                              className={style.viewBtn}
                              onClick={() => handleEyeGlassRxModal(row)}
                            >
                              {
                                RX_RENEWAL_CONSTANT.CURRENT_PRESCRIPTION_VIEW_BTN
                              }{" "}
                              <Visibility sx={{ marginLeft: "10px" }} />
                            </Button>
                          </Box>
                        </Box>
                      </div>
                    )
                  )}
                {prescriptionData.length === 0 && loading && (
                  <LoadingScreen screenType={LOADING} />
                )}
                {!loading && prescriptionData.length === 0 ? (
                  <LoadingScreen screenType={NO_RECORD_FOUND} />
                ) : null}
              </Box>
              <TableContainer
                sx={{ overflow: "auto" }}
                className={style.tableShow}
              >
                <Table sx={{ minWidth: 500 }}>
                  <TableHead>
                    <TableRow>
                      {currentPrescriptionHeader.map(
                        (header: CurrentPrescriptionrDTO, index: number) => (
                          <TableCell key={index} className={style.tableHeader}>
                            <span>{header.label}</span>
                          </TableCell>
                        )
                      )}
                      <TableCell className={style.tableHeader}>
                        <Button
                          className={style.renewBtn}
                          onClick={() => {
                            setShowBeginTest(!showBeginTest);
                          }}
                          disabled={
                            rxData.contactid === "0" &&
                            rxData.spectacleid === "0"
                          }
                        >
                          {RX_RENEWAL_CONSTANT.CURRENT_PRESCRIPTION_RENEW_BTN}
                        </Button>
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {prescriptionData.length > 0 &&
                      prescriptionData.map(
                        (row: MyAccountPrescriptionType, index: number) => (
                          <TableRow key={index}>
                            <TableCell>
                              <Checkbox
                                checked={
                                  row.IsSpectacleRx
                                    ? +rxData.spectacleid === row.Id
                                    : +rxData.contactid === row.Id
                                }
                                onChange={(e) =>
                                  handlePrescriptionSelection(e, row)
                                }
                                disabled={disableCheckBox(row)}
                              />
                              <span className={style.tableData}>
                                {" "}
                                {row.PrescriptionType}
                              </span>
                            </TableCell>
                            <TableCell>
                              <span className={style.tableData}>
                                {" "}
                                {dayjs(row.Date).format(DATE_FORMAT)}
                              </span>
                            </TableCell>
                            <TableCell>
                              <span className={style.tableData}>
                                {dayjs(row.ExpirationDate).format(DATE_FORMAT)}
                              </span>
                            </TableCell>
                            <TableCell>
                              <Box className={style.btnContainer}>
                                <Button
                                  className={style.viewBtn}
                                  onClick={() => handleEyeGlassRxModal(row)}
                                >
                                  {
                                    RX_RENEWAL_CONSTANT.CURRENT_PRESCRIPTION_VIEW_BTN
                                  }{" "}
                                  <Visibility
                                    sx={{ marginLeft: "10px", height: "18px" }}
                                  />
                                </Button>
                              </Box>
                            </TableCell>
                          </TableRow>
                        )
                      )}
                    {prescriptionData.length === 0 && loading && (
                      <LoadingScreen screenType={LOADING} />
                    )}
                    {!loading && prescriptionData.length === 0 ? (
                      <LoadingScreen screenType={NO_RECORD_FOUND} />
                    ) : null}
                  </TableBody>
                </Table>
              </TableContainer>
              <Box className={style.tableBottomContainer}>
                <Typography variant="h6" className={style.secondaryHeading}>
                  {RX_RENEWAL_CONSTANT.CURRENT_PRESCRIPTION_TABLE_BOTTOM_TEXT}
                </Typography>
                <Button
                  className={style.prescriptionBtn}
                  onClick={handleChooseToRenew}
                >
                  {
                    RX_RENEWAL_CONSTANT.CURRENT_PRESCRIPTION_ADD_PRESCRIPTION_BTN
                  }
                </Button>
              </Box>
            </Box>
          </Box>
        )}
      {showBeginTest && (
        <BeginVisionOnlineTest
          contactid={rxData.contactid}
          rxmode={rxData.spectacleMode || rxData.contactMode}
          rxtype={
            rxData.contactid !== "0" && rxData.spectacleid !== "0"
              ? RX_TYPE_CONSTANT.eyeglassContactsBoth
              : rxData.contactid !== "0"
              ? RX_TYPE_CONSTANT.contacts
              : RX_TYPE_CONSTANT.eyeglass
          }
          spectacleid={rxData.spectacleid}
        />
      )}
      {showChoosePrescription && (
        <ChooseToRenew
          handleBack={() => {
            setShowChoosePrescription(false);
            setChooseToRenew(false);
          }}
          handleRenewGlass={() => handleViewEyeGlassPrescription()}
          handleRenewContacts={() => handleViewContactPrescription()}
          handleRenewGlassAndContacts={() => handleViewBothPrescription()}
        />
      )}
      {(showAddPrescriptionModal || openContactAddRxModal) && (
        <AddNewRx
          handleRxModalBack={() => {
            setShowChoosePrescription(true);
            setShowAddPrescriptionModal(false);
          }}
          handleContactModalBack={() => {
            setShowChoosePrescription(true);
            setOpenContactAddRxModal(false);
          }}
          handleRenewBothBack={() => {
            setShowAddPrescriptionModal(true);
            setOpenContactAddRxModal(false);
          }}
          setModalOpen={setShowAddPrescriptionModal}
          showAddPrescriptionModal={showAddPrescriptionModal}
          prescriptionHeaders={addPrescriptionHeaders}
          addPrescription={handleAddPrescriptionSave}
          storeId={storeId}
          patientId={userData !== null ? userData?.PatientId?.toString() : ""}
          addContactPrescription={handleAddContactPrescription}
          setContactModalOpen={setOpenContactAddRxModal}
          helpingTexts={rxHelpingTexts}
          openContactModalOpen={openContactAddRxModal}
          showBoth={showBoth}
          eventId={EventId as number}
        />
      )}
      {rxModalOpen && (
        <PrimaryModal
          modalOpen={rxModalOpen}
          modalInner={
            <AddNewRxPrescriptionModal
              showDescription={false}
              uploadImage={true}
              showDropdown={true}
              disableAllInputs={true}
              viewMode={true}
              headingTitle="View Spectacle Prescription"
              setModalOpen={setRxModalOpen}
              prescriptionHeaders={addPrescriptionHeaders}
              addPrescription={handleAddPrescriptionSave}
              brandHelpText={brandHelpText}
              baseCurveHelpText={baseCurveHelpText}
              storeId={storeId}
              patientId={
                userData !== null ? userData?.PatientId?.toString() : ""
              }
              userType={USER_TYPE.PATIENT}
              showSnackBar={showSnackBar}
              diameterHelpText={diameterHelpText}
              noDiagnosisCode={
                prescriptionValues?.description?.sourceType === "EHR"
                  ? false
                  : true
              }
              noDoctorName={
                prescriptionValues?.description?.sourceType === "EHR"
                  ? false
                  : true
              }
              noEmployeeName={
                prescriptionValues?.description?.sourceType === "EHR"
                  ? false
                  : true
              }
              formValues={prescriptionValues}
              selectedId={selectedPrescriptionId}
              pdfSrc={pdfSrc || ""}
              isPdfFile={isPdfFile}
              patientPaperCaptureId={patientPaperCaptureId}
              eventId={EventId}
            />
          }
          cstmStyle={"patientAddNewPrescriptionModal"}
        />
      )}

      {contactRxModalOpen && (
        <PrimaryModal
          modalOpen={contactRxModalOpen}
          modalInner={
            <ContactRxPrescriptionModal
              uploadImage={true}
              headingTitle="View Prescription Details"
              isOrderFlow={false}
              disableAllInputs={true}
              setModalOpen={setContactRxModalOpen}
              formvalues={contactValues}
              userType={USER_TYPE.PATIENT}
              storeId={storeId}
              patientId={
                userData !== null ? userData?.PatientId?.toString() : ""
              }
              helpingTexts={rxHelpingTexts}
              addPrescription={addPrescriptionHeaders}
              rxHeadersBasedOnBrand={rxHeadersBasedOnBrand}
              noDiagnosisCode={
                contactValues?.description?.sourceType === "EHR" ? false : true
              }
              selectedId={selectedPrescriptionId}
              noDoctorName={
                contactValues?.description?.sourceType === "EHR" ? false : true
              }
              noEmployeeName={
                contactValues?.description?.sourceType === "EHR" ? false : true
              }
              pdfSrc={pdfSrc || ""}
              isPdfFile={isPdfFile}
              patientPaperCaptureId={patientPaperCaptureId}
              eventId={EventId}
            />
          }
          cstmStyle={"patientAddNewPrescriptionModal"}
        />
      )}
    </>
  );
};

export default CurrentPrescription;
