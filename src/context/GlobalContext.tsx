// GlobalStateProvider.tsx

// types.d.ts
export interface GlobalState {
    role: string | null;
    loginAs: string | null;
  }
  
  export interface GlobalStateContextType {
    state: GlobalState;
    setState: React.Dispatch<React.SetStateAction<GlobalState>>;
  }
  

import React, { createContext, useState, FC, ReactNode,useEffect } from 'react';

export const GlobalStateContext = createContext<GlobalStateContextType | undefined>(undefined);

const GlobalStateProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [state, setState] = useState<GlobalState>({
    role: null,
    loginAs: 'Personal',
  });

  useEffect(() => {
    // console.log(state);
    }, [state]);
   

  

  return (
    <GlobalStateContext.Provider value={{ state, setState }}>
      {children}
    </GlobalStateContext.Provider>
  );
};

export default GlobalStateProvider;
