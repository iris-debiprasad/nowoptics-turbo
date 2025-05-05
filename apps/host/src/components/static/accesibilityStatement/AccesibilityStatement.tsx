import { BRAND, BRAND_NAME, DEFAULT_STORE_SUPPORT_NUMBER } from "@/constants/common.constants";
import styles from "./AccesibilityStatement.module.scss";
import useResponsive from "@/hooks/useResponsive";
import { unformatPhoneNumber } from "@/utils/common.utils";

const ADAIcon = ({ brand }: { brand: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 100 125"
    version="1.1"
    x="0px"
    y="0px"
    fillRule="evenodd"
    clipRule="evenodd"
    strokeLinejoin="round"
    strokeMiterlimit="2"
    fill={brand === BRAND.SO ? "#fc8100" : "#0082ca"}
  >
    <rect x="0" y="0" width="100" height="100" fill="none" />
    <g>
      <path d="M50,5c-24.836,-0 -45,20.164 -45,45c0,24.836 20.164,45 45,45c24.836,0 45,-20.164 45,-45c0,-24.836 -20.164,-45 -45,-45Zm0,7.963c20.442,-0 37.038,16.595 37.038,37.037c-0,20.442 -16.596,37.037 -37.038,37.037c-20.441,0 -37.037,-16.595 -37.037,-37.037c-0,-20.442 16.596,-37.037 37.037,-37.037Z" />
      <g>
        <path d="M43.425,47.761c-0.777,8.925 -2.824,17.581 -6.015,25.997c-0.779,2.055 0.257,4.355 2.311,5.134c2.055,0.779 4.355,-0.256 5.134,-2.311c2.259,-5.958 3.986,-12.027 5.145,-18.215c1.159,6.188 2.886,12.257 5.145,18.215c0.779,2.055 3.079,3.09 5.134,2.311c2.055,-0.779 3.09,-3.079 2.311,-5.134c-3.189,-8.411 -5.235,-17.063 -6.013,-25.98c4.769,-0.234 9.54,-0.734 14.311,-1.509c2.169,-0.353 3.644,-2.4 3.291,-4.569c-0.352,-2.168 -2.399,-3.643 -4.568,-3.291c-13.082,2.126 -26.163,2.042 -39.245,-0.004c-2.171,-0.339 -4.209,1.148 -4.549,3.319c-0.339,2.171 1.148,4.209 3.319,4.548c4.762,0.745 9.525,1.245 14.289,1.489Z" />
        <circle cx="50" cy="29.474" r="7.186" />
      </g>
    </g>
  </svg>
);

const AccesibilityStatement = ({ brand }: { brand: string }) => {
  const brand_name = BRAND_NAME[brand];
  const store_number = DEFAULT_STORE_SUPPORT_NUMBER[brand];
  const brand_url = brand === BRAND.SO ? "stantonoptical.com" : "myeyelab.com";
  const hasReached = useResponsive();

  return (
    <div className={styles.adaWrapper}>
      <div className={styles.adaContainer}>
        <ADAIcon brand={brand} />
        <h1 className={styles.main_title}>Eyecare for Everyone<br /> Website Accessibility Statement</h1>
        <p>
          {brand_name} is committed to making our website available to
          everyone, including people with disabilities, and providing a positive
          experience so you can easily browse, shop and make your needed eye exam
          appointment. We are taking the following measures to ensure
          accessibility:
        </p>
        <div className={`${styles.ada_list} ${brand === BRAND.SO ? styles.so_list : styles.mel_list}`}>
          <div>We follow the Web Content Accessibility Guidelines (WCAG).</div>
          <div>
            Our team of associates is continually improving the user experience
            for everyone.
          </div>
          <div>
            We provide the needed accommodations in-store to meet every
            individual&apos;s eye care needs.
          </div>
        </div>

        <p className={styles.footer_text}>
          We welcome your questions and feedback. If you are having difficulty
          viewing or accessing any page on {brand_url}, please contact our
          Customer Support team at {!hasReached.md ? <a href={`tel:${unformatPhoneNumber(store_number)}`}>{store_number}</a> : <span>{store_number}</span>} and share your experience with us.
          The details you provide will help us continue improving accessibility on
          our website. We will do everything we can to provide you with the needed
          access to help you accomplish your eye care goal.
        </p>
      </div >

    </div>
  );
};
export default AccesibilityStatement;
