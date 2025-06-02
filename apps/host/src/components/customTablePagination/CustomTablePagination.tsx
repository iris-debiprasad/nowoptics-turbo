import * as React from "react";
import {
  Box,
  Pagination,
  Select,
  FormControl,
  InputLabel,
  MenuItem,
  PaginationItem,
} from "@mui/material";
import style from "./CustomTablePagination.module.scss";
import { CustomTablePaginationDTO } from "@root/host/src/types/customTablePagination.types";
import {
  ROWS_PER_PAGE,
  ROWS_PER_PAGE_LABEL,
} from "@root/host/src/constants/customTablePagination.constants";
const CustomTablePagination = (props: CustomTablePaginationDTO) => {
  const [size, setSize] = React.useState("large");
  const pageCount = Math.ceil(props.dataCount / props.rowsPerPage);
  const [boundaryCount, setBoundaryCount] = React.useState(1);
  const [siblingCount, setSiblingCount] = React.useState(1);

  React.useEffect(() => {
    const updateSize = () => {
      const screenWidth = window.innerWidth;
      if (screenWidth < 600) {
        setSize("small");
        setBoundaryCount(1);
        setSiblingCount(0);
      } else if (screenWidth < 360) {
        setBoundaryCount(0);
        setSiblingCount(0);
      }
    };

    updateSize();
    window.addEventListener("resize", updateSize);
    return () => {
      window.removeEventListener("resize", updateSize);
    };
  }, []);

  return (
    <Box className={style.customTablePaginationWrapper}>
      <Box className={style.itemsPerPageWrapper}>
        <FormControl className={style.itemsPerPageFormControl}>
          <Select
            labelId="itmes-per-page-label"
            id="itmes-per-page"
            value={props.rowsPerPage}
            onChange={(e) => {
              props.setRowsPerPage(e.target.value as number);
            }}
            className={style.selectPageSize}
            data-testid={"rows-per-page-select"}
          >
            {ROWS_PER_PAGE.map((item) => {
              return (
                <MenuItem
                  value={item}
                  key={item}
                  data-testid={`rows-per-page-option-${item}`}
                >
                  {item}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>
        <label id="itmes-per-page-label">{ROWS_PER_PAGE_LABEL}</label>
      </Box>
      <Box>
        <Pagination
          count={pageCount}
          onChange={(e, page) => props.setPage(page - 1)}
          page={props.page + 1}
          variant="outlined"
          shape="rounded"
          renderItem={(item) => (
            <PaginationItem {...item} className={style.paginationItem} />
          )}
          size={size as "small" | "medium" | "large"}
          boundaryCount={boundaryCount}
          siblingCount={siblingCount}
        />
      </Box>
    </Box>
  );
};

export default CustomTablePagination;
