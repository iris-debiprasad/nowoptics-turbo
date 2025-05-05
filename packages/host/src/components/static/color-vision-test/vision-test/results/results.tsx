import { TEST_RESULTS } from "./score-messages.constants";
import styles from "./results.module.scss";
import Link from "next/link";
import { useTranslation } from "react-i18next";
import { BRAND } from "@/constants/common.constants";
import { useGetBrand } from "@/hooks/useGetBrand";

interface Props {
  score: number;
  questions: number;
  onRestart: () => void;
}

const getTestResultMessage = (score: number): string => {
  let resultMessage: string = "";

  for (const [minimumScore, message] of Object.entries(TEST_RESULTS)) {
    if (score > Number(minimumScore)) continue;

    resultMessage = message;
    break;
  }

  return resultMessage;
};

export const Results = ({
  score,
  questions,
  onRestart,
}: Props): JSX.Element => {
  const { t } = useTranslation();
  const brand = useGetBrand();

  const brandReplaceCopy = (
    copy: string,
    soReplace: string,
    melReplace: string
  ) => {
    return copy.replace("{brand}", brand === BRAND.SO ? soReplace : melReplace);
  };

  const assingBrandToCopy = (copy: string): string => {
    return brandReplaceCopy(copy, "Stanton Optical", "My Eyelab");
  };

  return (
    <div className={styles.container}>
      <p>
        {t(`COLOR_VISION_TEST.SCORE`)} <strong>{score}</strong>{' '}
        {t(`COLOR_VISION_TEST.OUT_OF`)} <strong>{questions}</strong>
      </p>

      <p>
        <strong>{t(`COLOR_VISION_TEST.RECOMMENDATION`)}</strong>{' '}
        <span>{t(`COLOR_VISION_TEST.${getTestResultMessage(score)}`)}</span>
      </p>

      <p>{assingBrandToCopy(t(`COLOR_VISION_TEST.IF_ITS_BEEN`))} </p>

      <div className={styles.actions}>
        <Link
          className={styles['actions__schedule-exam']}
          href="/book-eye-exam"
          rel="noopener noreferrer"
          target="_blank"
        >
          {t(`COLOR_VISION_TEST.SCHEDULE_EXAM`)}
        </Link>

        <button
          className={styles.actions__restart}
          onClick={onRestart}
          type="button"
        >
          {t(`COLOR_VISION_TEST.RESTART_TEST`)}
        </button>
      </div>
    </div>
  );
};

Results.displayName = 'Results';
