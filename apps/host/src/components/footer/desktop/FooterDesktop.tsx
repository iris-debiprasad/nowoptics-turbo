import { useContext, useMemo } from "react";
import styles from "./FooterDesktop.module.scss";
import { FOOTER_LINKS } from "@root/host/src/constants/FooterConstants";
import Link from "next/link";
import { useTranslation } from "react-i18next";
import SocialMediaFooter from "../social-media/SocialMediaFooter";
import CopyRight from "../copyright/CopyRightFooter";
import { RuntimeVarContext } from "@/contexts/RuntimeVarContext";

export default function FooterDesktop() {
  const footerElements = useMemo(() => {
    let items = [];
    let temp = [...FOOTER_LINKS];

    while (temp.length > 3) {
      items.push(temp.splice(0, 2)); // Extract pairs of 2
    }

    if (temp.length) {
      items.push(temp);
    }

    return items;
  }, [FOOTER_LINKS]);

  const { t } = useTranslation();
  const env = useContext(RuntimeVarContext);

  return (
    <footer className={styles.ft}>
      <div className={styles.ft_container}>
        {footerElements.map((itemGroup, index) => (
          <div className={styles.ft_column} key={`${index}-${itemGroup[0].id}`}>
            {itemGroup.map((item, groupIndex) => (
              <div className={styles.ft_item} key={item.id}>
                {item.link ? (
                  <Link className={styles.ft_item_title} href={item.link}>
                    {t(`FOOTER.${item.title}`)}
                  </Link>
                ) : (
                  <div className={styles.ft_item_title}>
                    {t(`FOOTER.${item.title}`)}
                  </div>
                )}
                {item.menus.length > 0 && (
                  <ul className={styles.ft_sitem_container}>
                    {item.menus.map((sitem) => (
                      <>
                        {sitem.title === "Online Vision Test" &&
                        env?.NEXT_PUBLIC_RX_RENEWAL_ENABLE === "false" ? (
                          <></>
                        ) : (
                          <li key={sitem?.id}>
                            <Link href={sitem!.link}>
                              {t(`FOOTER.${sitem.title}`)}
                            </Link>
                          </li>
                        )}
                      </>
                    ))}
                  </ul>
                )}
                {index == footerElements.length - 1 &&
                  groupIndex == itemGroup.length - 1 && <SocialMediaFooter />}
              </div>
            ))}
          </div>
        ))}
      </div>

      <CopyRight />
    </footer>
  );
}
