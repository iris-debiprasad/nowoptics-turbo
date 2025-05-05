import { TableHeaderOptions } from "@/types/Header.types";

export const ProductSelectionStep2TableDataResultHeader: TableHeaderOptions[] =
  [
    {
      id: "Action",
      name: "Select Frame",
      isSort: false,
      isFilter: false,
    },
    {
      id: "VariantNumber",
      name: "SKU",
      isSort: true,
      isFilter: true,
      type: "string",
    },
    {
      id: "ProductName",
      name: "Description",
      isSort: true,
      isFilter: true,
      type: "string",
    },
    {
      id: "ManufacturerColor",
      name: "Color",
      isSort: true,
      isFilter: true,
      type: "string",
    },
    {
      id: "EyeSize",
      name: "Eye Size",
      isSort: true,
      isFilter: true,
      type: "number",
    },
    {
      id: "Bridge",
      name: "Bridge",
      isSort: true,
      isFilter: true,
      type: "number",
    },
    {
      id: "Temple",
      name: "Temple",
      isSort: true,
      isFilter: true,
      type: "number",
    },
    {
      id: "VerticalLensHeight",
      name: "Vertical Height",
      isSort: true,
      isFilter: true,
      type: "number",
    },

    {
      id: "OrderNumber",
      name: "Order Number",
      isSort: true,
      isFilter: true,
      type: "string",
    },
  ];

export const addPofConstants = {
  PLACEHOLDER: {
    FRAME_NAME: "Enter Frame Name",
    EYE_SIZE: "Enter Eye Size",
    MOUNT: "Enter Mount",
    TEMPLE: "Enter Temple",
    COLOR: "Enter Color",
    BRIDGE: "Enter Bridge",
    HOLD_POF: "Enter Hold POF",
    VERTICAL_LENS_HEIGHT: "Enter Vertical Lens Height",
  },
  ERROR: {
    REQ_FRAME_NAME: "Please enter Frame Name",
    FRAME_NAME: "Please enter correct Frame Name",
    EYE_SIZE:
      "Please enter correct Eye Size between 40 to 70. Only two decimal places are allowed",
    REQ_EYE_SIZE: "Please enter Eye Size",
    MOUNT: "Please enter correct Mount",
    REQ_MOUNT: "Please enter Mount",
    TEMPLE: "Please enter correct Temple between 80 to 165",
    REQ_TEMPLE: "Please enter Temple",
    COLOR: "Please enter correct Color",
    REQ_COLOR: "Please enter Color",
    BRIDGE: "Please enter correct Bridge between 9 to 35",
    REQ_BRIDGE: "Please enter Bridge",
    HOLD_POF: "Please enter correct Hold POF",
    REQ_HOLD_POF: "Please enter Hold POF",
    VERTICAL_LENS_HEIGHT:
      "Please enter correct Vertical Lens Height between 20 to 60. Only two decimal places are allowed",
    REQ_VERTICAL_LENS_HEIGHT: "Please enter Vertical Lens Height",
  },
};
