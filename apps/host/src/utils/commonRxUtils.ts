import {
  ADD_HELP_TEXT_CONFIG_CODE,
  ADD_INTERVAL,
  ADD_MAX_CONFIG_CODE,
  ADD_MIN_CONFIG_CODE,
  ADD_PRECISION,
  AXIS_HELP_TEXT_CONFIG_CODE,
  AXIS_INTERVAL,
  AXIS_MAX_CONFIG_CODE,
  AXIS_MIN_CONFIG_CODE,
  AXIS_PRECISION,
  BASE_CURVE_HELP_TEXT_CONFIG_CODE,
  BRAND_HELP_TEXT_CONFIG_CODE,
  CYLINDER_HELP_TEXT_CONFIG_CODE,
  CYLINDER_INTERVAL,
  CYLINDER_MAX_CONFIG_CODE,
  CYLINDER_MIN_CONFIG_CODE,
  CYLINDER_PRECISION,
  DIAMETER_HELP_TEXT_CONFIG_CODE,
  MONO_PD_HELP_TEXT_CONFIG_CODE,
  MONO_PD_INTERVAL,
  MONO_PD_MAX_CONFIG_CODE,
  MONO_PD_MIN_CONFIG_CODE,
  MONO_PD_PRECISION,
  PRISM_HELP_TEXT_CONFIG_CODE,
  PRISM_INTERVAL,
  PRISM_MAX_CONFIG_CODE,
  PRISM_MIN_CONFIG_CODE,
  PRISM_PRECISION,
  SPHERE_HELP_TEXT_CONFIG_CODE,
  SPHERE_INTERVAL,
  SPHERE_MAX_CONFIG_CODE,
  SPHERE_MIN_CONFIG_CODE,
  SPHERE_PRECISION,
} from "@root/host/src/constants/commonRx.constants";
import { rxRangeConfigDTO } from "@root/host/src/types/commonRx.types";
import { getPrescriptionOptionsArray } from "./getPrescriptionOptions";

export const setHelpRxTexts = (result: rxRangeConfigDTO[]) => {
  const brandHelpText = result?.filter(
    (item: { ConfigCode: string; ConfigValue: string }) =>
      item.ConfigCode === BRAND_HELP_TEXT_CONFIG_CODE
  )[0].ConfigValue;
  const baseCurveHelpText = result?.filter(
    (item: { ConfigCode: string; ConfigValue: string }) =>
      item.ConfigCode === BASE_CURVE_HELP_TEXT_CONFIG_CODE
  )[0].ConfigValue;
  const diameterHelpText = result?.filter(
    (item: { ConfigCode: string; ConfigValue: string }) =>
      item.ConfigCode === DIAMETER_HELP_TEXT_CONFIG_CODE
  )[0].ConfigValue;
  const sphereHelpText = result?.filter(
    (item: { ConfigCode: string; ConfigValue: string }) =>
      item.ConfigCode === SPHERE_HELP_TEXT_CONFIG_CODE
  )[0].ConfigValue;
  const cylinderHelpText = result?.filter(
    (item: { ConfigCode: string; ConfigValue: string }) =>
      item.ConfigCode === CYLINDER_HELP_TEXT_CONFIG_CODE
  )[0].ConfigValue;
  const addHelpText = result?.filter(
    (item: { ConfigCode: string; ConfigValue: string }) =>
      item.ConfigCode === ADD_HELP_TEXT_CONFIG_CODE
  )[0].ConfigValue;
  const axisHelpText = result?.filter(
    (item: { ConfigCode: string; ConfigValue: string }) =>
      item.ConfigCode === AXIS_HELP_TEXT_CONFIG_CODE
  )[0].ConfigValue;
  const MonoPdHelpText = result?.filter(
    (item: { ConfigCode: string; ConfigValue: string }) =>
      item.ConfigCode === MONO_PD_HELP_TEXT_CONFIG_CODE
  )[0].ConfigValue;
  const prismHelpText = result?.filter(
    (item: { ConfigCode: string; ConfigValue: string }) =>
      item.ConfigCode === PRISM_HELP_TEXT_CONFIG_CODE
  )[0].ConfigValue;

  return {
    sphereHelpText: sphereHelpText,
    cylinderHelpText: cylinderHelpText,
    addHelpText: addHelpText,
    axisHelpText: axisHelpText,
    baseCurveHelpText: baseCurveHelpText,
    diameterHelpText: diameterHelpText,
    brandHelpText: brandHelpText,
    MonoPdHelpText: MonoPdHelpText,
    prismHelpText: prismHelpText,
  };
};

