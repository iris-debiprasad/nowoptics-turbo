import styles from "./FooterMobile.module.scss";
import Link from "next/link";
import { useContext, useState } from "react";
import IconSVG from "@/components/iconsvg/IconSVG";
import {
  FOOTER_LINKS,
  FOOTER_LINKS_MOBILE_ORDER,
} from "@root/host/src/constants/FooterConstants";
import SocialMediaFooter from "../social-media/SocialMediaFooter";
import CopyRight from "../copyright/CopyRightFooter";
import { FooterSubmenuItem } from "@root/host/src/types/Footer.types";
import { useTranslation } from "react-i18next";
import { RuntimeVarContext } from "@/contexts/RuntimeVarContext";

export default function FooterMobile() {
  const items = FOOTER_LINKS_MOBILE_ORDER.map((item) => FOOTER_LINKS[item]);
  const bestOfferMenuId = 7;

  const { t } = useTranslation();
  const env = useContext(RuntimeVarContext);

  const initialItemsState = items.map((item) => ({
    ...item,
    activated: false,
  }));

  const [accordionState, setAccordionState] = useState(initialItemsState);

  const triggerAccordion = (id: number) => {
    const statecpy = [...accordionState];

    const itemIndex = statecpy.findIndex((item) => item.id == id);

    if (itemIndex === -1) {
      return;
    }

    statecpy[itemIndex] = {
      ...statecpy[itemIndex],
      activated: !statecpy[itemIndex].activated,
    };

    setAccordionState(statecpy);
  };

  const getCorrectSubmenuOrder = (
    sm: FooterSubmenuItem[],
    id: number,
  ): FooterSubmenuItem[] => {
    const submenu = id === bestOfferMenuId ? sm.slice(1, sm.length) : sm;
    const mid = Math.ceil(submenu.length / 2);
    const left = submenu.slice(0, mid);
    const right = submenu.slice(mid);
    const result: FooterSubmenuItem[] = [];

    for (let i = 0; i < left.length; i++) {
      result.push(left[i]);
      if (i < right.length) {
        result.push(right[i]);
      }
    }

    if (id === bestOfferMenuId) {
      return [sm[0], ...result];
    }

    return result;
  };

  const addBreakPoints = (text: string) => {
    let new_text = text;

    if (text.includes("&")) {
      new_text = text.replace("&", "</br>&");
    }

    if (text.includes("w/")) {
      new_text = text.replace("w/", "</br>w/");
    }

    return new_text;
  };

  return (
    <footer className={styles.ftmb}>
      <div className={styles.ftmb_container}>
        {accordionState.map((item) => (
          <div
            className={styles.ftmb_item}
            key={item.id}
            style={item.link ? { marginBottom: "35px" } : {}}
          >
            {item.link ? (
              <Link className={styles.ftmb_item_title} href={item.link}>
                {t(`FOOTER.${item.title}`)}
              </Link>
            ) : (
              <div
                className={`${styles.ftmb_item_title} ${item.activated ? styles.ftmb_item_title_open : ""}`}
                onClick={() => triggerAccordion(item.id)}
              >
                {t(`FOOTER.${item.title}`)}
                {"  "}
                <IconSVG
                  width="7"
                  height="11"
                  viewBox="0 0 10 10"
                  fill="none"
                  name="arrow_right"
                  stroke="#707070"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </div>
            )}
            {item.menus.length !== 0 && (
              <div
                className={`${item.id == bestOfferMenuId ? styles.ftmb_sitem_container_bo : styles.ftmb_sitem_container} ${item.activated ? styles.ftmb_sitem_container_open : ""}`}
              >
                {getCorrectSubmenuOrder(item.menus, item.id).map((sitem) =>
                  sitem &&
                    sitem.title === "Online Vision Test" &&
                    env?.NEXT_PUBLIC_RX_RENEWAL_ENABLE === "false" ? (

                    <></>
                  ) : sitem ? (
                    <Link
                      href={sitem.link}
                      key={sitem.id}
                      dangerouslySetInnerHTML={{
                        __html:
                          item.id == bestOfferMenuId
                            ? addBreakPoints(t(`FOOTER.${sitem.title}`))
                            : t(`FOOTER.${sitem.title}`),
                      }}
                    />
                  ) : (<></>),
                )}
              </div>
            )}
          </div>
        ))}
        <SocialMediaFooter iconSize={25} />
        <div className={styles.ftmb_divisor} />
        <CopyRight />
      </div>
    </footer>
  );
}
