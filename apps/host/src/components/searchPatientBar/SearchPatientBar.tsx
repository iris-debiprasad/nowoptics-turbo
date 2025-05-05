import style from "./SearchPatientBar.module.scss";
import {
  Box,
  Button,
  Autocomplete,
  TextField,
  Grid,
  Divider,
  Typography,
  AlertColor,
  Select,
  MenuItem,
  Popover,
} from "@mui/material";
import dayjs from "dayjs";
import { useRouter } from "next/router";
import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import serachIcon from "../../../../assets/Images/icons/searchIcon.svg";
import AdvancedSearchForm from "../advancedSearchForm/AdvancedSearchForm";
import PrimaryModal from "../primary_modal/PrimaryModal";
import AddPatientModal from "../addPatientModal/AddPatientModal";
import SelectPatientForMergeModal from "../mergePatient/SelectPatientForMergeModal";
import {
  SearchProductsDataDTO,
  SearchType,
} from "@root/host/src/types/Header.types";
import {
  SEARCH_TYPE,
  patientSearchButtonContent,
} from "@root/host/src/constants/header.constants";
import { formatPhoneNumber } from "@root/host/src/utils/common.utils";
import { useSnackBar } from "@root/host/src/contexts/Snackbar/SnackbarContext";
import {
  DEBOUNCE_TIME,
  NUMBER_OF_SEARCH_RECORD,
  SNACKBAR_COLOR_TYPE,
  isSearchValidRegex,
} from "@root/host/src/constants/common.constants";
import { GetPatientSearchData } from "@root/host/src/service/search.service";
import { ERROR_MESSAGE } from "@root/host/src/constants/auth.constants";
import {
  PatientDetailsDTO,
  SearchPatientBarProps,
} from "@root/host/src/types/addPatientModal.types";
import {
  GetAllRelationshipsTypes,
  getAllMasterSetupByType,
} from "@root/host/src/service/common.service";
import { useDebounce } from "@root/host/src/hooks/useDebounce";
import { useTranslation } from "react-i18next";
import { useAppSelector } from "@root/host/src/store/useStore";
import { useDispatch, useSelector } from "react-redux";
import { FETCH_SEARCH_ADVANCED_DATA } from "@root/host/src/store/reducer/searchAdvancedReducer";

