import {
  Box,
  Breadcrumbs,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Typography,
} from "@mui/material";
import style from "./index.module.scss";
import Image from "next/image";
import dayjs from "dayjs";
import { DATE_FORMAT } from "@root/host/src/constants/common.constants";
import React from "react";
import IconSVG from "../iconsvg/IconSVG";
import { generateProductLink } from "@/utils/common.utils";
import { useRouter } from "next/router";
import ConfirmationModal from "../confirmationModal/ConfirmationModal";
import { useAppDispatch } from "@/store/useStore";
import { decrementCount } from "@/store/reducer/favorite-products";
import Breadcrumb from "../breadcrumb/Breadcrumb";

export function FavoriteProductsAsGuest(): React.JSX.Element {
  const router = useRouter();
  const [favorites, setFavorites] = React.useState<any[]>([]);
  const dispatch = useAppDispatch();
  const [selectedProductVariantNumber, setSelectedProductVariantNumber] =
    React.useState<null | string>(null);
  const [isDeletionModalDisplayed, setIsDeletionModalDisplayed] =
    React.useState<boolean>(false);

  const isUserLoggedIn =
    typeof window !== "undefined" &&
    localStorage.getItem("auth_status") === "authenticated";

  React.useEffect(() => {
    if (isUserLoggedIn) {
      router.push("/");
      return;
    }

    const data = JSON.parse(localStorage.getItem("user-favorites") || "[]");
    setFavorites(data);
  }, [isUserLoggedIn]);

  const handleAddToCart = (
    modelnumber: string,
    sku: string,
    title: string,
  ): void => {
    router.push(
      {
        pathname: `/product/${generateProductLink(modelnumber, title, sku)}`,
        query: {
          sku: sku,
        },
      },
      `/product/${generateProductLink(modelnumber, title, sku)}`,
    );
  };

  const displayDeletionModal = (variantNumber: string): void => {
    setIsDeletionModalDisplayed(true);
    setSelectedProductVariantNumber(variantNumber);
  };

  const deleteProduct = () => {
    const newFavorites = favorites.filter(
      (product) => product.variantNumber !== selectedProductVariantNumber,
    );
    setFavorites(newFavorites);
    localStorage.setItem("user-favorites", JSON.stringify(newFavorites));
    setSelectedProductVariantNumber(null);
    dispatch(decrementCount());
    setIsDeletionModalDisplayed(false);
  };

  return (
    <>
      <Breadcrumb
        links={[
          { label: "Home", href: "/" },
          { label: "My Favorites", href: "/favorites" },
        ]}
      />

      <Box
        className={`cardSection ${style.myAccountFavoritesWrapper}`}
        data-testid="my-account-favorites"
      >
        <div className={style.favoritesInnerWrapper}>
          <h2 className="iris_table_heading">Favorites</h2>
          <div className={`iris_table`}>
            <TableContainer sx={{ overflow: "auto" }}>
              <Table aria-label="simple table" className={style.table}>
                <TableBody>
                  {favorites.map((item, index) => (
                    <TableRow
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                      key={item.id + item.vTitle}
                      className={style.tableRow}
                    >
                      <TableCell className={style.productImage}>
                        <Box className={style.likeIcon}>
                          <IconSVG
                            width="18"
                            height="16"
                            viewBox="0 0 18 16"
                            fill="#f98300"
                            name="like_fill_icon"
                          />
                        </Box>
                        <div className={style.imageDiv}>
                          <Image
                            src={item.images[0]}
                            alt="product"
                            height={200}
                            width={200}
                            layout="responsive"
                            style={{
                              width: "100%",
                              height: "100%",
                              objectFit: "contain",
                            }}
                            className={style.imageThubmnail}
                          />
                        </div>
                      </TableCell>
                      <TableCell className={style.descriptionWrapper}>
                        <Typography className={style.productName}>
                          {item.brand[0]}
                        </Typography>
                        <Typography className={style.description}>
                          {item.title}
                        </Typography>
                      </TableCell>
                      <TableCell className={style.dateWrapper}>
                        <Typography className={style.dateAdded}>
                          Item Added On{" "}
                          {dayjs(item.addedOn).format(DATE_FORMAT)}
                        </Typography>
                      </TableCell>
                      <TableCell className={style.buttons}>
                        <div className={style.actionButtonWrapper}>
                          <Button
                            className={style.addToCartBtn}
                            onClick={() =>
                              handleAddToCart(
                                item.modelnumber,
                                item.sku,
                                item.title,
                              )
                            }
                          >
                            Add to Cart
                          </Button>
                          <Button
                            data-testid={`deleteFavoriteBtn-${index}`}
                            className={style.deleteBtn}
                            onClick={() =>
                              displayDeletionModal(item.variantNumber)
                            }
                          >
                            Remove
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
            {favorites.length === 0 && (
              <p>You haven{"'"}t added any items to your favorites yet.</p>
            )}
          </div>
        </div>

        {isDeletionModalDisplayed && (
          <ConfirmationModal
            data-testid="deleteFavoriteModal"
            content="Are you sure you want to remove this favorite item?"
            open={isDeletionModalDisplayed}
            handleClose={() => {
              setIsDeletionModalDisplayed(false);
              setSelectedProductVariantNumber(null);
            }}
            performAction={deleteProduct}
            Id={0}
            btnOneText="CANCEL"
            btnTwoText="YES"
          />
        )}
      </Box>
    </>
  );
}
