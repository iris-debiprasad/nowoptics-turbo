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
    image: SPECIAL_OFFERS_IMAGES.SO.BOGO,
    url: "/special-offers/bogo/",
    alt: "buy 1 get one free + free eye exam all frames & lenses",
    geoTargeted: false,
    spanish: {
      image: SPECIAL_OFFERS_IMAGES.SO_SPANISH.BOGO,
      alt: "Compra uno y llevate gratis el otro par de lentes + Examen de la vista gratis",
    },
  },
  {
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
    content: `<h1 style="font-family: 'Recoleta;'">Keep Your Prescription Up To Date!</h1><p>Keeping your prescription current doesn’t just affect your safety, it could be the difference between accidentally coming back home with someone else’s pupper from doggie day camp! Upgrade your prescription with a FREE Eye Exam* when you buy Two
Pairs for JUST $79.<br /></br />Thanks to our in-store labs, single-vision glasses can be made SAME-DAY, including an Anti-glare/UV lens upgrade, providing protection from harmful UVA/UVB rays from the sun while keeping you safe from distracting glare.</p>`,
    content_es: `<h1 style="font-family: 'Recoleta;'">¡Mantén Tu Receta Al Día!</h1><p>El mantener tu receta de la vista al día no solo afecta tu seguridad; ¡podría ser hasta la diferencia entre llegar accidentalmente a casa con el cachorro de otra persona de tu visita al parque de perros! Actualiza tu receta con un Examen de la Vista* GRATIS al comprar Dos Pares por SOLO $79. <br /><br /> Gracias a nuestros laboratorios, podemos hacer gafas monofocales el MISMO DÍA, lo cual incluye un upgrade a lentes Antirreflejos/UV. Los cuales ofrecen protección a los rayos dañinos UVA/UVB, mientras te protegen de reflejos distractivos del sol.</p>`,
    disclaimer: `*Valid on blue tag frames with single-vision plastic lenses, standard anti-glare and UV. Cannot be combined with other offers or insurance. Additional services or upgrades may change price of offer. Customer will be charged for the cost of the eye exam and will receive a credit applied to customer’s retail purchase (up to the total purchase price) for the value of the eye exam. *Same-day service is only available for single-vision eyeglasses, certain prescription or product exclusions may apply. Eye exams are provided by independent doctors of optometry or ophthalmology. Stanton Optical® does not perform eye exams. Offer valid in-store only.`,
    disclaimer_es: `*Válido en marcos de etiqueta azul, con lentes plásticos monofocales, lentes antirreflejo estándar y con protección ultravioleta (UV). No se puede combinar con otras ofertas o seguros médicos. Los servicios adicionales o los upgrades pueden cambiar el precio de la oferta. Se le cobrará al cliente el costo del examen de la vista y recibirá un crédito aplicado a la compra al por menor del cliente (hasta el precio total de compra) por el valor del examen de la vista. *El servicio de mismo día está solo disponible en gafas monofocales, se pueden aplicar exclusiones de ciertas prescripciones y productos. Stanton Optical® no realiza exámenes de la vista. Los exámenes de la vista son provistos por médicos independientes de optometría u oftalmología. Oferta válida solo en la tienda.`,
    cta: "BOOK EYE EXAM",
    cta_es: "HAZ TU CITA",
    ctaRoute: "/book-eye-exam/",
    meta: {
      title: "SPECIAL_OFFERS/2-FOR-79-SAME-DAY.META.TITLE",
      description:
        "Two complete pairs of glasses, FREE eye exam, quality frames, and anti-glare/UV lenses. Plus, with our on-site labs, we can make your glasses on the spot.",
    },
  },
  bogo: {
    image_mobile: SPECIAL_OFFERS_IMAGES.SO.BOGO_BANNERS.MOBILE,
    image_mobile_es: SPECIAL_OFFERS_IMAGES.SO_SPANISH.BOGO_BANNERS.MOBILE,
    image: SPECIAL_OFFERS_IMAGES.SO.BOGO_BANNERS.DESKTOP,
    image_es: SPECIAL_OFFERS_IMAGES.SO_SPANISH.BOGO_BANNERS.DESKTOP,
    imageIsClickable: false,
    imageClickRoute: "",
    alt: "Buy 1, Get 1 Free + Free Eye Exam*",
    content: `<h1 style="font-family: 'Recoleta;'">Be Unapologetically You</h1><p style="font-size: 1.3rem;">BUY ONE, <strong style="color: #f98300;">GET ONE FREE</strong><br />ON ALL FRAMES & LENSES <strong style="color: #f98300;">+ FREE</strong> EYE EXAM*</p><p>Do you prefer a bold or sophisticated look? Maybe both? Then browse through our entire collection of 1,500+ frames and save!</p><p>This New Year, embrace timeless elegance with a pair that whispers classic sophistication and unleash your wild side with frames prime for your digital era.</p><p>Reinvent yourself twice over, and let your eyewear tell the world you're both a classic icon and a daring trendsetter.</p>`,
    content_es: `<h1 style="font-family: 'Recoleta;'">Sigue tu Propio Estilo</h1><p style="font-size: 1.3rem;">CÓMPRATE UNO, <strong style="color: #f98300;">LLÉVATE UNO GRATIS</strong><br />EN TODOS LOS MARCOS Y LENTES + EXAMEN DE LA VISTA* <strong style="color: #f98300;">GRATIS</strong></p><p>¿Prefieres un look audaz o sofisticado? ¿Quizás ambos? Échale un vistazo a nuestra colección de 1,500+ marcos y ahorra.</p><p>Este nuevo año, define tu estilo con elegancia atemporal con un par de gafas clásicas y sofisticadas o dale rienda suelta a tu lado más wild con marcos que perfectamente reflejan la era digital.</p><p>Reinvéntate doblemente y deja que tus gafas te ayuden a mostrarle al mundo que eres tanto un icono de la moda clásica, tanto como un pionero de los últimos estilos.`,
    disclaimer: `*Purchase any pair of frames and lenses at our regular price and receive a second pair of frames and lenses at equal or lesser value free. Buy 1 Get 1 free applies to frames and lenses only; additional services or upgrades will be charged separately for both pairs. Cannot be combined with other offers or insurance. Customer will be charged for the cost of the eye exam and will receive a credit applied to customer’s retail purchase (up to the total purchase price) for the value of the eye exam. Eye exams are provided by independent doctors of optometry or ophthalmology. Stanton Optical® does not perform eye exams. Offer valid in-store only`,
    disclaimer_es: `*Compra cualquier par de marcos y lentes a precio regular y recibe un segundo par de marcos y lentes de igual o menor valor gratis. La oferta Compra 1 Lleva 1 Gratis aplica únicamente a marcos y lentes; el costo por servicios adicionales o upgrades serán añadidos a ambos pares por separado. No se puede combinar con otras ofertas o seguros médicos. Se le cobrará al cliente el costo del examen de la vista y recibirá un crédito aplicado a la compra al por menor del cliente (hasta el precio total de la compra) por el valor del examen de la vista. Los exámenes de la vista son provistos por médicos independientes de optometría u oftalmología. Stanton Optical® no realiza exámenes de la vista. Oferta válida solo en la tienda.`,
    cta: "Book Eye Exam",
    cta_es: "Haz tu Cita",
    ctaRoute: "/book-eye-exam/",
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
    content: `<h1>ALL-IN-ONE, ALL FOR YOU</h1><p>We make it easy for you to get the eye care you deserve with this special bundle. Get two pairs of progressives, a <b>Free Same-Day Comprehensive Eye Exam*</b>, AND free anti-glare/UV lenses.</p><p>Whether you’re reading, working, or driving—progressives are the all-in-one lens with everything you need. What more can you ask for? </p>`,
    content_es: `<h1>Todo-en-Uno, Solo para Ti</h1><p>Te facilitamos el cuidado de la vista que te mereces con este paquete especial. Obtén dos pares de gafas progresivas, un <b>examen de la vista* Completo el mismo día gratis y Lentes Antirreflejos/UV gratis.</b></p><p>Ya sea para leer, trabajar o conducir, los lentes progresivos te ofrecen lo que necesitas ‘todo-en-uno’. ¿Qué más se puede pedir?</p>`,
    disclaimer: `<p>*Valid on blue tag frames with standard progressive, standard anti-glare plastic lenses and UV. Cannot be combined with other offers or insurance. Additional services or upgrades may change price of offer. Customer will be charged for the cost of the eye exam and will receive a credit applied to customer’s retail purchase (up to the total purchase price) for the value of the eye exam. Eye exams are provided by independent doctors of optometry or ophthalmology. Stanton Optical® does not perform eye exams. Offer valid in-store only.</p>`,
    disclaimer_es: `<p>*Solo se aplica a marcos de etiqueta azul con lentes progresivos de plástico antirreflejo estándar y con protección ultravioleta (UV). No se puede combinar con otras ofertas o seguro médico. Los servicios adicionales o las actualizaciones pueden cambiar el precio de la oferta. Se le cobrará al cliente el costo del examen de la vista y recibirá un crédito aplicado a la compra al por menor del cliente (hasta el precio total de la compra) por el valor del examen de la vista. Stanton Optical® no realiza exámenes de la vista. Los exámenes de la vista son proporcionados por médicos independientes de optometría u oftalmología. Oferta válida solo en tienda.</p>`,
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
    content_es: `<h1>Disfruta de una Dosis Diaria Refrescante con nuestro Contact Lens Value Pack</h1><p>Obtén un suministro de 3 meses de BioTrue® 1-Day Sphere para 90 días por sólo $149 ahora, más el examen de la vista* es gratis... incluye la receta de gafas sin costo adicional. ¿Qué te parece? </p><p>Y si tienes Astigmatismo, obtén un suministro de lentes de contacto para 3 meses por sólo $76 adicionales.</p>`,
    disclaimer: `<p>*Contact lens eye exam credit is applied towards the cost of the Contact Lens Value Pack. Contact Lens Value Pack includes a 90 day supply of BAUSCH + LOMB® BioTrue® 1 day (Sphere, or Toric) contact lenses. Cannot be combined with other offers or insurance. Customer will be charged for the cost of the eye exam and will receive a credit applied to customer’s retail purchase (up to the total purchase price) for the value of the eye exam. Eye exams are provided by independent doctors of optometry or ophthalmology. Stanton Optical® does not perform eye exams. Contact lenses not for sale in AR. Offer valid in-store only.</p>`,
    disclaimer_es: `<p>*El crédito del examen de la vista para lentes de contacto se aplicará al costo del Contact Lens Value Pack. El Contact Lens Value Pack incluye suministro de 90 días de lentes de contacto BAUSCH + LOMB®️ BioTrue®️ 1-day (Sphere, o Toric). No se puede combinar con otras ofertas o seguros médicos. De lo contrario, el examen de la vista no tiene valor en efectivo. Los exámenes de la vista son provistos por médicos independientes de optometría u oftalmología. Stanton Optical® no realiza exámenes de la vista. Esta oferta no es válida en Arkansas. Oferta válida solo en la tienda.</p>`,
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
    disclaimer: `<p>*Frame Club provides four free frames during the annual membership. Free frame value is equal to the original frame purchase price. 50% discount on lenses, coatings and add-ons. Lenses must be purchased at the time of frame selection. Free frames are transferable to friends and family and have no cash value. Frame Club benefits are not redeemable on club members’ initial purchase or in the same transaction. Cannot be combined with other offers, discounts or insurance. Stanton Optical® may terminate this agreement at any time by refunding the prorated amount of the unused portion of the program cost. Only valid in-store.</p><p>FLORIDA RESIDENTS: the patient and any other person responsible for payment has a right to refuse to pay, cancel payment, or be reimbursed for payment of any other service, examination, or treatment that is performed as a result of and within 72 hours of responding to the advertisement for the free, discounted fee, or reduced fee service, examination, or treatment.</p>`,
    disclaimer_es: `<p>*Frame Club le da cuatro marcos gratis durante la membresía anual. El valor del marco gratis es igual al precio de compra del marco original. Un 50% de descuento será aplicado a lentes, recubrimiento de lentes y adiciones. Los lentes deben comprarse en el momento de la selección del marco. Los marcos gratis son transferibles a amigos y familiares y no tienen valor en efectivo. Los marcos gratis no se pueden redimir el día de la compra de Frame Club. No se puede combinar con otras ofertas, descuentos o seguros médicos. Stanton Optical® puede cancelar este acuerdo en cualquier momento reembolsando el monto prorrateado de la parte no utilizada del costo del programa. Solo válido en la tienda.</p><p>Residentes de Florida: el paciente y cualquier otra persona responsable por el pago tienen derecho a negarse a pagar, a cancelar el pago o a que se les reembolse el pago de cualquier otro servicio, examen o tratamiento que se realice como consecuencia del anuncio del servicio, examen o tratamiento gratuito, o de tarifa reducida y dentro de las 72 horas siguientes a la respuesta a dicho anuncio.</p>`,
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
    disclaimer: `<p>*Contact lens eye exam purchase required for Contacts Club membership in addition to the $20 membership fee. Membership includes one free contact lens eye exam in the second year of the plan. 20% off applied to annual contact lens purchase or 10% off lesser supply. 50% off the regular price of any frame, lens, coatings and add-ons eyeglass purchase. Customer will be charged for the cost of the eye exam and will receive a credit applied to customer’s retail purchase (up to the total purchase price) for the value of the eye exam. Eye exams are provided by independent doctors of optometry or ophthalmology. Stanton Optical® does not perform eye exams. Offer valid in-store only.</p>`,
    disclaimer_es: `<p>*Se requiere la compra de un examen de la vista de lentes de contacto para ser miembro de Contacts Club, además de la tarifa de membresía de $20. La membresía incluye un examen de la vista de lentes de contacto gratis en el segundo año del plan. 20% de descuento aplicado a la compra anual de lentes de contacto o 10% de descuento en suministros menores. Un 50% de descuento será aplicado al precio regular de la compra de cualquier marco, lente, recubrimiento de lentes y adiciones. Se le cobrará al cliente el costo del examen de la vista y recibirá un crédito aplicado a la compra al por menor del cliente (hasta el precio total de la compra) por el valor del examen de la vista. Los exámenes de la vista son provistos por médicos independientes de optometría u oftalmología. Stanton Optical® no realiza exámenes de la vista. Solo válido en la tienda.</p>`,
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
