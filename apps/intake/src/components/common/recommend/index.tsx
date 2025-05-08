import { useDebounce } from "@/hooks/useDebounce";
import { useAppDispatch, useAppSelector } from "@root/host/src/hooks/useStore";
import {
  GetRecommendationError,
  GetRecommendationToggle,
  GetRecommendationsByQuestionCode,
  IsIntakeFormSpanish,
} from "@root/host/src/store/reducer/intake.selector";
import {
  REMOVE_SKU_RECOMMENDATION,
  UPDATE_RECOMMENDATION_TOGGLE,
  UPDATE_RECOMMEND_SKU,
  UPDATE_RECOMMEND_TEXT,
  WIPE_RECOMMENDATIONS,
} from "@root/host/src/store/reducer/intake.slice";
import { useGetLanguageTypesQuery, useGetSKUsQuery } from "@root/host/src/store/reducer/intakeApi.slice";
import { RecommendProps } from "@root/host/src/types/Intake.types";
import { GetSKUsResult, Recommendation } from "@root/host/src/types/intakeApi.types";
import type { AutocompleteChangeReason } from "@mui/material";
import { AutocompleteInputChangeReason } from "@mui/material/Autocomplete";
import Chip from "@mui/material/Chip";
import {
  FunctionComponent,
  SyntheticEvent,
  memo,
  useCallback,
  useMemo,
  useState,
} from "react";
import { batch } from "react-redux";
import Autocompleteinput from "../autocompleteinput";
import Checkbox from "../checkbox";
import Input from "../input";
import Radio from "../radio";
import SwitchInput from "../switch";
import styles from "./Recommend.module.scss";
import { FREE_TEXT_MAX_LENGTH } from "@root/intake/src/constants/intake.constants";

