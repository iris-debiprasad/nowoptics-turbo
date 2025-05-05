import { useSnackBar } from "@/context/SnackbarContext";
import { useAppDispatch, useAppSelector } from "@root/host/src/hooks/useStore";
import { GetPatientIntakeStepper } from "@root/host/src/store/reducer/intake.selector";
import { PreviewIntakeProps } from "@root/host/src/types/Intake.types";
import { ErrorResponseType } from "@root/host/src/types/intakeApi.types";
import IconButton from "@mui/material/IconButton";
import { ERROR_MESSAGE } from "@root/host/src/constants/auth.constants";
import { PrimaryModalDTO } from "@root/host/src/types/PrimaryModal.types";
import dynamic from "next/dynamic";
import { FC, memo, useEffect, useRef, useState } from "react";
import { IconDTO } from "../../../../host/src/types/IconSVG.types";
import {
  useGetIntakeFormQuery,
  useGetLanguageTypesQuery,
  useGetStateDropdownQuery,
} from "@root/host/src/store/reducer/intakeApi.slice";
import Customstepper from "../common/customstepper";
import StepSwitcher from "../stepswitcher";
import styles from "./PreviewIntake.module.scss";
import Select from "../common/select";
import { SelectOptions } from "@root/host/src/types/intakeInput.types";
import {
  CHANGE_FORM_LANGUAGE,
  UPDATE_PATIENT_INTAKE_META_DATA,
} from "@root/host/src/store/reducer/intake.slice";
const PrimaryModal = dynamic(() => import("host/PrimaryModal"), {
  ssr: false,
}) as FC<PrimaryModalDTO>;
const IconSVG = dynamic(() => import("host/IconSVG"), {
  ssr: false,
}) as FC<IconDTO>;

const PreviewIntake: FC<PreviewIntakeProps> = ({
  templateId,
  handleClose,
  open,
}) => {
  const languageLoaded = useRef<boolean | null>(null);
  const dispatch = useAppDispatch();
  const { showSnackBar } = useSnackBar();
  const { activeStep, steps } = useAppSelector((state) =>
    GetPatientIntakeStepper({ ...state })
  );
  const [languageCode, setLanguageCode] = useState<number | undefined>();
  const { previewModeStateId } = useAppSelector(
    (state) => state.intake.patientIntakeMetaData
  );
  const { data: stateData } = useGetStateDropdownQuery(
    {},
    {
      selectFromResult: ({ data, error, isLoading }) => {
        const dataOptions: SelectOptions[] = [];
        if (data) {
          data.Result.forEach((item) => {
            dataOptions.push({
              label: item.Description,
              value: item.Id,
            });
          });
        }

        return {
          data: dataOptions,
          error,
          isLoading,
        };
      },
    }
  );
  const { isError, isFetching, isLoading, error } = useGetIntakeFormQuery(
    {
      languageCode: languageCode!,
      templateId: +templateId!,
    },
    {
      skip: !templateId || !languageCode,
      refetchOnMountOrArgChange: true,
    }
  );

  const { data: languageOptions } = useGetLanguageTypesQuery(
    {},
    {
      selectFromResult: ({ data, error, isLoading }) => {
        if (data) {
          const options: SelectOptions[] = data.Result.map((item) => {
            return {
              label: item.Description,
              value: item.Id,
            };
          });

          return {
            data: options,
            error,
            isLoading,
          };
        }
        return {
          data: [],
          error,
          isLoading,
        };
      },
    }
  );

  const handleUpdateStateId = (previewModeStateId: number) => {
    dispatch(UPDATE_PATIENT_INTAKE_META_DATA({ previewModeStateId }));
  };

  useEffect(() => {
    if(languageOptions && languageOptions.length > 0 && !languageLoaded.current) {
      dispatch(CHANGE_FORM_LANGUAGE({ value: languageOptions[0].value as number}));
      setLanguageCode(languageOptions[0].value as number);
      languageLoaded.current = true;
    }
  }, [languageOptions])

  useEffect(() => {
    if (isError && !isFetching && open) {
      showSnackBar(
        (error as ErrorResponseType)?.data?.Error?.Message ??
          ERROR_MESSAGE.API_DEFAULT_ERROR_MESSAGE,
        "error"
      );
      handleClose();
    }

    return () => {
      dispatch(UPDATE_PATIENT_INTAKE_META_DATA({ previewModeStateId: -1 }));
    };
  }, [isError, error, isFetching, open]);

  return (
    <PrimaryModal
      modalOpen={open}
      setModalOpen={handleClose}
      cstmStyle={"previewIntakeModal"}
      modalInner={
        <div className={styles.modalContainer}>
          <div className={styles.modalHeader}>
            <div>
              <div className={styles.languageInput}>
                <p>Select Language</p>
                <Select
                  options={languageOptions || []}
                  value={languageCode}
                  onChange={(e) => {
                    dispatch(
                      CHANGE_FORM_LANGUAGE({ value: e.target.value as number })
                    );
                    setLanguageCode(e.target.value as number);
                  }}
                />
              </div>
              <div className={styles.languageInput}>
                <p>Select State</p>
                <Select
                  options={stateData}
                  value={previewModeStateId}
                  placeholder="Select State"
                  onChange={(e) =>
                    handleUpdateStateId(e.target.value as number)
                  }
                  renderValue={(value) => {
                    return stateData.find((item) => item.value === value)
                      ?.label || "Select State";
                  }}
                />
              </div>
            </div>
            <IconButton onClick={handleClose}>
              <IconSVG
                width="12"
                height="12"
                viewBox="0 0 15 15"
                fill="#4d4d4d"
                name="modal_cross"
              />
            </IconButton>
          </div>
          <div className={styles.formContainer}>
            <Customstepper activeStep={activeStep} steps={steps} />
            <StepSwitcher activeStep={activeStep} />
          </div>
        </div>
      }
    />
  );
};

export default memo(PreviewIntake);