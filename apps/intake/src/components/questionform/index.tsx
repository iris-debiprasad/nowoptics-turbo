import { COMMON_INPUT_MAX_LENGTH } from "@root/intake/src/constants/intake.constants";
import { useAppDispatch, useAppSelector } from "@root/host/src/hooks/useStore";
import {
  GetAllQuestionsBySectionCode,
  GetFormErrorByType,
  GetQuestionByCode,
  GetSequenceOrderOptions,
  IsIntakeFormSpanish,
} from "@root/host/src/store/reducer/intake.selector";
import {
  ADD_QUESTION,
  COPY_QUESTION,
  DELETE_QUESTION,
  UPDATE_QUESTION_PROPERTY,
  UPDATE_QUESTION_SEQUENCE,
} from "@root/host/src/store/reducer/intake.slice";
import { useGetLanguageTypesQuery, useGetQuestionTypesQuery } from "@root/host/src/store/reducer/intakeApi.slice";
import { SelectOptions } from "@root/host/src/types/intakeInput.types";
import {
  QuestionFormProps,
  QuestionTypeEnum,
} from "@root/host/src/types/Intake.types";
import { SelectChangeEvent, Tooltip } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import CopyIcon from "@root/assets/Images/icons/copy.svg";
import DeleteIcon from "@root/assets/Images/icons/delete.svg";
import Image from "next/image";
import {
  ChangeEvent,
  FunctionComponent,
  memo,
  useMemo,
  useState,
  FC,
} from "react";
import Datevalidation from "../common/datevalidation";
import Input from "../common/input";
import { default as Select, default as SelectInput } from "../common/select";
import SwitchInput from "../common/switch";
import QuestionSwitcher from "../questionswitcher";
import styles from "./QuestionForm.module.scss";
import dynamic from "next/dynamic";
import { ConfirmationModalProps } from "@root/host/src/types/confirmationModal.types";
// const ConfirmationModal = dynamic(() => import("host/ConfirmationModal"), {
//   ssr: false,
// }) as FC<ConfirmationModalProps>;
import ConfirmationModal from "@root/host/src/components/confirmationModal/ConfirmationModal";
import Collapse from "@mui/material/Collapse";
import ArrowDownIcon from "@root/assets/Images/icons/arrow-down.svg";

