import { SnackBarProvider } from "@root/home/src/contexts/Snackbar/SnackbarContext";
import StoreList from "./StoreList";
import useLanguageTranslation from "@root/host/src/hooks/useLanguageTranslation";
import { ISearchStoreProps } from "@/types/searchPage.types";

const SearchStore = ({ brand }: ISearchStoreProps) => {
  useLanguageTranslation();
 return (
    <SnackBarProvider>
      <StoreList brand={brand} />
    </SnackBarProvider>
  );
};

export default SearchStore;
