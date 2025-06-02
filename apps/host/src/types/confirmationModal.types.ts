export interface ConfirmationModalProps {
  open: boolean;
  handleClose: () => void;
  performAction: (Id: number) => void;
  content: string;
  Id: number;
  btnOneText: string;
  btnTwoText: string;
  reverseBtns?: boolean;
  isMergeGuestCartFlow?: boolean;
  performActionForMergeCart?: (IsMergeCartRequested: boolean) => Promise<void>;
  isRxGuestGridCartFlow?: boolean;
  performActionForRxGuestGridCart?: () => void;
}
