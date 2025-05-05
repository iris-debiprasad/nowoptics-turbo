import React, { useEffect, useState } from "react";
import { Box } from "@mui/material";
import style from "./BeginVisionOnlineTest.module.scss";
import BeginStepsForTest from "./BeginStepsForTest";
import Inconvenience from "../inconvenience";
import { useRouter } from "next/router";
const BeginVisionOnlineTest = (props: {
  contactid: string;
  rxmode: string;
  rxtype: string;
  spectacleid: string;
}) => {
  const [errorBeginTest, setErrorBeginTest] = useState<boolean>(false);
  const router = useRouter();
  useEffect(() => {
    if (router.query?.path === "incomplete") {
      setErrorBeginTest(true);
    }
  }, [router.query]);
  return (
    <Box className={style.beginVisionTestWrapper}>
      {!errorBeginTest && (
        <>
          <h2 className={style.beginVisionTestHeader}>
            Begin Online Vision Test
          </h2>
          <BeginStepsForTest
            setErrorBeginTest={setErrorBeginTest}
            contactid={props.contactid}
            rxmode={props.rxmode}
            rxtype={props.rxtype}
            spectacleid={props.spectacleid}
          />
        </>
      )}
      {errorBeginTest && <Inconvenience />}
    </Box>
  );
};

export default BeginVisionOnlineTest;
