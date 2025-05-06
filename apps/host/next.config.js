const { NextFederationPlugin } = require("@module-federation/nextjs-mf");
const withImages = require("next-images");

module.exports = withImages({
  staticPageGenerationTimeout: 1000,
  output: "standalone",
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
  webpack(config, options) {
    const { isServer } = options;
    config.plugins.push(
      new NextFederationPlugin({
        name: "host",
        remotes: {
          patient: `patient@${
            process.env.NEXT_PUBLIC_APP_PATIENT
          }/_next/static/${isServer ? "ssr" : "chunks"}/remoteEntry.js`,
          order: `order@${process.env.NEXT_PUBLIC_APP_ORDER}/_next/static/${
            isServer ? "ssr" : "chunks"
          }/remoteEntry.js`,
          appointments: `appointments@${
            process.env.NEXT_PUBLIC_APP_APPOINTMENTS
          }/_next/static/${isServer ? "ssr" : "chunks"}/remoteEntry.js`,
          intake: `intake@${process.env.NEXT_PUBLIC_APP_INTAKE}/_next/static/${
            isServer ? "ssr" : "chunks"
          }/remoteEntry.js`,
          managedCare: `managedCare@${
            process.env.NEXT_PUBLIC_APP_MANAGEDCARE
          }/_next/static/${isServer ? "ssr" : "chunks"}/remoteEntry.js`,
          operationCommand: `operationCommand@${
            process.env.NEXT_PUBLIC_APP_OPERATIONCOMMAND
          }/_next/static/${isServer ? "ssr" : "chunks"}/remoteEntry.js`,
          setup: `setup@${process.env.NEXT_PUBLIC_APP_SETUP}/_next/static/${
            isServer ? "ssr" : "chunks"
          }/remoteEntry.js`,
          support: `support@${
            process.env.NEXT_PUBLIC_APP_CUSTOMER_DOCTOR_SUPPORT
          }/_next/static/${isServer ? "ssr" : "chunks"}/remoteEntry.js`,
          patientCommunication: `patientCommunication@${
            process.env.NEXT_PUBLIC_APP_PATIENT_COMMUNICATION
          }/_next/static/${isServer ? "ssr" : "chunks"}/remoteEntry.js`,
          inventory: `inventory@${
            process.env.NEXT_PUBLIC_APP_INVENTORY
          }/_next/static/${isServer ? "ssr" : "chunks"}/remoteEntry.js`,
          guidedSales: `guidedSales@${
            process.env.NEXT_PUBLIC_APP_GUIDED_SALES
          }/_next/static/${isServer ? "ssr" : "chunks"}/remoteEntry.js`,
        },
        exposes: {
          "./SideBar": "./src/components/sidebar/SideBar",
          "./ConsentPrivacyPolicy":
            "./src/components/consentPrivacyPolicy/ConsentPrivacyPolicy",
          "./PrimaryModal": "./src/components/primary_modal/PrimaryModal",
          "./IconSVG": "./src/components/iconsvg/IconSVG",
          "./ImageSlider": "./src/components/image_slider/ImageSlider",
          "./ImageWithButton":
            "./src/components/imagewithbutton/ImageWithButton",
          "./SingleImageSlider":
            "./src/components/image_slider/SingleImageSlider.tsx",
          "./MobileSingleImageSlider":
            "./src/components/image_slider/MobileSingleImageSlider.tsx",
          "./Custommap": "./src/components/custommap/CustomMap.tsx",
          "./CustomTablePagination":
            "./src/components/customTablePagination/CustomTablePagination.tsx",
          "./Breadcrumb": "./src/components/breadcrumb/Breadcrumb",
          "./TableFilter": "./src/components/tableFilter/TableFilter",
          "./BackdropLoader": "./src/components/backdrop_loader/BackdropLoader",
          "./ConfirmationModal":
            "./src/components/confirmationModal/ConfirmationModal",
          "./UploadFile": "./src/components/uploadFile/UploadFile",
          "./SelectPatientInput":
            "./src/components/selectPatientAssociateModal/SelectPatientAssociateModal",
          "./LoadingScreen": "./src/components/loadingScreen/LoadingScreen",
          "./ProductDetailsSkeleton":
            "./src/components/skeleton_loader/productDetails/ProductDetailsSkeleton",
          "./CatalogSkeleton":
            "./src/components/skeleton_loader/catalog/CatalogSkeleton",
          "./PatientSkeleton":
            "./src/components/skeleton_loader/patient/PatientSkeleton",
          "./CheckoutConfirmationSkeleton":
            "./src/components/skeleton_loader/checkoutConfirmationSkeleton/CheckoutConfirmationSkeleton",
          "./ProductColor": "./src/components/productColor/ProductColor.tsx",
          "./CommonTableSkeleton":
            "./src/components/skeleton_loader/CommonTableSkeleton/CommonTableSkeleton",
          "./LoginForm":
            "./src/components/authentication/LoginForm/LoginForm.tsx",
          "./AddPOFModal": "./src/components/addPOFModal/AddPOFModal.tsx",
          "./SearchPatientBar":
            "./src/components/searchPatientBar/SearchPatientBar.tsx",
          "./ShowBrandStore": "./src/components/showBrandStore/ShowBrandStore",
          "./StoreSkeleton":
            "./src/components/skeleton_loader/SelectStore/StoreSkeleton.tsx",
          "./StoreTiming":
            "./src/components/skeleton_loader/SelectStore/StoreTiming.tsx",
          "./VisionIntake":
            "./src/components/prescription-rx-renewal/visionIntake/index.tsx",
          "./StoreDetailsSkeleton":
            "./src/components/skeleton_loader/storeDetailsSkeleton/StoreDetailsSkeleton.tsx",
          "./PageNotFound":
            "./src/components/static/page-not-found/PageNotFoundForExpose.tsx",
          "./UserMarketingConsent":
            "./src/components/UserMarketingConsent/index.tsx",
          "./BillingAddressModal":
            "./src/components/billingAddressModal/BillingAddressModal.tsx",
        },
        filename: "static/chunks/remoteEntry.js",
        shared: {
          axios: { singleton: true, requiredVersion: "^1.7.9" },
          "@mui/material": { singleton: true, requiredVersion: "^5.16.7" },
        },
      })
    );

    config.module.rules.push({
      test: /\.(ts|tsx)$/,
      exclude: /node_modules/,
      use: [
        {
          loader: 'babel-loader',
          options: {
            presets: ['next/babel'],
          },
        },
        {
          loader: 'ts-loader',
          options: {
            transpileOnly: true,
            experimentalWatchApi: true,
            onlyCompileBundledFiles: true,
          },
        },
      ],
    });

    return config;
  },
  async rewrites() {
    return [
      {
        source: "/robots.txt",
        destination: "/api/robots",
      },
      {
        source: "/:slug(.*xml)",
        destination: `${process.env.NEXT_PUBLIC_CDN_BASE_URL}/assets/sitemap/:slug`,
      },
    ];
  },

  /**
   * Added redirect for SEO ticket and special offer ticket
   * https://stanton.atlassian.net/browse/IR-928
   * https://stanton.atlassian.net/browse/IR-1626
   */
  async redirects() {
    return [
      // {
      //   source: '/catalog/men',
      //   destination: '/catalog/mens-eyeglasses',
      //   permanent: true,
      // },
      // {
      //   source: '/catalog/women',
      //   destination: '/catalog/womens-eyeglasses',
      //   permanent: true,
      // },
      {
        source: "/special-offers/acuvue",
        destination: "/special-offers",
        permanent: true,
      },
      {
        source: "/special-offers/carecredit",
        destination: "/special-offers",
        permanent: true,
      },
      {
        source: "/special-offers/contacts-129",
        destination: "/special-offers",
        permanent: true,
      },
      {
        source: "/sunbit",
        destination: "/special-offers",
        permanent: true,
      },
      {
        source: "/special-offers/acuvue-super-savings",
        destination: "/special-offers",
        permanent: true,
      },
      {
        source: "/contacts-club",
        destination: "/special-offers/contacts-club",
        permanent: true,
      },
      {
        source: "/refer-a-friend",
        destination: "/special-offers/refer-a-friend",
        permanent: true,
      },
      {
        source: "/lenses-101",
        destination: "/lenses-that-suit-you",
        permanent: true,
      },
    ];
  },
});
