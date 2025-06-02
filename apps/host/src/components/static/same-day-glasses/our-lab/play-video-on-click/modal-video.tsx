import React from "react";
import CloseIcon from "@mui/icons-material/Close";

import {
    IProps as IVideoPlayerProps,
    VideoPlayer,
} from "@/components/video-player";

import styles from "./play-video-on-click.module.scss";

interface IProps extends IVideoPlayerProps {
    close: () => void;
    isVisible: boolean;
}

const ESCAPE_KEY = "Escape";

export const ModalVideo = ({
    isVisible,
    close,
    ...rest
}: IProps): JSX.Element => {
    const [isVideoInFullScreen, setIsVideoInFullScreen] =
        React.useState<boolean>(false);

    // Add Escape keybinding to close modal
    React.useEffect(() => {
        const closeModalOnEscapeKey = (event: KeyboardEvent) =>
            event.key === ESCAPE_KEY && close();

        document.addEventListener("keydown", closeModalOnEscapeKey, false);
        return () =>
            document.removeEventListener("keydown", closeModalOnEscapeKey, false);
    }, []);

    // When fullscreen, video is cropped due to max height styling from this component
    // Will detect when fullscreen is activated and give full height to video
    React.useEffect(() => {
        // fullscreenElement will be null when fullscreen is not being used
        const handleFullscreenVideoStyling = (): void =>
            setIsVideoInFullScreen(Boolean(document.fullscreenElement));

        document.addEventListener("fullscreenchange", handleFullscreenVideoStyling);
        return () =>
            document.removeEventListener(
                "fullscreenchange",
                handleFullscreenVideoStyling,
            );
    }, []);

    // === React Render

    const playerClasses: string = `${styles.player} ${isVideoInFullScreen ? styles.fullscreen : ""
        }`;

    return (
        <section
            className={`${styles.modal} ${isVisible ? styles.open : ""}`}
            onClick={close}
        >
            <div
                className={styles.modal__wrapper}
                onClick={(event) => event.stopPropagation()}
            >
                <div className={playerClasses}>
                    <VideoPlayer {...rest} />

                    <button
                        aria-label="Close"
                        className={styles.player__close}
                        onClick={close}
                        type="button"
                    >
                        <CloseIcon />
                    </button>
                </div>
            </div>
        </section>
    );
};

ModalVideo.displayName = "ModalVideo";
