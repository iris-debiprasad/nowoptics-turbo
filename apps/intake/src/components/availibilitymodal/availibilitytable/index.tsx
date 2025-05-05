import {
  COMPANY_COLUMNS,
  STATE_COLUMNS,
  STORE_COLUMNS,
} from "@/constants/intakeTable.constants";
import { useAppDispatch } from "@root/host/src/hooks/useStore";
import { TOGGLE_AVAILIBILITY_MODAL_ACCORDION } from "@root/host/src/store/reducer/intake.slice";
import {
  useGetCompanyCategoryAvailibilityQuery,
  useGetStateAvailibilityQuery,
  useGetStoreAvailibilityQuery,
} from "@root/host/src/store/reducer/intakeApi.slice";
import { AvailibilityTableProps } from "@root/host/src/types/Intake.types";
import {
  AvailibilityTableSortFields,
  CompanyCategoryResult,
  CompanyCategorySortFields,
  StateResult,
  StateSortFields,
  StoreResult,
  StoreSortFields,
} from "@root/host/src/types/intakeApi.types";
import { tableDate } from "@root/host/src/utils/intake.utils";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableSortLabel,
} from "@mui/material";
import ArrowDownIcon from "@root/assets/Images/icons/arrow-down.svg";
import SortIcon from "@root/assets/Images/icons/sort.svg";
import { CustomTablePaginationDTO } from "@root/host/src/types/customTablePagination.types";
import dynamic from "next/dynamic";
import Image from "next/image";
import { FunctionComponent, memo, useCallback, useMemo, useState } from "react";
import styles from "../AvailibilityModal.module.scss";
import { DEFAULT_EMPTY_TABLE_MESSAGE } from "@/constants/intake.constants";
const CustomTablePagination = dynamic(
  () => import("host/CustomTablePagination"),
  { ssr: false }
) as FunctionComponent<CustomTablePaginationDTO>;

