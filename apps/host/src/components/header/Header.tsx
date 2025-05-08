import {
  AppEvents,
  BRAND,
  CommonConstants,
  DEBOUNCE_TIME,
  NUMBER_OF_SEARCH_RECORD,
  SNACKBAR_COLOR_TYPE,
  SO_DEFAULT_STORE_CONTACT_NUMBER,
  SO_DEFAULT_STORE_NUMBER,
  SO_DEFAULT_STORE_SUPPORT_NUMBER,
  USER_TYPE,
  isSearchValidRegex,
  validLocationInputPattern,
} from "@root/host/src/constants/common.constants";
import { SEARCH_TYPE } from "@root/host/src/constants/header.constants";
import { viewButtonData } from "@root/host/src/constants/menu.constants";
import useTextDebounce from "@/hooks/useTextDebounce";
import {
  GetOrderSearchData,
  GetPatientSearchData,
  GetProductSearchData,
} from "@/service/search.service";
import { GetPublicStoreLocatorGrid } from "@/service/storeLocator.service";
import { SearchProductsDataDTO, SearchType } from "@root/host/src/types/Header.types";
import { StoreAddressType } from "@root/host/src/types/SideBar.types";
import {
  AlertColor,
  AppBar,
  Autocomplete,
  Box,
  Button,
  CircularProgress,
  Divider,
  Grid,
  IconButton,
  MenuItem,
  Modal,
  Paper,
  Select,
  SelectChangeEvent,
  Skeleton,
  TextField,
} from "@mui/material";
import { AxiosError } from "axios";
import debounce from "lodash.debounce";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useRef, useState } from "react";
import serachIcon from "../../../../assets/Images/icons/searchIcon.svg";
import { STORE_ERROR_MESSAGE } from "../../constants/store.constants";
import { useSnackBar } from "../../contexts/Snackbar/SnackbarContext";
import IconSVG from "../iconsvg/IconSVG";
import style from "./Header.module.scss";

import { GetPermissionConfig } from "@/config/permissionConfig";
import { ERROR_MESSAGE } from "@root/host/src/constants/auth.constants";
import CommonPermission from "@root/host/src/constants/common-permission.constants";
import {
  ADD_HELP_TEXT_CONFIG_CODE,
  ADD_MAX_CONFIG_CODE,
  ADD_MIN_CONFIG_CODE,
  AXIS_HELP_TEXT_CONFIG_CODE,
  AXIS_MAX_CONFIG_CODE,
  AXIS_MIN_CONFIG_CODE,
  CYLINDER_HELP_TEXT_CONFIG_CODE,
  CYLINDER_MAX_CONFIG_CODE,
  CYLINDER_MIN_CONFIG_CODE,
  MONO_PD_HELP_TEXT_CONFIG_CODE,
  MONO_PD_MAX_CONFIG_CODE,
  MONO_PD_MIN_CONFIG_CODE,
  PRISM_HELP_TEXT_CONFIG_CODE,
  PRISM_MAX_CONFIG_CODE,
  PRISM_MIN_CONFIG_CODE,
  SPHERE_HELP_TEXT_CONFIG_CODE,
  SPHERE_MAX_CONFIG_CODE,
  SPHERE_MIN_CONFIG_CODE,
} from "@root/host/src/constants/commonRx.constants";
import { GA_TAG_EVENTS } from "@root/host/src/constants/google-analytics.constants";
import { Permission } from "@root/host/src/constants/host-permission.constant";
import { ImageUrlConstants } from "@root/host/src/constants/image.url.constants";
import {
  otcProductType,
  productTypeCode,
} from "@root/host/src/constants/order-common.constant";
import { useDebounce } from "@/hooks/useDebounce";
import {
  GetGeoLocationData,
  addMyAccountPrescription,
  getPatientCartDetails,
  mergeGuestCartData,
} from "@/service/common.service";
import {
  addToCartGuest,
  addToCartPatient,
  getLensSelectionData,
  getRxSelectConfig,
} from "@/service/order-common.service";
import { addPatientPrescription } from "@/service/rx.service";
import { useAppDispatch, useAppSelector } from "@/store/useStore";
import { AddPrescriptionDTO } from "@root/host/src/types/MyAccount.types";
import { AddNewRxPrescriptionModalPropsDTO } from "@root/host/src/types/commonRx.types";
import { LensType, ProductDetailType } from "@root/host/src/types/order-common.types";
import { selectPatientDataTypes } from "@root/host/src/types/selectPatientAssociateModal.types";
import {
  generateProductLink,
  getGuestToLocalStorage,
  modifyAddToCartData,
  nameFieldValidator,
  stringToSlug,
} from "@root/host/src/utils/common.utils";
import { getPatientEyeGlassHeaders } from "@root/host/src/utils/getRxHeaders";
import AddGTMEvent from "@root/host/src/utils/gtmEvent";
import useAxiosLoader from "@root/host/src/hooks/useAxiosLoader";
import { useRecaptchaToken } from "@root/host/src/hooks/useGoogleRecaptcha";
import { associateAddToCart } from "@root/host/src/service/common.service";
import { updateCartId } from "@root/host/src/store/reducer/cartIdReducer";
import {
  getSelectedPatientFromLocalStorage,
  setGuestToLocalStorage,
  setSelectedPatientToLocalStorage,
} from "@root/host/src/utils/common.utils";
import { getPrescriptionOptionsArray } from "@root/host/src/utils/getPrescriptionOptions";
import { getDetails } from "@root/host/src/utils/getSessionData";
import { Session } from "next-auth";
import dynamic from "next/dynamic";
import { useTranslation } from "react-i18next";
import AddPOFModal from "../addPOFModal/AddPOFModal";
import ConfirmationModal from "../confirmationModal/ConfirmationModal";
import PrimaryModal from "../primary_modal/PrimaryModal";
import SearchPatientBar from "../searchPatientBar/SearchPatientBar";
import SelectPatientAssociateModal from "../selectPatientAssociateModal/SelectPatientAssociateModal";
import ShowBrandStore from "../showBrandStore/ShowBrandStore";
import CommonTableSkeleton from "../skeleton_loader/CommonTableSkeleton/CommonTableSkeleton";
import useNonInitialEffect from "../../hooks/useNonInitialEffect";
import { ADD_POF } from "../../store/reducer/AddPofReducer";
import BackdropLoader from "../backdrop_loader/BackdropLoader";
import menuIcon from "../../../../assets/Images/icons/menuIcon.svg";
import { toggleMobileMenu } from "@/store/reducer/header.reducer";

const Prescription = dynamic(() => import("order/Prescription"), {
  ssr: false,
}) as React.FunctionComponent<any>;

const PrescriptionLoadingView = dynamic(
  () => import("order/PrescriptionLoadingView"),
  {
    ssr: false,
  }
) as React.FunctionComponent<any>;

const PrescriptionFoundView = dynamic(
  () => import("order/PrescriptionFoundView"),
  {
    ssr: false,
  }
) as React.FunctionComponent<any>;

const PrescriptionNotFoundView = dynamic(
  () => import("order/PrescriptionNotFoundView"),
  {
    ssr: false,
  }
) as React.FunctionComponent<any>;

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

interface Props {
  roleType: string | null;
  storeData: StoreAddressType | null;
  isCDCView: boolean;
  session: Session | null;
  addShippingProductToCart: (data: SearchProductsDataDTO) => void;
}

