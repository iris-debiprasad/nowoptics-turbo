import React from "react";

import { PauseIcon } from "../../icons/pause-icon";
import { PlayIcon } from "../../icons/play-icon";
import { FullScreenIcon } from "../../icons/fullscreen-icon";
import { FullScreenExitIcon } from "../../icons/fullscreen-exit-icon";

import { IUsePlayerFullcreenReturn } from "../../hooks/use-player-fullscreen";
import { IconButtonToggling } from "../../components/icon-button-toggling";
import { formatVideoTime } from "../../video-player.utils";

import styles from "./controls.module.scss";

interface Player {
  isVideoPlaying: boolean;
  play: () => void;
  pause: () => void;
}

interface IProps {
  audioElement: React.ReactNode;
  fullscreen: IUsePlayerFullcreenReturn;
  player: Player;
  videoElement: HTMLVideoElement;
}

/** Controllers that are below the timeline, the controls that are defined here are: Button for play and pause, sound, time lapse
 * and full screen button
 */
export const PlayerControls = ({
  audioElement,
  fullscreen,
  player,
  videoElement,
}: IProps): JSX.Element => {
  const currentTime: string = formatVideoTime(
    videoElement.currentTime.toString(),
  );
  const duration: string = formatVideoTime(videoElement.duration.toString());

  return (
    <section className={styles.controls}>
      <div className={styles.controls__main}>
        <IconButtonToggling
          isToggled={player.isVideoPlaying}
          normal={{
            tooltip: "Play",
            event: player.play,
            icon: { item: <PlayIcon />, type: "fill" },
          }}
          toggled={{
            tooltip: "Pause",
            event: player.pause,
            icon: { item: <PauseIcon />, type: "fill" },
          }}
        />

        {audioElement}

        <span className={styles.controls__timelapse}>
          {currentTime} / {duration}
        </span>
      </div>

      <IconButtonToggling
        isToggled={Boolean(fullscreen.data.isFullscreen)}
        normal={{
          tooltip: "Fullscreen",
          icon: { item: <FullScreenIcon />, type: "fill" },
          event: fullscreen.methods.openFullscreen,
        }}
        toggled={{
          tooltip: "Exit Fullscreen",
          icon: { item: <FullScreenExitIcon />, type: "fill" },
          event: fullscreen.methods.exitFullscreen,
        }}
      />
    </section>
  );
};
