export interface CustomTablePaginationDTO {
    rowsPerPage: number,
     setRowsPerPage: Function, 
     page: number, 
     setPage: React.Dispatch<React.SetStateAction<number>>, 
     dataCount: number
}

export interface GetQueryParamsType {
    email?: string;
    filters?: string;
    pageNumber?: number;
    pageSize?: number;
    sortDescending?: boolean;
    sortField?: string;
  }