export const getRxRangeFromResponse = (result: rxRangeConfigDTO[]) => {
  const sphereMin = result?.filter(
    (item: { ConfigCode: string; ConfigValue: string }) =>
      item.ConfigCode === SPHERE_MIN_CONFIG_CODE
  )[0].ConfigValue;
  const sphereMax = result?.filter(
    (item: { ConfigCode: string; ConfigValue: string }) =>
      item.ConfigCode === SPHERE_MAX_CONFIG_CODE
  )[0].ConfigValue;
  const sphereOptions = getPrescriptionOptionsArray(
    Number(sphereMin),
    Number(sphereMax),
    SPHERE_INTERVAL,
    SPHERE_PRECISION
  );
  // CYLINDER
  const cylinderMin = result?.filter(
    (item: { ConfigCode: string; ConfigValue: string }) =>
      item.ConfigCode === CYLINDER_MIN_CONFIG_CODE
  )[0].ConfigValue;
  const cylinderMax = result?.filter(
    (item: { ConfigCode: string; ConfigValue: string }) =>
      item.ConfigCode === CYLINDER_MAX_CONFIG_CODE
  )[0].ConfigValue;
  const cylinderOptions = getPrescriptionOptionsArray(
    Number(cylinderMin),
    Number(cylinderMax),
    CYLINDER_INTERVAL,
    CYLINDER_PRECISION
  );

  // ADD
  const addMin = result?.filter(
    (item: { ConfigCode: string; ConfigValue: string }) =>
      item.ConfigCode === ADD_MIN_CONFIG_CODE
  )[0].ConfigValue;
  const addMax = result?.filter(
    (item: { ConfigCode: string; ConfigValue: string }) =>
      item.ConfigCode === ADD_MAX_CONFIG_CODE
  )[0]?.ConfigValue;
  const addOptions = getPrescriptionOptionsArray(
    Number(addMin),
    Number(addMax),
    ADD_INTERVAL,
    ADD_PRECISION
  );

  const axisMin = result?.filter(
    (item: { ConfigCode: string; ConfigValue: string }) =>
      item.ConfigCode === AXIS_MIN_CONFIG_CODE
  )[0].ConfigValue;
  const axisMax = result?.filter(
    (item: { ConfigCode: string; ConfigValue: string }) =>
      item.ConfigCode === AXIS_MAX_CONFIG_CODE
  )[0].ConfigValue;
  const axisOptions = getPrescriptionOptionsArray(
    Number(axisMin),
    Number(axisMax),
    AXIS_INTERVAL,
    AXIS_PRECISION
  );

  // MONO PD
  const monoPdMin = result?.filter(
    (item: { ConfigCode: string; ConfigValue: string }) =>
      item.ConfigCode === MONO_PD_MIN_CONFIG_CODE
  )[0].ConfigValue;
  const monoPdMax = result?.filter(
    (item: { ConfigCode: string; ConfigValue: string }) =>
      item.ConfigCode === MONO_PD_MAX_CONFIG_CODE
  )[0].ConfigValue;
  const monoPdOptions = getPrescriptionOptionsArray(
    Number(monoPdMin),
    Number(monoPdMax),
    MONO_PD_INTERVAL,
    MONO_PD_PRECISION
  );
  // PRISM
  const prismMin = result?.filter(
    (item: { ConfigCode: string; ConfigValue: string }) =>
      item.ConfigCode === PRISM_MIN_CONFIG_CODE
  )[0].ConfigValue;
  const prismMax = result?.filter(
    (item: { ConfigCode: string; ConfigValue: string }) =>
      item.ConfigCode === PRISM_MAX_CONFIG_CODE
  )[0].ConfigValue;
  const prismOptions = getPrescriptionOptionsArray(
    Number(prismMin),
    Number(prismMax),
    PRISM_INTERVAL,
    PRISM_PRECISION
  );
  return {
    sphereOptions,
    cylinderOptions,
    addOptions,
    axisOptions,
    monoPdOptions,
    prismOptions,
  };
};

