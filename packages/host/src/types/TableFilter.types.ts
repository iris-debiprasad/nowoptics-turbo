export interface TableFilterDTO {
  open: boolean;
  anchorEl: HTMLElement | null;
  handleClose: () => void;
  options: SelectOptions[];
  filterStateValues: FilterPropsDTO;
  setFilterStateValues: React.Dispatch<React.SetStateAction<FilterPropsDTO>>;
  handleFilterClear?: () => void;
  setIsFilterApplied?: React.Dispatch<React.SetStateAction<boolean>>;
  isFilterApplied?: boolean;
  hanleFilterClick?: () => void;
}

export interface FilterPropsDTO {
  tableHeader: string;
  filterOpertor: string;
  filterTextValue: string;
  filterType?: string | number | null;
}

export type SelectOptions = {
  value: string | number;
  label: string | number;
};

export interface TableQueryParamsDTO {
  pageNumber?: number;
  pageSize?: number;
  sortDescending?: boolean;
  sortField?: string;
  filters?: string;
}
