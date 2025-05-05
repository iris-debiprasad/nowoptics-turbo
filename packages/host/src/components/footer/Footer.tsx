import { useMediaQuery } from "@mui/material";
import FooterDesktop from "./desktop/FooterDesktop";
import FooterMobile from "./mobile/FooterMobile";
import { Constants } from "@/constants/Constants";

export default function NewFooter() {

  const isDesktop = useMediaQuery(Constants.WINDOW_SIZE.TABLET);

  return (
    <>
      {isDesktop ?
        <FooterDesktop />
        :
        <FooterMobile />
      }
    </>
  )

}
