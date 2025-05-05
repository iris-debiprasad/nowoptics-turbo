import PrimaryModal from "@/components/primary_modal/PrimaryModal";
import FooterPPC from "./ppc-footer";
import HeaderPPC from "./ppc-header";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";
import PPCBuyNow from "./ppc-buy-now";
import PPCInsurance from "./ppc-insurance";
import PPCPromotionalBanner from "./ppc-promotional-banner";
import PPCSecondaryBanner from "./ppc-secondary-banner";
import PPCStoreLocator from "./ppc-store-locator";
import PPCTopHeader from "./ppc-top-header";
import PPCReview from "./ppc-review";
import PPCContactsCarousel from "./ppc-contacts-carousel";
import { GetMappedLocationCoordinates } from "@/service/ppc.service";
import MELFooterPPC from "./MEL-ppc-footer";
import MELHeaderPPC from "./MEL-ppc-header";
import { BRAND } from "@/constants/common.constants";
import MELPPCTopHeader from "./MEL-ppc-top-header";
import { ImageUrlConstants } from "@/constants/image.url.constants";
import { COLOR_ROOT_NAMES, COLOR_KEYS, MEL_COLOR, SO_COLOR } from "@/constants/color.constants";
import { checkBrand } from "@/utils/common.utils";

const ContactsPPC = (props: any) => {
    const [modalOpen, setModalOpen] = useState(false);
    const [modalContent, setModalContent] = useState("");

    const handleOpen = (content: string) => {
        setModalContent(content)
        setModalOpen(true)
    };
    const ppcPageData = { ...props.data };
    const topHeaderImage = ppcPageData.Description.TopSlider1Desktop ? ppcPageData.Description.TopSlider1Desktop : ImageUrlConstants.PPC_CONTACTS_TOP_HEADER;
    const [allLocation, setAllLocation] = useState([]);
    const [selectedStore, setSelectedStore] = useState<any>();
    const router = useRouter();
    const myRef = useRef<any>(null)

    const executeScroll = () => myRef.current.scrollIntoView();

    useEffect(() => {
        const mappedData = GetMappedLocationCoordinates(ppcPageData.Stores);
        setAllLocation(mappedData);
    }, []);

    // TODO - Will be removed later, temporarily used to show one MEL Store in SO Website
    useEffect(() => {
        if (typeof window !== "undefined") {
            const slug: any = router.query.slug;
            const ppcPageDiv = document.getElementById("ppc_page");
            if (ppcPageDiv && slug[0] == "bowling-green") {
                ppcPageDiv.classList.add(checkBrand());
                COLOR_ROOT_NAMES.map((rootName: string, index: number) => {
                    const colorKey = COLOR_KEYS[index];
                    ppcPageDiv.style.setProperty(
                        rootName,
                        MEL_COLOR[colorKey]
                    );
                });
            } else {
                ppcPageDiv?.classList.remove(checkBrand());
                COLOR_ROOT_NAMES.map((rootName: string, index: number) => {
                    const colorKey = COLOR_KEYS[index];
                    ppcPageDiv?.style.setProperty(
                        rootName,
                        SO_COLOR[colorKey]
                    );
                });
            }
        }
    }, []);

    const handleStoreClick = (store: any) => {
        setSelectedStore(store);
    }

    const handleBackIconClick = () => {
        setSelectedStore(null);
    }

    const handleBookEyeExamClick = () => {
        if (selectedStore) {
            props.brand === BRAND.MEL
                ? router.push("/book-eye-exam/?id=" + selectedStore.StoreNumber + "&redirectedfrom=myeyelab")
                : router.push("/book-eye-exam/?id=" + selectedStore.StoreNumber)
        } else {
            executeScroll();
        }
    }


    return (
        <>
            {props.brand === BRAND.MEL ? <MELHeaderPPC data={ppcPageData.Phone} handler={handleBookEyeExamClick} /> : <HeaderPPC data={ppcPageData.Phone} handler={handleBookEyeExamClick} />}
            {props.brand === BRAND.MEL ? <MELPPCTopHeader data={{ ppcPageData, handleBookEyeExamClick, handleOpen, topHeaderImage, isContacts: true }} /> : <PPCTopHeader data={{ ppcPageData, handleBookEyeExamClick, handleOpen, topHeaderImage }} />}
            <PPCStoreLocator data={{ myRef, allLocation, selectedStore, handleBackIconClick, handleBookEyeExamClick, handleStoreClick, ppcPageData, brand: props.brand }} />
            <PPCSecondaryBanner data={{ ppcPageData, handleBookEyeExamClick, brand: props.brand, isContacts: true }} />
            <PPCReview data={{ isContacts: true }} />
            <PPCPromotionalBanner data={{ ppcPageData, handleOpen, handleBookEyeExamClick, isContacts: true, brand: props.brand }} />
            <PPCContactsCarousel data={{ brand: props.brand }} />
            <PPCBuyNow data={{ brand: props.brand }} />
            <PPCInsurance data={{ brand: props.brand }} />
            {props.brand === BRAND.MEL ? <MELFooterPPC handler={handleBookEyeExamClick} /> : <FooterPPC handler={handleBookEyeExamClick} />}
            <PrimaryModal
                modalOpen={modalOpen}
                setModalOpen={setModalOpen}
                modalInner={modalContent as string}
            />
        </>
    )
}

export default ContactsPPC;
