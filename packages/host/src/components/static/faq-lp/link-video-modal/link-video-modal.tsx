import React from "react";
import Link from "next/link";
import { Modal } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

import { VideoPlayer, IProps as VideoPlayerProps } from "../../../video-player";
import styles from "./link-video-modal.module.scss";

interface VideoItem extends VideoPlayerProps {
  title: string;
}

interface Props {
  /** Link text or element, for the modal trigger */
  children: string;
  /** Video elements that will be displayed one on top of another vertically */
  videos: VideoItem[];
}

/**
 * Component that uses a link item as trigger for displaying a modal that contains multiple videos,
 * each video is separated by video title (defined in VideoItem interface).
 */
export const LinkVideoModal = ({ children, videos }: Props): JSX.Element => {
  const [isModalOpen, setIsModalOpen] = React.useState<boolean>(false);

  const openModal = (
    event: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
  ): void => {
    event.preventDefault();
    setIsModalOpen(true);
  };

  const closeModal = (): void => setIsModalOpen(false);

  // === Render

  const VideoItems: JSX.Element[] = videos.map((video, index) => (
    <div className={styles.item} key={video.title}>
      <header className={styles.item__header}>
        <p>{video.title}</p>

        {index === 0 ? (
          <button
            className={styles["close-modal"]}
            onClick={closeModal}
            type="button"
          >
            <CloseIcon />
          </button>
        ) : (
          <></>
        )}
      </header>

      <VideoPlayer sources={video.sources} thumbnail={video.thumbnail} />
    </div>
  ));

  return (
    <>
      <Link href="#" onClick={openModal}>
        {children}
      </Link>

      <Modal open={isModalOpen} onClose={closeModal}>
        <div className={styles["modal-container"]}>
          <section className={styles["video-list"]}>{VideoItems}</section>
        </div>
      </Modal>
    </>
  );
};

LinkVideoModal.displayName = "LinkVideoModal";
