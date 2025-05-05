import React from "react";

type THoverReturn<T> = [React.RefObject<T>, boolean];

enum EventsAssignation {
  ADD = "add",
  REMOVE = "remove",
}

const CONTROLS_VISIBILITY_TIMEOUT = 5000;

/**
 * Hook that will return a reference object and the hover value when the element where the reference was put
 * on is being hovered.
 */
export const usePlayerVisibility = <T extends HTMLElement>(
  isVideoPlaying: boolean,
): THoverReturn<T> => {
  const elementRef = React.useRef<T>(null);
  const [isHovering, setIsHovering] = React.useState<boolean>(false);

  const displayControlsForSomeSeconds = (): void => {
    setIsHovering(true);
    setTimeout(() => setIsHovering(false), CONTROLS_VISIBILITY_TIMEOUT);
  };

  const handleMouseEventsAssignation = (type: EventsAssignation): void => {
    if (!elementRef.current) return;
    const listenerAction =
      type === EventsAssignation.ADD
        ? "addEventListener"
        : "removeEventListener";

    elementRef.current[listenerAction](
      "mousemove",
      displayControlsForSomeSeconds,
    );
  };

  React.useEffect(() => {
    if (!isVideoPlaying || isHovering)
      return handleMouseEventsAssignation(EventsAssignation.REMOVE);
    handleMouseEventsAssignation(EventsAssignation.ADD);
    return () => handleMouseEventsAssignation(EventsAssignation.REMOVE);
  }, [isVideoPlaying, isHovering]);

  const getHoverValue = (): boolean => {
    if (!elementRef.current) return false;
    if (!isVideoPlaying) return true;
    return isHovering;
  };

  return [elementRef, getHoverValue()];
};