export function detectFileTypeFromBase64String(base64String: string) {
  const base64StringArray = base64String?.split(",");
  const fileType = base64StringArray[0]?.split(":")[1]?.split(";")[0];
  return fileType;
}

export const convertToPrescriptionDataAssociatePatient = (result: any) => {
  const values = {
    rightEye: {
      Axis:
        result?.RightEyeEntity?.Axis !== null
          ? result?.RightEyeEntity?.Axis.toFixed(0)
          : "",
      Cylinder:
        result?.RightEyeEntity?.Cylinder !== null
          ? result?.RightEyeEntity?.Cylinder.toFixed(2)
          : "",
      Sphere:
        result?.RightEyeEntity?.Sphere !== null
          ? result?.RightEyeEntity?.Sphere.toFixed(2)
          : "",
      Add:
        result?.RightEyeEntity?.Add !== null
          ? result?.RightEyeEntity?.Add.toFixed(2)
          : "",
      PrismInOut: {
        In: result?.RightEyeEntity?.Pin
          ? result?.RightEyeEntity?.Pin.toFixed(2)
          : "",
        Out:
          result?.RightEyeEntity?.Pout < 0
            ? (-result?.RightEyeEntity?.Pout).toFixed(2)
            : "",
      },
      PrismUpDown: {
        Up: result?.RightEyeEntity?.Pup
          ? result?.RightEyeEntity?.Pup.toFixed(2)
          : "",
        Down:
          result?.RightEyeEntity?.PDown < 0
            ? (-result?.RightEyeEntity?.PDown).toFixed(2)
            : "",
      },
      MonoPd: result?.RightEyeEntity?.MonoPd
        ? result?.RightEyeEntity?.MonoPd.toFixed(2)
        : "",
      Brand: result?.RightEyeEntity?.BrandName,
      BaseCurve: result?.RightEyeEntity?.BaseCurve,
      Diameter: result?.RightEyeEntity?.Diameter,
      BrandId: result?.RightEyeEntity?.BrandId,
    },
    leftEye: {
      Axis:
        result?.LeftEyeEntity?.Axis !== null
          ? result?.LeftEyeEntity?.Axis.toFixed(0)
          : "",
      Cylinder:
        result?.LeftEyeEntity?.Cylinder !== null
          ? result?.LeftEyeEntity?.Cylinder.toFixed(2)
          : "",
      Sphere:
        result?.LeftEyeEntity?.Sphere !== null
          ? result?.LeftEyeEntity?.Sphere.toFixed(2)
          : "",
      Add:
        result?.LeftEyeEntity?.Add !== null
          ? result?.LeftEyeEntity?.Add.toFixed(2)
          : "",
      PrismInOut: {
        In: result?.LeftEyeEntity?.Pin
          ? result?.LeftEyeEntity?.Pin.toFixed(2)
          : "",
        Out:
          result?.LeftEyeEntity?.Pout < 0
            ? (-result?.LeftEyeEntity?.Pout).toFixed(2)
            : "",
      },
      PrismUpDown: {
        Up: result?.LeftEyeEntity?.Pup
          ? result?.LeftEyeEntity?.Pup.toFixed(2)
          : "",
        Down:
          result?.LeftEyeEntity?.PDown < 0
            ? (-result?.LeftEyeEntity?.PDown).toFixed(2)
            : "",
      },
      MonoPd: result?.LeftEyeEntity?.MonoPd
        ? result?.LeftEyeEntity?.MonoPd.toFixed(2)
        : "",
      Brand: result?.LeftEyeEntity?.BrandName,
      BaseCurve: result?.LeftEyeEntity?.BaseCurve,
      Diameter: result?.LeftEyeEntity?.Diameter,
      BrandId: result?.LeftEyeEntity?.BrandId,
    },
    description: {
      sourceType: result?.Source,
      expiryDate: result?.ExpirationDate,
      doctorName: result?.DoctorName,
      diagnosisCode: result?.DiagnosisCode,
      employeeName: result?.Employee,
    },
  };
  return values;
};

