import { PRESCRIPTION_RX_RENEWAL_FAQ } from "@/constants/prescriptionRxRenewal.constants";
import styles from "./prescriptionFAQ.module.scss";
import { Typography } from "@mui/material";
import FAQSection from "./prescription-faq-section/FAQSection";


const PrescriptionRenewalFAQ = () => (
  <div
    className={styles.prescriptionFAQContainer}
  >
    <Typography
      variant="h4"
      className={styles.prescriptionFAQContainerHeader}
    >
      FAQs
    </Typography>
    <FAQSection faqs={PRESCRIPTION_RX_RENEWAL_FAQ} />
  </div>
);

export default PrescriptionRenewalFAQ;
