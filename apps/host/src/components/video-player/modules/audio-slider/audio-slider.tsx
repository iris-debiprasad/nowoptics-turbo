import React from "react";

import { IconButtonToggling } from "../../components/icon-button-toggling";
import { MutedIcon } from "../../icons/muted-icon";
import { VolumeIcon } from "../../icons/volume-icon";

import styles from "./audio-slider.module.scss";
import { IUseVideoAudioReturn } from "../../hooks/use-video-audio";

interface Props extends IUseVideoAudioReturn {}

/**
 * Audio / Sound control for video component, it supports muting and sliding to a volume value
 */
export const AudioSlider = ({ data, methods }: Props): JSX.Element => {
  const onVolumeChange = (event: React.ChangeEvent<HTMLInputElement>): void =>
    methods.updateVolume(Number(event.target.value));

  return (
    <div className={styles.sound} aria-label="Volume">
      <IconButtonToggling
        isToggled={data.audio.muted}
        normal={{
          tooltip: "Mute",
          event: methods.mute,
          icon: { item: <VolumeIcon />, type: "stroke" },
        }}
        toggled={{
          tooltip: "Unmute",
          event: methods.unmute,
          icon: { item: <MutedIcon />, type: "stroke" },
        }}
      />
      <input
        className={styles.sound__bar}
        max={100}
        min={0}
        onChange={onVolumeChange}
        title={`${data.audio.volume}%`}
        type="range"
        value={data.audio.volume}
      />
    </div>
  );
};
