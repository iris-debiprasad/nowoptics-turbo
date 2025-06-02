import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import style from "./ReferFriend.module.scss";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { ResponsiveBanner } from "@/components/responsive-banner";
import { CircularProgress, MenuItem } from "@mui/material";
import { PDFDocument, StandardFonts } from "pdf-lib";
import { BRAND } from "@root/host/src/constants/common.constants";
import { checkBrand, isMobileDevice } from "@root/host/src/utils/common.utils";
import i18n from "@root/host/src/language/i18n";
import { ImageUrlConstants } from "@root/host/src/constants/image.url.constants";

export interface IOption {
  value: string;
  label: string;
}

const ReferAFriend = () => {
  const { t } = useTranslation();
  const [customerName, setCustomerName] = React.useState<string | undefined>(
    undefined
  );
  const [friendName, setFriendName] = React.useState<string | undefined>(
    undefined
  );
  const [mm, setMM] = React.useState<number | undefined>(undefined);
  const [dd, setDD] = React.useState<number | undefined>(undefined);
  const [yyyy, setYYYY] = React.useState<number | undefined>(undefined);
  const [showErrorFullName, setFullName] = React.useState<boolean>(false);
  const [showErrorFriendName, setFullFriendName] =
    React.useState<boolean>(false);
  const [dateCompleted, setDateCompleted] = React.useState<boolean>(false);
  const [printPDF, setPrint] = React.useState<boolean>(false);
  const [startDownloadPDF, setStartDownloadPDF] =
    React.useState<boolean>(false);
  const [loading, setLoading] = React.useState<boolean>(false);
  const [brand, setBrand] = React.useState<string>("");
  const [isMobile, setIsMobile] = React.useState(false);
  const [isSpanish, setIsSpanish] = React.useState(false);

  const REFER_FRIEND_IMAGES = ImageUrlConstants.REFER_A_FRIEND;

  React.useEffect(() => {
    setIsSpanish(i18n.language == "de" ? true : false);
  }, [i18n.language]);

  React.useEffect(() => {
    const regex: any = /^[a-zA-Z]{2,40}( [a-zA-Z]{2,40})+$/;
    const selected = new Date(`${mm}/${dd}/${yyyy}`);
    const maxDate = new Date();
    maxDate.setHours(0, 0, 0, 0);
    maxDate.setDate(maxDate.getDate() + 1);

    if (customerName && regex.test(customerName)) {
      setFullName(false);
    }

    if (friendName && regex.test(friendName)) {
      setFullFriendName(false);
    }

    if (dd !== undefined && mm !== undefined && yyyy !== undefined) {
      setDateCompleted(false);
    }

    if (
      customerName &&
      regex.test(customerName) &&
      dd !== undefined &&
      mm !== undefined &&
      yyyy !== undefined &&
      friendName &&
      regex.test(friendName) &&
      selected < maxDate
    ) {
      setPrint(true);
    } else {
      setPrint(false);
    }

    if (selected > maxDate) {
      setDateCompleted(true);
    }
  }, [friendName, customerName, dd, mm, yyyy]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setBrand(checkBrand());
    }
    setIsMobile(isMobileDevice());
  }, []);

  const handleDOBChange = (
    e: React.ChangeEvent<any>,
    fieldParam: string,
    valueParam: string
  ) => {
    const value: string | undefined = e.target.value
      ? e.target.value
      : undefined;

    let mmCopy: any = mm;
    if (fieldParam === "mm") {
      mmCopy = value
        ? valueParam == "00" ||
          Number(valueParam) < 0 ||
          Number(valueParam) > 12
          ? mm
          : limitDateField(valueParam)
        : "";
    }
    let ddCopy: any = dd;
    if (fieldParam === "dd") {
      ddCopy = value
        ? valueParam == "00" ||
          (Number(valueParam) < 0 || Number(valueParam) > 31
            ? dd
            : limitDateField(valueParam))
        : "";
    }
    let yyyyCopy: any = yyyy;
    if (fieldParam === "yyyy") {
      yyyyCopy = value && Number(value) !== -1 ? Number(valueParam) : undefined;
    }

    if (yyyyCopy && yyyyCopy != -1 && ddCopy && mmCopy) {
      const days: number = daysInMonth(mmCopy, yyyyCopy);

      if (ddCopy > days) {
        ddCopy = days;
      }
    }
    setDD(ddCopy);
    setMM(mmCopy);
    setYYYY(yyyyCopy);
  };

  const handleTextInput = (e: React.ChangeEvent<any>, fieldParam: string) => {
    const value: string | undefined = e.target.value
      ? e.target.value
      : undefined;
    let customerNameCopy: string | undefined = customerName;
    if (fieldParam === "customerName") {
      customerNameCopy = value;
    }

    let friendNameCopy: string | undefined = friendName;
    if (fieldParam === "friendName") {
      friendNameCopy = value;
    }

    setCustomerName(customerNameCopy);
    setFriendName(friendNameCopy);
  };

  const renderTextFields = () => {
    return (
      <div className={style.inputWrapper}>
        <div className={style.labelContainer}>
          <label>{t("REFER_A_FRIEND.FIELD_1")}</label>
          <div
            className={style.tooltipIcon}
            title={t("REFER_A_FRIEND.FIELD_1_TOOLTIP")}
          >
            !
          </div>
        </div>
        <div className={style.validationWrapperInputs}>
          <div className={style.inputField}>
            <TextField
              fullWidth
              name="customerName"
              onChange={(e) => handleTextInput(e, e.target.name)}
              value={customerName || ""}
              placeholder={t("REFER_A_FRIEND.FIELD_1_PLACEHOLDER")}
              className={showErrorFullName ? style.errorField : ""}
            />
            {!!showErrorFullName && (
              <label className={style.errorMessage}>
                {t("REFER_A_FRIEND.FIELD_1_ERROR")}
              </label>
            )}
          </div>
        </div>
      </div>
    );
  };

  const renderFieldDOB = () => {
    return (
      <div className={style.inputWrapper}>
        <div className={style.labelContainer}>
          <label>{t("REFER_A_FRIEND.FIELD_2")}</label>
          <div
            className={style.tooltipIcon}
            title={t("REFER_A_FRIEND.FIELD_2_TOOLTIP")}
          >
            !
          </div>
        </div>
        <div>
          <div className={style.inputs}>
            <div className={style.inputField}>
              <TextField
                id="mm"
                name="mm"
                type="number"
                value={mm}
                onChange={(e) =>
                  handleDOBChange(e, e.target.name, e.target.value)
                }
                placeholder={t("REFER_A_FRIEND.FIELD_2_PLACEHOLDER_1")}
                inputMode="numeric"
                onPaste={(e) => e.preventDefault()}
                className={dateCompleted ? style.errorField : ""}
                onKeyDown={(e) =>
                  ["e", "E", "+", "-", "."].includes(e.key) &&
                  e.preventDefault()
                }
              />
            </div>

            <div className={style.inputField}>
              <TextField
                id="dd"
                name="dd"
                type="number"
                value={dd}
                onChange={(e) =>
                  handleDOBChange(e, e.target.name, e.target.value)
                }
                placeholder={t("REFER_A_FRIEND.FIELD_2_PLACEHOLDER_2")}
                onPaste={(e) => e.preventDefault()}
                inputMode="numeric"
                className={dateCompleted ? style.errorField : ""}
                onKeyDown={(e) =>
                  ["e", "E", "+", "-", "."].includes(e.key) &&
                  e.preventDefault()
                }
              />
            </div>

            <div className={style.inputField}>
              <TextField
                select
                fullWidth
                id="yyyy"
                name="yyyy"
                onChange={(e) =>
                  handleDOBChange(e, e.target.name, e.target.value)
                }
                value={yyyy}
                placeholder={t("REFER_A_FRIEND.FIELD_2_PLACEHOLDER_3")}
                defaultValue={"DEFAULT"}
                className={
                  dateCompleted ? style.errorField : style.greyInputColor
                }
              >
                <MenuItem value="DEFAULT" disabled>
                  {t("REFER_A_FRIEND.FIELD_2_PLACEHOLDER_3")}
                </MenuItem>
                {getYearValues().map((option: IOption, index: number) => (
                  <MenuItem value={option.value} key={index}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
              <span className={style.iconSelect} />
            </div>
          </div>
          {!!dateCompleted && (
            <label className={style.errorMessageDate}>
              {t("REFER_A_FRIEND.FIELD_2_ERROR")}
            </label>
          )}
        </div>
      </div>
    );
  };

  const renderFriendTextFields = () => {
    return (
      <div>
        <div className={style.inputFormGroup}>
          <div className={style.inputWrapper}>
            <div className={style.labelContainer}>
              <label>{t("REFER_A_FRIEND.FIELD_3")}</label>
              <div
                className={style.tooltipIcon}
                title={t("REFER_A_FRIEND.FIELD_3_TOOLTIP")}
              >
                !
              </div>
            </div>
            <div className={style.validationWrapperInputs}>
              <div className={style.inputField}>
                <TextField
                  fullWidth
                  name="friendName"
                  onChange={(e) => handleTextInput(e, e.target.name)}
                  value={friendName || ""}
                  placeholder={t("REFER_A_FRIEND.FIELD_3_PLACEHOLDER")}
                  className={showErrorFriendName ? style.errorField : ""}
                />
                {!!showErrorFriendName && (
                  <label className={style.errorMessage}>
                    {t("REFER_A_FRIEND.FIELD_3_ERROR")}
                  </label>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const limitDateField = (field: any) => {
    return field.substring(0, 2);
  };

  const daysInMonth = (month: any, year: any) => {
    return new Date(year, month, 0).getDate();
  };

  const getYearValues = (): IOption[] => {
    const val: IOption[] = [];
    for (
      let index = new Date().getFullYear() - 2;
      index <= new Date().getFullYear();
      index++
    ) {
      val.push({
        label: `${index}`,
        value: `${index}`,
      });
    }

    return val.sort((a, b) => (Number(a.value) < Number(b.value) ? 1 : -1));
  };

  const onDownloadPDF = async () => {
    setLoading(true);
    setStartDownloadPDF(false);
    const url =
      i18n.language === "en"
        ? BASE_IMAGE_URL +
          "m/367efc06e1b0381c/original/146_Refer-a-Friend_Card_ENG.pdf"
        : BASE_IMAGE_URL +
          "m/3e59d5c1dd68219b/original/146_Refer-A-Friend_Card_SPA.pdf";
    const existingPdfBytes = await fetch(url).then((res) => res.arrayBuffer());

    const pdfDoc = await PDFDocument.load(existingPdfBytes);
    const helveticaFont = await pdfDoc.embedFont(StandardFonts.Helvetica);

    const pages = pdfDoc.getPages();
    const firstPage = pages[0];
    if (checkBrand() === BRAND.MEL) {
      firstPage.drawText(customerName as string, {
        x: 90,
        y: 160,
        size: 8,
        font: helveticaFont,
      });
      firstPage.drawText(`${mm}-${dd}-${yyyy}` || "", {
        x: 110,
        y: 138,
        size: 8,
        font: helveticaFont,
      });
      firstPage.drawText(friendName as string, {
        x: 120,
        y: 118,
        size: 8,
        font: helveticaFont,
      });
    } else if (i18n.language === "en") {
      firstPage.drawText(customerName as string, {
        x: 90,
        y: 150,
        size: 8,
        font: helveticaFont,
      });
      firstPage.drawText(`${mm}-${dd}-${yyyy}` || "", {
        x: 110,
        y: 128,
        size: 8,
        font: helveticaFont,
      });
      firstPage.drawText(friendName as string, {
        x: 120,
        y: 108,
        size: 8,
        font: helveticaFont,
      });
    } else {
      firstPage.drawText(customerName as string, {
        x: 90,
        y: 143,
        size: 8,
        font: helveticaFont,
      });
      firstPage.drawText(`${mm}-${dd}-${yyyy}` || "", {
        x: 110,
        y: 120,
        size: 8,
        font: helveticaFont,
      });
      firstPage.drawText(friendName as string, {
        x: 120,
        y: 100,
        size: 8,
        font: helveticaFont,
      });
    }

    const modifiedPdfBytes = await pdfDoc.save();

    const href = URL.createObjectURL(
      new Blob([modifiedPdfBytes], { type: "application/pdf" })
    );
    const link = document.createElement("a");
    link.href = href;
    link.setAttribute("download", "refer_a_friend.pdf");
    document.body.appendChild(link);
    setTimeout(() => {
      link.click();
      document.body.removeChild(link);
      setStartDownloadPDF(true);
      setLoading(false);
    }, 1000);
  };

  const validateForm = () => {
    const regex: any = /^[a-zA-Z]{2,40}( [a-zA-Z]{2,40})+$/;
    const selected = new Date(`${mm}/${dd}/${yyyy}`);
    selected.setHours(0, 0, 0, 0);
    const maxDate = new Date();
    maxDate.setHours(0, 0, 0, 0);
    maxDate.setDate(maxDate.getDate());

    if (
      customerName == undefined ||
      (customerName && !regex.test(customerName))
    ) {
      setFullName(true);
      document.getElementById("referForm")?.scrollIntoView(true);
    } else {
      setFullName(false);
    }

    if (friendName == undefined || (friendName && !regex.test(friendName))) {
      setFullFriendName(true);
      document.getElementById("referForm")?.scrollIntoView(true);
    } else {
      setFullFriendName(false);
    }

    if (
      dd == null ||
      dd == null ||
      dd <= 0 ||
      mm == null ||
      mm == null ||
      mm <= 0 ||
      yyyy == null ||
      yyyy == null ||
      yyyy <= 0 ||
      selected > maxDate
    ) {
      setDateCompleted(true);
      document.getElementById("referForm")?.scrollIntoView(true);
    } else {
      setDateCompleted(false);
    }
  };

  const onRenderButton = (): JSX.Element => {
    return (
      <div className={style.buttonContainer}>
        {printPDF ? (
          <Button className={style.appointmentBtn} onClick={onDownloadPDF}>
            <span className={style.showDesktop}>{t("REFER_A_FRIEND.CTA")}</span>
            <span className={style.showMobile}>{t("REFER_A_FRIEND.CTA")}</span>
          </Button>
        ) : (
          <Button className={style.appointmentBtn} onClick={validateForm}>
            <span className={style.showDesktop}>{t("REFER_A_FRIEND.CTA")}</span>
            <span className={style.showMobile}>{t("REFER_A_FRIEND.CTA")}</span>
          </Button>
        )}
      </div>
    );
  };
  const BASE_IMAGE_URL = process.env.NEXT_PUBLIC_IMAGE_BASE_URL;

  const SO_DESKTOP_BANNER: string =
    BASE_IMAGE_URL +
    "transform/f2748776-70da-4a9c-a7f2-0e1fa452cc0d/146_Retail_Refer-A-Friend_Web_SO_Home_Page_LP_Desktop_1366x330";
  const SO_MOBILE_BANNER: string =
    BASE_IMAGE_URL +
    "transform/ed4058be-db19-4d10-b690-8418c7956303/146_Retail_Refer-A-Friend_Web_SO_Home_Page_LP_Mobile_750x400";

  const getBannerUrlByBrand = () => {
    if (brand === BRAND.SO) {
      if (isSpanish) {
        return isMobile
          ? REFER_FRIEND_IMAGES.MOBILE_SPANISH
          : REFER_FRIEND_IMAGES.DESKTOP_SPANISH;
      } else {
        return isMobile ? SO_MOBILE_BANNER : SO_DESKTOP_BANNER;
      }
    } else {
      return "";
    }
  };

  return (
    <>
      <ResponsiveBanner
        mobile={{
          alt: "Refer a friend to get special rewards",
          src: getBannerUrlByBrand(),
        }}
        tabletAndDesktop={{
          alt: `Refer a friend to get special rewards`,
          src: getBannerUrlByBrand(),
        }}
      />
      <div className={style.referContainer}>
        <div className={style.steps}>
          <p>
            {brand === BRAND.MEL
              ? "Here's how it works:"
              : t("REFER_A_FRIEND.STEP_HEADER")}
          </p>
          <ol>
            <li>{t("REFER_A_FRIEND.STEP_1")}</li>
            <li>{t("REFER_A_FRIEND.STEP_2")}</li>
            <li>{t("REFER_A_FRIEND.STEP_3")}</li>
            <li>{t("REFER_A_FRIEND.STEP_4")}</li>
          </ol>
        </div>
        <h1
          className={`informational-page-title text-center ${style.showDesktop}`}
        >
          {t("REFER_A_FRIEND.FORM_HEADING")}
        </h1>
        <h1
          className={`informational-page-title text-center ${style.showMobile}`}
        >
          {t("REFER_A_FRIEND.FORM_HEADING")}
        </h1>
        <div className={style.referForm} id="referForm">
          {renderTextFields()}
          {renderFieldDOB()}
          {renderFriendTextFields()}
          {loading ? (
            <>
              <div className={style.loading}>
                <CircularProgress />
              </div>
              <div className={style.downloadingPDFMessage}>
                {t("REFER_A_FRIEND.DOWNLOADING")}
              </div>
            </>
          ) : (
            <>{onRenderButton()}</>
          )}
          <div className={style.printedPDFMessage}>
            {startDownloadPDF && t("REFER_A_FRIEND.DOWNLOAD_SUCCESS")}
          </div>
        </div>
        <p className={style.disclaimer}>
          {brand === BRAND.MEL
            ? "*Refer a Friend participation requires a purchase from both the referring customer and the referred person. Referral by referring customer must be made within 1 year of purchase. The referred person will receive 20% off their total purchase. The 20% discount cannot be combined with contact lens promotions or insurance. Referral card must be presented at the time of purchase and redeemed within My EyeLab®. Referring customer will receive $169 towards a pair of non-prescription sunglasses, $169 has no cash value. Terms and conditions subject to change."
            : t("REFER_A_FRIEND.DISCLAIMER")}
        </p>
      </div>
    </>
  );
};

export default ReferAFriend;
