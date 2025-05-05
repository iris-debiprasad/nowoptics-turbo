import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Grid,
  IconButton,
  Typography,
} from "@mui/material";
import useResponsive from "@/hooks/useResponsive";
import styles from "./../prescriptionFAQ.module.scss";
import IconSVG from "@/components/iconsvg/IconSVG";
import { useState } from "react";

const FAQItem = ({
  question,
  answer,
}: {
  question: string;
  answer: string;
}) => {
  const hasReached = useResponsive();
  const [expanded, setExpanded] = useState(false);

  return (
    <Grid item xs={12} className={styles.itemContainer}>
      {!hasReached.md ? (
        <Accordion
          elevation={0}
          disableGutters
          className={styles.accordianContainer}
        >
          <AccordionSummary
            onClick={() => setExpanded(!expanded)}
            expandIcon={
              !expanded ? (
                <IconButton aria-label="expand-icon-button">
                  <IconSVG
                    width="10"
                    height="10"
                    viewBox="0 0 20 20"
                    fill="#687689"
                    name="plus_icon"
                  />
                </IconButton>
              ) : (
                <IconButton aria-label="collapse-icon-button">
                  <IconSVG
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="#687689"
                    name="minus_icon"
                  />
                </IconButton>
              )
            }
            aria-controls="panel1a-content"
            id="panel1a-header"
            className={styles.summary}
            sx={{ alignItems: "baseline" }}
          >
            <Typography variant="h6" className={styles.questionText}>
              {question}
            </Typography>
          </AccordionSummary>
          <AccordionDetails
            className={styles.details}
            sx={{ alignItems: "baseline" }}
          >
            <Typography className={styles.answerText}>{answer}</Typography>
          </AccordionDetails>
        </Accordion>
      ) : (
        <Box>
          <Typography
            variant="h6"
            className={styles.questionText}
            sx={{ paddingBottom: "15px" }}
          >
            {question}
          </Typography>
          <Typography
            className={styles.answerText}
            dangerouslySetInnerHTML={{ __html: answer }}
          >
          </Typography>
        </Box>
      )}
    </Grid>
  );
};


export default FAQItem;