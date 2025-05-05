import React from "react";
import style from "./Header.module.scss";
import { useTranslation } from "react-i18next";
import Link from "next/link";

function StaticMessage() {
  const { t } = useTranslation();
  return (
    <div className={style.staticMessageWrapper}>
      <Link href={"/book-eye-exam/"}>
        <div className={style.staticMessage}>{t(`HEADER.STATIC_MESSAGE`)}</div>
      </Link>
    </div>
  );
}

export default StaticMessage;
