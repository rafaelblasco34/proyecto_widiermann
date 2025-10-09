// DenunciaContext.js
import { createContext, useContext, useState } from "react";

const DenunciaContext = createContext();

export function DenunciaProvider({ children }) {
  const [denunciaEnCurso, setDenunciaEnCurso] = useState(null);
  const [listaDenuncias, setListaDenuncias] = useState([]);
  const [tipos, setTipos] = useState([
    "robo",
    "secuestro",
    "alteracion",
    "violencia",
    "siniestro",
    "otros"
  ]);
  const [comisarias, setComisarias] = useState([
    "Comisaría central",
    "Comisaría neuquen",
    "Comisaría balsa las perlas",
    "Comisaría plottier"
  ]);

  return (
    <DenunciaContext.Provider value={{
      denunciaEnCurso, setDenunciaEnCurso,
      listaDenuncias, setListaDenuncias,
      tipos, comisarias
    }}>
      {children}
    </DenunciaContext.Provider>
  );
}

export function useDenuncia() {
  return useContext(DenunciaContext);
}
