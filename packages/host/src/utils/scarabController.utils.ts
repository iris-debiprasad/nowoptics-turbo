import {
  GetCartDataForEmarsysGuest,
  GetCartDataForEmarsysPatient,
} from "@root/host/src/service/common.service";
import {
  IScarab,
  IScarabItem,
  IScarabOrder,
} from "../types/scarabController.types";
import { CartItem, ModifiedItem } from "@root/host/src/types/nav.types";
import { getGuestToLocalStorage } from "./common.utils";

const getScarab = (): any | null => {
  if (typeof window !== "undefined" && window) {
    const scarab: any = window as any;

    if (scarab?.ScarabQueue) {
      scarab.ScarabQueue = scarab.ScarabQueue || [];

      return scarab;
    } else {
      console.log(`Warning: Scarab not present on windows`);
    }
  } else {
    console.log(`Warning: No Scarab Present`);
  }

  return null;
};

const executeScarabTestMode = () => {
  const isProd = process.env.NEXT_PUBLIC_EMARSYS_TEST_MODE_ENABLE == "false";
  const sc: IScarab | null = getScarab();
  
  if (!isProd) {
    sc?.ScarabQueue.push([`testMode`]);
  }
};

export const callGo = () => {
  const sc: IScarab | null = getScarab();

  if (sc?.ScarabQueue) {
    executeScarabTestMode();
    sc?.ScarabQueue?.push(["go"]);
  }
};

const onSubmitScarabEvent = (
  event: string,
  value: string | IScarabOrder | IScarabItem[] | number | undefined
) => {
  const sc: IScarab | null = getScarab();

  if (sc?.ScarabQueue) {
    try {
      if (value) {
        sc?.ScarabQueue?.push([event, value]);
      }
    } catch (e) {
      console.log(`error loading scarab`);
    }
  }
};

export const runGo = (router: any) => {
  setTimeout(() => {
    callGo();
  }, 1000);
};

export const getPatientCartData = (
  sessionForEmarsys: any,
  router: any,
  ifCartOperation?: boolean
) => {
  if (!ifCartOperation) {
    if (localStorage.getItem("_wp_ci_2")) {
      onSubmitScarabEvent(
        "setCustomerId",
        JSON.parse(localStorage.getItem("_wp_ci_2") as string).value
      );
    } else if (sessionForEmarsys.PatientId) {
      onSubmitScarabEvent("setCustomerId", sessionForEmarsys.PatientId);
    }
  }
  GetCartDataForEmarsysPatient(sessionForEmarsys.PatientId)
    .then((res) => {
      if (res.data) {
        const patientCartData: CartItem[] = res.data.Result;
        const modifiedData: ModifiedItem[] = patientCartData.map(
          ({ Item, Price, Quantity }) => ({
            item: Item,
            price: Price,
            quantity: Quantity,
          })
        );
        onSubmitScarabEvent("cart", modifiedData);
        runGo(router);
      } else {
        onSubmitScarabEvent("cart", []);
        runGo(router);
      }
    })
    .catch((err) => {
      onSubmitScarabEvent("cart", []);
      runGo(router);
    });
};

export const getGuestCartData = (router: any, ifCartOperation?: boolean) => {
  const guestCartId = getGuestToLocalStorage();
  if (!ifCartOperation) {
    if (localStorage.getItem("_wp_ci_2")) {
      onSubmitScarabEvent(
        "setCustomerId",
        JSON.parse(localStorage.getItem("_wp_ci_2") as string).value
      );
    }
  }
  if (guestCartId) {
    GetCartDataForEmarsysGuest(guestCartId as string)
      .then((res) => {
        if (res.data) {
          const guestCartData: CartItem[] = res.data.Result;
          const modifiedData: ModifiedItem[] = guestCartData.map(
            ({ Item, Price, Quantity }) => ({
              item: Item,
              price: Price,
              quantity: Quantity,
            })
          );
          onSubmitScarabEvent("cart", modifiedData);
          runGo(router);
        } else {
          onSubmitScarabEvent("cart", []);
          runGo(router);
        }
      })
      .catch((err) => {
        onSubmitScarabEvent("cart", []);
        runGo(router);
      });
  } else {
    onSubmitScarabEvent("cart", []);
    runGo(router);
  }
};
export { onSubmitScarabEvent, executeScarabTestMode };