export default function Header(props: Props) {
  const { addShippingProductToCart } = props;
  const apiLoading = useAxiosLoader();
  const { t } = useTranslation();
  const { fetchRecaptchaToken } = useRecaptchaToken();
  const [canSearchPatient] = useAppSelector((state) =>
    GetPermissionConfig({
      ...state,
      permissionName: [Permission.PATIENT_SEARCH],
    })
  ) as boolean[];
  const isCDC = useAppSelector((state) => state.cdcView.data.isCDCView);
  const router = useRouter();
  const { showSnackBar } = useSnackBar();
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [allStoreData, setAllStoreData] = useState<StoreAddressType[]>([]);
  const [allSearchOptions, setAllSearchOptions] = useState<
    SearchProductsDataDTO[]
  >([]);
  const [isPageLoading, setIsPageLoading] = useState(false);

  useEffect(() => {
    setIsPageLoading(true);
  }, []);
  const [searchType, setSearchType] = useState<SearchType>(
    SEARCH_TYPE.PATIENT as SearchType
  );
  const [loading, setLoading] = useState(false);
  const [inValidSearch, setInValidSearch] = useState(false);
  const [requestId, setRequestId] = useState("");
  const [isSearchAdvancedSection, setIsSearchAdvancedSection] =
    React.useState(false);
  const [inputValue, setInputValue] = useState<string>("");
  const [recentlyCreatedPatientId, setRecentlyCreatedPatientId] =
    React.useState(0);
  const [searchPatientInputValue, setSearchPatientInputValue] =
    React.useState("");
  const appLogo = ImageUrlConstants.LOGO[BRAND.SO];
  const [getAddPofModalOpen, setAddPofModalOpen] = useState<boolean>(false);
  const [selectedPatient, setSelectedPatient] =
    useState<selectPatientDataTypes | null>(null);
  const [showPatientAssociateModal, setShowPatientAssociateModal] =
    useState<boolean>(false);
  const [isPOFReload, setAddPofIsReload] = useState<boolean>(false);
  const [formDataPOF, setFormDataPOF] = useState<any>({});
  const [faViewSelectedUser, setFaViewSelectedUser] =
    useState<selectPatientDataTypes | null>(null);
  const [showSearchScreen, setShowSearchScreen] = useState<boolean>(false);
  const [showPrescriptionScreen, setShowPrescriptionScreen] =
    useState<boolean>(false);
  const [showNotFoundScreen, setShowNotFoundScreen] = useState<boolean>(false);
  const [showSelectPatientModal, setShowSelectPatientModal] =
    useState<boolean>(false);
  const [productData, setProductData] = useState<ProductDetailType | null>(
    null
  );
  const isAgent = useAppSelector((state) => state.cdcView.data.isAgent);
  const [userId, setUserId] = useState<string | undefined>("");
  const [userInput, setuserInput] = useState<string>("");
  const [selectedPrescriptionId, setSelectedPrescriptionId] = useState<
    number | undefined
  >();
  const [addNewPrescriptionData, setAddNewPrescriptionData] =
    useState<any>(null);
  const [showAddPrescriptionModal, setShowAddPrescriptionModal] =
    useState<boolean>(false);
  const [addPrescriptionHeaders, setAddPrescriptionHeaders] =
    React.useState<any>([]);
  const [showPrescriptionPage, setShowPrescriptionpage] =
    useState<boolean>(false);
  const [id, setId] = useState<string>("");
  const [userLensMaterialSelection, setUserLensMaterialSelection] =
    useState<any>();
  const [userType, setUserType] = useState<string | undefined>();
  const [isFrameOnly, setIsFrameOnly] = useState<boolean>(false);
  const [contactBoxSelection, setContactBoxSelection] = React.useState<{
    [type: string]: number;
  }>({
    left: 1,
    right: 1,
  });
  const [addPofStatus, setAddPofStatus] = useState<boolean>(false);
  const [storeNumber, setStoreNumber] = useState<number>(
    SO_DEFAULT_STORE_NUMBER
  );
  const [eyeglassValues, setEyeglassValues] = React.useState<any>({});
  const [showBrandChangeModel, setShowBrandChangeModel] =
    React.useState<boolean>(false);
  const [selectPatientData, setSelectPatientData] = useState<
    selectPatientDataTypes[] | null
  >(null);
  const [isPatientSearching, setIsPatientSearching] = useState<boolean>(false);
  const [selectedOtcProductQty, setSelectedOtcProductQty] = useState<number>(1);
  const timeoutRef = useRef<NodeJS.Timeout | string | number | undefined>();

  const [storeId, setStoreId] = useState<any>(null);
  const [mergeGuestCartWithPatientCart, setMergeGuestCartWithPatientCart] =
    useState(false);
  const [userData, setUserData] = useState<any>();

  const stepObject = useAppSelector(
    (state: any) => state?.lensSelection?.stepObject
  );

  const dispatch = useAppDispatch();

  useEffect(() => {
    getDetails().then((data) => {
      setUserType(data?.authData?.userType ? data?.authData?.userType : null);
    });
  }, [props.session]);

  useNonInitialEffect(() => {
    if (formDataPOF) {
      const _formDataPOF = {
        formdata: formDataPOF,
        addPofFlag: addPofStatus,
      };
      dispatch(ADD_POF(_formDataPOF));
    }
  }, [addPofStatus]);

  const handlePatientClose = () => {
    setuserInput("");
    setSelectedPatient(null);
    setShowSearchScreen(false);
    setShowPatientAssociateModal(false);
  };

  const handleOpenSelectPatient = () => {
    toggleSelectPatientModal(false);
  };
  const toggleSelectPatientModal = (state: boolean) => {
    setShowSelectPatientModal(state);
  };

  const handleLoadingScreenContinue = (selectedPrescriptionId: number) => {
    setSelectedPrescriptionId(selectedPrescriptionId);
    localStorage.setItem(
      "addNewPrescriptionData",
      JSON.stringify({
        ...addNewPrescriptionData,
        rxId: selectedPrescriptionId,
      })
    );
    setShowSearchScreen(false);
    if (selectedPrescriptionId) {
      handleShowPrescription();
    } else {
      setShowNotFoundScreen(true);
    }
  };

  const handleShowPrescription = () => {
    handleContinueWithoutPrescription();
  };

  const handleAddNewPrescriptionClick = () => {
    handleAddEyeglassRx();
  };

  function handleAddEyeglassRx(): void {
    getRxSelectConfig()
      .then((res) => {
        const result = res?.data?.Result;

        // SPHERE
        const sphereMin = result?.filter(
          (item: { ConfigCode: string; ConfigValue: string }) =>
            item.ConfigCode === SPHERE_MIN_CONFIG_CODE
        )[0].ConfigValue;
        const sphereMax = result?.filter(
          (item: { ConfigCode: string; ConfigValue: string }) =>
            item.ConfigCode === SPHERE_MAX_CONFIG_CODE
        )[0].ConfigValue;
        const sphereHelpText = result?.filter(
          (item: { ConfigCode: string; ConfigValue: string }) =>
            item.ConfigCode === SPHERE_HELP_TEXT_CONFIG_CODE
        )[0].ConfigValue;
        const sphereOptions = getPrescriptionOptionsArray(
          Number(sphereMin),
          Number(sphereMax),
          0.25,
          2
        );
        // CYLINDER
        const cylinderMin = result?.filter(
          (item: { ConfigCode: string; ConfigValue: string }) =>
            item.ConfigCode === CYLINDER_MIN_CONFIG_CODE
        )[0].ConfigValue;
        const cylinderMax = result?.filter(
          (item: { ConfigCode: string; ConfigValue: string }) =>
            item.ConfigCode === CYLINDER_MAX_CONFIG_CODE
        )[0].ConfigValue;
        const cylinderHelpText = result?.filter(
          (item: { ConfigCode: string; ConfigValue: string }) =>
            item.ConfigCode === CYLINDER_HELP_TEXT_CONFIG_CODE
        )[0].ConfigValue;
        const cylinderOptions = getPrescriptionOptionsArray(
          Number(cylinderMin),
          Number(cylinderMax),
          0.25,
          2
        );

        // ADD
        const addMin = result?.filter(
          (item: { ConfigCode: string; ConfigValue: string }) =>
            item.ConfigCode === ADD_MIN_CONFIG_CODE
        )[0].ConfigValue;
        const addMax = result?.filter(
          (item: { ConfigCode: string; ConfigValue: string }) =>
            item.ConfigCode === ADD_MAX_CONFIG_CODE
        )[0]?.ConfigValue;
        const addHelpText = result?.filter(
          (item: { ConfigCode: string; ConfigValue: string }) =>
            item.ConfigCode === ADD_HELP_TEXT_CONFIG_CODE
        )[0].ConfigValue;
        const addOptions = getPrescriptionOptionsArray(
          Number(addMin),
          Number(addMax),
          0.25,
          2
        );

        // AXIS
        const axisMin = result?.filter(
          (item: { ConfigCode: string; ConfigValue: string }) =>
            item.ConfigCode === AXIS_MIN_CONFIG_CODE
        )[0].ConfigValue;
        const axisMax = result?.filter(
          (item: { ConfigCode: string; ConfigValue: string }) =>
            item.ConfigCode === AXIS_MAX_CONFIG_CODE
        )[0].ConfigValue;
        const axisHelpText = result?.filter(
          (item: { ConfigCode: string; ConfigValue: string }) =>
            item.ConfigCode === AXIS_HELP_TEXT_CONFIG_CODE
        )[0].ConfigValue;
        const axisOptions = getPrescriptionOptionsArray(
          Number(axisMin),
          Number(axisMax),
          1,
          0
        );

        // MONO PD
        const monoPdMin = result?.filter(
          (item: { ConfigCode: string; ConfigValue: string }) =>
            item.ConfigCode === MONO_PD_MIN_CONFIG_CODE
        )[0].ConfigValue;
        const monoPdMax = result?.filter(
          (item: { ConfigCode: string; ConfigValue: string }) =>
            item.ConfigCode === MONO_PD_MAX_CONFIG_CODE
        )[0].ConfigValue;
        const monoPdHelpText = result?.filter(
          (item: { ConfigCode: string; ConfigValue: string }) =>
            item.ConfigCode === MONO_PD_HELP_TEXT_CONFIG_CODE
        )[0].ConfigValue;
        const monoPdOptions = getPrescriptionOptionsArray(
          Number(monoPdMin),
          Number(monoPdMax),
          0.5,
          2
        );

        // PRISM
        const prismMin = result?.filter(
          (item: { ConfigCode: string; ConfigValue: string }) =>
            item.ConfigCode === PRISM_MIN_CONFIG_CODE
        )[0].ConfigValue;
        const prismMax = result?.filter(
          (item: { ConfigCode: string; ConfigValue: string }) =>
            item.ConfigCode === PRISM_MAX_CONFIG_CODE
        )[0].ConfigValue;
        const prismHelpText = result?.filter(
          (item: { ConfigCode: string; ConfigValue: string }) =>
            item.ConfigCode === PRISM_HELP_TEXT_CONFIG_CODE
        )[0].ConfigValue;
        const prismOptions = getPrescriptionOptionsArray(
          Number(prismMin),
          Number(prismMax),
          0.25,
          2
        );

        const headers = getPatientEyeGlassHeaders(
          sphereOptions,
          axisOptions,
          cylinderOptions,
          addOptions,
          monoPdOptions,
          prismOptions,
          sphereHelpText,
          cylinderHelpText,
          addHelpText,
          axisHelpText,
          monoPdHelpText,
          prismHelpText
        );

        setShowAddPrescriptionModal(true);
        setAddPrescriptionHeaders(headers);
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

  const handleAddPOF = () => {
    setShowSearchScreen(true);
    setAddPofModalOpen(false);
  };

  const handleCloseAllModal = () => {
    setuserInput("");
    setAddPofModalOpen(false);
    setShowAddPrescriptionModal(false);
    setShowSelectPatientModal(false);
    setShowPatientAssociateModal(false);
    togglePrescriptionPage();
    setShowNotFoundScreen(false);
    setShowPrescriptionScreen(false);
    setShowSearchScreen(false);
  };

  const setSnackBar = (message: string, type: AlertColor) => {
    showSnackBar(message.toString(), type as AlertColor);
  };

  const handleContinueWithoutPrescription = () => {
    if (productData?.ProductType === productTypeCode.CONTACT) handleAddToCart();
    else {
      setShowPrescriptionpage(true);
    }
  };

  const handleAddToCart = async (
    isFrame?: boolean,
    orderTypeCode?: string,
    qty?: number,
    orderCategoryCode?: string,
    patientFrameOnly?: boolean
  ) => {
    let modifiedSelectedData = await modifyAddToCartData(
      productData,
      id,
      addNewPrescriptionData,
      userId,
      productData?.FrameDetail?.Variants[0],
      userLensMaterialSelection,
      selectedPrescriptionId,
      userType,
      isFrameOnly || isFrame,
      qty,
      orderTypeCode,
      orderCategoryCode,
      contactBoxSelection
    );
    setAddPofStatus(true);
    const formData = { ...formDataPOF };
    const pof = {
      id: 0,
      manufacturerId:
        formData.productSelectionStep2?.addPOF.isSearchPOF &&
        formData.productSelectionStep2?.addPOF?.valueObject?.ManufacturerId !==
          undefined
          ? formData.productSelectionStep2?.addPOF?.valueObject?.ManufacturerId
          : 0,
      productName:
        formData.productSelectionStep2?.addPOF.isSearchPOF &&
        formData.productSelectionStep2?.addPOF?.valueObject?.ProductName
          ? formData.productSelectionStep2?.addPOF?.valueObject?.ProductName
          : formData.productSelectionStep2?.addPOF.isSearchPOF === false &&
            formData.productSelectionStep2?.addPOF?.valueObject?.frameName
              ?.value !== undefined
          ? formData.productSelectionStep2?.addPOF?.valueObject?.frameName.value
          : "string",
      eyeSize:
        formData.productSelectionStep2?.addPOF.isSearchPOF &&
        formData.productSelectionStep2?.addPOF?.valueObject?.EyeSize
          ? formData.productSelectionStep2?.addPOF?.valueObject?.EyeSize
          : formData.productSelectionStep2?.addPOF.isSearchPOF === false &&
            formData.productSelectionStep2?.addPOF?.valueObject?.eyeSize
              ?.value !== undefined
          ? formData.productSelectionStep2?.addPOF?.valueObject?.eyeSize.value
          : 0,
      frameTypeId:
        formData.productSelectionStep2?.addPOF.isSearchPOF &&
        formData.productSelectionStep2?.addPOF?.valueObject?.FrameTypeId !==
          undefined
          ? formData.productSelectionStep2?.addPOF?.valueObject?.FrameTypeId
          : 0,
      bridge:
        formData.productSelectionStep2?.addPOF.isSearchPOF &&
        formData.productSelectionStep2?.addPOF?.valueObject?.Bridge
          ? formData.productSelectionStep2?.addPOF?.valueObject?.Bridge
          : formData.productSelectionStep2?.addPOF.isSearchPOF === false &&
            formData.productSelectionStep2?.addPOF?.valueObject?.bridge
              ?.value !== undefined
          ? formData.productSelectionStep2?.addPOF?.valueObject?.bridge.value
          : 0,
      verticalLensHeight:
        formData.productSelectionStep2?.addPOF.isSearchPOF &&
        formData.productSelectionStep2?.addPOF?.valueObject
          ?.VerticalLensHeight !== undefined
          ? formData.productSelectionStep2?.addPOF?.valueObject
              ?.VerticalLensHeight
          : formData.productSelectionStep2?.addPOF.isSearchPOF === false &&
            formData.productSelectionStep2?.addPOF?.valueObject
              ?.verticalLensHeight?.value !== undefined
          ? formData.productSelectionStep2?.addPOF?.valueObject
              ?.verticalLensHeight?.value
          : 0,
      effectiveDiameter:
        formData.productSelectionStep2?.addPOF.isSearchPOF &&
        formData.productSelectionStep2?.addPOF?.valueObject
          ?.EffectiveDiameter !== undefined
          ? formData.productSelectionStep2?.addPOF?.valueObject
              ?.EffectiveDiameter
          : formData.productSelectionStep2?.addPOF.isSearchPOF === false &&
            formData.productSelectionStep2?.addPOF?.valueObject
              ?.effectiveDiameter?.value !== undefined
          ? formData.productSelectionStep2?.addPOF?.valueObject
              ?.effectiveDiameter?.value
          : 0,
      frameMaterialId:
        formData.productSelectionStep2?.addPOF.isSearchPOF &&
        formData.productSelectionStep2?.addPOF?.valueObject?.FrameMaterialId !==
          undefined
          ? formData.productSelectionStep2?.addPOF?.valueObject?.FrameMaterialId
          : 0,
      temple:
        formData.productSelectionStep2?.addPOF.isSearchPOF &&
        formData.productSelectionStep2?.addPOF?.valueObject?.Temple
          ? formData.productSelectionStep2?.addPOF?.valueObject?.Temple
          : formData.productSelectionStep2?.addPOF.isSearchPOF === false &&
            formData.productSelectionStep2?.addPOF?.valueObject?.temple
              ?.value !== undefined
          ? formData.productSelectionStep2?.addPOF?.valueObject?.temple?.value
          : 0,
      frameMountId:
        formData.productSelectionStep2?.addPOF.isSearchPOF &&
        formData.productSelectionStep2?.addPOF?.valueObject?.FrameMountId !==
          undefined
          ? formData.productSelectionStep2?.addPOF?.valueObject?.FrameMountId
          : formData.productSelectionStep2?.addPOF.isSearchPOF === false &&
            formData.productSelectionStep2?.addPOF?.valueObject?.mount
              ?.value !== undefined
          ? formData.productSelectionStep2?.addPOF?.valueObject?.mount.value
          : 0,
      frameId:
        formData.productSelectionStep2?.addPOF.isSearchPOF &&
        formData.productSelectionStep2?.addPOF?.valueObject?.ProductVariantId
          ? formData.productSelectionStep2?.addPOF?.valueObject
              ?.ProductVariantId
          : 0,
      color:
        formData.productSelectionStep2?.addPOF.isSearchPOF &&
        formData.productSelectionStep2?.addPOF?.valueObject
          ?.ManufacturerColor !== undefined
          ? formData.productSelectionStep2?.addPOF?.valueObject
              ?.ManufacturerColor
          : formData.productSelectionStep2?.addPOF.isSearchPOF === false &&
            formData.productSelectionStep2?.addPOF?.valueObject?.color
              ?.value !== undefined
          ? formData.productSelectionStep2?.addPOF?.valueObject?.color.value
          : "string",
      pofImageFileId: formData.productSelectionStep2?.addPOF.isSearchPOF
        ? "string"
        : formData.productSelectionStep2?.addPOF?.valueObject?.id.value,
      isHoldPOF:
        formData.productSelectionStep2?.addPOF?.valueObject?.holdPOF?.value !==
        undefined
          ? formData.productSelectionStep2?.addPOF?.valueObject?.holdPOF.value
          : false,
      PSFOrderNumber:
        formData.productSelectionStep2?.addPOF?.isSearchPOF &&
        formData.productSelectionStep2?.addPOF?.valueObject?.OrderNumber !==
          undefined &&
        formData.productSelectionStep2?.addPOF?.valueObject?.OrderNumber !==
          null
          ? formData.productSelectionStep2?.addPOF?.valueObject?.OrderNumber
          : null,
    };
    let _modifiedSelectedData = {
      ...modifiedSelectedData,
    };
    delete _modifiedSelectedData.Orders[0].ShippingModeId;
    delete _modifiedSelectedData.Orders[0].OrderTypeId;
    delete _modifiedSelectedData.OrderCategoryId;
    _modifiedSelectedData.OrderCategoryCode = "N"; //in case of add pof
    _modifiedSelectedData.OrderTypeCode = "SP"; //in case of add pof

    _modifiedSelectedData.Orders[0].pof = pof || null;
    _modifiedSelectedData.Orders[0].LineItems = getLineItems(null, null);

    let selectedpatient = getSelectedPatientFromLocalStorage();

    if (userType === USER_TYPE.ASSOCIATE && selectedpatient) {
      _modifiedSelectedData.PatientId = selectedpatient?.Id;
      associateAddToCart(_modifiedSelectedData)
        .then((res) => {
          dispatch(updateCartId(res?.data?.Result?.Id));
          if (selectedpatient) {
            setSelectedPatientToLocalStorage(selectedpatient, {
              storeCartId: res?.data?.Result?.Id,
            });

            setAddPofStatus(false);
            //INFO: dispatch an event reload_cart browser event
            if (router.pathname.startsWith("/cart")) {
              const event = new CustomEvent("refetch_cart_details", {
                detail: { data: "refetch_cart_details" },
              });
              window.dispatchEvent(event);
            }

            router.push(
              `/cart?patientId=${selectedPatient?.Id}&cartId=${res?.data?.Result?.Id}`
            );
            handleCloseAllModal();
          }
        })
        .catch((err) => {
          setAddPofStatus(false);

          showSnackBar(
            err?.response
              ? err?.response.data.Error.Message
              : ERROR_MESSAGE.API_DEFAULT_ERROR_MESSAGE,
            SNACKBAR_COLOR_TYPE.ERROR as AlertColor
          );
        });
    } else if (userType === USER_TYPE.PATIENT) {
      delete _modifiedSelectedData.CreatedForStoreId;
      delete _modifiedSelectedData.CreatedByStoreId;
      const token = await fetchRecaptchaToken("Add_To_Cart_Patient");
      addToCartPatient(_modifiedSelectedData, storeNumber, token)
        .then((res) => {
          setAddPofStatus(false);
          dispatch(updateCartId(res?.data?.Result?.Id));
          localStorage.setItem("patient_cartId", res?.data?.Result?.Id);
          router.push("/cart");
          handleCloseAllModal();
        })
        .catch((err) => {
          setAddPofStatus(false);
          showSnackBar(
            err?.response
              ? err?.response.data.Error.Message
              : ERROR_MESSAGE.API_DEFAULT_ERROR_MESSAGE,
            SNACKBAR_COLOR_TYPE.ERROR as AlertColor
          );
        });
    } else {
      delete _modifiedSelectedData.CreatedForStoreId;
      delete _modifiedSelectedData.CreatedByStoreId;
      delete _modifiedSelectedData.OrderCategoryId;
      const token = await fetchRecaptchaToken("Add_To_Cart_Guest");
      addToCartGuest(_modifiedSelectedData, token)
        .then((res) => {
          setGuestToLocalStorage(res?.data?.Result?.Id);
          setAddPofStatus(false);
          dispatch(updateCartId(res?.data?.Result?.Id));
          router.push("/cart");
          handleCloseAllModal();
        })
        .catch((err) => {
          setAddPofStatus(false);
          showSnackBar(
            err?.response
              ? err?.response.data.Error.Message
              : ERROR_MESSAGE.API_DEFAULT_ERROR_MESSAGE,
            SNACKBAR_COLOR_TYPE.ERROR as AlertColor
          );
        });
    }
  };

  const getLineItems = (_masterProductId: any, _productVariantId: any) => {
    const keys = Object.keys(stepObject);
    let masterProductIds: number[] = [];

    keys.forEach((key: string) => {
      const stepData = stepObject[key];
      masterProductIds = [
        ...masterProductIds,
        ...stepData?.stepMasterProductIds,
      ];
    });
    const lineItemsArray: {
      masterProductId: number;
      productVariantId: number | null;
      quantity: number;
    }[] = [];

    masterProductIds.forEach((id) => {
      lineItemsArray.push({
        masterProductId: id,
        productVariantId: null,
        quantity: 1,
      });
    });

    return lineItemsArray;
  };

  const handlePrescriptionfoundBack = () => {
    setShowPrescriptionScreen(false);
    setShowSearchScreen(true);
  };

  const handleUserInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setuserInput(value);
  };

  const debounceApiCall = () => {
    setIsPatientSearching(true);
    if (userInput.length > 0) {
      GetPatientSearchData(userInput, "10")
        .then((res) => {
          setShowPrescriptionpage(false);
          setIsPatientSearching(false);
          setSelectPatientData(res.data.Result);
        })
        .catch((err) => {
          setIsPatientSearching(false);
          showSnackBar(
            err.response
              ? err?.response?.data?.Error?.Message
              : ERROR_MESSAGE.API_DEFAULT_ERROR_MESSAGE,
            SNACKBAR_COLOR_TYPE.ERROR as AlertColor
          );
        });
    }
  };

  useEffect(() => {
    setFaViewSelectedUser(selectedPatient);
  }, [selectedPatient]);

  useEffect(() => {
    if (userInput.length > 0) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = setTimeout(debounceApiCall, 1000);
    }
  }, [userInput]);

  const handleContinueClick = () => {
    setShowPrescriptionpage(false);
    if (isFrameOnly && selectedPatient) handleAddToCart(true);
    else if (productData?.ProductType === otcProductType && selectedPatient)
      handleAddToCart(false, "OC", selectedOtcProductQty, "N");
    else if (selectedPatient) {
      setAddPofModalOpen(true);
    } else setShowPatientAssociateModal(!showPatientAssociateModal);
  };

  const associateSavePrescription = (payload: AddPrescriptionDTO) => {
    addPatientPrescription(payload)
      .then((res) => {
        const response = res.data.Result;
        setSelectedPrescriptionId(response.Id);
        showSnackBar(
          res.data.SuccessMessage
            ? res.data.SuccessMessage
            : "Prescription added successfully",
          SNACKBAR_COLOR_TYPE.SUCCESS as AlertColor
        );
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

  const handleAddPrescriptionSave = (data: any) => {
    if (userType === USER_TYPE.ASSOCIATE) {
      associateSavePrescription(data);
    } else if (userType === USER_TYPE.PATIENT) {
      patientSavePrescription(data);
    }
    localStorage.setItem(
      "addNewPrescriptionData",
      JSON.stringify({ ...data, rxId: selectedPrescriptionId })
    );
    setAddNewPrescriptionData(data);
    handleShowPrescription();
  };
  const togglePrescriptionPage = () => {
    setSelectedPrescriptionId(undefined);
    setShowPrescriptionpage(!showPrescriptionPage);
  };

  const patientSavePrescription = async (payload: AddPrescriptionDTO) => {
    const token = await fetchRecaptchaToken("Add_Rx");
    addMyAccountPrescription(payload, token)
      .then((res) => {
        const response = res.data.Result;
        setSelectedPrescriptionId(response.Id);
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

  useEffect(() => {
    if (
      typeof window !== "undefined" &&
      localStorage?.getItem("selectedStore")
    ) {
      setStoreId(JSON.parse(localStorage?.getItem("selectedStore") as string));
    }
  }, [typeof window !== "undefined" && localStorage.getItem("selectedStore")]);

  const debouncedInputValue = useDebounce(
    searchPatientInputValue,
    DEBOUNCE_TIME
  );

  useEffect(() => {
    if (!recentlyCreatedPatientId && debouncedInputValue) {
      getSearchDataForAssociate(debouncedInputValue);
    }
  }, [debouncedInputValue]);

  useEffect(() => {
    if (recentlyCreatedPatientId) {
      router.push(`/patient/${recentlyCreatedPatientId}`);
    }
  }, [recentlyCreatedPatientId]);

  useEffect(() => {
    const handlePopState = () => {
      setInputValue("");
      setOpen(false);
    };

    window.addEventListener("popstate", handlePopState);

    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, []);

  const getStoreGridData = async (
    page: number,
    searchText?: string,
    lat?: string,
    lon?: string
  ) => {
    setLoading(true);
    GetPublicStoreLocatorGrid(page.toString(), searchText, undefined, lat, lon)
      .then(({ data }) => {
        setLoading(false);

        setAllStoreData([...data.Result.Results, viewButtonData]);
      })
      .catch((err) => {
        setLoading(false);
        const errorMessage = (err as AxiosError).message
          ? (err as AxiosError).message
          : STORE_ERROR_MESSAGE.API_DEFAULT_ERROR_MESSAGE;
        showSnackBar(errorMessage, SNACKBAR_COLOR_TYPE.ERROR as AlertColor);
      });
  };

  const getSearchDataForAssociate = debounce(async (searchTerm?: string) => {
    setLoading(true);
    if (searchType === SEARCH_TYPE.PRODUCT) {
      await GetProductSearchData(searchTerm ? searchTerm : "*")
        .then((res) => {
          setRequestId(res.headers["unbxd-request-id"]);
          setLoading(false);
          if (res.data && res.data.response && res.data.response.products) {
            const products = res.data.response.products;
            let finalProducts: any[] = [];
            if (products?.length > 0) {
              products.forEach((product: any) => {
                if (
                  !(
                    product?.productgroup === "FR" && product?.sku === undefined
                  )
                ) {
                  finalProducts.push(product);
                }
              });
            }
            setAllSearchOptions(finalProducts);
          }
        })
        .catch((err) => {
          setLoading(false);
          const errorMessage = (err as AxiosError).message
            ? (err as AxiosError).message
            : STORE_ERROR_MESSAGE.API_DEFAULT_ERROR_MESSAGE;
          showSnackBar(errorMessage, SNACKBAR_COLOR_TYPE.ERROR as AlertColor);
        });
    } else if (
      searchType === SEARCH_TYPE.PATIENT &&
      isSearchValidRegex.test(searchTerm as string)
    ) {
      await GetPatientSearchData(
        nameFieldValidator(searchTerm as string),
        NUMBER_OF_SEARCH_RECORD
      )
        .then(({ data }) => {
          if (data && data.Result) {
            setAllSearchOptions(data.Result);
          }
          setLoading(false);
        })
        .catch((err) => {
          setLoading(false);
          showSnackBar(
            err.response
              ? err.response?.data?.Error?.Message
              : ERROR_MESSAGE.API_DEFAULT_ERROR_MESSAGE,
            SNACKBAR_COLOR_TYPE.ERROR as AlertColor
          );
        });
    } else if (searchType === SEARCH_TYPE.ORDER) {
      const storeData = JSON.parse(
        localStorage.getItem("selectedStore") as string
      );
      if ((storeData && storeData?.Id) || isCDC) {
        await GetOrderSearchData(
          searchTerm ? searchTerm : "*",
          isCDC ? 0 : storeData.Id.toString()
        )
          .then((res) => {
            setLoading(false);
            if (res.data && res.data.Result) {
              setAllSearchOptions(res.data.Result);
            }
          })
          .catch((err) => {
            setLoading(false);
            showSnackBar(
              err.response
                ? err.response.data?.Error?.Message
                : ERROR_MESSAGE.API_DEFAULT_ERROR_MESSAGE,
              SNACKBAR_COLOR_TYPE.ERROR as AlertColor
            );
          });
      }
    } else {
      setLoading(false);
    }
  }, DEBOUNCE_TIME);

  useEffect(() => {
    if (!open) {
      setAllStoreData([]);
    }
  }, [open]);

  const handleSearchType = (event: SelectChangeEvent) => {
    setIsSearchAdvancedSection(false);
    setAllSearchOptions([]);
    setSearchType(event.target.value as SearchType);
  };

  const debounceTemp = useTextDebounce(inputValue, DEBOUNCE_TIME);

  const getStoreDataWithCurrentGeoLocation = () => {
    const userLocation = JSON.parse(localStorage.getItem("location") as string);
    let lat = userLocation?.latitude
      ? userLocation?.latitude.toString()
      : undefined;

    let long = userLocation?.longitude
      ? userLocation?.longitude.toString()
      : undefined;

    getStoreGridData(1, debounceTemp, lat, long);
  };

  const getLatLngFromAreaName = async (areaName: string) => {
    try {
      let zipCode = areaName;
      if (areaName.length > 5) {
        zipCode = `${areaName.slice(0, 5)}-${areaName.slice(
          5,
          areaName.length
        )}`;
      }
      const response = await GetGeoLocationData(zipCode);

      if (response.data.results.length > 0) {
        const location = response.data.results[0].geometry.location;
        getStoreGridData(1, debounceTemp, location.lat, location.lng);
      } else {
        getStoreDataWithCurrentGeoLocation();
      }
    } catch (error) {
      getStoreDataWithCurrentGeoLocation();
      return null;
    }
  };

  useEffect(() => {
    if (
      debounceTemp &&
      debounceTemp.length > 2 &&
      validLocationInputPattern.test(debounceTemp)
    ) {
      setInValidSearch(false);
      //TODO: Remove zipcode check for geo location, now geo location API will call for all kind of search
      // if (isZipcodeValidRegex.test(debounceTemp)) {
      //   getLatLngFromAreaName(debounceTemp);
      // } else {
      //   getStoreGridData(1, debounceTemp);
      // }
      getLatLngFromAreaName(debounceTemp);
    } else {
      setInValidSearch(true);
    }
  }, [debounceTemp]);

  const handleRouteChange = () => {
    if (search && validLocationInputPattern.test(search)) {
      setOpen(false);
      setInputValue("");
      router.push(`/schedule-exam?q=${search}`);
    } else {
      showSnackBar(
        "Please enter valid search term",
        SNACKBAR_COLOR_TYPE.ERROR as AlertColor
      );
    }
  };
  const handleEnterKeyPress = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "Enter") {
      handleRouteChange();
    }
  };

  useEffect(() => {
    if (
      typeof window !== "undefined" &&
      JSON.parse(localStorage.getItem("CurrentSelectedPatient") as string)
        ?.Id &&
      localStorage.getItem("isContinueShopping") === "true"
    ) {
      setSearchType(SEARCH_TYPE.PRODUCT as SearchType);
    }
  }, [
    typeof window !== "undefined" &&
      localStorage.getItem("CurrentSelectedPatient"),
    typeof window !== "undefined" && localStorage.getItem("isContinueShopping"),
  ]);

  const [getPosAppintmentsPermisison] = useAppSelector((state) =>
    GetPermissionConfig({
      ...state,
      permissionName: [CommonPermission.APPOINTMENTS.GET_POS_APPOINTMENTS],
    })
  ) as boolean[];

  const performPatientSelectAction = (option: selectPatientDataTypes) => {
    let newOption = {
      Id: option.Id,
      FirstName: option.FirstName,
      LastName: option.LastName,
      Email: option.Email,
      PhoneNumber: option.PhoneNumber.PhoneNumber,
      Dob: option.Dob,
      IsdCode: option.PhoneNumber.IsdCode,
    };
    router.push(
      {
        pathname: `/patient/${option.Id}`,
        query: { ...newOption },
      },
      `/patient/${option.Id}`
    );
  };

  const getCartDataForPatient = async () => {
    getPatientCartDetails(userData?.PatientId, SO_DEFAULT_STORE_NUMBER)
      .then((res) => {
        setMergeGuestCartWithPatientCart(true);
      })
      .catch((err) => {
        updateGuestCartDataWithMerge(false);
      });
  };

  useEffect(() => {
    if (userData?.userType === USER_TYPE.PATIENT) {
      getCartDataForPatient();
    }
  }, [userData]);

  useEffect(() => {
    window.addEventListener(AppEvents.MERGE_GUEST_CART, async () => {
      localStorage.setItem("isMergeGuestCartFlow", "true");
      await getDetails().then((data) => {
        setUserData(data?.authData);
      });
    });

    return () => {
      window.removeEventListener(AppEvents.MERGE_GUEST_CART, () => {});
    };
  }, []);

  const updateGuestCartDataWithMerge = async (
    IsMergeCartRequested: boolean
  ) => {
    setLoading(true);
    const guestCartId = getGuestToLocalStorage();
    if (guestCartId) {
      const token = await fetchRecaptchaToken("merge_guest_cart");
      const payload = {
        CartId: guestCartId,
        IsMergeCartRequested: IsMergeCartRequested,
      };
      mergeGuestCartData(payload, userData.PatientId, token)
        .then((resp) => {
          setLoading(false);
          localStorage.removeItem("guestCartId");
          setMergeGuestCartWithPatientCart(false);
          dispatch(updateCartId(resp.data.Result?.Id));
          window.dispatchEvent(new Event(AppEvents.UPDATE_SESSION));
          //INFO: dispatch an event reload_cart browser event
          if (router.pathname.startsWith("/cart")) {
            const event = new CustomEvent("refetch_cart_details", {
              detail: { data: "refetch_cart_details" },
            });
            window.dispatchEvent(event);
          }
          router.push({
            pathname: "/cart",
          });
        })
        .catch((error) => {
          setLoading(false);
          localStorage.removeItem("guestCartId");
          const message =
            error && error.response?.data?.Error?.Message
              ? error.message
              : ERROR_MESSAGE.API_DEFAULT_ERROR_MESSAGE;
          showSnackBar(message, SNACKBAR_COLOR_TYPE.ERROR as AlertColor);
        });
    }
  };

  return (
    <>
      <BackdropLoader openLoader={loading} />
      <Box className={style.headerWrapper}>
        <AppBar
          className={`${style.header} ${
            (props.session?.user as any)?.authData?.userType !==
              USER_TYPE.ASSOCIATE && style.headerCustomer
          }`}
          position="relative"
        >
          <div className={style.headerContainer}>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={() => dispatch(toggleMobileMenu())}
              className={style.menuIcon}
            >
              <Image src={menuIcon} alt="menu" width={16} height={14} />
            </IconButton>
            <Box className={style.logoSection}>
              <Link href="/">
                {appLogo ? (
                  <Image src={appLogo} alt="logo" width={142} height={60} />
                ) : (
                  <Skeleton width={142} height={60} variant="rectangular" />
                )}
              </Link>
            </Box>
            <Box className={style.searchSection}>
              {((props.session?.user as any)?.authData?.userType !==
                USER_TYPE.ASSOCIATE ||
                isAgent) && (
                <div style={{ display: "flex", alignItems: "center" }}>
                  <Autocomplete
                    sx={{
                      width: "100%",
                    }}
                    open={open && allStoreData.length > 0}
                    onOpen={() => {
                      setOpen(true);
                    }}
                    onClose={() => {
                      setOpen(false);
                    }}
                    onKeyDown={handleEnterKeyPress}
                    inputValue={inputValue}
                    getOptionLabel={(option) => option.BrandName}
                    options={allStoreData}
                    filterOptions={(options, state) => options}
                    onInputChange={(event, newInputValue) => {
                      setInputValue(newInputValue);
                      setSearch(newInputValue);
                      if (newInputValue === "") {
                        setAllStoreData([viewButtonData]);
                      }
                    }}
                    onBlur={() => setInputValue("")}
                    PaperComponent={({ children }) => (
                      <Paper className="autocompleteOption">{children}</Paper>
                    )}
                    renderOption={(props, option) =>
                      option.BrandName !== "View All Stores" ? (
                        <Box className="headerSearch_options" component="li">
                          <Box
                            onClick={() => {
                              if (Boolean(option.LocationPageName)) {
                                AddGTMEvent({
                                  event: GA_TAG_EVENTS.GOOGLE_MAP_API_CALL,
                                  [GA_TAG_EVENTS.MAPS_API_SEARCH_ORIGIN]:
                                    "header",
                                  [GA_TAG_EVENTS.MAPS_API_SEARCH_TERM]:
                                    option.LocationPageName,
                                });
                                setOpen(false);
                                setInputValue("");
                                router.push(
                                  {
                                    pathname: `/locations/${stringToSlug(
                                      option.LocationPageName as string
                                    )}`,
                                    query: {
                                      pid: option.Id,
                                    },
                                  },
                                  `/locations/${stringToSlug(
                                    option.LocationPageName as string
                                  )}`,
                                  { shallow: true }
                                );
                              }
                            }}
                            sx={{
                              width: "100%",
                              cursor: Boolean(option.WebDescription)
                                ? "pointer"
                                : "not-allowed",
                            }}
                          >
                            <span className="option_txt">
                              {option.WebDescription}
                            </span>
                            &nbsp;
                            <span>
                              {option.AddressLine1},{option.City}
                            </span>
                            <ShowBrandStore
                              optionBrandName={option.BrandName}
                              fontSize={11}
                            />
                          </Box>
                        </Box>
                      ) : (
                        <Button
                          className="headerSearch_viewMore" // TODO: Need to check for dev
                          sx={{
                            fontSize: { xs: "14px", xl: "12px" },
                            fontWeight: "normal",
                            width: "100%",
                            padding: "0px 5px",
                            color: "var(--primary-font-color)",
                            textTransform: "none",
                          }}
                          data-testid="ViewStore"
                          onClick={handleRouteChange}
                        >
                          View All Stores
                        </Button>
                      )
                    }
                    renderTags={() => null}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        placeholder={t("HEADER.FIND_A_STORE")}
                        data-testid="Search"
                        InputProps={{
                          ...params.InputProps,
                          autoCapitalize: "none",
                          onTouchStart: (e) => e.preventDefault(),
                          endAdornment: (
                            <React.Fragment>
                              {loading ? (
                                <CircularProgress
                                  color="inherit"
                                  size={14}
                                  sx={{ marginRight: "10px" }}
                                />
                              ) : null}
                              <IconButton
                                sx={{
                                  margin: "0px -20px 0px 0px",
                                  padding: "0px",
                                }}
                                onClick={handleRouteChange}
                              >
                                <Image
                                  src={serachIcon}
                                  width={14}
                                  height={15}
                                  alt="search-icon"
                                />
                              </IconButton>
                            </React.Fragment>
                          ),
                        }}
                      />
                    )}
                  />
                </div>
              )}
              {!isAgent && (
                <>
                  {" "}
                  {(props.session?.user as any)?.authData?.userType ===
                    USER_TYPE.ASSOCIATE &&
                  canSearchPatient &&
                  searchType !== SEARCH_TYPE.PATIENT ? (
                    <Autocomplete
                      options={allSearchOptions}
                      sx={{ width: "100%" }}
                      open={open}
                      className={style.autoComplete}
                      inputValue={searchPatientInputValue}
                      onBlur={() => setSearchPatientInputValue("")}
                      onOpen={() => {
                        if (
                          searchType === SEARCH_TYPE.PATIENT &&
                          !isSearchAdvancedSection
                        ) {
                          setAllSearchOptions([]);
                        }
                        setOpen(true);
                      }}
                      onClose={(e, reason) => {
                        setAllSearchOptions([]);
                        if (!isSearchAdvancedSection) {
                          setOpen(false);
                        } else if (
                          isSearchAdvancedSection &&
                          reason !== "blur"
                        ) {
                          setIsSearchAdvancedSection(false);
                          setOpen(false);
                        }
                      }}
                      noOptionsText={"No record found"}
                      loading={loading}
                      filterOptions={(options, state) => options}
                      getOptionLabel={(option) =>
                        option.title
                          ? option.title
                          : option.FirstName
                          ? option.FirstName
                          : option.PatientName
                      }
                      onInputChange={(event, newInputValue, reason) => {
                        if (reason === "input") {
                          setRecentlyCreatedPatientId(0);
                          setIsSearchAdvancedSection(false);
                        }
                        if (newInputValue === "") {
                          setAllSearchOptions([]);
                        }
                        if (reason !== "reset") {
                          setRecentlyCreatedPatientId(0);
                          setSearchPatientInputValue(newInputValue);
                        }
                      }}
                      renderOption={(props, option) =>
                        searchType === SEARCH_TYPE.PRODUCT ? (
                          <Box
                            component="li"
                            className={style.searchOption}
                            key={option.id}
                            onClick={() => {
                              setOpen(false);
                              if (
                                option.productgroup?.toLowerCase() ===
                                  "ship serv" &&
                                !isCDC
                              ) {
                                addShippingProductToCart(option);
                              } else {
                                if (router?.query?.ParentOrderId) {
                                  router.push({
                                    pathname: `/product/${generateProductLink(
                                      option.modelnumber,
                                      option.title,
                                      option.sku,
                                      option.productgroup
                                    )}`,
                                    query: {
                                      ...router?.query,
                                      pid: option.uniqueId,
                                      requestId: requestId,
                                      sku: option.sku,
                                      // TODO - pass referrer for analytics
                                      // referrer: window.location.href,
                                    },
                                  });
                                } else {
                                  router.push(
                                    {
                                      pathname: `/product/${generateProductLink(
                                        option.modelnumber,
                                        option.title,
                                        option.sku,
                                        option.productgroup
                                      )}`,
                                      query: {
                                        pid: option.uniqueId,
                                        requestId: requestId,
                                        sku: option.sku,
                                        // TODO - pass referrer for analytics
                                        // referrer: window.location.href,
                                      },
                                    },
                                    `/product/${generateProductLink(
                                      option.modelnumber,
                                      option.title,
                                      option.sku,
                                      option.productgroup
                                    )}`
                                  );
                                }
                              }
                            }}
                          >
                            <Box
                              sx={{
                                display: "flex",
                                flexDirection: "row",
                                justifyContent: "space-between",
                              }}
                              columnGap={1}
                            >
                              <Box className={style.productName}>
                                <Box className={style.optionText}>
                                  {option?.title ? option.title : ""}
                                </Box>
                              </Box>

                              {option?.modelnumber && (
                                <Box className={style.modelNumber}>
                                  <Box className={style.optionText}>
                                    {option?.modelnumber}
                                  </Box>
                                </Box>
                              )}

                              {option?.sku && (
                                <Box className={style.sku}>
                                  <Box className={style.optionText}>
                                    SKU {option?.sku}
                                  </Box>
                                </Box>
                              )}

                              {option?.vColor && option?.vColor?.[0] && (
                                <Box className={style.vColor}>
                                  <Box className={style.optionText}>
                                    {option?.vColor ? option?.vColor?.[0] : ""}
                                  </Box>
                                </Box>
                              )}

                              <Box className={style.price}>
                                <Box className={style.optionText}>
                                  {CommonConstants.CURRENCY}
                                  {option?.price
                                    ? option.price
                                    : option?.mPrice
                                    ? option.mPrice
                                    : "0"}
                                </Box>
                              </Box>
                            </Box>
                          </Box>
                        ) : (
                          searchType === SEARCH_TYPE.ORDER && (
                            <div key={option.Id}>
                              <Box
                                component="li"
                                className={style.searchOption}
                                style={{
                                  paddingTop: "10px",
                                  paddingBottom: "10px",
                                }}
                                key={option.Id}
                                onClick={(e) => {
                                  setOpen(false);
                                  router.push(
                                    "/patient/" +
                                      option.PatientId +
                                      "?tab_index=5"
                                  );
                                }}
                              >
                                <Grid container spacing={2}>
                                  <Grid item xs={9}>
                                    <Box className={style.optionText}>
                                      <div className={style.nameSection}>
                                        <span
                                          className={style.namePart}
                                          style={{ marginBottom: "4px" }}
                                        >{`${option.OrderNumber}`}</span>
                                      </div>
                                    </Box>
                                  </Grid>
                                </Grid>
                              </Box>
                              <Divider className={style.lineColor} />
                            </div>
                          )
                        )
                      }
                      renderTags={() => null}
                      renderInput={(params) => (
                        <Box className={style.searchWithSelect}>
                          <Select
                            id="search-select"
                            value={searchType}
                            onChange={handleSearchType}
                            className={style.searchSelect}
                            inputProps={{
                              "data-testid": "search-select",
                            }}
                          >
                            <MenuItem
                              value={SEARCH_TYPE.PATIENT}
                              className="searchMenuItem"
                            >
                              {t(`HEADER.${SEARCH_TYPE.PATIENT}`)}
                            </MenuItem>
                            <MenuItem
                              value={SEARCH_TYPE.PRODUCT}
                              className="searchMenuItem"
                            >
                              {t(`HEADER.${SEARCH_TYPE.PRODUCT}`)}
                            </MenuItem>
                            <MenuItem
                              value={SEARCH_TYPE.ORDER}
                              className="searchMenuItem"
                            >
                              {t(`HEADER.${SEARCH_TYPE.ORDER}`)}
                            </MenuItem>
                          </Select>
                          <TextField
                            {...params}
                            placeholder={
                              searchType === SEARCH_TYPE.PRODUCT
                                ? "SKU, Item Number or Product Name"
                                : searchType === SEARCH_TYPE.ORDER
                                ? t("HEADER.ORDER_NUMBER")
                                : ""
                            }
                            data-testid="Search"
                            aria-label="search-label"
                            InputProps={{
                              ...params.InputProps,
                              endAdornment: (
                                <React.Fragment>
                                  {loading ? (
                                    <CircularProgress
                                      color="inherit"
                                      size={14}
                                      sx={{ marginRight: "10px" }}
                                    />
                                  ) : null}
                                  <Image
                                    src={serachIcon}
                                    width={14}
                                    height={15}
                                    alt="search-icon"
                                    style={{ marginRight: "-20px" }}
                                  />
                                </React.Fragment>
                              ),
                            }}
                          />
                        </Box>
                      )}
                      PaperComponent={({ children }) =>
                        searchType === SEARCH_TYPE.PRODUCT ? (
                          <Box className={style.autoComplete}>
                            <Box>{children}</Box>
                            {!isCDC && (
                              <Box className={style.buttonContentContainer}>
                                <Button
                                  className={style.pofButton}
                                  data-testid="addProductButton"
                                  onMouseDown={(e) => {
                                    localStorage.removeItem("viewProductData");
                                    localStorage.removeItem("pofFrameData");
                                    localStorage.removeItem(
                                      "POFFrameVariantId"
                                    );
                                    if (
                                      userType !== USER_TYPE.ASSOCIATE &&
                                      typeof window !== "undefined" &&
                                      JSON.parse(
                                        localStorage.getItem(
                                          "CurrentSelectedPatient"
                                        ) as string
                                      )?.Id &&
                                      localStorage.getItem(
                                        "isContinueShopping"
                                      ) === "true"
                                    ) {
                                      setAddPofModalOpen(true);
                                      setSelectedPatient(
                                        JSON.parse(
                                          localStorage.getItem(
                                            "CurrentSelectedPatient"
                                          ) as string
                                        )
                                      );
                                    } else {
                                      setShowPatientAssociateModal(true);
                                    }
                                  }}
                                >
                                  POF
                                </Button>
                              </Box>
                            )}
                          </Box>
                        ) : (
                          searchType === SEARCH_TYPE.ORDER && (
                            <Box className={style.autoComplete}>{children}</Box>
                          )
                        )
                      }
                    />
                  ) : (
                    (props.session?.user as any)?.authData?.userType ===
                      USER_TYPE.ASSOCIATE &&
                    canSearchPatient &&
                    searchType === SEARCH_TYPE.PATIENT && (
                      <SearchPatientBar
                        performPatientSelectAction={performPatientSelectAction}
                        recentlyCreatedPatientId={recentlyCreatedPatientId}
                        setRecentlyCreatedPatientId={
                          setRecentlyCreatedPatientId
                        }
                        isFromDiffModule={false}
                        setSnackBar={setSnackBar}
                        isFromHeader={true}
                        handleSearchType={handleSearchType}
                      />
                    )
                  )}
                </>
              )}
            </Box>
            {isPageLoading ? (
              <>
                {!isAgent && (
                  <Box
                    className={`${style.appointmentSection} ${
                      props.roleType !== USER_TYPE.ASSOCIATE && style.rowReverse
                    }`}
                  >
                    {props.roleType === USER_TYPE.ASSOCIATE ? (
                      <>
                        {props.isCDCView ? (
                          <>
                            <Button
                              className={style.appointmentBtn}
                              aria-label="supportNumber"
                              tabIndex={0}
                              data-testid="supportNumber"
                              component={Link}
                              href="https://nowoptics.franconnect.net/fc/"
                              target="_blank"
                            >
                              {t("HEADER.SUPPORT_NUMBER")}
                            </Button>
                          </>
                        ) : getPosAppintmentsPermisison ? (
                          <>
                            <Button
                              className={style.appointmentBtn}
                              aria-label="appointments"
                              tabIndex={0}
                              onClick={() => router.push("/appointments")}
                              data-testid="Appointments"
                            >
                              {t("HEADER.APPOINTMENTS")}
                            </Button>
                          </>
                        ) : (
                          <></>
                        )}
                      </>
                    ) : (
                      <>
                        <Button
                          className={style.appointmentBtn}
                          aria-label="BookEyeExam"
                          tabIndex={0}
                          onClick={() => router.push("/book-eye-exam")}
                          data-testid="BookEyeExam"
                        >
                          {t("HEADER.BOOK_EYE_EXAM")}
                        </Button>
                      </>
                    )}
                    {!props.isCDCView &&
                      props.roleType === USER_TYPE.ASSOCIATE && (
                        <Box
                          sx={{
                            display: "flex",
                            justifyContent: "center",
                            marginTop: "5px",
                          }}
                        >
                          <Box component="span" className={style.supportNumber}>
                            {t("HEADER.STORE_SUPPORT")}
                            &nbsp;
                            {
                              <a
                                href={`tel:${SO_DEFAULT_STORE_SUPPORT_NUMBER}`}
                              >
                                {SO_DEFAULT_STORE_SUPPORT_NUMBER}
                              </a>
                            }
                          </Box>
                        </Box>
                      )}
                  </Box>
                )}
              </>
            ) : (
              <Skeleton height={60} width={142} variant="rectangular" />
            )}
          </div>
        </AppBar>
      </Box>
      <PrimaryModal
        modalOpen={showAddPrescriptionModal}
        setModalOpen={setShowAddPrescriptionModal}
        modalInner={
          <AddNewRxPrescriptionModal
            showDescription={true}
            showDropdown={false}
            uploadImage={true}
            viewMode={false}
            headingTitle="Add Spectacle Prescription"
            prescriptionType="eyeglass"
            setModalOpen={setShowAddPrescriptionModal}
            prescriptionHeaders={addPrescriptionHeaders}
            type="patientEyeglass"
            addPrescription={handleAddPrescriptionSave}
            storeId={storeId !== null ? storeId?.Id?.toString() : ""}
            patientId={
              selectedPatient !== null ? selectedPatient?.Id?.toString() : ""
            }
            userType={USER_TYPE.ASSOCIATE}
            showSnackBar={showSnackBar}
          />
        }
        cstmStyle={"patientAddNewPrescriptionModal"}
      />
      {userType === USER_TYPE.ASSOCIATE && showPrescriptionPage ? (
        <Prescription
          toggle={togglePrescriptionPage}
          isVisible={showPrescriptionPage}
          handleSubmit={handleAddToCart}
          productData={productData}
          setUserLensMaterialSelection={setUserLensMaterialSelection}
        />
      ) : (
        <>
          <Modal
            open={
              showPatientAssociateModal ||
              showSearchScreen ||
              showPrescriptionScreen ||
              showNotFoundScreen
            }
            onClose={handlePatientClose}
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
            data-testid="select-patient-modal"
          >
            <>
              {showSearchScreen && !showPrescriptionScreen ? (
                !showSelectPatientModal && (
                  <PrescriptionLoadingView
                    userType={userType}
                    productType={productData?.ProductType}
                    patientId={selectedPatient?.Id.toString()}
                    toggle={() => {
                      handleOpenSelectPatient();
                      setShowSearchScreen(false);
                    }}
                    selectedPatient={selectedPatient}
                    handleLoadingScreenContinue={handleLoadingScreenContinue}
                    handleShowPrescription={handleShowPrescription}
                    handleAddNewPrescriptionClick={
                      handleAddNewPrescriptionClick
                    }
                  />
                )
              ) : showPrescriptionScreen && !showNotFoundScreen ? (
                !showSelectPatientModal && (
                  <PrescriptionFoundView
                    eyeglassValues={eyeglassValues}
                    setEyeglassValues={setEyeglassValues}
                    toggle={() => {
                      handleOpenSelectPatient();
                      setShowPrescriptionScreen(false);
                    }}
                    handlePrescriptionfoundBack={handlePrescriptionfoundBack}
                    showPrescription={handleShowPrescription}
                    selectedPrescriptionId={selectedPrescriptionId}
                    contactBoxSelection={contactBoxSelection}
                    brandName={productData?.ContactLensDetail?.Brand || ""}
                    setShowBrandChangeModel={setShowBrandChangeModel}
                  />
                )
              ) : showNotFoundScreen ? (
                !showSelectPatientModal && (
                  <PrescriptionNotFoundView
                    toggle={() => {
                      handleOpenSelectPatient();
                      setShowPrescriptionScreen(false);
                    }}
                    type="expired"
                    handleShowPrescription={handleShowPrescription}
                    handleAddNewPrescriptionClick={
                      handleAddNewPrescriptionClick
                    }
                  />
                )
              ) : (
                <SelectPatientAssociateModal
                  toggle={() =>
                    setShowPatientAssociateModal(!showPatientAssociateModal)
                  }
                  userInput={userInput}
                  handleUserInput={handleUserInput}
                  selectPatientData={selectPatientData}
                  selectedPatient={selectedPatient}
                  setSelectedPatient={setSelectedPatient}
                  handleContinueClick={handleContinueClick}
                  isLoading={isPatientSearching}
                />
              )}
            </>
          </Modal>
          <PrimaryModal
            modalOpen={getAddPofModalOpen}
            setModalOpen={setAddPofModalOpen}
            modalInner={
              <AddPOFModal
                setModalOpen={setAddPofModalOpen}
                setIsReload={setAddPofIsReload}
                isReload={isPOFReload}
                formData={formDataPOF}
                setFormData={setFormDataPOF}
                handleNext={handleAddPOF}
                dataParams={{ patientId: faViewSelectedUser?.Id }}
                setSnackBar={setSnackBar}
              />
            }
            cstmStyle={"addNewUserModalWrapper"}
          />
          {mergeGuestCartWithPatientCart && (
            <ConfirmationModal
              content={"Would you like to add items from your previous cart?"}
              open={mergeGuestCartWithPatientCart}
              handleClose={() => {}}
              performAction={() => {}}
              btnOneText={"CANCEL"}
              btnTwoText={"YES"}
              Id={0}
              isMergeGuestCartFlow={true}
              performActionForMergeCart={updateGuestCartDataWithMerge}
            />
          )}
        </>
      )}
    </>
  );
}
