import style from "./BrandTransition.module.scss";
import React from "react";
import { Box, Button } from "@mui/material";
import IconSVG from "@/components/iconsvg/IconSVG";
import { ImageUrlConstants } from "@/constants/image.url.constants";
import Image from "next/image";
import { useRouter } from "next/router";
import PrimaryModal from "../primary_modal/PrimaryModal";
import Link from "next/link";

enum WEBSITES {
    MEL = "myeyelab",
    FRAMEGENIE = "framegenie"
}

const BrandTransitionModal = (props: any) => {
    const router = useRouter();
    const { query } = router;
    const [showBrandTransitionModal, setShowBrandTransitionModal] = React.useState(false);
    const [redirectedFromWebsiteName, setRedirectedFromWebsiteName] = React.useState('');
    const [redirectedFromWebsiteLogo, setRedirectedFromWebsiteLogo] = React.useState('');

    React.useEffect(() => {
        const queryParamsData = (query.redirectedfrom as string || '').toLowerCase();
        if (queryParamsData && (queryParamsData == WEBSITES.MEL || queryParamsData == WEBSITES.FRAMEGENIE)) {
            setRedirectdFromWebsiteNameAndLogo(queryParamsData);
            setShowBrandTransitionModal(true);
        }
    }, [query]);

    const setRedirectdFromWebsiteNameAndLogo = (brand: string) => {
        switch (brand) {
            case WEBSITES.MEL:
                setRedirectedFromWebsiteName("My Eyelab's");
                setRedirectedFromWebsiteLogo(melLogo);
                break;

            case WEBSITES.FRAMEGENIE:
                setRedirectedFromWebsiteName("FrameGenie's");
                setRedirectedFromWebsiteLogo(framegenieLogo);
                break;

            default:
                break;
        }
    }

    const handleClose = () => {
        setShowBrandTransitionModal(false);
    };
    const soLogo = ImageUrlConstants.LOGO.SO;
    const melLogo = ImageUrlConstants.LOGO.MEL;
    const framegenieLogo = ImageUrlConstants.LOGO.FRAMEGENIE;

    return (
        <PrimaryModal
            modalOpen={showBrandTransitionModal}
            setModalOpen={setShowBrandTransitionModal}
            modalInner={
                <Box className={style.modalWrapper}>
                    <Box className={style.modalHeader}>
                        <Button onClick={handleClose}>
                            <IconSVG
                                width="16"
                                height="16"
                                viewBox="0 0 16 16"
                                fill="var(--primary-text-color)"
                                name="modal_cross"
                            />
                        </Button>
                    </Box>
                    <Box className={style.modalBody}>
                        <div className={style.brandLogo}>
                            <Image src={redirectedFromWebsiteLogo} alt="logo" layout="responsive" width={144} height={55} />
                            <Image className={style.soLogo} src={soLogo} alt="logo" layout="responsive" width={128} height={55} />
                        </div>
                        <p>
                            Welcome to Stanton Optical, {redirectedFromWebsiteName} sister brand.
                            <br /><br /><br />
                            Find your perfect fit from over <Link onClick={handleClose}
                                href={`/catalog/eyeglasses/`}
                                className={style.externalLink}
                            >1,500 unique frames</Link> and top-brand <Link onClick={handleClose}
                                href={`/catalog/contacts/`}
                                className={style.externalLink}
                            >contact lenses</Link> at the best prices.
                        </p>
                        <div className={style.btnContainer}>
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                className={style.updateBtn}
                                onClick={handleClose}
                            >
                                Continue
                            </Button>
                        </div>
                    </Box>
                </Box>
            }
            cstmStyle={"brandTransitionModal"}
        />
    );
};

export default BrandTransitionModal;
