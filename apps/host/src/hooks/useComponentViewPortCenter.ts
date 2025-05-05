import { RefObject, useEffect, useRef, useState } from "react";

export default function useComponentViewPortCenter<
  T extends HTMLElement = HTMLDivElement
>(gap = 0): [RefObject<T>, boolean] {
  const ref = useRef<T>(null);
  const [isCentered, setIsCentered] = useState<boolean>(false);
  useEffect(() => {
    window.addEventListener("scroll", () => {
      const centerOfComponent = Math.floor(
        ref.current?.getBoundingClientRect().top! +
          ref.current?.clientHeight! / 2
      );
      const centerOfScreen = Math.floor(window.innerHeight / 2);

      setIsCentered(
        centerOfComponent <= centerOfScreen + gap &&
          centerOfComponent >= centerOfScreen - gap
      );
    });
  }, [ref]);
  return [ref, isCentered];
}
