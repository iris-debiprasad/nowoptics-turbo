import {
  Paper,
  Table,
  TableBody,
  TableCell,
  tableCellClasses,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { useTranslation } from "react-i18next";
import styles from "./index.module.scss";

const StyledHeadCell = styled(TableCell)(() => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#0a144f",
    color: "#f2f2f2",
    textAlign: "center",
  },
}));

export function SavingsPlanTable(): React.JSX.Element {
  const { t } = useTranslation();

  return (
    <section className={styles.container}>
      <p className={styles.title}>{t("STANTON_ACCESS.SAVINGS_PLAN.TITLE")}</p>

      <TableContainer component={Paper}>
        <Table
          sx={{ minWidth: "400px - 32px" }}
          size="small"
          aria-label={t("STANTON_ACCESS.SAVINGS_PLAN.TITLE")}
        >
          <TableHead>
            <TableRow>
              <StyledHeadCell>
                {t("STANTON_ACCESS.SAVINGS_PLAN.TABLE.HEADER.COL_1")}
              </StyledHeadCell>
              <StyledHeadCell align="center">
                {t("STANTON_ACCESS.SAVINGS_PLAN.TABLE.HEADER.COL_2")}
              </StyledHeadCell>
            </TableRow>
          </TableHead>

          <TableBody>
            <TableRow sx={{ "&:last-child td": { border: 0 } }}>
              <TableCell>
                {t("STANTON_ACCESS.SAVINGS_PLAN.TABLE.BODY.ROW_1_1")}
              </TableCell>
              <TableCell
                align="center"
                sx={{ borderLeft: "1px solid #e0e0e0" }}
              >
                {t("STANTON_ACCESS.SAVINGS_PLAN.TABLE.BODY.ROW_1_2")}
              </TableCell>
            </TableRow>

            <TableRow sx={{ "&:last-child td": { border: 0 } }}>
              <TableCell>
                {t("STANTON_ACCESS.SAVINGS_PLAN.TABLE.BODY.ROW_2_1")}
              </TableCell>
              <TableCell
                align="center"
                sx={{ borderLeft: "1px solid #e0e0e0" }}
              >
                {t("STANTON_ACCESS.SAVINGS_PLAN.TABLE.BODY.ROW_2_2")}
              </TableCell>
            </TableRow>

            <TableRow sx={{ "&:last-child td": { border: 0 } }}>
              <TableCell>
                {t("STANTON_ACCESS.SAVINGS_PLAN.TABLE.BODY.ROW_3_1")}
              </TableCell>
              <TableCell
                align="center"
                sx={{ borderLeft: "1px solid #e0e0e0" }}
              >
                {t("STANTON_ACCESS.SAVINGS_PLAN.TABLE.BODY.ROW_3_2")}
              </TableCell>
            </TableRow>

            <TableRow
              sx={{
                "&:last-child td, &:last-child th": { border: 0 },
                "& th": { fontWeight: 700 },
              }}
            >
              <TableCell component="th">
                {t("STANTON_ACCESS.SAVINGS_PLAN.TABLE.BODY.ROW_4_1")}
              </TableCell>
              <TableCell />
            </TableRow>

            <TableRow sx={{ "&:last-child td": { border: 0 } }}>
              <TableCell>
                {t("STANTON_ACCESS.SAVINGS_PLAN.TABLE.BODY.ROW_5_1")}
              </TableCell>

              <TableCell
                align="center"
                sx={{ borderLeft: "1px solid #e0e0e0" }}
              >
                {t("STANTON_ACCESS.SAVINGS_PLAN.TABLE.BODY.ROW_5_2")}
              </TableCell>
            </TableRow>

            <TableRow
              sx={{
                "&:last-child td, &:last-child th": { border: 0 },
                "& th": { fontWeight: 700 },
              }}
            >
              <TableCell component="th">
                {t("STANTON_ACCESS.SAVINGS_PLAN.TABLE.BODY.ROW_6_1")}
              </TableCell>
              <TableCell />
            </TableRow>

            <TableRow sx={{ "&:last-child td": { border: 0 } }}>
              <TableCell>
                {t("STANTON_ACCESS.SAVINGS_PLAN.TABLE.BODY.ROW_7_1")}
              </TableCell>
              <TableCell
                align="center"
                sx={{ borderLeft: "1px solid #e0e0e0" }}
              >
                {t("STANTON_ACCESS.SAVINGS_PLAN.TABLE.BODY.ROW_7_2")}
              </TableCell>
            </TableRow>

            <TableRow
              sx={{
                "&:last-child td, &:last-child th": { border: 0 },
                "& th": { fontWeight: 700 },
              }}
            >
              <TableCell component="th">
                {t("STANTON_ACCESS.SAVINGS_PLAN.TABLE.BODY.ROW_8_1")}
              </TableCell>
              <TableCell />
            </TableRow>

            <TableRow sx={{ "&:last-child td": { border: 0 } }}>
              <TableCell>
                {t("STANTON_ACCESS.SAVINGS_PLAN.TABLE.BODY.ROW_9_1")}
              </TableCell>
              <TableCell
                align="center"
                sx={{ borderLeft: "1px solid #e0e0e0" }}
              >
                {t("STANTON_ACCESS.SAVINGS_PLAN.TABLE.BODY.ROW_9_2")}
              </TableCell>
            </TableRow>

            <TableRow sx={{ "&:last-child td": { border: 0 } }}>
              <TableCell>
                {t("STANTON_ACCESS.SAVINGS_PLAN.TABLE.BODY.ROW_10_1")}
              </TableCell>
              <TableCell
                align="center"
                sx={{ borderLeft: "1px solid #e0e0e0" }}
              >
                {t("STANTON_ACCESS.SAVINGS_PLAN.TABLE.BODY.ROW_10_2")}
              </TableCell>
            </TableRow>

            <TableRow sx={{ "&:last-child td": { border: 0 } }}>
              <TableCell>
                {t("STANTON_ACCESS.SAVINGS_PLAN.TABLE.BODY.ROW_11_1")}
              </TableCell>

              <TableCell
                align="center"
                sx={{ borderLeft: "1px solid #e0e0e0" }}
              >
                {t("STANTON_ACCESS.SAVINGS_PLAN.TABLE.BODY.ROW_11_2_P1")}{" "}
                <small>
                  {t("STANTON_ACCESS.SAVINGS_PLAN.TABLE.BODY.ROW_11_2_P2")}
                </small>
              </TableCell>
            </TableRow>

            <TableRow
              sx={{
                "&:last-child td, &:last-child th": { border: 0 },
                "& th": { fontWeight: 700 },
              }}
            >
              <TableCell component="th">
                {t("STANTON_ACCESS.SAVINGS_PLAN.TABLE.BODY.ROW_12_1")}
              </TableCell>
              <TableCell />
            </TableRow>

            <TableRow sx={{ "&:last-child td": { border: 0 } }}>
              <TableCell>
                {t("STANTON_ACCESS.SAVINGS_PLAN.TABLE.BODY.ROW_13_1")}
              </TableCell>
              <TableCell
                align="center"
                sx={{ borderLeft: "1px solid #e0e0e0" }}
              >
                {t("STANTON_ACCESS.SAVINGS_PLAN.TABLE.BODY.ROW_13_2")}
              </TableCell>
            </TableRow>

            <TableRow sx={{ "&:last-child td": { border: 0 } }}>
              <TableCell>
                {t("STANTON_ACCESS.SAVINGS_PLAN.TABLE.BODY.ROW_14_1")}
              </TableCell>
              <TableCell
                align="center"
                sx={{ borderLeft: "1px solid #e0e0e0" }}
              >
                {t("STANTON_ACCESS.SAVINGS_PLAN.TABLE.BODY.ROW_14_2")}
              </TableCell>
            </TableRow>

            <TableRow sx={{ "&:last-child td": { border: 0 } }}>
              <TableCell>
                {t("STANTON_ACCESS.SAVINGS_PLAN.TABLE.BODY.ROW_15_1")}
              </TableCell>
              <TableCell
                align="center"
                sx={{ borderLeft: "1px solid #e0e0e0" }}
              >
                {t("STANTON_ACCESS.SAVINGS_PLAN.TABLE.BODY.ROW_15_2")}
              </TableCell>
            </TableRow>

            <TableRow
              sx={{
                "&:last-child td, &:last-child th": { border: 0 },
                "& th": { fontWeight: 700 },
              }}
            >
              <TableCell component="th">
                {t("STANTON_ACCESS.SAVINGS_PLAN.TABLE.BODY.ROW_16_1")}
              </TableCell>
              <TableCell />
            </TableRow>

            <TableRow sx={{ "&:last-child td": { border: 0 } }}>
              <TableCell>
                {t("STANTON_ACCESS.SAVINGS_PLAN.TABLE.BODY.ROW_17_1")}
              </TableCell>
              <TableCell
                align="center"
                sx={{ borderLeft: "1px solid #e0e0e0" }}
              >
                {t("STANTON_ACCESS.SAVINGS_PLAN.TABLE.BODY.ROW_17_2")}
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>

      <p className={styles.disclaimer}>
        {t("STANTON_ACCESS.SAVINGS_PLAN.DISCLAIMER")}
      </p>
    </section>
  );
}
