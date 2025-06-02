import { IUnbxd } from "@root/host/src/types/unbxd.type";

export const getUnbxd = (): IUnbxd | null => {
  if (window) {
    const win: any = window as any;
    const Unbxd = win.Unbxd;
    return retryToFindUnbxd(Unbxd, 0);
  } else {
    console.log("Warning: No Window Present");
  }
  return null;
};
const retryToFindUnbxd = (Unbxd: IUnbxd, counter: number): IUnbxd | null => {
  if (Unbxd) {
    return Unbxd;
  } else {
    if (counter > 4) {
      console.log("Warning: Unbxd not present on window");
      return null;
    }
    setTimeout(() => {
      retryToFindUnbxd(Unbxd, ++counter);
    }, 100);
    return null;
  }
};
