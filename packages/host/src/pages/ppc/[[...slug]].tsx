import { GetAllDma, GetPPCPageData, PPCResponseDataResult } from "@/service/ppc.service";
import PageNotFound404 from "../404";
import { getLatLongForUser } from "@/utils/common.utils";
import { BRAND } from "@/constants/common.constants";
import dynamic from "next/dynamic";
import { GetServerSideProps } from "next";

const ContactsPPC = dynamic(() => import("@/components/static/ppc/contacts"), {
    ssr: true,
}) as React.FunctionComponent<any>;

const EyeglassesPPC = dynamic(() => import("@/components/static/ppc/eyeglasses"), {
    ssr: true,
}) as React.FunctionComponent<any>;

type Props = {
    ppc: boolean,
    pageNotFound: boolean,
    pageType: string,
    brand: string,
    pageData: PPCResponseDataResult
};

const PPCPage = (props: Props) => {
    return (
        <div id="ppc_page">
            {props.pageData && props.pageData["Dma"] && <>
                {props.pageType && props.pageType == "contacts" && <ContactsPPC data={props.pageData} brand={props.brand} />}
                {props.pageType && props.pageType == "eyeglasses" && <EyeglassesPPC data={props.pageData} brand={props.brand} />}
            </>}
            {props.pageNotFound && <PageNotFound404 />}
        </div>
    )
};

export default PPCPage;

export const getServerSideProps: GetServerSideProps = async (context) => {
    let brand, pageType, pageSubType, userLatLng, dma, pageData, dmaList, ppc = true, pageNotFound = false;
    if (context.query && context.query.slug) {
        dma = context.query.slug[0];
        pageType = context.query.slug[1];
        pageSubType = context.query.slug[2];
        brand = dma == "bowling-green" ? BRAND.MEL : BRAND.SO;
        userLatLng = await getLatLongForUser() as { lat: any, lng: any };
    }
    try {
        let dmaRes = await GetAllDma();
        dmaList = dmaRes.data.Result;
        if (dmaList) {
            let pageRes = await GetPPCPageData(brand as string, dma as string, pageType as string, pageSubType as string, userLatLng ? userLatLng : null, dmaList)
            pageData = pageRes.data.Result;
        }
    } catch {
        pageNotFound = true;
        dmaList = null;
        pageData = null;
    }

    return {
        props: { ppc, brand, pageType, pageNotFound, pageData }
    };
};
