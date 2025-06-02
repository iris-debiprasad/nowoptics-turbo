import IconSVG from "@/components/iconsvg/IconSVG";
import { Box, Button, IconButton, Modal } from "@mui/material";
import { SubmitHandler, useForm } from "react-hook-form";
import { RelationshipSelect } from "../relationship-select";
import { PatientRelationShipType } from "@root/home/src/types/bookEyeExamSteps.types";
import style from "./index.module.scss";
import { useTranslation } from "react-i18next";

interface Props {
  open: boolean;
  onClose: () => void;
  onSubmit: (relationshipType: string) => void;
  relationships: PatientRelationShipType[] | null;
}

export function SelectRelationshipModal({
  relationships,
  onSubmit: handleSubmit, 
  ...rest
}: Readonly<Props>): React.JSX.Element {
  const { t } = useTranslation();
  const form = useForm<{ relationshipType: string }>();

  const onSubmit: SubmitHandler<{relationshipType: string}> = (data) => {
    handleSubmit(data.relationshipType);
  } 

  return (
    <Modal
      {...rest}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box className={style.modalWrapper}>
        <Box className={style.crossBtn}>
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
        <form className={style.modalInner} onSubmit={form.handleSubmit(onSubmit)}>
          <p className={style.formLabel}>{t("STANTON_ACCESS.FORM.SELECT_RELATIONSHIP_MODAL.TITLE")}</p>
          <Box className={style.selectRelationshipInput}>
            <RelationshipSelect
              {...{ relationships }}
              controllerProps={{
                control: form.control,
                name: "relationshipType",
                defaultValue: "",
              }}
            />
          </Box>
          <Box mt={3} className={style.selectRelationshipActionWrapper}>
            <Button className={style.continueButton} type="submit">
              {t("STANTON_ACCESS.FORM.SELECT_RELATIONSHIP_MODAL.SUBMIT_CTA")}
            </Button>
          </Box>
        </form>
      </Box>
    </Modal>
  );
}
