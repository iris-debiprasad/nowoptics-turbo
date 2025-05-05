import { useEffect, useState } from "react";
import i18n from "@root/host/src/language/i18n";
import { useAppSelector } from "@root/host/src/store/useStore";

const useLanguageTranslation = () => {
  const [languageCodeChange, setLanguageCodeChange] = useState("");
  const langCode = useAppSelector((state) => state.langCode.data.langCode);

  useEffect(() => {
    i18n.changeLanguage(langCode ? langCode : "en");
    setLanguageCodeChange(langCode || "en");
  }, [langCode]);

  return null;
};

export default useLanguageTranslation;
