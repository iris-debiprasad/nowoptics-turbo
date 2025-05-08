import { DATE_TIME_ISO } from "@root/intake/src/constants/intake.constants";
import { useSnackBar } from "@root/intake/src/context/SnackbarContext";
import { useDebounce } from "@root/intake/src/hooks/useDebounce";
import { useAppDispatch, useAppSelector } from "@root/host/src/hooks/useStore";
import {
  RESET_AVAILIBILITY_MODAL,
  SET_AVAILIBILITY_MODAL_PROPERTY,
} from "@root/host/src/store/reducer/intake.slice";
import {
  useGetCompanyDropdownQuery,
  useGetStateDropdownQuery,
  useGetStoreOptionsQuery,
  useSaveAvailibilityTemplateMutation,
  useVerifyAvailibilityTemplateMutation,
} from "@root/host/src/store/reducer/intakeApi.slice";
import { SetAvailibilityModalPropertyActionType } from "@root/host/src/types/Intake.types";
import {
  ErrorResponseType,
  GetCompanyDropdownResult,
  GetStateDropdownResult,
  GetStoreOptionsResult,
} from "@root/host/src/types/intakeApi.types";
import {
  AutocompleteInputChangeReason,
  createFilterOptions,
} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@root/assets/Images/icons/crossIcon(notAvailable).svg";
import { ERROR_MESSAGE } from "@root/host/src/constants/auth.constants";
import Image from "next/image";
import {
  FunctionComponent,
  SyntheticEvent,
  useEffect,
  useMemo,
  useState,
} from "react";
import Autocompleteinput from "../common/autocompleteinput";
import Checkbox from "../common/checkbox";
import DateInput from "../common/dateinput";
import styles from "./AvailibilityModal.module.scss";
import Availibilitytable from "./availibilitytable";
import ConfirmationModal from "@root/host/src/components/confirmationModal/ConfirmationModal";
import { ConfirmationModalProps } from "@root/host/src/types/confirmationModal.types";
import { IntakePermission } from "@root/intake/src/constants/intake-permission.constant";
import { GetPermissionConfig } from "@root/host/src/config/permissionConfig";

