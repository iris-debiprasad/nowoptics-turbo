import {
  Box,
  Grid,
  Skeleton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import style from "./CommonTableSkeleton.module.scss";

const CommonTableSkeleton = (props: {
  rows: number;
  columns: number;
  headSkeletonHeight: number;
  bodySkeletonHeight: number;
  dontShowHeader?: boolean;
}) => {
  const { rows, columns, headSkeletonHeight, bodySkeletonHeight } = props;
  return (
    <Box className={style.commonTableWrapper}>
      <div className="iris_table">
        <TableContainer sx={{ overflow: "auto" }}>
          <Table>
            {!props.dontShowHeader && (
              <TableHead>
                <TableRow>
                  {new Array(columns).fill("").map((data, index) => {
                    return (
                      <TableCell className="tableHeadContent" key={index}>
                        <Skeleton
                          variant="rectangular"
                          height={`${headSkeletonHeight}px`}
                        />
                      </TableCell>
                    );
                  })}
                </TableRow>
              </TableHead>
            )}
            <TableBody>
              {new Array(rows).fill("").map((data, index) => {
                return (
                  <TableRow key={index}>
                    {new Array(columns)
                      .fill("")
                      .map((innerData, innerIndex) => {
                        return (
                          <TableCell
                            className="tableRowContent"
                            key={innerIndex}
                          >
                            <Skeleton
                              variant="rectangular"
                              height={`${bodySkeletonHeight}px`}
                            />
                          </TableCell>
                        );
                      })}
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </Box>
  );
};

export default CommonTableSkeleton;
