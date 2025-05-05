import { GetPermissionConfig } from "@/config/permissionConfig";
import Permission from "@/constants/menu-permission.constant";
import { NavDataAssociate } from "@/constants/menu.constants";
import { useAppSelector } from "@/store/useStore";
import { NavItem } from "@/types/Header.types";
import { useMemo } from "react";

const useMenuPermission = () => {
  const hasAccess = (access: boolean) => access;

  let {
    operationPermission,
    clinicalSchedulerPermission,
    operationCommandPermission,
    closingPermission,
    closingHistoryPermission,
    inventoryCountPermission,
    inventoryAdjustmentPermission,
    inventoryReplacementPermission,
    jobTrackingPermission,
    jobStatusPermission,
    jobStatusHistoryPermission,
    stagingBinViewPermission,
    pendingShipPermission,
    pendingTracePermission,
    claimsPermission,
    pendingWebOrder,
    benefitsSheetPermission,
    dcSetupPermission,
    importSetupPermission,
    intakeSetupPermission,
    manageCareSetupPermission,
    claimStatusPermission,
    cptCodePermission,
    insuranceCareerPermission,
    insuranceCareerCredentialPermission,
    ruleGridPermission,
    benefitSummaryPermission,
    masterSetupPermission,
    orderSetupPermission,
    patientCommPermission,
    schedulerPermission,
    storeSetupPermission,
    userSetupPermission,
    tabletCheckInPermission,
    promotionSetupPermission,
    virtualOpticianPermission,
    cartPermission,
    returnToCreditPermission,
    ccReportPermission,
    contactLensRebatePermission,
    contactLensCalculatorPermission,
  } = useAppSelector((state) => {
    let pendingWebOrder = GetPermissionConfig({
      ...state,
      permissionName: Permission.MENU.OPERATION.PENDING_WEB_ORDERS,
    }) as boolean[];
    let clinicalSchedulerPermission = GetPermissionConfig({
      ...state,
      permissionName: Permission.MENU.OPERATION.CLINICAL_SCHEDULER,
    }) as boolean[];
    let operationCommandPermission = GetPermissionConfig({
      ...state,
      permissionName: Permission.MENU.OPERATION.OPERATION_COMMAND,
    }) as boolean[];
    let virtualOpticianPermission = GetPermissionConfig({
      ...state,
      permissionName: Permission.MENU.OPERATION.VIRTUAL_OPTICIAN,
    }) as boolean[];
    let closingPermission = GetPermissionConfig({
      ...state,
      permissionName: Permission.MENU.OPERATION.CLOSING,
    }) as boolean[];
    const closingHistoryPermission = GetPermissionConfig({
      ...state,
      permissionName: Permission.MENU.OPERATION.CLOSING_HISTORY,
    }) as boolean[];
    const inventoryCountPermission = GetPermissionConfig({
      ...state,
      permissionName: Permission.MENU.OPERATION.INVENTORY_COUNT,
    }) as boolean[];
    const inventoryAdjustmentPermission = GetPermissionConfig({
      ...state,
      permissionName: Permission.MENU.OPERATION.INVENTORY_ADJUSTMENT,
    }) as boolean[];
    const ccReportPermission = GetPermissionConfig({
      ...state,
      permissionName: Permission.MENU.OPERATION.CC_REPORT,
    }) as boolean[];
    const inventoryReplacementPermission = GetPermissionConfig({
      ...state,
      permissionName: Permission.MENU.OPERATION.INVENTORY_REPLENISHMENT,
    }) as boolean[];
    const jobStatusPermission = GetPermissionConfig({
      ...state,
      permissionName: Permission.MENU.JOB_TRACKING.JOB_STATUS,
    }) as boolean[];
    const jobStatusHistoryPermission = GetPermissionConfig({
      ...state,
      permissionName: Permission.MENU.JOB_TRACKING.JOB_STATUS_HISTORY,
    }) as boolean[];
    const stagingBinView = GetPermissionConfig({
      ...state,
      permissionName: Permission.MENU.JOB_TRACKING.STAGING_BIN_VIEW,
    }) as boolean[];
    const pendingShipPermission = GetPermissionConfig({
      ...state,
      permissionName: Permission.MENU.JOB_TRACKING.PENDING_SHIP,
    }) as boolean[];
    const pendingTracePermission = GetPermissionConfig({
      ...state,
      permissionName: Permission.MENU.JOB_TRACKING.PENDING_TRACE,
    }) as boolean[];
    const claimsPermission = GetPermissionConfig({
      ...state,
      permissionName: Permission.MENU.OPERATION.MANAGE_CARE_CLAIMS,
    }) as boolean[];
    const benefitsSheetPermission = GetPermissionConfig({
      ...state,
      permissionName: Permission.MENU.OPERATION.MANAGE_CARE_BENEFITS_SHEET,
    }) as boolean[];
    const tabletCheckInPermission = GetPermissionConfig({
      ...state,
      permissionName: Permission.MENU.TABLET_CHECK_IN,
    }) as boolean[];

    const cartPermission = GetPermissionConfig({
      ...state,
      permissionName: Permission.MENU.CART,
    }) as boolean[];
    const returnToCreditPermission = GetPermissionConfig({
      ...state,
      permissionName: Permission.MENU.OPERATION.RETURN_TO_CREDIT,
    }) as boolean[];
    const contactLensCalculatorPermission = GetPermissionConfig({
      ...state,
      permissionName: Permission.MENU.OPERATION.CONTACT_LENS_CALCULATOR,
    }) as boolean[];

    const operationMenuAccess = () => {
      return [
        clinicalSchedulerPermission.every(hasAccess),
        operationCommandPermission.every(hasAccess),
        virtualOpticianPermission.every(hasAccess),
        closingPermission.every(hasAccess),
        closingHistoryPermission.every(hasAccess),
        inventoryCountPermission.every(hasAccess),
        inventoryAdjustmentPermission.every(hasAccess),
        inventoryReplacementPermission.every(hasAccess),
        returnToCreditPermission.every(hasAccess),
        ccReportPermission.every(hasAccess),
        contactLensCalculatorPermission.every(hasAccess),
        claimsPermission.every(hasAccess),
        benefitsSheetPermission.every(hasAccess),
        pendingWebOrder.every(hasAccess)
      ].some(hasAccess);
    };

    const jobTrackingAccess = () => {
      return [
        jobStatusPermission.every(hasAccess),
        jobStatusHistoryPermission.every(hasAccess),
        stagingBinView.every(hasAccess),
        pendingShipPermission.every(hasAccess),
        pendingTracePermission.every(hasAccess),
      ].some(hasAccess);
    };

    //DC Setup
    const dcSetupPermission = GetPermissionConfig({
      ...state,
      permissionName: Permission.MENU.SETTINGS.DC_SETUP,
    }) as boolean[];
    //Import Setup
    const importSetupPermission = GetPermissionConfig({
      ...state,
      permissionName: Permission.MENU.SETTINGS.IMPORT_SETUP,
    }) as boolean[];
    //Intake Setup
    const intakeSetupPermission = GetPermissionConfig({
      ...state,
      permissionName: Permission.MENU.SETTINGS.INTAKE_SETUP,
    }) as boolean[];
    //Manage Care Setup
    const [
      claimStatusPermission,
      cptCodePermission,
      insuranceCareerPermission,
      insuranceCareerCredentialPermission,
      ruleGridPermission,
      benefitSummaryPermission,
    ] = GetPermissionConfig({
      ...state,
      permissionName: Permission.MENU.SETTINGS.MANAGE_CARE_SETUP,
    }) as boolean[];
    //Master Setup
    const masterSetupPermission = GetPermissionConfig({
      ...state,
      permissionName: Permission.MENU.SETTINGS.MASTER_SETUP,
    }) as boolean[];

    //ORDER Setup
    const orderSetupPermission = GetPermissionConfig({
      ...state,
      permissionName: Permission.MENU.SETTINGS.ORDER_SETUP,
    }) as boolean[];
    //Patient Setup
    const patientCommPermission = GetPermissionConfig({
      ...state,
      permissionName: Permission.MENU.SETTINGS.PATIENT_COMMUNICATION_SETUP,
    }) as boolean[];
    //Scheduler Setup
    const schedulerPermission = GetPermissionConfig({
      ...state,
      permissionName: Permission.MENU.SETTINGS.SCHEDULER_SETUP,
    }) as boolean[];
    //STORE Setup
    const storeSetupPermission = GetPermissionConfig({
      ...state,
      permissionName: Permission.MENU.SETTINGS.STORE_SETUP,
    }) as boolean[];

    // Contact lens rebate setup
    const contactLensRebatePermission = GetPermissionConfig({
      ...state,
      permissionName: Permission.MENU.SETTINGS.CONTACT_LENS_REBATE_SETUP,
    }) as boolean[];

    //User Setup
    const userSetupPermission = GetPermissionConfig({
      ...state,
      permissionName: Permission.MENU.SETTINGS.USER_ROLE_SETUP,
    }) as boolean[];

    const manageCarePermission = () => {
      return [
        claimStatusPermission,
        cptCodePermission,
        insuranceCareerPermission,
        insuranceCareerCredentialPermission,
        ruleGridPermission,
        benefitSummaryPermission,
      ].some(hasAccess);
    };

    //Promotion & Loyalty Setup
    const promotionSetupPermission = GetPermissionConfig({
      ...state,
      permissionName: Permission.MENU.SETTINGS.PROMOTION_LOYALTY_SETUP,
    }) as boolean[];

    return {
      //Header Menu
      operationPermission: operationMenuAccess(),
      pendingWebOrder: pendingWebOrder.every(hasAccess),
      clinicalSchedulerPermission: clinicalSchedulerPermission.every(hasAccess),
      operationCommandPermission: operationCommandPermission.every(hasAccess),
      closingPermission: closingPermission.every(hasAccess),
      closingHistoryPermission: closingHistoryPermission.every(hasAccess),
      inventoryCountPermission: inventoryCountPermission.every(hasAccess),
      inventoryAdjustmentPermission:
        inventoryAdjustmentPermission.every(hasAccess),
      ccReportPermission: ccReportPermission.every(hasAccess),
      inventoryReplacementPermission:
        inventoryReplacementPermission.every(hasAccess),
      jobTrackingPermission: jobTrackingAccess(),
      jobStatusPermission: jobStatusPermission.every(hasAccess),
      jobStatusHistoryPermission: jobStatusHistoryPermission.every(hasAccess),
      stagingBinViewPermission: stagingBinView.every(hasAccess),
      pendingShipPermission: pendingShipPermission.every(hasAccess),
      pendingTracePermission: pendingTracePermission.every(hasAccess),
      claimsPermission: claimsPermission.every(hasAccess),
      benefitsSheetPermission: benefitsSheetPermission.every(hasAccess),
      cartPermission: cartPermission.every(hasAccess),
      virtualOpticianPermission: virtualOpticianPermission.every(hasAccess),
      // Settings
      dcSetupPermission: dcSetupPermission.some(hasAccess),
      importSetupPermission: importSetupPermission.some(hasAccess),
      intakeSetupPermission: intakeSetupPermission.some(hasAccess),
      manageCareSetupPermission: manageCarePermission(),
      claimStatusPermission,
      cptCodePermission,
      insuranceCareerPermission,
      insuranceCareerCredentialPermission,
      ruleGridPermission,
      benefitSummaryPermission,
      masterSetupPermission: masterSetupPermission.some(hasAccess),
      orderSetupPermission: orderSetupPermission.some(hasAccess),
      patientCommPermission: patientCommPermission.some(hasAccess),
      schedulerPermission: schedulerPermission.some(hasAccess),
      storeSetupPermission: storeSetupPermission.some(hasAccess),
      userSetupPermission: userSetupPermission.some(hasAccess),
      tabletCheckInPermission: tabletCheckInPermission.some(hasAccess),
      promotionSetupPermission: promotionSetupPermission.some(hasAccess),
      returnToCreditPermission: returnToCreditPermission.every(hasAccess),
      contactLensRebatePermission: contactLensRebatePermission.every(hasAccess),
      contactLensCalculatorPermission:
        contactLensCalculatorPermission.every(hasAccess),
    };
  });

  return useMemo(() => {
    return {
      operationPermission,
      clinicalSchedulerPermission,
      operationCommandPermission,
      closingPermission,
      closingHistoryPermission,
      inventoryCountPermission,
      inventoryAdjustmentPermission,
      ccReportPermission,
      inventoryReplacementPermission,
      jobTrackingPermission,
      jobStatusPermission,
      jobStatusHistoryPermission,
      pendingShipPermission,
      pendingTracePermission,
      claimsPermission,
      pendingWebOrder,
      benefitsSheetPermission,
      dcSetupPermission,
      importSetupPermission,
      intakeSetupPermission,
      manageCareSetupPermission,
      claimStatusPermission,
      cptCodePermission,
      insuranceCareerPermission,
      insuranceCareerCredentialPermission,
      ruleGridPermission,
      benefitSummaryPermission,
      masterSetupPermission,
      orderSetupPermission,
      patientCommPermission,
      schedulerPermission,
      storeSetupPermission,
      userSetupPermission,
      tabletCheckInPermission,
      stagingBinViewPermission,
      promotionSetupPermission,
      cartPermission,
      virtualOpticianPermission,
      returnToCreditPermission,
      contactLensRebatePermission,
      contactLensCalculatorPermission,
    };
  }, [
    //Header Menu
    operationPermission,
    clinicalSchedulerPermission,
    operationCommandPermission,
    closingPermission,
    closingHistoryPermission,
    inventoryCountPermission,
    inventoryAdjustmentPermission,
    ccReportPermission,
    inventoryReplacementPermission,
    jobTrackingPermission,
    jobStatusPermission,
    jobStatusHistoryPermission,
    pendingShipPermission,
    pendingTracePermission,
    claimsPermission,
    pendingWebOrder,
    benefitsSheetPermission,
    dcSetupPermission,
    importSetupPermission,
    intakeSetupPermission,
    manageCareSetupPermission,
    claimStatusPermission,
    cptCodePermission,
    insuranceCareerPermission,
    insuranceCareerCredentialPermission,
    ruleGridPermission,
    benefitSummaryPermission,
    masterSetupPermission,
    orderSetupPermission,
    patientCommPermission,
    schedulerPermission,
    storeSetupPermission,
    userSetupPermission,
    tabletCheckInPermission,
    pendingShipPermission,
    pendingTracePermission,
    stagingBinViewPermission,
    promotionSetupPermission,
    cartPermission,
    virtualOpticianPermission,
    returnToCreditPermission,
    contactLensRebatePermission,
    contactLensCalculatorPermission,
  ]);
};

export default useMenuPermission;
