import { useMemo } from "react";
import style from "./Header.module.scss";
import { useTranslation } from "react-i18next";
import Link from "next/link";
import useResponsive from "@/hooks/useResponsive";
import { parseStringWithMarkup } from "@/utils/common.utils";

function StaticMessage() {
  const { t } = useTranslation();
  const hasReached = useResponsive();

  const staticMessage = useMemo(() => {
    if (hasReached.lg) {
      return parseStringWithMarkup(t(`HEADER.STATIC_MESSAGE`), "a");
    } else {
      return parseStringWithMarkup(t(`HEADER.STATIC_MESSAGE_MOBILE`), "a");
    }
  }, [hasReached, t]);

  return (
    <div className={style.staticMessageWrapper}>
      <div className={style.staticMessage}>
        {staticMessage.map((v) => {
          switch (v.type) {
            // Here case `a` is added because the markup used is `a` in parseStringWithMarkup function.
            case "a": {
              return <Link href={"/book-eye-exam/"}>{v.value}</Link>;
            }

            default: {
              return <>{v.value.trim()}&nbsp;</>;
            }
          }
        })}
      </div>
    </div>
  );
}

export default StaticMessage;
