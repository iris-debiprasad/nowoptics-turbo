//TODO : Need to add settings drawer right side of the page
import * as React from "react";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Typography,
  Box,
  Drawer,
  Button,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import style from "./Settings.module.scss";
import Link from "next/link";
import Image from "next/image";
import settingsIcon from "../../../../assets/Images/icons/settingsIcon.svg";
import IconSVG from "../iconsvg/IconSVG";
import { NavItem } from "@/types/Header.types";
import { useTranslation } from 'react-i18next';

type Anchor = "top" | "left" | "bottom" | "right";

type Props = {
  anchor: Anchor;
  settings: NavItem[]
  settingsState: {
    top: boolean;
    left: boolean;
    bottom: boolean;
    right: boolean;
  };
  toggleSettingsDrawer: (
    anchor: Anchor,
    open: boolean
  ) => (event: React.KeyboardEvent | React.MouseEvent) => void;
};

export default function SettingsDrawer({
  anchor,
  settingsState,
  toggleSettingsDrawer,
  settings
}: Props) {
  const { t } = useTranslation();
  const [expanded, setExpanded] = React.useState<string | false>(false);
  const handleChange =
    (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false);
    };


  return (
    <div>
      <React.Fragment key={anchor}>
        <Drawer
          anchor={anchor}
          open={settingsState[anchor]}
          onClose={toggleSettingsDrawer(anchor, false)}
          className={style.settingsDrawer}
        >
          <Box sx={{ width: 350 }} className={style.settingsDrawerLayout}>
            <Box className={style.settingMenuHeader}>
              <Typography component={"h1"} className={style.settingMenuHeading}>
                <Image
                  className={style.settingsIcon}
                  src={settingsIcon}
                  alt="settings"
                  width={20}
                  height={20}
                />
                {t(`nav.Settings`)}
              </Typography>
              <Box onClick={toggleSettingsDrawer(anchor, false)}>
                <IconSVG
                  className={style.closeIcon}
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  fillP="#a9afbb"
                  name="close_icon_large"
                />
              </Box>
            </Box>
            {settings.map((settingsItems) => {
              if (settingsItems.type === "text") {
                return (
                  <Link
                    href={settingsItems.url}
                    key={settingsItems.name + settingsItems.id}
                    onClick={toggleSettingsDrawer(anchor, false)}
                  >
                    <Typography className={style.settingMenuItem}>
                      {t(`nav.${settingsItems.name}`)}
                    </Typography>
                  </Link>
                );
              } else if (settingsItems.type === "dropdown") {
                return (
                  <div key={settingsItems.name + settingsItems.id}>
                    <Accordion
                      expanded={expanded === `panel${settingsItems.id}`}
                      onChange={handleChange(`panel${settingsItems.id}`)}
                      className={style.menuAccordion}
                    >
                      <AccordionSummary
                        aria-controls={`panel${settingsItems.id}d-content`}
                        id={`panel${settingsItems.id}d-header`}
                        expandIcon={<ExpandMoreIcon />}
                        className={style.menuAccordionSummary}
                      >
                        <Typography className={style.accordionHead}>
                        {t(`nav.${settingsItems.name}`)}
                        </Typography>
                      </AccordionSummary>
                      <AccordionDetails className={style.accordionDetails}>
                        {settingsItems.subMenu.map((subMenuItems) => {
                          return (
                            <Link
                              href={subMenuItems.url}
                              key={subMenuItems.name + subMenuItems.id}
                              onClick={toggleSettingsDrawer(anchor, false)}
                            >
                              <Button>{t(`nav.${subMenuItems.name}`)}</Button>
                            </Link>
                          );
                        })}
                      </AccordionDetails>
                    </Accordion>
                  </div>
                );
              }
            })}
          </Box>
        </Drawer>
      </React.Fragment>
    </div>
  );
}
