import { ImageUrlConstants } from "./image.url.constants";

const BASE_IMAGE_URL = process.env.NEXT_PUBLIC_IMAGE_BASE_URL;
const DIVISION_LINE = `<div style="width:100%;height: 2px;box-shadow: 0 0 0 100vmax #cacbca;clip-path: inset(0 -100vmax);background: #cacbca;margin: 45px 0 15px 0px;"></div>`;

export const SPECIAL_OFFER_SO_DESKTOP_BANNER =
  BASE_IMAGE_URL +
  "transform/5b796302-02b7-42dd-a0b0-5b9407cd38a2/1158_WEB_23_Desktop_Offers";
export const SPECIAL_OFFER_SO_MOBILE_BANNER =
  BASE_IMAGE_URL +
  "transform/5f38941f-56e1-44f1-be65-6e5fa0b91860/1158_WEB_23_Mobile_Offers";

const SPECIAL_OFFERS_IMAGES = ImageUrlConstants.SPECIAL_OFFERS;

export interface ISpecial_Offer_Page {
  image_mobile: string;
  image_mobile_es?: string;
  image: string;
  image_es?: string;
  alt: string;
  imageIsClickable: boolean;
  imageClickRoute: string;
  content: string;
  content_es?: string;
  disclaimer: string;
  disclaimer_es?: string;
  cta: string;
  cta_es?: string;
  ctaRoute: string;
  meta: {
    title: string;
    description: string;
  };
}

export const SO_SPECIAL_OFFERS = [
  {
    image: SPECIAL_OFFERS_IMAGES.SO.TWO_FOR_79_PROMO,
    url: "/special-offers/2-for-79-same-day/",
    alt: "2 Pair of Glasses + Free Eye Exam + antiglare/UV lens upgrade + same-day service $79",
    geoTargeted: false,
    spanish: {
      image: SPECIAL_OFFERS_IMAGES.SO_SPANISH.TWO_FOR_79_PROMO,
      alt: "2 pares de lentes + Examen de la vista + Antirreflejos desde $79 el mismo dia",
    },
  },
  {
    image: SPECIAL_OFFERS_IMAGES.SO.CONTACT_LENS_VALUE_PACK,
    url: "/special-offers/contact-lens-value-pack/",
    alt: "1-Year Supply of Acuvue®️Oasys®️ 2-Week for $149 + Free Contact Lens Eye Exam* (After rebate)",
    geoTargeted: false,
    spanish: {
      image: SPECIAL_OFFERS_IMAGES.SO_SPANISH.CONTACT_LENS_VALUE_PACK,
      alt: "Suministro de 1 Año de Lentes de Contacto Acuvue®️Oasys®️2-Week por $149 + Examen de la Vista* para Lentes de Contacto Gratis (Después del reembolso)"
    }
  },
  {
    image: SPECIAL_OFFERS_IMAGES.SO.BOGO,
    url: "/special-offers/bogo/",
    alt: "buy 1 get one free + free eye exam all frames & lenses",
    geoTargeted: false,
    spanish: {
      image: SPECIAL_OFFERS_IMAGES.SO_SPANISH.BOGO,
      alt: "Compra uno y llevate gratis el otro par de lentes + Examen de la vista gratis",
    },
  },{
    image: SPECIAL_OFFERS_IMAGES.SO.INSURANCE,
    url: "/special-offers/insurance-offer/",
    alt: "60% off on your second pair of glasses with your insurance",
    geoTargeted: false,
    spanish: {
      image: SPECIAL_OFFERS_IMAGES.SO_SPANISH.INSURANCE,
      alt: "60% de descuento en tu segundo par de lentes con tu seguro",
    },
  },
  {
    image: SPECIAL_OFFERS_IMAGES.SO.BUY_NOW_PAY_LATER,
    url: "/special-offers/buy-now-pay-later/",
    alt: "Buy Now Pay Later with AFFIRM",
    geoTargeted: false,
    spanish: {
      image: SPECIAL_OFFERS_IMAGES.SO_SPANISH.BUY_NOW_PAY_LATER,
      alt: "Compre ahora y pague después con AFFIRM",
    },
  },
  {
    image: SPECIAL_OFFERS_IMAGES.SO.CONTACTS_VALUE_PACK,
    url: "/special-offers/cvp_biotrue/",
    alt: "Big Savings on your Contacts BioTrue",
    geoTargeted: true,
    spanish: {
      image: SPECIAL_OFFERS_IMAGES.SO_SPANISH.CONTACTS_VALUE_PACK,
      alt: "Grandes ahorros en tus lentes de contacto BioTrue",
    },
  },
  {
    image: SPECIAL_OFFERS_IMAGES.SO.REFER_A_FRIEND,
    url: "/special-offers/refer-a-friend/",
    alt: "Refer a friend and get Rewarded!",
    geoTargeted: false,
    spanish: {
      image: SPECIAL_OFFERS_IMAGES.SO_SPANISH.REFER_A_FRIEND,
      alt: "Refiere un amigo y gana recompensas",
    },
  },
  {
    image: SPECIAL_OFFERS_IMAGES.SO.PROGRESSIVES,
    url: "/special-offers/2-for-135-progressives/",
    alt: "TWO PROGRESSIVES STARTING WITH ANTIGLARE/UV AT $135",
    geoTargeted: false,
    spanish: {
      image: SPECIAL_OFFERS_IMAGES.SO_SPANISH.PROGRESSIVES,
      alt: "2 pares de lentes progresivos + Examen de la vista + Antirreflejos desde $135",
    },
  },
  {
    image: SPECIAL_OFFERS_IMAGES.SO.FRAME_CLUB,
    url: "/special-offers/frame-club/",
    alt: "Join our loyalty program Frame club",
    geoTargeted: false,
    spanish: {
      image: SPECIAL_OFFERS_IMAGES.SO_SPANISH.FRAME_CLUB,
      alt: "Unete a nuestro programa de lealtad de anteojos",
    },
  },
  {
    image: SPECIAL_OFFERS_IMAGES.SO.CONTACTS_CLUB,
    url: "/special-offers/contacts-club/",
    alt: "Best offers at the contacts clubs!",
    geoTargeted: true,
    spanish: {
      image: SPECIAL_OFFERS_IMAGES.SO_SPANISH.CONTACTS_CLUB,
      alt: "Unete a nuestro programa de lealtad de lentes de contacto",
    },
  },
  {
    image: SPECIAL_OFFERS_IMAGES.SO.MILITARY_DISCOUNT,
    url: "/special-offers/military-discount/",
    alt: "Huge Military Discounts at our stores!",
    geoTargeted: false,
    spanish: {
      image: SPECIAL_OFFERS_IMAGES.SO_SPANISH.MILITARY_DISCOUNT,
      alt: "Grandes descuentos para nuestras fuerzas armadas en las tiendas",
    },
  },
];

