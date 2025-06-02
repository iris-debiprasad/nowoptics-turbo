export interface UploadFileDTO {
  maxFileSize: string;
  acceptFiles: string;
  dragNDropText: string;
  handleFile: (file: File) => void;
  unSelectFile?: boolean;
  isFileUploaded?: boolean;
  errorProp?: string;
}
