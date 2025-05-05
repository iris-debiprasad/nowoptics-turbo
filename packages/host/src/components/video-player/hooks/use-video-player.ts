import React from "react";
import {
  IUsePlayAndPauseData,
  IUsePlayAndPauseMethods,
  IUsePlayAndPauseReturn,
  usePlayAndPause,
} from "./use-play-and-pause";
import {
  IUseTimelineData,
  IUseTimelineMethods,
  IUseTimelinerReturn,
  useTimeline,
} from "./use-timeline";
import {
  IUseVideoAudioData,
  IUseVideoAudioMethods,
  IUseVideoAudioReturn,
  useVideoAudio,
} from "./use-video-audio";

export interface IVideoPlayerData
  extends IUsePlayAndPauseData,
    IUseTimelineData,
    IUseVideoAudioData {
  videoElement: HTMLVideoElement | null;
}

export interface IVideoPlayerMethods
  extends IUsePlayAndPauseMethods,
    IUseTimelineMethods,
    IUseVideoAudioMethods {}

export interface IUseVideoPlayerReturn {
  data: IVideoPlayerData;
  methods: IVideoPlayerMethods;
}

/**
 * Gives the core state and methods for making possible all of their features, such as
 * play and pause, controlling sound (muting, unmuting), timeline control and fullscreen
 */
export const useVideoPlayer = (
  videoRef: React.RefObject<HTMLVideoElement | null>,
): IUseVideoPlayerReturn => {
  const videoElement: HTMLVideoElement | null = videoRef.current;

  const playAndPause: IUsePlayAndPauseReturn = usePlayAndPause(videoRef);
  const timeline: IUseTimelinerReturn = useTimeline(videoElement);
  const audio: IUseVideoAudioReturn = useVideoAudio(videoElement);

  return {
    data: {
      videoElement,
      ...audio.data,
      ...timeline.data,
      ...playAndPause.data,
    },
    methods: {
      ...audio.methods,
      ...timeline.methods,
      ...playAndPause.methods,
    },
  };
};