const QuestionForm: FunctionComponent<QuestionFormProps> = (props) => {
  const [expanded, setExpanded] = useState(true);
  const { data : languageTypes } = useGetLanguageTypesQuery({});
  const isSpanishIntake = useAppSelector((state) =>
    IsIntakeFormSpanish({ ...state, languageTypes })
  );
  const { QuestionIndex, SectionIndex } = props;
  const dispatch = useAppDispatch();
  const { data } = useGetQuestionTypesQuery({});
  const [deleteQuestion, setDeleteQuestion] = useState(false);
  const sequenceOptions = useAppSelector((state) =>
    GetSequenceOrderOptions({ ...state, SectionIndex })
  );

  const questionCodeError = useAppSelector((state) =>
    GetFormErrorByType({
      ...state,
      SectionIndex,
      QuestionIndex,
      type: "Question",
      field: "QuestionCode",
    })
  );

  const questionTypeOptions = data?.Result?.map(
    (item) => ({ label: item.Description, value: item.Code } as SelectOptions)
  );

  const currentQuestion = useAppSelector((state) =>
    GetQuestionByCode({
      ...state,
      QuestionIndex,
      SectionIndex,
    })
  );

  const isParentQuestion = currentQuestion?.ParentQuestionIndex === -1;

  const questions = useAppSelector((state) =>
    GetAllQuestionsBySectionCode({ ...state, SectionIndex })
  );

  const isLastQuestion = useMemo<boolean>(() => {
    return questions?.length === 1;
  }, [questions]);

  const isValidationNeeded = useMemo(() => {
    return (
      currentQuestion?.Type === QuestionTypeEnum.DATE_AND_TIME ||
      currentQuestion?.Type === QuestionTypeEnum.DATE
    );
  }, [currentQuestion?.Type]);

  const handleQuestionCode = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const value = e.target.value;
    dispatch(
      UPDATE_QUESTION_PROPERTY({
        key: "Code",
        value,
        QuestionIndex,
        SectionIndex,
      })
    );
  };

  const handleRequiredToggle = (checked: boolean) => {
    dispatch(
      UPDATE_QUESTION_PROPERTY({
        key: "IsRequired",
        value: checked,
        QuestionIndex,
        SectionIndex,
      })
    );
  };

  const handleQuestionCopy = () => {
    dispatch(
      COPY_QUESTION({
        QuestionIndex,
        SectionIndex,
      })
    );
  };

  const handleQuestionDelete = () => {
    if (!isLastQuestion) {
      dispatch(
        DELETE_QUESTION({
          QuestionIndex,
          SectionIndex,
        })
      );
    }
    setDeleteQuestion(false);
  };

  const handleQuestionInputType = (e: SelectChangeEvent<string | number>) => {
    const value = e.target.value as unknown as string;
    dispatch(
      UPDATE_QUESTION_PROPERTY({
        key: "Type",
        value,
        QuestionIndex,
        SectionIndex,
      })
    );
  };

  const handleQuestionSequence = (e: SelectChangeEvent<string | number>) => {
    const newValue = e.target.value as unknown as number;
    const oldValue = currentQuestion?.SequenceNumber!;
    dispatch(
      UPDATE_QUESTION_SEQUENCE({
        SectionIndex,
        newValue,
        oldValue,
      })
    );
  };

  return (
    <>
      <div className={`${styles.questionFormContainer} ${!expanded && styles.heightAuto}`}>
        <div className={styles.subContainer}>
          <div
            className={`${styles.formHeader} ${
              isParentQuestion && styles.sequenceInputPresent
            }`}
          >
            <div className={styles.formCodeContainer}>
              <div>
                <span>Code</span>
                <Input
                  value={currentQuestion?.Code}
                  onChange={handleQuestionCode}
                  error={!!questionCodeError?.errorMessage}
                  maxLength={COMMON_INPUT_MAX_LENGTH}
                  disabled={isSpanishIntake}
                  placeholder="Q01"
                />
              </div>
              {questionCodeError?.errorMessage && (
                <span className="errorMessage" data-section={SectionIndex}>
                  {questionCodeError?.errorMessage}
                </span>
              )}
            </div>
            {isParentQuestion && (
              <div className={styles.sequenceSelect}>
                <span>Sequence</span>
                <Select
                  options={sequenceOptions}
                  value={currentQuestion?.SequenceNumber}
                  placeholder="Select Question Sequence"
                  onChange={handleQuestionSequence}
                  disabled={isSpanishIntake}
                />
              </div>
            )}
            <div>
              Type{" "}
              <SelectInput
                onChange={handleQuestionInputType}
                options={questionTypeOptions || []}
                value={currentQuestion?.Type}
                disabled={isSpanishIntake}
              />
              <IconButton
                onClick={() => setExpanded(!expanded)}
                className={`${styles.expandIcon} ${
                  expanded && styles.rotateIcon
                }`}
              >
                <Image
                  src={ArrowDownIcon}
                  alt="form action icon"
                  height={16}
                  width={16}
                />
              </IconButton>
            </div>
          </div>

          <div className={`${styles.formBody} ${!expanded && styles.marginBottom}`}>
            <QuestionSwitcher
              QuestionIndex={QuestionIndex}
              SectionIndex={SectionIndex}
              expanded={expanded}
            />
          </div>
          <Collapse in={expanded}>
            <div className={styles.formFooter}>
              <div className={styles.horizontalLine}></div>
              <div className={styles.formControls}>
                {isValidationNeeded && (
                  <Datevalidation
                    SectionIndex={SectionIndex}
                    QuestionIndex={QuestionIndex}
                  />
                )}
                <div className={styles.formActions}>
                  <Tooltip title="Copy Question">
                    <IconButton
                      onClick={props.handleCopyQuestion ?? handleQuestionCopy}
                      aria-label="copy"
                      disabled={isSpanishIntake}
                    >
                      <Image
                        src={CopyIcon}
                        alt="form action icon"
                        height={20}
                        width={20}
                      />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Delete Question">
                    <IconButton
                      aria-label="delete"
                      disabled={isSpanishIntake || isLastQuestion}
                      onClick={() => setDeleteQuestion(true)}
                    >
                      <Image
                        src={DeleteIcon}
                        alt="form action icon"
                        height={20}
                        width={20}
                      />
                    </IconButton>
                  </Tooltip>
                </div>
                <div className={styles.verticalDivider}></div>
                <div className={styles.requiredControl}>
                  <span>Required</span>
                  <SwitchInput
                    disabled={isSpanishIntake}
                    checked={currentQuestion?.IsRequired}
                    onChange={(_) =>
                      handleRequiredToggle(!currentQuestion?.IsRequired)
                    }
                  />
                  <span>{currentQuestion?.IsRequired ? "Yes" : "No"}</span>
                </div>
              </div>
            </div>
          </Collapse>
          {expanded && <div className={styles.marginBottom}></div>}
        </div>
        <ConfirmationModal
          content="Do you want to delete the question?"
          open={deleteQuestion}
          handleClose={() => setDeleteQuestion(false)}
          performAction={props.handleDeleteQuestion ?? handleQuestionDelete}
          Id={1}
          btnOneText="CANCEL"
          btnTwoText="YES"
        />
      </div>
    </>
  );
};

export default memo(QuestionForm);
