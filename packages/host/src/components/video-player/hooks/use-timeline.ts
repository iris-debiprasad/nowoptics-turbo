import React from "react";

interface IProgress {
  actual: number;
  shadow: number;
}

export enum ProgressType {
  ACTUAL = "actual",
  SHADOW = "shadow",
}

export interface IUseTimelineData {
  progress: IProgress;
}

export interface IUseTimelineMethods {
  updateProgress: (type: ProgressType, progress: number) => void;
  updateVideoProgressOnPlay: () => void;
}

export interface IUseTimelinerReturn {
  data: IUseTimelineData;
  methods: IUseTimelineMethods;
}

const PERCENT_UNIT_CONVERTER = 100;

/**
 * Hook that handles progress state, includes methods for updating the progress whether it's shadow or actual progress
 */
export const useTimeline = (
  videoElement: HTMLVideoElement | null,
): IUseTimelinerReturn => {
  const [progress, setProgress] = React.useState<IProgress>({
    actual: 0,
    shadow: 0,
  });

  const updateProgress = (type: ProgressType, progress: number): void =>
    setProgress((prev) => ({ ...prev, [type]: progress }));

  const updateVideoProgressOnPlay = (): void => {
    if (!videoElement) return;
    const progressPercent: number =
      (videoElement.currentTime / videoElement.duration) *
      PERCENT_UNIT_CONVERTER;
    updateProgress(ProgressType.ACTUAL, progressPercent);
  };

  return {
    data: { progress },
    methods: { updateVideoProgressOnPlay, updateProgress },
  };
};
