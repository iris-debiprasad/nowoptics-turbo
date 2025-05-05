import {
  Grid,
} from "@mui/material";

import styles from "./../prescriptionFAQ.module.scss";
import FAQItem from "../prescription-faq-item/FAQItem";

const FAQSection = ({ faqs }: any) => {
  const halfIndex = Math.ceil(faqs.length / 2);
  const firstHalf = faqs.slice(0, halfIndex);
  const secondHalf = faqs.slice(halfIndex);

  return (
    <Grid container spacing={2} className={styles.FAQSection}>
      <Grid item xs={12} md={6}>
        {firstHalf.map((faq: { KEY: string; Q: string; A: string }) => (
          <FAQItem key={faq.KEY} question={faq.Q} answer={faq.A} />
        ))}
      </Grid>
      <Grid item xs={12} md={6}>
        {secondHalf.map((faq: { KEY: string; Q: string; A: string }) => (
          <FAQItem key={faq.KEY} question={faq.Q} answer={faq.A} />
        ))}
      </Grid>
    </Grid>
  );
};

export default FAQSection;
