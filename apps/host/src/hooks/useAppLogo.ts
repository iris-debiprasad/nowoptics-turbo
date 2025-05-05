import { ImageUrlConstants } from "@root/host/src/constants/image.url.constants";
import { checkBrand } from "@root/host/src/utils/common.utils";
import { useState, useEffect } from "react";

const useAppLogo = () => {
  const [appLogo, setAppLogo] = useState<string>("");

  useEffect(() => {
    const updateAppLogo = () => {
      if (typeof window !== "undefined") {
        setAppLogo(ImageUrlConstants.LOGO[checkBrand()]);
      }
    };

    updateAppLogo();
  }, []);

  return appLogo;
};

export default useAppLogo;
