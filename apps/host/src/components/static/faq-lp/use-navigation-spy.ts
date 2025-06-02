import React from "react";
import { SectionReference } from "./faq-sections.constants";
import { throttle } from "@root/host/src/utils/performance.utils";

const SCROLL_THROTTLE_DELAY = 200;
const SCROLL_SPY_OFFSET = 170;

export interface UseNavigationSpyReturn {
  activeSectionId: SectionReference;
  setActiveSectionId: React.Dispatch<React.SetStateAction<SectionReference>>;
}

export const useNavigationSpy = (): UseNavigationSpyReturn => {
  const [activeSectionId, setActiveSectionId] =
    React.useState<SectionReference>(SectionReference.APPOINTMENT_REF);

  React.useEffect(() => {
    const defineActiveSectionId = (): void => {
      for (let reference in SectionReference) {
        const sectionId: SectionReference =
          SectionReference[reference as keyof typeof SectionReference];

        const element: HTMLElement | null = document.getElementById(sectionId);
        if (!element) continue;

        const rect: DOMRect = element.getBoundingClientRect();
        if (
          rect.top - 1 <= SCROLL_SPY_OFFSET &&
          rect.bottom >= SCROLL_SPY_OFFSET
        ) {
          setActiveSectionId(sectionId);
          break;
        }
      }
    };

    const handleScroll = throttle(defineActiveSectionId, SCROLL_THROTTLE_DELAY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return { activeSectionId, setActiveSectionId };
};
