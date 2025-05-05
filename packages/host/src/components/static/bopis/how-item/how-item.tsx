import Image from "next/image";
import styles from "./how-item.module.scss";
import { HowItWorksItem } from "../bopis.constants";
import Link from "next/link";

interface Props {
    item: HowItWorksItem;
}

export const HowItem = ({ item }: Props): JSX.Element => {
    const Content: JSX.Element = (
        <>
            <Image alt={item.icon.alt} width={120} height={120} src={item.icon.src} />
            <h3 className={styles.how__title}>{item.title}</h3>
            <p className={styles.how__description}>{item.description}</p>
        </>
    );

    if (!item.href) return <div className={styles.how}>{Content}</div>;

    return (
        <Link className={styles.how} href={item.href}>
            {Content}
        </Link>
    );
};

HowItem.displayName = "HowItem";
