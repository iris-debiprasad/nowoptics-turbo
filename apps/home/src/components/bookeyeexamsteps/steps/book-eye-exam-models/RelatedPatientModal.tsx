import {
  Box,
  Button,
  Modal,
  IconButton,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableBody,
  TableCell,
} from "@mui/material";
import React, { FunctionComponent, useState } from "react";
import style from "../Steps.module.scss";
import i18n from "@root/host/src/language/i18n";
import dynamic from "next/dynamic";
import { IconDTO } from "@root/host/src/types/IconSVG.types";
import { RelatedPatient, RelatedPatientModalProp } from "@/types/bookEyeExamSteps.types";
import { phoneFormatRegex } from "@root/host/src/constants/common.constants";
const IconSVG = dynamic(() => import("Host/IconSVG"), {
  ssr: false,
}) as FunctionComponent<IconDTO>;


function RelatedPatientModal(props: RelatedPatientModalProp) {
  const [relatedPatient, setRelatedPatient] = useState<RelatedPatient | null>(
    null
  );
  return (
    <Modal
      open={props.showRelatedPatientModel}
      onClose={() => props.setShowDuplicatePhoneAlert(false)}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box className={style.modalWrapper}>
        <Box className={style.crossBtn}>
          <IconButton onClick={() => props.handleClose(false)}>
            <IconSVG
              width="10"
              height="10"
              viewBox="0 0 16 16"
              fill="var(--primary-text-color)"
              name="modal_cross"
            />
          </IconButton>
        </Box>
        <Box className={style.modalInner}>
          <Box className={style.bookEyeExamModalTitle}>
            Please select the patient you
          </Box>
          <Box className={style.bookEyeExamModalTitle}>
            are related to below.
          </Box>
          <Box mt={2} className={style.relationshipTableContainer}>
            <div className="iris_table">
              <TableContainer sx={{ overflow: "auto" }}>
                <Table sx={{ minWidth: 500 }}>
                  <TableHead>
                    <TableRow>
                      <TableCell
                        className={`tableHeadContent ${style.relationShipTableHead}`}
                      >
                        <span className="tableHeadText"> First Name</span>
                      </TableCell>
                      <TableCell
                        className={`tableHeadContent ${style.relationShipTableHead}`}
                      >
                        <span className="tableHeadText"> Mobile Number</span>
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {props.relatedPatient.map((data, i) => (
                      <TableRow
                        key={i}
                        onClick={() => {
                          setRelatedPatient(data);
                        }}
                        className={
                          data.Id === relatedPatient?.Id
                            ? style.selectedRow
                            : style.relationshipTableRow
                        }
                      >
                        <TableCell key={i} className="tableRowContent">
                          {data.FirstName}
                        </TableCell>
                        <TableCell key={i} className="tableRowContent">
                          {data.PhoneNumber?.PhoneNumber?.replace(phoneFormatRegex, "($1) $2-$3")}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </div>
          </Box>
          <Box mt={3} className={style.relatedPatientModalActionWrapper}>
            <Button
              className={style.backButton}
              onClick={props.handleNoRelation}
            >
              No Relation
            </Button>
            <Button
              className={style.continueButton}
              onClick={() => {
                if (relatedPatient) {
                  props.setSelectedRelatedPatient(relatedPatient);
                }
              }}
            >
              {i18n.t("BOOK_EYE_EXAM.CONTINUE")}
            </Button>
          </Box>
        </Box>
      </Box>
    </Modal>
  );
}

export default RelatedPatientModal;
