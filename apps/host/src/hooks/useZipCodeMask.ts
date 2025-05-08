import { isNumeric } from "@root/host/src/constants/common.constants";
import { useEffect, useState } from "react";

const useZipCodeMask = () => {
  const [zipCode, setZipCode] = useState("");
  const [maskedZip, setMaskedZip] = useState("");
  const [unMaskedZip, setUnmaskedZip] = useState("");

  const handleZipCodeMasking = (zip: string) => {
    if (zip.length > 5) {
      setMaskedZip(zip.slice(0, 5) + "-" + zip.slice(5));
    } else if (zip.length <= 6) {
      setMaskedZip(zip.replace("-", ""));
    } else {
      setMaskedZip(zip);
    }
  };

  useEffect(() => {
    if (zipCode.replace("-", "").length <= 9 || !zipCode) {
      handleZipCodeMasking(zipCode.replace("-", ""));
    }
  }, [zipCode]);

  useEffect(() => {
    setUnmaskedZip(zipCode.replace("-", ""));
  }, [maskedZip]);

  const handleZipCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = (e.target as HTMLInputElement).value;
    if(isNumeric.test(value.replace('-', "")) || !value) {
      setZipCode((e.target as HTMLInputElement).value);
    }
  };

  return { maskedZip, unMaskedZip, handleZipCodeChange };
};

export default useZipCodeMask;