export const SO_SPECIAL_OFFERS_PAGES: Record<string, ISpecial_Offer_Page> = {
  "2-for-79-same-day": {
    image_mobile: SPECIAL_OFFERS_IMAGES.SO.TWO_FOR_79_SAME_DAY_BANNERS.MOBILE,
    image_mobile_es:
      SPECIAL_OFFERS_IMAGES.SO_SPANISH.TWO_FOR_79_SAME_DAY_BANNERS.MOBILE,
    image: SPECIAL_OFFERS_IMAGES.SO.TWO_FOR_79_SAME_DAY_BANNERS.DESKTOP,
    image_es:
      SPECIAL_OFFERS_IMAGES.SO_SPANISH.TWO_FOR_79_SAME_DAY_BANNERS.DESKTOP,
    alt: "2 Pair of Glasses + Free Eye Exam + antiglare/UV lens upgrade + same-day service $79",
    imageIsClickable: true,
    imageClickRoute: "/book-eye-exam",
    content: `<h1 style="font: 600 clamp(30px, 2.5vw, 32px) 'Recoleta'; color: #54565A;">Catch the Important Details</h1><p style="font-size: 16px; line-height: 25px; color: #54565A">Word on the street’s that Stanton Optical is your one-stop-eye-shop for same-day service.</p><p style="font-size: 16px; line-height: 25px; color: #54565A">Don’t wait for a criminal amount of time to upgrade your prescription. Walk-in to Stanton Optical and get Two Pairs of Glasses for ONLY $79 + FREE Eye Exam* today. Includes anti-glare lenses on both pairs, PLUS single-vision glasses are made on the spot, thanks to our on-site labs. Allowing you to get in and out with both pairs, all same-day!</p>`,
    content_es: `<h1 style="font: 600 clamp(30px, 2.5vw, 32px) 'Recoleta'; color: #54565A;">Captura Los Detalles Importantes</h1><p style="font-size: 16px; line-height: 25px; color: #54565A">Hay quienes dicen que Stanton Optical es el único que necesitas para recibir servicio completo de la vista el mismo día.</p><p style="font-size: 16px; line-height: 25px; color: #54565A">No esperes una cantidad criminal de tiempo para actualizar su receta. Visita Stanton Optical y recibe dos pares de gafas por SOLO $79 + examen de la vista GRATIS*, hoy mismo. Incluye lentes antirreflejos en ambos pares, ADEMÁS las gafas monofocales se fabrican ahí mismo, gracias a nuestros laboratorios en la tienda. De esa manera, podrás entrar y salir con ambos pares el mismo día.</p>`,
    disclaimer: `*Valid on blue tag frames with single-vision plastic lenses and standard anti-glare. Cannot be combined with other offers, savings plans, or insurance. Additional services or upgrades may change price of offer. Customer will be charged for the cost of the eye exam and will receive a credit applied to customer’s retail purchase (up to the total purchase price) for the value of the eye exam. Eye exams are provided by independent doctors of optometry or ophthalmology. Stanton Optical® does not perform eye exams. Offer valid in-store only.`,
    disclaimer_es: `*Válido en marcos de etiqueta azul con lentes plásticos monofocales y lentes antirreflejantes estándar. No se puede combinar con otras ofertas, planes de ahorros, o seguros de la vista. Los servicios adicionales o los upgrades pueden cambiar el precio de la oferta. Se le cobrará al cliente el costo del examen de la vista y recibirá un crédito aplicado a la compra al por menor del cliente (hasta el precio total de compra) por el valor del examen de la vista. Stanton Optical® no realiza exámenes de la vista. Los exámenes de la vista son provistos por médicos independientes de optometría u oftalmología. Oferta válida solo en la tienda.`,
    cta: "BOOK EYE EXAM",
    cta_es: "HAZ TU CITA",
    ctaRoute: "/book-eye-exam/",
    meta: {
      title: "SPECIAL_OFFERS/2-FOR-79-SAME-DAY.META.TITLE",
      description:
        "Two complete pairs of glasses, FREE eye exam, quality frames, and anti-glare/UV lenses. Plus, with our on-site labs, we can make your glasses on the spot.",
    },
  },
  "contact-lens-value-pack": {
    image_mobile: SPECIAL_OFFERS_IMAGES.SO.CONTACT_LENS_VALUE_PACK_BANNERS.MOBILE,
    image_mobile_es: SPECIAL_OFFERS_IMAGES.SO_SPANISH.CONTACT_LENS_VALUE_PACK_BANNERS.MOBILE,
    image: SPECIAL_OFFERS_IMAGES.SO.CONTACT_LENS_VALUE_PACK_BANNERS.DESKTOP,
    image_es: SPECIAL_OFFERS_IMAGES.SO_SPANISH.CONTACT_LENS_VALUE_PACK_BANNERS.DESKTOP,
    imageIsClickable: false,
    imageClickRoute: "",
    alt: "Contact Lens Mega Deals",
    content: `
<style>.cta{width:fit-content;margin-inline:auto;display:flex;align-items:center;gap:.5rem;font:400 1rem/19px Roboto,serif;letter-spacing:.5px;color:#13111a;background-color:#f98300;padding:11px 25px;border-radius:14px;text-transform:uppercase}.cta:is(:hover,:focus-visible){background-color:#cc6f07}.contacts{margin-top:2rem;display:flex;flex-wrap:wrap;justify-content:center;column-gap:1rem;row-gap:2rem}.contact{flex:0 0 20rem;display:grid;grid-template-rows:1fr auto auto}.contact__img,.img{display:block;width:100%;height:auto}.contact__description{font-size:18px;color:#54565a}.contact__highlight,.highlight{color:#fa8302;font-weight:700}.megadeal-img{display:block;width:100%;height:auto;max-width:400px;margin-inline:auto}@media screen and (min-width:768px){.megadeal-img{max-width:unset;margin-inline:unset}}</style><h1 style="font:600 32px/35px Recoleta;color:#55565a">Contact Lens Mega Deals</h1><p style=font-size:20px;color:#54565a;line-height:1.3><strong>1-YEAR SUPPLY OF ACUVUE<sup>®</sup> OASYS<sup>®</sup> 2-WEEK FOR</strong> <span class=highlight><sup>$</sup></span>149<br><span class=highlight>+ FREE</span> CONTACT LENS EYE EXAM* — A TOTAL SAVINGS OF <sup>$</sup>334<br><span style=font-weight:300>(After rebate)</span><p style=font-size:17px;color:#54565a>Stanton Optical is home to the best contact lenses, including ACUVUE<sup>®</sup> OASYS™ with HYDRACLEAR™ PLUS, which features a revolutionary new lens material that offers high oxygen transmissibility that delivers a higher volume of moisture-rich wetting agents.<p style=font-size:17px;color:#54565a>Additional savings include the Acuvue Oasys 24-pk for Astigmatism users at $298, saving you $371.<p style=font-size:17px;color:#54565a>Save your receipt to claim your rebate after purchase by visiting <a href=https://www.acuvue.com/myacuvue-rewards-benefits rel="noopener noreferrer"style=color:#0093ff target=_blank>https://www.acuvue.com/myacuvue-rewards-benefits</a>.</p><a href=/book-eye-exam rel="noopener noreferrer"style=margin-top:2.5rem target=_blank class=cta><span>Book Eye Exam</span> <svg fill=none height=18 viewBox="0 0 17 18"width=17><path d="M8.19259 6.76192C8.62631 7.1584 8.62631 7.8416 8.19259 8.23808L1.67471 14.1963C1.03298 14.783 2.39968e-07 14.3277 2.77973e-07 13.4582L7.98859e-07 1.54176C8.36864e-07 0.672308 1.03298 0.217047 1.67471 0.803674L8.19259 6.76192Z"fill=#010101></path></svg></a><h2 style="margin-top:2.5rem;font:600 32px/40px Recoleta;color:#55565a">Save On All Your Favorite Brands</h2><section class=contacts><div class=contact><image alt="BIOTRUE<sup>®</sup> 1-DAY SPHERE"class=contact__img src=https://dam.nowoptics.net/transform/a6484a2d-a1c8-457b-9255-90d3da5b59e1/1994_Q2_ContactsMegaDeal_LandingPage_B-LBioTrue><p style=margin:0;margin-top:1rem class=contact__description><span class=contact__highlight>BIOTRUE<sup><sup>®</sup></sup></span> <strong>1-DAY SPHERE</strong><br>90-DAY SUPPLY<br><span class=contact__highlight>+</span> <strong>FREE</strong> CONTACT LENS EYE EXAM* FOR ONLY <sup class=contact__highlight>$</sup><strong>149</strong>   </p><a href=/product/bo90-biotrue-oneday/ rel="noopener noreferrer"style=margin-top:2rem target=_blank class=cta><span>Shop Now</span> <svg fill=none height=18 viewBox="0 0 17 18"width=17><path d="M8.19259 6.76192C8.62631 7.1584 8.62631 7.8416 8.19259 8.23808L1.67471 14.1963C1.03298 14.783 2.39968e-07 14.3277 2.77973e-07 13.4582L7.98859e-07 1.54176C8.36864e-07 0.672308 1.03298 0.217047 1.67471 0.803674L8.19259 6.76192Z"fill=#010101></path></svg></a></div><div class=contact><image alt="1-YEAR SUPPLY OF ULTRA<sup>®</sup>"class=contact__img src=https://dam.nowoptics.net/transform/100b5f8b-484d-441c-9891-a234e9d3fabb/1994_Q2_ContactsMegaDeal_LandingPage_B-LUltra><p style=margin:0;margin-top:1rem class=contact__description><strong>1-YEAR SUPPLY OF</strong> <span class=contact__highlight>ULTRA<sup><sup>®</sup></sup></span><br><span style=font-weight:300;font-size:15px>Monthly Contact Lenses</span><br>FOR <span class=contact__highlight><sup>$</sup></span><strong>152</strong><br><span style=font-weight:300;font-size:15px>(After savings)</span><br><span class=contact__highlight>+</span> <strong>FREE</strong> CONTACT LENS EYE EXAM*</p><a href=/product/ul6-ultra/ rel="noopener noreferrer"style=margin-top:2rem target=_blank class=cta><span>Shop Now</span> <svg fill=none height=18 viewBox="0 0 17 18"width=17><path d="M8.19259 6.76192C8.62631 7.1584 8.62631 7.8416 8.19259 8.23808L1.67471 14.1963C1.03298 14.783 2.39968e-07 14.3277 2.77973e-07 13.4582L7.98859e-07 1.54176C8.36864e-07 0.672308 1.03298 0.217047 1.67471 0.803674L8.19259 6.76192Z"fill=#010101></path></svg></a></div><div class=contact><image alt="1-YEAR SUPPLY OF ULTRA<sup>®</sup>"class=contact__img src=https://dam.nowoptics.net/transform/6c5053ef-8484-4777-9113-a251997a1f8c/1994_Q2_ContactsMegaDeal_LandingPage_Clariti><p style=margin:0;margin-top:1rem class=contact__description>3-MONTH SUPPLY OF<br><span class=contact__highlight>CLARITI<sup><sup>®</sup></sup></span> <strong>1-DAY FOR <span class=contact__highlight><sup>$</sup></span>159.<sup>98</sup></strong><br><span style=font-weight:300;font-size:15px>(After rebate)</span><br><span class=contact__highlight>+</span> <strong>FREE</strong> CONTACT LENS EYE EXAM*</p><a href=/product/cl90-clariti-1-day/ rel="noopener noreferrer"style=margin-top:2rem target=_blank class=cta><span>Shop Now</span> <svg fill=none height=18 viewBox="0 0 17 18"width=17><path d="M8.19259 6.76192C8.62631 7.1584 8.62631 7.8416 8.19259 8.23808L1.67471 14.1963C1.03298 14.783 2.39968e-07 14.3277 2.77973e-07 13.4582L7.98859e-07 1.54176C8.36864e-07 0.672308 1.03298 0.217047 1.67471 0.803674L8.19259 6.76192Z"fill=#010101></path></svg></a></div><div class=contact><image alt="6-MONTH SUPPLY OF 1-DAY ACUVUE<sup>®</sup> MOIST<sup>®</sup>"class=contact__img src=https://dam.nowoptics.net/transform/ef9c6e2f-0a7f-4bce-9e69-56fef89957a7/1994_Q2_ContactsMegaDeal_LandingPage_Acuvue><p style=margin:0;margin-top:1rem class=contact__description>6-MONTH SUPPLY OF 1-DAY<br><span class=contact__highlight>ACUVUE<sup><sup>®</sup></sup> MOIST<sup><sup>®</sup></sup></span><br>FOR <strong><span class=contact__highlight><sup>$</sup></span>317.<sup>16</sup></strong><br><span style=font-weight:300;font-size:15px>(After rebate)</span><br><span class=contact__highlight>+</span> <strong>FREE</strong> CONTACT LENS EYE EXAM*</p><a href=/product/a1m9-1-day-acuvue-moist/ rel="noopener noreferrer"style=margin-top:2rem target=_blank class=cta><span>Shop Now</span> <svg fill=none height=18 viewBox="0 0 17 18"width=17><path d="M8.19259 6.76192C8.62631 7.1584 8.62631 7.8416 8.19259 8.23808L1.67471 14.1963C1.03298 14.783 2.39968e-07 14.3277 2.77973e-07 13.4582L7.98859e-07 1.54176C8.36864e-07 0.672308 1.03298 0.217047 1.67471 0.803674L8.19259 6.76192Z"fill=#010101></path></svg></a></div><div class=contact><image alt="6-MONTH SUPPLY OF 1-DAY ACUVUE<sup>®</sup> MOIST<sup>®</sup>"class=contact__img src=https://dam.nowoptics.net/transform/47bbc09b-a7b7-4edb-8228-c20bb976235f/1994_Q2_ContactsMegaDeal_LandingPage_BiofinityToric><p style=margin:0;margin-top:1rem class=contact__description>1-YEAR SUPPLY OF<br><span class=contact__highlight>BIOFINITY<sup><sup>®</sup></sup> TORIC</span><br>FOR <strong><span class=contact__highlight><sup>$</sup></span>279.<sup>57</sup></strong><br><span style=font-weight:300;font-size:15px>(After rebate)</span><br><span class=contact__highlight>+</span> <strong>FREE</strong> CONTACT LENS EYE EXAM*</p><a href=/product/bft-biofinity-toric/ rel="noopener noreferrer"style=margin-top:2rem target=_blank class=cta><span>Shop Now</span> <svg fill=none height=18 viewBox="0 0 17 18"width=17><path d="M8.19259 6.76192C8.62631 7.1584 8.62631 7.8416 8.19259 8.23808L1.67471 14.1963C1.03298 14.783 2.39968e-07 14.3277 2.77973e-07 13.4582L7.98859e-07 1.54176C8.36864e-07 0.672308 1.03298 0.217047 1.67471 0.803674L8.19259 6.76192Z"fill=#010101></path></svg></a></div></section><a href=/book-eye-exam rel="noopener noreferrer"style=display:block;margin-top:3rem target=_blank><picture><source media="(min-width: 768px)"srcset=https://dam.nowoptics.net/transform/d835e086-04fa-4809-9330-28bada91d4af/1994_Q2_ContactsMegaDeal_LandingPage_Footer_Desktop_ENG><image alt="Don’t forget your back-up pair of glasses!"class=megadeal-img src=https://dam.nowoptics.net/transform/6b03626a-7dd9-42f1-abf4-d22256a40caa/1994_Q2_ContactsMegaDeal_LandingPage_Footer_Mobile_ENG></picture></a>
    `,
    content_es: `
<style>.cta{width:fit-content;margin-inline:auto;display:flex;align-items:center;gap:.5rem;font:400 1rem/19px Roboto,serif;letter-spacing:.5px;color:#13111a;background-color:#f98300;padding:11px 25px;border-radius:14px;text-transform:uppercase}.cta:is(:hover,:focus-visible){background-color:#cc6f07}.contacts{margin-top:2rem;display:flex;flex-wrap:wrap;justify-content:center;column-gap:1rem;row-gap:2rem}.contact{flex:0 0 20rem;display:grid;grid-template-rows:1fr auto auto}.contact__img,.img{display:block;width:100%;height:auto}.contact__description{font-size:18px;color:#54565a}.contact__highlight,.highlight{color:#fa8302;font-weight:700}.megadeal-img{display:block;width:100%;height:auto;max-width:400px;margin-inline:auto}@media screen and (min-width:768px){.megadeal-img{max-width:unset;margin-inline:unset}}</style><h1 style="font:600 32px/35px Recoleta;color:#55565a">Mega Ofertas En Lentes De Contacto</h1><p style=font-size:20px;color:#54565a;line-height:1.3><strong>SUMINISTRO DE 1 AÑO DE LENTES DE CONTACTO ACUVUE<sup>®️</sup> OASYS<sup>®️</sup> 2-WEEK POR</strong> <span class=highlight><sup>$</sup></span>149<br><span class=highlight>+</span> EXAMEN DE LA VISTA* PARA LENTES DE CONTACTO <span class=highlight>GRATIS</span> — UN DESCUENTO TOTAL DE <sup>$</sup>334.<br><span style=font-weight:300>(Después del reembolso)</span><p style=font-size:17px;color:#54565a>Stanton Optical es el hogar de los mejores lentes de contacto, incluyendo ACUVUE<sup>®</sup> OASYS™ con HYDRACLEAR™ PLUS, que cuenta con un nuevo y revolucionario material de lente que ofrece una alta transmisibilidad de oxígeno con un mayor volumen de agentes humectantes.<p style=font-size:17px;color:#54565a>Ahorros adicionales incluyen el Acuvue Oasys 24-pk para usuarios con Astigmatismo a $298, ahorrándote $371.<p style=font-size:17px;color:#54565a>Guarda tu recibo para reclamar tu reembolso después de comprar, al visitar <a href=https://www.acuvue.com/myacuvue-rewards-benefits rel="noopener noreferrer"style=color:#0093ff target=_blank>https://www.acuvue.com/myacuvue-rewards-benefits</a>.</p><a href=/book-eye-exam rel="noopener noreferrer"style=margin-top:2.5rem target=_blank class=cta><span>Haz Tu Cita</span> <svg fill=none height=18 viewBox="0 0 17 18"width=17><path d="M8.19259 6.76192C8.62631 7.1584 8.62631 7.8416 8.19259 8.23808L1.67471 14.1963C1.03298 14.783 2.39968e-07 14.3277 2.77973e-07 13.4582L7.98859e-07 1.54176C8.36864e-07 0.672308 1.03298 0.217047 1.67471 0.803674L8.19259 6.76192Z"fill=#010101></path></svg></a><h2 style="margin-top:2.5rem;font:600 32px/40px Recoleta;color:#55565a">Ahorra en Todas tus Marcas Favoritas</h2><section class=contacts><div class=contact><image alt="BIOTRUE<sup>®</sup> 1-DAY SPHERE"class=contact__img src=https://dam.nowoptics.net/transform/a6484a2d-a1c8-457b-9255-90d3da5b59e1/1994_Q2_ContactsMegaDeal_LandingPage_B-LBioTrue><p style=margin:0;margin-top:1rem class=contact__description>SUMINISTRO DE 90 DÍAS <span class=contact__highlight>BIOTRUE<sup>®</sup></span><br><strong>1-DAY SPHERE</strong><br><span class=contact__highlight>+</span> EXAMEN DE LA VISTA* <strong>GRATIS</strong> POR SOLO <span class=contact__highlight><sup>$</sup></span><strong>149</strong>   </p><a href=/product/bo90-biotrue-oneday/ rel="noopener noreferrer"style=margin-top:2rem target=_blank class=cta><span>Comprar ahora</span> <svg fill=none height=18 viewBox="0 0 17 18"width=17><path d="M8.19259 6.76192C8.62631 7.1584 8.62631 7.8416 8.19259 8.23808L1.67471 14.1963C1.03298 14.783 2.39968e-07 14.3277 2.77973e-07 13.4582L7.98859e-07 1.54176C8.36864e-07 0.672308 1.03298 0.217047 1.67471 0.803674L8.19259 6.76192Z"fill=#010101></path></svg></a></div><div class=contact><image alt="1-YEAR SUPPLY OF ULTRA<sup>®</sup>"class=contact__img src=https://dam.nowoptics.net/transform/100b5f8b-484d-441c-9891-a234e9d3fabb/1994_Q2_ContactsMegaDeal_LandingPage_B-LUltra><p style=margin:0;margin-top:1rem class=contact__description><strong>SUMINISTRO DE 1 AÑO DE</strong><br>LENTES DE CONTACTO <span class=contact__highlight>ULTRA<sup>®</sup></span> MONTHLY<br>POR <span class=contact__highlight><sup>$</sup></span><strong>152</strong> <span style=font-weight:300;font-size:15px>(Después del descuento)</span><br><span class=contact__highlight>+</span> EXAMEN DE LA VISTA*<br>PARA LENTES DE CONTACTO <strong>GRATIS</strong></p><a href=/product/ul6-ultra/ rel="noopener noreferrer"style=margin-top:2rem target=_blank class=cta><span>Comprar ahora</span> <svg fill=none height=18 viewBox="0 0 17 18"width=17><path d="M8.19259 6.76192C8.62631 7.1584 8.62631 7.8416 8.19259 8.23808L1.67471 14.1963C1.03298 14.783 2.39968e-07 14.3277 2.77973e-07 13.4582L7.98859e-07 1.54176C8.36864e-07 0.672308 1.03298 0.217047 1.67471 0.803674L8.19259 6.76192Z"fill=#010101></path></svg></a></div><div class=contact><image alt="1-YEAR SUPPLY OF ULTRA<sup>®</sup>"class=contact__img src=https://dam.nowoptics.net/transform/c04f7815-7818-4995-8908-a9a1a2da4f81/1994_Q2_ContactsMegaDeal_LandingPage_Clariti_SPA><p style=margin:0;margin-top:1rem class=contact__description>SUMINISTRO DE 3-MESES DE<br><span class=contact__highlight>CLARITI<sup>®</sup></span> <strong>1-DAY POR <span class=contact__highlight><sup>$</sup></span>159.<sup>98</sup></strong><br><span style=font-weight:300;font-size:15px>(Después del reembolso)</span><br><span class=contact__highlight>+</span> EXAMEN DE LA VISTA*<br>PARA LENTES DE CONTACTO <strong>GRATIS</strong></p><a href=/product/cl90-clariti-1-day/ rel="noopener noreferrer"style=margin-top:2rem target=_blank class=cta><span>Comprar ahora</span> <svg fill=none height=18 viewBox="0 0 17 18"width=17><path d="M8.19259 6.76192C8.62631 7.1584 8.62631 7.8416 8.19259 8.23808L1.67471 14.1963C1.03298 14.783 2.39968e-07 14.3277 2.77973e-07 13.4582L7.98859e-07 1.54176C8.36864e-07 0.672308 1.03298 0.217047 1.67471 0.803674L8.19259 6.76192Z"fill=#010101></path></svg></a></div><div class=contact><image alt="6-MONTH SUPPLY OF 1-DAY ACUVUE<sup>®</sup> MOIST<sup>®</sup>"class=contact__img src=https://dam.nowoptics.net/transform/ef9c6e2f-0a7f-4bce-9e69-56fef89957a7/1994_Q2_ContactsMegaDeal_LandingPage_Acuvue><p style=margin:0;margin-top:1rem class=contact__description>SUMINISTRO DE 6-MESES DE 1-DAY<br><span class=contact__highlight>ACUVUE<sup>®</sup> MOIST<sup>®</sup></span><br>POR <span class=contact__highlight><sup>$</sup></span><strong>317.<sup>16</sup></strong><br><span style=font-weight:300;font-size:15px>(Después del reembolso)</span><br><span class=contact__highlight>+</span> EXAMEN DE LA VISTA*<br>PARA LENTES DE CONTACTO <strong>GRATIS</strong></p><a href=/product/a1m9-1-day-acuvue-moist/ rel="noopener noreferrer"style=margin-top:2rem target=_blank class=cta><span>Comprar ahora</span> <svg fill=none height=18 viewBox="0 0 17 18"width=17><path d="M8.19259 6.76192C8.62631 7.1584 8.62631 7.8416 8.19259 8.23808L1.67471 14.1963C1.03298 14.783 2.39968e-07 14.3277 2.77973e-07 13.4582L7.98859e-07 1.54176C8.36864e-07 0.672308 1.03298 0.217047 1.67471 0.803674L8.19259 6.76192Z"fill=#010101></path></svg></a></div><div class=contact><image alt="6-MONTH SUPPLY OF 1-DAY ACUVUE<sup>®</sup> MOIST<sup>®</sup>"class=contact__img src=https://dam.nowoptics.net/transform/47bbc09b-a7b7-4edb-8228-c20bb976235f/1994_Q2_ContactsMegaDeal_LandingPage_BiofinityToric><p style=margin:0;margin-top:1rem class=contact__description>SUMINISTRO DE 1-AÑO DE<br><span class=contact__highlight>BIOFINITY<sup>®</sup> TORIC</span><br>POR <strong><span class=contact__highlight><sup>$</sup></span>279.<sup>57</sup></strong><br><span style=font-weight:300;font-size:15px>(Después del reembolso)</span><br><span class=contact__highlight>+</span> EXAMEN DE LA VISTA*<br>PARA LENTES DE CONTACTO <strong>GRATIS</strong></p><a href=/product/bft-biofinity-toric/ rel="noopener noreferrer"style=margin-top:2rem target=_blank class=cta><span>Comprar ahora</span> <svg fill=none height=18 viewBox="0 0 17 18"width=17><path d="M8.19259 6.76192C8.62631 7.1584 8.62631 7.8416 8.19259 8.23808L1.67471 14.1963C1.03298 14.783 2.39968e-07 14.3277 2.77973e-07 13.4582L7.98859e-07 1.54176C8.36864e-07 0.672308 1.03298 0.217047 1.67471 0.803674L8.19259 6.76192Z"fill=#010101></path></svg></a></div></section><a href=/book-eye-exam rel="noopener noreferrer"style=display:block;margin-top:3rem target=_blank><picture><source media="(min-width: 768px)"srcset=https://dam.nowoptics.net/transform/80d11bda-e3f3-4c9a-b1e7-7d567f316f82/1994_Q2_ContactsMegaDeal_LandingPage_Footer_Desktop_SPA><image alt="Don’t forget your back-up pair of glasses!"class=megadeal-img src=https://dam.nowoptics.net/transform/ae7620e7-2c1d-4f60-a7a3-35a9c31bfcd0/1994_Q2_ContactsMegaDeal_LandingPage_Footer_Mobile_SPA></picture></a>
    `,
    disclaimer: `
      <p style="text-align: left;"><strong>Annual Supply of Acuvue<sup>®️</sup>Oasys<sup>®️</sup>2-Week:</strong> Save $334 on Acuvue<sup>®</sup> Oasys<sup>®</sup> 2-week Annual Supply 24-Pack PLUS Free Contact Lens Eye Exam (after manufacturer rebate and contact lens eye exam savings of $109 ). Receive two 24-pack boxes (24 lenses per box), one year supply, of Acuvue<sup>®</sup> Oasys<sup>®</sup> 2-week for $149 after $224.75 instant savings and rebate. The MFR rebate is $150 and the instant savings is $74.75. OR one year supply (8 boxes) of Acuvue<sup>®</sup> Oasys<sup>®</sup> 2-week for Astigmatism for $298 after $261.98 instant savings and rebate. The MFR rebate is $150 and the instant savings is $112.00. Cannot be combined with other offers, savings plans or insurance.  Eye exams are provided by independent doctors of optometry or ophthalmology. Stanton Optical<sup>®️</sup> does not perform eye exams. Contact lenses are not for sale in Arkansas. For manufacturer rebate details please visit <a href="https://www.acuvue.com/myacuvue-rewards-benefits" target="_blank" rel="noopener noreferrer" style="color: #0163FF;">https://www.acuvue.com/myacuvue-rewards-benefits</a>. Offer valid in-store only for new wearers through 6/30/2025. <strong>BioTrue<sup>®️</sup> 1-Day Sphere 90-Day Supply:</strong> *Contact Lens Value Pack includes a 90-day supply of BAUSCH + LOMB<sup>®</sup> BioTrue<sup>®</sup> 1 day (Sphere, or Astigmatism) contact lenses. Cannot be combined with other offers, savings plans or insurance. Eye exams are provided by independent doctors of optometry or ophthalmology. Stanton Optical<sup>®</sup> does not perform eye exams. Contact lenses not for sale in Arkansas. Offer valid in-store only through 6/30/2025. <strong>Annual Supply of Bausch + Lomb ULTRA<sup>®️</sup> Monthly Contact Lenses:</strong>  +Comfort Survey on ULTRA<sup>®️</sup> contact lens wearers (n= 529). *Save $247 on an Annual Supply of Bausch + Lomb ULTRA<sup>®️</sup> (after savings and contact lens eye exam savings of $109): Receive four boxes (6-pack box), one year supply, of Bausch + Lomb ULTRA<sup>®️</sup> for $152 after $138 in instant savings. Cannot be combined with other offers, savings plans or insurance. Eye exams are provided by independent doctors of optometry or ophthalmology. Stanton Optical<sup>®️</sup> does not perform eye exams. Contact lenses are not for sale in Arkansas. Offer valid in-store only through 12/31/2025. <strong>3-Month Supply of Clariti 1-Day:</strong> Save $159 on Clariti 1-day PLUS Free Contact Lens Eye Exam (after manufacturer rebate and contact lens eye exam savings of $109). Receive (2) 90-Packs three month supply, of Clariti 1-day Sphere for $159.98 after $50.00 manufacturer mail-in rebate when you switch from any 2-week or monthly contact lenses. Cannot be combined with other offers, savings plans or insurance. Eye exams are provided by independent doctors of optometry or ophthalmology. Stanton Optical<sup>®️</sup> does not perform eye exams. Contact lenses are not for sale in Arkansas. For manufacturer rebate details please visit <a href="https://coopervisionpromotions.com" target="_blank" rel="noopener noreferrer" style="color: #0163FF;">https://coopervisionpromotions.com</a>. Offer valid through 6/30/2025. <strong>6-Month Supply of 1-Day Acuvue<sup>®️</sup> Moist<sup>®️</sup>:</strong> Save $199.80 on 6-month supply of 1-Day Acuvue<sup>®</sup> Moist<sup>®</sup> Sphere (after manufacturer rebate and contact lens eye exam savings of $109). Receive four 90-pack boxes (6-month supply) of 1-Day Acuvue<sup>®️</sup> Moist<sup>®️</sup> and a contact lens exam for $317.16 after $50 manufacturer mail-in rebate and instant savings of $40.80. Cannot be combined with other offers, savings plans or insurance. Eye exams are provided by independent doctors of optometry or ophthalmology. Stanton Optical<sup>®️</sup> does not perform eye exams. Contact lenses are not for sale in Arkansas.  Offer valid through 6/30/2025.  <strong>Annual Supply of Biofinity<sup>®️</sup> Toric:</strong> Save $241.39 on an annual supply of Biofinity<sup>®</sup> Toric (after savings, manufacturer rebate and contact lens eye exam savings of $109). Receive four 6-pack boxes (1-year supply) of  Biofinity<sup>®</sup> Toric Plus and a contact lens exam for $279.57 after $50.00 manufacturer mail-in rebate and instant savings of $82.39. Cannot be combined with other offers, savings plans or insurance. Eye exams are provided by independent doctors of optometry or ophthalmology. Stanton Optical<sup>®️</sup> does not perform eye exams. Contact lenses are not for sale in Arkansas.  Offer valid through 6/30/2025.</p>
    `,
    disclaimer_es: `
      <p style="text-align: left;"><strong>Suministro de 1 Año de Lentes de Contacto Acuvue<sup>®️</sup> Oasys<sup>®️</sup> 2-Week:</strong> Ahorra $334 en el suministro anual de Acuvue<sup>®</sup> Oasys<sup>®</sup> 2-Week Paquete de 24 MÁS un examen de la vista para lentes de contacto gratis (después del reembolso del fabricante y el ahorro de $109 en el examen de la vista para lentes de contacto). Recibe dos cajas de 24 paquetes (24 lentes por caja), suministro para un año, de Acuvue<sup>®</sup> Oasys<sup>®</sup> 2-Week por $149 después del reembolso instantaneo de $224.75 El reembolso MFR es de $150 y el ahorro instantáneo es de $74.75. O un suministro de un año (8 cajas) de Acuvue<sup>®</sup> Oasys<sup>®</sup> 2-Week para Astigmatismo por $298 después de un reembolso instantaneo de $261.98. El reembolso MFR es de $150 y el ahorro instantáneo es de $74.75. El reembolso MFR es de $150 y el ahorro instantáneo es de $112.00. No se puede combinar con otras ofertas, planes de ahorros o seguros de la vista.  Los exámenes de la vista son proporcionados por médicos independientes de optometría u oftalmología. Stanton Optical<sup>®️</sup> no realiza exámenes de la vista. Los lentes de contacto no están a la venta en Arkansas. Para más información sobre las rebajas del fabricante, visita <a href="https://www.acuvue.com/myacuvue-rewards-benefits" style="color: #3281FF;" rel="noopener noreferrer" target="_blank">https://www.acuvue.com/myacuvue-rewards-benefits</a>. Oferta válida en la tienda sólo para los nuevos usuarios hasta 6/30/2025. <strong>Suministro de 90 Días BioTrue<sup>®️</sup> 1-Day Sphere:</strong> *El paquete de lentes de contacto Value Pack incluye un suministro de 90 días de lentes de contacto BAUSCH + LOMB<sup>®</sup> BioTrue<sup>®</sup> 1-Day (Sphere, o para Astigmatismo). No se puede combinar con otras ofertas, planes de ahorros o seguros de la vista. Los exámenes de la vista son proporcionados por médicos independientes de optometría u oftalmología. Stanton Optical<sup>®</sup> no realiza exámenes de la vista. Las lentes de contacto no están a la venta en Arkansas. Oferta válida sólo en la tienda hasta el 6/30/2025. <strong>Suministro Anual de lentes de contacto Bausch + Lomb ULTRA<sup>®️</sup> Monthly:</strong>  +Encuesta de comodidad en ULTRA<sup>®️</sup> usuarios de lentes de contacto (n= 529). *Ahorra $247 en un suministro anual de Bausch + Lomb ULTRA<sup>®️</sup> (después de los ahorros y el ahorro de $109 en el examen de la vista con lentes de contacto): Recibe cuatro cajas (caja de 6 paquetes), un suministro anual, de Bausch + Lomb ULTRA<sup>®️</sup> por $152 después de $138 en ahorros instantáneos. No se puede combinar con otras ofertas, planes de ahorros o seguros. Los exámenes de la vista son proporcionados por médicos independientes de optometría u oftalmología. Stanton Optical<sup>®️</sup> no realiza exámenes de la vista. Las lentes de contacto no están a la venta en Arkansas. Oferta válida en la tienda solo hasta 12/31/2025. <strong>Suministro de 3-Meses de Clariti 1-Day:</strong> Ahorra $159 en Clariti 1-Day MÁS examen de la vista para lentes de contacto gratis (después del reembolso del fabricante y el ahorro de $109 en el examen de la vista para lentes de contacto). Recibe (2) paquetes de 90 de Clariti 1-day Sphere para tres meses por $159.98 después del reembolso por correo del fabricante de $50.00 cuando cambie de cualquier lente de contacto de dos semanas o mensual. No se puede combinar con otras ofertas, planes de ahorro o seguros. Los exámenes de la vista son proporcionados por médicos independientes de optometría u oftalmología. Stanton Optical<sup>®️</sup> no realiza exámenes de la vista. Las lentes de contacto no están a la venta en Arkansas. Para más detalles sobre las rebajas del fabricante, visite <a href="https://coopervisionpromotions.com" style="color: #3281FF;" rel="noopener noreferrer" target="_blank">https://coopervisionpromotions.com</a>. Oferta válida hasta el 6/30/2025. <strong>Suministro para 6 meses de 1-Day Acuvue<sup>®️</sup> Moist<sup>®️</sup>:</strong> Ahorre $199.80 en un suministro de 1-Day Acuvue<sup>®</sup> Moist<sup>®</sup> Sphere para 6 meses (después del reembolso del fabricante y el ahorro de $109 en el examen de lentes de contacto). Reciba cuatro cajas de 90 paquetes (suministro para 6 meses) de 1-Day Acuvue<sup>®️</sup> Moist<sup>®️</sup> y un examen de lentes de contacto por $317.16 después del reembolso por correo del fabricante de $50 y ahorros instantáneos de $40.80. No se puede combinar con otras ofertas, planes de ahorro o seguros. Los exámenes de la vista son proporcionados por médicos independientes de optometría u oftalmología. Stanton Optical<sup>®️</sup> no realiza exámenes de la vista. Los lentes de contacto no están a la venta en Arkansas. Oferta válida hasta el 6/30/2025. <strong>Suministro de 1-Año de Biofinity<sup>®️</sup> Toric:</strong> Ahorra $241.39 en un suministro anual de Biofinity<sup>®</sup> Toric (después de los ahorros, el reembolso del fabricante y el ahorro de $109 en el examen de lentes de contacto). Recibe cuatro paquetes de 6 cajas (suministro para 1 año) de Biofinity<sup>®</sup> Toric Plus y un examen para lentes de contacto por $279.57 después del reembolso por correo del fabricante de $50.00 y ahorros instantáneos de $82.39. No se puede combinar con otras ofertas, planes de ahorros o seguros de la vista. Los exámenes de la vista son proporcionados por médicos independientes de optometría u oftalmología. Stanton Optical<sup>®️</sup> no realiza exámenes de la vista. Los lentes de contacto no están a la venta en Arkansas. Oferta válida hasta el 6/30/2025.</p>
    `,
    cta: "",
    meta: {
      title: "SPECIAL_OFFERS/CLVP.META.TITLE",
      description: "SPECIAL_OFFERS/CLVP.META.DESCRIPTION"
    },
    ctaRoute: "",
  },
  bogo: {
    image_mobile: SPECIAL_OFFERS_IMAGES.SO.BOGO_BANNERS.MOBILE,
    image_mobile_es: SPECIAL_OFFERS_IMAGES.SO_SPANISH.BOGO_BANNERS.MOBILE,
    image: SPECIAL_OFFERS_IMAGES.SO.BOGO_BANNERS.DESKTOP,
    image_es: SPECIAL_OFFERS_IMAGES.SO_SPANISH.BOGO_BANNERS.DESKTOP,
    imageIsClickable: false,
    imageClickRoute: "",
    alt: "Buy 1, Get 1 Free + Free Eye Exam*",
    content: `<h1 style="font: normal normal 600 clamp(30px, 2.5vw, 35px) Recoleta; color: #54565A;">Double Your Options with 2 for 1</h1><p style="font-size: clamp(23px, 2.5vw, 25px); color: #54565A; max-width: 37ch; margin-inline: auto; line-height: 40px;">BUY ONE, <strong style="color: #f98300;">GET ONE FREE + FREE</strong> EYE EXAM* ON ALL FRAMES & LENSES</p><p style="font-size: 16px; line-height: 25px; color: #54565A; font-weight: 300;">Shop glasses for every occasion. Whether you want a pair for the beach and another for a night out in the town, Stanton Optical is your one-stop-eye-shop for every style and budget.</p><p style="font-size: 16px; line-height: 25px; color: #54565A; font-weight: 300;">Not sure what kind of frame you’re looking for? Browse through 1,000+ frames with our Virtual Try-On feature and find the perfect look before visiting us in-store.</p>`,
    content_es: `<h1 style="font: normal normal 600 clamp(30px, 2.5vw, 35px) Recoleta; color: #54565A;">Duplica Tus Opciones a 2 por 1</h1><p style="font-size: clamp(23px, 2.5vw, 25px); color: #54565A; max-width: 60ch; margin-inline: auto; line-height: 40px;">COMPRA UNO, <strong style="color: #f98300;">LLÉVATE UNO GRATIS</strong> + EXAMEN DE LA VISTA* <strong style="color: #f98300;">GRATIS</strong> EN TODOS LOS MARCOS Y LENTES</p><p style="font-size: 16px; line-height: 25px; color: #54565A; font-weight: 300;">Gafas para todas las ocasiones. Tanto si quieres un par para la playa como otro para salir de noche, Stanton Optical es tu tienda de gafas para todos los estilos y presupuestos.</p><p style="font-size: 16px; line-height: 25px; color: #54565A; font-weight: 300;">¿No sabes exáctamente que tipo de marco buscas? Echale un vistazo a más de 1,000 marcos con el servicio Virtual Try-On y descubre tu estilo perfecto antes de visitarnos en la tienda.</p>`,
    disclaimer: `*Purchase any pair of frames and single-vision plastic lenses at our regular price and receive a second pair of frames and lenses at equal or lesser value free. Buy 1 Get 1 free applies to frames and lenses only; additional services or upgrades will be charged separately for both pairs. Cannot be combined with other offers, savings plans, or insurance. Customer will be charged for the cost of the eye exam and will receive a credit applied to customer’s retail purchase (up to the total purchase price) for the value of the eye exam. Eye exams are provided by independent doctors of optometry or ophthalmology. Stanton Optical<sup>®</sup> does not perform eye exams. Offer valid in-store only.`,
    disclaimer_es: `*Compra cualquier par de marcos y lentes a precio regular y recibe un segundo par de marcos y lentes de igual o menor valor gratis. La oferta Compra 1 Lleva 1 Gratis aplica únicamente a marcos y lentes; el costo por servicios adicionales o upgrades serán añadidos a ambos pares por separado. No se puede combinar con otras ofertas, planes de ahorros, o seguros de la vista. Se le cobrará al cliente el costo del examen de la vista y recibirá un crédito aplicado a la compra al por menor del cliente (hasta el precio total de la compra) por el valor del examen de la vista. Los exámenes de la vista son provistos por médicos independientes de optometría u oftalmología. Stanton Optical<sup>®</sup> no realiza exámenes de la vista. Oferta válida solo en la tienda.`,
    cta: "Find a Store",
    cta_es: "Buscar Tienda",
    ctaRoute: "/schedule-exam/",
    meta: {
      title: "SPECIAL_OFFERS/BOGO.META.TITLE",
      description:
        "Buy 1 Get 1 + FREE Eye Exam! We promise to deliver expert eye care services and the highest quality products at the lowest cost to you.",
    },
  },
  "insurance-offer": {
    image_mobile: SPECIAL_OFFERS_IMAGES.SO_SPANISH.INSURANCE_BANNERS.MOBILE,
    image_mobile_es: SPECIAL_OFFERS_IMAGES.SO_SPANISH.INSURANCE_BANNERS.MOBILE,
    image: SPECIAL_OFFERS_IMAGES.SO.INSURANCE_BANNERS.DESKTOP,
    image_es: SPECIAL_OFFERS_IMAGES.SO_SPANISH.INSURANCE_BANNERS.DESKTOP,
    imageIsClickable: false,
    imageClickRoute: "",
    alt: "60% off your second pair with your insurance",
    content: `<h1 style="font-family:Recoleta">New Year, New Benefits!</h1><p style="font-size: 1.2rem;"><strong style="color: #f98300;">60% OFF</strong> SECOND PAIR WITH INSURANCE</p><p style="max-width: 110ch; margin-inline: auto;">Your 2025 savings start here, because with a new year comes renewed insurance benefits. It’s the perfect time to double up on eyewear and Save to the Max on your New Year vibes.</p>`,
    content_es: `<h1 style="font-family:Recoleta">¡Año Nuevo, Beneficios Nuevos!</h1><p style="font-size: 1.2rem;"><strong style="color: #f98300;">60% DE DESCUENTO</strong> EN TU SEGUNDO PAR CON SEGURO MÉDICO</p><p style="max-width: 110ch; margin-inline: auto;">Tus ahorros del 2025 comienzan aquí, porque con un nuevo año llegan los beneficios renovados de tu seguro médico. Es el momento perfecto para duplicar la compra de gafas y ahorrar al máximo en tu estilo del Año Nuevo.</p>`,
    disclaimer: `*Must use vision insurance to qualify for the 60% off second pair purchase. Cannot be combined with other offers. Additional services or upgrades may change price of offer. Offer valid in-store only.`,
    disclaimer_es: `*Plan de seguro visual es requerido para calificar al 60% de descuento en la compra de un segundo par. No se puede combinar con otras ofertas. Los servicios adicionales o los upgrades pueden cambiar el precio de oferta. Oferta válida solo en la tienda.`,
    cta: "Find a Store",
    cta_es: "Buscar Tienda",
    ctaRoute: "/book-eye-exam/",
    meta: {
      title: "SPECIAL_OFFERS/INSURANCE-OFFER.META.TITLE",
      description:
        "Lose the drama, not your insurance! Get a 60% off discount when using your vision insurance to pay for your glasses. Book an eye exam now!",
    },
  },
  "buy-now-pay-later": {
    image_mobile: SPECIAL_OFFERS_IMAGES.SO.BUY_NOW_PAY_LATER_PAGE_MOBILE,
    image_mobile_es:
      SPECIAL_OFFERS_IMAGES.SO_SPANISH.BUY_NOW_PAY_LATER_PAGE_MOBILE,
    image: SPECIAL_OFFERS_IMAGES.SO.BUY_NOW_PAY_LATER_PAGE,
    image_es: SPECIAL_OFFERS_IMAGES.SO_SPANISH.BUY_NOW_PAY_LATER_PAGE,
    imageIsClickable: false,
    imageClickRoute: "",
    alt: "Stanton Optical now offers AFFIRM",
    content: `<h1>Stanton Optical now offers <Image height="38" width="0" style="width:auto;height:38px" src=${SPECIAL_OFFERS_IMAGES.SO.BUY_NOW_PAY_LATER_LOGO}></h1><p>Get the frames you love. AFFIRM is the most convenient “Buy Now, Pay Over Time” flexible payment option now available at select Stanton Optical store locations</p>
              <div style='display:flex;justify-content:center;gap:2rem;'>
              <button style='border:2px solid #4A4AE7;background:white;padding:10px;border-radius:10px;width:200px;color:#4A4AE7;font-size:18px;'>As low as 0% APR</button>
              <button style='border:2px solid #4A4AE7;background:white;padding:10px;border-radius:10px;width:200px;color:#4A4AE7;font-size:18px;'>Fast approval</button>
              </div>
              <p>Pick out the eyewear of your dreams and pay in easy installments to maintain happy eyes and a healthy budget. Partnering with AFFIRM is yet another step in making eye care easy.</p>`,
    content_es: `<h1>Stanton Optical Ahora Ofrece <Image height="38" width="0" style="width:auto;height:38px" src=${SPECIAL_OFFERS_IMAGES.SO_SPANISH.BUY_NOW_PAY_LATER_LOGO}></h1><p>Llévate las gafas que más te gustan. AFFIRM es la opción de pago flexible "Compra ahora, y paga a plazos " más conveniente. Ahora disponible en determinadas tiendas Stanton Optical.</p>
                 <div style='display:flex;justify-content:center;gap:2rem;'>
                 <button style='border:2px solid #4A4AE7;background:white;padding:10px;border-radius:10px;width:200px;color:#4A4AE7;font-size:18px;'>A un mínimo de 0% APR</button>
                 <button style='border:2px solid #4A4AE7;background:white;padding:10px;border-radius:10px;width:200px;color:#4A4AE7;font-size:18px;'>Aprobación rápida</button>
                 </div>
                 <p>Cómprate las gafas de tus sueños y paga a plazos convenientes para mantener tus ojos saludables y un presupuesto controlado. Asociarse con AFFIRM es otra manera en la cual estamos facilitando el cuidado de los ojos.</p>`,
    disclaimer: `<p>Rates from 0-36% APR. Payment options through Affirm are subject to an eligibility check, may not be available everywhere, and are provided by these lending partners: <a href='https://www.affirm.com/lenders'> affirm.com/lenders</a>. Options depend on your purchase amount, and a down payment may be required. CA residents: Loans by Affirm Loan Services, LLC are made or arranged pursuant to a California Finance Lenders Law license. For licenses and disclosures, see <a href='https://www.affirm.com/licenses'>affirm.com/licenses</a>. Not available in all stores </p>`,
    disclaimer_es: `<p>Tarifas del 0 al 36% APR. Las opciones de pago a través de Affirm están sujetas a una comprobación de elegibilidad, pueden no estar disponibles en todas partes, y son proporcionadas por estos socios prestamistas: <a href='https://www.affirm.com/lenders'> affirm.com/lenders</a>. Las opciones dependen del importe de la compra y es posible que se requiera un pago inicial. Residentes de California: Los préstamos de Affirm Loan Services, LLC se realizan o gestionan de acuerdo con una licencia de la Ley de Prestamistas Financieros de California. Para obtener información sobre licencias y divulgaciones, visite <a href='https://www.affirm.com/licenses'>affirm.com/licenses</a>. No disponible en todas las tiendas.</p>`,
    cta: "Find a store",
    cta_es: "Buscar Tienda",
    ctaRoute: "/book-eye-exam/",
    meta: {
      title: "Buy Now Pay Later - Stanton Optical",
      description:
        "Stanton Optical now offers AFFIRM. Get the frames you love. AFFIRM is the most convenient “Buy Now, Pay Over Time” flexible payment option now available at select Stanton Optical store locations.",
    },
  },
  "2-for-135-progressives": {
    image_mobile: SPECIAL_OFFERS_IMAGES.SO.PROGRESSIVES_PAGE_MOBILE,
    image: SPECIAL_OFFERS_IMAGES.SO.PROGRESSIVES_PAGE,
    image_mobile_es: SPECIAL_OFFERS_IMAGES.SO_SPANISH.PROGRESSIVES_PAGE_MOBILE,
    image_es: SPECIAL_OFFERS_IMAGES.SO_SPANISH.PROGRESSIVES_PAGE_DESKTOP,
    imageIsClickable: false,
    imageClickRoute: "",
    alt: "TWO PROGRESSIVES STARTING WITH ANTIGLARE/UV AT $135",
    content: `<h1>ALL-IN-ONE, ALL FOR YOU</h1><p>We make it easy for you to get the eye care you deserve with this special bundle. Get two pairs of progressives, a <b>Free Same-Day Comprehensive Eye Exam*</b>, AND free anti-glare lenses.</p><p>Whether you’re reading, working, or driving—progressives are the all-in-one lens with everything you need. What more can you ask for? </p>`,
    content_es: `<h1>Todo-en-Uno, Solo para Ti</h1><p>Te facilitamos el cuidado de la vista que te mereces con este paquete especial. Obtén dos pares de gafas progresivas, un <b>examen de la vista* Completo el mismo día gratis y Lentes Antirreflejos gratis.</b></p><p>Ya sea para leer, trabajar o conducir, los lentes progresivos te ofrecen lo que necesitas ‘todo-en-uno’. ¿Qué más se puede pedir?</p>`,
    disclaimer: `<p>*Valid on blue tag frames with standard progressive, standard anti-glare plastic lenses. Cannot be combined with other offers or insurance. Additional services or upgrades may change price of offer. Customer will be charged for the cost of the eye exam and will receive a credit applied to customer’s retail purchase (up to the total purchase price) for the value of the eye exam. Eye exams are provided by independent doctors of optometry or ophthalmology. Stanton Optical® does not perform eye exams. Offer valid in-store only.</p>`,
    disclaimer_es: `<p>*Solo se aplica a marcos de etiqueta azul con lentes progresivos de plástico antirreflejo estándar. No se puede combinar con otras ofertas o seguro médico. Los servicios adicionales o las actualizaciones pueden cambiar el precio de la oferta. Se le cobrará al cliente el costo del examen de la vista y recibirá un crédito aplicado a la compra al por menor del cliente (hasta el precio total de la compra) por el valor del examen de la vista. Stanton Optical® no realiza exámenes de la vista. Los exámenes de la vista son proporcionados por médicos independientes de optometría u oftalmología. Oferta válida solo en tienda. </p>`,
    cta: "Book Eye Exam",
    cta_es: "Haz tu Cita Ahora",
    ctaRoute: "/book-eye-exam/",
    meta: {
      title: "SPECIAL_OFFERS/2-FOR-135-PROGRESSIVES.META.TITLE",
      description:
        "Get two pairs of progressives, an anti-glare/UV lens upgrade, and a free comprehensive eye exam. Visit us or schedule your eye exam online now!",
    },
  },
  cvp_biotrue: {
    image_mobile:
      BASE_IMAGE_URL +
      "transform/d8c16739-cb17-4d8c-b8f4-577e39508202/MKTG_22_ContactsValuePack_SO_Web_Mobile_LandingPage_copy",
    image:
      BASE_IMAGE_URL +
      "transform/ddbeb31a-12fe-4a28-9196-90d103b4ff00/MKTG_22_ContactsValuePack_SO_Web_Desktop_LandingPage_copy",
    image_es: SPECIAL_OFFERS_IMAGES.SO_SPANISH.CVP_BIOTRUE_PAGE,
    image_mobile_es: SPECIAL_OFFERS_IMAGES.SO_SPANISH.CVP_BIOTRUE_PAGE_MOBILE,
    imageIsClickable: false,
    imageClickRoute: "",
    alt: "Big Savings on your Contacts BioTrue",
    content: `<h1>A DAILY DOSE OF FRESHNESS WITH OUR CONTACT LENS VALUE PACK</h1><p>Get a 3-month supply of BioTrue 1-Day Sphere 90-day supply for only $149 now, and your eye exam is on us… plus, we’ll even give you an eyeglasses prescription at no extra cost. How’s that for value?</p><p>And if you have Astigmatism, get a 3-month supply of contacts for only $76 more.</p>`,
    content_es: `<h1>Disfruta de una Dosis Diaria Refrescante con nuestro Contact Lens Value Pack</h1><p>Obtén un suministro de 3 meses de BioTrue<sup>®</sup> 1-Day Sphere para 90 días por sólo $149 ahora, más el examen de la vista* es gratis... incluye la receta de gafas sin costo adicional. ¿Qué te parece? </p><p>Y si tienes Astigmatismo, obtén un suministro de lentes de contacto para 3 meses por sólo $76 adicionales.</p>`,
    disclaimer: `<p>*Contact lens eye exam credit is applied towards the cost of the Contact Lens Value Pack. Contact Lens Value Pack includes a 90 day supply of BAUSCH + LOMB<sup>®</sup> BioTrue<sup>®</sup> 1 day (Sphere, or Toric) contact lenses. Cannot be combined with other offers or insurance. Customer will be charged for the cost of the eye exam and will receive a credit applied to customer’s retail purchase (up to the total purchase price) for the value of the eye exam. Eye exams are provided by independent doctors of optometry or ophthalmology. Stanton Optical<sup>®</sup> does not perform eye exams. Contact lenses not for sale in AR. Offer valid in-store only.</p>`,
    disclaimer_es: `<p>*El crédito del examen de la vista para lentes de contacto se aplicará al costo del Contact Lens Value Pack. El Contact Lens Value Pack incluye suministro de 90 días de lentes de contacto BAUSCH + LOMB<sup>®️</sup> BioTrue<sup>®️</sup> 1-day (Sphere, o Toric). No se puede combinar con otras ofertas o seguros médicos. De lo contrario, el examen de la vista no tiene valor en efectivo. Los exámenes de la vista son provistos por médicos independientes de optometría u oftalmología. Stanton Optical<sup>®</sup> no realiza exámenes de la vista. Esta oferta no es válida en Arkansas. Oferta válida solo en la tienda.</p>`,
    cta: "Book Eye Exam",
    cta_es: "Haz tu Cita",
    ctaRoute: "/book-eye-exam/",
    meta: {
      title: "SPECIAL_OFFERS/CVP_BIOTRUE.META.TITLE",
      description:
        "Get a 3-month supply of BioTrue 1-Day Sphere 90-day supply for only $139 now, and your eye exam is on us. Includes Eyeglass Prescription.",
    },
  },
  "frame-club": {
    image_mobile:
      BASE_IMAGE_URL +
      "transform/4d5f8a32-d3bb-4e18-b809-1525fcaffcfc/713_MKTG_22_Frame_Club_SO_WebAssets_LP_Mobile",
    image:
      BASE_IMAGE_URL +
      "transform/67619ea9-9e59-4e12-a8e2-0d87ad61998b/713_MKTG_22_Frame_Club_SO_WebAssets_LP",
    image_mobile_es: SPECIAL_OFFERS_IMAGES.SO_SPANISH.FRAME_CLUB_PAGE_MOBILE,
    image_es: SPECIAL_OFFERS_IMAGES.SO_SPANISH.FRAME_CLUB_PAGE_DESKTOP,
    imageIsClickable: false,
    imageClickRoute: "",
    alt: "Join the Frame Club and get 4 Frames for $49",
    content: `<h1>Frame Club Benefits*</h1><p>It’s easy! Join in-store today for just $49 and receive 4 free frames a year* and 50% off lenses (including coatings and add-ons*). Plus, the free frames are transferable to your friends and family.</p><p>Locate your nearest store to purchase glasses and enroll for only $49. Now you can also redeem your benefits anytime during the year*.</p>`,
    content_es: `<h1>Beneficios del Frame Club*</h1><p>Es muy fácil. Inscríbete hoy mismo en la tienda por sólo $49 y recibe 4 marcos gratis al año* y un 50% de descuento en lentes (incluye filtros y add-ons*). Además, puedes transferirle los marcos gratis a tus amigos y familiares.</p><p>Ubica tu tienda más cercana para comprar gafas e inscríbete por sólo $49. También, ahora puedes canjear los beneficios en cualquier momento del año*.</p>`,
    disclaimer: `<p>*Frame Club provides four free frames during the annual membership. Free frame value is equal to the original frame purchase price. 50% discount on lenses, coatings and add-ons. Lenses must be purchased at the time of frame selection. Free frames are transferable to friends and family and have no cash value. Frame Club benefits are not redeemable on club members’ initial purchase or in the same transaction. Cannot be combined with other offers, discounts or insurance. Stanton Optical<sup>®</sup> may terminate this agreement at any time by refunding the prorated amount of the unused portion of the program cost. Only valid in-store.</p><p>FLORIDA RESIDENTS: the patient and any other person responsible for payment has a right to refuse to pay, cancel payment, or be reimbursed for payment of any other service, examination, or treatment that is performed as a result of and within 72 hours of responding to the advertisement for the free, discounted fee, or reduced fee service, examination, or treatment.</p>`,
    disclaimer_es: `<p>*Frame Club le da cuatro marcos gratis durante la membresía anual. El valor del marco gratis es igual al precio de compra del marco original. Un 50% de descuento será aplicado a lentes, recubrimiento de lentes y adiciones. Los lentes deben comprarse en el momento de la selección del marco. Los marcos gratis son transferibles a amigos y familiares y no tienen valor en efectivo. Los marcos gratis no se pueden redimir el día de la compra de Frame Club. No se puede combinar con otras ofertas, descuentos o seguros médicos. Stanton Optical<sup>®</sup> puede cancelar este acuerdo en cualquier momento reembolsando el monto prorrateado de la parte no utilizada del costo del programa. Solo válido en la tienda.</p><p>Residentes de Florida: el paciente y cualquier otra persona responsable por el pago tienen derecho a negarse a pagar, a cancelar el pago o a que se les reembolse el pago de cualquier otro servicio, examen o tratamiento que se realice como consecuencia del anuncio del servicio, examen o tratamiento gratuito, o de tarifa reducida y dentro de las 72 horas siguientes a la respuesta a dicho anuncio.</p>`,
    cta: "Find A Store",
    cta_es: "Buscar Tienda",
    ctaRoute: "/schedule-exam",
    meta: {
      title: "SPECIAL_OFFERS/FRAME-CLUB.META.TITLE",
      description:
        "Join our Frame Club for only $49 and get 2 frames each year for the next 2 years! You can also transfer frames to friends & family!",
    },
  },
  "contacts-club": {
    image_mobile:
      BASE_IMAGE_URL +
      "transform/a6f6b98d-e35b-4128-ae60-a35173b2729c/MKTG_717_22_Contacts_Club_LP_Mobile_Web_SO_750x400",
    image:
      BASE_IMAGE_URL +
      "transform/78c28399-0260-463f-8222-180ec66a3615/MKTG_717_22_Contacts_Club_Web_SO_LandingPage_Desktop_1366x330",
    image_mobile_es: SPECIAL_OFFERS_IMAGES.SO_SPANISH.CONTACTS_CLUB_PAGE_MOBILE,
    image_es: SPECIAL_OFFERS_IMAGES.SO_SPANISH.CONTACTS_CLUB_PAGE_DESKTOP,
    imageIsClickable: false,
    imageClickRoute: "",
    alt: "Come for the contacts, stay for the club.",
    content: `<h1>Contact Club Benefits</h1><p>Join the Contacts Club today at a store near you for <b>$20</b> and receive:</p><p>- Next year’s contact lens eye exam for <b>FREE*</b> (includes eyeglasses prescription).</p><p>- <b>20% off</b> annual or <b>10% off</b> lesser supply.</p><p>- <b>50% off</b> frames and lenses (including coatings and add ons).</p><p>That's over <b>$187</b> in savings.</p><p>Schedule your appointment and join the club today!</p>`,
    content_es: `<h1>Beneficios del Contact Club</h1><p>Únete al Contacts Club hoy mismo en tu tienda más cercana por <b>$20</b> y recibes:</p><p>- El examen de la vista para lentes de contacto del próximo año <b>GRATIS*</b>  (incluye receta de gafas)</p><p>- <b>20% de descuento </b>anual o <b>10%</b> en suministros menores</p><p>- <b>50% de descuento</b> en monturas y lentes (incluye filtros y add-ons*)</p><p>Más de <b>$187</b> en ahorros.</p><p>Haz tu cita y únete al club hoy mismo.</p>`,
    disclaimer: `<p>*Contact lens eye exam purchase required for Contacts Club membership in addition to the $20 membership fee. Membership includes one free contact lens eye exam in the second year of the plan. 20% off applied to annual contact lens purchase or 10% off lesser supply. 50% off the regular price of any frame, lens, coatings and add-ons eyeglass purchase. Customer will be charged for the cost of the eye exam and will receive a credit applied to customer’s retail purchase (up to the total purchase price) for the value of the eye exam. Eye exams are provided by independent doctors of optometry or ophthalmology. Stanton Optical<sup>®</sup> does not perform eye exams. Offer valid in-store only.</p>`,
    disclaimer_es: `<p>*Se requiere la compra de un examen de la vista de lentes de contacto para ser miembro de Contacts Club, además de la tarifa de membresía de $20. La membresía incluye un examen de la vista de lentes de contacto gratis en el segundo año del plan. 20% de descuento aplicado a la compra anual de lentes de contacto o 10% de descuento en suministros menores. Un 50% de descuento será aplicado al precio regular de la compra de cualquier marco, lente, recubrimiento de lentes y adiciones. Se le cobrará al cliente el costo del examen de la vista y recibirá un crédito aplicado a la compra al por menor del cliente (hasta el precio total de la compra) por el valor del examen de la vista. Los exámenes de la vista son provistos por médicos independientes de optometría u oftalmología. Stanton Optical<sup>®</sup> no realiza exámenes de la vista. Solo válido en la tienda.</p>`,
    cta: "Find A Store",
    cta_es: "Haz tu Cita",
    ctaRoute: "/schedule-exam",
    meta: {
      title: "SPECIAL_OFFERS/CONTACTS-CLUB.META.TITLE",
      description:
        "Join the Contacts Club today at a store near you for $20 and receive a lot of benefits with over $187 in savings. Visit our stores and join the club!",
    },
  },
  "military-discount": {
    image_mobile:
      BASE_IMAGE_URL +
      "transform/e590a080-abe0-495e-90c4-3b8e7cbabd3c/2071_WEB_23_Military_Discount_Promo_SO_Mobile",
    image_mobile_es:
      BASE_IMAGE_URL +
      "transform/40348f32-7b1c-4113-bd7b-0eebaffbde89/MilitaryDiscountProgram_OfferLandingP_M_SPA",
    image:
      BASE_IMAGE_URL +
      "transform/2f51c24e-a50a-4094-89ce-6ee0df7a2520/2071_WEB_23_Military_Discount_Promo_SO_Desktop",
    image_es:
      BASE_IMAGE_URL +
      "transform/afb67da4-7b04-427a-9c47-4fb4a7e949d6/MilitaryDiscountProgram_OfferLandingP_D_SPA",
    imageIsClickable: false,
    imageClickRoute: "",
    alt: "Military Discount Program",
    content: `<h1 style="font-family:Recoleta">Military Discount Program</h1><p>As gratitude for your service and sacrifice for our country, Stanton Optical offers an additional military discount applied to your complete order.</p>`,
    content_es: `<h1 style="font-family:Recoleta">Programa de Descuento Militar</h1><p>Como agradecimiento por su servicio y sacrificio por nuestro país, Stanton Optical te ofrece un descuento adicional a los militares, aplicado al completar tu orden.</p>`,
    disclaimer:
      DIVISION_LINE +
      `<p>*Members of the military, veterans, and their immediate families receive an additional 15% discount, only combinable with Buy One, Get One Free promotion. This discount is not valid on previous purchases. Cannot be combined with contact lens offers, eye exams, or insurance. Proof of military service is required to redeem the discount.</p>`,
    disclaimer_es:
      DIVISION_LINE +
      `<p style="text-align:center">*Integrantes de las fuerzas armadas, veteranos y sus familiares directos reciben un 15% de descuento adicional, combinable solamente con la promoción Compra 1 Llevate 1 Gratis. Este descuento no es válido en compras anteriores. No se puede combinar con ofertas de lentes de contacto, exámenes de la vista o seguros médicos. Se requiere prueba de servicio militar para canjear el descuento.</p>`,
    cta: "Find A Store",
    cta_es: "Buscar Tienda",
    ctaRoute: "/schedule-exam",
    meta: {
      title: "SPECIAL_OFFERS/MILITARY-DISCOUNT.META.TITLE",
      description:
        "As gratitude for their service and sacrifice for our country, Stanton Optical offers an additional military discount applied to their complete order.",
    },
  },
  "bausch-lomb-ultra": {} as ISpecial_Offer_Page,
  "refer-a-friend": {} as ISpecial_Offer_Page,
};
