import React, { Dispatch, SetStateAction } from "react";
import styles from "./SelectExam.module.scss";
import { SelectExamPropsTypes, examType } from "@root/host/src/types/eyeExamFlow.types";
import {
  Box,
  Button,
  Checkbox,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import IconSVG from "@/components/iconsvg/IconSVG";
import PrimaryModal from "@/components/primary_modal/PrimaryModal";
import { eyeExamsListHeader } from "@root/host/src/constants/eyeExamFlow.constants";
import useAxiosLoader from "@/hooks/useAxiosLoader";
import BackdropLoader from "@/components/backdrop_loader/BackdropLoader";

const ModalContent = ({
  handleOpen,
  data,
  setSelectedExams,
  selectedExams,
  handleAddToCart,
}: {
  handleOpen: () => void;
  data: examType[] | null;
  setSelectedExams: Dispatch<SetStateAction<number[]>>;
  selectedExams: number[];
  handleAddToCart: () => void;
}) => {
  const loading = useAxiosLoader();
  const handleCheck = (variantId: number) => {
    if (selectedExams.includes(variantId)) {
      setSelectedExams(selectedExams.filter((exam) => exam !== variantId));
    } else {
      setSelectedExams([...selectedExams, variantId]);
    }
  };

  return (
    <Box className={styles.selectExamContainer}>
      <BackdropLoader openLoader={loading} />
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
        data-testid="select-exam-container"
      >
        <Typography
          id="modal-modal-title"
          variant="h6"
          component="h6"
          data-testid="select-exam-heading"
          className={styles.heading}
        >
          Select Exam Type
        </Typography>
        <Box
          className={styles.crossBtn}
          onClick={handleOpen}
          data-testid="select-exam-toggle"
        >
          <IconSVG
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="var(--primary-text-color)"
            name="modal_cross"
          />
        </Box>
      </Box>
      <hr className={styles.hr} />
      <Box className={styles.innerContainer}>
        <div className={`iris_table ${styles.selectExamTablewrapper}`}>
          <TableContainer sx={{ overflow: "auto" }}>
            <Table aria-label="">
              <TableHead>
                <TableRow>
                  {eyeExamsListHeader.map((header, index) => (
                    <TableCell key={index} className="tableHeadContent">
                      <div className="textIconWrapper">
                        <span className="tableHeadText">{header.name}</span>
                      </div>
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {data?.map((exam: examType, index: number) => {
                  return (
                    <TableRow key={index}>
                      <TableCell
                        className={`tableRowContent ${styles.firstBlockStyle}`}
                      >
                        <div className={styles.examCodeWrapper}>
                          <Checkbox
                            color="primary"
                            checked={selectedExams.includes(exam.MasterProductId)}
                            onChange={() => handleCheck(exam.MasterProductId)}
                          />{" "}
                        </div>
                      </TableCell>
                      <TableCell className="tableRowContent">
                        {exam.Description}
                      </TableCell>
                      <TableCell className="tableRowContent">
                        ${exam.RetailPrice}
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      </Box>
      <Button
        className={`${styles.continueButton} ${
          selectedExams.length > 0 ? "" : styles.continueButtonDisabled
        } rightAlignedActionBtn`}
        onClick={handleAddToCart}
        disabled={selectedExams.length > 0 ? false : true}
      >
        ADD TO CART
      </Button>
    </Box>
  );
};

const SelectExam = ({
  isVisible,
  toggle,
  data,
  setSelectedExams,
  selectedExams,
  handleAddToCart,
}: SelectExamPropsTypes) => {
  return (
    <PrimaryModal
      cstmStyle={"patientSelectExamModal"}
      modalOpen={isVisible}
      setModalOpen={toggle}
      modalInner={
        <ModalContent
          handleOpen={toggle}
          data={data}
          setSelectedExams={setSelectedExams}
          selectedExams={selectedExams}
          handleAddToCart={handleAddToCart}
        />
      }
    />
  );
};

export default SelectExam;
