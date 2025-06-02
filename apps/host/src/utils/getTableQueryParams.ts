import { TableQueryParamsDTO } from "../types/TableFilter.types";
type Order = "asc" | "desc";
export  function tableQueryParams(page: number, rowsPerPage: number, order: Order | null, orderBy: string | null){
    const params: TableQueryParamsDTO = {
        pageNumber: page + 1,
        pageSize: rowsPerPage,
      };
      if (orderBy) {
        const sortDescending = order === "desc";
        params.sortField = orderBy;
        params.sortDescending = sortDescending;
      } else {
        delete params.sortField;
        delete params.sortDescending;
      }
    return params;
}