import { useIntersectionObserver } from "@/hooks/use-intersection-observer";
import React from "react";

export interface IUsePlayAndPauseData {
  hasVideoStarted: boolean;
  isPlaying: boolean;
}

export interface IUsePlayAndPauseMethods {
  endVideo: () => void;
  pause: () => void;
  play: () => void;
}

export interface IUsePlayAndPauseReturn {
  data: IUsePlayAndPauseData;
  methods: IUsePlayAndPauseMethods;
}

/**
 * Hook in charged of playing and pausing functionality for the video player
 *
 * @param videoRef Reference value for the video player
 */
export const usePlayAndPause = (
  videoRef: React.RefObject<HTMLVideoElement | null>,
): IUsePlayAndPauseReturn => {
  const [hasVideoStarted, setHasVideoStarted] = React.useState<boolean>(false);
  const [isPlaying, setIsPlaying] = React.useState<boolean>(false);
  const { entry } = useIntersectionObserver({ elementRef: videoRef });

  const videoElement = videoRef.current;

  const pause = (): void => {
    if (!videoElement) return;
    videoElement.pause();
    setIsPlaying(false);
  };

  // Pause video if it's playing and it's out of view
  React.useEffect(() => {
    if (!entry) return;
    if (!entry.isIntersecting && isPlaying) pause();
  }, [entry]);

  if (!videoElement)
    return {
      data: { isPlaying: false, hasVideoStarted: false },
      methods: { endVideo: () => { }, pause: () => { }, play: () => { } },
    };

  const play = () => {
    setHasVideoStarted(true);
    setIsPlaying(true);
    videoElement.play();
  };

  const endVideo = (): void => {
    setHasVideoStarted(false);
    setIsPlaying(false);
  };

  return {
    data: {
      hasVideoStarted,
      isPlaying,
    },
    methods: {
      endVideo,
      pause,
      play,
    },
  };
};
