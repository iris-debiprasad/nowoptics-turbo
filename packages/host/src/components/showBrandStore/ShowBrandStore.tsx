import { useGetBrand } from "@root/host/src/hooks/useGetBrand";
import {
  BRAND_NAME,
  BRAND_NAME_INDEX,
} from "@root/host/src/constants/common.constants";

export interface IShowBrandStore {
  optionBrandName: string;
  fontSize?: number;
  brandProp?: string;
}

const ShowBrandStore = ({
  optionBrandName,
  fontSize = 11,
  brandProp
}: IShowBrandStore) => {

  const brandHook = useGetBrand();
  const brand = brandProp ?? brandHook;

  const renderOpositeBrandOnOption = () => {
    return BRAND_NAME_INDEX[optionBrandName] && brand !== BRAND_NAME_INDEX[optionBrandName];
  };

  const fontSizeStyle = `${fontSize}px`;
  return (
    <>
      {renderOpositeBrandOnOption() && (
        <span
          style={{
            color: optionBrandName === BRAND_NAME.SO ? "#fc8100" : "#0082ca",
            fontWeight: "bold",
            fontSize: fontSizeStyle,
            wordBreak: "break-word",
          }}
        >
          {" "}
          <div
            style={{
              display: "inline-block",
            }}
          >
            {" "}
            | {optionBrandName.split(" ")[0]}{" "}
          </div>{" "}
          {optionBrandName.split(" ")[1]}®
        </span>
      )}
    </>
  );
};

export default ShowBrandStore;
