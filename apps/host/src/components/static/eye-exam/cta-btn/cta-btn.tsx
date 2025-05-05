import IconSVG from "@/components/iconsvg/IconSVG";
import { useRouter } from "next/router";
import { ReactNode } from "react";
import generalStyles from "../eye-exam.module.scss";

interface IEyeExamCTA {
  route: string;
  children: ReactNode;
}
export function EyeExamCta({ route, children }: IEyeExamCTA): JSX.Element {
  const router = useRouter();
  return (
    <button
      className={generalStyles.cta}
      tabIndex={0}
      onClick={() => router.push(route)}
      aria-label={children as string}
    >
      {children}
      <span>
        <IconSVG
          width="18"
          height="18"
          viewBox="0 0 17 18"
          fill="none"
          fillP="#010101"
          name="arrow_solid_right"
        />
      </span>
    </button>
  );
}
