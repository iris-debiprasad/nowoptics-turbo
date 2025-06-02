import PrimaryModal from "@/components/primary_modal/PrimaryModal";
import {
  AppointmentType,
  AppointmentsListPropsTypes,
} from "@root/host/src/types/eyeExamFlow.types";
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
import React from "react";
import IconSVG from "../../iconsvg/IconSVG";
import style from "./AppointementsList.module.scss";
import { appointmentsListHeader } from "@root/host/src/constants/eyeExamFlow.constants";
import dayjs from "dayjs";
import { DATE_TIME_FORMAT } from "@root/host/src/constants/common.constants";

const AppointmentsList = ({
  isVisible,
  toggle,
  selectedAppointmentId,
  setSelectedAppointmentId,
  data,
  handleAppointementListContinueClick,
}: AppointmentsListPropsTypes) => {
  const ModalContent = ({
    handleOpen,
    content,
  }: {
    handleOpen: () => void;
    content: string;
  }) => {
    return (
      <Box className={style.appointmentListContainer}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
          data-testid="appointments-list-container"
        >
          <Typography
            id="modal-modal-title"
            variant="h6"
            component="h2"
            data-testid="appointment-list-heading"
            className={style.heading}
          >
            {content}
          </Typography>
          <Box className={style.crossBtn} onClick={handleOpen}>
            <IconSVG
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="var(--primary-text-color)"
              name="modal_cross"
            />
          </Box>
        </Box>
        <hr className={style.hr} />
        <Box className={style.innerContainer}>
          <div className="iris_table">
            <TableContainer className={style.appointmentsList}>
              <Table aria-label="">
                <TableHead>
                  <TableRow className={style.appointmentListRow}>
                    {appointmentsListHeader.map((header, index) => (
                      <TableCell key={index} className="tableHeadContent">
                        <div className="textIconWrapper">
                          <span className="tableHeadText">{header.name}</span>
                        </div>
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {data?.map((appointment: AppointmentType, index: number) => {
                    return (
                      <TableRow key={index}>
                        <TableCell className="tableRowContent" style={{ minWidth: '90px' }}>
                          <Checkbox
                            color="primary"
                            checked={
                              Number(selectedAppointmentId) === appointment.Id
                            }
                            onChange={() =>
                              setSelectedAppointmentId(
                                appointment.Id.toString()
                              )
                            }
                          />{" "}
                          {appointment.Id}
                        </TableCell>
                        <TableCell className="tableRowContent">
                          {dayjs(appointment.Start).format(DATE_TIME_FORMAT)}
                        </TableCell>
                        <TableCell className="tableRowContent">
                          {dayjs(appointment.End).format(DATE_TIME_FORMAT)}
                        </TableCell>
                        <TableCell className="tableRowContent">
                          {appointment.Type}
                        </TableCell>
                        <TableCell className="tableRowContent">
                          {appointment.Status}
                        </TableCell>
                        <TableCell className="tableRowContent">
                          {dayjs(appointment.CreatedOn).format(DATE_TIME_FORMAT)}
                        </TableCell>
                        <TableCell className="tableRowContent">
                          {appointment.Employee}
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </TableContainer>
          </div>
        </Box>
        <Box className={style.buttonWrapper}>
          <Button
            className={`${style.continueButton} ${
              selectedAppointmentId ? "" : style.continueButtonDisabled
            }`}
            disabled={!selectedAppointmentId}
            onClick={handleAppointementListContinueClick}
          >
            CONTINUE
          </Button>
        </Box>
      </Box>
    );
  };

  return (
    <PrimaryModal
      cstmStyle={"patientAvailableAppointmentModal"}
      modalOpen={isVisible}
      setModalOpen={toggle}
      modalInner={
        <ModalContent handleOpen={toggle} content={"Available Appointment"} />
      }
    />
  );
};

export default AppointmentsList;
