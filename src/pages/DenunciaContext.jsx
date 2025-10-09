// denunciaContext.js
import { createContext, useContext } from "react";

const DenunciaContext = createContext();

export function useDenuncia() {
  return useContext(DenunciaContext);
}
