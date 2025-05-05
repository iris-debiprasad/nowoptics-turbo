import Link from "next/link";
import style from "./PrivacyPolicy.module.scss";
import { useTranslation } from "react-i18next";
import {
  PRIVACY_CONTACT_EMAIL,
  SO_DEFAULT_STORE_CONTACT_NUMBER,
} from "@/constants/common.constants";

const PrivacyPolicy = () => {
  const { t } = useTranslation();
  return (
    <div className={style.privacyPolicyContainer}>
      <h1>{t(`PRIVACY_POLICY.PRIVACY_POLICY`)}</h1>

      <p>{t(`PRIVACY_POLICY.THIS_PRIVACY_POLICY`)}</p>

      <p>
        {t(`PRIVACY_POLICY.THIS_POLICY_POLICY_DESCRIBES`)}
        <Link
          className={style.link}
          target="_blank"
          href="https://www.stantonoptical.com"
        >
          www.stantonoptical.com
        </Link>
        ,{" "}
        <Link
          className={style.link}
          target="_blank"
          href="https://www.myeyelab.com"
        >
          www.myeyelab.com
        </Link>
        ,{" "}
        <Link
          className={style.link}
          target="_blank"
          href="https://www.framegenie.com"
        >
          www.framegenie.com
        </Link>
        ,{" "}
        <Link
          className={style.link}
          target="_blank"
          href="https://www.nowoptics.com"
        >
          www.nowoptics.com
        </Link>
        {t(`PRIVACY_POLICY.AND_ANY_OTHER`)}&nbsp;
      </p>

      <p>{t(`PRIVACY_POLICY.PERSONAL_INFORMATION_IS`)}</p>

      <p>{t(`PRIVACY_POLICY.IMPORTANT_NOTICE`)}</p>

      <p>
        {t(`PRIVACY_POLICY.BY_USING_THE_SITES`)}&nbsp;{" "}
        {t(`PRIVACY_POLICY.IF_YOU_DO_NOT_AGREE`)}
      </p>

      <h2>{t(`PRIVACY_POLICY.HOW_WE_COLLECT_PERSONAL_INFORMATION`)}</h2>

      <p>{t(`PRIVACY_POLICY.WHEN_USING_OUR_SITES`)}</p>

      <p>{t(`PRIVACY_POLICY.WE_MAY_ALSO_COLLECT`)}</p>

      <p>{t(`PRIVACY_POLICY.WE_MAY_RECEIVE_PERSONAL`)}</p>

      <h2>{t(`PRIVACY_POLICY.THE_INFORMATION_WE_COLLECT`)}</h2>

      <p>{t(`PRIVACY_POLICY.WHEN_YOU_INTERACT_WITH`)}</p>

      <p>{t(`PRIVACY_POLICY.WHEN_YOU_MAKE_PURCHASE`)}</p>

      <p>{t(`PRIVACY_POLICY.IF_YOU_APPLY`)}</p>

      <p>
        {t(`PRIVACY_POLICY.SOME_OF_THE_AFFILIATES`)}
        <Link
          className={style.link}
          target="_blank"
          href="https://www.nowoptics.com/hipaa-notice/"
        >
          {t(`PRIVACY_POLICY.NOTICE_OF_PRIVACY_PRACTICES`)}
        </Link>
        {t(`PRIVACY_POLICY.PLEASE_VISIT_THAT`)}&nbsp;
      </p>

      <p>
        {t(`PRIVACY_POLICY.WE_THIRD_PARTIES`)}
        <Link className={style.link} href="/privacy-policy/#digital-ad">
          {t(`PRIVACY_POLICY.DIGITAL_ADVERTISING`)} &amp;{" "}
          {t(`PRIVACY_POLICY.ANALYTICS`)}
        </Link>
        {t(`PRIVACY_POLICY.SECTION_OF_THIS_POLICY`)}{" "}
      </p>

      <h2>{t(`PRIVACY_POLICY.HOW_DO_WE_USE_THIS_INFORMATION`)}</h2>

      <p>{t(`PRIVACY_POLICY.WE_MAY_USE_THE_PERSONAL`)}</p>

      <ol>
        <li>{t(`PRIVACY_POLICY.TO_PROCESS_TRACK`)}</li>
        <li>{t(`PRIVACY_POLICY.TO_CONFIRM_SCHEDULE`)}&nbsp;</li>
        <li>{t(`PRIVACY_POLICY.TO_ADMINISTER_A_CONTEST`)}</li>
        <li>{t(`PRIVACY_POLICY.TO_SEND_YOU_INFORMATION`)}</li>
        <li>{t(`PRIVACY_POLICY.TO_OPERATE_AND`)}</li>
        <li>{t(`PRIVACY_POLICY.TO_COMMUNICATE_WITH`)}</li>
        <li>{t(`PRIVACY_POLICY.TO_COMPLY_WITH`)}</li>
        <li>{t(`PRIVACY_POLICY.AS_OTHERWISE_DISCLOSED`)}</li>
        <li>{t(`PRIVACY_POLICY.TO_FILL_A_JOB`)}</li>
      </ol>

      <p>{t(`PRIVACY_POLICY.WHEN_YOU_MAKE`)}</p>

      <h2>{t(`PRIVACY_POLICY.SHARING_PERSONAL_INFORMATION`)}</h2>

      <p>{t(`PRIVACY_POLICY.WE_DO_NOT_SELL`)}</p>

      <p>{t(`PRIVACY_POLICY.PERSONAL_INFORMATION_COLLECTED`)}&nbsp;</p>

      <p>{t(`PRIVACY_POLICY.WE_MAY_DISCLOSE_PERSONAL`)}</p>

      <p>{t(`PRIVACY_POLICY.WE_MAY_ALSO_SHARE_YOUR`)}</p>

      <p>{t(`PRIVACY_POLICY.AS_WITH_ANY_BUSINESS`)}</p>

      <p>{t(`PRIVACY_POLICY.THE_SITES_MAY_ALLOW`)}</p>

      <p>{t(`PRIVACY_POLICY.WE_SHARE_AGGREGATED`)}</p>

      <p>{t("PRIVACY_POLICY.NO_MOBILE_INFORMATION")}</p>

      <h2 id="digital-ad">
        {t(`PRIVACY_POLICY.DIGITAL_ADVERTISING_CAPS`)} &amp;{" "}
        {t(`PRIVACY_POLICY.ANALYTICS`)}
      </h2>

      <p>{t(`PRIVACY_POLICY.WE_MAY_PARTNER_WITH`)}</p>

      <p>
        {t(`PRIVACY_POLICY.THIS_TYPE_OF`)}
        <Link
          className={style.link}
          target="_blank"
          href="http://www.aboutads.info"
          rel="noopener noreferer nofollow noreferrer"
        >
          www.aboutads.info
        </Link>{" "}
        {t(`PRIVACY_POLICY.AND`)}{" "}
        <Link
          className={style.link}
          target="_blank"
          href="http://www.networkadvertising.org/choices"
          rel="noopener noreferer nofollow noreferrer"
        >
          http://www.networkadvertising.org/choices
        </Link>
        {t(`PRIVACY_POLICY.TO_LEARN_MORE_ABOUT`)}
      </p>

      <p>
        {t(`PRIVACY_POLICY.wE_MAY_ALSO_WORK_WITH`)}
        <Link
          className={style.link}
          target="_blank"
          href="http://www.google.com/policies/privacy/partners/"
          rel="noopener noreferer nofollow noreferrer"
        >
          www.google.com/policies/privacy/partners/
        </Link>
        {t(`PRIVACY_POLICY.YOU_CAN_OPT_OUT`)}{" "}
        <Link
          className={style.link}
          target="_blank"
          href="http://tools.google.com/dlpage/gaoptout"
          rel="noopener noreferer nofollow noreferrer"
        >
          http://tools.google.com/dlpage/gaoptout
        </Link>
        .
      </p>

      <h2>
        {t(`PRIVACY_POLICY.THIRD_PARTY_LINKS`)} &amp;{" "}
        {t(`PRIVACY_POLICY.PLUG_INS`)}
      </h2>

      <p>{t(`PRIVACY_POLICY.THE_SITES_MAY_PROVIDE`)}</p>

      <p>{t(`PRIVACY_POLICY.THE_SITES_MAY_ALSO`)}</p>

      <h2>{t(`PRIVACY_POLICY.CALIFORNIA_RESIDENTS`)}</h2>

      <p>
        {t(`PRIVACY_POLICY.THIS_SECTION_APPLIES`)}
        <strong>{t(`PRIVACY_POLICY.PERSONAL_INFORMATION`)}</strong>
        {t(`PRIVACY_POLICY.IF_YOU_ARE_A_RESIDENT`)}
        <strong>{t(`PRIVACY_POLICY.CCPA`)}</strong>”).&nbsp;{" "}
        {t(`PRIVACY_POLICY.WHEN_WE_USE`)}
        <strong>{t(`PRIVACY_POLICY.PERSONAL_INFORMATION`)}</strong>
        {t(`PRIVACY_POLICY.IN_THE_CONTEXT_OF`)}&nbsp;{" "}
        {t(`PRIVACY_POLICY.PLEASE_NOTE_THAT`)}&nbsp;{" "}
        {t(`PRIVACY_POLICY.AS_A_RESULT`)}
      </p>

      <p>{t(`PRIVACY_POLICY.IF_YOU_WOULD_LIKE_TO`)}</p>

      <ul>
        <li>
          <strong>
            {t(`PRIVACY_POLICY.CATEGORIES_OF_PERSONAL_INFORMATION`)}
          </strong>
        </li>
      </ul>

      <p>{t(`PRIVACY_POLICY.IN_ACCORDANCE_WITH`)}</p>

      <table>
        <thead>
          <tr>
            <th scope="col">
              <p>
                <span>
                  <strong>
                    {t(
                      `PRIVACY_POLICY.CATEGORIES_OF_PERSONAL_INFORMATION_COLLECTED`
                    )}{" "}
                    &amp; {t(`PRIVACY_POLICY.DISCLOSED`)}
                  </strong>
                </span>
              </p>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <p>
                <strong>{t(`PRIVACY_POLICY.IDENTIFIERS`)} </strong>
                {t(`PRIVACY_POLICY.A_REAL_NAME`)}
              </p>
            </td>
          </tr>
          <tr>
            <td>
              <p>
                <strong>
                  {t(`PRIVACY_POLICY.PERSONAL_INFORMATION_CATEGORIES`)}
                </strong>
                {t(`PRIVACY_POLICY.EGA`)} {t(`PRIVACY_POLICY.NAME_SIGNATURE`)}
                &apos;{t(`PRIVACY_POLICY.LICENSE_OR_STATE`)}
              </p>
            </td>
          </tr>
          <tr>
            <td>
              <strong>{t(`PRIVACY_POLICY.INTERNET_OR_OTHER_SIMILAR`)}</strong>{" "}
              {t(`PRIVACY_POLICY.BROWSING_HISTORY`)}
            </td>
          </tr>
          <tr>
            <td>
              <strong>{t(`PRIVACY_POLICY.GEOLOCATION_DATA`)}</strong>{" "}
              {t(`PRIVACY_POLICY.PHYSICAL_LOCATION`)}&nbsp;&nbsp;
            </td>
          </tr>
          <tr>
            <td>
              <strong>{t(`PRIVACY_POLICY.INFERENCES_DRAWN_FROM`)}</strong>{" "}
              {t(`PRIVACY_POLICY.PROFILE_REFLECTING`)}
            </td>
          </tr>
          <tr>
            <td>
              <strong>{t(`PRIVACY_POLICY.PROTECTED_CLASSIFICATION`)}</strong>
              {t(`PRIVACY_POLICY.AGE`)}
            </td>
          </tr>
          <tr>
            <td>
              <strong>{t(`PRIVACY_POLICY.PROFESSIONAL_OR`)}</strong>{" "}
              {t(`PRIVACY_POLICY.CURRENT_OR_PAST`)}
            </td>
          </tr>
        </tbody>
      </table>

      <p>&nbsp;</p>

      <p>
        {t(`PRIVACY_POLICY.WE_DISCLOSE_EACH`)}&nbsp;{" "}
        {t(`PRIVACY_POLICY.WE_ALSO_DISCLOSE`)}
        <em>{t(`PRIVACY_POLICY.SHARING_PERSONAL`)}</em>”.
      </p>

      <p>
        {t(`PRIVACY_POLICY.IN_THE_LAST`)}&nbsp;{" "}
        {t(`PRIVACY_POLICY.SELLING_RENTING`)}&nbsp;
        {t(`PRIVACY_POLICY.IF_WE_DO_SELL_YOUR`)}{" "}
      </p>

      <ul>
        <li>
          <strong>{t(`PRIVACY_POLICY.YOUR_CALIFORNIA`)}</strong>
        </li>
      </ul>

      <p>{t(`PRIVACY_POLICY.IF_YOU_ARE_A`)}</p>

      <table>
        <thead>
          <tr>
            <th scope="col">
              <span>{t(`PRIVACY_POLICY.PRIVACY_RIGHT`)}</span>
            </th>
            <th scope="col">
              <span>{t(`PRIVACY_POLICY.DESCRIPTION`)}</span>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className={style.addBackground}>
              <strong>{t(`PRIVACY_POLICY.NOTICE`)}</strong>
            </td>
            <td>{t(`PRIVACY_POLICY.YOU_MAY_HAVE`)}</td>
          </tr>
          <tr>
            <td className={style.addBackground}>
              <strong>{t(`PRIVACY_POLICY.ACCESS`)}</strong>
            </td>
            <td>{t(`PRIVACY_POLICY.YOU_MAY_HAVE_THE`)}</td>
          </tr>
          <tr>
            <td className={style.addBackground}>
              <strong>{t(`PRIVACY_POLICY.DATA_PORTABILITY`)}</strong>
            </td>
            <td>{t(`PRIVACY_POLICY.YOU_MAY_HAVE_THE_RIGHT`)}&nbsp;</td>
          </tr>
          <tr>
            <td className={style.addBackground}>
              <strong>{t(`PRIVACY_POLICY.ERASURE`)}</strong>
            </td>
            <td>{t(`PRIVACY_POLICY.YOU_CAN_REQUEST_TO`)}</td>
          </tr>
          <tr>
            <td className={style.addBackground}>
              <strong>{t(`PRIVACY_POLICY.TO_OPT_OUT`)}</strong>
            </td>
            <td>{t(`PRIVACY_POLICY.TO_THE_EXTENT_WE`)}&nbsp;&nbsp;</td>
          </tr>
        </tbody>
      </table>

      <p>&nbsp;</p>

      <p>
        {t(`PRIVACY_POLICY.IF_YOU_WOULD`)}
        {t(`PRIVACY_POLICY.CALL_US`)} {t(`PRIVACY_POLICY.OR_CLICK`)}
        <Link className={style.link} href="/ccpa">
          {t(`PRIVACY_POLICY.ONLINE_REQ_FORM`)}
        </Link>
        .
      </p>

      <p>
        {t(`PRIVACY_POLICY.WE_MUST_VERIFY`)}&nbsp;{" "}
        {t(`PRIVACY_POLICY.IF_WE_CANNOT`)}&nbsp;&nbsp;
      </p>

      <p>
        {t(`PRIVACY_POLICY.WE_MAY_DENY`)} {t(`PRIVACY_POLICY.FOR_EXAMPLE`)}
        &nbsp;{t(`PRIVACY_POLICY.YOU_HAVE_A_RIGHT`)}
      </p>

      <p>
        {t(`PRIVACY_POLICY.THE_CCPA_GIVES`)}
        <Link
          className={style.link}
          target="_blank"
          href="https://oag.ca.gov/contact/consumer-complaint-against-business-or-company"
          rel="noopener noreferer nofollow noreferrer"
        >
          https://oag.ca.gov/contact/consumer-complaint-against-business-or-company
        </Link>
        {t(`PRIVACY_POLICY.OR_BY_TELEPHONE`)}
      </p>

      <h2>{t(`PRIVACY_POLICY.YOUR_CHOICES`)}</h2>

      <p>{t(`PRIVACY_POLICY.TO_OPT_OUT_OF`)}</p>

      <p>{t(`PRIVACY_POLICY.IF_YOU_WOULD_LIKE`)}</p>

      <h2>{t(`PRIVACY_POLICY.TEXT_MESSAGING`)}</h2>

      <ul>
        <li>
          <strong>{t(`PRIVACY_POLICY.OPERATIONAL_TEXT_MESSAGES`)} </strong>
          {t(`PRIVACY_POLICY.BY_USING_OUR`)}
        </li>
        <li>
          <strong>
            {t(`PRIVACY_POLICY.MARKETING_OR_PROMOTIONAL_MESSAGES`)}{" "}
          </strong>
          {t(`PRIVACY_POLICY.WHEN_YOU_PLACE`)}
        </li>
        <li>
          <strong>{t(`PRIVACY_POLICY.STANDARD_RATES_APPLY`)} </strong>
          {t(`PRIVACY_POLICY.STANDARD_DATA_AND`)}
        </li>
      </ul>

      <p>&nbsp;</p>

      <h2>{t(`PRIVACY_POLICY.CHILDREN_PRIVACY`)}</h2>

      <p>{t(`PRIVACY_POLICY.WE_UNDERSTAND_THE`)}</p>

      <h2>{t(`PRIVACY_POLICY.UPDATING_YOUR_INFORMATION`)}</h2>

      <p>{t(`PRIVACY_POLICY.YOU_MAY_REQUEST`)}</p>

      <h2>{t(`PRIVACY_POLICY.SECURITY`)}</h2>

      <p>{t(`PRIVACY_POLICY.WE_MAINTAIN_REASONABLE`)}</p>

      <h2>{t(`PRIVACY_POLICY.DO_NOT_TRACK_SIGNAL`)}</h2>

      <p>
        {t(`PRIVACY_POLICY.YOUR_BROWSER_SETTINGS`)}
        <Link
          className={style.link}
          target="_blank"
          href="http://www.allaboutdnt.com"
          rel="noopener noreferer nofollow noreferrer"
        >
          http://www.allaboutdnt.com
        </Link>
        {t(`PRIVACY_POLICY.BUT_WE_ARE_NOT`)}
      </p>

      <h2>{t(`PRIVACY_POLICY.TRACKING_ACROSS_TIME`)}</h2>

      <p>{t(`PRIVACY_POLICY.SOME_INFORMATION_ABOUT`)}</p>

      <h2>{t(`PRIVACY_POLICY.UPDATES_TO_POLICY`)}</h2>

      <p>{t(`PRIVACY_POLICY.WE_MAY_CHANGE_THIS`)}</p>

      <h2>{t(`PRIVACY_POLICY.GOVERNING_LAW`)}</h2>

      <p>{t(`PRIVACY_POLICY.PLEASE_READ_THE`)}</p>

      <p>{t(`PRIVACY_POLICY.THE_LAWS_OF_THE`)}</p>

      <p>
        {t(`PRIVACY_POLICY.UNLESS_RESOLVED_BY`)}&nbsp;{" "}
        {t(`PRIVACY_POLICY.OR_ANY_TRANSACTION`)}
      </p>

      <h2>{t(`PRIVACY_POLICY.CONTACT`)}</h2>

      <p>{t(`PRIVACY_POLICY.IF_YOU_HAVE_QUESTIONS`)}</p>

      <p className={style.contacts}>
        {t(`PRIVACY_POLICY.PRIVACY_OFFICE`)}
        <br />
        Now Optics
        <br />
        1615 S Congress Ave Ste. 105&nbsp;
        <br />
        Delray Beach, FL 33445
        <br />
        Phone:{" "}
        <Link
          className={style.link}
          href={`tel:${SO_DEFAULT_STORE_CONTACT_NUMBER}`}
        >
          {SO_DEFAULT_STORE_CONTACT_NUMBER}
        </Link>
        <br />
        Email:{" "}
        <Link className={style.link} href={`mailto:${PRIVACY_CONTACT_EMAIL}`}>
          {PRIVACY_CONTACT_EMAIL}
        </Link>
      </p>
    </div>
  );
};

export default PrivacyPolicy;
