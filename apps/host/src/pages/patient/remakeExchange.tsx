import BackdropLoader from "@/components/backdrop_loader/BackdropLoader";
import dynamic from "next/dynamic";
import Head from "next/head";

const RemakeExchange = dynamic(() => import("patient/RemakeExchange"), {
    ssr: false,
    loading: () => <BackdropLoader openLoader={true} />,
});

const remakeExchange = () => {
    return (
        <div>

            <Head>
                <title>Patient | Remake/Exchange | Stanton Optical</title>
                <meta
                    name="description"
                    content="We provide easy eye care. Prescription eyeglasses, sunglasses &amp; contacts at the lowest prices ✅ Book your eye exam or shop online now!"
                />
                <meta name="keywords" content="" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />

            </Head>
            <div>
                <RemakeExchange />
            </div>
        </div>
    )
}

export default remakeExchange

