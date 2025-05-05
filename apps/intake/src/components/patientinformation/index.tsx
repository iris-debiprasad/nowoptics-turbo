import { useGetLanguageTypesQuery } from "@root/host/src/store/reducer/intakeApi.slice";
import { SelectOptions } from "@root/host/src/types/intakeInput.types";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import ArrowDownIcon from "@root/assets/Images/icons/arrow-down.svg";
import Image from "next/image";
import { memo, useState } from "react";
import DateInput from "../common/dateinput";
import Input from "../common/input";
import Radio from "../common/radio";
import Select from "../common/select";
import styles from "./PatientInformation.module.scss";

const PatientInformation = () => {
  const [expanded, setExpanded] = useState(false);
  const { data: languageOptions } = useGetLanguageTypesQuery(
    {},
    {
      selectFromResult: ({ data, error, isLoading }) => ({
        data: data?.Result?.map(
          (item) =>
            ({ label: item.Description, value: item.Id } as SelectOptions)
        ),
        error,
        isLoading,
      }),
    }
  );

  return (
    <Accordion
      classes={{ root: styles.accordionRoot }}
      expanded={expanded}
      onChange={(_, expanded) => setExpanded(expanded)}
    >
      <AccordionSummary
        classes={{ content: styles.accordionSummary, root: styles.summaryRoot }}
        expandIcon={
          <Image
            height={14}
            width={14}
            src={ArrowDownIcon}
            alt="arrow-down-icon"
          />
        }
      >
        <div>
          <span aria-label="step-label">Step 1</span>
          <input
            aria-label="step-title-input"
            value={"Patient Information"}
            disabled
          />
        </div>
      </AccordionSummary>
      <AccordionDetails className={styles.informationContainer}>
        <h2 className={styles.formHeader}>Patient Information</h2>
        <div className={styles.formInputs}>
          <div>
            <Input placeholder="First Name" disabled fullWidth />
            <Input placeholder="Last Name" disabled fullWidth />
            <Input placeholder="Phone Number" disabled fullWidth />
            <Input placeholder="Email" disabled fullWidth />
            <div className={styles.dobInput}>
              <span>Date of Birth</span>
              <DateInput disabled fullWidth />
            </div>

            <Input placeholder="Age" disabled fullWidth />
            <div className={styles.genderInput}>
              <span>Gender</span>
              <div className={styles.genderRadioBtns}>
                <div>
                  <Radio checked={true} />
                  <span>Male</span>
                </div>
                <div>
                  <Radio checked={false} />
                  <span>Female</span>
                </div>
              </div>
            </div>
            <Select
              options={languageOptions || []}
              value={languageOptions?.[0]?.value}
              disabled
              fullWidth
            />
          </div>
          <div>
            <Input placeholder="Address Line 1" disabled fullWidth />
            <Input placeholder="Address Line 2" disabled fullWidth />
            <Input placeholder="Zipcode" disabled fullWidth />
            <Input
              placeholder="City"
              disabled
              fullWidth
              className={styles.greyInput}
            />

            <Input
              placeholder="State"
              disabled
              fullWidth
              className={styles.greyInput}
            />

            <Input
              placeholder="County"
              disabled
              fullWidth
              className={styles.greyInput}
            />

            <Input
              placeholder="Country"
              disabled
              fullWidth
              className={styles.greyInput}
            />
          </div>
        </div>
      </AccordionDetails>
    </Accordion>
  );
};

export default memo(PatientInformation);
