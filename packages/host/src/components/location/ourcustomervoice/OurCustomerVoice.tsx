import React, { FunctionComponent } from "react";
import { Box } from "@mui/system";
import style from "./OurCustomerVoice.module.scss";
import { StoreContentDTO } from "@/types/store.type";
import { BRAND } from "@root/host/src/constants/common.constants";
import SingleImageSlider from "@/components/image_slider/SingleImageSlider";

type Props = {
  storeDetails: StoreContentDTO;
  brand: string | undefined;
};


function OurCustomerVoice({ storeDetails, brand }: Props) {
  return (
    <div>
      <div className={style.mainBox}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            flexDirection: { xs: "column", md: "row" },
          }}
        >
          <Box sx={{ width: { xs: "100%", md: "40%" } }}>
            <Box
              className={style.title}
              fontStyle={brand === BRAND.SO ? "italic" : "normal"}
              dangerouslySetInnerHTML={{
                __html: storeDetails.ReviewSection.Heading,
              }}
            ></Box>
          </Box>
          <Box sx={{ width: { xs: "100%", md: "60%" } }}>
            {storeDetails.ReviewSection.Reviews.length ? (
              <SingleImageSlider reviews={storeDetails.ReviewSection.Reviews} brand={brand}/>
            ) : null}
          </Box>
        </Box>
      </div>
    </div>
  );
}

export default OurCustomerVoice;
