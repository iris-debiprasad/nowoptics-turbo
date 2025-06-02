import React from 'react';

import styles from './vision-test.module.scss';
import { TestQuestions, VisionTestQuestion } from './questions.constants';
import { Question } from './question';
import { Results } from './results';
import { useTranslation } from 'react-i18next';

interface TestLifeCycle {
  started: boolean;
  finished: boolean;
}

/**
 * Gets the test questions, shuffles it randomly and finally, assigns the order in which the questions
 * will be displayed
 *
 * @returns sorted and ordered questions
 */
const assignOrderToVisionTestQuestions = (): VisionTestQuestion[] =>
  TestQuestions.sort(() => Math.random() - 0.5);

export const VisionTest = (): JSX.Element => {
  const { t } = useTranslation();
  const questions: VisionTestQuestion[] = React.useMemo(
    () => assignOrderToVisionTestQuestions(),
    []
  );
  const totalQuestions: number = questions.length;

  const [currentQuestion, setCurrentQuestion] = React.useState<number>(0);
  const [score, setScore] = React.useState<number>(0);
  const [lifeCycle, setLifeCycle] = React.useState<TestLifeCycle>({
    started: false,
    finished: false,
  });

  const onTestStart = (): void =>
    setLifeCycle((prev) => ({ ...prev, started: true }));

  const onResponseSubmitted = (isResponseCorrect: boolean): void => {
    setScore((prev) => (isResponseCorrect ? prev + 1 : prev));
    const hasNextQuestion: boolean = currentQuestion < totalQuestions - 1;

    if (hasNextQuestion)
      setCurrentQuestion((prev) => prev + 1); // Continue to next question
    else setLifeCycle((prev) => ({ ...prev, finished: true })); // If there is no questions left, finish test
  };

  const restartTest = (): void => {
    setLifeCycle({ finished: false, started: true });
    setCurrentQuestion(0);
    setScore(0);
  };

  // ==== Render

  const shouldRenderQuestions: boolean =
    lifeCycle.started && !lifeCycle.finished;
  const shouldRenderResults: boolean = lifeCycle.started && lifeCycle.finished;

  return (
    <section className={styles.container}>
      {!lifeCycle.started && (
        <button
          className={styles['start-button']}
          onClick={onTestStart}
          type="button"
        >
          {t(`COLOR_VISION_TEST.START`)}
        </button>
      )}

      {shouldRenderQuestions && (
        <div className={styles['test-container']}>
          <p>
            {t(`COLOR_VISION_TEST.QUESTION`)} {currentQuestion + 1}{' '}
            {t(`COLOR_VISION_TEST.OF`)} {totalQuestions}
          </p>

          <Question
            onResponseSubmitted={onResponseSubmitted}
            question={questions[currentQuestion]}
          />
        </div>
      )}

      {shouldRenderResults && (
        <Results
          {...{ score }}
          questions={totalQuestions}
          onRestart={restartTest}
        />
      )}
    </section>
  );
};

VisionTest.displayName = 'VisionTest';
