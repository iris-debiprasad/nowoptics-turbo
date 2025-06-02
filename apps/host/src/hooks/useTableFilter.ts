import {
  SelectOptions,
  TableHeaderOptions,
} from "@root/host/src/types/Header.types";
import {
  BooleanFilterOperatorOptions,
  NumberFilterOperatorOptions,
  StringFilterOperatorOptions,
  VARIABLE_TYPES,
} from "@root/host/src/constants/common.constants";
import { FilterPropsDTO } from "@root/host/src/types/TableFilter.types";
import { useEffect, useState } from "react";

type FilterElement  = {
  svg: HTMLElement;
  id: string;
}

const useTableFilter = (
  headers: TableHeaderOptions[],
  callback: (filter: string) => void
) => {
  const [filterElements, setFilterElements] = useState<FilterElement[]>([]);
  const [filterOptions, setFilterOptions] = useState<SelectOptions[]>([]);
  const [filterStateValues, setFilterStateValues] = useState<FilterPropsDTO[]>(
    () => {
      return headers.map((header) => ({
        tableHeader: header.id,
        filterOpertor: "",
        filterTextValue: "",
        filterType: header.type,
      }));
    }
  );

  const [activeFilterIndex, setActiveFilterIndex] = useState(-1);

  const [filterText, setFilterText] = useState("");
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const filterOpen = Boolean(anchorEl);

  useEffect(() => {
    const filterString = filterStateValues
      .filter((filter) => filter.filterTextValue)
      .map((filter) =>
        filter.filterType === VARIABLE_TYPES.BOOLEAN
          ? `${filter.tableHeader}:${filter.filterOpertor === "istrue"}`
          : `${filter.tableHeader}:${filter.filterOpertor}:${filter.filterTextValue}`
      )
      .join(",");
    if (filterText !== filterString) {
      callback(filterString);
    }
    setFilterText(filterString);
  }, [filterStateValues]);

  const handleFilterClose = () => {
    setAnchorEl(null);
  };

  const reset = () => {
    const activeFilters = [...filterStateValues];
    activeFilters.forEach((filter) => {
      filter.filterTextValue = "";
      filter.filterOpertor = "";
    });
    setFilterStateValues(activeFilters);
  };

  const activeFilter = filterStateValues[activeFilterIndex];


  const arrangeOptions = (arr: typeof NumberFilterOperatorOptions, index: number) => {
    const copyArray = JSON.parse(JSON.stringify(arr));
    if (index < 0 || index >= copyArray.length) return copyArray; // If index is out of bounds, return original array
    const item = copyArray.splice(index, 1)[0]; // Remove the item from the array
    copyArray.unshift(item); // Insert it at the beginning
    return copyArray;
  };
  

  const handleFilterClick = (
    event: React.MouseEvent<HTMLElement>,
    header: TableHeaderOptions,
    index: number,
    defaultFilterOption?: number
  ) => {    
    if (header.type === VARIABLE_TYPES.NUMBER) {
      setFilterOptions(defaultFilterOption ? arrangeOptions(NumberFilterOperatorOptions, defaultFilterOption) : NumberFilterOperatorOptions);
    } else if (header.type === VARIABLE_TYPES.BOOLEAN) {
      setFilterOptions(defaultFilterOption ? arrangeOptions(BooleanFilterOperatorOptions, defaultFilterOption) : BooleanFilterOperatorOptions);
    } else if (header.type === VARIABLE_TYPES.FLOAT) {
      setFilterOptions(defaultFilterOption ? arrangeOptions(NumberFilterOperatorOptions, defaultFilterOption) : NumberFilterOperatorOptions);
    } else {
      setFilterOptions(defaultFilterOption ? arrangeOptions(StringFilterOperatorOptions, defaultFilterOption) : StringFilterOperatorOptions);
    }
    setAnchorEl(event.currentTarget);
    setActiveFilterIndex(index);
    //Save the filter icon element Ref
    addFilterElement(event.target as HTMLElement, header.id);
  };
 
  /**
   * save filter elements with id
   * @param svg 
   * @param id 
   */
  const addFilterElement = (svg: HTMLElement, id: string) => {
    const idExist = filterElements.find((element) => element.id === id);
    if(!idExist) {
      setFilterElements([...filterElements, {svg, id}])
    }
  }
  
  /**
   *  apply background color to active filter icons
   * @param filters 
   */
  const applyActiveFilterIndicator = (filters: string) => {
    let filterHeaderName = filters?.split(',')?.map(fH => fH.split(':')[0]);
    filterElements.forEach(element => {
      let headerIndex = filterHeaderName.findIndex((name) => name === element.id)
      if(headerIndex !== -1) {
        element.svg.style.fill = "#f98300";
      } else {
        element.svg.style.fill = "#ffff";
      }
    })
  }

  useEffect(() => {
    applyActiveFilterIndicator(filterText)
  }, [filterText]);

  

  const setFilterStateValue = (filter: any) => {
    const activeFilters = [...filterStateValues];
    activeFilters[activeFilterIndex] = filter as FilterPropsDTO;
    setFilterStateValues(activeFilters);
  };

  const handleFilterClear = () => {
    const activeFilters = [...filterStateValues];
    activeFilters[activeFilterIndex].filterTextValue = "";
    activeFilters[activeFilterIndex].filterOpertor = "";
    setFilterStateValues(activeFilters);
  };

  const isActive = (columnName: string) => {
    return filterText.includes(columnName)
      ? { className: "filterSelected", fill: "#afb0b3" } 
      : { className: "svg", fill: "#ffff" } ;
  };

  return {
    anchorEl,
    filterOptions,
    filterOpen,
    activeFilter,
    methods: {
      setFilterStateValue,
      handleFilterClear,
      handleFilterClose,
      handleFilterClick,
      reset,
      isActive,
    },
  };
};

export default useTableFilter;
