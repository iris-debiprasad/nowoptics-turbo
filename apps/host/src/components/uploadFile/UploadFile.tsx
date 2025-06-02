import { useEffect, useState } from "react";
import { Button } from "@mui/material";
import style from "./UploadFile.module.scss";
import Image from "next/image";
import uploadIcon from "../../../../assets/Images/icons/uploadIcon.svg";
import rightArrow from "../../../../assets/Images/icons/rightArrow.svg";
import { UploadFileDTO } from "@root/host/src/types/UploadFile.types";

const UploadFile = ({
  maxFileSize,
  acceptFiles,
  dragNDropText,
  handleFile,
  unSelectFile,
  isFileUploaded,
  errorProp
}: UploadFileDTO) => {
  const [isDragging, setIsDragging] = useState(false);
  const [selecetedFile, setSelectedFile] = useState<File | null>(null);
  const [isFileUploadedState, setIsFileUploadedState] = useState<
    boolean | undefined
  >(false);
  function handleUploadClick(
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) {
    const fileInputUpload = document.getElementById(
      "fileInputUpload"
    ) as HTMLInputElement;
    fileInputUpload.click();
  }
  useEffect(() => {
    setIsFileUploadedState(isFileUploaded);
  }, [isFileUploaded]);
  function handleDragEnter(e: React.DragEvent<HTMLDivElement>) {
    e.preventDefault();
    setIsDragging(true);
  }

  function handleDragLeave(e: React.DragEvent<HTMLDivElement>) {
    e.preventDefault();
    setIsDragging(false);
  }

  function handleDrop(e: React.DragEvent<HTMLDivElement>) {
    e.preventDefault();
    setIsDragging(false);

    const { files } = e.dataTransfer;

    if (files && files.length > 0) {
      handleFile(files[0]);
      setSelectedFile(files[0]);
    }
  }

  function handleInputFileChange(
    event: React.ChangeEvent<HTMLInputElement>
  ): void {
    const { files } = event.target;
    if (files && files?.length > 0) {
      handleFile(files[0]);
      setSelectedFile(files[0]);
    }
    event.target.value = "";
  }

  return (
    <div
      className={`${style.uploadContainer} ${isDragging ? style.dragging : ""}`}
      onDragEnter={handleDragEnter}
      onDragLeave={handleDragLeave}
      onDragOver={(e) => e.preventDefault()}
      onDrop={handleDrop}
    >
      <Image src={uploadIcon} alt="upload-icon" width={24} height={24} />
      <input
        type="file"
        id="fileInputUpload"
        style={{ display: "none" }}
        onChange={handleInputFileChange}
        accept={acceptFiles}
      />
      <Button
        variant="contained"
        className={style.btnColor}
        endIcon={
          <Image src={rightArrow} alt="right arrow" width={9} height={15} />
        }
        onClick={handleUploadClick}
      >
        Upload
      </Button>
      {isFileUploadedState && (
        <span className={style.descriptionOne}>
          {!unSelectFile && selecetedFile?.name}
        </span>
      )}
      <span className={style.descriptionOne}>
        {isDragging ? "Release to upload" : `Or drag and drop ${dragNDropText}`}
      </span>
      <span className={style.descriptionTwo}>
        Supports file formats {acceptFiles}
      </span>

      <span className={style.descriptionTwo}>Max file size: {maxFileSize}</span>
      <span className={style.errorHelperText}>{errorProp != "" && errorProp}</span>
    </div>
  );
};

export default UploadFile;
