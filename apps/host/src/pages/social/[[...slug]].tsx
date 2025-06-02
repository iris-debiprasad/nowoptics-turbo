import { GetAllDma, GetSocialPageData, PPCResponseDataResult } from "@/service/ppc.service";
import PageNotFound404 from "../404";
import { getLatLongForUser } from "@root/host/src/utils/common.utils";
import { BRAND } from "@root/host/src/constants/common.constants";
import dynamic from "next/dynamic";
import { GetServerSideProps } from "next";

const EyeglassesPPC = dynamic(() => import("@/components/static/ppc/eyeglasses"), {
    ssr: true,
}) as React.FunctionComponent<any>;

type Props = {
    ppc: boolean,
    pageNotFound: boolean,
    brand: string,
    pageData: PPCResponseDataResult
};

const SocialPage = (props: Props) => {
    return (
        <div id="social_page">
            {props.pageData && props.pageData["Dma"] && <>
                <EyeglassesPPC data={props.pageData} brand={props.brand} />
            </>}
            {props.pageNotFound && <PageNotFound404 />}
        </div>
    )
};

export default SocialPage;

export const getServerSideProps: GetServerSideProps = async (context) => {
    let brand, userLatLng, dma, pageData, dmaList, social = true, pageNotFound = false;
    if (context.query && context.query.slug) {
        dma = context.query.slug[0];
        brand = dma == "bowling-green" ? BRAND.MEL : BRAND.SO;
        userLatLng = await getLatLongForUser() as { lat: any, lng: any };
    }
    try {
        let dmaRes = await GetAllDma();
        dmaList = dmaRes.data.Result;
        if (dmaList) {
            let pageRes = await GetSocialPageData(brand as string, dma as string, userLatLng ? userLatLng : null, dmaList)
            pageData = pageRes.data.Result;
        }
    } catch {
        pageNotFound = true;
        dmaList = null;
        pageData = null;
    }
    return {
        props: { social, brand, pageNotFound, pageData }
    };
};