import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
} from "@mui/material";
import React, { FunctionComponent } from "react";

import styles from "./StoreList.module.scss";
import dynamic from "next/dynamic";
import { IconDTO } from "@root/host/src/types/IconSVG.types";
import { FaqQnA } from "@/constants/Constants";
import { BRAND } from "@root/host/src/constants/common.constants";

const IconSVG = dynamic(() => import("Host/IconSVG"), {
  ssr: false,
}) as FunctionComponent<IconDTO>;

export const FAQ = ({ brand }: { brand: string }): JSX.Element => {
  const [activeQuestion, setActiveQuestion] = React.useState<number | null>(
    null
  );

  const toggleQuestion = (question: number): void =>
    setActiveQuestion((prev) => (prev === question ? null : question));

  return (
    <section className={`${styles.faq}`}>
      {FaqQnA.map(({ answer, question }, index) => (
        <Box key={question}>
          <Accordion
            expanded={activeQuestion === index}
            onChange={() => toggleQuestion(index)}
            className={styles.item}
          >
            <AccordionSummary
              expandIcon={
                activeQuestion !== index ? (
                  <IconSVG
                    width="24"
                    height="24"
                    viewBox="0 -960 960 960"
                    fill={brand === BRAND.MEL ? "#E44892" : "#f98300"}
                    name="rounded_plus_icon"
                  />
                ) : (
                  <IconSVG
                    width="24"
                    height="24"
                    viewBox="0 -960 960 960"
                    fill={brand === BRAND.MEL ? "#E44892" : "#f98300"}
                    name="rounded_minus_icon"
                  />
                )
              }
            >
              <p
                className={styles.item__question}
                dangerouslySetInnerHTML={{ __html: question }}
              />
            </AccordionSummary>

            <AccordionDetails
              classes={{ root: styles["item__answer"] }}
              dangerouslySetInnerHTML={{ __html: answer }}
            />
          </Accordion>
        </Box>
      ))}
    </section>
  );
};

FAQ.DisplayName = "FAQ";
