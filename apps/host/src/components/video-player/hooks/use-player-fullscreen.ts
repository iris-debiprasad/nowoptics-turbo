import React from "react";

export interface IUsePlayerFullscreenData {
  isFullscreen: boolean | null;
}

export interface IUsePlayerFullscreenMethods {
  exitFullscreen: () => void;
  openFullscreen: () => void;
  toggleFullscreen: () => void;
}

export interface IUsePlayerFullcreenReturn {
  data: IUsePlayerFullscreenData;
  methods: IUsePlayerFullscreenMethods;
}

/**
 * Hook handles the fullscreen state and methods for doing it possible to enter or exit fullscreen
 *
 * @param playerContainer player container reference value that has the video player and controls
 */
export const usePlayerFullscreen = (
  playerContainer: HTMLDivElement | null,
): IUsePlayerFullcreenReturn => {
  // Fullscreen value is only use to trigger the effect to enter or exit fullscreen
  const [isFullscreen, setIsFullscreen] = React.useState<boolean | null>(null);

  // Handles fullscreen view when fullscreen boolean is changed
  React.useEffect(() => {
    // Effect won't run if isFullscreen is null (value used to detect first render)
    if (!playerContainer || isFullscreen === null) return;

    const shouldOpenFullscreen: boolean = document.fullscreenElement === null;
    if (shouldOpenFullscreen) playerContainer.requestFullscreen();
    else document.exitFullscreen();
  }, [playerContainer, isFullscreen]);

  const openFullscreen = (): void => setIsFullscreen(true);
  const exitFullscreen = (): void => setIsFullscreen(false);
  const toggleFullscreen = (): void => setIsFullscreen((prev) => !prev);

  return {
    data: { isFullscreen },
    methods: { exitFullscreen, openFullscreen, toggleFullscreen },
  };
};
