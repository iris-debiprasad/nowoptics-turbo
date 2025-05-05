import { TableHeaderColumnType } from "@root/host/src/types/Intake.types";

export const STORE_COLUMNS = [
  {
    id: "StoreId",
    name: "Store ID",
    isSort: true,
  },
  {
    id: "StartedOn",
    name: "Publish Date",
    isSort: true,
  },
  {
    id: "EndedOn",
    name: "Unpublished Date",
    isSort: true,
  },
];

export const COMPANY_COLUMNS = [
  {
    id: "CompanyCategoryId",
    name: "Company",
    isSort: true,
  },
  {
    id: "StartedOn",
    name: "Publish Date",
    isSort: true,
  },
  {
    id: "EndedOn",
    name: "Unpublished Date",
    isSort: true,
  },
];

export const STATE_COLUMNS = [
  {
    id: "StateId",
    name: "State ID",
    isSort: true,
  },
  {
    id: "StartedOn",
    name: "Publish Date",
    isSort: true,
  },
  {
    id: "EndedOn",
    name: "Unpublished Date",
    isSort: true,
  },
];

export const MEDICAL_FORM_COLUMNS: TableHeaderColumnType[] = [
  {
    id: "Id",
    name: "Template ID",
    isSort: true,
    isFilter: true,
    type : "number"
  },
  {
    id: "Code",
    name: "Description",
    isSort: true,
    isFilter: true,
  },
  {
    id: "Status",
    name: "Status",
    isSort: true,
    isFilter: true,
  },
  {
    id: "CreatedOn",
    name: "Created On",
    isSort: true,
    isFilter: false,
  },
  {
    id: "PublishedDate",
    name: "Published Date",
    isSort: true,
    isFilter: false,
  },
  {
    id : "ModifiedOn",
    name : "Modified Date",
    isSort : true,
    isFilter : false
  },
  {
    id : "ModifiedBy",
    name : "User",
    isSort : false,
    isFilter : false
  },
  {
    id: "Action",
    name: "Action",
    isSort: false,
    isFilter: false,
  },
];

export const HIPPA_LANGUAGE_FORM_COLUMNS = [
  {
    id: "Id",
    name: "HIPAA FORM",
    isSort: true,
  },
  {
    id: "action",
    name: "Action",
    isSort: false,
  },
];

export const HIPPA_STATE_FORM_COLUMNS = [
  {
    id: "Name",
    name: "STATE",
    isSort: true,
    isFilter : true,
    type : "string"
  },
  {
    id: "languageActions",
    name: "HIPAA FORM",
    isSort: false,
  },
];
