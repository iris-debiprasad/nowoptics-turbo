import { FrameSEO, LanceSEO, OtcSEO } from "@root/host/src/constants/seo.constant";
import { ProductSEOData } from "@root/host/src/types/seo.types";

export const generateProductDescription = (seoData: ProductSEOData) => {
  let description = "";
  if (seoData.Type === "Frames" || seoData.Type === "Frame" || seoData.Type === "OTC") {
    description = seoData.Description;
  } else {
    description = LanceSEO.description.replace(
      "[NAME]",
      seoData.Name ? seoData.Name : seoData.ProductName
    );
  }

  return description;
};
export const generateProductTitle = (seoData: ProductSEOData) => {
  if (seoData.Type === "OTC") {
    return OtcSEO.title.replace("[NAME]", seoData.Name ? seoData.Name : seoData.Brand.Name);
  }
  return (seoData.Type === "Frames" || seoData.Type === "Frame") &&
    seoData.FrameDetail
    ? FrameSEO.title
        .replace("[BRAND]", seoData.Brand.Name)
        .replace("[GENDER]", seoData.Gender)
        .replace("[COLOR]", seoData.Color)
        .replace("[SHAPE]", seoData.Shape)
        .replace(
          "[FRAME_DETAIL]",
          seoData.FrameDetail === "Sunglasses"
            ? seoData.FrameDetail
            : "Eyeglasses"
        )
    : LanceSEO.title.replace(
        "[NAME]",
        seoData.Name ? seoData.Name : seoData.ProductName
      );
};

export const getProductSEOStructuredData = (productDetails: ProductSEOData) => {
  return {
    "@context": "https://schema.org/",
    "@type": "Product",
    name: productDetails?.Name
      ? productDetails?.Name
      : productDetails?.ProductName || "",
    description: productDetails?.Description
      ? productDetails?.Description
      : productDetails?.ProductDescription || "",
    image: productDetails?.Images.map((data) => data.ImageUrl),
    sku: productDetails?.Sku || "",
    mpn: productDetails?.Mnp || "",
    brand: {
      "@type": "Brand",

      name: productDetails?.Brand?.Name
        ? productDetails?.Brand?.Name
        : productDetails?.Brand,
    },
    offers: {
      "@type": "Offer",
      url: "/product/" + productDetails.Sku,
      itemCondition: "https://schema.org/NewCondition",
      availability: `https://schema.org/${
        productDetails.IsProductOutOfStock ? "OutOfStock" : "InStock"
      }`,
      price: productDetails.ProductPrice
        ? productDetails.ProductPrice.toString()
        : "",
      priceCurrency: "USD",
      seller: {
        "@type": "Organization",
        name: "Stanton Optical",
      },
    },
  };
};
