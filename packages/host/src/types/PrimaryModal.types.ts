export interface PrimaryModalDTO {
  modalOpen: boolean;
  setModalOpen?: React.Dispatch<React.SetStateAction<boolean>>;
  setModalOpenWIthId?: React.Dispatch<
    React.SetStateAction<{ id: null | string }>
  >;
  modalInner?: React.ReactNode | React.ReactNode[];
  cstmStyle?: string;
  preventBackdropClick?: boolean;
}