const SearchPatientBar = (props: SearchPatientBarProps) => {
  const {
    performPatientSelectAction,
    recentlyCreatedPatientId,
    setRecentlyCreatedPatientId,
    isFromDiffModule,
    setSnackBar,
    phoneNumbForSearch,
    handleSearchType,
    isFromHeader,
    markPatientSelectedFalse,
    isCreateFromPatientModule,
  } = props;
  const { t } = useTranslation();
  const { showSnackBar } = useSnackBar();
  const [open, setOpen] = useState(false);
  const [allSearchOptions, setAllSearchOptions] = useState<
    SearchProductsDataDTO[]
  >([]);
  const [searchType, setSearchType] = useState<SearchType>(
    SEARCH_TYPE.PATIENT as SearchType
  );
  const [loading, setLoading] = useState(false);
  const [countryCodeOptions, setCountryCodeOptions] = React.useState([]);
  const [isSearchAdvancedSection, setIsSearchAdvancedSection] =
    React.useState(false);
  const [inputValue, setInputValue] = useState<string>("");
  const [isCountryRelationshipOptions, setIsCountryRelationshipOptions] =
    useState(false);
  const [patientIdsForMerge, setPatientIdsForMerge] = useState([]);
  const [isAddPatientModal, setIsAddPatientModal] = useState(false);
  const [isSelectPatientForMergeModal, setIsSelectPatientForMergeModal] =
    useState(false);

  const [relationTypesOptions, setRelationTypesOptions] = React.useState([]);
  const [otpModalOpen, setOtpModalOpen] = React.useState(false);
  const [isListOfPatients, setIsListOfPatients] = React.useState(false);
  const [patientListData, setPatientListData] =
    React.useState<PatientDetailsDTO[]>();
  const [mobileNumberExistsMessage, setMobileNumberExistsMessage] =
    React.useState("");
  const [addRelationSuccessModal, setAddRelationSuccessModal] =
    React.useState(false);
  const [successMessage, setSuccessMessage] = React.useState("");
  const [createdPatientId, setCreatedPatientId] = React.useState(0);
  const debouncedInputValue = useDebounce(inputValue, DEBOUNCE_TIME);
  const [autoComplRef, setAutoComplRef] = useState<
    (EventTarget & HTMLDivElement) | null
  >(null);
  const [anchorEl, setAnchorEl] = React.useState<
    (EventTarget & HTMLDivElement) | null
  >(null);
  const [popoverWidth, setPopoverWidth] = useState<number | null>(null);
  const router = useRouter();
  const divRef = useRef<HTMLDivElement>(null);

  const isCDC = useAppSelector((state) => state.cdcView.data.isCDCView);
  const dispatch = useDispatch();

  useEffect(() => {
    if (phoneNumbForSearch) {
      setInputValue(phoneNumbForSearch);
      setOpen(true);
      setAutoComplRef(divRef.current);

      if (sessionStorage) {
        const data = sessionStorage.getItem("ringCentralData");
        const ringCentralData =
          !!data && data !== "{}" ? JSON.parse(data) : null;
        const phoneNumWithISD = ringCentralData?.rcData?.PhoneNumber;
        const isISD =
          phoneNumWithISD?.startsWith("+") &&
          phoneNumWithISD?.includes(phoneNumbForSearch);
        const ISD_CODE = isISD
          ? phoneNumWithISD?.split(phoneNumbForSearch)[0]
          : "";
        if (phoneNumWithISD) {
          dispatch(
            FETCH_SEARCH_ADVANCED_DATA({
              Id: "",
              UserFirstName: "",
              UserLastName: "",
              Email: "",
              PhoneNumber: phoneNumbForSearch,
              CountryCode: ISD_CODE,
              Dob: null,
            })
          );
        }
      }
    }
  }, [
    phoneNumbForSearch,
    typeof window !== "undefined" && sessionStorage.getItem("session"),
  ]);

  useEffect(() => {
    if (!recentlyCreatedPatientId) {
      getSearchDataForAssociate(debouncedInputValue);
    }
  }, [debouncedInputValue]);

  const getCountryCodeOptions = async (type: string) => {
    getAllMasterSetupByType(type)
      .then((response) => {
        if (response?.status === 200) {
          setCountryCodeOptions(response?.data?.Result);
        }
      })
      .catch((err) => {
        showSnackBar(
          err.response
            ? err?.response?.data?.Error?.Message
            : ERROR_MESSAGE.API_DEFAULT_ERROR_MESSAGE,
          SNACKBAR_COLOR_TYPE.ERROR as AlertColor
        );
      });
  };

  const getAllRelationshipsForPatient = async () => {
    await GetAllRelationshipsTypes()
      .then((res) => {
        setRelationTypesOptions(res?.data?.Result);
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

  React.useEffect(() => {
    if (isCountryRelationshipOptions) {
      getAllRelationshipsForPatient();
    }
  }, [isCountryRelationshipOptions]);

  React.useEffect(() => {
    if (isCountryRelationshipOptions) {
      getCountryCodeOptions("country/countrycode");
    } else if (
      (isSearchAdvancedSection || anchorEl) &&
      countryCodeOptions.length === 0
    ) {
      getCountryCodeOptions("country/countrycode");
    }
  }, [isCountryRelationshipOptions, isSearchAdvancedSection, anchorEl]);

  const getSearchDataForAssociate = (searchTerm?: string) => {
    if (isSearchValidRegex.test(searchTerm as string)) {
      setLoading(true);
      GetPatientSearchData(searchTerm as string, NUMBER_OF_SEARCH_RECORD)
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
              ? err.response.data.Error.Message
              : ERROR_MESSAGE.API_DEFAULT_ERROR_MESSAGE,
            SNACKBAR_COLOR_TYPE.ERROR as AlertColor
          );
        });
    }
  };

  const handleHeaderSearchButtonClick = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    id: string
  ) => {
    e.stopPropagation();
    e.preventDefault();
    if (id === "addPatient") {
      setOpen(false);
      setIsAddPatientModal(true);
      setIsCountryRelationshipOptions(true);
    } else if (id === "searchAdvanced") {
      setAnchorEl(autoComplRef);
      setPopoverWidth(autoComplRef?.clientWidth as number);
      setIsCountryRelationshipOptions(false);
    }
  };

  const openAdvanceSearchForGuidedSales = () => {
    setAnchorEl(autoComplRef);
    setPopoverWidth(autoComplRef?.clientWidth as number);
    setIsCountryRelationshipOptions(false);
  };

  useEffect(() => {
    if (props.loadAdvanceSearch) {
      openAdvanceSearchForGuidedSales();
    }
  }, [props.loadAdvanceSearch]);

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box className={style.serachPatientWrapper}>
      <Box className={style.searchSectionBar}>
        <Autocomplete
          options={allSearchOptions}
          sx={{ width: "100%" }}
          open={open}
          className={style.autoCompleteSearchPatientBar}
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
            setInputValue("");
            setOpen(false);
          }}
          noOptionsText={"No record found"}
          filterOptions={(options, state) => options}
          getOptionLabel={(option) => {
            if (typeof option === "string") {
              return option;
            } else {
              return option?.title ? option.title : option.FirstName;
            }
          }}
          inputValue={inputValue}
          onInputChange={(event, newInputValue, reason) => {
            if (reason === "input") {
              setAnchorEl(null);
              setRecentlyCreatedPatientId(0);

              if (
                searchType === SEARCH_TYPE.PATIENT &&
                newInputValue.length < 3
              ) {
                setAllSearchOptions([]);
              }
              setInputValue(newInputValue);
            }
            markPatientSelectedFalse && markPatientSelectedFalse();
          }}
          loading={loading}
          renderOption={(props, option) =>
            searchType === SEARCH_TYPE.PATIENT &&
            !isSearchAdvancedSection && (
              <div key={option.Id}>
                <Box
                  component="li"
                  className={style.searchOption}
                  key={option.Id}
                  onClick={(e) => {
                    setOpen(false);
                    performPatientSelectAction(option);
                  }}
                >
                  <Grid container spacing={2}>
                    <Grid item xs={9}>
                      <Box className={style.optionText}>
                        <div className={style.nameSection}>
                          <span
                            className={style.namePart}
                          >{`${option.FirstName} ${option.LastName} - ${option.Id}`}</span>
                          <span className={style.emailPart}>{`${
                            option.Email
                          } | ${formatPhoneNumber(
                            option.PhoneNumber.PhoneNumber,
                            false
                          )}`}</span>
                        </div>
                      </Box>
                    </Grid>
                    <Grid item xs={3}>
                      <Box className={style.optionText}>
                        <span className={style.emailPart}>
                          DOB: {dayjs(option.Dob).format("MM/DD/YYYY")}
                        </span>
                      </Box>
                    </Grid>
                  </Grid>
                </Box>
                <Divider className={style.lineColor} />
              </div>
            )
          }
          renderTags={() => null}
          renderInput={(params) => (
            <Box className={style.searchWithSelect}>
              {isFromHeader ? (
                <Box className={style.searchWithSelectContainer}>
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
                    placeholder="First name, last name, Phone, Email, or Patient ID"
                    data-testid="Search"
                    aria-label="search-label"
                    InputProps={{
                      ...params.InputProps,
                      endAdornment: (
                        <React.Fragment>
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
                    onClick={(e) => {
                      setAutoComplRef(e.currentTarget);
                    }}
                  />
                </Box>
              ) : (
                <TextField
                  {...params}
                  placeholder="First name, last name, Phone, Email, or Patient ID"
                  data-testid="Search"
                  aria-label="search-label"
                  ref={divRef}
                  autoFocus={true}
                  InputProps={{
                    ...params.InputProps,
                    endAdornment: (
                      <React.Fragment>
                        <Image
                          src={serachIcon}
                          width={14}
                          height={15}
                          alt="search-icon"
                          style={{ marginRight: "-20px" }}
                        />
                      </React.Fragment>
                    ),
                    startAdornment: (
                      <Box
                        sx={{
                          height: "100%",
                          display: "flex",
                          flexDirection: "row",
                          maxWidth: "fit-content",
                        }}
                      >
                        <Typography className={style.searchSelectPatient}>
                          Patient
                        </Typography>
                        <Divider
                          orientation="vertical"
                          variant="fullWidth"
                          flexItem
                        />
                      </Box>
                    ),
                  }}
                  onClick={(e) => {
                    setAutoComplRef(e.currentTarget);
                  }}
                />
              )}
            </Box>
          )}
          PaperComponent={({ children }) =>
            searchType === SEARCH_TYPE.PATIENT && !isSearchAdvancedSection ? (
              <div className={style.autoCompleteSearchPatientBar}>
                <Box>{children}</Box>
                <div className={style.buttonContentContainer}>
                  {patientSearchButtonContent &&
                    patientSearchButtonContent.map((button, index) => {
                      if (button.disableButtonInCDC && isCDC) return null;
                      return (
                        <Button
                          className={style.buttonContent}
                          key={index}
                          data-testid={button.id}
                          onMouseDown={(e) => {
                            handleHeaderSearchButtonClick(e, button.id);
                          }}
                        >
                          {button.text}
                        </Button>
                      );
                    })}
                </div>
              </div>
            ) : (
              <Box className={style.autoCompleteSearchPatientBar}>
                {children}
              </Box>
            )
          }
        />
        <Popover
          open={Boolean(anchorEl)}
          anchorEl={anchorEl}
          onClose={handleClose}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "center",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "center",
          }}
          slotProps={{
            paper: {
              style: {
                width: popoverWidth ? popoverWidth : "auto", // Set the width dynamically
              },
            },
          }}
        >
          <Box className={style.autoCompleteSearchPatientBar}>
            <AdvancedSearchForm
              countryCodeOptions={countryCodeOptions}
              setAllSearchOptions={setAllSearchOptions}
              setAnchorEl={setAnchorEl}
              setIsSelectPatientForMergeModal={setIsSelectPatientForMergeModal}
              setPatientIdsForMerge={setPatientIdsForMerge}
              setOpen={setOpen}
              isAdvancedSearchFromDiffModule={isFromDiffModule}
              setSnackBar={setSnackBar}
            />
          </Box>
        </Popover>
      </Box>
      {isAddPatientModal && (
        <PrimaryModal
          modalOpen={isAddPatientModal}
          setModalOpen={setIsAddPatientModal}
          modalInner={
            <AddPatientModal
              setIsAddPatientModal={setIsAddPatientModal}
              countryCodeOptions={countryCodeOptions}
              relationTypesOptions={relationTypesOptions}
              isListOfPatients={isListOfPatients}
              mobileNumberExistsMessage={mobileNumberExistsMessage}
              patientListData={patientListData as PatientDetailsDTO[]}
              otpModalOpen={otpModalOpen}
              setOtpModalOpen={setOtpModalOpen}
              setMobileNumberExistsMessage={setMobileNumberExistsMessage}
              setPatientListData={setPatientListData}
              setIsListOfPatients={setIsListOfPatients}
              setAddRelationSuccessModal={setAddRelationSuccessModal}
              addRelationSuccessModal={addRelationSuccessModal}
              successMessage={successMessage}
              createdPatientId={createdPatientId}
              isAddRelationshipFromPatientFile={isFromDiffModule}
              setSnackBar={setSnackBar}
              setRecentlyCreatedPatientId={setRecentlyCreatedPatientId}
              isCreateFromPatientModule={isCreateFromPatientModule}
            />
          }
          cstmStyle={"patientRelationshipAddRelationSuccessModal"}
        />
      )}
      {isSelectPatientForMergeModal && (
        <PrimaryModal
          modalOpen={isSelectPatientForMergeModal}
          setModalOpen={setIsSelectPatientForMergeModal}
          modalInner={
            <SelectPatientForMergeModal
              setIsSelectPatientForMergeModal={setIsSelectPatientForMergeModal}
              patientIdsForMerge={patientIdsForMerge}
              isMergeFromDiffModule={isFromDiffModule}
              setSnackBar={setSnackBar}
            />
          }
          cstmStyle={"selectPatientMergeModal"}
        />
      )}
    </Box>
  );
};

export default SearchPatientBar;
