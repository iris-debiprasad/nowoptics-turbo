import React from "react";

export interface IntersectionObserverParams {
  /** UI Element reference which will be using intersection observer interface */
  elementRef: React.RefObject<Element | null>;
  /** Options for intersection observer interface */
  options?: IntersectionObserverInit;
}

export interface InsersectionObserverReturn
  extends Pick<IntersectionObserverParams, "elementRef"> {
  /** Entry value from the intersection observer API */
  entry: IntersectionObserverEntry | null;
  /** Observer object from the intersection observer API */
  observer: IntersectionObserver | null;
}

/**
 * Implements Intersection Observer interface for a certain element in the UI
 * Can be used to do actions when an element is visible in the UI
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API
 * @example
 * const boxRef = React.useRef<HTMLDivElement>(null);
 * const { entry, observer, elementRef } = useIntersectionObserver({
 *   elementRef: boxRef,
 *   options: {
 *     rootMargin: '100px'
 *   },
 * })
 *
 * if (entry.isIntersecting) {
 *   console.log('Box on screen!');
 *   elementRef.current && observer.unobserve(elementRef.current);
 * }
 */
export const useIntersectionObserver = ({
  elementRef,
  options,
}: IntersectionObserverParams): InsersectionObserverReturn => {
  const [entry, setEntry] = React.useState<IntersectionObserverEntry | null>(
    null,
  );
  const [observer, setObserver] = React.useState<IntersectionObserver | null>(
    null,
  );

  React.useEffect(() => {
    setObserver(
      new IntersectionObserver(([entry]) => setEntry(entry), options),
    );
    return () => setObserver(null);
  }, []);

  React.useEffect(() => {
    if (!elementRef.current) return;
    observer?.observe(elementRef.current);
    return () => {
      elementRef.current && observer?.unobserve(elementRef.current);
    };
  }, [elementRef.current, observer]);

  return { elementRef, entry, observer };
};
