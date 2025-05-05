import React from "react";

import { Box } from "@mui/material";

import AddressWithMap from "./addresswithMap/AddressWithMap";
import AddressDescription from "./addressdescription/AddressDescription";
import FeaturedStyle from "./featuredstyle/FeaturedStyle";
import BookEyeExamContent from "./bookeyeexamcontent/BookEyeExamContent";
import StoreOffer from "./storeoffer/StoreOffer";
import TwoPairs from "./twopairs/TwoPairs";
import AcceptInsurancePlan from "./acceptinsuranceplan/AcceptInsurancePlan";
import Faq from "./faq/Faq";
import OurCustomerVoice from "./ourcustomervoice/OurCustomerVoice";

import style from "./Store.module.scss";

import { StoreIdDTO } from "@/types/store.type";

function StoreDetails({ pid }: StoreIdDTO) {
  const storeId = pid;
  return (
    <div className="iris_pageBackGroundWrapper">
      <Box className={style.mainBox}>
        <div>
          <AddressWithMap pid={storeId} />
        </div>
        <div>
          <AddressDescription />
        </div>
        <div>
          <FeaturedStyle />
        </div>
        <div>
          <BookEyeExamContent />
        </div>
        <div>
          <StoreOffer />
        </div>
        <div>
          <TwoPairs />
        </div>
        <div>
          <AcceptInsurancePlan />
        </div>
        <div>
          <Faq />
        </div>
        <div>
          <OurCustomerVoice />
        </div>
      </Box>
    </div>
  );
}

export default StoreDetails;
