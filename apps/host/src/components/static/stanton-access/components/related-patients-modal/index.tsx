import { useTranslation } from "react-i18next";
import IconSVG from "@/components/iconsvg/IconSVG";
import {
  Box,
  IconButton,
  Modal,
  Button,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TableContainer,
} from "@mui/material";
import styles from "./index.module.scss";
import { APIRelatedPatient } from "@root/host/src/types/stantonAccess.types";
import React from "react";
import { formatPhoneNumber } from "@root/host/src/utils/common.utils";

interface Props {
  open: boolean;
  onClose: () => void;
  onContinue: () => void;
  relatedPatients: APIRelatedPatient[];
  setSelectedRelatedPatientIndex: React.Dispatch<
    React.SetStateAction<number | null>
  >;
  selectedRelatedPatientIndex: number | null;
}

export function RelatedPatientsModal({
  onContinue,
  relatedPatients,
  selectedRelatedPatientIndex,
  setSelectedRelatedPatientIndex,
  ...rest
}: Readonly<Props>): JSX.Element {
  const { t } = useTranslation();

  return (
    <Modal
      {...rest}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box className={styles.modalWrapper}>
        <Box className={styles.crossBtn}>
          <IconButton onClick={rest.onClose}>
            <IconSVG
              width="10"
              height="10"
              viewBox="0 0 16 16"
              fill="var(--primary-text-color)"
              name="modal_cross"
            />
          </IconButton>
        </Box>
        <Box className={styles.modalInner}>
          <Box className={styles.bookEyeExamModalTitle}>
            {t("STANTON_ACCESS.FORM.RELATED_PATIENTS_MODAL.TITLE.P1")}
          </Box>
          <Box className={styles.bookEyeExamModalTitle}>
            {t("STANTON_ACCESS.FORM.RELATED_PATIENTS_MODAL.TITLE.P2")}
          </Box>
          <Box mt={2} className={styles.relationshipTableContainer}>
            <div className="iris_table">
              <TableContainer sx={{ overflow: "auto" }}>
                <Table sx={{ minWidth: 500 }}>
                  <TableHead>
                    <TableRow>
                      <TableCell
                        className={`tableHeadContent ${styles.relationShipTableHead}`}
                      >
                        <span className="tableHeadText">
                          {t(
                            "STANTON_ACCESS.FORM.RELATED_PATIENTS_MODAL.FIRST_NAME",
                          )}
                        </span>
                      </TableCell>
                      <TableCell
                        className={`tableHeadContent ${styles.relationShipTableHead}`}
                      >
                        <span className="tableHeadText">
                          {t(
                            "STANTON_ACCESS.FORM.RELATED_PATIENTS_MODAL.MOBILE_NUMBER",
                          )}
                        </span>
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {relatedPatients.map((data, i) => (
                      <TableRow
                        key={data.Id}
                        onClick={() => setSelectedRelatedPatientIndex(i)}
                        className={
                          i === selectedRelatedPatientIndex
                            ? styles.selectedRow
                            : styles.relationshipTableRow
                        }
                      >
                        <TableCell className="tableRowContent">
                          {data.FirstName}
                        </TableCell>
                        <TableCell className="tableRowContent">
                          {formatPhoneNumber(
                            data.PhoneNumber.PhoneNumber,
                            true,
                          )}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </div>
          </Box>
          <Box mt={3} className={styles.relatedPatientModalActionWrapper}>
            <Button
              className={styles.continueButton}
              disabled={selectedRelatedPatientIndex === null}
              onClick={() => selectedRelatedPatientIndex !== null && onContinue()}
            >
              {t("STANTON_ACCESS.FORM.RELATED_PATIENTS_MODAL.CONTINUE_CTA")}
            </Button>
          </Box>
        </Box>
      </Box>
    </Modal>
  );
}
