export interface NonBusinessHrsModalProps {
  open: boolean;
  handleClose: () => void;
  content: string;
  timingConfig: {
    Day: string;
    StartTime: string;
    EndTime: string;
    Closed: boolean;
  }[];
  messages: any;
}

export interface NonBusinessHrsDTO{
  timingConfig: {
    Day: string;
    StartTime: string;
    EndTime: string;
    Closed: boolean;
  }[];
  messages: any;
}
