import { SITEMAPS } from "@/constants/sitemap.constants";
import { Grid, List, ListItem } from "@mui/material";
import Link from "next/link";
import style from "./sitemap.module.scss";

const Sitemaps = () => {
    return (
        <>
            <div className={style.sitemapContainer}>
                <h1>Sitemap</h1>
                <Grid container spacing={"20px"}>
                    <Grid item xs={12} md={3}>
                        <h2>Eyeglasses</h2>
                        <List>
                            {SITEMAPS.EYEGLASSESS && SITEMAPS.EYEGLASSESS.map((page, index) => {
                                return <ListItem key={index}><Link className={style.item} href={page.path}>{page.label}</Link></ListItem>
                            })}
                        </List>
                    </Grid>
                    <Grid item xs={12} md={3}>
                        <h2>Sunglasses</h2>
                        <List>
                            {SITEMAPS.SUNGLASSES && SITEMAPS.SUNGLASSES.map((page, index) => {
                                return <ListItem key={index}><Link className={style.item} href={page.path}>{page.label}</Link></ListItem>
                            })}
                        </List>
                    </Grid>
                    <Grid item xs={12} md={3}>
                        <div>
                            <h2>Contact Lenses</h2>
                            <List>
                                {SITEMAPS.CONTACT_LENSES && SITEMAPS.CONTACT_LENSES.map((page, index) => {
                                    return <ListItem key={index}><Link className={style.item} href={page.path}>{page.label}</Link></ListItem>
                                })}
                            </List>
                        </div>
                        <div className={style.otherContainer}>
                            <h2>Others</h2>
                            <h3>Other Products</h3>
                            <List>
                                {SITEMAPS.OTHERS && SITEMAPS.OTHERS.map((page, index) => {
                                    return <ListItem key={index}><Link className={style.item} href={page.path}>{page.label}</Link></ListItem>
                                })}
                            </List>
                        </div>
                    </Grid>
                    <Grid item xs={12} md={3}>
                        <h2>Offers</h2>
                        <List>
                            {SITEMAPS.OFFERS && SITEMAPS.OFFERS.map((page, index) => {
                                return <ListItem key={index}><Link className={style.item} href={page.path}>{page.label}</Link></ListItem>
                            })}
                        </List>
                    </Grid>
                    <Grid item xs={12} md={3}>
                        <h2>Information</h2>
                        <List>
                            {SITEMAPS.INFORMATION && SITEMAPS.INFORMATION.map((page, index) => {
                                return <ListItem key={index}><Link className={style.item} href={page.path}>{page.label}</Link></ListItem>
                            })}
                        </List>
                    </Grid>
                    <Grid item xs={12} md={3}>
                        <h2>Who we are</h2>
                        <List>
                            {SITEMAPS.WHO_WE_ARE && SITEMAPS.WHO_WE_ARE.map((page, index) => {
                                return <ListItem key={index}><Link className={style.item} href={page.path}>{page.label}</Link></ListItem>
                            })}
                        </List>
                    </Grid>
                    <Grid item xs={12} md={3}>
                        <h2>Eye Health & Style Guide</h2>
                        <List>
                            {SITEMAPS.EYE_HEALTH && SITEMAPS.EYE_HEALTH.map((page, index) => {
                                return <ListItem key={index}><Link className={style.item} href={page.path}>{page.label}</Link></ListItem>
                            })}
                        </List>
                    </Grid>
                </Grid>
            </div>
        </>
    );
}

export default Sitemaps;