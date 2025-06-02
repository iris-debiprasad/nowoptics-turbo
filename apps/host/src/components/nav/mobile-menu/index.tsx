import React from "react";
import { useTranslation } from "react-i18next";
import { Badge, Drawer, IconButton, styled } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import Link from "next/link";
import { Navbar } from "./navbar";
import { useAppSelector } from "@/store/useStore";
import styles from "./index.module.scss";
import { useRouter } from "next/router";
import { SessionSection } from "./session-section";
import { Session } from "next-auth";
import CartIcon from "../../../../../assets/Images/icons/CartNewIcon.svg";
import LocationIcon from "../../../../../assets/Images/icons/LocationIcon.svg";
import FavoriteIcon from "../../../../../assets/Images/icons/FavoriteIcon.svg";
import Image from "next/image";
import useResponsive from "@/hooks/useResponsive";
import { selectCount } from "@/store/reducer/favorite-products";

const CustomBadgeContent = styled(Badge)(() => ({
  "& .MuiBadge-badge": {
    backgroundColor: "var(--primary-color)",
    color: "var(--tertiary-font-color)",
  },
}));

export interface Props {
  cartCount: number;
  clearStore: () => void;
  getStoreGridData: (page: number) => Promise<void>;
  onClose: () => void;
  onLocationClick: () => void;
  open: boolean;
  session: Session | null;
}

export function MobileMenu({
  cartCount,
  onLocationClick,
  open,
  ...rest
}: Readonly<Props>): React.JSX.Element {
  const { t } = useTranslation();
  const router = useRouter();
  const hasReached = useResponsive();
  const favoriteProductsCount = useAppSelector(selectCount);

  const onSelectStore = () => {
    onLocationClick();
    rest.onClose();
  };

  const onGoToFavorites = () => {
    const isUserLoggedIn = rest.session !== null;
    router.push(isUserLoggedIn ? "/my-account/my-favorites" : "/favorites");
    rest.onClose();
  };

  const onGoToCart = () => {
    router.push("/cart");
    rest.onClose();
  };

  return (
    <Drawer
      open={hasReached.lg ? false : open}
      onClose={rest.onClose}
      ModalProps={{ keepMounted: true }}
      sx={{
        zIndex: 5001, // Above all elements (one above static footer)
        "& .MuiDrawer-paper": {
          boxSizing: "border-box",
          width: "100%",
        },
      }}
    >
      <header className={styles.header}>
        <IconButton onClick={rest.onClose}>
          <CloseIcon />
        </IconButton>

        <div className={styles.header__actions_group}>
          <IconButton onClick={onSelectStore}>
            <Image src={LocationIcon} alt="location" width={16} height={21} />
          </IconButton>

          <IconButton
            className={styles.header__icon_button}
            onClick={onGoToFavorites}
          >
            <CustomBadgeContent
              {...(favoriteProductsCount > 0 && {
                badgeContent:
                  favoriteProductsCount > 9 ? "9+" : favoriteProductsCount,
              })}
            >
              <Image src={FavoriteIcon} alt="favorite" width={25} height={23} />
            </CustomBadgeContent>
          </IconButton>

          <IconButton
            className={styles.header__icon_button}
            onClick={onGoToCart}
          >
            <CustomBadgeContent
              {...(cartCount > 0 && {
                badgeContent: cartCount > 9 ? "9+" : cartCount,
              })}
            >
              <Image src={CartIcon} alt="cart" width={20} height={22} />
            </CustomBadgeContent>
          </IconButton>
        </div>
      </header>

      <section className={styles.body}>
        <Link
          className={styles.button}
          href="/book-eye-exam"
          onClick={rest.onClose}
        >
          {t("NEW_MOBILE_NAV.BOOK_EYE_EXAM")}
        </Link>

        <div className={styles.menu_container}>
          <Navbar
            onClose={rest.onClose}
            isUserLoggedIn={rest.session !== null}
          />
        </div>
      </section>

      <SessionSection {...rest} />
    </Drawer>
  );
}
