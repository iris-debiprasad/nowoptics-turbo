import Link from 'next/link';
import { SectionReference } from '../faq-sections.constants';
import styles from '../faq.module.scss';
import { TelephoneNumber } from '@/components/telephone-number';
import { useTranslation } from 'react-i18next';

const CUSTOMER_SERVICE_TELEPHONE = '(800) 264-4037';

export const PrescriptionRenewalSection = (): JSX.Element => {
  const { t } = useTranslation();
  return (
    <section
      className={styles.content__article}
      id={SectionReference.PRESCRIPTION_RENEWAL}
    >
      <h2 className="informational-page-subtitle">{t(`FAQ.Prescription Renewal`)}</h2>

      <h3 className={styles.content__question}>
        {t(`FAQ.IS_PRESCRIPTION_RENEWAL`)}
      </h3>

      <p>
      {t(`FAQ.WE_PROVIDE_YOU_WITH`)}
      </p>

      <p>
      {t(`FAQ.PRESCRIPTION_RENEWAL_IS`)}{' '}
        <Link href="/book-eye-exam" rel="noopener noreferrer" target="_blank">
        {t(`FAQ.NEARBY_LOCATIONS`)}
        </Link>
        .
      </p>

      <p>
      {t(`FAQ.FOR_MORE_INFORMATION`)}{' '}
        <Link
          href="/prescription-renewal"
          rel="noopener noreferrer"
          target="_blank"
        >
          {t(`FAQ.CLICK_HERE_EXCLAMATORY`)}
        </Link>
      </p>

      <h3 className={styles.content__question}>
      {t(`FAQ.WHEN_IS_PRESCRIPTION`)}
      </h3>

      <p>
      {t(`FAQ.OUR_GUIDED_EXPERIENCE`)}{' '}
        <Link
          href="/prescription-renewal"
          rel="noopener noreferrer"
          target="_blank"
        >
          {t(`FAQ.TRY_IT_NOW`)}
        </Link>
      </p>

      <h3 className={styles.content__question}>
      {t(`FAQ.DO_I_NEED_MY`)}
      </h3>

      <p>
      {t(`FAQ.YES_THE_DOCTOR`)}
      </p>

      <h3 className={styles.content__question}>
      {t(`FAQ.IS_PRESCRIPTION`)}
      </h3>

      <p>
      {t(`FAQ.NO_PRESCRIPTION`)}{' '}
        <Link href="/book-eye-exam" rel="noopener noreferrer" target="_blank">
        {t(`FAQ.CLICK_HERE_EXCLAMATORY`)}
        </Link>
      </p>

      <h3 className={styles.content__question}>
      {t(`FAQ.I_CAN_STILL`)}
      </h3>

      <p>
      {t(`FAQ.YES_THATS_EXACTLY`)}{' '}
        <Link
          href="/prescription-renewal"
          rel="noopener noreferrer"
          target="_blank"
        >
          {t(`FAQ.RENEW_SUBSCRIPTION`)}
        </Link>
      </p>

      <h3 className={styles.content__question}>
      {t(`FAQ.WHAT_DO_I_NEED`)}
      </h3>

      <p>
      {t(`FAQ.YOU_WILL_NEED`)}{' '}
        <Link
          href="/prescription-renewal"
          rel="noopener noreferrer"
          target="_blank"
        >
          {t(`FAQ.CLICK_HERE`)}
        </Link>{' '}
        {t(`FAQ.TO_START_WITH`)}
      </p>

      <h3 className={styles.content__question}>
      {t(`FAQ.WILL_A_REAL`)}
      </h3>

      <p>
      {t(`FAQ.YES_THE_RESULTS`)}
      </p>

      <h3 className={styles.content__question}>{t(`FAQ.CAN_I_USE`)}</h3>

      <p>{t(`FAQ.NO_PRESCRIPTION_RENEWAL`)}</p>

      <h3 className={styles.content__question}>{t(`FAQ.WHAT_COMPUTER`)}</h3>

      <p>{t(`FAQ.OUR_VISION_TEST`)}</p>

      <h3 className={styles.content__question}>{t(`FAQ.DO_I_NEED_TO`)}</h3>

      <p>{t(`FAQ.YES_YOU_WILL`)}</p>

      <h3 className={styles.content__question}>
        {t(`FAQ.IS_PRESCRIPTION_RENEWAL_FREE`)}
      </h3>

      <p>{t(`FAQ.YOUR_VISION_TEST`)}</p>

      <h3 className={styles.content__question}>{t(`FAQ.IS_THERE_AN_AGE`)}</h3>

      <p>
        {t(`FAQ.YES_PRESCRIPTION_RENEWAL`)}{' '}
        <Link href="/book-eye-exam" rel="noopener noreferrer" target="_blank">
          {t(`FAQ.SCHEDULLE_AN_INSTORE`)}
        </Link>{' '}
        {t(`FAQ.EYE_EXAM`)}
      </p>

      <h3 className={styles.content__question}>{t(`FAQ.CAN_I_SUBMIT`)}</h3>

      <p>{t(`FAQ.NO_INSURANCE_ONLY`)}</p>

      <h3 className={styles.content__question}>{t(`FAQ.I_STILL_HAVE`)}</h3>

      <p>
        {t(`FAQ.OUR_CUSTOMER_SERVICE`)}{' '}
        <TelephoneNumber telephone={CUSTOMER_SERVICE_TELEPHONE} />.
      </p>
    </section>
  );
};

PrescriptionRenewalSection.displayName = 'PrescriptionRenewalSection';
