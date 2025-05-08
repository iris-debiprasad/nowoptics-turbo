import CustomMap from "@/components/custommap/CustomMap";
import IconSVG from "@/components/iconsvg/IconSVG";
import { Box, Button } from "@mui/material";
import Link from "next/link";
import { formatPhoneNumber } from "./ppc-header";
import style from "./ppc.module.scss";
import { useEffect, useState } from "react";
import PPCStoreHours from "./ppc-store-hours";
import { BRAND } from "@root/host/src/constants/common.constants";

const PPCStoreLocator = (props: any) => {
    const [stores, setStores] = useState([]);
    const [isScroll, setIsScroll] = useState(false);

    const checkScroll = () => {
        let isScroll = false;
        const div = document.getElementById('scrollDiv');

        if (div) {
            isScroll = div.scrollHeight > div.clientHeight
        }
        setIsScroll(isScroll);
    }

    useEffect(() => {
        if (props.data.ppcPageData.Stores) {
            const filteredData = props.data.ppcPageData.Stores.filter((store: any) => store.WebDescription && store.WorkingHours && store.StoreOpeningDateTime);
            setStores(filteredData.sort((a: any, b: any) => a.Distance - b.Distance))
            if (filteredData && filteredData.length == 1) {
                props.data.handleStoreClick(filteredData[0])
            }
            setTimeout(() => {
                checkScroll();
            }, 100);
        }
    }, [props.data.ppcPageData.Stores.length]);

    return (
        <>
            <Box>
                {
                    props.data.brand === BRAND.MEL ?
                        <h2 className={style.melSecondaryHeader}>
                            <b>Search for <span>My Eyelab </span></b>
                            Stores in your state.
                        </h2>
                        :
                        <h2 className={style.secondaryHeader}>Take the first step to book your exam.</h2>
                }
            </Box>

            <div ref={props.data.myRef} className={style.storeSelectorRow}>
                <Box className={`${style.rightSideMapWrapper} ${props.data.brand === BRAND.MEL ? style.melRightSideMapWrapper : ""}`}>
                    <CustomMap
                        selectedStore={props.data.selectedStore}
                        centers={props.data.allLocation.filter((value: any) => value !== null && value !== undefined)}
                        isPPC
                    />
                </Box>
                <Box className={`${props.data.brand === BRAND.MEL ? style.melStoreSelectorContainer : style.storeSelectorContainer}`}>
                    {props.data.selectedStore && <Box className={style.StoreDetailContainer}>
                        {stores && stores.length > 1 && <div onClick={props.data.handleBackIconClick} className={style.backIconStyle}>
                            <IconSVG
                                width="20"
                                height="30"
                                viewBox="0 0 30 30"
                                fill="white"
                                name="arrow_left_bold"
                            />
                        </div>}
                        <div>
                            <div className={style.storeName}>{props.data.selectedStore.WebDescription}</div>
                            <div className={style.storeAddress}>{props.data.selectedStore.AddressLine1}{props.data.selectedStore.City ? ', ' + props.data.selectedStore.City : ''}{props.data.selectedStore.StateCode ? ', ' + props.data.selectedStore.StateCode : ""}{props.data.selectedStore.ZipCode ? ', ' + props.data.selectedStore.ZipCode : ""}</div>
                            <Link href={`https://www.google.com/maps/dir/?api=1&destination=${props.data.selectedStore.AddressLine1},+${props.data.selectedStore.City}+${props.data.selectedStore.StateCode}+${props.data.selectedStore.ZipCode}+United States`} target="_blank" rel="noopener noreferrer">
                                <Button
                                    className={style.directionBtn}
                                    startIcon={
                                        <IconSVG
                                            width="16"
                                            height="20"
                                            viewBox="0 0 16 20"
                                            fill="none"
                                            fillP="#010101"
                                            name="location_icon"
                                        />
                                    }
                                >
                                    DIRECTIONS
                                </Button>
                            </Link>
                            <PPCStoreHours store={props.data.selectedStore} />
                            <div className={style.storeAddress}>
                                <b>Phone:</b> {formatPhoneNumber(props.data.ppcPageData.Phone)}
                            </div>
                            <div className={`${style.textCenter} ${style.mt20}`}>
                                <Button
                                    className={style.bookBtn}
                                    endIcon={
                                        <IconSVG
                                            width="9"
                                            height="15"
                                            viewBox="0 0 9 15"
                                            fill="none"
                                            fillP="#010101"
                                            name="arrow_solid_right"
                                        />
                                    }
                                    onClick={props.data.handleBookEyeExamClick}
                                    data-testid="BookEyeExam"
                                >
                                    <span>Book Eye Exam</span>
                                </Button>
                            </div>
                        </div>
                    </Box>
                    }
                    {!props.data.selectedStore && <>
                        <div className={`${style.storeSelectorHeader} ${props.data.brand === BRAND.MEL ? style.melStoreSelectorHeader : ""}`}>
                            Select Your Store{isScroll && <span className={style.smallText}>(scroll to see more)</span>}
                        </div>
                        <div className={style.scrollBox} id="scrollDiv">
                            {
                                stores.map((store: any, index: any) => {
                                    return <div key={'store-' + index} className={style.storeOption} onClick={() => props.data.handleStoreClick(store)}>
                                        <span className={style.storeOptionName} tabIndex={0}>{store.WebDescription ? store.WebDescription.toUpperCase() : ""}</span>
                                        {store.Distance && <span className={style.milesContaniner}>{Number(store.Distance).toFixed(0)}&nbsp;miles</span>}
                                    </div>
                                })
                            }
                        </div>
                    </>}
                </Box>

            </div>
        </>
    )
}

export default PPCStoreLocator;