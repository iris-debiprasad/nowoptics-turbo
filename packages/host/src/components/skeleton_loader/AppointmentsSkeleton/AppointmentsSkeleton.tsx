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
import style from "./AppointmentsSkeleton.module.scss";

const AppointmentsSkeleton = () => {
  return (
    <Box className={style.appointmentWrapper}>
      <div className={style.appointmentContainer}>
        <Box paddingBottom={"10px"}>
          <Skeleton variant="rectangular" width="200px" height={"30px"} />
        </Box>
        <Box paddingBottom={"10px"}>
          <Skeleton variant="rectangular" width="300px" height={"35px"} />
        </Box>
        <Box className={style.schedulerContainer}>
          <Grid
            container
            direction={"row"}
            display={"flex"}
            flexWrap={"wrap"}
            justifyContent={"center"}
          >
            <Grid item xs={9}>
              <Box padding={"10px"} display={"flex"} justifyContent={"center"}>
                <Skeleton variant="rectangular" width="500px" height={"35px"} />
              </Box>

              <div className="iris_table">
                <Grid container spacing={2}>
                  <Grid item xs={3} padding={"10px"}>
                    <Skeleton variant="rectangular" height={"25px"} />
                  </Grid>
                  <Grid item xs={3}>
                    <Skeleton variant="rectangular" height={"25px"} />
                  </Grid>
                  <Grid item xs={3}>
                    <Skeleton variant="rectangular" height={"25px"} />
                  </Grid>
                  <Grid item xs={3}>
                    <Skeleton variant="rectangular" height={"25px"} />
                  </Grid>
                </Grid>
                <TableContainer sx={{ overflow: "auto" }}>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell>
                          <Skeleton variant="rectangular" height={"20px"} />
                        </TableCell>
                        {new Array(3).fill("").map((data, index) => {
                          return (
                            <TableCell colSpan={2} key={index}>
                              <Skeleton variant="rectangular" height={"20px"} />
                            </TableCell>
                          );
                        })}
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {new Array(12).fill("").map((data, index) => {
                        return (
                          <TableRow key={index}>
                            {new Array(5)
                              .fill("")
                              .map((innerData, innerIndex) => {
                                return (
                                  <TableCell
                                    key={innerIndex}
                                    style={{
                                      maxWidth: "160px",
                                      padding: "5px",
                                    }}
                                  >
                                    <Skeleton
                                      variant="rectangular"
                                      height={"20px"}
                                    />
                                  </TableCell>
                                );
                              })}
                            <TableCell style={{ padding: "5px" }} colSpan={2}>
                              <Skeleton variant="rectangular" height={"20px"} />
                            </TableCell>
                          </TableRow>
                        );
                      })}
                    </TableBody>
                  </Table>
                </TableContainer>
              </div>
            </Grid>
            <Grid item xs={3} className={style.schedulerSideContainer}>
              <Box
                padding={"10px"}
                style={{ width: "100%" }}
                display={"flex"}
                flexDirection={"row"}
                justifyContent={"center"}
              >
                <Skeleton
                  variant="rounded"
                  sx={{ width: "100%" }}
                  height={"35px"}
                />
              </Box>
              <Box
                padding={"10px"}
                style={{ width: "100%" }}
                display={"flex"}
                flexDirection={"row"}
                justifyContent={"center"}
              >
                <Skeleton
                  variant="rounded"
                  sx={{ width: "100%" }}
                  height={"35px"}
                />
              </Box>
              <Box className={style.notesContainer}>
                <Skeleton variant="rectangular" width="100px" height={"30px"} />
                <Skeleton variant="rectangular" height={"20px"} />
                <Skeleton variant="rectangular" height={"20px"} />
              </Box>
              <Box className={style.doctorContainer}>
                <Skeleton variant="rectangular" width="150px" height={"30px"} />
                <Skeleton variant="rectangular" height={"20px"} />
                <Skeleton variant="rectangular" height={"20px"} />
                <Skeleton variant="rectangular" height={"20px"} />
                <Skeleton variant="rectangular" height={"20px"} />
              </Box>
            </Grid>
          </Grid>
        </Box>
        <Box>
          <Box padding={"10px"}>
            <Skeleton variant="rectangular" width="100px" height={"30px"} />
          </Box>
          <Grid container>
            <Grid item xs={12} md={3}>
              <Box className={style.timeSlotContainer}>
                <Box padding={"10px"}>
                  <Skeleton
                    variant="rectangular"
                    width="100px"
                    height={"30px"}
                  />
                </Box>
                <Box className={style.subContainer}>
                  <Skeleton variant="rounded" width="120px" height={"35px"} />
                  <Skeleton variant="rounded" width="140px" height={"35px"} />
                  <Skeleton variant="rounded" width="125px" height={"35px"} />
                  <Skeleton variant="rounded" width="145px" height={"35px"} />
                </Box>
              </Box>
            </Grid>
            <Grid item xs={12} md={3}>
              <Box className={style.examTypeContainer}>
                <Box padding={"10px"}>
                  <Skeleton variant="rounded" width="110px" height={"30px"} />
                </Box>
                <Box className={style.subContainer}>
                  <Skeleton variant="rounded" width="110px" height={"35px"} />
                  <Skeleton variant="rounded" width="145px" height={"35px"} />
                  <Skeleton variant="rounded" width="130px" height={"35px"} />
                  <Skeleton variant="rounded" width="120px" height={"35px"} />
                </Box>
              </Box>
            </Grid>
            <Grid item xs={12} md={6}>
              <Box className={style.statusContainer}>
                <Box padding={"10px"}>
                  <Skeleton variant="rounded" width="110px" height={"30px"} />
                </Box>
                <Box className={style.subContainer}>
                  <Skeleton variant="rounded" width="155px" height={"35px"} />
                  <Skeleton variant="rounded" width="150px" height={"35px"} />
                  <Skeleton variant="rounded" width="145px" height={"35px"} />
                </Box>
                <Box className={style.subContainer}>
                  <Skeleton variant="rounded" width="140px" height={"35px"} />
                  <Skeleton variant="rounded" width="160px" height={"35px"} />
                  <Skeleton variant="rounded" width="170px" height={"35px"} />
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </div>
    </Box>
  );
};

export default AppointmentsSkeleton;
