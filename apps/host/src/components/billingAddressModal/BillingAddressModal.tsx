import {
  AlertColor,
  Button,
  FormControl,
  FormHelperText,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
} from "@mui/material";
import styles from "./BillingAddressModal.module.scss";
import { useEffect, useState } from "react";
import {
  billingAddressFormData,
  BillingAddressModalProps,
  ZipCodeDetailsDTO,
} from "@root/host/src/types/billingAddressModal.types";
import {
  COUNTRY_LIST,
  isZipcodeValidRegex,
  SNACKBAR_COLOR_TYPE,
  STATE_LIST,
} from "@root/host/src/constants/common.constants";
import { useSnackBar } from "@/contexts/Snackbar/SnackbarContext";
import { ERROR_MESSAGE } from "@root/host/src/constants/auth.constants";
import { savePatientAddress, ValidateZipCode } from "@/service/common.service";
import IconSVG from "../iconsvg/IconSVG";

const BillingAddressModal = (props: BillingAddressModalProps) => {
  const { isEasyReorderFlow, shippingAddress } = props;
  const { showSnackBar } = useSnackBar();
  const [billingAddressData, setBillingAddressData] =
    useState<billingAddressFormData>({
      addressLine1: {
        value:
          isEasyReorderFlow && shippingAddress?.AddressLine1
            ? shippingAddress.AddressLine1
            : "",
        error: false,
        errorMessage: ERROR_MESSAGE.INVALID_ADDRESS,
      },
      addressLine2: {
        value:
          isEasyReorderFlow && shippingAddress?.AddressLine2
            ? shippingAddress.AddressLine2
            : "",
        error: false,
        errorMessage: "",
      },
      zipcode: {
        value:
          isEasyReorderFlow && shippingAddress?.ZipCode
            ? shippingAddress.ZipCode
            : "",
        error: false,
        errorMessage: ERROR_MESSAGE.ZIP_CODE,
      },
      city: {
        value:
          isEasyReorderFlow && shippingAddress?.City
            ? shippingAddress.City
            : "",
        error: false,
        errorMessage: "",
      },
      state: {
        value: "",
        error: false,
        errorMessage: "",
      },
      county: {
        value: "",
        error: false,
        errorMessage: "",
      },
      country: {
        value: "",
        error: false,
        errorMessage: "",
      },
    });

  const [billingZipCodeDetails, setBillingZipCodeDetails] =
    useState<ZipCodeDetailsDTO | null>(null);
  const [billingCityList, setBillingCityList] = useState<string[]>([]);
  const [storeId, setStoreId] = useState<string | null>(null);

  useEffect(() => {
    if (
      typeof window !== "undefined" &&
      localStorage?.getItem("selectedStore")
    ) {
      setStoreId(
        JSON.parse(localStorage?.getItem("selectedStore") as string)?.Id
      );
    }
  }, [typeof window !== "undefined" && localStorage]);

  const handleBillingChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target as HTMLInputElement;
    setBillingAddressData({
      ...billingAddressData,
      [name]: {
        ...billingAddressData[name as keyof typeof billingAddressData],
        value,
        error: false,
      },
    });
  };

  const getBillingAddressDataByZipCode = (value: string) => {
    ValidateZipCode(value)
      .then((res) => {
        const result = res?.data?.Result;
        setBillingZipCodeDetails(result);
        const city =
          result?.AddressCityZip?.CitiesNameList.length > 1
            ? isEasyReorderFlow && shippingAddress?.City
              ? shippingAddress.City
              : ""
            : result?.AddressCityZip?.CitiesNameList[0];
        const state = result?.StateName;
        const county = result?.CountyName;
        const country = result?.CountryName;
        setBillingCityList(result?.AddressCityZip?.CitiesNameList);
        setBillingAddressData((prevValues) => ({
          ...prevValues,
          city: { value: city, error: false, errorMessage: "" },
          state: { value: state, error: false, errorMessage: "" },
          county: { value: county, error: false, errorMessage: "" },
          country: { value: country, error: false, errorMessage: "" },
        }));
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

  const billingZipCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target as HTMLInputElement;
    setBillingAddressData({
      ...billingAddressData,
      [name]: {
        ...billingAddressData[name as keyof typeof billingAddressData],
        value,
        error: false,
      },
    });

    if (isZipcodeValidRegex.test(value as string)) {
      getBillingAddressDataByZipCode(value);
    } else {
      setBillingZipCodeDetails(null);
      setBillingAddressData((prevValues) => ({
        ...prevValues,
        city: { value: "", error: false, errorMessage: "" },
        state: { value: "", error: false, errorMessage: "" },
        county: { value: "", error: false, errorMessage: "" },
        country: { value: "", error: false, errorMessage: "" },
      }));
    }
  };

  function handleBillingCityChange(
    event: SelectChangeEvent<string>,
    child: React.ReactNode
  ): void {
    const { name, value } = event.target as HTMLInputElement;
    setBillingAddressData({
      ...billingAddressData,
      [name]: {
        ...billingAddressData[name as keyof typeof billingAddressData],
        value,
        error: false,
      },
    });
  }

  const saveBillingAddress = () => {
    const payload = {
      id: 0,
      patientId: props.patientId,
      addressType: "billing",
      addressLine1: billingAddressData?.addressLine1?.value,
      addressLine2: billingAddressData?.addressLine2?.value,
      zipCode: billingAddressData?.zipcode?.value,
      stateCode: billingZipCodeDetails?.StateId
        ? STATE_LIST[billingZipCodeDetails?.StateId]
        : "",
      countryCode: billingZipCodeDetails?.CountryId
        ? COUNTRY_LIST[billingZipCodeDetails.CountryId]
        : "",
      city: billingAddressData?.city?.value,
      county: billingAddressData?.county?.value,
      storeId: storeId,
    };
    savePatientAddress(payload)
      .then((res) => {
        if (props.setSnackBar) {
          props.setSnackBar(
            res?.data?.SuccessMessage,
            SNACKBAR_COLOR_TYPE.SUCCESS as AlertColor
          );
        } else {
          showSnackBar(
            res?.data?.SuccessMessage,
            SNACKBAR_COLOR_TYPE.SUCCESS as AlertColor
          );
        }
        props.setIsBillingAddressModalOpen(false);
      })
      .catch((error) => {
        if (props.setSnackBar) {
          props.setSnackBar(
            error.response
              ? error?.response?.data?.Error?.Message
              : ERROR_MESSAGE.API_DEFAULT_ERROR_MESSAGE,
            SNACKBAR_COLOR_TYPE.ERROR as AlertColor
          );
        } else {
          showSnackBar(
            error.response
              ? error?.response?.data?.Error?.Message
              : ERROR_MESSAGE.API_DEFAULT_ERROR_MESSAGE,
            SNACKBAR_COLOR_TYPE.ERROR as AlertColor
          );
        }
      });
  };

  const handleSubmit = (formValues: billingAddressFormData) => {
    const formFields = Object.keys(formValues);
    let newFormValues = { ...formValues };
    for (let index = 0; index < formFields.length; index++) {
      const currentField = formFields[index];
      const currentValue =
        formValues[currentField as keyof typeof formValues].value;
      if (!currentValue && currentField === "addressLine1") {
        newFormValues = {
          ...newFormValues,
          [currentField]: {
            ...newFormValues[currentField as keyof typeof formValues],
            error: true,
            errorMessage: ERROR_MESSAGE.INVALID_ADDRESS,
          },
        };
      } else if (currentField === "zipcode") {
        if (currentValue === "") {
          newFormValues.zipcode.errorMessage = ERROR_MESSAGE.ZIP_CODE;
          newFormValues.zipcode.error = true;
        } else if (
          !isZipcodeValidRegex.test(currentValue as string) &&
          currentValue !== ""
        ) {
          newFormValues.zipcode.errorMessage = ERROR_MESSAGE.INVALID_ZIPCODE;
          newFormValues.zipcode.error = true;
        } else {
          newFormValues.zipcode.error = false;
        }
      } else if (currentField === "city" && currentValue === "") {
        newFormValues = {
          ...newFormValues,
          [currentField]: {
            ...newFormValues[currentField as keyof typeof formValues],
            error: true,
            errorMessage: ERROR_MESSAGE.INVALID_CITY,
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
    setBillingAddressData(newFormValues);
    if (
      !newFormValues.addressLine1.error &&
      !newFormValues.zipcode.error &&
      !newFormValues.city.error
    ) {
      if (props.isEasyReorderFlow && props.saveShippingAddress) {
        props.saveShippingAddress(newFormValues);
        return;
      }
      saveBillingAddress();
    }
  };

  useEffect(() => {
    if (isEasyReorderFlow && shippingAddress?.ZipCode) {
      getBillingAddressDataByZipCode(shippingAddress.ZipCode);
    }
  }, [isEasyReorderFlow, shippingAddress?.ZipCode]);
  return (
    <div
      className={`${styles.form} ${
        props.isEasyReorderFlow ? styles.easyreorderShipping : ""
      }`}
    >
      {!props.isEasyReorderFlow && (
        <div className={styles.headingwrapper}>
          <h3 className={styles.headingLabel}>Billing Address</h3>
          <div
            className={styles.closeIconWrapper}
            onClick={() => props.setIsBillingAddressModalOpen(false)}
          >
            <IconSVG
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="#4d4d4d"
              name="modal_cross"
            />
          </div>
        </div>
      )}
      <div
        className={styles.formFields}
        data-testid="billing-address-container"
      >
        <TextField
          type="text"
          name="addressLine1"
          placeholder="Address Line1"
          className={styles.textInput}
          error={billingAddressData.addressLine1.error}
          helperText={
            billingAddressData.addressLine1.error &&
            billingAddressData.addressLine1.errorMessage
          }
          value={billingAddressData?.addressLine1?.value}
          onChange={handleBillingChange}
        />
        <TextField
          type="text"
          name="addressLine2"
          placeholder="Address Line2"
          className={styles.textInput}
          value={billingAddressData?.addressLine2?.value}
          onChange={handleBillingChange}
        />
        <TextField
          name="zipcode"
          placeholder="Zip Code"
          className={styles.textInput}
          error={billingAddressData.zipcode.error}
          helperText={
            billingAddressData.zipcode.error &&
            billingAddressData.zipcode.errorMessage
          }
          value={billingAddressData?.zipcode?.value}
          onChange={billingZipCodeChange}
        />
        {billingAddressData?.zipcode.value && (
          <>
            {billingCityList.length > 1 ? (
              <FormControl
                fullWidth
                className={styles.selectCity}
                error={billingAddressData.city.error}
              >
                <Select
                  fullWidth
                  data-testid="city-billing-select"
                  name="city"
                  displayEmpty
                  value={billingAddressData.city.value}
                  onChange={handleBillingCityChange}
                  renderValue={(selected) => {
                    if (selected.length === 0) {
                      return <p>Select City</p>;
                    } else {
                      return selected;
                    }
                  }}
                  MenuProps={{
                    style: {
                      zIndex: 2002,
                    },
                  }}
                >
                  {billingCityList.map((city, index) => (
                    <MenuItem value={city} key={city + index}>
                      {city}
                    </MenuItem>
                  ))}
                </Select>
                <FormHelperText>
                  {billingAddressData.city.error &&
                    billingAddressData.city.errorMessage}
                </FormHelperText>
              </FormControl>
            ) : (
              <TextField
                fullWidth
                placeholder={"City"}
                disabled={true}
                InputProps={{
                  classes: {
                    root: `${styles.disabled}`,
                  },
                }}
                className={styles.textInput}
                error={billingAddressData.city.error}
                helperText={
                  billingAddressData.city.error &&
                  billingAddressData.city.errorMessage
                }
                value={billingAddressData.city.value}
                onChange={handleBillingChange}
              />
            )}
            <TextField
              type="text"
              disabled={true}
              InputProps={{
                classes: {
                  root: `${styles.disabled}`,
                },
              }}
              className={styles.textInput}
              name="state"
              placeholder="State"
              error={billingAddressData.state.error}
              helperText={
                billingAddressData.state.error &&
                billingAddressData.state.errorMessage
              }
              value={billingAddressData?.state?.value}
              onChange={handleBillingChange}
            />
            <TextField
              type="text"
              disabled={true}
              InputProps={{
                classes: {
                  root: `${styles.disabled}`,
                },
              }}
              className={styles.textInput}
              name="county"
              placeholder="County"
              error={billingAddressData.county.error}
              helperText={
                billingAddressData.county.error &&
                billingAddressData.county.errorMessage
              }
              value={billingAddressData?.county?.value}
              onChange={handleBillingChange}
            />
            <TextField
              type="text"
              disabled={true}
              InputProps={{
                classes: {
                  root: `${styles.disabled}`,
                },
              }}
              className={styles.textInput}
              name="country"
              placeholder="Country"
              error={billingAddressData.country.error}
              helperText={
                billingAddressData.country.error &&
                billingAddressData.country.errorMessage
              }
              value={billingAddressData?.country?.value}
              onChange={handleBillingChange}
            />{" "}
          </>
        )}
      </div>
      <div className={styles.saveButtonWrapper}>
        <Button
          className={styles.saveButton}
          onClick={() => handleSubmit(billingAddressData)}
        >
          Save
        </Button>
      </div>
    </div>
  );
};

export default BillingAddressModal;