export const convertToPrescriptionDataAssociatePatientContact = (
  result: any
) => {
  const values = {
    rightEye: {
      Axis: result?.RightEyeEntity?.Axis ? result?.RightEyeEntity?.Axis : "",
      Cylinder:
        result?.RightEyeEntity?.Cylinder !== null
          ? result?.RightEyeEntity?.Cylinder
          : "",
      Sphere:
        result?.RightEyeEntity?.Sphere !== null
          ? result?.RightEyeEntity?.Sphere
          : "",
      Add:
        result?.RightEyeEntity?.Add !== null ||
        result?.RightEyeEntity?.AddPowerText !== null
          ? result?.RightEyeEntity?.Add || result?.RightEyeEntity?.AddPowerText
          : "",
      Brand: result?.RightEyeEntity?.BrandName,
      BaseCurve:
        result?.RightEyeEntity?.BaseCurve !== null
          ? result?.RightEyeEntity?.BaseCurve
          : "",
      Diameter:
        result?.RightEyeEntity?.Diameter !== null
          ? result?.RightEyeEntity?.Diameter
          : "",
      BrandId: result?.RightEyeEntity?.BrandId,
      MonoVisionType:
        result?.RightEyeEntity?.MonoVisionType !== null
          ? result?.RightEyeEntity?.MonoVisionType
          : "",
    },
    leftEye: {
      Axis:
        result?.LeftEyeEntity?.Axis !== null ? result?.LeftEyeEntity?.Axis : "",
      Cylinder:
        result?.LeftEyeEntity?.Cylinder !== null
          ? result?.LeftEyeEntity?.Cylinder
          : "",
      Sphere:
        result?.LeftEyeEntity?.Sphere !== null
          ? result?.LeftEyeEntity?.Sphere
          : "",
      Add:
        result?.LeftEyeEntity?.Add !== null ||
        result?.LeftEyeEntity?.AddPowerText !== null
          ? result?.LeftEyeEntity?.Add || result?.LeftEyeEntity?.AddPowerText
          : "",
      Brand: result?.LeftEyeEntity?.BrandName,
      BaseCurve:
        result?.LeftEyeEntity?.BaseCurve !== null
          ? result?.LeftEyeEntity?.BaseCurve
          : "",
      Diameter:
        result?.LeftEyeEntity?.Diameter !== null
          ? result?.LeftEyeEntity?.Diameter
          : "",
      BrandId:
        result?.LeftEyeEntity?.BrandId !== null
          ? result?.LeftEyeEntity?.BrandId
          : "",
      MonoVisionType:
        result?.LeftEyeEntity?.MonoVisionType !== null
          ? result?.LeftEyeEntity?.MonoVisionType
          : "",
    },
    description: {
      sourceType: result?.Source,
      expiryDate: result?.ExpirationDate,
      doctorName: result?.DoctorName,
      diagnosisCode: result?.DiagnosisCode,
      employeeName: result?.Employee,
    },
  };
  return values;
};
