import { createContext } from "react";

export const RuntimeVarContext = createContext<{
    [key : string] : string | undefined;
} | null>(null);