const AvailibilityTable: FunctionComponent<AvailibilityTableProps> = ({
  type,
  templateId,
  tableKey,
  expanded,
  label,
}) => {
  const dispatch = useAppDispatch();
  const [order, setOrder] = useState<"asc" | "desc">("desc");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [orderBy, setOrderBy] = useState<AvailibilityTableSortFields>(
    type === "companycategory"
      ? "Id"
      : type === "store"
      ? "Id"
      : "Id"
  );

  const { data: companyTableData, isFetching } =
    useGetCompanyCategoryAvailibilityQuery(
      {
        templateId,
        filter: "Current",
        pageNumber: page + 1,
        pageSize: rowsPerPage,
        sortDescending: order === "desc",
        sortField: orderBy as CompanyCategorySortFields,
      },
      {
        skip: type !== "companycategory",
      }
    );

  const { data: storeTableData } = useGetStoreAvailibilityQuery(
    {
      templateId,
      filter: "Current",
      pageNumber: page + 1,
      pageSize: rowsPerPage,
      sortDescending: order === "desc",
      sortField: orderBy as StoreSortFields,
    },
    {
      skip: type !== "store",
    }
  );

  const { data: stateTableData } = useGetStateAvailibilityQuery(
    {
      templateId,
      filter: "Current",
      pageNumber: page + 1,
      pageSize: rowsPerPage,
      sortDescending: order === "desc",
      sortField: orderBy as StateSortFields,
    },
    {
      skip: type !== "state",
    }
  );

  const handleTableAccordion = () => {
    dispatch(TOGGLE_AVAILIBILITY_MODAL_ACCORDION({ key: tableKey }));
  };

  const handleRequestSort = useCallback(
    (_: unknown, property: AvailibilityTableSortFields) => {
      const isAsc = orderBy === property && order === "asc";
      setOrder(isAsc ? "desc" : "asc");
      setOrderBy(property);
    },
    [orderBy, order]
  );

  const rowsPerPageChange = (rowsPerPage: number) => {
    setPage(0);
    setRowsPerPage(rowsPerPage);
  };

  const tableHeaderContent = useMemo(() => {
    const headerColumns =
      type === "companycategory"
        ? COMPANY_COLUMNS
        : type === "store"
        ? STORE_COLUMNS
        : STATE_COLUMNS;

    return (
      <>
        {headerColumns.map((header, index) => (
          <TableCell key={index} className="tableHeadContent">
            <div className="textIconWrapper">
              
              <div className="tableHeadIcons">
                {header.isSort ? (
                  <div
                    data-testid={`sort-click-${header.id}`}
                    onClick={(e) =>
                      handleRequestSort(
                        e,
                        header.id as AvailibilityTableSortFields
                      )
                    }
                  >
                    <TableSortLabel
                      active={orderBy === header.id}
                      direction={orderBy === header?.id ? order! : "asc"}
                      classes={{
                        active: "true",
                      }}
                    >
                      <span className="tableHeadText">{header.name}</span>
                    </TableSortLabel>
                  </div>
                ) : (
                  <span className="tableHeadText">{header.name}</span>
                )}
              </div>
            </div>
          </TableCell>
        ))}
      </>
    );
  }, [type, handleRequestSort]);

  const tableBodyContent = useMemo(() => {
    let tableData;
    switch (type) {
      case "companycategory":
        tableData = companyTableData;
        break;
      case "store":
        tableData = storeTableData;
        tableData;
        break;
      case "state":
        tableData = stateTableData;
        break;
    }

    return (
      <>
        {tableData?.Result.Results?.map((row, index) => {
          let firstColumn;
          const [isValidStartDate, startDate] = tableDate(row.StartedOn);
          const [isValidEndDate, endDate] = tableDate(row.EndedOn);
          switch (type) {
            case "companycategory":
              firstColumn = (row as CompanyCategoryResult).CompanyCategoryId;
              break;
            case "store":
              firstColumn = (row as StoreResult).StoreId;
              break;
            case "state":
              firstColumn = (row as StateResult).StateCode;
              break;
          }

          return (
            <TableRow key={index}>
              <TableCell className="tableRowContent">{firstColumn}</TableCell>
              <TableCell className="tableRowContent">
                {isValidStartDate ? startDate : "Null"}
              </TableCell>
              <TableCell className="tableRowContent">
                {isValidEndDate ? endDate : "Null"}
              </TableCell>
            </TableRow>
          );
        })}
        {tableData?.Result.Results.length === 0 && (
          <span className={styles.emptyTableMessage}>{DEFAULT_EMPTY_TABLE_MESSAGE}</span>
        )}
      </>
    );
  }, [type, companyTableData, storeTableData, stateTableData]);

  const tablePagination = useMemo(() => {
    let tableData;
    switch (type) {
      case "companycategory":
        tableData = companyTableData;
        break;
      case "store":
        tableData = storeTableData;
        tableData;
        break;
      case "state":
        tableData = stateTableData;
        break;
    }
    return (
      <CustomTablePagination
        dataCount={tableData?.Result?.RowCount!}
        rowsPerPage={rowsPerPage}
        page={page}
        setPage={setPage}
        setRowsPerPage={rowsPerPageChange}
      />
    );
  }, [
    type,
    companyTableData,
    storeTableData,
    stateTableData,
    page,
    rowsPerPage,
  ]);

  return (
    <Accordion
      classes={{ root: styles.accordionRoot }}
      expanded={expanded}
      onChange={handleTableAccordion}
      TransitionProps={{ unmountOnExit: true }}
    >
      <AccordionSummary
        classes={{
          content: styles.accordionSummary,
          root: styles.summaryRoot,
        }}
        expandIcon={
          <Image
            height={14}
            width={14}
            src={ArrowDownIcon}
            alt="drop-down-icon"
            data-testid="drop-down-icon"
          />
        }
      >
        <div>{label}</div>
      </AccordionSummary>
      <AccordionDetails>
        <div className="iris_table">
          <TableContainer sx={{ overflow: "auto" }}>
            <Table sx={{ minWidth: 500 }}>
              <TableHead>
                <TableRow>{tableHeaderContent}</TableRow>
              </TableHead>
              <TableBody>{tableBodyContent}</TableBody>
            </Table>
            {tablePagination}
          </TableContainer>
        </div>
      </AccordionDetails>
    </Accordion>
  );
};

export default memo(AvailibilityTable);
