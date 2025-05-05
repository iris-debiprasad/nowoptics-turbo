import Link from "next/link";
import { useTranslation } from "react-i18next";
import { NAV_ITEMS } from "@/constants/header.constants";
import { MOBILE_NAV_ITEMS } from "@/constants/mobile-menu.constants";
import { SubMenu, SubMenuItem } from "./sub-menu";
import type { Props as MobileMenuProps } from "..";
import sharedStyles from "../index.module.scss";

export interface Props extends Pick<MobileMenuProps, "onClose"> { }

export function Navbar({ onClose }: Readonly<Props>): React.JSX.Element {
  const { t } = useTranslation();

  return (
    <>
      {MOBILE_NAV_ITEMS.map((item) => {
        switch (item.type) {
          case NAV_ITEMS.NAV_TYPES.DROPDOWN:
            const subMenuItems: SubMenuItem[] = item.subMenu.map((el) => ({
              url: el.url,
              name: t(`NEW_MOBILE_NAV.ITEMS.${item.name}.${el.name}`),
              id: el.id,
            }));

            return (
              <SubMenu
                {...{ onClose }}
                label={t(`NEW_MOBILE_NAV.ITEMS.${item.name}.NAME`)}
                items={subMenuItems}
              />
            );

          case NAV_ITEMS.NAV_TYPES.TEXT:
            return (
              <Link
                href={item.url}
                className={`${sharedStyles.link} ${sharedStyles.uppercase}`}
                onClick={onClose}
              >
                {t(`NEW_MOBILE_NAV.ITEMS.${item.name}`)}
              </Link>
            );
          default:
            return <></>;
        }
      })}
    </>
  );
}
