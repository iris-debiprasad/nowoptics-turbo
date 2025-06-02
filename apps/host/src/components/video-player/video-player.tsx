import React from "react";
import CircularProgress from "@mui/material/CircularProgress";

import { PlayerControls } from "./modules/controls";
import { Timeline } from "./modules/timeline";

import {
  IUsePlayerFullcreenReturn,
  usePlayerFullscreen,
} from "./hooks/use-player-fullscreen";
import { useKeybindings } from "./hooks/use-keybindings";
import { usePlayerVisibility } from "./hooks/use-player-visibility";

import { PlayIcon } from "./icons/play-icon";

import styles from "./video-player.module.scss";
import { useVideoPlayer } from "./hooks/use-video-player";
import { AudioSlider } from "./modules/audio-slider";

interface ISources {
  format: string;
  src: string;
}

export interface IProps {
  /** Valid sources for displaying the video, if one source does not work, another will be used within the specified array */
  sources: ISources[];
  /** Thumbnail to display before the video is played */
  thumbnail: string;
}

/**
 * Custom video player that has seeking functionality by using the timeline bar (progress bar), timelapse display,
 * sound controlling, full screen, video pause and play, and keybindings.
 *
 * @example
 * <div className="video-container">
 *   <VideoPlayer
 *     sources={[
 *        { format: "mp4", src: "https://some-page/some-remote-source.mp4" },
 *        { format: "mp4", src: "https://another-page/another-remote-video-source.mp4" },
 *    ]}
 *   "thumbnail": "https://some-page/some-remote-source.png",
 *   />
 * </div>
 */
export const VideoPlayer = ({ sources, thumbnail }: IProps): JSX.Element => {
  const videoRef = React.useRef<HTMLVideoElement>(null);
  const { data, methods } = useVideoPlayer(videoRef);
  const [playerRef, isPlayerHovered] = usePlayerVisibility<HTMLDivElement>(
    data.isPlaying,
  );
  const fullscreen: IUsePlayerFullcreenReturn = usePlayerFullscreen(
    playerRef.current,
  );

  const [isVideoLoading, setIsVideoLoading] = React.useState<boolean>(true);

  const playPauseEvent: () => void = !data.isPlaying
    ? methods.play
    : methods.pause;

  useKeybindings({
    keybindings: {
      KeyK: playPauseEvent,
      Space: playPauseEvent,
      Enter: playPauseEvent,
      NumpadEnter: playPauseEvent,
      KeyF: fullscreen.methods.toggleFullscreen,
      KeyM: data.audio.muted ? methods.unmute : methods.mute,
    },
    dependencies: [
      data.isPlaying,
      fullscreen.data.isFullscreen,
      data.audio.muted,
    ],
    videoRef,
  });

  const onVideoLoading = (): void => setIsVideoLoading(true);
  const onVideoLoaded = (): void => setIsVideoLoading(false);

  // === React Render

  const VideoSources: JSX.Element[] = React.useMemo(
    () =>
      sources.map((source) => (
        <source
          key={source.src}
          src={source.src}
          type={`video/${source.format}`}
        />
      )),
    [],
  );

  const controlsContainerClasses: string = `${styles.controls} ${isPlayerHovered ? styles.display : ""
    }`;

  return (
    <section
      className={styles.player}
      onClick={data.isPlaying ? methods.pause : methods.play}
      onDoubleClick={fullscreen.methods.toggleFullscreen}
      ref={playerRef}
    >
      <video
        className={styles.player__video}
        onEnded={methods.endVideo}
        onLoadedData={onVideoLoaded}
        onWaiting={onVideoLoading}
        onCanPlayThrough={onVideoLoaded}
        onTimeUpdate={methods.updateVideoProgressOnPlay}
        poster={thumbnail}
        ref={videoRef}
      >
        {VideoSources}
      </video>

      {videoRef.current ? (
        <>
          {!data.hasVideoStarted && !isVideoLoading ? (
            <div className={styles["player__center-element"]}>
              <button
                type="button"
                className={styles["player__feedback-item"]}
                onClick={methods.play}
                title="Play"
              >
                <PlayIcon />
              </button>
            </div>
          ) : null}

          {isVideoLoading ? (
            <div className={styles["player__center-element"]}>
              <figure className={styles["player__feedback-item"]}>
                <CircularProgress style={{ color: 'white' }} />
              </figure>
            </div>
          ) : null}

          {data.hasVideoStarted && !isVideoLoading ? (
            <section className={controlsContainerClasses}>
              <div
                className={styles.bar}
                onClick={(event) => event.stopPropagation()}
              >
                <div className={styles.bar__wrapper}>
                  <Timeline
                    player={{
                      play: methods.play,
                      isVideoPlaying: data.isPlaying,
                    }}
                    data={{ progress: data.progress }}
                    methods={{
                      updateProgress: methods.updateProgress,
                      updateVideoProgressOnPlay:
                        methods.updateVideoProgressOnPlay,
                    }}
                    videoElement={videoRef.current}
                  />

                  <PlayerControls
                    audioElement={
                      <AudioSlider
                        data={{ audio: data.audio }}
                        methods={{
                          mute: methods.mute,
                          unmute: methods.unmute,
                          updateVolume: methods.updateVolume,
                        }}
                      />
                    }
                    {...{
                      fullscreen,
                    }}
                    player={{
                      isVideoPlaying: data.isPlaying,
                      play: methods.play,
                      pause: methods.pause,
                    }}
                    videoElement={videoRef.current}
                  />
                </div>
              </div>
            </section>
          ) : null}
        </>
      ) : null}
    </section>
  );
};
