import { useUserHasInternalHousePxs } from "@/hooks/useUserHasInternalHousePxs";
import { ReactNode, useContext } from "react";
import { createContext } from "react";

interface hasInHousePxsContextDTO {
  userHasInHousePxs: {
    primary: undefined | boolean,
    myAcct: undefined | boolean
  };
  checkPrescriptionData: (patientId: string) => Promise<void>,
}

export const HAS_INHOUSE_PXS_DEFAULTS: hasInHousePxsContextDTO = {
  userHasInHousePxs: {
    primary: undefined,
    myAcct: undefined
  },
  checkPrescriptionData: async (_: string) => { },
}

export const HasInHousePxsContext = createContext<hasInHousePxsContextDTO>(HAS_INHOUSE_PXS_DEFAULTS);

interface IHasInHousePxsContextProvider {
  children: ReactNode;
}

export const HasInHousePxsContextProvider = ({ children }: IHasInHousePxsContextProvider) => {
  const { userHasInHousePxs, checkPrescriptionData } = useUserHasInternalHousePxs()

  return (
    <HasInHousePxsContext.Provider value={{ userHasInHousePxs, checkPrescriptionData }}>
      {children}
    </HasInHousePxsContext.Provider>
  );
}

export const useHasInHousePxsContext = () => useContext(HasInHousePxsContext);


