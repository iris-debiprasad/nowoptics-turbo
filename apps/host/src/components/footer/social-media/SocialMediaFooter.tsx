import styles from "./SocialMediaFooter.module.scss";
import Link from "next/link";
import Image from "next/image";
import facebookIcon from "@root/assets/Images/icons/footer_facebook.svg";
import instagramIcon from "@root/assets/Images/icons/footer_instagram.svg";
import youtubeIcon from "@root/assets/Images/icons/footer_youtube.svg";
import { SOCIAL_MEDIA_LINKS } from "@root/host/src/constants/common.constants";

interface ISocialMediaFooter {
  iconSize?: number;
}

export default function SocialMediaFooter({
  iconSize = 20,
}: ISocialMediaFooter) {
  return (
    <div className={styles.sm_ft}>
      <Link href={SOCIAL_MEDIA_LINKS.INSTAGRAM} target="_blank">
        <Image
          src={instagramIcon}
          alt="instagram"
          height={iconSize}
          width={iconSize}
        />
      </Link>

      <Link href={SOCIAL_MEDIA_LINKS.FACEBOOK} target="_blank">
        <Image
          src={facebookIcon}
          alt="facebook"
          height={iconSize}
          width={iconSize}
        />
      </Link>

      <Link href={SOCIAL_MEDIA_LINKS.YOUTUBE} target="_blank">
        <Image
          src={youtubeIcon}
          alt="youtube"
          height={iconSize}
          width={iconSize}
        />
      </Link>
    </div>
  );
}
