import React from "react";
import i18n from "@root/host/src/language/i18n";
import { AlertColor } from "@mui/material";
import { ERROR_MESSAGE } from "@root/host/src/constants/auth.constants";
import { SNACKBAR_COLOR_TYPE } from "@root/host/src/constants/common.constants";
import { getMarketingConsentConfig, MarketingConsentData } from "@root/host/src/service/marketingConsent.service";
import { useSnackBar } from "@root/host/src/contexts/Snackbar/SnackbarContext";

export default function ConsentMessage(): React.JSX.Element {
  const { showSnackBar } = useSnackBar();
  const [marketingConsent, setMarketingConsent] = React.useState<MarketingConsentData>({ 'English': '', 'Spanish': '' });
  const [lang, setLang] = React.useState<string>('');

  React.useEffect(() => {
    getMarketingConsentConfigFromMasterSetup();
  }, []);

  React.useEffect(() => {
    const langCode = i18n.language;
    setLanguage(langCode);
  }, [i18n.language]);

  const getMarketingConsentConfigFromMasterSetup = () => {
    getMarketingConsentConfig()
      .then((response) => {
        const result = response.data.Result;
        const consent = (JSON.parse(result)).smsoptin;
        const langCode = i18n.language;
        setMarketingConsent(consent);
        setLanguage(langCode);
      })
      .catch((error) => {
        showSnackBar(
          error.response
            ? error.response.data.Error?.Message
            : ERROR_MESSAGE.API_DEFAULT_ERROR_MESSAGE,
          SNACKBAR_COLOR_TYPE.ERROR as AlertColor
        );
      });
  };

  const setLanguage = (lang: string) => {
    if (lang == 'en') {
      setLang("English")
    } else {
      setLang("Spanish")
    }
  }

  return (
    <>{(marketingConsent as any)[lang]}</>
  );
}
