import React from "react";
import { useIntersectionObserver } from "@/hooks/use-intersection-observer";

export interface IKeybindingItem {
  [key: string]: () => void;
}

export interface IUseKeybindingsParams {
  keybindings: IKeybindingItem;
  dependencies: any[];
  videoRef: React.RefObject<HTMLVideoElement | null>;
}

/**
 * This hook stablishes the keybindings for the video player, keybindings are defined by a keybindings object
 * and also by a dependency array, will add the keybindings when the video player is visible on screen,
 * will remove keybindings once video player is not visible on screen
 */
export const useKeybindings = ({
  keybindings,
  dependencies,
  videoRef,
}: IUseKeybindingsParams): void => {
  const { entry } = useIntersectionObserver({
    elementRef: videoRef,
  });

  React.useEffect(() => {
    if (!videoRef || !entry) return;

    const onKeybindingAction = (event: KeyboardEvent) => {
      // When space is pressed, the browser scrolls down
      if (event.code === "Space") event.preventDefault();
      keybindings[event.code]?.();
    };

    if (entry.isIntersecting)
      document.addEventListener("keydown", onKeybindingAction);
    else document.removeEventListener("keydown", onKeybindingAction);

    return () => document.removeEventListener("keydown", onKeybindingAction);
  }, [videoRef, entry?.isIntersecting, ...dependencies]);
};
