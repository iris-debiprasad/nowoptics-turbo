import React, { FunctionComponent, useEffect, useState } from "react";
import { Button } from "@mui/material";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import Image from "next/image";
import PersonImage from "@root/assets/Images/icons/guided-person.svg";
import { USER_TYPE } from "@root/host/src/constants/common.constants";
import style from "./GuidedSales.module.scss";
import BackdropLoader from "../backdrop_loader/BackdropLoader";
import { useAppDispatch } from "@/store/useStore";
import { UPDATE_GUIDED_SALE_STEP } from "@/store/reducer/GuidedSaleReducer";

const GuidedAgent = dynamic(() => import("guidedSales/guidedSalesContainer"), {
  ssr: false,
  loading: () => <BackdropLoader openLoader={true} />,
}) as FunctionComponent<{
  userType: string;
  currentStep: number;
  setCurrentStep: (data: number) => void;
  env: { [key: string]: string | undefined } | null;
}>;

const GuidedSales = React.memo(function GuidedSales({
  userType,
  env,
}: {
  userType: string;
  env: { [key: string]: string | undefined } | null;
}) {
  const router = useRouter();
  const { guidedSaleId } = router.query;
  const [currentStep, setCurrentStep] = useState(-1);
  const [showGuidedSales, setShowGuidedSales] = useState(false);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (guidedSaleId) {
      setShowGuidedSales(true);
    }
  }, [guidedSaleId]);

  return (
    <div>
      {showGuidedSales && (
        <GuidedAgent
          userType={userType}
          currentStep={currentStep}
          setCurrentStep={(step) => {
            setCurrentStep(step);
            dispatch(UPDATE_GUIDED_SALE_STEP(step));
          }}
          env={env}
        />
      )}
      <div className={style.GuidedSales_Button}>
        {currentStep <= 0 && userType !== USER_TYPE.ASSOCIATE && (
          <div className={style.startButtonContainer}>
            <Button
              className={style.startButton}
              onClick={() => {
                currentStep > -1 ? setCurrentStep(-1) : setCurrentStep(0);
                setShowGuidedSales(true);
                dispatch(
                  UPDATE_GUIDED_SALE_STEP(currentStep > -1 ? -1 : 0)
                );
              }}
              endIcon={
                <Image src={PersonImage} width={24} height={24} alt="" />
              }
            >
              Need help shopping?
            </Button>
          </div>
        )}
      </div>
    </div>
  );
});

export default GuidedSales;