const Recommend: FunctionComponent<RecommendProps> = ({
  OptionIndex,
  QuestionIndex,
  SectionIndex,
}) => {
  const dispatch = useAppDispatch();
  const { data : languageTypes } = useGetLanguageTypesQuery({});
  const isSpanishIntake = useAppSelector((state) =>
    IsIntakeFormSpanish({ ...state, languageTypes })
  );
  const recommendations = useAppSelector((state) =>
    GetRecommendationsByQuestionCode({
      ...state,
      QuestionIndex,
      SectionIndex,
      OptionIndex,
    })
  );
  const recommendationToggle = useAppSelector((state) =>
    GetRecommendationToggle({
      ...state,
      QuestionIndex,
      SectionIndex,
      OptionIndex,
    })
  );
  const recommendationError = useAppSelector((state) =>
    GetRecommendationError({
      ...state,
      QuestionIndex,
      SectionIndex,
      OptionIndex,
    })
  );

  const [skuValue, setSkuValue] = useState("");
  const debouncedSkuValue = useDebounce(skuValue, 500);

  const radioInputIndex = Date.now();

  const isRecommend =
    recommendationToggle?.toggle ||
    (recommendations && recommendations?.length > 0);

  const textRecommend = recommendations?.find(
    (recommend) => recommend.Type === "Text"
  );

  const isTextChecked = recommendationToggle?.type === "Text";

  const autoCompleteRecommend = recommendations?.filter(
    (recommend) => recommend.Type === "SKU"
  );

  const isSkuChecked = recommendationToggle?.type === "SKU";

  const { data: skusOptions, isLoading: isSkuOptionsLoading } = useGetSKUsQuery(
    {
      searchString: debouncedSkuValue,
    },
    {
      skip: debouncedSkuValue.length < 3,
    }
  );

  const handleRecommendToggle = () => {
    batch(() => {
      if (recommendationToggle?.toggle) {
        dispatch(
          WIPE_RECOMMENDATIONS({
            SectionIndex,
            QuestionIndex,
            OptionIndex,
            Type: "SKU",
          })
        );
        dispatch(
          WIPE_RECOMMENDATIONS({
            SectionIndex,
            QuestionIndex,
            OptionIndex,
            Type: "Text",
          })
        );
        dispatch(
          UPDATE_RECOMMENDATION_TOGGLE({
            OptionIndex,
            QuestionIndex,
            SectionIndex,
            type: "None",
            toggle: false,
          })
        );
        return;
      }
      dispatch(
        UPDATE_RECOMMENDATION_TOGGLE({
          OptionIndex,
          QuestionIndex,
          SectionIndex,
          type: "None",
          toggle: true,
        })
      );
    });
  };

  const handleRadioChange = (value: "SKU" | "Text") => () => {
    if (isSpanishIntake) return;
    if (value === "SKU") {
      dispatch(
        UPDATE_RECOMMENDATION_TOGGLE({
          OptionIndex,
          QuestionIndex,
          SectionIndex,
          type: "SKU",
          toggle: true,
        })
      );
      dispatch(
        WIPE_RECOMMENDATIONS({
          SectionIndex,
          QuestionIndex,
          OptionIndex,
          Type: "Text",
        })
      );
    } else {
      dispatch(
        UPDATE_RECOMMENDATION_TOGGLE({
          OptionIndex,
          QuestionIndex,
          SectionIndex,
          type: "Text",
          toggle: true,
        })
      );
      batch(() => {
        dispatch(
          WIPE_RECOMMENDATIONS({
            SectionIndex,
            QuestionIndex,
            OptionIndex,
            Type: "SKU",
          })
        );
        dispatch(
          UPDATE_RECOMMEND_TEXT({
            SectionIndex,
            QuestionIndex,
            OptionIndex,
            value: "",
          })
        );
      });
    }
  };

  const handleSkuInputChange = useCallback(
    (
      _event: SyntheticEvent<Element, Event>,
      value: string,
      reason: AutocompleteInputChangeReason
    ) => {
      if (reason === "input") setSkuValue(value);
    },
    [setSkuValue]
  );

  const handleRecommendText = useCallback(
    (value: string) => {
      dispatch(
        UPDATE_RECOMMEND_TEXT({
          SectionIndex,
          QuestionIndex,
          OptionIndex,
          value,
        })
      );
    },
    [SectionIndex, QuestionIndex, OptionIndex, dispatch]
  );

  const handleAutocompleteChange = useCallback(
    (
      newValue: GetSKUsResult["Data"] | Recommendation[],
      reason: AutocompleteChangeReason
    ) => {
      if (reason === "removeOption") {
        const removedOptions = autoCompleteRecommend?.filter(
          (option) =>
            !newValue.some(
              (newOption) =>
                (newOption as Recommendation).RecommendationIndex ===
                (option as Recommendation).RecommendationIndex
            )
        );

        if (!removedOptions || removedOptions.length === 0) return;
        dispatch(
          REMOVE_SKU_RECOMMENDATION({
            SectionIndex,
            QuestionIndex,
            OptionIndex: removedOptions[0].OptionIndex,
            RecommendationIndex: removedOptions[0].RecommendationIndex!,
            Recommendation: removedOptions[0],
          })
        );
        return;
      }
      if (reason === "selectOption") {
        dispatch(
          UPDATE_RECOMMEND_SKU({
            SectionIndex,
            QuestionIndex,
            OptionIndex,
            value: (newValue as GetSKUsResult["Data"])?.at(-1)?.VariantNumber!,
          })
        );
      }
      setSkuValue("");
    },
    [SectionIndex, QuestionIndex, OptionIndex, dispatch, autoCompleteRecommend]
  );

  const RecommendInput = useMemo(() => {
    if (isSkuChecked) {
      return (
        <Autocompleteinput
          multiple
          options={skusOptions?.Result.Data || []}
          loading={isSkuOptionsLoading}
          disabled={isSpanishIntake}
          getOptionDisabled={(option_) => autoCompleteRecommend?.length === 5}
          getOptionLabel={(option) =>
            (option as GetSKUsResult["Data"][0]).VariantNumber
          }
          isOptionEqualToValue={(option, value) =>
            (option as GetSKUsResult["Data"][0]).VariantNumber ===
            (value as Recommendation).Value
          }
          value={autoCompleteRecommend || []}
          inputValue={skuValue}
          onInputChange={handleSkuInputChange}
          onChange={(e_, newValue, reason) =>
            handleAutocompleteChange(newValue as GetSKUsResult["Data"], reason)
          }
          renderTags={(tagValue, getTagProps) =>
            tagValue.map((option, index) => (
              <Chip
                label={(option as Recommendation).Value}
                {...getTagProps({ index })}
                className={styles.autocompleteChip}
                key={index}
              />
            ))
          }
          renderOption={(props, option, { selected }) => {
            return (
              <li {...props}>
                <Checkbox checked={selected} />
                <span className={styles.optionLabel}>
                  {(option as GetSKUsResult["Data"][0]).VariantNumber}
                </span>
              </li>
            );
          }}
        />
      );
    }

    if (isTextChecked) {
      return (
        <Input
          id={"Others" + radioInputIndex}
          value={textRecommend?.Value || ""}
          onChange={(e) => handleRecommendText(e.target.value)}
          placeholder="Others"
          maxLength={FREE_TEXT_MAX_LENGTH}
          disabled={isSpanishIntake}
        />
      );
    }
  }, [
    handleAutocompleteChange,
    handleRecommendText,
    radioInputIndex,
    skusOptions?.Result.Data,
    isSkuOptionsLoading,
    autoCompleteRecommend,
    skuValue,
    handleSkuInputChange,
    textRecommend?.Value,
    isSkuChecked,
    isTextChecked,
    isSpanishIntake,
  ]);

  return (
    <div className={styles.recommendContainer}>
      <div className={styles.switchControl}>
        <span>Recommended</span>
        <SwitchInput
          checked={isRecommend}
          onChange={handleRecommendToggle}
          disabled={isSpanishIntake}
        />
        <span>{isRecommend ? "Yes" : "No"}</span>
      </div>
      {isRecommend && (
        <>
          <div className={styles.horizontalLine}></div>
          <div className={styles.radioControls}>
            <div className={styles.radioButtons}>
              <div onClick={handleRadioChange("SKU")}>
                <Radio
                  id={"SKU" + radioInputIndex}
                  name={"SKU" + radioInputIndex}
                  checked={isSkuChecked}
                  value={"SKU"}
                />{" "}
                <span>Choose SKU</span>
              </div>
              <div onClick={handleRadioChange("Text")}>
                <Radio
                  id={"Others" + radioInputIndex}
                  name={"Others" + radioInputIndex}
                  checked={isTextChecked}
                  value={"Text"}
                />{" "}
                <span>Others</span>
              </div>
            </div>
            <div className={styles.recommendInput}>{RecommendInput}</div>
          </div>
        </>
      )}
      {recommendationError && (
        <p
          className={`${styles.recommendErrorText} errorMessage`}
          data-section={SectionIndex}
        >
          {recommendationError}
        </p>
      )}
    </div>
  );
};

export default memo(Recommend);
