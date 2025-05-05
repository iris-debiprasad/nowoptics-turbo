import { useAppDispatch, useAppSelector } from "@root/host/src/hooks/useStore";
import {
  ADD_STEP,
  CHANGE_FORM_LANGUAGE,
  RESET_INTAKE_FORM,
  RESET_PATIENT_INTAKE_FORM,
  TOGGLE_STEP_ACCORDION,
  UPDATE_FORM_ERRORS,
  UPDATE_FORM_NAME,
  WIPE_PREVIEW_INTAKE_FORM_ANSWERS,
} from "@root/host/src/store/reducer/intake.slice";
import {
  useGetIntakeFormQuery,
  useGetLanguageTypesQuery,
  useSaveTemplateAsDraftMutation,
} from "@root/host/src/store/reducer/intakeApi.slice";
import {
  generateSaveIntakeFormPayload,
  scrollToElementWithOffset,
  validateIntakeForm,
} from "@root/host/src/utils/intake.utils";
import { Button, SelectChangeEvent } from "@mui/material";
import { BreadcrumbProps } from "@root/host/src/types/Breadcrumb.types";
import { SelectOptions } from "@root/host/src/types/intakeInput.types";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import {
  ChangeEvent,
  FunctionComponent,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import Accordionstep from "../common/accordionstep";
import Input from "../common/input";
import SelectInput from "../common/select";
import PatientInformation from "../patientinformation";
import QuestionStep from "../questionstep";
import styles from "./Setup.module.scss";
import { SnackBarProvider, useSnackBar } from "@/context/SnackbarContext";
import { ERROR_MESSAGE } from "@root/host/src/constants/auth.constants";
import { Provider } from "react-redux";
import { store } from "@root/host/src/store/store";
import {
  GetApiLoadingState,
  GetFormErrorByType,
  IsIntakeFormSpanish,
  IsIntakeFormUpdated,
} from "@root/host/src/store/reducer/intake.selector";
import { ErrorResponseType } from "@root/host/src/types/intakeApi.types";
import {
  COMMON_INPUT_MAX_LENGTH,
  INTAKE_LANGUAGE_TYPES,
} from "@/constants/intake.constants";
import Previewintake from "../previewintake";
import { ConfirmationModalProps } from "@root/host/src/types/confirmationModal.types";
import usePermission from "@root/host/src/hooks/usePermission";
import { IntakePermission } from "@/constants/intake-permission.constant";
import { GetPermissionConfig } from "@root/host/src/config/permissionConfig";
const Breadcrumb = dynamic(() => import("host/Breadcrumb"), {
  ssr: false,
}) as FunctionComponent<BreadcrumbProps>;
const BackdropLoader = dynamic(() => import("host/BackdropLoader"), {
  ssr: false,
}) as FunctionComponent<{ openLoader: boolean }>;
const ConfirmationModal = dynamic(() => import("host/ConfirmationModal"), {
  ssr: false,
}) as FunctionComponent<ConfirmationModalProps>;
import dayjs from "dayjs";
import { DATE_TIME_24H_FORMAT } from "@root/host/src/constants/common.constants";

const Setup = () => {
  const languageLoaded = useRef<boolean | null>(null);
  const [canSaveForm] = useAppSelector((state) =>
    GetPermissionConfig({
      ...state,
      permissionName: [IntakePermission.SETUP.SAVE_INTAKE_FORM],
    })
  ) as boolean[];
  const isLoading = useAppSelector((state) => GetApiLoadingState({ ...state }));
  const isIntakeFormUpdated = useAppSelector((state) =>
    IsIntakeFormUpdated({ ...state })
  );
  const [newFormLanguage, setNewFormLanguage] = useState<number | string>("");
  const [confirmModal, setConfirmModal] = useState(false);
  const router = useRouter();
  const { showSnackBar } = useSnackBar();
  const { templateId } = router.query;
  const { formLanguage } = useAppSelector((state) => state.intake);
  const { Code, IntakeFormSections, CreatedOn, ModifiedOn } = useAppSelector(
    (state) => state.intake.intakeForm
  );
  const [previewIntake, setPreviewIntake] = useState(false);
  const formCodeError = useAppSelector((state) =>
    GetFormErrorByType({ ...state, type: "Form", field: "FormCode" })
  );
  const { data : languageTypes } = useGetLanguageTypesQuery({});
  const isSpanishIntake = useAppSelector((state) =>
    IsIntakeFormSpanish({ ...state, languageTypes })
  );
  const recommendationToggles = useAppSelector(
    (state) => state.intake.intakeRecommendationToggles
  );

  const {
    isError: isFormFetchError,
    isFetching: isFormFetching,
    error,
    refetch: refetchIntakeForm,
  } = useGetIntakeFormQuery(
    {
      languageCode: +formLanguage!,
      templateId: +templateId!,
    },
    {
      skip: !templateId || !formLanguage,
      refetchOnMountOrArgChange: true,
    }
  );

  const [saveTemplateAsDraft] = useSaveTemplateAsDraftMutation();

  const { data: languageOptions, originalOptions } = useGetLanguageTypesQuery(
    {},
    {
      selectFromResult: ({ data, error, isLoading }) => {
        if (data) {
          const options: SelectOptions[] = data.Result.filter((item) => {
            if (!templateId && item.Code === INTAKE_LANGUAGE_TYPES.SPANISH) {
              return false;
            }
            return true;
          }).map((item) => {
            return {
              label: item.Description,
              value: item.Id,
            };
          });

          return {
            data: options,
            error,
            isLoading,
            originalOptions: data.Result,
          };
        }
        return {
          data: [],
          error,
          isLoading,
          originalOptions: [],
        };
      },
    }
  );

  const formDate = useMemo(() => {
    if (!CreatedOn && !ModifiedOn) return "";
    if (CreatedOn && !ModifiedOn)
      return dayjs(CreatedOn).format(DATE_TIME_24H_FORMAT);
    if (ModifiedOn) return dayjs(ModifiedOn).format(DATE_TIME_24H_FORMAT);
    return "";
  }, [CreatedOn, ModifiedOn]);

  useEffect(() => {
    if (
      languageOptions &&
      languageOptions.length > 0 &&
      !languageLoaded.current
    ) {
      dispatch(
        CHANGE_FORM_LANGUAGE({ value: languageOptions[0].value as number })
      );
      languageLoaded.current = true;
    }
  }, [languageOptions]);

  useEffect(() => {
    if (isFormFetchError && !isFormFetching) {
      showSnackBar(
        (error as ErrorResponseType)?.data?.Error?.Message ??
          ERROR_MESSAGE.API_DEFAULT_ERROR_MESSAGE,
        "error"
      );
    }
  }, [isFormFetchError, error, isFormFetching]);

  const dispatch = useAppDispatch();

  const handleAddStep = () => dispatch(ADD_STEP());

  const handleFormName = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    dispatch(UPDATE_FORM_NAME({ Code: e.target.value }));
  };

  const handleFormLanguage = (e: SelectChangeEvent<string | number>) => {
    if (isIntakeFormUpdated) {
      setNewFormLanguage(e.target.value);
      setConfirmModal(true);
      return;
    }
    dispatch(CHANGE_FORM_LANGUAGE({ value: e.target.value as number }));
  };

  const handleSaveForm = useCallback(async () => {
    try {
      const formErrors = validateIntakeForm(
        Code,
        IntakeFormSections,
        recommendationToggles
      );
      dispatch(UPDATE_FORM_ERRORS({ formErrors }));

      // wait for the state to update
      await new Promise((resolve) => setTimeout(resolve, 0));

      // query all errorMessage that have data-section attribute and innerText is not empty
      const errorMessages = document.querySelectorAll(".errorMessage");
      const firstErrorElement = errorMessages[0] as HTMLElement;
      const section = firstErrorElement?.getAttribute(
        "data-section"
      ) as unknown as number;

      if (firstErrorElement && section == -1) {
        // section === -1 means form level error
        firstErrorElement.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
        return;
      }

      if (firstErrorElement && section > -1) {
        dispatch(
          TOGGLE_STEP_ACCORDION({
            SectionIndex: Number(section),
            Expanded: true,
          })
        );
        // Open animation for accordion takes some time to complete
        await new Promise((resolve) => setTimeout(resolve, 250));
        scrollToElementWithOffset(firstErrorElement, 200);
        return;
      }
      if (formErrors.length === 0) {
        const intakeFormPayload = generateSaveIntakeFormPayload(
          originalOptions,
          formLanguage!,
          IntakeFormSections,
          Code,
          templateId ? Number(templateId) : undefined
        );
        if (!intakeFormPayload) return;
        const result = await saveTemplateAsDraft(intakeFormPayload).unwrap();
        if (result.Error) {
          showSnackBar(
            result.Error.Message ?? ERROR_MESSAGE.API_DEFAULT_ERROR_MESSAGE,
            "error"
          );
          return;
        }
        showSnackBar(result.SuccessMessage, "success");
        if (!templateId) {
          router.push(`/intake/setup/?templateId=${result.Result.TemplateId}`);
        } else {
          refetchIntakeForm();
        }
      }
    } catch (error) {
      showSnackBar(
        (error as ErrorResponseType)?.data?.Error?.Message ??
          ERROR_MESSAGE.API_DEFAULT_ERROR_MESSAGE,
        "error"
      );
    }
  }, [
    formLanguage,
    IntakeFormSections,
    Code,
    saveTemplateAsDraft,
    showSnackBar,
    dispatch,
    recommendationToggles,
    templateId,
    router,
  ]);

  const handlePreviewModalToggle = (open: boolean) => {
    setPreviewIntake(open);
    dispatch(WIPE_PREVIEW_INTAKE_FORM_ANSWERS());
  };

  useEffect(() => {
    return () => {
      dispatch(RESET_INTAKE_FORM());
    };
  }, []);

  return (
    <>
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
          {
            label: "Setup",
            href: "/intake/setup",
          },
        ]}
      />

      <div className={styles.setupContainer}>
        <div className={`cardSection ${styles.stepContainer}`}>
          <div className={styles.previewBtnContainer}>
            {!!templateId && (
              <button
                className={styles.previewBtn}
                onClick={() => handlePreviewModalToggle(true)}
              >
                Preview
              </button>
            )}
          </div>
          <div className={styles.stepHeader}>
            <div className={styles.formTitle}>
              <span className={styles.title}>Set up Form </span>
              {formDate.length > 0 && (
                <span className={styles.formDate}>
                  Last updated on : {formDate}
                </span>
              )}
            </div>
            <div>
              <Input
                fullWidth
                error={!!formCodeError?.errorMessage}
                id="form-name-input"
                placeholder="Enter code for medical form"
                value={Code}
                onChange={handleFormName}
                maxLength={COMMON_INPUT_MAX_LENGTH}
                disabled={isSpanishIntake}
              />
              <div>
                <span>Select Language</span>
                <SelectInput
                  options={languageOptions || []}
                  value={formLanguage}
                  onChange={handleFormLanguage}
                  placeholder="Select Language"
                />
              </div>
            </div>
            <div className={styles.formCodeErrorContainer}>
              {formCodeError?.errorMessage && (
                <span className="errorMessage" data-section={-1}>
                  {formCodeError?.errorMessage}
                </span>
              )}
            </div>
          </div>
          <PatientInformation />
          {IntakeFormSections.map((step, index) => {
            return (
              <Accordionstep
                SectionIndex={step.SectionIndex!}
                index={index + 2}
                key={index}
                title={step.Description}
                Code={step.Code}
                Expanded={step.Open}
              >
                <QuestionStep
                  key={index}
                  formSectionCode={step.Code}
                  SectionIndex={step.SectionIndex!}
                />
              </Accordionstep>
            );
          })}
          <div className={styles.stepFooter}>
            <Button
              onClick={handleAddStep}
              data-testid="add-step-button"
              disabled={isSpanishIntake}
            >
              Add Step
            </Button>
            {canSaveForm && (
              <Button
                className={`${
                  IntakeFormSections.length === 0 && styles.disabledBtn
                }`}
                onClick={handleSaveForm}
                data-testid="save-button"
                disabled={IntakeFormSections.length === 0}
              >
                Save
              </Button>
            )}
          </div>
        </div>
      </div>

      {previewIntake && (
        <Previewintake
          open={previewIntake}
          templateId={templateId as string}
          handleClose={() => handlePreviewModalToggle(false)}
        />
      )}

      <ConfirmationModal
        content="Changes are not saved. Do you want to continue ?"
        open={confirmModal}
        handleClose={() => setConfirmModal(false)}
        performAction={() => {
          dispatch(CHANGE_FORM_LANGUAGE({ value: newFormLanguage as number }));
          setNewFormLanguage("");
          setConfirmModal(false);
        }}
        Id={1}
        btnOneText="CANCEL"
        btnTwoText="YES"
      />
    </>
  );
};

export default function SetupRoot() {
  usePermission({
    ...IntakePermission.SETUP,
  });

  return (
    <Provider store={store}>
      <SnackBarProvider>
        <Setup />
      </SnackBarProvider>
    </Provider>
  );
}
