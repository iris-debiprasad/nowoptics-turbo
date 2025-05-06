import React, { FunctionComponent, useEffect, useState } from "react";
import {
  Box,
  Modal,
  IconButton,
  AlertColor,
  FormControl,
  Select,
  MenuItem,
  Button,
} from "@mui/material";
import style from "../Steps.module.scss";
import { GetAllRelationshipsTypes } from "@root/host/src/service/common.service";
import { useSnackBar } from "@root/home/src/contexts/Snackbar/SnackbarContext";
import { ERROR_MESSAGE } from "@root/host/src/constants/auth.constants";
import { SNACKBAR_COLOR_TYPE } from "@root/host/src/constants/common.constants";
import dynamic from "next/dynamic";
import { IconDTO } from "@root/host/src/types/IconSVG.types";
import { PatientRelationShipType, SelectRelationshipModalProp } from "@/types/bookEyeExamSteps.types";

// const IconSVG = dynamic(() => import("Host/IconSVG"), {
//   ssr: false,
// }) as FunctionComponent<IconDTO>;

function SelectRelationshipModal(props: SelectRelationshipModalProp) {
  const { showSnackBar } = useSnackBar();
  const [relationTypesOptions, setRelationTypesOptions] = useState<
  PatientRelationShipType[]
  >([]);
  const [relationTypeValue, setRelationTypeValue] = useState<string>('');
  const [isReverseRelationShip, setIsReverseRelationShip] = useState<boolean>(false);
  const [relationTypeOthersValue, setRelationTypeOthersValue] = useState(3);
  const getAllRelationshipsForPatient = async () => {
    await GetAllRelationshipsTypes()
      .then((res) => {
        setRelationTypesOptions(res?.data?.Result);
      })
      .catch((err) => {
        showSnackBar(
          err.response
            ? err.response.data.Error.Message
            : ERROR_MESSAGE.API_DEFAULT_ERROR_MESSAGE,
          SNACKBAR_COLOR_TYPE.ERROR as AlertColor
        );
      });
  };

  useEffect(() => {
    getAllRelationshipsForPatient();
  }, []);

  useEffect(() => {
    if (relationTypesOptions.length > 0) {
      const othersRelation = relationTypesOptions.find(
        (data) => data.Description.toLowerCase().trim() === "others"
      );
      if (othersRelation) {
        setRelationTypeOthersValue(othersRelation.Id);
      }
    }
  }, [relationTypesOptions]);
  return (
    <Modal
      open={props.showSelectRelationshipType}
      onClose={() => props.setShowRelationshipType(false)}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box className={style.modalWrapper}>
        <Box className={style.crossBtn}>
          <IconButton onClick={props.handleClose}>
            {/* <IconSVG
              width="10"
              height="10"
              viewBox="0 0 16 16"
              fill="var(--primary-text-color)"
              name="modal_cross"
            /> */}
          </IconButton>
        </Box>
        <Box className={style.modalInner}>
          <Box className={style.selectRelationshipInput}>
            <FormControl fullWidth>
              <p className={style.formLabel}>Select Relationship Type</p>
              <br />
              <Select
                id="relationshipType"
                name="relationshipType"
                displayEmpty
                value={relationTypeValue}
                className={style.selectInput}
                onChange={(event: any) => {
                  const value = event.target.value;
                  const relationShip = relationTypesOptions.find(
                    (data) => data.Code.toString() === value?.toString()?.split('-')[0]
                  );
                  if (relationShip) {
                    setRelationTypeValue(`${relationShip.Code}-${relationShip.Id}`);
                    setIsReverseRelationShip(relationShip.IsReverseRelationship)
                  }
                }}
                renderValue={(value) => {
                  const option: any = relationTypesOptions.find(
                    ({ Code }) => Code === relationTypeValue.split('-')[0]
                  );
                  return value
                    ? option?.Description
                    : "Select Relationship Type";
                }}
              >
                {relationTypesOptions.map((item: PatientRelationShipType, index) => {
                  return (
                    <MenuItem key={index} value={`${item.Code}-${item.Id}`}>
                      {item.Description}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
          </Box>
          <Box mt={3} className={style.selectRelationshipActionWrapper}>
            <Button
              disabled={!relationTypeValue}
              className={style.continueButton}
              onClick={() => {
                if (relationTypeValue) {
                  props.handleSubmit(
                    Number(relationTypeValue.split('-')[1]),
                    relationTypeOthersValue,
                    isReverseRelationShip
                  );
                }
              }}
            >
              SUBMIT
            </Button>
          </Box>
        </Box>
      </Box>
    </Modal>
  );
}

export default SelectRelationshipModal;
