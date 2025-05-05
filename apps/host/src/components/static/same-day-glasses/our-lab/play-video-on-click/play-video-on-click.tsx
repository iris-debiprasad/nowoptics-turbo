import React from "react";
import Image from "next/image";

import { Button } from "@mui/material";
import IconSVG from "@/components/iconsvg/IconSVG";

import { ModalVideo } from "./modal-video";
import styles from "./play-video-on-click.module.scss";
import { useTranslation } from "react-i18next";
import { ImageUrlConstants } from "@/constants/image.url.constants";

const PLAY_IMAGES = ImageUrlConstants.PLAY_VIDEO;

/**
 * Renders a video component that will be played after clicking on a button,
 * Once the button has been clicked, displays the video inside a modal.
 */
export const PlayVideoOnClick = (): JSX.Element => {
  const { t } = useTranslation();

  const [isPlayerModalDisplayed, setIsPlayerModalDisplayed] =
    React.useState<boolean>(false);

  const openPlayer = (): void => setIsPlayerModalDisplayed(true);
  const closePlayer = (): void => setIsPlayerModalDisplayed(false);
  const BASE_IMAGE_URL = process.env.NEXT_PUBLIC_IMAGE_BASE_URL;

  return (
    <>
      <section className={styles.thumbnail}>
        <Image
          alt={t("SAME_DAY_GLASSES.OUR_LAB_VIDEO_ALT")}
          className="img"
          width={599}
          height={262}
          layout="responsive"
          src={PLAY_IMAGES.THUMBNAIL1}
        />

        <div className={styles["thumbnail__play-wrapper"]}>
          <Button
            className={styles["thumbnail__play-button"]}
            endIcon={
              <IconSVG
                width="17"
                height="18"
                viewBox="0 0 17 18"
                fill="none"
                fillP="#010101"
                name="arrow_solid_right"
              />
            }
            onClick={openPlayer}
          >
            Watch Video
          </Button>
        </div>
      </section>

      {isPlayerModalDisplayed && (
        <ModalVideo
          close={closePlayer}
          isVisible={isPlayerModalDisplayed}
          sources={[
            {
              src:
                BASE_IMAGE_URL +
                "m/4f18b3993888083b/original/Same_Day_Glasses_Desktop.mp4",
              format: "mp4",
            },
          ]}
          thumbnail={PLAY_IMAGES.THUMBNAIL2}
        />
      )}
    </>
  );
};
