import React from "react";

interface IAudio {
  prevMuteVolume: number;
  volume: number;
  muted: boolean;
}

export interface IUseVideoAudioData {
  audio: IAudio;
}

export interface IUseVideoAudioMethods {
  updateVolume: (volume: number) => void;
  mute: () => void;
  unmute: () => void;
}

export interface IUseVideoAudioReturn {
  data: IUseVideoAudioData;
  methods: IUseVideoAudioMethods;
}

const VOLUME_MUTED_VALUE = 0;
const VOLUME_DECIMAL_CONVERTER = 100;

/**
 * Hook that contains the main logic to handle video audio, provides audio information and methods
 * to manipulate it, such as update volume, mute and unmute volume.
 */
export const useVideoAudio = (
  videoElement: HTMLVideoElement | null,
): IUseVideoAudioReturn => {
  const [audio, setAudio] = React.useState<IAudio>({
    prevMuteVolume: 100,
    volume: 100,
    muted: false,
  });

  const updateVolume = (volume: number): void => {
    if (!videoElement) return;
    const isMuted: boolean = volume <= VOLUME_MUTED_VALUE;
    videoElement.volume = volume / VOLUME_DECIMAL_CONVERTER;
    setAudio((prev) => ({
      muted: isMuted,
      volume,
      prevMuteVolume: prev.volume,
    }));
  };

  const mute = (): void => updateVolume(VOLUME_MUTED_VALUE);
  const unmute = (): void => updateVolume(audio.prevMuteVolume);

  return {
    data: { audio },
    methods: { updateVolume, mute, unmute },
  };
};
