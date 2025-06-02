import React from 'react';
import Image from 'next/image';

import styles from './question.module.scss';
import { VisionTestQuestion } from '../questions.constants';
import { useTranslation } from 'react-i18next';

interface Props {
  question: VisionTestQuestion;
  onResponseSubmitted: (isCorrect: boolean) => void;
}

export const Question = ({
  question,
  onResponseSubmitted,
}: Props): JSX.Element => {
  const { t } = useTranslation();
  const inputRef = React.useRef<HTMLInputElement>(null);
  const [response, setResponse] = React.useState<string>('');

  const onResponseChange = (event: React.ChangeEvent<HTMLInputElement>): void =>
    setResponse(event.target.value);

  const onSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    if (!response) return;

    onResponseSubmitted(question.answer === Number(response));
    setResponse('');
    inputRef.current?.focus();
  };

  const onQuestionSkip = (): void => onResponseSubmitted(false);

  return (
    <div className={styles.container}>
      <figure className={styles.picture}>
        <Image
          width={225}
          height={225}
          className="img"
          alt=""
          src={question.image}
        />
      </figure>

      <form className={styles.form} {...{ onSubmit }}>
        <div className={styles['form__input-container']}>
          <input
            className={styles.form__input}
            min={0}
            onChange={onResponseChange}
            pattern="[0-9]*"
            placeholder={t(`COLOR_VISION_TEST.ANSWER`)}
            ref={inputRef}
            step={1}
            type="number"
            value={response}
          />

          <button
            className={styles.form__next}
            type="submit"
            disabled={!Boolean(response)}
          >
            {t(`COLOR_VISION_TEST.NEXT`)}
          </button>
        </div>

        <button
          className={styles.form__skip}
          onClick={onQuestionSkip}
          type="button"
          disabled={Boolean(response)}
        >
          {t(`COLOR_VISION_TEST.SKIP`)}
        </button>
      </form>
    </div>
  );
};

Question.displayName = 'Question';