const AvailibilityModal = () => {
  const [canSaveAvailibiity, canVerifyAvalibility] = useAppSelector((state) =>
    GetPermissionConfig({
      ...state,
      permissionName: [
        IntakePermission.MEDICAL_FORMS.SAVE_AVAILIBILITY_TEMPLATE,
        IntakePermission.MEDICAL_FORMS.VERIFY_AVAILIBILITY_TEMPLATE,
      ],
    })
  ) as boolean[];
  const { showSnackBar } = useSnackBar();
  const [storeInputValue, setStoreInputValue] = useState<string>("");
  const debouncedStorInputValue = useDebounce<string>(storeInputValue, 500);
  const { data: companyData, isLoading: isCompanyDataLoading } =
    useGetCompanyDropdownQuery({});
  const { data: stateData, isLoading: isStateDataLoading } =
    useGetStateDropdownQuery({});
  const { data: storeData, isLoading: isStoreDataLoading } =
    useGetStoreOptionsQuery(
      { searchString: debouncedStorInputValue },
      {
        skip: debouncedStorInputValue.length < 3,
      }
    );
  const [saveAvailibilityTemplate] = useSaveAvailibilityTemplateMutation();
  const [verifyAvailibilityTemplate] = useVerifyAvailibilityTemplateMutation();
  const dispatch = useAppDispatch();
  const [confirmModal, setConfirmModal] = useState(false);
  const { state, company, store, tables, startDate, templateId, templateCode } =
    useAppSelector((state) => state.intake.formAvailibility);

  const isFormValid = useMemo(() => {
    if (startDate === null) return false;
    return [store, state, company].some((value) => value.length > 0);
  }, [store, state, company, startDate]);

  const handleCloseModal = () => {
    dispatch(
      SET_AVAILIBILITY_MODAL_PROPERTY({
        key: "open",
        value: false,
      })
    );
  };

  const handleUpdateAvailibilityProperty = (
    payload: SetAvailibilityModalPropertyActionType
  ) => {
    dispatch(SET_AVAILIBILITY_MODAL_PROPERTY(payload));
  };

  const handleStoreInputChange = (
    _event: SyntheticEvent<Element, Event>,
    value: string,
    _reason: AutocompleteInputChangeReason
  ) => {
    setStoreInputValue(value);
  };

  const handleVerify = async () => {
    try {
      const payload = {
        startDate: startDate!.format(DATE_TIME_ISO),
        templateId: Number(templateId),
        store: store.map((s) => s.Id),
        state: state.map((s) => s.Id),
        companyCategory: company.map((c) => c.Id),
      };
      const verifyResult = await verifyAvailibilityTemplate(payload).unwrap();
      const alreadyExists = verifyResult?.Error === null;
      if (alreadyExists) {
        setConfirmModal(true);
        return;
      }
      handleSave();
    } catch (error) {
      const status = (error as ErrorResponseType)?.status;

      if (status === 404) {
        handleSave();
        return;
      }

      showSnackBar(
        (error as ErrorResponseType)?.data?.Error?.Message ??
          ERROR_MESSAGE.API_DEFAULT_ERROR_MESSAGE,
        "error"
      );
    }
  };

  const handleSave = async () => {
    try {
      const payload = {
        startDate: startDate!.format(DATE_TIME_ISO),
        templateId: Number(templateId),
        store: store.map((s) => s.Id),
        state: state.map((s) => s.Id),
        companyCategory: company.map((c) => c.Id),
      };
      const result = await saveAvailibilityTemplate(payload).unwrap();

      if (result.Error) {
        showSnackBar(
          result.Error.Message ?? ERROR_MESSAGE.API_DEFAULT_ERROR_MESSAGE,
          "error"
        );
        return;
      }
      if (confirmModal) {
        setConfirmModal(false);
      }
      showSnackBar(result.SuccessMessage, "success");
    } catch (error) {
      showSnackBar(
        (error as ErrorResponseType)?.data?.Error?.Message ??
          ERROR_MESSAGE.API_DEFAULT_ERROR_MESSAGE,
        "error"
      );
    }
  };

  useEffect(() => {
    return () => {
      dispatch(RESET_AVAILIBILITY_MODAL());
    };
  }, [dispatch]);

  return (
    <div className={styles.modalContainer}>
      <div className={styles.modalHeader}>
        <p className={styles.modalTitle}>
          Set Availibility
        </p>
        <IconButton onClick={handleCloseModal} data-testid="close-modal-btn">
          <Image height={10} width={10} src={CloseIcon} alt="close-icon" />
        </IconButton>
      </div>
      <div className={styles.modalContent}>
        <div className={styles.modalBody}>
          <div>
            <span className={styles.inputLabel} data-testid="company-span">
              Company
            </span>
            <Autocompleteinput
              placeholder="Select Company"
              multiple
              loading={isCompanyDataLoading}
              options={companyData?.Result || []}
              getOptionLabel={(option) =>
                (option as GetCompanyDropdownResult).Description
              }
              value={company}
              onChange={(_, value) =>
                handleUpdateAvailibilityProperty({
                  key: "company",
                  value,
                })
              }
              renderOption={(props, option, { selected }) => (
                <li {...props}>
                  <Checkbox checked={selected} />
                  <span className={styles.optionLabel}>
                    {(option as GetCompanyDropdownResult).Description}
                  </span>
                </li>
              )}
            />
          </div>
          <div>
            <span className={styles.inputLabel}>State</span>
            <Autocompleteinput
              placeholder="Select State"
              multiple
              loading={isStateDataLoading}
              options={stateData?.Result || []}
              getOptionLabel={(option) =>
                (option as GetStateDropdownResult).Description
              }
              value={state}
              onChange={(_, value) =>
                handleUpdateAvailibilityProperty({
                  key: "state",
                  value,
                })
              }
              filterOptions={createFilterOptions({
                matchFrom: "start",
                ignoreCase: true,
                stringify: (option) =>
                  (option as GetStateDropdownResult).Description,
              })}
              renderOption={(props, option, { selected }) => (
                <li {...props}>
                  <Checkbox checked={selected} />
                  <span className={styles.optionLabel}>
                    {(option as GetStateDropdownResult).Description}
                  </span>
                </li>
              )}
            />
          </div>
          <div>
            <span className={styles.inputLabel}>Store</span>
            <Autocompleteinput
              placeholder="Select Store"
              multiple
              options={storeData?.Result || []}
              loading={isStoreDataLoading}
              getOptionLabel={(option) =>
                (option as GetStoreOptionsResult).Code
              }
              value={store}
              inputValue={storeInputValue}
              onInputChange={handleStoreInputChange}
              onChange={(_, value) =>
                handleUpdateAvailibilityProperty({
                  key: "store",
                  value,
                })
              }
              renderOption={(props, option, { selected }) => (
                <li {...props}>
                  <Checkbox checked={selected} />
                  <span className={styles.optionLabel}>
                    {(option as GetStoreOptionsResult).Code}
                  </span>
                </li>
              )}
            />
          </div>
          <div>
            <span className={styles.inputLabel}>Publish Date</span>
            <DateInput
              fullWidth
              disablePast
              value={startDate}
              onChange={(value) => {
                handleUpdateAvailibilityProperty({
                  key: "startDate",
                  value,
                });
              }}
            />
          </div>
        </div>

        <div className={styles.modalFooter}>
          {canSaveAvailibiity && canVerifyAvalibility && (
            <button
              disabled={!isFormValid}
              onClick={handleVerify}
              data-testid="save-btn"
              className={`${!isFormValid && styles.disabledBtn} rightAlignedActionBtn`}
            >
              Save
            </button>
          )}
        </div>
        <Availibilitytable
          {...tables.company}
          templateId={templateId}
          type="companycategory"
          tableKey="company"
        />

        <Availibilitytable
          {...tables.state}
          templateId={templateId}
          type="state"
          tableKey="state"
        />

        <Availibilitytable
          {...tables.store}
          templateId={templateId}
          type="store"
          tableKey="store"
        />
      </div>
      <ConfirmationModal
        content="There is already a published medical form. Do you want to replace it on the published date?"
        open={confirmModal}
        handleClose={() => setConfirmModal(false)}
        performAction={handleSave}
        Id={1}
        btnOneText="No"
        btnTwoText="Yes"
      />
    </div>
  );
};

export default AvailibilityModal;
